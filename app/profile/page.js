// 'use client'
// import React, { useState } from "react";

// const ProfilePage = () => {
//   const [userData, setUserData] = useState({
//     backgroundImage:
//       "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1200&q=80",
//     profileImage: "https://randomuser.me/api/portraits/women/45.jpg",
//     name: "Divy Prakash Singh",
//     branch: "Computer Science Engineering",
//     bio: "Passionate about technology, teaching, and helping others grow.",
//     isMentor: true,
//   });

//   return (
//     <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-10">
//       {/* Background Banner */}
//       <div className="w-full max-w-4xl relative">
//         <div className="h-48 sm:h-56 md:h-64 bg-gray-800 rounded-xl overflow-hidden">
//           <img
//             src={userData.backgroundImage}
//             alt="Cover"
//             className="w-full h-full object-cover opacity-90"
//           />
//         </div>

//         {/* Profile Image */}
//         <div className="absolute -bottom-14 left-8 flex items-center space-x-4">
//           <img
//             src={userData.profileImage}
//             alt="Profile"
//             className="w-28 h-28 rounded-full border-4 border-gray-950 object-cover"
//           />
//           <div className="mt-16">
//             <h2 className="text-2xl font-semibold">{userData.name}</h2>
//             <p className="text-gray-400">{userData.branch}</p>
//           </div>
//         </div>
//       </div>

//       {/* Profile Content */}
//       <div className="w-full max-w-4xl mt-24 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 sm:p-8">
//         <div className="flex items-center justify-between mb-6">
//           <h3 className="text-xl font-semibold">About</h3>

//           {userData.isMentor && (
//             <span className="px-4 py-1 text-sm font-medium rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-400/30">
//               Mentor
//             </span>
//           )}
//         </div>

//         <p className="text-gray-300 leading-relaxed">{userData.bio}</p>
//       </div>

//       {/* Future: Add editable fields */}
//       <div className="w-full max-w-4xl mt-6 text-center">
//         <p className="text-gray-500 text-sm">
//           (Edit options will be available after backend integration)
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;








// 'use client';
// import BottomNavbar from "@/components/BottomNavbar";
// import Navbar from "@/components/Navbar";
// import React, { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";

// const ProfilePage = () => {
//   const params = useSearchParams();
//   const router = useRouter();
//   const userId = params.get("userId"); // mentor id we want to view

//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // fetch target profile
//   useEffect(() => {
//     const fetchProfile = async () => {
//       setLoading(true);
//       let query = supabase
//         .from("users")
//         .select("id, name, branch, bio, is_mentor, profile_image, background_image, categories")
//         .limit(1);

//       if (userId) {
//         query = query.eq("id", userId);
//       } else {
//         // fallback: use local user if no userId given (optional)
//         const local = JSON.parse(localStorage.getItem("user_row") || "null");
//         if (local?.id) query = query.eq("id", local.id);
//       }

//       const { data, error } = await query.single();
//       if (!error) setUserData(data);
//       setLoading(false);
//     };

//     fetchProfile();
//   }, [userId]);

//   const handleAskQuestion = () => {
//     if (!userData?.id) return;
//     // choose a category to prefill (first one or fallback)
//     const defaultCat = Array.isArray(userData.categories) && userData.categories.length > 0
//       ? userData.categories[0]
//       : "Technology";
//     router.push(`/ask?mentorId=${userData.id}&category=${encodeURIComponent(defaultCat)}`);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white">
//         <Navbar />
//         <div className="flex items-center justify-center py-20">Loading...</div>
//         <BottomNavbar />
//       </div>
//     );
//   }

//   if (!userData) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white">
//         <Navbar />
//         <div className="flex items-center justify-center py-20">User not found.</div>
//         <BottomNavbar />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white">
//       <Navbar />

//       <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white flex flex-col items-center">
//         {/* Background Banner */}
//         <div className="w-full max-w-4xl relative">
//           <div className="h-48 sm:h-56 md:h-64 bg-gray-800 rounded-xl overflow-hidden">
//             <img
//               src={userData.background_image ||
// "https://via.placeholder.com/1200x400?text=Background"
// }
//               alt="Cover"
//               className="w-full h-full object-cover opacity-90"
//             />
//           </div>

//           {/* Profile Image */}
//           <div className="absolute -bottom-14 left-8 flex items-center space-x-4">
//             <img
//               src={userData.profile_image || "https://via.placeholder.com/160?text=User"}

//               alt="Profile"
//               className="w-28 h-28 rounded-full border-4 border-gray-950 object-cover"
//             />
//             <div className="mt-16">
//               <h2 className="text-2xl font-semibold">{userData.name}</h2>
//               <p className="text-gray-400">{userData.branch || "Branch"}</p>
//             </div>
//           </div>
//         </div>

//         {/* Profile Content */}
//         <div className="w-full max-w-4xl mt-24 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 sm:p-8">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-xl font-semibold">About</h3>
//             {userData.is_mentor && (
//               <span className="px-4 py-1 text-sm font-medium rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-400/30">
//                 Mentor
//               </span>
//             )}
//           </div>

//           <p className="text-gray-300 leading-relaxed">{userData.bio || "No bio added yet."}</p>

//           {/* Ask Question Button */}
//           <div className="mt-8 flex justify-center">
//             <button
//               onClick={handleAskQuestion}
//               className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-2 rounded-full shadow-lg shadow-yellow-400/30 transition-all duration-200"
//             >
//               Ask Question
//             </button>
//           </div>
//         </div>

//         <div className="w-full max-w-4xl mt-6 text-center">
//           <p className="text-gray-500 text-sm">
//             (Edit options will be available after backend integration)
//           </p>
//         </div>

//         <BottomNavbar />
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;













// 'use client';

// import BottomNavbar from "@/components/BottomNavbar";
// import Navbar from "@/components/Navbar";
// import React, { useEffect, useState, useContext, useMemo } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";
// import { AuthContext } from "@/lib/AuthProvider";

// const ProfilePage = () => {
//   const params = useSearchParams();
//   const router = useRouter();
//   const { currentUser } = useContext(AuthContext);

//   const userId = params.get("userId"); // profile being viewed

//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ check if this is my own profile
//   const isOwnProfile = useMemo(() => {
//     if (!currentUser) return false;
//     if (!userId) return true; // no param → my profile
//     return currentUser.id === userId;
//   }, [currentUser, userId]);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       setLoading(true);

//       let idToFetch = userId;

//       // fallback → own profile
//       if (!idToFetch && currentUser?.id) {
//         idToFetch = currentUser.id;
//       }

//       if (!idToFetch) {
//         setLoading(false);
//         return;
//       }

//       const { data, error } = await supabase
//         .from("users")
//         .select("id, name, branch, bio, is_mentor, profile_image, background_image, categories")
//         .eq("id", idToFetch)
//         .single();

//       if (!error) setUserData(data);
//       setLoading(false);
//     };

//     fetchProfile();
//   }, [userId, currentUser?.id]);

//   const handleAskQuestion = () => {
//     if (!userData?.id) return;
//     const defaultCat =
//       Array.isArray(userData.categories) && userData.categories.length > 0
//         ? userData.categories[0]
//         : "Technology";

//     router.push(`/ask?mentorId=${userData.id}&category=${encodeURIComponent(defaultCat)}`);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white">
//         <Navbar />
//         <div className="flex items-center justify-center py-20">Loading...</div>
//         <BottomNavbar />
//       </div>
//     );
//   }

//   if (!userData) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white">
//         <Navbar />
//         <div className="flex items-center justify-center py-20">User not found.</div>
//         <BottomNavbar />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white">
//       <Navbar />

//       <div className="flex flex-col items-center">
//         {/* Banner */}
//         <div className="w-full max-w-4xl relative">
//           <div className="h-48 sm:h-56 md:h-64 bg-gray-800 rounded-xl overflow-hidden">
//             <img
//               src={
//                 userData.background_image ||
//                 "https://via.placeholder.com/1200x400?text=Background"
//               }
//               className="w-full h-full object-cover opacity-90"
//             />
//           </div>

//           {/* Avatar */}
//           <div className="absolute -bottom-14 left-8 flex items-center space-x-4">
//             <img
//               src={
//                 userData.profile_image ||
//                 "https://via.placeholder.com/160?text=User"
//               }
//               className="w-28 h-28 rounded-full border-4 border-gray-950 object-cover"
//             />
//             <div className="mt-16">
//               <h2 className="text-2xl font-semibold">{userData.name}</h2>
//               <p className="text-gray-400">{userData.branch || "Branch"}</p>
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="w-full max-w-4xl mt-24 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 sm:p-8">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-xl font-semibold">About</h3>

//             <div className="flex items-center gap-2">
//               {userData.is_mentor && (
//                 <span className="px-4 py-1 text-sm rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-400/30">
//                   Mentor
//                 </span>
//               )}

//               {/* ✅ EDIT BUTTON (OWN PROFILE ONLY) */}
//               {isOwnProfile && (
//                 <button
//                   onClick={() => router.push("/profile/edit")}
//                   className="px-4 py-1 text-sm rounded-full bg-yellow-400 text-black hover:bg-yellow-500"
//                 >
//                   Edit Profile
//                 </button>
//               )}
//             </div>
//           </div>

//           <p className="text-gray-300 leading-relaxed">
//             {userData.bio || "No bio added yet."}
//           </p>

//           {/* ✅ CATEGORIES */}
//           {Array.isArray(userData.categories) && userData.categories.length > 0 && (
//             <div className="mt-6">
//               <h4 className="text-sm font-semibold mb-2 text-white/80">
//                 Categories
//               </h4>
//               <div className="flex flex-wrap gap-2">
//                 {userData.categories.map((cat) => (
//                   <span
//                     key={cat}
//                     className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/20"
//                   >
//                     {cat}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* ASK BUTTON (ONLY FOR OTHERS) */}
//           {!isOwnProfile && (
//             <div className="mt-8 flex justify-center">
//               <button
//                 onClick={handleAskQuestion}
//                 className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-2 rounded-full shadow-lg shadow-yellow-400/30"
//               >
//                 Ask Question
//               </button>
//             </div>
//           )}
//         </div>

//         <BottomNavbar />
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;














// // this is profile/page.js

// 'use client';

// import BottomNavbar from "@/components/BottomNavbar";
// import Navbar from "@/components/Navbar";
// import React, { useEffect, useState, useContext, useMemo } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";
// import { AuthContext } from "@/lib/AuthProvider";

// const ProfilePage = () => {
//   const params = useSearchParams();
//   const router = useRouter();
//   const { currentUser } = useContext(AuthContext);

//   const userId = params.get("userId"); // profile being viewed

//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ check if this is my own profile
//   const isOwnProfile = useMemo(() => {
//     if (!currentUser) return false;
//     if (!userId) return true;
//     return currentUser.id === userId;
//   }, [currentUser, userId]);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       setLoading(true);

//       let idToFetch = userId;
//       if (!idToFetch && currentUser?.id) idToFetch = currentUser.id;
//       if (!idToFetch) {
//         setLoading(false);
//         return;
//       }

//       const { data, error } = await supabase
//         .from("users")
//         .select("id, name, branch, bio, is_mentor, profile_image, background_image, categories")
//         .eq("id", idToFetch)
//         .single();

//       if (!error) setUserData(data);
//       setLoading(false);
//     };

//     fetchProfile();
//   }, [userId, currentUser?.id]);

//   // ✅ LOGOUT HANDLER (added)
//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     router.replace("/login");
//   };

//   const handleAskQuestion = () => {
//     if (!userData?.id) return;
//     const defaultCat =
//       Array.isArray(userData.categories) && userData.categories.length > 0
//         ? userData.categories[0]
//         : "Technology";

//     router.push(`/ask?mentorId=${userData.id}&category=${encodeURIComponent(defaultCat)}`);
//   };

 
  

//   useEffect(() => {
//     if (authLoading) return;
//     if (!currentUser) router.replace("/login");
//   }, [authLoading, currentUser]);
  
//   if (authLoading) return null;

  

//   if (!userData) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white">
//         <Navbar />
//         <div className="flex items-center justify-center py-20">User not found.</div>
//         <BottomNavbar />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white">
//       <Navbar />

//       <div className="flex flex-col items-center">
//         {/* Banner */}
//         <div className="w-full max-w-4xl relative">
//           <div className="h-48 sm:h-56 md:h-64 bg-gray-800 rounded-xl overflow-hidden">
//             <img
//               src={
//                 userData.background_image ||
//                 "https://via.placeholder.com/1200x400?text=Background"
//               }
//               className="w-full h-full object-cover opacity-90"
//             />
//           </div>

//           {/* Avatar */}
//           <div className="absolute -bottom-14 left-8 flex items-center space-x-4">
//             <img
//               src={
//                 userData.profile_image ||
//                 "https://via.placeholder.com/160?text=User"
//               }
//               className="w-28 h-28 rounded-full border-4 border-gray-950 object-cover"
//             />
//             <div className="mt-16">
//               <h2 className="text-2xl font-semibold">{userData.name}</h2>
//               <p className="text-gray-400">{userData.branch || "Branch"}</p>
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="w-full max-w-4xl mt-24 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 sm:p-8">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-xl font-semibold">About</h3>

//             <div className="flex items-center gap-2">
//               {userData.is_mentor && (
//                 <span className="px-4 py-1 text-sm rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-400/30">
//                   Mentor
//                 </span>
//               )}

//               {/* ✅ EDIT + LOGOUT (OWN PROFILE ONLY) */}
//               {isOwnProfile && (
//                 <>
//                   <button
//                     onClick={() => router.push("/profile/edit")}
//                     className="px-4 py-1 text-sm rounded-full bg-yellow-400 text-black hover:bg-yellow-500"
//                   >
//                     Edit Profile
//                   </button>

//                   <button
//                     onClick={handleLogout}
//                     className="px-4 py-1 text-sm rounded-full bg-white/10 border border-white/20 hover:bg-white/20"
//                   >
//                     Logout
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>

//           <p className="text-gray-300 leading-relaxed">
//             {userData.bio || "No bio added yet."}
//           </p>

//           {/* Categories */}
//           {Array.isArray(userData.categories) && userData.categories.length > 0 && (
//             <div className="mt-6">
//               <h4 className="text-sm font-semibold mb-2 text-white/80">
//                 Categories
//               </h4>
//               <div className="flex flex-wrap gap-2">
//                 {userData.categories.map((cat) => (
//                   <span
//                     key={cat}
//                     className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/20"
//                   >
//                     {cat}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Ask Button */}
//           {!isOwnProfile && (
//             <div className="mt-8 flex justify-center">
//               <button
//                 onClick={handleAskQuestion}
//                 className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-2 rounded-full shadow-lg shadow-yellow-400/30"
//               >
//                 Ask Question
//               </button>
//             </div>
//           )}
//         </div>

//         <BottomNavbar />
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;














// 'use client'

// import BottomNavbar from "@/components/BottomNavbar";
// import Navbar from "@/components/Navbar";
// import React, { useEffect, useState, useContext, useMemo } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";
// import { AuthContext } from "@/lib/AuthProvider";

// const ProfilePage = () => {
//   const params = useSearchParams();
//   const router = useRouter();

//   // ✅ FIX: destructure authLoading properly
//   const { currentUser, loading: authLoading } = useContext(AuthContext);

//   const userId = params.get("userId");

//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ check if this is my own profile
//   const isOwnProfile = useMemo(() => {
//     if (!currentUser) return false;
//     if (!userId) return true;
//     return currentUser.id === userId;
//   }, [currentUser, userId]);

//   // 🔐 AUTH REDIRECT (NO BLOCKING)
//   useEffect(() => {
//     if (!authLoading && !currentUser) {
//       router.replace("/login");
//     }
//   }, [authLoading, currentUser, router]);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       setLoading(true);

//       let idToFetch = userId;
//       if (!idToFetch && currentUser?.id) idToFetch = currentUser.id;

//       if (!idToFetch) {
//         setLoading(false);
//         return;
//       }

//       const { data, error } = await supabase
//         .from("users")
//         .select(
//           "id, name, branch, bio, is_mentor, profile_image, background_image, categories"
//         )
//         .eq("id", idToFetch)
//         .single();

//       if (!error) setUserData(data);
//       setLoading(false);
//     };

//     fetchProfile();
//   }, [userId, currentUser?.id]);

//   // ✅ LOGOUT
//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     router.replace("/login");
//   };

//   const handleAskQuestion = () => {
//     if (!userData?.id) return;
//     const defaultCat =
//       Array.isArray(userData.categories) && userData.categories.length > 0
//         ? userData.categories[0]
//         : "Technology";

//     router.push(
//       `/ask?mentorId=${userData.id}&category=${encodeURIComponent(defaultCat)}`
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white flex items-center justify-center">
//         Loading profile...
//       </div>
//     );
//   }

//   if (!userData) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white">
//         <Navbar />
//         <div className="flex items-center justify-center py-20">
//           User not found.
//         </div>
//         <BottomNavbar />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white">
//       <Navbar />

//       <div className="flex flex-col items-center">
//         {/* Banner */}
//         <div className="w-full max-w-4xl relative">
//           <div className="h-48 sm:h-56 md:h-64 bg-gray-800 rounded-xl overflow-hidden">
//             <img
//               src={
//                 userData.background_image ||
//                 "https://via.placeholder.com/1200x400?text=Background"
//               }
//               className="w-full h-full object-cover opacity-90"
//             />
//           </div>

//           {/* Avatar */}
//           <div className="absolute -bottom-14 left-8 flex items-center space-x-4">
//             <img
//               src={
//                 userData.profile_image ||
//                 "https://via.placeholder.com/160?text=User"
//               }
//               className="w-28 h-28 rounded-full border-4 border-gray-950 object-cover"
//             />
//             <div className="mt-16">
//               <h2 className="text-2xl font-semibold">{userData.name}</h2>
//               <p className="text-gray-400">
//                 {userData.branch || "Branch"}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="w-full max-w-4xl mt-24 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 sm:p-8">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-xl font-semibold">About</h3>

//             <div className="flex items-center gap-2">
//               {userData.is_mentor && (
//                 <span className="px-4 py-1 text-sm rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-400/30">
//                   Mentor
//                 </span>
//               )}

//               {isOwnProfile && (
//                 <>
//                   <button
//                     onClick={() => router.push("/profile/edit")}
//                     className="px-4 py-1 text-sm rounded-full bg-yellow-400 text-black hover:bg-yellow-500"
//                   >
//                     Edit Profile
//                   </button>

//                   <button
//                     onClick={handleLogout}
//                     className="px-4 py-1 text-sm rounded-full bg-white/10 border border-white/20 hover:bg-white/20"
//                   >
//                     Logout
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>

//           <p className="text-gray-300 leading-relaxed">
//             {userData.bio || "No bio added yet."}
//           </p>

//           {Array.isArray(userData.categories) &&
//             userData.categories.length > 0 && (
//               <div className="mt-6">
//                 <h4 className="text-sm font-semibold mb-2 text-white/80">
//                   Categories
//                 </h4>
//                 <div className="flex flex-wrap gap-2">
//                   {userData.categories.map((cat) => (
//                     <span
//                       key={cat}
//                       className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/20"
//                     >
//                       {cat}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//           {!isOwnProfile && (
//             <div className="mt-8 flex justify-center">
//               <button
//                 onClick={handleAskQuestion}
//                 className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-2 rounded-full shadow-lg shadow-yellow-400/30"
//               >
//                 Ask Question
//               </button>
//             </div>
//           )}
//         </div>

//         <BottomNavbar />
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;














import { Suspense } from "react";
import ProfileClient from "./ProfileClient";

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileClient />
    </Suspense>
  );
}

function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white flex items-center justify-center">
      Loading profile...
    </div>
  );
}
