import { Link } from "react-router"
import { MessageCircle, MapPin, Star, Users } from "lucide-react"
import { LANGUAGE_TO_FLAG } from "../constants"

const FriendCard = ({ friend }) => {
  return (
    <div className="group relative bg-base-100 rounded-2xl border border-base-300 hover:border-primary/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative p-6">
        {/* Header Section */}
        <div className="flex items-start gap-4 mb-4">
          {/* Enhanced Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden ring-3 ring-base-100 shadow-lg group-hover:ring-primary/20 transition-all duration-300">
              <img
                src={friend.profilePic || "/placeholder.svg"}
                alt={friend.fullName}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            {/* Online Status Indicator
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success border-3 border-base-100 rounded-full shadow-sm"></div> */}
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-base-content truncate group-hover:text-primary transition-colors duration-200">
              {friend.fullName}
            </h3>

            {/* Location */}
            {friend.location && (
              <div className="flex items-center gap-1 mt-1 text-sm text-base-content/60">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{friend.location}</span>
              </div>
            )}

            {/* Rating/Level */}
            {/* <div className="flex items-center gap-1 mt-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-warning fill-current" />
                <span className="text-sm font-medium text-base-content">4.8</span>
              </div>
              <span className="text-base-content/30">•</span>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-base-content/50" />
                <span className="text-sm text-base-content/60">127 chats</span>
              </div>
            </div> */}
          </div>
        </div>

        {/* Language Badges */}
        <div className="space-y-2 mb-5">
          {/* Native Language */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
              {getLanguageFlag(friend.nativeLanguage)}
              <span>Native: {friend.nativeLanguage}</span>
            </div>
          </div>

          {/* Learning Language */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1.5 rounded-full text-sm font-medium">
              {getLanguageFlag(friend.learningLanguage)}
              <span>Learning: {friend.learningLanguage}</span>
            </div>
          </div>
        </div>

        {/* Bio Preview */}
        {friend.bio && (
          <div className="mb-4">
            <p className="text-sm text-base-content/70 line-clamp-2 leading-relaxed">{friend.bio}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            to={`/chat/${friend._id}`}
            className="flex-1 bg-gradient-to-r from-primary to-primary-focus hover:from-primary-focus hover:to-primary text-primary-content font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group/btn"
          >
            <MessageCircle className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            <span>Message</span>
          </Link>

          {/* <button className="bg-base-200 hover:bg-base-300 text-base-content/70 hover:text-base-content font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 border border-base-300 hover:border-base-content/20">
            <Users className="w-4 h-4" />
          </button> */}
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-secondary/0 to-accent/0 group-hover:from-primary/5 group-hover:via-secondary/5 group-hover:to-accent/5 transition-all duration-300 pointer-events-none"></div>
    </div>
  )
}

export default FriendCard

export function getLanguageFlag(language) {
  if (!language) return null

  const langLower = language.toLowerCase()
  const countryCode = LANGUAGE_TO_FLAG[langLower]

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="w-4 h-3 rounded-sm shadow-sm"
      />
    )
  }
  return null
}
