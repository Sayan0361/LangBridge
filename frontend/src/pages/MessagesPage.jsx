"use client"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { MessageCircleIcon, SearchIcon, UserIcon, MapPinIcon, MessageSquareIcon, Star, Users } from "lucide-react"
import { getUserFriends } from "../lib/api"
import { capitialize } from "../lib/utils"
import { getLanguageFlag } from "../components/FriendCard"

const MessagesPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("friends")
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
  const filteredFriends = friends.filter((friend) => friend.fullName.toLowerCase().includes(searchQuery.toLowerCase()))

  // Handle starting conversation
  const handleStartConversation = (friendId) => {
    navigate(`/chat/${friendId}`)
  }

  if (friendsError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="card bg-error/10 border border-error/20 max-w-md w-full">
          <div className="card-body text-center">
            <div className="text-error text-4xl mb-4">⚠️</div>
            <h3 className="card-title text-error justify-center">Something went wrong</h3>
            <p className="text-error/80">Unable to load your friends. Please try again later.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
              <MessageCircleIcon className="size-6 sm:size-7 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Messages
            </h1>
          </div>
          <p className="text-base-content/70 text-sm sm:text-base">
            Start conversations with your language learning partners
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-base-content/50" />
            <input
              type="text"
              placeholder="Search friends..."
              className="input input-bordered w-full pl-10 focus:border-primary focus:outline-none transition-colors duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Friends List */}
        {loadingFriends ? (
          <div className="flex justify-center py-16 sm:py-20">
            <div className="flex flex-col items-center gap-4">
              <span className="loading loading-spinner loading-lg text-primary" />
              <p className="text-base-content/60 text-sm">Loading your friends...</p>
            </div>
          </div>
        ) : filteredFriends.length === 0 ? (
          <div className="card bg-gradient-to-br from-base-200 to-base-300 border border-base-300 max-w-2xl mx-auto">
            <div className="card-body text-center py-12 sm:py-16">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="card-title text-xl sm:text-2xl justify-center mb-2">
                {friends.length === 0 ? "No friends yet" : "No friends found"}
              </h3>
              <p className="text-base-content/70 max-w-md mx-auto">
                {friends.length === 0
                  ? "Add some friends first to start messaging them!"
                  : "Try adjusting your search to find the friend you're looking for."}
              </p>
              {friends.length === 0 && (
                <button className="btn btn-primary mt-4" onClick={() => navigate("/friends")}>
                  <UserIcon className="size-4 mr-2" />
                  Find Friends
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredFriends.map((friend) => (
              <div
                key={friend._id}
                className="group relative bg-base-100 rounded-2xl border border-base-300 hover:border-primary/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative p-4 sm:p-6">
                  {/* Friend Header */}
                  <div className="flex items-start gap-3 mb-4">
                    {/* Enhanced Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full overflow-hidden ring-2 ring-base-300 group-hover:ring-primary/30 transition-all duration-300 shadow-md">
                        <img
                          src={friend.profilePic || "/placeholder.svg"}
                          alt={friend.fullName}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      {/* Online Status Indicator */}
                      {/* <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-base-100 rounded-full shadow-sm"></div> */}
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base sm:text-lg text-base-content truncate group-hover:text-primary transition-colors duration-200">
                        {friend.fullName}
                      </h3>

                      {/* Location */}
                      {friend.location && (
                        <div className="flex items-center gap-1 mt-1 text-xs sm:text-sm text-base-content/60">
                          <MapPinIcon className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{friend.location}</span>
                        </div>
                      )}

                      {/* Rating/Stats */}
                      {/* <div className="flex items-center gap-1 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-warning fill-current" />
                          <span className="text-xs font-medium text-base-content">4.8</span>
                        </div>
                        <span className="text-base-content/30 text-xs">•</span>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-base-content/50" />
                          <span className="text-xs text-base-content/60">127</span>
                        </div>
                      </div> */}
                    </div>
                  </div>

                  {/* Language Badges */}
                  <div className="space-y-2 mb-4">
                    {/* Native Language */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-1 rounded-full text-xs font-medium">
                        {getLanguageFlag(friend.nativeLanguage)}
                        <span className="hidden sm:inline">Native:</span>
                        <span>{capitialize(friend.nativeLanguage)}</span>
                      </div>
                    </div>

                    {/* Learning Language */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 bg-secondary/10 text-secondary px-2.5 py-1 rounded-full text-xs font-medium">
                        {getLanguageFlag(friend.learningLanguage)}
                        <span className="hidden sm:inline">Learning:</span>
                        <span>{capitialize(friend.learningLanguage)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bio Preview */}
                  {friend.bio && (
                    <div className="mb-4">
                      <div className="bg-base-200/50 rounded-lg p-3">
                        <p className="text-xs sm:text-sm text-base-content/70 line-clamp-2 leading-relaxed">
                          {friend.bio}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Message Button */}
                  <button
                    className="w-full bg-gradient-to-r from-primary to-primary-focus hover:from-primary-focus hover:to-primary text-primary-content font-semibold py-2.5 sm:py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group/btn"
                    onClick={() => handleStartConversation(friend._id)}
                  >
                    <MessageSquareIcon className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                    <span className="text-xs sm:text-sm font-medium">Send Message</span>
                  </button>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-secondary/0 to-accent/0 group-hover:from-primary/5 group-hover:via-secondary/5 group-hover:to-accent/5 transition-all duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Stats */}
        {friends.length > 0 && (
          <div className="mt-8 sm:mt-12">
            <div className="bg-base-100/50 backdrop-blur-sm rounded-2xl border border-base-300 p-4 sm:p-6 max-w-2xl mx-auto hover:shadow-lg transition-shadow duration-300">
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
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
