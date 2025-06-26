import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user.id;
    
    // Get current user with friends populated
    const currentUser = await User.findById(currentUserId).select('friends');
    
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract friend IDs (including current user)
    const excludedIds = [
      currentUserId,
      ...currentUser.friends.map(friend => friend._id || friend)
    ];

    // Find recommended users (not friends and not self)
    const recommendedUsers = await User.find({
      _id: { $nin: excludedIds },
      isOnboarded: true
    }).select('fullName profilePic bio location nativeLanguage learningLanguage');

    console.log("Current user ID:", currentUserId);
    console.log("Excluded IDs:", excludedIds);
    console.log("Recommended users found:", recommendedUsers.length);

    // Return the array directly (not wrapped in object)
    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.error("Error fetching recommended users:", error);
    res.status(500).json({ message: "Error fetching recommended users" });
  }
}
// export async function getRecommendedUsers(req, res) {
//   try {
//     const currentUserId = req.user.id;
//     const currentUser = req.user;

//     const recommendedUsers = await User.find({
//       $and: [
//         { _id: { $ne: currentUserId } }, //exclude current user
//         { _id: { $nin: currentUser.friends } }, // exclude current user's friends
//         { isOnboarded: true },
//       ],
//     });
//     res.status(200).json(recommendedUsers);
//   } catch (error) {
//     console.error("Error in getRecommendedUsers controller", error.message);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }
export async function getMyFriends(req,res){
  try{
    const user = await User.findById(req.user.id)
                            .select('friends')
                            .populate("friends", "fullName profilePic nativeLanguage learningLanguage");

    res.status(200).json({ friends: user.friends });
  }
  catch(error){
    console.error("Error fetching friends:", error);
    res.status(500).json({ message: "Error fetching friends", error });
  }
}

export async function sendFriendRequest(req, res) {
  try{
    const myId = req.user.id;
    const {id:recipientId} = req.params;

    if (myId === recipientId) {
      return res.status(400).json({ 
        code: "SELF_REQUEST",
        message: "You cannot send a friend request to yourself" 
      });
    }

    const recipient = await User.findById(recipientId);
    if(!recipient){
      return res.status(404).json({ message: "Recipient not found" });
    }

    if (recipient.friends.includes(myId)) {
      return res.status(400).json({
        code: "ALREADY_FRIENDS", 
        message: `You are already friends with ${recipient.fullName}`
      });
    }

    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId }
      ]
    });
    
    if (existingRequest) {
      const direction = existingRequest.sender.equals(myId) ? "sent" : "received";
      return res.status(400).json({
        code: "EXISTING_REQUEST",
        message: `You already ${direction} a friend request to this user`
      });
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId
    });

    res.status(201).json({ message: "Friend request sent", friendRequest });
  } catch(error){
    console.error("Error sending friend request:", error);
    res.status(500).json({ message: "Error sending friend request", error });
  }
}

export async function acceptFriendRequest(req, res) {
  try{
    const {id:requestId} = req.params;
    const friendRequest = await FriendRequest.findById(requestId);
    // Check if the friend request exists
    if(!friendRequest){
      return res.status(404).json({ message: "Friend request not found" });
    }
    // Check if the logged-in user is the recipient of the friend request
    if(friendRequest.recipient.toString() !== req.user.id){
      return res.status(403).json({ message: "You are not authorized to accept this friend request" });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    // $addToSet is used to add a value to an array only if it doesn't already exist in the array
    // Add the sender to the recipient's friends list
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient }
    });
    // Add the recipient to the sender's friends list
    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender }
    });

    res.status(200).json({ message: "Friend request accepted", friendRequest });
  }
  catch(error){
    console.error("Error accepting friend request:", error);
    res.status(500).json({ message: "Error accepting friend request", error });
  }
}

export async function rejectFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;
    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (friendRequest.recipient.toString() !== req.user.id) {
      return res.status(403).json({ 
        message: "You are not authorized to reject this friend request" 
      });
    }

    // Delete the request completely rather than just marking as rejected
    await FriendRequest.deleteOne({ _id: requestId });

    res.status(200).json({ 
      message: "Friend request rejected and removed",
      requestId 
    });
  } catch (error) {
    console.error("Error rejecting friend request:", error);
    res.status(500).json({ 
      message: "Error rejecting friend request", 
      error: error.message 
    });
  }
}

export async function cancelFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;
    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (friendRequest.sender.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to cancel this friend request" });
    }

    // Optional: remove from recipient's friendRequests list
    await User.findByIdAndUpdate(friendRequest.recipient, {
      $pull: { friendRequests: requestId }
    });

    await FriendRequest.deleteOne({ _id: requestId });

    res.status(200).json({ message: "Friend request cancelled" });
  } catch (error) {
    console.error("Error cancelling friend request:", error);
    res.status(500).json({ message: "Error cancelling friend request", error });
  }
}

export async function getFriendRequests(req, res) {
  try {
    const incomingReqs = await FriendRequest.find({ 
      recipient: req.user.id, 
      status: "pending" 
    })
    .populate("sender", "fullName bio profilePic nativeLanguage learningLanguage")
    .select('sender status createdAt'); // Explicitly select fields you need

    const acceptedReqs = await FriendRequest.find({
      sender: req.user.id, 
      status: "accepted" 
    })
    .populate("recipient", "fullName bio profilePic nativeLanguage learningLanguage")
    .select('recipient status createdAt');

    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch(error) {
    console.error("Error fetching friend requests:", error);
    res.status(500).json({ message: "Error fetching friend requests", error });
  }
}

export async function getOutgoingFriendRequests(req, res) {
  try{
    const outgoingReqs = await FriendRequest.find({ sender: req.user.id, status: "pending" })
      .populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

    res.status(200).json({ outgoingReqs });
  } catch(error){
    console.error("Error fetching outgoing friend requests:", error);
    res.status(500).json({ message: "Error fetching outgoing friend requests", error });
  }
}


export async function searchUsers(req, res) {
  try {
    const { query } = req.query;
    const currentUserId = req.user._id;

    if (!query || query.length < 3) {
      return res.status(400).json({ message: 'Search query must be at least 3 characters' });
    }

    const users = await User.find({
      $or: [
        { fullName: { $regex: query, $options: 'i' } },
        { nativeLanguage: { $regex: query, $options: 'i' } },
        { learningLanguage: { $regex: query, $options: 'i' } }
      ],
      _id: { $ne: currentUserId } // Exclude current user
    }).select('-password -email -__v');

    // Check if any requests already exist
    const friendRequests = await FriendRequest.find({
      $or: [
        { requester: currentUserId },
        { recipient: currentUserId }
      ]
    });

    const usersWithStatus = users.map(user => {
      const request = friendRequests.find(req => 
        req.requester.equals(currentUserId) && req.recipient.equals(user._id) ||
        req.recipient.equals(currentUserId) && req.requester.equals(user._id)
      );

      return {
        ...user.toObject(),
        friendStatus: request ? (request.status === 'accepted' ? 'friends' : 'pending') : 'none'
      };
    });

    res.status(200).json(usersWithStatus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

