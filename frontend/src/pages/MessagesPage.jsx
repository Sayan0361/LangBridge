"use client"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { 
  MessageCircleIcon, 
  SearchIcon, 
  UserIcon, 
  MapPinIcon, 
  MessageSquareIcon, 
  Star, 
  Users,
  GlobeIcon,
  VideoIcon,
  FrownIcon
} from "lucide-react"
import { getUserFriends } from "../lib/api"
import { capitialize } from "../lib/utils"
import { getLanguageFlag } from "../components/FriendCard"
import LoadingSpinner from "../components/LoadingSpinner"
import EmptyState from "../components/EmptyState"

const MessagesPage = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")

  // Fetch friends data
  const {
    data: friends = [],
    isLoading: loadingFriends,
    isError: friendsError,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  })

  // Filter friends based on search
  const filteredFriends = friends.filter((friend) => 
    friend.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.nativeLanguage.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.learningLanguage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Handle starting conversation
  const handleStartConversation = (friendId) => {
    navigate(`/chat/${friendId}`)
  }

  if (friendsError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 p-4 sm:p-6 lg:p-8">
        <EmptyState
          icon={<FrownIcon className="w-16 h-16 text-error" />}
          title="Connection Error"
          description="Unable to load your friends. Please try again later."
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Messages
            </h1>
            <p className="text-base-content/70 mt-2">
              Start conversations with your language learning partners
            </p>
          </div>
          
          {friends.length > 0 && (
            <div className="relative w-full md:w-auto">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/30 h-4 w-4" />
              <input
                type="text"
                placeholder="Search friends..."
                className="pl-10 pr-4 py-2 border border-base-300 rounded-lg bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/20 w-full md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Friends List */}
        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : filteredFriends.length === 0 ? (
          <EmptyState
            icon={<MessageCircleIcon className="w-16 h-16 text-info" />}
            title={friends.length === 0 ? "No friends yet" : "No friends found"}
            description={
              friends.length === 0
                ? "Add some friends first to start messaging them!"
                : "Try adjusting your search to find the friend you're looking for."
            }
            actionText={friends.length === 0 ? "Find Friends" : "Clear Search"}
            onAction={() => friends.length === 0 ? navigate("/friends") : setSearchQuery("")}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFriends.map((friend) => (
              <div
                key={friend._id}
                className="card bg-base-100 border border-base-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="card-body p-6">
                  {/* Friend Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="avatar">
                      <div className="w-16 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                        <img 
                          src={friend.profilePic || "/placeholder-user.jpg"} 
                          alt={friend.fullName} 
                        />
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

                  {/* Language Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="badge badge-primary">
                      <GlobeIcon className="h-3 w-3 mr-1" />
                      {capitialize(friend.nativeLanguage)}
                    </span>
                    <span className="badge badge-outline">
                      {capitialize(friend.learningLanguage)}
                    </span>
                  </div>

                  {/* Bio Preview */}
                  {friend.bio && (
                    <p className="text-sm text-base-content/70 mb-4 line-clamp-2">
                      {friend.bio}
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="card-actions justify-between">
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => handleStartConversation(friend._id)}
                    >
                      <MessageSquareIcon className="h-4 w-4 mr-1" />
                      Message
                    </button>
                    <button className="btn btn-secondary btn-sm"
                      onClick={() => handleStartConversation(friend._id)}>
                      <VideoIcon className="h-4 w-4 mr-1" />
                      Call
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Stats */}
        {friends.length > 0 && (
          <div className="mt-12">
            <div className="bg-base-100/50 backdrop-blur-sm rounded-2xl border border-base-300 p-6 max-w-2xl mx-auto hover:shadow-lg transition-shadow duration-300">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">{friends.length}</div>
                  <div className="text-sm sm:text-base text-base-content/70">Language Partners</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-secondary mb-2">
                    {new Set(friends.map((f) => f.nativeLanguage)).size}
                  </div>
                  <div className="text-sm sm:text-base text-base-content/70">Languages Available</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MessagesPage