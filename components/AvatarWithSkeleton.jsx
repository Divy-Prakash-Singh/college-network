// "use client";
// import { useState } from "react";
// import Image from "next/image";

// export default function AvatarWithSkeleton({ src, size = 28, alt = "avatar" }) {
//   const [loaded, setLoaded] = useState(false);

//   return (
//     <div className="relative" style={{ width: size, height: size }}>
//       {/* Skeleton shimmer */}
//       {!loaded && (
//         <div
//           className="absolute inset-0 rounded-full bg-gray-500/30 animate-pulse"
//         />
//       )}

//       <Image
//         src={src}
//         width={size}
//         height={size}
//         alt={alt}
//         className={`rounded-full object-cover transition-opacity duration-300 ${
//           loaded ? "opacity-100" : "opacity-0"
//         }`}
//         onLoadingComplete={() => setLoaded(true)}
//       />
//     </div>
//   );
// }



"use client";
import { useState } from "react";

export default function AvatarWithSkeleton({ src, size = 28, alt = "avatar" }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="relative inline-block"
      style={{ width: size, height: size }}
    >
      {/* Shimmer while loading */}
      {!loaded && (
        <div className="absolute inset-0 rounded-full bg-gray-500/30 animate-pulse" />
      )}

      {/* ✅ Using plain <img> instead of <Image> */}
      <img
        src={src || "/default-avatar.png"} // fallback to local default image
        alt={alt}
        width={size}
        height={size}
        className={`rounded-full object-cover transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          // if the remote image fails to load, use a local fallback
          e.target.src = "/default-avatar.png";
        }}
      />
    </div>
  );
}
