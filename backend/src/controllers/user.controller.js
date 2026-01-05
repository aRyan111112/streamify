import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js"

export async function getRecommendedUsers(req, res) {
    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;

        console.log(currentUserId)

        const recommendedUsers = await User.find({
            $and: [
                { _id: { $ne: currentUserId } }, // exclude current user
                { _id: { $nin: currentUser.friends } }, // exclude current user friends
                { isOnboarded: true }
            ]
        });
        res.status(200).json(recommendedUsers);
    } catch (error) {
        console.log("error in getRecommendedUsers", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getMyFriends(req, res) {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const currentUserId = req.user.id;

        const user = await User.findById(currentUserId)
            .select("friends")
            .populate("friends", "fullName profilePic nativeLanguage learningLanguage");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user.friends);
    } catch (error) {
        console.log("error in getMyFriends", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function sendFriendRequest(req, res) {
    try {
        
        const myId = req.user.id;
        const {id:recipientId} = req.params; 

        // checking if user is not sending request to itself
        if(myId === recipientId) {
            return res.status(400).json({message: "you cannot send friend request to yourself."});
        }

        const recipient = await User.findById(recipientId);

        if(!recipient) {
            return res.status(404).json({message: "Recipient does not exists."});
        }

        // checking if user is already friend with the recipient 
        if(recipient.friends.includes(myId)) {
            return res.status(400).json({message: "You are already frienda with this user."});
        }

        // checking if the friend request is already sent
        const existingRequest = await FriendRequest.findOne({
            $or: [
                {sender: myId, recipient: recipientId},
                {sender: recipientId, recipient: myId}
            ]
        });
        if(existingRequest) {
            return res.status(400).json({message: "A friend request already exists between you and the recipient."});
        }


        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId
        })

        res.status(201).json(friendRequest);
    } catch (error) {
        console.log("error in sendFriendRequest method", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function acceptFriendRequest(req, res) {
    try {
        const { id:requestId } = req.params;

        const friendRequest = await FriendRequest.findById(requestId);

        if(!friendRequest) {
            return res.status(404).json({message: "Request not found"});
        }

        // checking if the current user is recipient, means to whom the request came
        if(friendRequest.recipient.toString() !== req.user.id) {
            return res.status(403).json({message: "You are not authorized to accept this request"});
        }

        friendRequest.status = "accepted";
        await friendRequest.save();

        // add each user to other's friends array.
        // $addToSet: adds element to an array only if they do not already exists.
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recipient}
        });
        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender}
        });

        res.status(200).json({message: "Friend request accepted."})
    } catch (error) {
        console.log("error in acceptFriendRequest method", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getFriendRequests(req, res) {
    try {
        
        const currentUserId = req.user.id;
        
        const friendRequests = await FriendRequest.find({
            recipient: currentUserId,
            status: "pending"
        }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");



        const acceptedRequests = await FriendRequest.find({
            sender: currentUserId,
            status: "accepted"
        }).populate("recipient", "fullName profilePic");

        res.status(200).json({friendRequests, acceptedRequests})

    } catch (error) {
        console.log("error in getFriendRequests method", error.message);
        res.status(500).json({ message: "Internal server error" });
    }    
}

export async function getOutGoingFriendReqs(req, res) {
    try {

        const outGoingRequests = await FriendRequest.find({
            sender: req.user.id,
            status: "pending"
        }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");
        
        res.status(200).json(outGoingRequests);
        
    } catch (error) {
        console.log("error in getOutGoingFriendReqs method", error.message);
        res.status(500).json({ message: "Internal server error" });
    }    
}