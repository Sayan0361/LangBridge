"use client"
import { useState, useEffect } from "react"
import useAuthUser from "../hooks/useAuthUser"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CameraIcon, LoaderIcon, MapPinIcon, ShuffleIcon, UserIcon, SaveIcon, EditIcon, MailIcon } from "lucide-react"
import { LANGUAGES } from "../constants"
import toast from "react-hot-toast"
import { capitialize } from "../lib/utils"
import { getLanguageFlag } from "../components/FriendCard"
import { completeOnboarding } from "../lib/api"

const ProfilePage = () => {
  const { authUser } = useAuthUser()
  const queryClient = useQueryClient()
  const [isEditing, setIsEditing] = useState(false)

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  })

  // Update form state when authUser changes
  useEffect(() => {
    if (authUser) {
      setFormState({
        fullName: authUser.fullName || "",
        bio: authUser.bio || "",
        nativeLanguage: authUser.nativeLanguage || "",
        learningLanguage: authUser.learningLanguage || "",
        location: authUser.location || "",
        profilePic: authUser.profilePic || "",
      })
    }
  }, [authUser])

  const { mutate: updateProfileMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile updated successfully")
      queryClient.invalidateQueries({ queryKey: ["authUser"] })
      setIsEditing(false)
    },
    onError: (error) => {
      console.log(error)
      toast.error(error.response?.data?.message || "Failed to update profile")
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProfileMutation(formState)
  }

  const handleRandomAvatar = () => {
    const styles = [
      "adventurer",
      "adventurer-neutral",
      "avataaars",
      "big-ears",
      "big-ears-neutral",
      "big-smile",
      "bottts",
      "croodles",
      "fun-emoji",
      "icons",
      "identicon",
      "initials",
      "lorelei",
      "micah",
      "miniavs",
      "open-peeps",
      "personas",
      "pixel-art",
    ]

    const randomStyle = styles[Math.floor(Math.random() * styles.length)]
    const randomSeed = Math.random().toString(36).substring(7)
    const randomAvatar = `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${randomSeed}`

    setFormState({ ...formState, profilePic: randomAvatar })
    toast.success("Avatar changed successfully")
  }

  const handleCancel = () => {
    setFormState({
      fullName: authUser?.fullName || "",
      bio: authUser?.bio || "",
      nativeLanguage: authUser?.nativeLanguage || "",
      learningLanguage: authUser?.learningLanguage || "",
      location: authUser?.location || "",
      profilePic: authUser?.profilePic || "",
    })
    setIsEditing(false)
  }

  if (!authUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
              <UserIcon className="size-6 sm:size-7 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              My Profile
            </h1>
          </div>
          <p className="text-base-content/70 text-sm sm:text-base">
            {isEditing ? "Edit your profile information" : "View and manage your profile"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Profile Summary Card */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 border border-base-300 shadow-lg sticky top-6">
              <div className="card-body p-6 text-center space-y-4">
                {/* Profile Picture */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="size-32 rounded-full bg-base-300 overflow-hidden ring-4 ring-primary/20">
                    {authUser.profilePic ? (
                      <img
                        src={authUser.profilePic || "/placeholder.svg"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <UserIcon className="size-16 text-base-content/40" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-xl font-bold">{authUser.fullName}</h2>
                    <div className="flex items-center justify-center gap-2 text-sm text-base-content/70">
                      <MailIcon className="size-4" />
                      <span>{authUser.email}</span>
                    </div>
                    {authUser.location && (
                      <div className="flex items-center justify-center gap-2 text-sm text-base-content/70">
                        <MapPinIcon className="size-4" />
                        <span>{authUser.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Language Badges */}
                <div className="space-y-3">
                  <div className="divider text-xs">Languages</div>
                  <div className="space-y-2">
                    {authUser.nativeLanguage && (
                      <div className="badge badge-primary gap-2 p-3">
                        <span>{getLanguageFlag(authUser.nativeLanguage)}</span>
                        <span className="text-xs">Native: {capitialize(authUser.nativeLanguage)}</span>
                      </div>
                    )}
                    {authUser.learningLanguage && (
                      <div className="badge badge-outline gap-2 p-3">
                        <span>{getLanguageFlag(authUser.learningLanguage)}</span>
                        <span className="text-xs">Learning: {capitialize(authUser.learningLanguage)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bio */}
                {authUser.bio && (
                  <div className="space-y-2">
                    <div className="divider text-xs">About</div>
                    <p className="text-sm text-base-content/80 leading-relaxed">{authUser.bio}</p>
                  </div>
                )}

                {/* Edit Button */}
                {!isEditing && (
                  <button className="btn btn-primary w-full gap-2" onClick={() => setIsEditing(true)}>
                    <EditIcon className="size-4" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 border border-base-300 shadow-lg">
              <div className="card-body p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">{isEditing ? "Edit Profile" : "Profile Information"}</h2>
                  {!isEditing && (
                    <button className="btn btn-outline btn-sm gap-2" onClick={() => setIsEditing(true)}>
                      <EditIcon className="size-4" />
                      Edit
                    </button>
                  )}
                </div>

                {isEditing ? (
                  /* Edit Form */
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Picture Section */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Profile Picture</span>
                      </label>
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="size-24 rounded-full bg-base-300 overflow-hidden">
                          {formState.profilePic ? (
                            <img
                              src={formState.profilePic || "/placeholder.svg"}
                              alt="Profile preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <CameraIcon className="size-8 text-base-content/40" />
                            </div>
                          )}
                        </div>
                        <button type="button" onClick={handleRandomAvatar} className="btn btn-secondary btn-sm gap-2">
                          <ShuffleIcon className="size-4" />
                          Generate Random Avatar
                        </button>
                      </div>
                    </div>

                    {/* Full Name */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Full Name*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formState.fullName}
                        onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                        className="input input-bordered w-full"
                        placeholder="Your full name"
                        required
                      />
                    </div>

                    {/* Email (Read-only) */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Email</span>
                      </label>
                      <input
                        type="email"
                        value={authUser.email}
                        className="input input-bordered w-full bg-base-200 cursor-not-allowed"
                        disabled
                      />
                      <label className="label">
                        <span className="label-text-alt text-base-content/60">Email cannot be changed</span>
                      </label>
                    </div>

                    {/* Bio */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Bio*</span>
                      </label>
                      <textarea
                        name="bio"
                        value={formState.bio}
                        onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                        className="textarea textarea-bordered h-24 resize-none"
                        placeholder="Tell others about yourself and your language learning goals"
                        required
                      />
                    </div>

                    {/* Languages */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Native Language */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Native Language*</span>
                        </label>
                        <select
                          name="nativeLanguage"
                          value={formState.nativeLanguage}
                          onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                          className="select select-bordered w-full"
                          required
                        >
                          <option value="">Select your native language</option>
                          {LANGUAGES.map((lang) => (
                            <option key={`native-${lang}`} value={lang.toLowerCase()}>
                              {lang}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Learning Language */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Learning Language*</span>
                        </label>
                        <select
                          name="learningLanguage"
                          value={formState.learningLanguage}
                          onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                          className="select select-bordered w-full"
                          required
                        >
                          <option value="">Select your learning language</option>
                          {LANGUAGES.map((lang) => (
                            <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                              {lang}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Location*</span>
                      </label>
                      <div className="relative">
                        <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content/70" />
                        <input
                          type="text"
                          name="location"
                          value={formState.location}
                          onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                          className="input input-bordered w-full pl-10"
                          placeholder="City, Country"
                          required
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <button className="btn btn-primary flex-1 gap-2" disabled={isPending} type="submit">
                        {isPending ? (
                          <>
                            <LoaderIcon className="animate-spin size-5" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <SaveIcon className="size-5" />
                            Save Changes
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline flex-1"
                        onClick={handleCancel}
                        disabled={isPending}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  /* View Mode */
                  <div className="space-y-6">
                    {/* Profile Information Display */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-base-content/70">Full Name</label>
                          <p className="text-base font-medium mt-1">{authUser.fullName || "Not set"}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-base-content/70">Email</label>
                          <p className="text-base font-medium mt-1 flex items-center gap-2">
                            <MailIcon className="size-4" />
                            {authUser.email}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-base-content/70">Location</label>
                          <p className="text-base font-medium mt-1 flex items-center gap-2">
                            <MapPinIcon className="size-4" />
                            {authUser.location || "Not set"}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-base-content/70">Native Language</label>
                          <p className="text-base font-medium mt-1 flex items-center gap-2">
                            {authUser.nativeLanguage && getLanguageFlag(authUser.nativeLanguage)}
                            {authUser.nativeLanguage ? capitialize(authUser.nativeLanguage) : "Not set"}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-base-content/70">Learning Language</label>
                          <p className="text-base font-medium mt-1 flex items-center gap-2">
                            {authUser.learningLanguage && getLanguageFlag(authUser.learningLanguage)}
                            {authUser.learningLanguage ? capitialize(authUser.learningLanguage) : "Not set"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-base-content/70">Bio</label>
                      <p className="text-base mt-1 leading-relaxed">{authUser.bio || "No bio added yet"}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
