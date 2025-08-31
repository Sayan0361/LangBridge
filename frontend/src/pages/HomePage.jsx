"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router"
import {
  MessageCircle,
  Video,
  Heart,
  Globe,
  Star,
  ArrowRight,
  Play,
  BookOpen,
  Trophy,
  Users,
  TrendingUp,
  Target,
  Zap,
  Award,
  TargetIcon,
} from "lucide-react"
import { testimonials,popularLanguages,learningFeatures } from "../constants";

const HomePage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-primary from-base-100 via-base-200 to-base-300 relative overflow-hidden">
      {/* Gradient Glowing Background Elements */}
      <div className="absolute top-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px] opacity-70 animate-pulse"></div>
        <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-2/3 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-[90px] opacity-60 animate-pulse animation-delay-4000"></div>
      </div>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-primary from-primary/5 via-secondary/5 to-accent/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 relative z-10">
          <div className="text-center space-y-8 sm:space-y-12">
            {/* Main Hero Content */}
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="badge badge-primary badge-lg gap-2 px-4 py-3">
                  <Globe className="size-4" />
                  <span className="font-medium">Connect • Learn • Grow</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent italic">
                  Master Languages
                </span>
                <br />
                <span className="text-base-content">Through Real Connections</span>
              </h1>

              <p className="text-lg sm:text-xl lg:text-2xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
                Join thousands of language learners worldwide. Practice with native speakers, make lifelong friends, and
                accelerate your language journey through authentic conversations.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {/* Chat Feature */}
              <div className="card bg-base-100/80 backdrop-blur-sm border border-primary/20 hover:border-primary/40 hover:shadow-xl transition-all duration-300 group">
                <div className="card-body text-center p-6 sm:p-8">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary-focus rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="size-8 text-primary-content" />
                  </div>
                  <h3 className="card-title text-xl sm:text-2xl justify-center mb-3">Real-time Chat</h3>
                  <p className="text-base-content/70 text-sm sm:text-base">
                    Practice conversations with native speakers through instant messaging. Get corrections and learn
                    naturally.
                  </p>
                  <div className="flex items-center justify-center mt-4 text-primary font-medium group-hover:gap-3 gap-2 transition-all">
                    <Link to="/chat">
                      <span className="text-sm">Start Chatting</span>
                    </Link>
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Make Friends Feature */}
              <div className="card bg-base-100/80 backdrop-blur-sm border border-secondary/20 hover:border-secondary/40 hover:shadow-xl transition-all duration-300 group">
                <div className="card-body text-center p-6 sm:p-8">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-secondary to-secondary-focus rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Heart className="size-8 text-secondary-content" />
                  </div>
                  <h3 className="card-title text-xl sm:text-2xl justify-center mb-3">Make Friends</h3>
                  <p className="text-base-content/70 text-sm sm:text-base">
                    Build meaningful friendships with people from around the world. Share cultures and create lasting
                    bonds.
                  </p>
                  <div className="flex items-center justify-center mt-4 text-secondary font-medium group-hover:gap-3 gap-2 transition-all">
                    <Link to="/friends">
                      <span className="text-sm">Find Friends</span>
                    </Link>
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Video Streaming Feature */}
              <div className="card bg-base-100/80 backdrop-blur-sm border border-accent/20 hover:border-accent/40 hover:shadow-xl transition-all duration-300 group sm:col-span-2 lg:col-span-1">
                <div className="card-body text-center p-6 sm:p-8">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-accent to-accent-focus rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Video className="size-8 text-accent-content" />
                  </div>
                  <h3 className="card-title text-xl sm:text-2xl justify-center mb-3">Video Calls</h3>
                  <p className="text-base-content/70 text-sm sm:text-base">
                    Practice pronunciation and have face-to-face conversations. Experience immersive language learning.
                  </p>
                  <div className="flex items-center justify-center mt-4 text-accent font-medium group-hover:gap-3 gap-2 transition-all">
                    <Link to="/chat">
                      <span className="text-sm">Start Video Call</span>
                    </Link>
                    <Play className="size-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-base-100/50 backdrop-blur-sm rounded-2xl border border-base-300 p-6 sm:p-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-2">50K+</div>
                  <div className="text-sm sm:text-base text-base-content/70">Active Learners</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary mb-2">100+</div>
                  <div className="text-sm sm:text-base text-base-content/70">Languages</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent mb-2">1M+</div>
                  <div className="text-sm sm:text-base text-base-content/70">Conversations</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-warning mb-2">4.9</div>
                  <div className="text-sm sm:text-base text-base-content/70 flex items-center justify-center gap-1">
                    <Star className="size-4 fill-warning text-warning" />
                    Rating
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 relative z-10">
        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          {/* Learning Features Section */}
          <section className="space-y-6 sm:space-y-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Zap className="size-6 sm:size-7 text-primary animate-pulse" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Powerful Learning Tools
                </h2>
              </div>
              <p className="text-base-content/70 text-sm sm:text-base max-w-2xl mx-auto">
                Everything you need to accelerate your language learning journey
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {learningFeatures.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={index}
                    className="group relative bg-base-100 rounded-2xl border border-base-300 hover:border-primary/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative p-6 text-center">
                      <div
                        className={`mx-auto w-14 h-14 bg-gradient-to-br from-${feature.color} to-${feature.color}-focus rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className={`size-7 text-${feature.color}-content`} />
                      </div>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-base-content/70 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Popular Languages Section */}
          <section className="space-y-6 sm:space-y-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <TrendingUp className="size-6 sm:size-7 text-secondary animate-pulse" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  Trending Languages
                </h2>
              </div>
              <p className="text-base-content/70 text-sm sm:text-base max-w-2xl mx-auto">
                Join millions learning the world's most popular languages
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {popularLanguages.map((language, index) => (
                <div
                  key={index}
                  className="group relative bg-base-100 rounded-2xl border border-base-300 hover:border-secondary/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{language.flag}</span>
                        <div>
                          <h3 className="font-bold text-lg group-hover:text-secondary transition-colors">
                            {language.name}
                          </h3>
                          <p className="text-sm text-base-content/60">{language.learners} learners</p>
                        </div>
                      </div>
                      <div className="badge badge-success gap-1">
                        <TrendingUp className="size-3" />
                        {language.growth}
                      </div>
                    </div>
                    <div className="w-full bg-base-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-secondary to-accent h-2 rounded-full transition-all duration-1000 group-hover:w-full"
                        style={{ width: `${60 + index * 5}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="space-y-6 sm:space-y-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Heart className="size-6 sm:size-7 text-accent animate-pulse" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-accent to-warning bg-clip-text text-transparent">
                  Success Stories
                </h2>
              </div>
              <p className="text-base-content/70 text-sm sm:text-base max-w-2xl mx-auto">
                Real stories from our amazing language learning community
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative bg-base-100 rounded-2xl border border-base-300 p-8 sm:p-12 shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-warning/5"></div>
                <div className="relative text-center">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-accent/20">
                      <img
                        src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
                        alt={testimonials[currentTestimonial].name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                  </div>

                  <blockquote className="text-lg sm:text-xl text-base-content/80 mb-6 leading-relaxed">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>

                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`size-5 ${i < testimonials[currentTestimonial].rating ? "text-warning fill-current" : "text-base-300"}`}
                      />
                    ))}
                  </div>

                  <div className="text-center">
                    <h4 className="font-bold text-lg text-base-content">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-sm text-base-content/60">
                      {testimonials[currentTestimonial].role} • Learning {testimonials[currentTestimonial].language}
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? "bg-accent scale-125" : "bg-base-300 hover:bg-base-content/30"
                    }`}
                    onClick={() => setCurrentTestimonial(index)}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="text-center py-12 sm:py-16">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Ready to Start Your Journey?
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-base-content/70 leading-relaxed">
                Join thousands of learners and start practicing with native speakers today
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/friends"
                  className="btn btn-primary btn-lg px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <Users className="size-6 mr-2" />
                  Find Language Partners
                </Link>
                <Link
                  to="/profile"
                  className="btn btn-outline btn-lg px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300"
                >
                  <Award className="size-6 mr-2" />
                  Complete Profile
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default HomePage