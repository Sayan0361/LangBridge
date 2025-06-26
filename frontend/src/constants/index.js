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

export const THEMES = [
  {
    name: "light",
    label: "Light",
    colors: ["#ffffff", "#5a67d8", "#8b5cf6", "#1a202c"],
  },
  {
    name: "dark",
    label: "Dark",
    colors: ["#1f2937", "#8b5cf6", "#ec4899", "#1a202c"],
  },
  {
    name: "cupcake",
    label: "Cupcake",
    colors: ["#f5f5f4", "#65c3c8", "#ef9fbc", "#291334"],
  },
  {
    name: "forest",
    label: "Forest",
    colors: ["#1f1d1d", "#3ebc96", "#70c217", "#e2e8f0"],
  },
  {
    name: "bumblebee",
    label: "Bumblebee",
    colors: ["#ffffff", "#f8e36f", "#f0d50c", "#1c1917"],
  },
  {
    name: "emerald",
    label: "Emerald",
    colors: ["#ffffff", "#66cc8a", "#3b82f6", "#1e3a8a"],
  },
  {
    name: "corporate",
    label: "Corporate",
    colors: ["#ffffff", "#4b6bfb", "#7b92b2", "#1d232a"],
  },
  {
    name: "synthwave",
    label: "Synthwave",
    colors: ["#2d1b69", "#e779c1", "#58c7f3", "#f8f8f2"],
  },
  {
    name: "retro",
    label: "Retro",
    colors: ["#e4d8b4", "#ea6962", "#6aaa64", "#282425"],
  },
  {
    name: "cyberpunk",
    label: "Cyberpunk",
    colors: ["#ffee00", "#ff7598", "#75d1f0", "#1a103d"],
  },
  {
    name: "valentine",
    label: "Valentine",
    colors: ["#f0d6e8", "#e96d7b", "#a991f7", "#37243c"],
  },
  {
    name: "halloween",
    label: "Halloween",
    colors: ["#0d0d0d", "#ff7800", "#006400", "#ffffff"],
  },
  {
    name: "garden",
    label: "Garden",
    colors: ["#e9e7e7", "#ec4899", "#16a34a", "#374151"],
  },

  {
    name: "aqua",
    label: "Aqua",
    colors: ["#193549", "#4cd4e3", "#9059ff", "#f8d766"],
  },
  {
    name: "lofi",
    label: "Lofi",
    colors: ["#0f0f0f", "#1a1919", "#232323", "#2c2c2c"],
  },
  {
    name: "pastel",
    label: "Pastel",
    colors: ["#f7f3f5", "#d1c1d7", "#a1e3d8", "#4a98f1"],
  },
  {
    name: "fantasy",
    label: "Fantasy",
    colors: ["#ffe7d6", "#a21caf", "#3b82f6", "#f59e0b"],
  },
  {
    name: "wireframe",
    label: "Wireframe",
    colors: ["#e6e6e6", "#b3b3b3", "#b3b3b3", "#888888"],
  },
  {
    name: "black",
    label: "Black",
    colors: ["#000000", "#191919", "#313131", "#4a4a4a"],
  },
  {
    name: "luxury",
    label: "Luxury",
    colors: ["#171618", "#1e293b", "#94589c", "#d4a85a"],
  },
  {
    name: "dracula",
    label: "Dracula",
    colors: ["#282a36", "#ff79c6", "#bd93f9", "#f8f8f2"],
  },
  {
    name: "cmyk",
    label: "CMYK",
    colors: ["#f0f0f0", "#0891b2", "#ec4899", "#facc15"],
  },
  {
    name: "autumn",
    label: "Autumn",
    colors: ["#f2f2f2", "#8c1f11", "#f28c18", "#6f4930"],
  },
  {
    name: "business",
    label: "Business",
    colors: ["#f5f5f5", "#1e40af", "#3b82f6", "#f97316"],
  },
  {
    name: "acid",
    label: "Acid",
    colors: ["#110e0e", "#ff00f2", "#ff7a00", "#99ff01"],
  },
  {
    name: "lemonade",
    label: "Lemonade",
    colors: ["#ffffff", "#67e8f9", "#f5d742", "#2c3333"],
  },
  {
    name: "night",
    label: "Night",
    colors: ["#0f172a", "#38bdf8", "#818cf8", "#e2e8f0"],
  },
  {
    name: "coffee",
    label: "Coffee",
    colors: ["#20161f", "#dd9866", "#497174", "#eeeeee"],
  },
  {
    name: "winter",
    label: "Winter",
    colors: ["#ffffff", "#0284c7", "#d946ef", "#0f172a"],
  },
  {
    name: "dim",
    label: "Dim",
    colors: ["#1c1c27", "#10b981", "#ff5a5f", "#0f172a"],
  },
  {
    name: "nord",
    label: "Nord",
    colors: ["#eceff4", "#5e81ac", "#81a1c1", "#3b4252"],
  },
  {
    name: "sunset",
    label: "Sunset",
    colors: ["#1e293b", "#f5734c", "#ec4899", "#ffffff"],
  },
];

export const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Mandarin",
  "Japanese",
  "Korean",
  "Hindi",
  "Russian",
  "Portuguese",
  "Arabic",
  "Italian",
  "Turkish",
  "Dutch",
];

export const LANGUAGE_TO_FLAG = {
  english: "gb",
  spanish: "es",
  french: "fr",
  german: "de",
  mandarin: "cn",
  japanese: "jp",
  korean: "kr",
  hindi: "in",
  russian: "ru",
  portuguese: "pt",
  arabic: "sa",
  italian: "it",
  turkish: "tr",
  dutch: "nl",
};

  export const testimonials = [
    {
      name: "Ana De Armas",
      role: "Software Engineer",
      language: "Spanish",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzo397CnM76opu_WTQ7WorSNSuY2pphdJsU4I7KKjqvxMcgtTfeJ6W1vrf1KFdoNOU-ao&usqp=CAU",
      quote:
        "I went from beginner to conversational in just 6 months! The native speakers here are so patient and helpful.",
      rating: 5,
    },
    {
      name: "Sydney Sweeney",
      role: "Teacher",
      language: "English",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxbAKRmWDwId9UFpCg_HxWZgK0SruPNORHgw&s",
      quote: "Teaching my native Spanish while learning English has been an incredible cultural exchange experience.",
      rating: 5,
    },
    {
      name: "Talia Ryder",
      role: "Student",
      language: "French",
      avatar: "https://i.ebayimg.com/images/g/uzIAAOSwEtdjY8r3/s-l1200.jpg",
      quote: "The video calls feature helped me overcome my fear of speaking. Now I'm confident in conversations!",
      rating: 5,
    },
    {
      name: "Wamiqa Gabbi",
      role: "Student",
      language: "Hindi",
      avatar: "https://i0.wp.com/www.socialnews.xyz/wp-content/uploads/2025/04/26/202504263388005.jpeg?quality=80&zoom=1&ssl=1",
      quote: "I went from beginner to conversational in just 4 months! The native speakers here are so patient and helpful.",
      rating: 4.8,
    }
  ]

  export const popularLanguages = [
    { name: "Spanish", learners: "2.1M", flag: "🇪🇸", growth: "+15%" },
    { name: "English", learners: "1.8M", flag: "🇺🇸", growth: "+12%" },
    { name: "French", learners: "1.2M", flag: "🇫🇷", growth: "+18%" },
    { name: "German", learners: "890K", flag: "🇩🇪", growth: "+10%" },
    { name: "Japanese", learners: "750K", flag: "🇯🇵", growth: "+22%" },
    { name: "Italian", learners: "620K", flag: "🇮🇹", growth: "+14%" },
  ]

  export const learningFeatures = [
    {
      icon: BookOpen,
      title: "Interactive Lessons",
      description: "Personalized learning paths adapted to your pace and style",
      color: "primary",
    },
    {
      icon: Trophy,
      title: "Achievement System",
      description: "Earn badges and track your progress with gamified learning",
      color: "secondary",
    },
    {
      icon: Users,
      title: "Study Groups",
      description: "Join community groups and practice with fellow learners",
      color: "accent",
    },
    {
      icon: Target,
      title: "Goal Setting",
      description: "Set and achieve personalized language learning objectives",
      color: "primary",
    },
  ]
