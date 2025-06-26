import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { searchUsers, getMyFriends, getRecommendedUsers,sendFriendRequest,acceptFriendRequest,getFriendRequests,getOutgoingFriendRequests,rejectFriendRequest,cancelFriendRequest } from '../controllers/user.controller.js';

const router = express.Router();
// Apply the protectRoute middleware to all routes in this router
router.use(protectRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);
router.delete("/friend-request/:id/reject", rejectFriendRequest);
router.delete("/friend-request/:id/cancel", cancelFriendRequest);

router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendRequests);

router.get('/search', searchUsers);

export default router;