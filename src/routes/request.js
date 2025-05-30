const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {

    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ['ignored', 'interested'];
        if (!allowedStatus.includes(status)) {
            return res
            .status(400)
            .json({message: "Invalid status type: "+ status});
        }

        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(404).json({message: "User not found with ID: " + toUserId});
        }

        // Check if the connection request already exists
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ],
        });
        if(existingConnectionRequest) {
            return res
            .status(400)
            .send({message: "Connection request already exists between these users"});
        }



        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save();
        res.json({
            message: req.user.firstName +" is " + status + " in " + toUser.firstName,
            data: data
        });
    }
    catch(err){
        res.status(400).send("Error: " + err.message);
    }
});

requestRouter.post("/request/review/:status/:requestId", userAuth ,async (req, res) => {
    try {
        const loggedInUser = req.user;
        const {status, requestId} = req.params;

        const allowedStatus = ['accepted', 'rejected'];
        if( !allowedStatus.includes(status)) {
            return res.status(400).json({message: "status not valid!"});
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId, // Ensure the request ID is valid
            toUserId: loggedInUser._id, // Ensure the logged-in user is the recipient of the request
            status: 'interested' // Only allow review if the request is in 'interested' state
        });

        if (!connectionRequest) {
            return res.status(404).json({ message: "Connection request not found" });
        }

        connectionRequest.status = status;
        const data = await connectionRequest.save();

        res.json({ message: "connection request " + status , data});

    } catch (error) {
        res.status(400).json({ message: "Error: " + error.message });
    }
});



module.exports = requestRouter;

