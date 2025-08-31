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
  SmileIcon,
  SearchIcon,
  FilterIcon,
  GlobeIcon,
  MessageCircleIcon,
  VideoIcon
} from 'lucide-react';
import FriendCard from '../components/FriendCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { capitialize } from '../lib/utils';
import { useNavigate } from 'react-router';

const FriendsPage = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('friends');
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [languageFilter, setLanguageFilter] = useState('all');
  const navigate = useNavigate();

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

  const handleStartConversation = (friendId) => {
    navigate(`/chat/${friendId}`)
  }

  const handleSendRequest = (userId) => {
    sendRequest(userId);
  };

  const handleCancelRequest = (requestId) => {
    cancelRequest(requestId);
  };

  // Filter friends based on search and language filter
  const filteredFriends = friends.filter(friend => {
    const matchesSearch = friend.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          friend.bio?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = languageFilter === 'all' || 
                            friend.nativeLanguage === languageFilter || 
                            friend.learningLanguage === languageFilter;
    return matchesSearch && matchesLanguage;
  });

  // Get unique languages for filter dropdown
  const allLanguages = Array.from(
    new Set([
      ...friends.map(f => f.nativeLanguage),
      ...friends.map(f => f.learningLanguage)
    ])
  ).filter(lang => lang);

  // Handle errors
  if (friendsError || outgoingError || recommendedError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 p-4 sm:p-6 lg:p-8">
        <EmptyState
          icon={<FrownIcon className="w-16 h-16 text-error" />}
          title="Connection Error"
          description="We couldn't load your friends data. Please try again later."
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Your Language Community
            </h1>
            <p className="text-base-content/70 mt-2">
              {activeTab === 'friends' 
                ? 'Connect with your language partners' 
                : 'Find new learners to practice with'}
            </p>
          </div>
          
          {activeTab === 'friends' && friends.length > 0 && (
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/30 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search friends..."
                  className="pl-10 pr-4 py-2 border border-base-300 rounded-lg bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/20 w-full md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="relative">
                <select
                  className="pl-10 pr-8 py-2 border border-base-300 rounded-lg bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                  value={languageFilter}
                  onChange={(e) => setLanguageFilter(e.target.value)}
                >
                  <option value="all">All Languages</option>
                  {allLanguages.map(lang => (
                    <option key={lang} value={lang}>{capitialize(lang)}</option>
                  ))}
                </select>
                <FilterIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/30 h-4 w-4" />
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-base-300 mb-8">
          <button
            className={`px-4 py-3 font-medium flex items-center gap-2 transition-all ${
              activeTab === 'friends' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-base-content/60 hover:text-base-content'
            }`}
            onClick={() => setActiveTab('friends')}
          >
            <UsersIcon className="h-5 w-5" />
            My Friends {friends.length > 0 && <span className="badge badge-primary badge-sm">{friends.length}</span>}
          </button>
          <button
            className={`px-4 py-3 font-medium flex items-center gap-2 transition-all ${
              activeTab === 'discover' 
                ? 'border-b-2 border-secondary text-secondary' 
                : 'text-base-content/60 hover:text-base-content'
            }`}
            onClick={() => setActiveTab('discover')}
          >
            <UserPlusIcon className="h-5 w-5" />
            Discover
          </button>
        </div>

        {/* Friends Tab */}
        {activeTab === 'friends' && (
          <div className="space-y-6">
            {loadingFriends ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : filteredFriends.length === 0 ? (
              <EmptyState
                icon={<SmileIcon className="w-16 h-16 text-warning" />}
                title={searchQuery || languageFilter !== 'all' ? "No matching friends" : "No Friends Yet"}
                description={
                  searchQuery || languageFilter !== 'all' 
                    ? "Try adjusting your search or filter criteria" 
                    : "Start by exploring recommended users in the Discover tab!"
                }
                actionText="Find Friends"
                onAction={() => setActiveTab('discover')}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredFriends.map((friend) => (
                  <div key={friend._id} className="card bg-base-100 border border-base-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="card-body p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="avatar">
                          <div className="w-16 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                            <img src={friend.profilePic || "/placeholder-user.jpg"} alt={friend.fullName} />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{friend.fullName}</h3>
                          {friend.location && (
                            <div className="flex items-center text-sm text-base-content/60 mt-1">
                              <MapPinIcon className="h-4 w-4 mr-1" />
                              {friend.location}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="badge badge-primary">
                          <GlobeIcon className="h-3 w-3 mr-1" />
                          {capitialize(friend.nativeLanguage)}
                        </span>
                        <span className="badge badge-outline">
                          {capitialize(friend.learningLanguage)}
                        </span>
                      </div>

                      {friend.bio && (
                        <p className="text-sm text-base-content/70 mb-4 line-clamp-2">
                          {friend.bio}
                        </p>
                      )}

                      <div className="card-actions justify-between mt-2">
                        <button className="btn btn-primary btn-sm" onClick={() => handleStartConversation(friend._id)}>
                          <MessageCircleIcon className="h-4 w-4 mr-1" />
                          Chat
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={() => handleStartConversation(friend._id)}>
                          <VideoIcon className="h-4 w-4 mr-1" />
                          Call
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Discover Tab */}
        {activeTab === 'discover' && (
          <div className="space-y-6">
            {loadingRecommendedUsers || loadingOutgoingReqs ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <>
                <div className="bg-base-100 rounded-2xl p-6 border border-base-300 mb-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <UserPlusIcon className="h-5 w-5 text-secondary" />
                    Suggested Language Partners
                  </h2>
                  <p className="text-base-content/70">
                    Connect with these users who share your language interests and learning goals.
                  </p>
                </div>

                {recommendedUsers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendedUsers.map((user) => {
                      const requestSent = outgoingRequestsIds.has(user._id);
                      const existingRequest = outgoingData.outgoingReqs.find(req => req.recipient._id === user._id);
                      
                      return (
                        <div key={user._id} className="card bg-base-100 border border-base-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                          <div className="card-body p-6">
                            <div className="flex items-center gap-4 mb-4">
                              <div className="avatar">
                                <div className="w-16 rounded-full ring-2 ring-secondary ring-offset-2 ring-offset-base-100">
                                  <img src={user.profilePic || "/placeholder-user.jpg"} alt={user.fullName} />
                                </div>
                              </div>
                              <div>
                                <h3 className="font-bold text-lg">{user.fullName}</h3>
                                {user.location && (
                                  <div className="flex items-center text-sm text-base-content/60 mt-1">
                                    <MapPinIcon className="h-4 w-4 mr-1" />
                                    {user.location}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                              <span className="badge badge-primary">
                                <GlobeIcon className="h-3 w-3 mr-1" />
                                {capitialize(user.nativeLanguage)}
                              </span>
                              <span className="badge badge-outline">
                                {capitialize(user.learningLanguage)}
                              </span>
                            </div>

                            {user.bio && (
                              <p className="text-sm text-base-content/70 mb-4 line-clamp-2">
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
                                  className="btn btn-secondary w-full"
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
                    icon={<UserPlusIcon className="w-16 h-16 text-info" />}
                    title="No recommendations available"
                    description="Check back later for new language partners!"
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;