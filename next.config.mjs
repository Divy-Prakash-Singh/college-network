// // /** @type {import('next').NextConfig} */
// // const nextConfig = {};

// // export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ['randomuser.me'], // ✅ allow this image domain
//   },
// };

// export default nextConfig;






// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: [
//       'randomuser.me',
//       'via.placeholder.com',
//       'images.unsplash.com',
//       'https://pixtkuaacmypdoagxvtt.supabase.co', // 🔁 replace with YOUR Supabase project id
//     ],
//   },
// };

// export default nextConfig;








/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
