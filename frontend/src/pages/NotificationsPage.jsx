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
  MapPinIcon,
  GlobeIcon,
  FrownIcon
} from "lucide-react"
import NoNotificationsFound from "../components/NoNotificationsFound"
import { capitialize } from "../lib/utils"
import { getLanguageFlag } from "../components/FriendCard"
import { Link } from "react-router"
import LoadingSpinner from "../components/LoadingSpinner"
import EmptyState from "../components/EmptyState"

const NotificationsPage = () => {
  const queryClient = useQueryClient()

  const { data: friendRequests, isLoading, isError } = useQuery({
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

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 p-4 sm:p-6 lg:p-8">
        <EmptyState
          icon={<FrownIcon className="w-16 h-16 text-error" />}
          title="Connection Error"
          description="Unable to load your notifications. Please try again later."
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Notifications
            </h1>
            <p className="text-base-content/70 mt-2">
              Stay updated with friend requests and new connections
            </p>
          </div>
          
          {(incomingRequests.length > 0 || acceptedRequests.length > 0) && (
            <div className="flex gap-2">
              {incomingRequests.length > 0 && (
                <div className="badge badge-primary gap-1 px-3 py-2">
                  <UserPlusIcon className="h-4 w-4" />
                  {incomingRequests.length} Request{incomingRequests.length !== 1 ? 's' : ''}
                </div>
              )}
              {acceptedRequests.length > 0 && (
                <div className="badge badge-success gap-1 px-3 py-2">
                  <UserCheckIcon className="h-4 w-4" />
                  {acceptedRequests.length} New
                </div>
              )}
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Incoming Friend Requests */}
            {incomingRequests.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/20">
                    <UserPlusIcon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-base-content">Friend Requests</h2>
                </div>

                <div className="grid gap-6">
                  {incomingRequests.map((request) => (
                    <div
                      key={request._id}
                      className="card bg-base-100 border border-base-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="card-body p-6">
                        <div className="flex flex-col md:flex-row items-start gap-6">
                          {/* User Info */}
                          <div className="flex items-start gap-4 flex-1">
                            <div className="avatar">
                              <div className="w-16 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                                <img
                                  src={request.sender.profilePic || "/placeholder-user.jpg"}
                                  alt={request.sender.fullName}
                                />
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-lg">{request.sender?.fullName || "Unknown user"}</h3>
                              
                              {request.sender.location && (
                                <div className="flex items-center text-sm text-base-content/60 mt-1">
                                  <MapPinIcon className="h-4 w-4 mr-1" />
                                  {request.sender.location}
                                </div>
                              )}

                              {/* Language Badges */}
                              <div className="flex flex-wrap gap-2 my-3">
                                <span className="badge badge-primary">
                                  <GlobeIcon className="h-3 w-3 mr-1" />
                                  {capitialize(request.sender.nativeLanguage)}
                                </span>
                                <span className="badge badge-outline">
                                  {capitialize(request.sender.learningLanguage)}
                                </span>
                              </div>

                              {/* Bio */}
                              {request.sender.bio && (
                                <p className="text-sm text-base-content/70 mb-3">
                                  {request.sender.bio}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3 w-full md:w-auto">
                            <button
                              className="btn btn-outline btn-error flex-1 md:flex-none"
                              disabled={isPending || isDeclining}
                              onClick={() => handleDeclineRequest(request._id)}
                            >
                              {isDeclining ? (
                                <span className="loading loading-spinner loading-sm" />
                              ) : (
                                <XCircleIcon className="h-4 w-4 mr-1" />
                              )}
                              Decline
                            </button>
                            <button
                              className="btn btn-primary flex-1 md:flex-none"
                              onClick={() => acceptRequestMutation(request._id)}
                              disabled={isPending || isDeclining}
                            >
                              {isPending ? (
                                <span className="loading loading-spinner loading-sm" />
                              ) : (
                                <CheckCircleIcon className="h-4 w-4 mr-1" />
                              )}
                              Accept
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Accepted Requests Notifications */}
            {acceptedRequests.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-success/20">
                    <UserCheckIcon className="h-5 w-5 text-success" />
                  </div>
                  <h2 className="text-xl font-bold text-base-content">New Connections</h2>
                </div>

                <div className="grid gap-4">
                  {acceptedRequests.map((notification) => (
                    <div
                      key={notification._id}
                      className="card bg-base-100 border border-success/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="card-body p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="avatar">
                              <div className="w-12 rounded-full ring-2 ring-success ring-offset-2 ring-offset-base-100">
                                <img
                                  src={notification.recipient.profilePic || "/placeholder-user.jpg"}
                                  alt={notification.recipient.fullName}
                                />
                              </div>
                            </div>
                            <div>
                              <h3 className="font-bold text-base-content">
                                {notification.recipient.fullName}
                              </h3>
                              <p className="text-sm text-base-content/70 mt-1">
                                Accepted your friend request
                              </p>
                              <div className="flex items-center gap-1 mt-1 text-xs text-base-content/50">
                                <ClockIcon className="h-3 w-3" />
                                Recently
                              </div>
                            </div>
                          </div>
                          
                          <Link
                            to={`/chat/${notification.recipient._id}`}
                            className="btn btn-success btn-sm"
                          >
                            <MessageSquareIcon className="h-4 w-4 mr-1" />
                            Chat
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* No Notifications Found */}
            {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
              <NoNotificationsFound />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default NotificationsPage