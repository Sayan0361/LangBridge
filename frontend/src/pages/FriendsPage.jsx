import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getUserFriends, 
  getOutgoingFriendReqs, 
  getRecommendedUsers,
  sendFriendRequest,
  cancelFriendRequest 
} from '../lib/api';
import { 
  UsersIcon, 
  UserPlusIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  MapPinIcon,
  FrownIcon,
  SmileIcon
} from 'lucide-react';
import FriendCard from '../components/FriendCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { capitialize } from '../lib/utils';

const FriendsPage = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('friends');
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  // Fetch data
  const { 
    data: friends = [], 
    isLoading: loadingFriends, 
    isError: friendsError 
  } = useQuery({
    queryKey: ['friends'],
    queryFn: getUserFriends,
  });

  const { 
    data: outgoingData = { outgoingReqs: [] }, 
    isLoading: loadingOutgoingReqs,
    isError: outgoingError
  } = useQuery({
    queryKey: ['outgoingFriendReqs'],
    queryFn: getOutgoingFriendReqs,
  });

  const { 
    data: recommendedUsers = [], 
    isLoading: loadingRecommendedUsers,
    isError: recommendedError
  } = useQuery({
    queryKey: ['recommendedUsers'],
    queryFn: getRecommendedUsers,
  });

  // Update outgoing request IDs
  useEffect(() => {
    const outgoingIds = new Set(outgoingData.outgoingReqs.map(req => req.recipient._id));
    setOutgoingRequestsIds(outgoingIds);
  }, [outgoingData]);

  // Mutations
  const { mutate: sendRequest, isPending: isSendingRequest } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['outgoingFriendReqs']);
    }
  });

  const { mutate: cancelRequest, isPending: isCancelingRequest } = useMutation({
    mutationFn: cancelFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['outgoingFriendReqs']);
    }
  });

  const handleSendRequest = (userId) => {
    sendRequest(userId);
  };

  const handleCancelRequest = (requestId) => {
    cancelRequest(requestId);
  };

  // Handle errors
  if (friendsError || outgoingError || recommendedError) {
    return (
      <EmptyState
        icon={<FrownIcon className="w-12 h-12" />}
        title="Connection Error"
        description="We couldn't load your friends data. Please try again later."
      />
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Language Community</h1>
          <p className="text-muted-foreground">
            {activeTab === 'friends' 
              ? 'Connect with your language partners' 
              : 'Find new learners to practice with'}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'friends' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('friends')}
        >
          <UsersIcon className="inline mr-2 h-4 w-4" />
          My Friends ({friends.length})
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'discover' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('discover')}
        >
          <UserPlusIcon className="inline mr-2 h-4 w-4" />
          Discover
        </button>
      </div>

      {/* Friends Tab */}
      {activeTab === 'friends' && (
        <div className="space-y-6">
          {loadingFriends ? (
            <LoadingSpinner />
          ) : friends.length === 0 ? (
            <EmptyState
              icon={<SmileIcon className="w-12 h-12" />}
              title="No Friends Yet"
              description="Start by exploring recommended users in the Discover tab!"
              actionText="Find Friends"
              onAction={() => setActiveTab('discover')}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {friends.map((friend) => (
                <FriendCard 
                  key={friend._id} 
                  friend={friend} 
                  variant="friend"
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Discover Tab */}
      {activeTab === 'discover' && (
        <div className="space-y-6">
          {loadingRecommendedUsers || loadingOutgoingReqs ? (
            <LoadingSpinner />
          ) : (
            <>
              {recommendedUsers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedUsers.map((user) => {
                    const requestSent = outgoingRequestsIds.has(user._id);
                    const existingRequest = outgoingData.outgoingReqs.find(req => req.recipient._id === user._id);
                    
                    return (
                      <div key={user._id} className="card bg-background hover:shadow-md transition-shadow">
                        <div className="card-body p-5">
                          <div className="flex items-center gap-4">
                            <div className="avatar">
                              <div className="w-16 rounded-full">
                                <img src={user.profilePic} alt={user.fullName} />
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{user.fullName}</h3>
                              {user.location && (
                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                  <MapPinIcon className="h-3 w-3 mr-1" />
                                  {user.location}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            <span className="badge badge-primary">
                              {capitialize(user.nativeLanguage)}
                            </span>
                            <span className="badge badge-outline">
                              {capitialize(user.learningLanguage)}
                            </span>
                          </div>

                          {user.bio && (
                            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                              {user.bio}
                            </p>
                          )}

                          <div className="mt-4">
                            {requestSent ? (
                              <button
                                className="btn btn-outline w-full"
                                onClick={() => handleCancelRequest(existingRequest._id)}
                                disabled={isCancelingRequest}
                              >
                                {isCancelingRequest ? (
                                  <span className="loading loading-spinner loading-sm" />
                                ) : (
                                  <>
                                    <CheckCircleIcon className="h-4 w-4 mr-2" />
                                    Request Sent
                                  </>
                                )}
                              </button>
                            ) : (
                              <button
                                className="btn btn-primary w-full"
                                onClick={() => handleSendRequest(user._id)}
                                disabled={isSendingRequest}
                              >
                                {isSendingRequest ? (
                                  <span className="loading loading-spinner loading-sm" />
                                ) : (
                                  <>
                                    <UserPlusIcon className="h-4 w-4 mr-2" />
                                    Add Friend
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <EmptyState
                  icon={<UserPlusIcon className="w-12 h-12" />}
                  title="No recommendations available"
                  description="Check back later for new language partners!"
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FriendsPage;