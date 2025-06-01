const express = require('express');
const requestRouter = express.Router();
const userRouter = express.Router();
const User = require('../models/user');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');

const USER_SAFE_DATA = 'firstName lastName photoUrl email';

// Get all the pending connection request for the logged-in user

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: 'interested'
        }).populate('fromUserId', USER_SAFE_DATA);


        res.json({message : "Data fetched successfully", data: connectionRequests});

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id, status: 'accepted' },
                { toUserId: loggedInUser._id, status: 'accepted' }
            ]
        }).populate('fromUserId', USER_SAFE_DATA)
        .populate('toUserId', USER_SAFE_DATA);

        console.log("Connection Requests: ", connectionRequests);

        const data = connectionRequests.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.json({ data });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

// Get all the users in the system
userRouter.get("/feed", userAuth, async (req, res) => {
    try {

        // user should not see their own profile in the feed
        // so we filter out the logged-in user
        // and only return the users who are not connected to the logged-in user
        // and who have not sent a connection request to the logged-in user
        // and who have not received a connection request from the logged-in user
        // User should see all the user cards except
        // 1. his own card
        // 2. his connections
        // 3. ignored people
        // 4. already sent the connection request

        // Example: Rahul = [Mark, Donald, MS Dhoni, Virat]
        // R → Akshay → rejected   R → Elon → Accepted
        // R → Donald → ignored   R → MS Dhoni → interested   R → Virat Kohli → accepted   R → Sachin Tendulkar → ignored

        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit; // Limit to a maximum of 50 users per page

        // Pagination logic
        const skip = (page - 1) * limit;


        // Find all connection requests (sent + received) involving the logged-in user
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).select('fromUserId toUserId status');

        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((req) => {
        hideUsersFromFeed.add(req.fromUserId.toString());
        hideUsersFromFeed.add(req.toUserId.toString());
        });

        const users = await User.find({

        $and:[
            { _id: { $nin: Array.from(hideUsersFromFeed) } } , // Exclude users in the hide list
            { _id: { $ne: loggedInUser._id } } // Exclude the logged-in user
        ]
    }).select(USER_SAFE_DATA).skip(skip).limit(limit);

        res.json({ data : users });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



module.exports = userRouter;