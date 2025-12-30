




// "use client";

// import Link from "next/link";
// import { Home, Users, FileQuestionMark, MessageSquare } from "lucide-react";
// import { useContext } from "react";
// import { AuthContext } from "@/lib/AuthProvider";

// export default function BottomNavbar() {
//   const { currentUser } = useContext(AuthContext);

//   const profileHref = currentUser?.id
//     ? `/profile/${currentUser.id}`
//     : "/login";

//   const profileImage =
//     currentUser?.profile_image || "https://via.placeholder.com/40?text=U";

//   return (
//     <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-700 flex justify-around py-2 text-gray-300">
//       <Link href="/home" className="flex flex-col items-center hover:text-white">
//         <Home size={20} />
//         <span className="text-xs">Home</span>
//       </Link>

//       <Link href="/mentors" className="flex flex-col items-center hover:text-white">
//         <Users size={20} />
//         <span className="text-xs">Mentors</span>
//       </Link>

//       <Link href="/askque" className="flex flex-col items-center hover:text-white">
//         <FileQuestionMark size={20} />
//         <span className="text-xs">Ask</span>
//       </Link>

//       <Link href="/message" className="flex flex-col items-center hover:text-white">
//         <MessageSquare size={20} />
//         <span className="text-xs">Chat</span>
//       </Link>

//       {/* ✅ REAL PROFILE IMAGE */}
//       <Link href={profileHref} className="flex flex-col items-center">
//         <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-600">
//           <img
//             src={profileImage}
//             alt="Profile"
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <span className="text-xs">Me</span>
//       </Link>
//     </nav>
//   );
// }







"use client";

import Link from "next/link";
import { Home, Users, FileQuestionMark, MessageSquare } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "@/lib/AuthProvider";

export default function BottomNavbar() {
  const { currentUser } = useContext(AuthContext);

  const profileHref = currentUser?.id
    ? `/profile/${currentUser.id}`
    : "/login";

  const profileImage =
    currentUser?.profile_image || "https://via.placeholder.com/40?text=U";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-700 flex justify-around py-2 text-gray-300 md:hidden">
      <Link href="/home" className="flex flex-col items-center hover:text-white">
        <Home size={20} />
        <span className="text-xs">Home</span>
      </Link>

      <Link href="/mentors" className="flex flex-col items-center hover:text-white">
        <Users size={20} />
        <span className="text-xs">Mentors</span>
      </Link>

      <Link href="/askque" className="flex flex-col items-center hover:text-white">
        <FileQuestionMark size={20} />
        <span className="text-xs">Ask</span>
      </Link>

      <Link href="/message" className="flex flex-col items-center hover:text-white">
        <MessageSquare size={20} />
        <span className="text-xs">Chat</span>
      </Link> 

      {/* PROFILE */}
      <Link href={profileHref} className="flex flex-col items-center">
        <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-600">
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-xs">Me</span>
      </Link>
    </nav>
  );
}
