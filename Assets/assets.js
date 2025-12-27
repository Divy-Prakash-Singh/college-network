import { Briefcase, Building, ChevronLeft, ChevronRight, Code, GraduationCap, Heart, MessageCircle, Rocket, Search, Sparkles,Star, TrendingUp, Users } from "lucide-react";
export const inspirationalQuotes = [
    {
      quote: "The beautiful thing about learning is that no one can take it away from you.",
      author: "B.B. King",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
    {
      quote: "Education is the most powerful weapon which you can use to change the world.",
      author: "Nelson Mandela", 
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300&h=300&fit=crop&crop=face"
    },
    {
      quote: "The expert in anything was once a beginner.",
      author: "Helen Hayes",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    },
    {
      quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
      image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=300&fit=crop&crop=face"
    }
  ];

    export const sampleQuestions=[{
      author: "Sarah Chen",
      role: "CS Student, IIT Delhi",
      question: "How do I prepare for tech interviews at FAANG companies?",
      likes: 24,
      answers: 8,
      avatar: "SC"
    },
    {
      author: "Rahul Kumar",
      role: "MBA Aspirant",
      question: "What's the best strategy for CAT preparation in 6 months?",
      likes: 18,
      answers: 12,
      avatar: "RK"
    },
    {
      author: "Priya Sharma",
      role: "Acting Student",
      question: "How to build a portfolio for theater auditions?",
      likes: 15,
      answers: 6,
      avatar: "PS"
    }
  ];

 export  const categories = [
    {
      name: "Technology",
      description: "Programming, Web Dev, AI/ML, Data Science",
      icon: Code,
      questions: "2.3K",
      gradient: "from-red-500 to-red-600",
      textColor: "text-red-400",
      bgColor: "bg-gray-800/50",
      hoverColor: "hover:bg-gray-700/70"
    },
    {
      name: "Finance",
      description: "Investment, Banking, Financial Planning",
      icon: TrendingUp,
      questions: "1.8K",
      gradient: "from-rose-500 to-pink-600",
      textColor: "text-rose-400",
      bgColor: "bg-gray-800/50",
      hoverColor: "hover:bg-gray-700/70"
    },
    {
      name: "Acting",
      description: "Theater, Film, Voice Acting, Industry Tips",
      icon: Users,
      questions: "650",
      gradient: "from-pink-500 to-rose-500",
      textColor: "text-pink-400",
      bgColor: "bg-gray-800/50",
      hoverColor: "hover:bg-gray-700/70"
    },
    {
      name: "Startups",
      description: "Entrepreneurship, Business Ideas, Funding",
      icon: Rocket,
      questions: "920",
      gradient: "from-red-600 to-rose-500",
      textColor: "text-red-400",
      bgColor: "bg-gray-800/50",
      hoverColor: "hover:bg-gray-700/70"
    }
  ];

  export const examCategories = [
    {
      name: "GATE",
      description: "Engineering entrance exam preparation",
      icon: GraduationCap,
      questions: "1.2K",
      gradient: "from-red-500 to-red-700"
    },
    {
      name: "CAT",
      description: "MBA entrance exam guidance",
      icon: Briefcase,
      questions: "890",
      gradient: "from-rose-500 to-pink-700"
    },
    {
      name: "UPSC",
      description: "Civil services exam preparation",
      icon: Building,
      questions: "756",
      gradient: "from-pink-500 to-red-600"
    }
  ];

  export const que_data=[
    {
    id:1,
    title:"Tech",
    date:Date.now(),
     que:"What is the difference between Web 2.0 and Web 3.0?",
    category:"Technology",
  },
   {
    id:2,
    title:"stock ",
    date:Date.now(),
    category:"Finance",
    que:"What is the difference between stocks and bonds",
  },
   {
    id:3,
    title:"tech",
    date:Date.now(),
     que:"What is the role of edge computing in modern tech?",
    category:"Technology",
  },
   {
    id:4,
    title:"bussiness ",
    date:Date.now(),
     que:"What is a Minimum Viable Product (MVP) and why is it important?",
    category:"Startup",
  },
   {
    id:5,
    title:"modern tech",
    date:Date.now(),
     que:"How is AI transforming cybersecurity?",
    category:"Technology",
  }
];