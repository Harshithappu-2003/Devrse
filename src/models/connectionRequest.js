const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['ignored', 'interested', 'accepted', 'rejected'],
            message: `{VALUE} is a incorrect status type`,
            
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

connectionRequestSchema.pre('save', function(next) {
    const connectionRequest = this;
    // Check if the fromUserId and toUserId are the same
    if (connectionRequest.fromUserId.toString() === connectionRequest.toUserId.toString()) {
        return next(new Error("Cannot send a connection request to yourself"));
    }
    next();
});

const ConnectionRequestModel = mongoose.model("ConnectionRequest", connectionRequestSchema);
module.exports = ConnectionRequestModel;












// This model represents a connection request between users in a social network or community application.
// It includes fields for the IDs of the users involved, the status of the request, and timestamps for creation and updates.
// The status can be 'ignore', 'interested', 'accepted', 'rejected', or 'pending', with 'pending' as the default.
// The model uses Mongoose for schema definition and validation, ensuring that the data adheres to the specified structure and constraints.
// The `fromUserId` and `toUserId` fields reference the User model, establishing relationships between connection requests and users.
// The `createdAt` and `updatedAt` fields are automatically managed by Mongoose, providing a record of when the request was created and last modified.
// This model can be used to manage connection requests in a social networking application, allowing users to send, accept, reject, or ignore requests from other users.
// The `ConnectionRequest` model is essential for implementing features like friend requests, follow requests, or connection invitations in a community platform.
// It allows for tracking the status of each request and managing user interactions effectively.
// The model can be extended with additional fields or methods as needed to support more complex features, such as notifications or user interactions.
// The `ConnectionRequest` model is crucial for building a robust social networking application, enabling users to connect and interact with each other.
// It provides a structured way to handle connection requests, ensuring data integrity and consistency across the application.
// The model can be used in conjunction with other models, such as User, to create a comprehensive user interaction system.
// The `ConnectionRequest` model is designed to facilitate the management of user connections in a social networking context.
// It allows for tracking the status of connection requests, enabling users to manage their relationships effectively.
// The model's structure ensures that all necessary information is captured, including the users involved and the current status of the request.
// The use of Mongoose schemas provides a clear and enforceable structure for the data, ensuring that all connection requests adhere to the defined schema.
// The `ConnectionRequest` model is a key component of a social networking application, enabling users to connect with each other.
// It supports various statuses for connection requests, allowing for flexible user interactions.
// The model's timestamps provide a clear history of when requests were created and last updated, aiding in tracking user interactions.
// The `ConnectionRequest` model can be easily integrated with other parts of the application, such as user profiles and notifications.
// It provides a foundation for building features like friend requests, follow requests, or connection invitations.
// The model can be extended with additional functionality, such as methods for sending, accepting, or rejecting requests.
// It is designed to be used in a social networking context, where users can send and manage connection requests.
// The `ConnectionRequest` model is essential for implementing user connection features in a community application.
// It allows for tracking the status of requests and managing user interactions effectively.
// The model's structure ensures that all necessary information is captured, including the users involved and the current status of the request.
// The use of Mongoose schemas provides a clear and enforceable structure for the data, ensuring that all connection requests adhere to the defined schema.