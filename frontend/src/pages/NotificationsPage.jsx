"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { acceptFriendRequest, declineFriendRequest, getFriendRequests } from "../lib/api"
import {
  BellIcon,
  ClockIcon,
  MessageSquareIcon,
  UserCheckIcon,
  UserPlusIcon,
  CheckCircleIcon,
  XCircleIcon,
  SparklesIcon,
  Star,
  Users,
} from "lucide-react"
import NoNotificationsFound from "../components/NoNotificationsFound"
import { capitialize } from "../lib/utils"
import { getLanguageFlag } from "../components/FriendCard"
import { Link } from "react-router"

const NotificationsPage = () => {
  const queryClient = useQueryClient()

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  })

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["friendRequests"],
      })
      queryClient.invalidateQueries({
        queryKey: ["friends"],
      })
    },
  })

  const { mutate: declineRequestMutation, isPending: isDeclining } = useMutation({
    mutationFn: declineFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(["friendRequests"])
    },
  })

  const incomingRequests = friendRequests?.incomingReqs || []
  const acceptedRequests = friendRequests?.acceptedReqs || []

  const handleDeclineRequest = (requestId) => {
    if (window.confirm("Are you sure you want to decline this friend request?")) {
      declineRequestMutation(requestId)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-4xl">
        {/* Enhanced Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 shadow-lg">
              <BellIcon className="size-6 sm:size-7 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Notifications
            </h1>
          </div>
          <p className="text-base-content/70 text-sm sm:text-base">
            Stay updated with friend requests and new connections
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16 sm:py-20">
            <div className="flex flex-col items-center gap-4">
              <span className="loading loading-spinner loading-lg text-primary" />
              <p className="text-base-content/60 text-sm">Loading notifications...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {/* Incoming Friend Requests */}
            {incomingRequests.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-primary/20 shadow-md">
                    <UserPlusIcon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-base-content">Friend Requests</h2>
                  <div className="badge badge-primary gap-1 px-3 py-2 shadow-sm">
                    <SparklesIcon className="size-3" />
                    <span className="font-semibold">{incomingRequests.length}</span>
                  </div>
                </div>

                <div className="grid gap-4 sm:gap-6">
                  {incomingRequests.map((request) => (
                    <div
                      key={request._id}
                      className="group relative bg-base-100 rounded-2xl border border-base-300 hover:border-primary/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                    >
                      {/* Background Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          {/* Enhanced User Info */}
                          <div className="flex items-start gap-4 flex-1">
                            {/* Enhanced Avatar */}
                            <div className="relative flex-shrink-0">
                              <div className="w-16 h-16 rounded-full overflow-hidden ring-3 ring-base-300 group-hover:ring-primary/30 transition-all duration-300 shadow-lg">
                                <img
                                  src={request.sender.profilePic || "/placeholder.svg"}
                                  alt={request.sender.fullName}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                              {/* Status Indicator */}
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success border-3 border-base-100 rounded-full shadow-sm"></div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-base sm:text-lg text-base-content truncate group-hover:text-primary transition-colors duration-200">
                                {request.sender?.fullName || "Unknown user"}
                              </h3>

                              {/* Rating/Stats */}
                              <div className="flex items-center gap-1 mt-1 mb-3">
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-warning fill-current" />
                                  <span className="text-xs font-medium text-base-content">4.8</span>
                                </div>
                                <span className="text-base-content/30 text-xs">•</span>
                                <div className="flex items-center gap-1">
                                  <Users className="w-3 h-3 text-base-content/50" />
                                  <span className="text-xs text-base-content/60">127 chats</span>
                                </div>
                              </div>

                              {/* Enhanced Language Badges */}
                              <div className="space-y-2 mb-3">
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-1 rounded-full text-xs font-medium">
                                    {getLanguageFlag(request.sender.nativeLanguage)}
                                    <span className="hidden sm:inline">Native:</span>
                                    <span>{capitialize(request.sender.nativeLanguage)}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1.5 bg-secondary/10 text-secondary px-2.5 py-1 rounded-full text-xs font-medium">
                                    {getLanguageFlag(request.sender.learningLanguage)}
                                    <span className="hidden sm:inline">Learning:</span>
                                    <span>{capitialize(request.sender.learningLanguage)}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Enhanced Bio */}
                              {request.sender.bio && (
                                <div className="bg-base-200/50 rounded-lg p-3 mb-3">
                                  <p className="text-xs sm:text-sm text-base-content/70 line-clamp-2 leading-relaxed">
                                    {request.sender.bio}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Enhanced Action Buttons */}
                          <div className="flex gap-3 w-full sm:w-auto">
                            <button
                              className="flex-1 sm:flex-none bg-base-200 hover:bg-error/10 text-base-content hover:text-error font-medium py-2.5 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 border border-base-300 hover:border-error/30 flex items-center justify-center gap-2"
                              disabled={isPending || isDeclining}
                              onClick={() => handleDeclineRequest(request._id)}
                            >
                              {isDeclining ? (
                                <span className="loading loading-spinner loading-sm" />
                              ) : (
                                <XCircleIcon className="size-4" />
                              )}
                              <span className="text-sm font-medium">Decline</span>
                            </button>
                            <button
                              className="flex-1 sm:flex-none bg-gradient-to-r from-primary to-primary-focus hover:from-primary-focus hover:to-primary text-primary-content font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                              onClick={() => acceptRequestMutation(request._id)}
                              disabled={isPending || isDeclining}
                            >
                              {isPending ? (
                                <>
                                  <span className="loading loading-spinner loading-sm" />
                                  <span className="text-sm">Accepting...</span>
                                </>
                              ) : (
                                <>
                                  <CheckCircleIcon className="size-4" />
                                  <span className="text-sm font-medium">Accept</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-secondary/0 to-accent/0 group-hover:from-primary/5 group-hover:via-secondary/5 group-hover:to-accent/5 transition-all duration-300 pointer-events-none"></div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Enhanced Accepted Requests Notifications */}
            {acceptedRequests.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-success/20 shadow-md">
                    <UserCheckIcon className="h-5 w-5 text-success" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-base-content">New Connections</h2>
                  <div className="badge badge-success gap-1 px-3 py-2 shadow-sm">
                    <CheckCircleIcon className="size-3" />
                    <span className="font-semibold">{acceptedRequests.length}</span>
                  </div>
                </div>

                <div className="grid gap-4 sm:gap-6">
                  {acceptedRequests.map((notification) => (
                    <div
                      key={notification._id}
                      className="group relative bg-base-100 rounded-2xl border border-success/20 hover:border-success/40 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                    >
                      {/* Success Background Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-success/10 opacity-100 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative p-4 sm:p-6">
                        <div className="flex items-start gap-4">
                          {/* Enhanced Avatar */}
                          <div className="relative flex-shrink-0">
                            <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full overflow-hidden ring-3 ring-success/30 shadow-lg">
                              <img
                                src={notification.recipient.profilePic || "/placeholder.svg"}
                                alt={notification.recipient.fullName}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            {/* Success Indicator */}
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-base-100 rounded-full shadow-sm"></div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-sm sm:text-base text-base-content group-hover:text-success transition-colors duration-200">
                              {notification.recipient.fullName}
                            </h3>
                            <p className="text-xs sm:text-sm text-base-content/80 my-2 leading-relaxed">
                              <span className="font-semibold text-success">{notification.recipient.fullName}</span>{" "}
                              accepted your friend request
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <ClockIcon className="h-3 w-3 text-base-content/50" />
                              <p className="text-xs text-base-content/60 font-medium">Recently</p>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 items-end">
                            <div className="badge badge-success gap-1 px-2 py-1 shadow-sm">
                              <MessageSquareIcon className="h-3 w-3" />
                              <span className="text-xs font-medium">New Friend</span>
                            </div>
                            <Link
                              to={`/chat/${notification.recipient._id}`}
                              className="btn btn-outline btn-xs hover:btn-success transition-all duration-200 transform hover:scale-105"
                            >
                              <MessageSquareIcon className="size-3" />
                              <span className="text-xs">Chat</span>
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Success Glow Effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-success/0 to-success/0 group-hover:from-success/10 group-hover:to-success/5 transition-all duration-300 pointer-events-none"></div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* No Notifications Found */}
            {incomingRequests.length === 0 && acceptedRequests.length === 0 && <NoNotificationsFound />}
          </div>
        )}
      </div>
    </div>
  )
}

export default NotificationsPage
