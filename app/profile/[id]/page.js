// "use client";
// import { useEffect, useState, useContext, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import Navbar from "@/components/Navbar";
// import BottomNavbar from "@/components/BottomNavbar";
// import { supabase } from "@/lib/supabaseClient";
// import { AuthContext } from "@/lib/AuthProvider";

// export default function ProfilePage({ params }) {
//   const { id } = params; // mentor/user id from URL
//   const router = useRouter();
//   const { currentUser } = useContext(AuthContext);

//   const [profile, setProfile] = useState(null);
//   const [answersCount, setAnswersCount] = useState(0);
//   const [loading, setLoading] = useState(true);

//   const fallbackBanner =
//     "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1600&q=80";
//   const fallbackAvatar =
//     "https://via.placeholder.com/160?text=User";

//   const isOwnProfile = useMemo(
//     () => (currentUser?.id ? currentUser.id === id : false),
//     [currentUser?.id, id]
//   );

//   useEffect(() => {
//     let isMounted = true;

//     const fetchData = async () => {
//       setLoading(true);

//       // 1) Fetch user profile
//       const { data: userRow, error: userErr } = await supabase
//         .from("users")
//         .select(
//           "id, name, email, branch, bio, is_mentor, categories, profile_image, background_image"
//         )
//         .eq("id", id)
//         .single();

//       if (userErr) {
//         console.error("Failed to load profile:", userErr.message);
//         if (isMounted) setLoading(false);
//         return;
//       }

//       // 2) Count answers by this mentor/user (author_id)
//       const { count, error: countErr } = await supabase
//         .from("answers")
//         .select("id", { count: "exact", head: true })
//         .eq("author_id", id);

//       if (countErr) {
//         console.error("Failed to count answers:", countErr.message);
//       }

//       if (isMounted) {
//         setProfile(userRow);
//         setAnswersCount(count || 0);
//         setLoading(false);
//       }
//     };

//     fetchData();
//     return () => {
//       isMounted = false;
//     };
//   }, [id]);

//   const askHref = useMemo(() => {
//     const nm = encodeURIComponent(profile?.name || "Mentor");
//     return `/askque?to=${id}&name=${nm}`;
//   }, [id, profile?.name]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white">
//         <Navbar />
//         <div className="max-w-4xl mx-auto px-4 py-24 text-center text-gray-300">
//           Loading profile...
//         </div>
//         <BottomNavbar />
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white">
//         <Navbar />
//         <div className="max-w-4xl mx-auto px-4 py-24 text-center">
//           <p className="text-gray-300">Profile not found.</p>
//         </div>
//         <BottomNavbar />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white">
//       <Navbar />

//       {/* Banner + Avatar */}
//       <div className="w-full max-w-4xl mx-auto relative px-4 pt-4">
//         <div className="h-48 sm:h-56 md:h-64 bg-gray-800 rounded-xl overflow-hidden">
//           <img
//             src={profile.background_image || fallbackBanner}
//             alt="Cover"
//             className="w-full h-full object-cover opacity-90"
//           />
//         </div>

//         {/* Profile image + name/branch */}
//         <div className="absolute -bottom-14 left-8 flex items-center space-x-4">
//           <img
//             src={profile.profile_image || fallbackAvatar}
//             alt={profile.name || "Profile"}
//             className="w-28 h-28 rounded-full border-4 border-gray-950 object-cover"
//           />
//           <div className="mt-16">
//             <h2 className="text-2xl font-semibold">
//               {profile.name || "Unnamed User"}
//             </h2>
//             <p className="text-gray-400">{profile.branch || "Branch not set"}</p>
//           </div>
//         </div>
//       </div>

//       {/* Content Card */}
//       <div className="w-full max-w-4xl mx-auto mt-24 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 sm:p-8">
//         {/* Header row: About + badges */}
//         <div className="flex items-center justify-between mb-6">
//           <h3 className="text-xl font-semibold">About</h3>

//           <div className="flex items-center gap-2">
//             {profile.is_mentor && (
//               <span className="px-4 py-1 text-sm font-medium rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-400/30">
//                 Mentor
//               </span>
//             )}
//             <span className="px-4 py-1 text-sm font-medium rounded-full bg-white/10 text-white/80 border border-white/15">
//               {answersCount} answers
//             </span>
//           </div>
//         </div>

//         {/* Bio */}
//         <p className="text-gray-300 leading-relaxed">
//           {profile.bio?.trim() ? profile.bio : "No bio provided"}
//         </p>

//         {/* Categories */}
//         {Array.isArray(profile.categories) && profile.categories.length > 0 && (
//           <div className="mt-6">
//             <h4 className="text-sm font-semibold text-white/80 mb-3">
//               Categories
//             </h4>
//             <div className="flex flex-wrap gap-2">
//               {profile.categories.map((cat) => (
//                 <span
//                   key={cat}
//                   className="px-3 py-1 rounded-full text-xs bg-white/10 border border-white/15 text-white/80"
//                 >
//                   {cat}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Ask button (hidden if it's your own profile) */}
//         {!isOwnProfile && (
//           <div className="mt-8 flex justify-center">
//             <button
//               onClick={() => router.push(askHref)}
//               className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-2 rounded-full shadow-lg shadow-yellow-400/30 transition-all duration-200"
//             >
//               Ask Question
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Bottom helper text */}
//       <div className="w-full max-w-4xl mx-auto mt-6 text-center">
//         <p className="text-gray-500 text-sm">
//           (Edit options will be available after backend integration)
//         </p>
//       </div>

//       {/* Floating Ask button (hidden if it's your own profile) */}
//       {!isOwnProfile && (
//         <button
//           onClick={() => router.push(askHref)}
//           className="fixed bottom-24 right-6 md:right-10 bg-yellow-400 text-black font-semibold px-5 py-3 rounded-full shadow-lg hover:bg-yellow-500 transition"
//           aria-label="Ask this mentor"
//         >
//           Ask Question
//         </button>
//       )}

//       <BottomNavbar />
//     </div>
//   );
// }








"use client";
import { useEffect, useState, useContext, useMemo } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import BottomNavbar from "@/components/BottomNavbar";
import { supabase } from "@/lib/supabaseClient";
import { AuthContext } from "@/lib/AuthProvider";
import { use } from "react";

export default function ProfilePage({ params }) {
  // const { id } = params; // user id from URL
// const { id } = use(params);
//  const id = params?.id;
  const { id } = use(params);
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [answersCount, setAnswersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fallbackBanner =
    "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1600&q=80";
  const fallbackAvatar = "https://via.placeholder.com/160?text=User";

  const isOwnProfile = useMemo(
    () => (currentUser?.id ? currentUser.id === id : false),
    [currentUser?.id, id]
  );

  useEffect(() => {
    let active = true;
    const run = async () => {
      setLoading(true);

      const { data: userRow, error: userErr } = await supabase
        .from("users")
        .select(
          "id, name, email, branch, bio, is_mentor, categories, profile_image, background_image"
        )
        .eq("id", id)
        .single();

      if (userErr) {
        console.error(userErr.message);
        if (active) setLoading(false);
        return;
      }

      const { count } = await supabase
        .from("answers")
        .select("id", { head: true, count: "exact" })
        .eq("author_id", id);

      if (active) {
        setProfile(userRow);
        setAnswersCount(count || 0);
        setLoading(false);
      }
    };
    run();
    return () => {
      active = false;
    };
  }, [id]);

  const askHref = useMemo(() => {
    const nm = encodeURIComponent(profile?.name || "Mentor");
    return `/askque?to=${id}&name=${nm}`;
  }, [id, profile?.name]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("user_row");
    router.replace("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-24 text-center text-gray-300">
          Loading profile...
        </div>
        <BottomNavbar />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-24 text-center">
          <p className="text-gray-300">Profile not found.</p>
        </div>
        <BottomNavbar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white">
      <Navbar />

      {/* Banner + Avatar */}
      <div className="w-full max-w-4xl mx-auto relative px-4 pt-4">
        <div className="h-48 sm:h-56 md:h-64 bg-gray-800 rounded-xl overflow-hidden">
          <img
            src={profile.background_image || fallbackBanner}
            alt="Cover"
            className="w-full h-full object-cover opacity-90"
          />
        </div>

        <div className="absolute -bottom-14 left-8 flex items-center space-x-4">
          <img
            src={profile.profile_image || fallbackAvatar}
            alt={profile.name || "Profile"}
            className="w-28 h-28 rounded-full border-4 border-gray-950 object-cover"
          />
          <div className="mt-16">
            <h2 className="text-2xl font-semibold">
              {profile.name || "Unnamed User"}
            </h2>
            <p className="text-gray-400">{profile.branch || "Branch not set"}</p>
          </div>
        </div>
      </div>

      {/* Content Card */}
      <div className="w-full max-w-4xl mx-auto mt-24 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">About</h3>

          <div className="flex items-center gap-2">
            {profile.is_mentor && (
              <span className="px-4 py-1 text-sm font-medium rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-400/30">
                Mentor
              </span>
            )}
            <span className="px-4 py-1 text-sm font-medium rounded-full bg-white/10 text-white/80 border border-white/15">
              {answersCount} answers
            </span>

            {/* Own-profile controls */}
            {isOwnProfile && (
              <>
                <button
                  onClick={() => router.push("/profile/edit")}
                  className="ml-2 px-4 py-1 text-sm font-medium rounded-full bg-yellow-400 text-black hover:bg-yellow-500"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="ml-2 px-4 py-1 text-sm font-medium rounded-full bg-white/10 border border-white/20 hover:bg-white/20"
                >
                  Log out
                </button>
              </>
            )}
          </div>
        </div>

        <p className="text-gray-300 leading-relaxed">
          {profile.bio?.trim() ? profile.bio : "No bio provided"}
        </p>

        {Array.isArray(profile.categories) && profile.categories.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-white/80 mb-3">
              Categories
            </h4>
            <div className="flex flex-wrap gap-2">
              {profile.categories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 rounded-full text-xs bg-white/10 border border-white/15 text-white/80"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Ask button — hidden on own profile */}
        {!isOwnProfile && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => router.push(askHref)}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-2 rounded-full shadow-lg shadow-yellow-400/30 transition-all duration-200"
            >
              Ask Question
            </button>
          </div>
        )}
      </div>

      <BottomNavbar />
    </div>
  );
}
