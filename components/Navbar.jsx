






// "use client";
// import React, { useContext } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import {
//   Home,
//   Users,
//   Bell,
//   MessageSquare,
//   Search,
//   FileQuestionMark,
// } from "lucide-react";
// import { AuthContext } from "@/lib/AuthProvider";
// import AvatarWithSkeleton from "@/components/AvatarWithSkeleton"; // ✅ import added

// const Navbar = () => {
//   const { currentUser } = useContext(AuthContext);

//   // ✅ define avatarSrc ONCE at top
//   const avatarSrc =
//     currentUser?.profile_image ||
//     "https://via.placeholder.com/40?text=U";

//   const profileHref = currentUser?.id ? `/profile/${currentUser.id}` : "/login";

//   return (
//     <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/15 px-4 py-2 flex justify-between items-center">
//       {/* Left - Logo & Search */}
//       <div className="flex items-center gap-2">
//         <Image
//           src="/network-logo.png"
//           alt="logo"
//           width={30}
//           height={30}
//           className="w-8 h-8"
//         />
//         <div className="hidden md:flex items-center bg-white/10 border border-white/15 px-3 py-1 rounded-md">
//           <Search size={18} className="text-white/70" />
//           <input
//             type="text"
//             placeholder="Search"
//             className="ml-2 bg-transparent outline-none text-sm w-60 placeholder-white/60 text-white"
//           />
//         </div>
//       </div>

//       {/* Desktop Menu */}
//       <div className="hidden md:flex gap-6 text-white/80 text-sm items-center">
//         <Link href="/home" className="flex flex-col items-center hover:text-white">
//           <Home size={20} /> <span>Home</span>
//         </Link>
//         <Link href="/mentors" className="flex flex-col items-center hover:text-white">
//           <Users size={20} /> <span>Mentors</span>
//         </Link>
//         <Link href="/askque" className="flex flex-col items-center hover:text-white">
//           <FileQuestionMark size={20} /> <span>Ask Que</span>
//         </Link>
//         <Link href="/message" className="flex flex-col items-center hover:text-white">
//           <MessageSquare size={20} /> <span>Message</span>
//         </Link>
//         <Link href="/notifications" className="flex flex-col items-center hover:text-white">
//           <Bell size={20} /> <span>Notifications</span>
//         </Link>

//         {/* ✅ ME button with skeleton avatar */}
//         <Link href={profileHref} className="flex flex-col items-center hover:text-white">
//           <AvatarWithSkeleton src={avatarSrc} size={28} />
          
//         </Link>
//       </div>

//       {/* Mobile Menu */}
//       <div className="flex md:hidden items-center gap-3 text-white/80">
//         <Search size={22} />
//         <MessageSquare size={22} />
//         <Link href={profileHref}>
//           <AvatarWithSkeleton src={avatarSrc} size={30} />
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;











// "use client";

// import React, { useContext, useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import {
//   Home,
//   Users,
//   MessageSquare,
//   Search,
//   FileQuestionMark,
// } from "lucide-react";
// import { AuthContext } from "@/lib/AuthProvider";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// export default function Navbar() {
//   const { currentUser } = useContext(AuthContext);
//   const router = useRouter();

//   const profileHref = currentUser?.id
//     ? `/profile/${currentUser.id}`
//     : "/login";

//   /* ---------------- SEARCH STATE ---------------- */
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   /* ---------------- SEARCH EFFECT ---------------- */




//   useEffect(() => {
//   const ensureUserProfile = async () => {
//     const { data: { user } } = await supabase.auth.getUser();
//     if (!user) return;

//     const { data: existing } = await supabase
//       .from("users")
//       .select("id")
//       .eq("id", user.id)
//       .single();

//     if (!existing) {
//       await supabase.from("users").insert({
//         id: user.id,          // MUST equal auth.users.id
//         email: user.email,
//         is_mentor: false,
//       });
//     }
//   };

//   ensureUserProfile();
// }, []); // ✅ RUNS ONCE









//   useEffect(() => {






//     if (!query.trim()) {
//       setResults([]);
//       return;
//     }

//     const timeout = setTimeout(async () => {
//       setLoading(true);

//       const { data, error } = await supabase
//         .from("questions")
//         .select("id, title, category")
//         .or(
//           `title.ilike.%${query}%,question.ilike.%${query}%,category.ilike.%${query}%`
//         )
//         .order("created_at", { ascending: false })
//         .limit(6);

//       if (error) {
//         console.error("Search error:", error);
//         setResults([]);
//       } else {
//         setResults(data || []);
//       }

//       setLoading(false);
//     }, 300);

//     return () => clearTimeout(timeout);
//   }, [query]);

//   return (
//     <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/15 px-4 py-2 flex justify-between items-center">
//       {/* LEFT */}
//       <div className="flex items-center gap-3">
//         <Image
//           src="/network-logo.png"
//           alt="logo"
//           width={30}
//           height={30}
//           priority
//         />

//         {/* SEARCH (DESKTOP ONLY) */}
//         <div className="relative hidden md:block">
//           <div className="flex items-center bg-white/10 border border-white/20 px-3 py-1 rounded-md">
//             <Search size={18} className="text-white/70" />
//             <input
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search questions..."
//               className="ml-2 bg-transparent outline-none text-sm w-64 text-white placeholder-white/60"
//             />
//           </div>

//           {/* SEARCH DROPDOWN */}
//           {query && (
//             <div className="absolute top-10 left-0 w-full bg-gray-900 border border-gray-700 rounded-md shadow-lg max-h-64 overflow-y-auto">
//               {loading && (
//                 <div className="p-3 text-sm text-gray-400">
//                   Searching...
//                 </div>
//               )}

//               {!loading && results.length === 0 && (
//                 <div className="p-3 text-sm text-gray-400">
//                   No results found
//                 </div>
//               )}

//               {results.map((q) => (
//                 <div
//                   key={q.id}
//                   onClick={() => {
//                     setQuery("");
//                     setResults([]);
//                     router.push(`/question/${q.id}`);
//                   }}
//                   className="p-3 cursor-pointer hover:bg-gray-800"
//                 >
//                   <div className="text-sm text-white">{q.title}</div>
//                   <div className="text-xs text-gray-400">
//                     {q.category}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* DESKTOP MENU */}
//       <div className="hidden md:flex gap-6 text-white/80 text-sm items-center">
//         <Link href="/home" className="hover:text-white flex flex-col items-center">
//           <Home size={20} />
//           <span>Home</span>
//         </Link>

//         <Link href="/mentors" className="hover:text-white flex flex-col items-center">
//           <Users size={20} />
//           <span>Mentors</span>
//         </Link>

//         <Link href="/askque" className="hover:text-white flex flex-col items-center">
//           <FileQuestionMark size={20} />
//           <span>Ask</span>
//         </Link>

//         <Link href="/message" className="hover:text-white flex flex-col items-center">
//           <MessageSquare size={20} />
//           <span>Messages</span>
//         </Link>

//         {/* PROFILE IMAGE */}
//         <Link href={profileHref} className="flex flex-col items-center">
//           <div className="w-7 h-7 rounded-full overflow-hidden border border-white/20">
//             <img
//               src={
//                 currentUser?.profile_image ||
//                 "https://via.placeholder.com/40?text=U"
//               }
//               alt="Profile"
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </Link>
//       </div>

//       {/* MOBILE */}
//       <div className="flex md:hidden items-center gap-3 text-white/80">
//         <Search
//           size={22}
//           onClick={() => router.push("/search")}
//           className="cursor-pointer"
//         />

//         <MessageSquare size={22} />

//         <Link href={profileHref}>
//           <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
//             <img
//               src={
//                 currentUser?.profile_image ||
//                 "https://via.placeholder.com/40?text=U"
//               }
//               alt="Profile"
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </Link>
//       </div>
//     </nav>
//   );
// }











// "use client";

// import React, { useContext, useEffect, useState, useRef } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import {
//   Home,
//   Users,
//   MessageSquare,
//   Search,
//   FileQuestionMark,
// } from "lucide-react";
// import { AuthContext } from "@/lib/AuthProvider";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// export default function Navbar() {
//   const { currentUser } = useContext(AuthContext);
//   const router = useRouter();
//   const searchRef = useRef(null);

//   const profileHref = currentUser?.id ? `/profile/${currentUser.id}` : "/login";

//   /* Search State */
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);

//   /* Ensure user profile exists */
//   useEffect(() => {
//     const ensureUserProfile = async () => {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (!user) return;

//       const { data: existing } = await supabase
//         .from("users")
//         .select("id")
//         .eq("id", user.id)
//         .single();

//       if (!existing) {
//         await supabase.from("users").insert({
//           id: user.id,
//           email: user.email,
//           is_mentor: false,
//         });
//       }
//     };

//     ensureUserProfile();
//   }, []);

//   /* Search Effect */
//   useEffect(() => {
//     if (!query.trim()) {
//       setResults([]);
//       setShowDropdown(false);
//       return;
//     }

//     setShowDropdown(true);
//     let mounted = true;

//     const timeout = setTimeout(async () => {
//       setLoading(true);

//       try {
//         const { data, error } = await supabase
//           .from("questions")
//           .select("id, title, category, question")
//           .or(
//             `title.ilike.%${query}%,question.ilike.%${query}%,category.ilike.%${query}%`
//           )
//           .order("created_at", { ascending: false })
//           .limit(8);

//         if (error) {
//           console.error("Search error:", error);
//           if (mounted) {
//             setResults([]);
//             setLoading(false);
//           }
//         } else {
//           if (mounted) {
//             setResults(data || []);
//             setLoading(false);
//           }
//         }
//       } catch (err) {
//         console.error('Search failed:', err);
//         if (mounted) {
//           setResults([]);
//           setLoading(false);
//         }
//       }
//     }, 300);

//     return () => {
//       mounted = false;
//       clearTimeout(timeout);
//     };
//   }, [query]);

//   /* Close dropdown when clicking outside */
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   /* Handle search result click */
//   const handleResultClick = (questionId) => {
//     setQuery("");
//     setResults([]);
//     setShowDropdown(false);
//     router.push(`/question/${questionId}`);
//   };

//   return (
//     <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/15 px-4 py-2 flex justify-between items-center">
//       {/* LEFT */}
//       <div className="flex items-center gap-3">
//         <Link href="/home">
//           <Image
//             src="/network-logo.png"
//             alt="logo"
//             width={30}
//             height={30}
//             priority
//             className="cursor-pointer"
//           />
//         </Link>

//         {/* SEARCH (DESKTOP ONLY) */}
//         <div className="relative hidden md:block" ref={searchRef}>
//           <div className="flex items-center bg-white/10 border border-white/20 px-3 py-1 rounded-md focus-within:border-yellow-400 transition-colors">
//             <Search size={18} className="text-white/70" />
//             <input
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               onFocus={() => query && setShowDropdown(true)}
//               placeholder="Search questions..."
//               className="ml-2 bg-transparent outline-none text-sm w-64 text-white placeholder-white/60"
//             />
//           </div>

//           {/* SEARCH DROPDOWN */}
//           {showDropdown && query && (
//             <div 
//               className="absolute top-full left-0 w-full mt-1 bg-gray-900/95 backdrop-blur-lg border border-gray-700 rounded-lg shadow-2xl max-h-96 overflow-y-auto z-50"
//               style={{ minWidth: '400px' }}
//             >
//               {loading && (
//                 <div className="p-4 text-sm text-gray-400 flex items-center gap-2">
//                   <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
//                   Searching...
//                 </div>
//               )}

//               {!loading && results.length === 0 && (
//                 <div className="p-4 text-sm text-gray-400 text-center">
//                   No questions found matching "{query}"
//                 </div>
//               )}

//               {!loading && results.length > 0 && (
//                 <>
//                   <div className="p-2 text-xs text-gray-500 border-b border-gray-800">
//                     Found {results.length} result{results.length !== 1 ? 's' : ''}
//                   </div>
//                   {results.map((q) => (
//                     <div
//                       key={q.id}
//                       onClick={() => handleResultClick(q.id)}
//                       className="p-4 cursor-pointer hover:bg-gray-800/80 border-b border-gray-800 last:border-b-0 transition-colors"
//                     >
//                       <div className="text-sm text-white font-medium mb-1 line-clamp-1">
//                         {q.title}
//                       </div>
//                       <div className="text-xs text-gray-400 mb-2 line-clamp-2">
//                         {q.question}
//                       </div>
//                       {q.category && (
//                         <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-400 border border-yellow-400/30">
//                           {q.category}
//                         </span>
//                       )}
//                     </div>
//                   ))}
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* DESKTOP MENU */}
//       <div className="hidden md:flex gap-6 text-white/80 text-sm items-center">
//         <Link
//           href="/home"
//           className="hover:text-white flex flex-col items-center transition-colors"
//         >
//           <Home size={20} />
//           <span className="mt-1">Home</span>
//         </Link>

//         <Link
//           href="/mentors"
//           className="hover:text-white flex flex-col items-center transition-colors"
//         >
//           <Users size={20} />
//           <span className="mt-1">Mentors</span>
//         </Link>

//         <Link
//           href="/askque"
//           className="hover:text-white flex flex-col items-center transition-colors"
//         >
//           <FileQuestionMark size={20} />
//           <span className="mt-1">Ask</span>
//         </Link>

//         <Link
//           href="/message"
//           className="hover:text-white flex flex-col items-center transition-colors"
//         >
//           <MessageSquare size={20} />
//           <span className="mt-1">Messages</span>
//         </Link>

//         {/* PROFILE IMAGE */}
//         <Link
//           href={profileHref}
//           className="flex flex-col items-center hover:opacity-80 transition-opacity"
//         >
//           <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/20 hover:border-yellow-400 transition-colors">
//             {currentUser?.profile_image ? (
//               <img
//                 src={currentUser.profile_image}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full bg-white/10 flex items-center justify-center font-bold text-sm">
//                 {(currentUser?.name?.[0] || currentUser?.email?.[0] || "U").toUpperCase()}
//               </div>
//             )}
//           </div>
//         </Link>
//       </div>

//       {/* MOBILE */}
//       <div className="flex md:hidden items-center gap-4 text-white/80">
//         <Search
//           size={22}
//           onClick={() => router.push("/search")}
//           className="cursor-pointer hover:text-white transition-colors"
//         />

//         <MessageSquare 
//           size={22} 
//           onClick={() => router.push("/message")}
//           className="cursor-pointer hover:text-white transition-colors"
//         />

//         <Link href={profileHref}>
//           <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/20">
//             {currentUser?.profile_image ? (
//               <img
//                 src={currentUser.profile_image}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full bg-white/10 flex items-center justify-center font-bold text-sm">
//                 {(currentUser?.name?.[0] || currentUser?.email?.[0] || "U").toUpperCase()}
//               </div>
//             )}
//           </div>
//         </Link>
//       </div>
//     </nav>
//   );
// }



















"use client";

import React, { useContext, useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  Users,
  MessageSquare,
  Search,
  FileQuestionMark,
} from "lucide-react";
import { AuthContext } from "@/lib/AuthProvider";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  const searchRef = useRef(null);

  const profileHref = currentUser?.id ? `/profile/${currentUser.id}` : "/login";

  /* Search State */
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  /* Ensure user profile exists */
  useEffect(() => {
    const ensureUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: existing } = await supabase
        .from("users")
        .select("id")
        .eq("id", user.id)
        .single();

      if (!existing) {
        await supabase.from("users").insert({
          id: user.id,
          email: user.email,
          is_mentor: false,
        });
      }
    };

    ensureUserProfile();
  }, []);

  /* Search Effect */
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setShowDropdown(true);
    let mounted = true;

    const timeout = setTimeout(async () => {
      setLoading(true);

      try {
        const { data, error } = await supabase
          .from("questions")
          .select("id, title, category, question")
          .or(
            `title.ilike.%${query}%,question.ilike.%${query}%,category.ilike.%${query}%`
          )
          .order("created_at", { ascending: false })
          .limit(8);

        if (error) {
          console.error("Search error:", error);
          if (mounted) {
            setResults([]);
            setLoading(false);
          }
        } else {
          if (mounted) {
            setResults(data || []);
            setLoading(false);
          }
        }
      } catch (err) {
        console.error('Search failed:', err);
        if (mounted) {
          setResults([]);
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      mounted = false;
      clearTimeout(timeout);
    };
  }, [query]);

  /* Close dropdown when clicking outside */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* Handle search result click */
  const handleResultClick = (questionId) => {
    setQuery("");
    setResults([]);
    setShowDropdown(false);
    router.push(`/question/${questionId}`);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/15 px-4 py-2 flex justify-between items-center">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <Link href="/home">
          <Image
            src="/network-logo.png"
            alt="logo"
            width={30}
            height={30}
            priority
            className="cursor-pointer"
          />
        </Link>

        {/* SEARCH (DESKTOP ONLY) */}
        <div className="relative hidden md:block" ref={searchRef}>
          <div className="flex items-center bg-white/10 border border-white/20 px-3 py-1 rounded-md focus-within:border-yellow-400 transition-colors">
            <Search size={18} className="text-white/70" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query && setShowDropdown(true)}
              placeholder="Search questions..."
              className="ml-2 bg-transparent outline-none text-sm w-64 text-white placeholder-white/60"
            />
          </div>

          {/* SEARCH DROPDOWN */}
          {showDropdown && query && (
            <div 
              className="absolute top-full left-0 w-full mt-1 bg-gray-900/95 backdrop-blur-lg border border-gray-700 rounded-lg shadow-2xl max-h-96 overflow-y-auto z-50"
              style={{ minWidth: '400px' }}
            >
              {loading && (
                <div className="p-4 text-sm text-gray-400 flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                  Searching...
                </div>
              )}

              {!loading && results.length === 0 && (
                <div className="p-4 text-sm text-gray-400 text-center">
                  No questions found matching "{query}"
                </div>
              )}

              {!loading && results.length > 0 && (
                <>
                  <div className="p-2 text-xs text-gray-500 border-b border-gray-800">
                    Found {results.length} result{results.length !== 1 ? 's' : ''}
                  </div>
                  {results.map((q) => (
                    <div
                      key={q.id}
                      onClick={() => handleResultClick(q.id)}
                      className="p-4 cursor-pointer hover:bg-gray-800/80 border-b border-gray-800 last:border-b-0 transition-colors"
                    >
                      <div className="text-sm text-white font-medium mb-1 line-clamp-1">
                        {q.title}
                      </div>
                      <div className="text-xs text-gray-400 mb-2 line-clamp-2">
                        {q.question}
                      </div>
                      {q.category && (
                        <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-400 border border-yellow-400/30">
                          {q.category}
                        </span>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex gap-6 text-white/80 text-sm items-center">
        <Link
          href="/home"
          className="hover:text-white flex flex-col items-center transition-colors"
        >
          <Home size={20} />
          <span className="mt-1">Home</span>
        </Link>

        <Link
          href="/mentors"
          className="hover:text-white flex flex-col items-center transition-colors"
        >
          <Users size={20} />
          <span className="mt-1">Mentors</span>
        </Link>

        <Link
          href="/askque"
          className="hover:text-white flex flex-col items-center transition-colors"
        >
          <FileQuestionMark size={20} />
          <span className="mt-1">Ask</span>
        </Link>

        <Link
          href="/message"
          className="hover:text-white flex flex-col items-center transition-colors"
        >
          <MessageSquare size={20} />
          <span className="mt-1">Messages</span>
        </Link>

        {/* PROFILE IMAGE */}
        <Link
          href={profileHref}
          className="flex flex-col items-center hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/20 hover:border-yellow-400 transition-colors">
            {currentUser?.profile_image ? (
              <img
                src={currentUser.profile_image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-white/10 flex items-center justify-center font-bold text-sm">
                {(currentUser?.name?.[0] || currentUser?.email?.[0] || "U").toUpperCase()}
              </div>
            )}
          </div>
        </Link>
      </div>

      {/* MOBILE - REMOVED MessageSquare */}
      <div className="flex md:hidden items-center gap-4 text-white/80">
        <Search
          size={22}
          onClick={() => router.push("/search")}
          className="cursor-pointer hover:text-white transition-colors"
        />

        <Link href={profileHref}>
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/20">
            {currentUser?.profile_image ? (
              <img
                src={currentUser.profile_image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-white/10 flex items-center justify-center font-bold text-sm">
                {(currentUser?.name?.[0] || currentUser?.email?.[0] || "U").toUpperCase()}
              </div>
            )}
          </div>
        </Link>
      </div>
    </nav>
  );
}