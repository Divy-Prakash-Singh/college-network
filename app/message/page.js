// "use client";
// import React, { useState } from "react";
// import Navbar from "@/components/Navbar";
// import BottomNavbar from "@/components/BottomNavbar";
// import { MessageCircle, Clock, User, ArrowRight, Star } from "lucide-react";
// import Link from "next/link";

// export default function MessagePage() {
//   const [activeFilter, setActiveFilter] = useState("Questions for You");

//   const questionsForYou = [
//     {
//       id: 1,
//       title: "How to prepare for Google SWE interview?",
//       author: "Rahul Kumar",
//       authorImage: "https://randomuser.me/api/portraits/men/1.jpg",
//       category: "Technology",
//       timeAgo: "2 hours ago",
//       urgency: "high",
//       description: "I have an interview next week. Need tips on system design and coding rounds.",
//       tags: ["Interview", "Google", "System Design"],
//       isUrgent: true,
//     },
//     {
//       id: 2,
//       title: "Best resources for learning React Native?",
//       author: "Priya Sharma",
//       authorImage: "https://randomuser.me/api/portraits/women/2.jpg",
//       category: "Technology",
//       timeAgo: "4 hours ago",
//       urgency: "medium",
//       description: "Starting mobile development journey. Looking for structured learning path.",
//       tags: ["React Native", "Mobile", "Learning"],
//       isUrgent: false,
//     },
//     {
//       id: 3,
//       title: "GATE CSE preparation strategy for 2025",
//       author: "Amit Singh",
//       authorImage: "https://randomuser.me/api/portraits/men/3.jpg",
//       category: "GATE",
//       timeAgo: "1 day ago",
//       urgency: "high",
//       description: "Need a complete study plan and important topics to focus on.",
//       tags: ["GATE", "CSE", "Preparation"],
//       isUrgent: true,
//     },
//     {
//       id: 4,
//       title: "How to start a tech startup in college?",
//       author: "Neha Patel",
//       authorImage: "https://randomuser.me/api/portraits/women/4.jpg",
//       category: "Startup",
//       timeAgo: "2 days ago",
//       urgency: "medium",
//       description: "Have an idea but don't know how to validate and build MVP.",
//       tags: ["Startup", "MVP", "Validation"],
//       isUrgent: false,
//     },
//   ];

//   const generalQuestions = [
//     {
//       id: 5,
//       title: "CAT vs GMAT for MBA abroad?",
//       author: "Vikram Mehta",
//       authorImage: "https://randomuser.me/api/portraits/men/5.jpg",
//       category: "Education",
//       timeAgo: "3 hours ago",
//       urgency: "medium",
//       description: "Confused between CAT for Indian B-schools or GMAT for international programs.",
//       tags: ["MBA", "CAT", "GMAT"],
//       isUrgent: false,
//     },
//     {
//       id: 6,
//       title: "Investment strategies for beginners",
//       author: "Sneha Reddy",
//       authorImage: "https://randomuser.me/api/portraits/women/6.jpg",
//       category: "Finance",
//       timeAgo: "5 hours ago",
//       urgency: "low",
//       description: "Want to start investing but don't know where to begin.",
//       tags: ["Investment", "Finance", "Beginners"],
//       isUrgent: false,
//     },
//     {
//       id: 7,
//       title: "Data Science career path guidance",
//       author: "Arjun Kapoor",
//       authorImage: "https://randomuser.me/api/portraits/men/7.jpg",
//       category: "Technology",
//       timeAgo: "1 day ago",
//       urgency: "medium",
//       description: "Background in statistics, want to transition to data science.",
//       tags: ["Data Science", "Career", "Statistics"],
//       isUrgent: false,
//     },
//     {
//       id: 8,
//       title: "How to build a strong LinkedIn profile?",
//       author: "Kavya Iyer",
//       authorImage: "https://randomuser.me/api/portraits/women/8.jpg",
//       category: "Career",
//       timeAgo: "2 days ago",
//       urgency: "low",
//       description: "Graduating soon, need tips to make my profile stand out to recruiters.",
//       tags: ["LinkedIn", "Profile", "Recruitment"],
//       isUrgent: false,
//     },
//   ];

//   const allQuestions = [...questionsForYou, ...generalQuestions];
  
//   const filteredQuestions = activeFilter === "Questions for You" 
//     ? questionsForYou 
//     : allQuestions;

//   const getUrgencyColor = (urgency) => {
//     switch (urgency) {
//       case "high": return "text-red-400";
//       case "medium": return "text-yellow-400";
//       case "low": return "text-green-400";
//       default: return "text-white/60";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white">
//       <Navbar />

//       {/* Header */}
//       <section className="max-w-7xl mx-auto px-4 pt-10 pb-6">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-black font-extrabold shadow-lg">
//             <MessageCircle size={20} />
//           </div>
//           <span className="text-white/70">Messages</span>
//         </div>
//         <h1 className="text-2xl md:text-3xl font-semibold">Answer Questions</h1>
//         <p className="text-white/70 text-sm mt-1">Help others by sharing your knowledge and experience.</p>
//       </section>

//       {/* Filter Buttons */}
//       <section className="max-w-7xl mx-auto px-4 pb-6">
//         <div className="flex gap-3">
//           {["Questions for You", "Questions"].map((filter) => (
//             <button
//               key={filter}
//               onClick={() => setActiveFilter(filter)}
//               className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
//                 activeFilter === filter
//                   ? "bg-yellow-400 text-black shadow-lg"
//                   : "bg-white/10 border border-white/15 text-white/80 hover:bg-white/20"
//               }`}
//             >
//               {filter}
//             </button>
//           ))}
//         </div>
//       </section>

//       {/* Questions Grid */}
//       <section className="max-w-7xl mx-auto px-4 pb-24">
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredQuestions.map((question) => (
//             <Link href={`/question/${question.id}`} key={question.id}>
//               <div className="bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md p-6 hover:bg-white/10 transition-all cursor-pointer group">
//                 {/* Header */}
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={question.authorImage}
//                       alt={question.author}
//                       className="w-10 h-10 rounded-full border border-white/20"
//                     />
//                     <div>
//                       <h3 className="font-semibold text-white/90 group-hover:text-white">
//                         {question.author}
//                       </h3>
//                       <div className="flex items-center gap-2 text-xs text-white/60">
//                         <Clock size={12} />
//                         <span>{question.timeAgo}</span>
//                       </div>
//                     </div>
//                   </div>
//                   {question.isUrgent && (
//                     <div className="flex items-center gap-1">
//                       <Star size={14} className="text-red-400 fill-current" />
//                       <span className="text-xs text-red-400">Urgent</span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Question Title */}
//                 <h4 className="font-medium text-white/90 mb-3 group-hover:text-white line-clamp-2">
//                   {question.title}
//                 </h4>

//                 {/* Description */}
//                 <p className="text-sm text-white/70 mb-4 leading-relaxed line-clamp-3">
//                   {question.description}
//                 </p>

//                 {/* Category & Urgency */}
//                 <div className="flex items-center justify-between mb-4">
//                   <span className="px-2 py-1 text-xs bg-white/10 border border-white/15 rounded-full text-white/70">
//                     {question.category}
//                   </span>
//                   <span className={`text-xs ${getUrgencyColor(question.urgency)}`}>
//                     {question.urgency} priority
//                   </span>
//                 </div>

//                 {/* Tags */}
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {question.tags.slice(0, 2).map((tag) => (
//                     <span
//                       key={tag}
//                       className="px-2 py-1 text-xs bg-white/10 border border-white/15 rounded-full text-white/60"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                   {question.tags.length > 2 && (
//                     <span className="px-2 py-1 text-xs bg-white/10 border border-white/15 rounded-full text-white/60">
//                       +{question.tags.length - 2}
//                     </span>
//                   )}
//                 </div>

//                 {/* Footer */}
//                 <div className="flex items-center justify-between">
//                   <span className="text-xs text-white/60">
//                     Click to answer
//                   </span>
//                   <ArrowRight size={16} className="text-white/60 group-hover:text-white transition-colors" />
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {/* Empty State */}
//         {filteredQuestions.length === 0 && (
//           <div className="text-center py-12">
//             <MessageCircle size={48} className="text-white/40 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-white/60 mb-2">No questions found</h3>
//             <p className="text-sm text-white/40">Try changing your filter or check back later.</p>
//           </div>
//         )}
//       </section>

//       <BottomNavbar />
//     </div>
//   );
// }








// "use client";
// import React, {useEffect, useState } from "react";
// import Navbar from "@/components/Navbar";
// import BottomNavbar from "@/components/BottomNavbar";
// import { MessageCircle, Clock, ArrowRight, Star, Plus } from "lucide-react";
// import Link from "next/link";
// import { supabase } from "@/lib/supabaseClient";

// export default function MessagePage() {
//   const [activeFilter, setActiveFilter] = useState("Questions for You");

//   const [questionsForYou, setQuestionsForYou] = useState([]);
//   const [generalQuestions, setGeneralQuestions] = useState([]);



//   // const questionsForYou = [
//   //   {
//   //     id: 1,
//   //     title: "How to prepare for Google SWE interview?",
//   //     author: "Rahul Kumar",
//   //     branch: "CSE",
//   //     authorImage: "https://randomuser.me/api/portraits/men/1.jpg",
//   //     category: "Technology",
//   //     timeAgo: "2 hours ago",
//   //     answers: 7,
//   //     description: "I have an interview next week. Need tips on system design and coding rounds.",
//   //   },
//   //   {
//   //     id: 2,
//   //     title: "GATE CSE preparation strategy for 2025",
//   //     author: "Amit Singh",
//   //     branch: "Computer Engineering",
//   //     authorImage: "https://randomuser.me/api/portraits/men/2.jpg",
//   //     category: "GATE",
//   //     timeAgo: "1 day ago",
//   //     answers: 12,
//   //     description: "Need a complete study plan and important topics to focus on for GATE CSE.",
//   //   },
//   // ];

//   // const generalQuestions = [
//   //   {
//   //     id: 3,
//   //     title: "How to start a tech startup in college?",
//   //     author: "Neha Patel",
//   //     branch: "ECE",
//   //     authorImage: "https://randomuser.me/api/portraits/women/3.jpg",
//   //     category: "Startup",
//   //     timeAgo: "2 days ago",
//   //     answers: 5,
//   //     description: "Have an idea but don't know how to validate and build MVP. Any guidance appreciated!",
//   //   },
//   //   {
//   //     id: 4,
//   //     title: "Investment strategies for beginners",
//   //     author: "Sneha Reddy",
//   //     branch: "MBA",
//   //     authorImage: "https://randomuser.me/api/portraits/women/4.jpg",
//   //     category: "Finance",
//   //     timeAgo: "5 hours ago",
//   //     answers: 9,
//   //     description: "Want to start investing but don't know where to begin. Need suggestions for safe options.",
//   //   },
//   //   {
//   //     id: 5,
//   //     title: "Data Science career path guidance",
//   //     author: "Arjun Kapoor",
//   //     branch: "IT",
//   //     authorImage: "https://randomuser.me/api/portraits/men/5.jpg",
//   //     category: "Technology",
//   //     timeAgo: "1 day ago",
//   //     answers: 15,
//   //     description: "Background in statistics, want to transition to data science. Where should I start?",
//   //   },
//   // ];

//   const allQuestions = [...questionsForYou, ...generalQuestions];
//   const filteredQuestions =
//     activeFilter === "Questions for You" ? questionsForYou : allQuestions;

//     useEffect(() => {
//   const mentor = JSON.parse(localStorage.getItem("user"));
//   if (!mentor?.is_mentor) return;

//   const fetchMentorQuestions = async () => {
//     const { data } = await supabase
//       .from("questions")
//       .select("*")
//       .in("category", mentor.categories);
//     setQuestionsForYou(data);
//   };
//   fetchMentorQuestions();
// }, []);


//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white relative">
//       <Navbar />

//       {/* Header */}
//       <section className="max-w-7xl mx-auto px-4 pt-10 pb-6">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-black font-extrabold shadow-lg">
//             <MessageCircle size={20} />
//           </div>
//           <span className="text-white/70">Messages</span>
//         </div>
//         <h1 className="text-2xl md:text-3xl font-semibold">Answer Questions</h1>
//         <p className="text-white/70 text-sm mt-1">
//           Help others by sharing your knowledge and experience.
//         </p>
//       </section>

//       {/* Filter Buttons */}
//       <section className="max-w-7xl mx-auto px-4 pb-6">
//         <div className="flex gap-3">
//           {["Questions for You", "All Questions"].map((filter) => (
//             <button
//               key={filter}
//               onClick={() => setActiveFilter(filter)}
//               className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
//                 activeFilter === filter
//                   ? "bg-yellow-400 text-black shadow-lg"
//                   : "bg-white/10 border border-white/15 text-white/80 hover:bg-white/20"
//               }`}
//             >
//               {filter}
//             </button>
//           ))}
//         </div>
//       </section>

//       {/* Questions Grid */}
//       <section className="max-w-7xl mx-auto px-4 pb-24">
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredQuestions.map((question) => (
//             <Link href={`/question/${question.id}`} key={question.id}>
//               <div className="bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md p-6 hover:bg-white/10 transition-all cursor-pointer group">
//                 {/* Header */}
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={question.authorImage}
//                       alt={question.author}
//                       className="w-12 h-12 rounded-full border border-white/20"
//                     />
//                     <div>
//                       <h3 className="font-semibold text-white/90 group-hover:text-yellow-400 transition">
//                         {question.author}
//                       </h3>
//                       <p className="text-xs text-white/60">
//                         {question.branch || "CSE Department"}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="text-xs bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full border border-yellow-400/30 font-medium">
//                     {question.category}
//                   </div>
//                 </div>

//                 {/* Question Title */}
//                 <h4 className="font-semibold text-white/90 mb-2 group-hover:text-yellow-400 line-clamp-2">
//                   {question.title}
//                 </h4>

//                 {/* Description */}
//                 <p className="text-sm text-white/70 mb-4 leading-relaxed line-clamp-3">
//                   {question.description}
//                 </p>

//                 {/* Stats */}
//                 <div className="flex items-center justify-between text-xs text-white/60 mb-4">
//                   <div className="flex items-center gap-2">
//                     <Star size={14} className="text-yellow-400" />
//                     <span>{question.answers} answers</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Clock size={12} />
//                     <span>{question.timeAgo}</span>
//                   </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="flex items-center justify-between">
//                   <span className="text-xs text-white/60">
//                     Click to view & answer
//                   </span>
//                   <ArrowRight
//                     size={16}
//                     className="text-white/60 group-hover:text-yellow-400 transition-colors"
//                   />
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {/* Empty State */}
//         {filteredQuestions.length === 0 && (
//           <div className="text-center py-12">
//             <MessageCircle size={48} className="text-white/40 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-white/60 mb-2">
//               No questions found
//             </h3>
//             <p className="text-sm text-white/40">
//               Try changing your filter or check back later.
//             </p>
//           </div>
//         )}
//       </section>

//       {/* Floating Ask Question Button */}
//       <Link
//         href="/ask"
//         className="fixed bottom-20 right-6 md:right-10 bg-yellow-400 text-black p-4 rounded-full shadow-lg hover:bg-yellow-500 transition"
//       >
//         <Plus size={22} />
//       </Link>

//       <BottomNavbar />
//     </div>
//   );
// }















// "use client";

// import React, { useEffect, useMemo, useState, useContext } from "react";
// import Navbar from "@/components/Navbar";
// import BottomNavbar from "@/components/BottomNavbar";
// import { MessageCircle, Clock, ArrowRight, Star, X } from "lucide-react";
// import { supabase } from "@/lib/supabaseClient";
// import { AuthContext } from "@/lib/AuthProvider";
// import QueBox from "@/components/QueBox";

// export default function MessagePage() {
//   const { currentUser, loading: authLoading } = useContext(AuthContext);

//   const [activeFilter, setActiveFilter] = useState("Questions for You");
//   const [questionsForYou, setQuestionsForYou] = useState([]);
//   const [allCategoryQuestions, setAllCategoryQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // modal state to show full Q&A in-place
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedQuestion, setSelectedQuestion] = useState(null);

//   // derived
//   const filteredQuestions = useMemo(() => {
//     return activeFilter === "Questions for You" ? questionsForYou : allCategoryQuestions;
//   }, [activeFilter, questionsForYou, allCategoryQuestions]);

//   // Load data once we know the mentor (currentUser)
//   useEffect(() => {
//     if (authLoading) return;
//     if (!currentUser) {
//       setLoading(false);
//       return;
//     }

//     const load = async () => {
//       setLoading(true);

//       // ---- 1) Questions assigned to me (Questions for You) ----
//       const { data: qForMe, error: qForMeErr } = await supabase
//         .from("questions")
//         .select(
//           `
//           id, title, question, category, created_at, author_id, assigned_to,
//           users:author_id ( name, profile_image, branch )
//         `
//         )
//         .eq("assigned_to", currentUser.id)
//         .order("created_at", { ascending: false });

//       if (qForMeErr) {
//         console.error("Load Questions for You error:", qForMeErr.message);
//       }
//       setQuestionsForYou(qForMe || []);

//       // ---- 2) All-questions for my categories (excluding my own assigned) ----
//       // Strategy: fetch where category IN my categories, newest first, then filter in JS
//       const myCats = Array.isArray(currentUser.categories)
//         ? currentUser.categories
//         : [];

//       // If user has no categories, there’s nothing to show in "All Questions"
//       if (myCats.length === 0) {
//         setAllCategoryQuestions([]);
//         setLoading(false);
//         return;
//       }

//       const { data: qAll, error: qAllErr } = await supabase
//         .from("questions")
//         .select(
//           `
//           id, title, question, category, created_at, author_id, assigned_to,
//           users:author_id ( name, profile_image, branch )
//         `
//         )
//         .in("category", myCats) // all in my categories
//         .order("created_at", { ascending: false });

//       if (qAllErr) {
//         console.error("Load All Questions error:", qAllErr.message);
//       }

//       // Keep:
//       // - General (assigned_to is null)
//       // - Assigned to other mentors (assigned_to != me)
//       // - Exclude my own assigned (to avoid duplication across tabs)
//       const filtered = (qAll || []).filter(
//         (q) => !q.assigned_to || q.assigned_to !== currentUser.id
//       );

//       setAllCategoryQuestions(filtered);
//       setLoading(false);
//     };

//     load();
//   }, [authLoading, currentUser]);

//   const openModal = (q) => {
//     setSelectedQuestion(q);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedQuestion(null);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white relative">
//       <Navbar />

//       {/* Header */}
//       <section className="max-w-7xl mx-auto px-4 pt-10 pb-6">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-black font-extrabold shadow-lg">
//             <MessageCircle size={20} />
//           </div>
//           <span className="text-white/70">Messages</span>
//         </div>
//         <h1 className="text-2xl md:text-3xl font-semibold">Answer Questions</h1>
//         <p className="text-white/70 text-sm mt-1">
//           {authLoading
//             ? "Loading your profile…"
//             : !currentUser
//             ? "Log in to see questions in your categories."
//             : "Help juniors by sharing your knowledge."}
//         </p>
//       </section>

//       {/* Filter Buttons */}
//       <section className="max-w-7xl mx-auto px-4 pb-6">
//         <div className="flex gap-3">
//           {["Questions for You", "All Questions"].map((filter) => (
//             <button
//               key={filter}
//               onClick={() => setActiveFilter(filter)}
//               className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
//                 activeFilter === filter
//                   ? "bg-yellow-400 text-black shadow-lg"
//                   : "bg-white/10 border border-white/15 text-white/80 hover:bg-white/20"
//               }`}
//             >
//               {filter}
//             </button>
//           ))}
//         </div>
//       </section>

//       {/* Questions Grid */}
//       <section className="max-w-7xl mx-auto px-4 pb-24">
//         {loading ? (
//           <p className="text-gray-400 text-center py-10">Loading questions...</p>
//         ) : !currentUser ? (
//           <div className="text-center py-12">
//             <MessageCircle size={48} className="text-white/40 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-white/60 mb-2">
//               You’re not logged in
//             </h3>
//             <p className="text-sm text-white/40">
//               Please sign in to see questions in your categories.
//             </p>
//           </div>
//         ) : filteredQuestions.length === 0 ? (
//           <div className="text-center py-12">
//             <MessageCircle size={48} className="text-white/40 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-white/60 mb-2">
//               No questions found
//             </h3>
//             <p className="text-sm text-white/40">
//               Try changing your filter or check back later.
//             </p>
//           </div>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredQuestions.map((q) => (
//               <div
//                 key={q.id}
//                 className="bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md p-6 hover:bg-white/10 transition-all cursor-pointer group"
//                 onClick={() => openModal(q)}
//               >
//                 {/* Header with author */}
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={
//                         q.users?.profile_image ||
//                         "https://via.placeholder.com/48?text=U"
//                       }
//                       alt={q.users?.name || "Author"}
//                       className="w-12 h-12 rounded-full border border-white/20 object-cover"
//                     />
//                     <div>
//                       <h3 className="font-semibold text-white/90 group-hover:text-yellow-400 transition">
//                         {q.users?.name || "Anonymous"}
//                       </h3>
//                       <p className="text-xs text-white/60">
//                         {q.users?.branch || "Department"}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="text-xs bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full border border-yellow-400/30 font-medium">
//                     {q.category || "General"}
//                   </div>
//                 </div>

//                 {/* Title + question preview */}
//                 <h4 className="font-semibold text-white/90 mb-1 group-hover:text-yellow-400 line-clamp-2">
//                   {q.title}
//                 </h4>
//                 <p className="text-sm text-white/70 mb-4 leading-relaxed line-clamp-3">
//                   {q.question}
//                 </p>

//                 {/* Footer stats (answers count, time) */}
//                 <div className="flex items-center justify-between text-xs text-white/60 mb-2">
//                   <div className="flex items-center gap-2">
//                     <Star size={14} className="text-yellow-400" />
//                     {/* You can replace 0 with a real aggregate later */}
//                     <span>Answers</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Clock size={12} />
//                     <span>
//                       {q.created_at
//                         ? new Date(q.created_at).toLocaleString()
//                         : "Just now"}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <span className="text-xs text-white/60">Click to view & answer</span>
//                   <ArrowRight
//                     size={16}
//                     className="text-white/60 group-hover:text-yellow-400 transition-colors"
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Modal with full QueBox (answers + form) */}
//       {isModalOpen && selectedQuestion && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
//           <div className="bg-gray-900 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl p-6 border border-white/10 relative">
//             <button
//               onClick={closeModal}
//               className="absolute top-3 right-3 text-gray-400 hover:text-white"
//               aria-label="Close"
//             >
//               <X size={20} />
//             </button>

//             {/* Header - same author area */}
//             <div className="flex items-center gap-3 mb-4">
//               <img
//                 src={
//                   selectedQuestion.users?.profile_image ||
//                   "https://via.placeholder.com/48?text=U"
//                 }
//                 alt={selectedQuestion.users?.name || "Author"}
//                 className="w-12 h-12 rounded-full border border-white/20 object-cover"
//               />
//               <div>
//                 <h3 className="font-semibold text-white">
//                   {selectedQuestion.users?.name || "Anonymous"}
//                 </h3>
//                 <p className="text-xs text-white/60">
//                   {selectedQuestion.users?.branch || "Department"}
//                 </p>
//               </div>
//               <span className="ml-auto text-xs bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full border border-yellow-400/30 font-medium">
//                 {selectedQuestion.category || "General"}
//               </span>
//             </div>

//             {/* Title + body */}
//             <h2 className="text-xl text-yellow-400 font-bold">{selectedQuestion.title}</h2>
//             <p className="text-sm text-white/80 mt-2">{selectedQuestion.question}</p>

//             {/* Optional image */}
//             {selectedQuestion.image && (
//               <img
//                 src={selectedQuestion.image}
//                 alt="Question attachment"
//                 className="mt-4 rounded-lg border border-white/10"
//               />
//             )}

//             {/* Full Q&A via QueBox */}
//             <div className="mt-6">
//               <QueBox
//                 id={selectedQuestion.id}
//                 category={selectedQuestion.category}
//                 que={selectedQuestion.question}
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       <BottomNavbar />
//     </div>
//   );
// }







///////////////////////////////////////////////////////////this is main page

// //this is message/page.js

// "use client";

// import React, { useEffect, useMemo, useState, useContext } from "react";
// import Navbar from "@/components/Navbar";
// import BottomNavbar from "@/components/BottomNavbar";
// import { MessageCircle, Clock, ArrowRight, Star, X } from "lucide-react";
// import { supabase } from "@/lib/supabaseClient";
// import { AuthContext } from "@/lib/AuthProvider";
// import QueBox from "@/components/QueBox";

// export default function MessagePage() {
//   const { currentUser, loading: authLoading } = useContext(AuthContext);

//   const [activeFilter, setActiveFilter] = useState("Questions for You");
//   const [questionsForYou, setQuestionsForYou] = useState([]);
//   const [allCategoryQuestions, setAllCategoryQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedQuestion, setSelectedQuestion] = useState(null);

//   // 🔍 derived list depending on tab
//   const filteredQuestions = useMemo(() => {
//     return activeFilter === "Questions for You" ? questionsForYou : allCategoryQuestions;
//   }, [activeFilter, questionsForYou, allCategoryQuestions]);

//   useEffect(() => {
//     if (authLoading) return;
//     if (!currentUser) {
//       setLoading(false);
//       return;
//     }

//     const loadQuestions = async () => {
//       setLoading(true);

//       // 🟢 1️⃣ Fetch questions assigned directly to current mentor
//       const { data: assignedData, error: assignedErr } = await supabase
//         .from("questions")
//         .select(`
//           id, title, question, category, created_at, image, author_id, assigned_to,
//           users:author_id ( name, profile_image, branch )
//         `)
//         .eq("assigned_to", currentUser.id)
//         .order("created_at", { ascending: false });

//       if (assignedErr) {
//         console.error("❌ Error fetching assigned questions:", assignedErr.message);
//       }

//       setQuestionsForYou(assignedData || []);

//       // 🟡 2️⃣ Fetch category-based questions
//       const myCats = Array.isArray(currentUser.categories)
//         ? currentUser.categories.filter(Boolean)
//         : [];

//       if (myCats.length === 0) {
//         console.warn("⚠️ User has no categories defined.");
//         setAllCategoryQuestions([]);
//         setLoading(false);
//         return;
//       }

//       const { data: catData, error: catErr } = await supabase
//         .from("questions")
//         .select(`
//           id, title, question, category, created_at, image, author_id, assigned_to,
//           users:author_id ( name, profile_image, branch )
//         `)
//         .in("category", myCats)
//         .order("created_at", { ascending: false });

//       if (catErr) {
//         console.error("❌ Error fetching category questions:", catErr.message);
//       }

//       // 🧠 Filter out questions already assigned to this mentor (to avoid duplication)
//       const finalCategoryList = (catData || []).filter(
//         (q) => !q.assigned_to || q.assigned_to !== currentUser.id
//       );

//       setAllCategoryQuestions(finalCategoryList);
//       setLoading(false);
//     };

//     loadQuestions();
//   }, [authLoading, currentUser]);

//   const openModal = (q) => {
//     setSelectedQuestion(q);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedQuestion(null);
//   };
// if (authLoading) {

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white relative">
//       <Navbar />

//       {/* Header */}
//       <section className="max-w-7xl mx-auto px-4 pt-10 pb-6">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-black font-extrabold shadow-lg">
//             <MessageCircle size={20} />
//           </div>
//           <span className="text-white/70">Messages</span>
//         </div>
//         <h1 className="text-2xl md:text-3xl font-semibold">Answer Questions</h1>
//         <p className="text-white/70 text-sm mt-1">
//           {authLoading
//             ? "Loading your profile…"
//             : !currentUser
//             ? "Log in to see questions in your categories."
//             : "Help juniors by sharing your knowledge."}
//         </p>
//       </section>

//       {/* Filter Buttons */}
//       <section className="max-w-7xl mx-auto px-4 pb-6">
//         <div className="flex gap-3">
//           {["Questions for You", "All Questions"].map((filter) => (
//             <button
//               key={filter}
//               onClick={() => setActiveFilter(filter)}
//               className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
//                 activeFilter === filter
//                   ? "bg-yellow-400 text-black shadow-lg"
//                   : "bg-white/10 border border-white/15 text-white/80 hover:bg-white/20"
//               }`}
//             >
//               {filter}
//             </button>
//           ))}
//         </div>
//       </section>

//       {/* Questions Display */}
//       <section className="max-w-7xl mx-auto px-4 pb-24">
//         {loading ? (
//           <p className="text-gray-400 text-center py-10">Loading questions...</p>
//         ) : !currentUser ? (
//           <div className="text-center py-12">
//             <MessageCircle size={48} className="text-white/40 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-white/60 mb-2">
//               You’re not logged in
//             </h3>
//             <p className="text-sm text-white/40">
//               Please sign in to see questions in your categories.
//             </p>
//           </div>
//         ) : filteredQuestions.length === 0 ? (
//           <div className="text-center py-12">
//             <MessageCircle size={48} className="text-white/40 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-white/60 mb-2">
//               No questions found
//             </h3>
//             <p className="text-sm text-white/40">
//               Try changing your filter or check back later.
//             </p>
//           </div>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredQuestions.map((q) => (
//               <div
//                 key={q.id}
//                 className="bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md p-6 hover:bg-white/10 transition-all cursor-pointer group"
//                 onClick={() => openModal(q)}
//               >
//                 {/* Header */}
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={
//                         q.users?.profile_image ||
//                         "https://via.placeholder.com/48?text=U"
//                       }
//                       alt={q.users?.name || "Author"}
//                       className="w-12 h-12 rounded-full border border-white/20 object-cover"
//                     />
//                     <div>
//                       <h3 className="font-semibold text-white/90 group-hover:text-yellow-400 transition">
//                         {q.users?.name || "Anonymous"}
//                       </h3>
//                       <p className="text-xs text-white/60">
//                         {q.users?.branch || "Department"}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="text-xs bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full border border-yellow-400/30 font-medium">
//                     {q.category || "General"}
//                   </div>
//                 </div>

//                 {/* Title and Question */}
//                 <h4 className="font-semibold text-white/90 mb-1 group-hover:text-yellow-400 line-clamp-2">
//                   {q.title}
//                 </h4>
//                 <p className="text-sm text-white/70 mb-4 leading-relaxed line-clamp-3">
//                   {q.question}
//                 </p>

//                 {/* Optional image preview */}
//                 {q.image && (
//                   <img
//                     src={q.image}
//                     alt="Question image"
//                     className="rounded-md mb-3 border border-white/10 max-h-48 object-cover"
//                   />
//                 )}

//                 {/* Footer */}
//                 <div className="flex items-center justify-between text-xs text-white/60 mb-2">
//                   <div className="flex items-center gap-2">
//                     <Star size={14} className="text-yellow-400" />
//                     <span>Answers</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Clock size={12} />
//                     <span>
//                       {q.created_at
//                         ? new Date(q.created_at).toLocaleString()
//                         : "Just now"}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <span className="text-xs text-white/60">Click to view & answer</span>
//                   <ArrowRight
//                     size={16}
//                     className="text-white/60 group-hover:text-yellow-400 transition-colors"
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Modal (Full Q&A) */}
//       {isModalOpen && selectedQuestion && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
//           <div className="bg-gray-900 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl p-6 border border-white/10 relative">
//             <button
//               onClick={closeModal}
//               className="absolute top-3 right-3 text-gray-400 hover:text-white"
//               aria-label="Close"
//             >
//               <X size={20} />
//             </button>

//             <div className="flex items-center gap-3 mb-4">
//               <img
//                 src={
//                   selectedQuestion.users?.profile_image ||
//                   "https://via.placeholder.com/48?text=U"
//                 }
//                 alt={selectedQuestion.users?.name || "Author"}
//                 className="w-12 h-12 rounded-full border border-white/20 object-cover"
//               />
//               <div>
//                 <h3 className="font-semibold text-white">
//                   {selectedQuestion.users?.name || "Anonymous"}
//                 </h3>
//                 <p className="text-xs text-white/60">
//                   {selectedQuestion.users?.branch || "Department"}
//                 </p>
//               </div>
//               <span className="ml-auto text-xs bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full border border-yellow-400/30 font-medium">
//                 {selectedQuestion.category || "General"}
//               </span>
//             </div>

//             <h2 className="text-xl text-yellow-400 font-bold">{selectedQuestion.title}</h2>
//             <p className="text-sm text-white/80 mt-2">{selectedQuestion.question}</p>

//             {selectedQuestion.image && (
//               <img
//                 src={selectedQuestion.image}
//                 alt="Question attachment"
//                 className="mt-4 rounded-lg border border-white/10"
//               />
//             )}

//             <div className="mt-6">
//               <QueBox
//                 id={selectedQuestion.id}
//                 category={selectedQuestion.category}
//                 que={selectedQuestion.question}
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       <BottomNavbar />
//     </div>
//   );
// }
// }









// "use client";

// import React, { useEffect, useMemo, useState, useContext } from "react";
// import Navbar from "@/components/Navbar";
// import BottomNavbar from "@/components/BottomNavbar";
// import { MessageCircle, Clock, ArrowRight, Star, X } from "lucide-react";
// import { supabase } from "@/lib/supabaseClient";
// import { AuthContext } from "@/lib/AuthProvider";
// import QueBox from "@/components/QueBox";
// import { useRouter } from "next/navigation";

// export default function MessagePage() {
//   const router = useRouter();
//   const { currentUser, loading: authLoading } = useContext(AuthContext);

//   const [activeFilter, setActiveFilter] = useState("Questions for You");
//   const [questionsForYou, setQuestionsForYou] = useState([]);
//   const [allCategoryQuestions, setAllCategoryQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedQuestion, setSelectedQuestion] = useState(null);

//   /* 🔐 REDIRECT ONLY (NO BLOCKING) */
//   useEffect(() => {
//     if (!authLoading && !currentUser) {
//       router.replace("/login");
//     }
//   }, [authLoading, currentUser, router]);

//   /* 🔍 derived list depending on tab */
//   const filteredQuestions = useMemo(() => {
//     return activeFilter === "Questions for You"
//       ? questionsForYou
//       : allCategoryQuestions;
//   }, [activeFilter, questionsForYou, allCategoryQuestions]);

//   /* 📥 LOAD QUESTIONS */
//   useEffect(() => {
//     if (!currentUser) {
//       setLoading(false);
//       return;
//     }

//     let mounted = true;

//     const loadQuestions = async () => {
//       setLoading(true);

//       // 1️⃣ Assigned questions
//       const { data: assignedData } = await supabase
//         .from("questions")
//         .select(`
//           id, title, question, category, created_at, image, author_id, assigned_to,
//           users:author_id ( name, profile_image, branch )
//         `)
//         .eq("assigned_to", currentUser.id)
//         .order("created_at", { ascending: false });

//       if (mounted) {
//         setQuestionsForYou(assignedData || []);
//       }

//       // 2️⃣ Category-based questions
//       const myCats = Array.isArray(currentUser.categories)
//         ? currentUser.categories.filter(Boolean)
//         : [];

//       if (myCats.length === 0) {
//         if (mounted) {
//           setAllCategoryQuestions([]);
//           setLoading(false);
//         }
//         return;
//       }

//       const { data: catData } = await supabase
//         .from("questions")
//         .select(`
//           id, title, question, category, created_at, image, author_id, assigned_to,
//           users:author_id ( name, profile_image, branch )
//         `)
//         .in("category", myCats)
//         .order("created_at", { ascending: false });

//       const finalCategoryList = (catData || []).filter(
//         (q) => !q.assigned_to || q.assigned_to !== currentUser.id
//       );

//       if (mounted) {
//         setAllCategoryQuestions(finalCategoryList);
//         setLoading(false);
//       }
//     };

//     loadQuestions();

//     return () => {
//       mounted = false;
//     };
//   }, [currentUser]);

//   const openModal = (q) => {
//     setSelectedQuestion(q);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedQuestion(null);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white relative">
//       <Navbar />

//       {/* Header */}
//       <section className="max-w-7xl mx-auto px-4 pt-10 pb-6">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-black font-extrabold shadow-lg">
//             <MessageCircle size={20} />
//           </div>
//           <span className="text-white/70">Messages</span>
//         </div>
//         <h1 className="text-2xl md:text-3xl font-semibold">Answer Questions</h1>
//         <p className="text-white/70 text-sm mt-1">
//           Help juniors by sharing your knowledge.
//         </p>
//       </section>

//       {/* Filter Buttons */}
//       <section className="max-w-7xl mx-auto px-4 pb-6">
//         <div className="flex gap-3">
//           {["Questions for You", "All Questions"].map((filter) => (
//             <button
//               key={filter}
//               onClick={() => setActiveFilter(filter)}
//               className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
//                 activeFilter === filter
//                   ? "bg-yellow-400 text-black shadow-lg"
//                   : "bg-white/10 border border-white/15 text-white/80 hover:bg-white/20"
//               }`}
//             >
//               {filter}
//             </button>
//           ))}
//         </div>
//       </section>

//       {/* Questions */}
//       <section className="max-w-7xl mx-auto px-4 pb-24">
//         {loading ? (
//           <p className="text-gray-400 text-center py-10">Loading questions...</p>
//         ) : filteredQuestions.length === 0 ? (
//           <div className="text-center py-12">
//             <MessageCircle size={48} className="text-white/40 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-white/60 mb-2">
//               No questions found
//             </h3>
//             <p className="text-sm text-white/40">
//               Try changing your filter or check back later.
//             </p>
//           </div>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredQuestions.map((q) => (
//               <div
//                 key={q.id}
//                 className="bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-6 hover:bg-white/10 transition cursor-pointer"
//                 onClick={() => openModal(q)}
//               >
//                 <h4 className="font-semibold mb-1">{q.title}</h4>
//                 <p className="text-sm text-white/70 line-clamp-3">
//                   {q.question}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Modal */}
//       {isModalOpen && selectedQuestion && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
//           <div className="bg-gray-900 w-full max-w-2xl rounded-xl p-6 border border-white/10 relative">
//             <button
//               onClick={closeModal}
//               className="absolute top-3 right-3 text-gray-400 hover:text-white"
//             >
//               <X size={20} />
//             </button>

//             <h2 className="text-xl text-yellow-400 font-bold">
//               {selectedQuestion.title}
//             </h2>
//             <p className="text-sm text-white/80 mt-2">
//               {selectedQuestion.question}
//             </p>

//             <div className="mt-6">
//               <QueBox
//                 id={selectedQuestion.id}
//                 category={selectedQuestion.category}
//                 que={selectedQuestion.question}
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       <BottomNavbar />
//     </div>
//   );
// }



















// app/message/page.js
"use client";

import React, { useEffect, useMemo, useState, useContext } from "react";
import Navbar from "@/components/Navbar";
import BottomNavbar from "@/components/BottomNavbar";
import { MessageCircle, Clock, ArrowRight, Star, X } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { AuthContext } from "@/lib/AuthProvider";
import QueBox from "@/components/QueBox";

export default function MessagePage() {
  const { currentUser, loading: authLoading } = useContext(AuthContext);

  const [activeFilter, setActiveFilter] = useState("Questions for You");
  const [questionsForYou, setQuestionsForYou] = useState([]);
  const [allCategoryQuestions, setAllCategoryQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const filteredQuestions = useMemo(() => {
    return activeFilter === "Questions for You" ? questionsForYou : allCategoryQuestions;
  }, [activeFilter, questionsForYou, allCategoryQuestions]);

  useEffect(() => {
    if (authLoading) return;

    if (!currentUser) {
      setLoading(false);
      setQuestionsForYou([]);
      setAllCategoryQuestions([]);
      return;
    }

    const loadQuestions = async () => {
      setLoading(true);

      const { data: assignedData, error: assignedErr } = await supabase
        .from("questions")
        .select(`
          id, title, question, category, created_at, image, author_id, assigned_to,
          users:author_id ( name, profile_image, branch )
        `)
        .eq("assigned_to", currentUser.id)
        .order("created_at", { ascending: false });

      if (assignedErr) console.error("❌ Error fetching assigned questions:", assignedErr.message);
      setQuestionsForYou(assignedData || []);

      const myCats = Array.isArray(currentUser.categories)
        ? currentUser.categories.filter(Boolean)
        : [];

      if (myCats.length === 0) {
        setAllCategoryQuestions([]);
        setLoading(false);
        return;
      }

      const { data: catData, error: catErr } = await supabase
        .from("questions")
        .select(`
          id, title, question, category, created_at, image, author_id, assigned_to,
          users:author_id ( name, profile_image, branch )
        `)
        .in("category", myCats)
        .order("created_at", { ascending: false });

      if (catErr) console.error("❌ Error fetching category questions:", catErr.message);

      const finalCategoryList = (catData || []).filter(
        (q) => !q.assigned_to || q.assigned_to !== currentUser.id
      );

      setAllCategoryQuestions(finalCategoryList);
      setLoading(false);
    };

    loadQuestions();
  }, [authLoading, currentUser]);

  const openModal = (q) => {
    setSelectedQuestion(q);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black flex items-center justify-center text-white">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white relative">
      <Navbar />

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 pt-10 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-black font-extrabold shadow-lg">
            <MessageCircle size={20} />
          </div>
          <span className="text-white/70">Messages</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold">Answer Questions</h1>
        <p className="text-white/70 text-sm mt-1">
          {!currentUser
            ? "Log in to see questions in your categories."
            : "Help juniors by sharing your knowledge."}
        </p>
      </section>

      {/* Filter Buttons */}
      <section className="max-w-7xl mx-auto px-4 pb-6">
        <div className="flex gap-3">
          {["Questions for You", "All Questions"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                activeFilter === filter
                  ? "bg-yellow-400 text-black shadow-lg"
                  : "bg-white/10 border border-white/15 text-white/80 hover:bg-white/20"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Questions Display */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        {loading ? (
          <p className="text-gray-400 text-center py-10">Loading questions...</p>
        ) : !currentUser ? (
          <div className="text-center py-12">
            <MessageCircle size={48} className="text-white/40 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white/60 mb-2">You’re not logged in</h3>
            <p className="text-sm text-white/40">Please sign in to see questions in your categories.</p>
          </div>
        ) : filteredQuestions.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle size={48} className="text-white/40 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white/60 mb-2">No questions found</h3>
            <p className="text-sm text-white/40">Try changing your filter or check back later.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuestions.map((q) => (
              <div
                key={q.id}
                className="bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md p-6 hover:bg-white/10 transition-all cursor-pointer group"
                onClick={() => openModal(q)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={q.users?.profile_image || "https://via.placeholder.com/48?text=U"}
                      alt={q.users?.name || "Author"}
                      className="w-12 h-12 rounded-full border border-white/20 object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-white/90 group-hover:text-yellow-400 transition">
                        {q.users?.name || "Anonymous"}
                      </h3>
                      <p className="text-xs text-white/60">{q.users?.branch || "Department"}</p>
                    </div>
                  </div>
                  <div className="text-xs bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full border border-yellow-400/30 font-medium">
                    {q.category || "General"}
                  </div>
                </div>

                <h4 className="font-semibold text-white/90 mb-1 group-hover:text-yellow-400 line-clamp-2">
                  {q.title}
                </h4>
                <p className="text-sm text-white/70 mb-4 leading-relaxed line-clamp-3">{q.question}</p>

                {q.image && (
                  <img
                    src={q.image}
                    alt="Question image"
                    className="rounded-md mb-3 border border-white/10 max-h-48 object-cover"
                  />
                )}

                <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                  <div className="flex items-center gap-2">
                    <Star size={14} className="text-yellow-400" />
                    <span>Answers</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{q.created_at ? new Date(q.created_at).toLocaleString() : "Just now"}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/60">Click to view & answer</span>
                  <ArrowRight size={16} className="text-white/60 group-hover:text-yellow-400 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {isModalOpen && selectedQuestion && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-gray-900 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl p-6 border border-white/10 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <img
                src={selectedQuestion.users?.profile_image || "https://via.placeholder.com/48?text=U"}
                alt={selectedQuestion.users?.name || "Author"}
                className="w-12 h-12 rounded-full border border-white/20 object-cover"
              />
              <div>
                <h3 className="font-semibold text-white">{selectedQuestion.users?.name || "Anonymous"}</h3>
                <p className="text-xs text-white/60">{selectedQuestion.users?.branch || "Department"}</p>
              </div>
              <span className="ml-auto text-xs bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full border border-yellow-400/30 font-medium">
                {selectedQuestion.category || "General"}
              </span>
            </div>

            <h2 className="text-xl text-yellow-400 font-bold">{selectedQuestion.title}</h2>
            <p className="text-sm text-white/80 mt-2">{selectedQuestion.question}</p>

            {selectedQuestion.image && (
              <img src={selectedQuestion.image} alt="Question attachment" className="mt-4 rounded-lg border border-white/10" />
            )}

            <div className="mt-6">
              <QueBox id={selectedQuestion.id} category={selectedQuestion.category} que={selectedQuestion.question} />
            </div>
          </div>
        </div>
      )}

      <BottomNavbar />
    </div>
  );
}