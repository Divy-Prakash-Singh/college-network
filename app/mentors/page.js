// "use client";
// import React, { useState } from "react";
// import Navbar from "@/components/Navbar";
// import BottomNavbar from "@/components/BottomNavbar";
// import { MessageCircle, Star, MapPin, Briefcase } from "lucide-react";

// export default function MentorsPage() {
//   const [activeFilter, setActiveFilter] = useState("All");

//   const mentors = [
//     {
//       id: 1,
//       name: "Dr. Sarah Chen",
//       role: "Senior Software Engineer",
//       company: "Google",
//       location: "Mountain View, CA",
//       rating: 4.9,
//       reviews: 127,
//       category: "Technology",
//       expertise: ["Machine Learning", "Python", "Data Science"],
//       image: "https://randomuser.me/api/portraits/women/1.jpg",
//       description: "10+ years in ML/AI. Helped 50+ students land tech jobs.",
//     },
//     {
//       id: 2,
//       name: "Rahul Kumar",
//       role: "Product Manager",
//       company: "Microsoft",
//       location: "Seattle, WA",
//       rating: 4.8,
//       reviews: 89,
//       category: "Technology",
//       expertise: ["Product Strategy", "User Research", "Agile"],
//       image: "https://randomuser.me/api/portraits/men/2.jpg",
//       description: "Ex-Google PM. Expert in product development and strategy.",
//     },
//     {
//       id: 3,
//       name: "Priya Sharma",
//       role: "UX Designer",
//       company: "Apple",
//       location: "Cupertino, CA",
//       rating: 4.7,
//       reviews: 156,
//       category: "Technology",
//       expertise: ["UI/UX Design", "Figma", "User Testing"],
//       image: "https://randomuser.me/api/portraits/women/3.jpg",
//       description: "Design leader with focus on user-centered solutions.",
//     },
//     {
//       id: 4,
//       name: "Alex Johnson",
//       role: "Data Scientist",
//       company: "Netflix",
//       location: "Los Gatos, CA",
//       rating: 4.9,
//       reviews: 203,
//       category: "Technology",
//       expertise: ["Big Data", "SQL", "Statistics"],
//       image: "https://randomuser.me/api/portraits/men/4.jpg",
//       description: "Specializes in recommendation systems and analytics.",
//     },
//     {
//       id: 5,
//       name: "Maria Garcia",
//       role: "Frontend Developer",
//       company: "Meta",
//       location: "Menlo Park, CA",
//       rating: 4.6,
//       reviews: 94,
//       category: "Technology",
//       expertise: ["React", "JavaScript", "CSS"],
//       image: "https://randomuser.me/api/portraits/women/5.jpg",
//       description: "React expert helping students build modern web apps.",
//     },
//     {
//       id: 6,
//       name: "David Kim",
//       role: "DevOps Engineer",
//       company: "Amazon",
//       location: "Seattle, WA",
//       rating: 4.8,
//       reviews: 112,
//       category: "Technology",
//       expertise: ["AWS", "Docker", "Kubernetes"],
//       image: "https://randomuser.me/api/portraits/men/6.jpg",
//       description: "Cloud infrastructure specialist with 8+ years experience.",
//     },
//     {
//       id: 7,
//       name: "Lisa Wang",
//       role: "Backend Engineer",
//       company: "Uber",
//       location: "San Francisco, CA",
//       rating: 4.7,
//       reviews: 78,
//       category: "Technology",
//       expertise: ["Java", "Spring Boot", "Microservices"],
//       image: "https://randomuser.me/api/portraits/women/7.jpg",
//       description: "Scalable backend systems expert and mentor.",
//     },
//     {
//       id: 8,
//       name: "Michael Brown",
//       role: "Mobile Developer",
//       company: "Spotify",
//       location: "Stockholm, Sweden",
//       rating: 4.9,
//       reviews: 145,
//       category: "Technology",
//       expertise: ["iOS", "Swift", "Mobile UI"],
//       image: "https://randomuser.me/api/portraits/men/8.jpg",
//       description: "iOS development specialist with app store success.",
//     },
//     {
//       id: 9,
//       name: "Anita Patel",
//       role: "Startup Founder",
//       company: "TechFlow Inc",
//       location: "Bangalore, India",
//       rating: 4.8,
//       reviews: 67,
//       category: "Startup",
//       expertise: ["Entrepreneurship", "Funding", "Business Strategy"],
//       image: "https://randomuser.me/api/portraits/women/9.jpg",
//       description: "Built and sold 2 startups. Expert in early-stage companies.",
//     },
//     {
//       id: 10,
//       name: "Rajesh Singh",
//       role: "Investment Manager",
//       company: "Goldman Sachs",
//       location: "Mumbai, India",
//       rating: 4.7,
//       reviews: 89,
//       category: "Finance",
//       expertise: ["Investment Banking", "Financial Modeling", "M&A"],
//       image: "https://randomuser.me/api/portraits/men/10.jpg",
//       description: "15+ years in investment banking and financial services.",
//     },
//     {
//       id: 11,
//       name: "Dr. Priya Verma",
//       role: "GATE Expert",
//       company: "IIT Delhi",
//       location: "Delhi, India",
//       rating: 4.9,
//       reviews: 234,
//       category: "GATE",
//       expertise: ["Computer Science", "Algorithms", "Data Structures"],
//       image: "https://randomuser.me/api/portraits/women/11.jpg",
//       description: "GATE topper and professor. Helped 200+ students crack GATE.",
//     },
//     {
//       id: 12,
//       name: "Amit Kumar",
//       role: "CAT Mentor",
//       company: "CAT Academy",
//       location: "Pune, India",
//       rating: 4.8,
//       reviews: 156,
//       category: "CAT",
//       expertise: ["Quantitative Aptitude", "Verbal Ability", "Data Interpretation"],
//       image: "https://randomuser.me/api/portraits/men/12.jpg",
//       description: "99.9 percentile in CAT. Expert in MBA entrance preparation.",
//     },
//   ];

//   const categories = ["All", "Technology", "Startup", "Finance", "GATE", "CAT"];

//   const filteredMentors = activeFilter === "All" 
//     ? mentors 
//     : mentors.filter(mentor => mentor.category === activeFilter);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white">
//       <Navbar />

//       {/* Header */}
//       <section className="max-w-7xl mx-auto px-4 pt-10 pb-6">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-black font-extrabold shadow-lg">
//             M
//           </div>
//           <span className="text-white/70">Mentors</span>
//         </div>
//         <h1 className="text-2xl md:text-3xl font-semibold">Find Your Mentor</h1>
//         <p className="text-white/70 text-sm mt-1">Connect with experienced professionals across various domains.</p>
//       </section>

//       {/* Filter Buttons */}
//       <section className="max-w-7xl mx-auto px-4 pb-6">
//         <div className="flex flex-wrap gap-3">
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setActiveFilter(category)}
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                 activeFilter === category
//                   ? "bg-yellow-400 text-black shadow-lg"
//                   : "bg-white/10 border border-white/15 text-white/80 hover:bg-white/20"
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//       </section>

//       {/* Mentors Grid */}
//       <section className="max-w-7xl mx-auto px-4 pb-24">
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredMentors.map((mentor) => (
//             <div key={mentor.id} className="bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md p-6 hover:bg-white/10 transition-all">
//               {/* Header */}
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex items-center gap-3">
//                   <img
//                     src={mentor.image}
//                     alt={mentor.name}
//                     className="w-12 h-12 rounded-full border border-white/20"
//                   />
//                   <div>
//                     <h3 className="font-semibold text-white/90">{mentor.name}</h3>
//                     <p className="text-sm text-white/70">{mentor.role}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <Star size={16} className="text-yellow-400 fill-current" />
//                   <span className="text-sm text-white/80">{mentor.rating}</span>
//                 </div>
//               </div>

//               {/* Company & Location */}
//               <div className="flex items-center gap-4 mb-3 text-sm text-white/70">
//                 <div className="flex items-center gap-1">
//                   <Briefcase size={14} />
//                   <span>{mentor.company}</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <MapPin size={14} />
//                   <span>{mentor.location}</span>
//                 </div>
//               </div>

//               {/* Category Badge */}
//               <div className="mb-3">
//                 <span className="px-2 py-1 text-xs bg-white/10 border border-white/15 rounded-full text-white/70">
//                   {mentor.category}
//                 </span>
//               </div>

//               {/* Description */}
//               <p className="text-sm text-white/80 mb-4 leading-relaxed">
//                 {mentor.description}
//               </p>

//               {/* Expertise Tags */}
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {mentor.expertise.map((skill) => (
//                   <span
//                     key={skill}
//                     className="px-2 py-1 text-xs bg-white/10 border border-white/15 rounded-full text-white/70"
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>

//               {/* Footer */}
//               <div className="flex items-center justify-between">
//                 <span className="text-xs text-white/60">{mentor.reviews} reviews</span>
//                 <button className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-lg transition">
//                   <MessageCircle size={16} />
//                   Connect
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <BottomNavbar />
//     </div>
//   );
// }
















// "use client";
// import { useEffect, useState } from "react";
// import Navbar from "@/components/Navbar";
// import BottomNavbar from "@/components/BottomNavbar";
// import Link from "next/link";
// import { supabase } from "@/lib/supabaseClient";
// import { BookOpen, MessageCircle } from "lucide-react";

// export default function MentorsPage() {
//   const [mentors, setMentors] = useState([]);
//   const [categories, setCategories] = useState(["All"]);
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMentors = async () => {
//       setLoading(true);

//       // Fetch mentors
//       const { data: usersData } = await supabase
//         .from("users")
//         .select("id,name,branch,bio,categories,profile_image,is_mentor")
//         .eq("is_mentor", true);

//       if (!usersData) return;

//       // Build distinct categories dynamically from mentors
//       const cats = new Set(["All"]);
//       usersData.forEach((m) =>
//         m.categories?.forEach((c) => cats.add(c))
//       );
//       setCategories([...cats]);

//       // For each mentor count distinct answered questions
//       const withAnswersCount = await Promise.all(
//         usersData.map(async (m) => {
//           const { count } = await supabase
//             .from("answers")
//             .select("question_id", { count: "exact", head: true })
//             .eq("author_id", m.id)
//             .then((res) => ({ count: res.count || 0 }));

//           return { ...m, answeredQuestions: count };
//         })
//       );

//       setMentors(withAnswersCount);
//       setLoading(false);
//     };

//     fetchMentors();
//   }, []);

//   // Filter mentors by category
//   const filteredMentors =
//     activeFilter === "All"
//       ? mentors
//       : mentors.filter((m) => m.categories?.includes(activeFilter));

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white">
//       <Navbar />

//       {/* Header */}
//       <section className="max-w-7xl mx-auto px-4 pt-10 pb-6">
//         <h1 className="text-2xl md:text-3xl font-semibold">Find Your Mentor</h1>
//         <p className="text-white/70 text-sm mt-1">
//           Connect with verified mentors across different domains.
//         </p>
//       </section>

//       {/* Dynamic Categories — Horizontal Scroll */}
//       <section className="max-w-7xl mx-auto px-4 pb-6 overflow-x-auto scrollbar-hide flex gap-3">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setActiveFilter(cat)}
//             className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//               activeFilter === cat
//                 ? "bg-yellow-400 text-black shadow-lg"
//                 : "bg-white/10 border border-white/15 text-white/80 hover:bg-white/20"
//             }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </section>

//       {/* Mentors Grid */}
//       <section className="max-w-7xl mx-auto px-4 pb-24">
//         {loading ? (
//           <p className="text-center text-gray-400">Loading mentors...</p>
//         ) : filteredMentors.length === 0 ? (
//           <p className="text-center text-gray-400">No mentors found.</p>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredMentors.map((mentor) => (
//               <div
//                 key={mentor.id}
//                 className="bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md p-6 hover:bg-white/10 transition-all duration-200"
//               >
//                 {/* Profile Header */}
//                 <div className="flex items-center gap-4 mb-4">
//                   <img
//                     src={
//                       mentor.profile_image ||
//                       "https://via.placeholder.com/80?text=User"
//                     }
//                     alt={mentor.name}
//                     className="w-14 h-14 rounded-full border-2 border-yellow-400/40 object-cover"
//                   />
//                   <div>
//                     <h3 className="font-semibold text-lg text-white">
//                       {mentor.name}
//                     </h3>
//                     <p className="text-sm text-gray-400">
//                       {mentor.branch || "Branch not set"}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Bio */}
//                 <p className="text-gray-300 text-sm leading-relaxed mb-4">
//                   {mentor.bio || "No bio provided"}
//                 </p>

//                 {/* Stats + Button */}
//                 <div className="flex items-center justify-between mt-4">
//                   <div className="flex items-center gap-2 text-yellow-400">
//                     <BookOpen size={16} />
//                     <span className="text-sm">
//                       {mentor.answeredQuestions} answered
//                     </span>
//                   </div>

//                   <Link
//                     href={`/profile/${mentor.id}`}
//                     className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-lg transition-all"
//                   >
//                     <MessageCircle size={16} />
//                     View Profile
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       <BottomNavbar />
//     </div>
//   );
// }















// "use client";
// import { useEffect, useState } from "react";
// import Navbar from "@/components/Navbar";
// import BottomNavbar from "@/components/BottomNavbar";
// import Link from "next/link";
// import { supabase } from "@/lib/supabaseClient";
// import { BookOpen, MessageCircle } from "lucide-react";

// export default function MentorsPage() {
//   const [mentors, setMentors] = useState([]);
//   const [categories, setCategories] = useState(["All"]);
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMentors = async () => {
//       setLoading(true);

//       // Fetch mentors
//       const { data: usersData } = await supabase
//         .from("users")
//         .select("id,name,branch,bio,categories,profile_image,is_mentor")
//         .eq("is_mentor", true);

//       if (!usersData) return;

//       // Build distinct categories dynamically from mentors
//       const cats = new Set(["All"]);
//       usersData.forEach((m) =>
//         m.categories?.forEach((c) => cats.add(c))
//       );
//       setCategories([...cats]);

//       // For each mentor count distinct answered questions
//       const withAnswersCount = await Promise.all(
//         usersData.map(async (m) => {
//           const { count } = await supabase
//             .from("answers")
//             .select("question_id", { count: "exact", head: true })
//             .eq("author_id", m.id)
//             .then((res) => ({ count: res.count || 0 }));

//           return { ...m, answeredQuestions: count };
//         })
//       );

//       setMentors(withAnswersCount);
//       setLoading(false);
//     };

//     fetchMentors();
//   }, []);

//   // Filter mentors by category
//   const filteredMentors =
//     activeFilter === "All"
//       ? mentors
//       : mentors.filter((m) => m.categories?.includes(activeFilter));

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white">
//       <Navbar />

//       {/* Header */}
//       <section className="max-w-7xl mx-auto px-4 pt-10 pb-6">
//         <h1 className="text-2xl md:text-3xl font-semibold">Find Your Mentor</h1>
//         <p className="text-white/70 text-sm mt-1">
//           Connect with verified mentors across different domains.
//         </p>
//       </section>

//       {/* Dynamic Categories — Horizontal Scroll */}
//       <section className="max-w-7xl mx-auto px-4 pb-6 overflow-x-auto scrollbar-hide flex gap-3">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setActiveFilter(cat)}
//             className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//               activeFilter === cat
//                 ? "bg-yellow-400 text-black shadow-lg"
//                 : "bg-white/10 border border-white/15 text-white/80 hover:bg-white/20"
//             }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </section>

//       {/* Mentors Grid */}
//       <section className="max-w-7xl mx-auto px-4 pb-24">
//         {loading ? (
//           <p className="text-center text-gray-400">Loading mentors...</p>
//         ) : filteredMentors.length === 0 ? (
//           <p className="text-center text-gray-400">No mentors found.</p>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredMentors.map((mentor) => (
//               <div
//                 key={mentor.id}
//                 className="bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md p-6 hover:bg-white/10 transition-all duration-200"
//               >
//                 {/* Profile Header */}
//                 <div className="flex items-center gap-4 mb-4">
//                   <img
//                     src={
//                       mentor.profile_image ||
//                       "https://via.placeholder.com/80?text=User"
//                     }
//                     alt={mentor.name}
//                     className="w-14 h-14 rounded-full border-2 border-yellow-400/40 object-cover"
//                   />
//                   <div>
//                     <h3 className="font-semibold text-lg text-white">
//                       {mentor.name}
//                     </h3>
//                     <p className="text-sm text-gray-400">
//                       {mentor.branch || "Branch not set"}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Bio */}
//                 <p className="text-gray-300 text-sm leading-relaxed mb-4">
//                   {mentor.bio || "No bio provided"}
//                 </p>

//                 {/* Stats + Button */}
//                 <div className="flex items-center justify-between mt-4">
//                   <div className="flex items-center gap-2 text-yellow-400">
//                     <BookOpen size={16} />
//                     <span className="text-sm">
//                       {mentor.answeredQuestions} answered
//                     </span>
//                   </div>

//                   <Link
//                     href={`/profile/${mentor.id}`}
//                     className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-lg transition-all"
//                   >
//                     <MessageCircle size={16} />
//                     View Profile
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       <BottomNavbar />
//     </div>
//   );
// }

















// "use client";
// import { useEffect, useState } from "react";
// import Navbar from "@/components/Navbar";
// import BottomNavbar from "@/components/BottomNavbar";
// import Link from "next/link";
// import { supabase } from "@/lib/supabaseClient";
// import { BookOpen, MessageCircle } from "lucide-react";

// export default function MentorsPage() {
//   const [mentors, setMentors] = useState([]);
//   const [categories, setCategories] = useState(["All"]);
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMentors = async () => {
//       setLoading(true);

//       // Fetch mentors
//       const { data: usersData } = await supabase
//         .from("users")
//         .select("id,name,branch,bio,categories,profile_image,is_mentor")
//         .eq("is_mentor", true);

//       if (!usersData) return;

//       // Build distinct categories dynamically from mentors
//       const cats = new Set(["All"]);
//       usersData.forEach((m) =>
//         m.categories?.forEach((c) => cats.add(c))
//       );
//       setCategories([...cats]);

//       // For each mentor count distinct answered questions
//       const withAnswersCount = await Promise.all(
//         usersData.map(async (m) => {
//           const { count } = await supabase
//             .from("answers")
//             .select("question_id", { count: "exact", head: true })
//             .eq("author_id", m.id)
//             .then((res) => ({ count: res.count || 0 }));

//           return { ...m, answeredQuestions: count };
//         })
//       );

//       setMentors(withAnswersCount);
//       setLoading(false);
//     };

//     fetchMentors();
//   }, []);

//   // Filter mentors by category
//   const filteredMentors =
//     activeFilter === "All"
//       ? mentors
//       : mentors.filter((m) => m.categories?.includes(activeFilter));

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white">
//       <Navbar />

//       {/* Header */}
//       <section className="max-w-7xl mx-auto px-4 pt-10 pb-6">
//         <h1 className="text-2xl md:text-3xl font-semibold">Find Your Mentor</h1>
//         <p className="text-white/70 text-sm mt-1">
//           Connect with verified mentors across different domains.
//         </p>
//       </section>

//       {/* Dynamic Categories — Horizontal Scroll */}
//       <section className="max-w-7xl mx-auto px-4 pb-6 overflow-x-auto scrollbar-hide flex gap-3">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setActiveFilter(cat)}
//             className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//               activeFilter === cat
//                 ? "bg-yellow-400 text-black shadow-lg"
//                 : "bg-white/10 border border-white/15 text-white/80 hover:bg-white/20"
//             }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </section>

//       {/* Mentors Grid */}
//       <section className="max-w-7xl mx-auto px-4 pb-24">
//         {loading ? (
//           <p className="text-center text-gray-400">Loading mentors...</p>
//         ) : filteredMentors.length === 0 ? (
//           <p className="text-center text-gray-400">No mentors found.</p>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredMentors.map((mentor) => (
//               <div
//                 key={mentor.id}
//                 className="bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md p-6 hover:bg-white/10 transition-all duration-200"
//               >
//                 {/* Profile Header */}
//                 <div className="flex items-center gap-4 mb-4">
//                   <img
//                     src={
//                       mentor.profile_image ||
//                       "https://via.placeholder.com/80?text=User"
//                     }
//                     alt={mentor.name}
//                     className="w-14 h-14 rounded-full border-2 border-yellow-400/40 object-cover"
//                   />
//                   <div>
//                     <h3 className="font-semibold text-lg text-white">
//                       {mentor.name}
//                     </h3>
//                     <p className="text-sm text-gray-400">
//                       {mentor.branch || "Branch not set"}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Bio */}
//                 <p className="text-gray-300 text-sm leading-relaxed mb-4">
//                   {mentor.bio || "No bio provided"}
//                 </p>

//                 {/* Stats + Button */}
//                 <div className="flex items-center justify-between mt-4">
//                   <div className="flex items-center gap-2 text-yellow-400">
//                     <BookOpen size={16} />
//                     <span className="text-sm">
//                       {mentor.answeredQuestions} answered
//                     </span>
//                   </div>

//                   <Link
//                     href={`/profile/${mentor.id}`}
//                     className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-lg transition-all"
//                   >
//                     <MessageCircle size={16} />
//                     View Profile
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       <BottomNavbar />
//     </div>
//   );
// }
















"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import BottomNavbar from "@/components/BottomNavbar";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { BookOpen, MessageCircle } from "lucide-react";

const FIXED_CATEGORIES = [
  "All",
  "Civil",
  "Computer Science",
  "Electrical",
  "Electronics & Communication",
  "Mechanical",
  "Information Technology",
  "Production & Industrial Engineering",
  "Artificial Intelligence & Data Science",
  "Robotics & Automation",
  "Sustainable Energy Engineering",
  "GATE",
  "UPSC",
  "DSA",
  "Web Dev",
  "Finance",
  "Startup",
  "AI",
];

export default function MentorsPage() {
  const [mentors, setMentors] = useState([]);
  const [categories] = useState(FIXED_CATEGORIES); // ✅ fixed list
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);

      const { data: usersData } = await supabase
        .from("users")
        .select("id,name,branch,bio,categories,profile_image,is_mentor")
        .eq("is_mentor", true);

      if (!usersData) return;

      const withAnswersCount = await Promise.all(
        usersData.map(async (m) => {
          const { count } = await supabase
            .from("answers")
            .select("question_id", { count: "exact", head: true })
            .eq("author_id", m.id)
            .then((res) => ({ count: res.count || 0 }));

          return { ...m, answeredQuestions: count };
        })
      );

      setMentors(withAnswersCount);
      setLoading(false);
    };

    fetchMentors();
  }, []);

  const filteredMentors =
    activeFilter === "All"
      ? mentors
      : mentors.filter((m) => m.categories?.includes(activeFilter));

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white">
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 pt-10 pb-6">
        <h1 className="text-2xl md:text-3xl font-semibold">Find Your Mentor</h1>
        <p className="text-white/70 text-sm mt-1">
          Connect with verified mentors across different domains.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-6 overflow-x-auto scrollbar-hide flex gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeFilter === cat
                ? "bg-yellow-400 text-black shadow-lg"
                : "bg-white/10 border border-white/15 text-white/80 hover:bg-white/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-24">
        {loading ? (
          <p className="text-center text-gray-400">Loading mentors...</p>
        ) : filteredMentors.length === 0 ? (
          <p className="text-center text-gray-400">No mentors found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <div
                key={mentor.id}
                className="bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md p-6 hover:bg-white/10 transition-all duration-200"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={
                      mentor.profile_image ||
                      "https://via.placeholder.com/80?text=User"
                    }
                    alt={mentor.name}
                    className="w-14 h-14 rounded-full border-2 border-yellow-400/40 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-white">
                      {mentor.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {mentor.branch || "Branch not set"}
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {mentor.bio || "No bio provided"}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 text-yellow-400">
                    <BookOpen size={16} />
                    <span className="text-sm">
                      {mentor.answeredQuestions} answered
                    </span>
                  </div>

                  <Link
                    href={`/profile/${mentor.id}`}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-lg transition-all"
                  >
                    <MessageCircle size={16} />
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <BottomNavbar />
    </div>
  );
}
