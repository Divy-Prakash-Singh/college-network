// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
//               app/page.js
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }




// "use client";

// import { useRouter } from "next/navigation";

// export default function HomePage() {
//   const router = useRouter();

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-black text-white">
//       {/* 🌌 Animated Gradient Background */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#7c3aed_0%,_#000_60%)] opacity-70" />
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_#facc15_0%,_#000_55%)] opacity-40" />

//       {/* ✨ Floating Glow Orbs */}
//       <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
//       <div className="absolute top-1/3 -right-32 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-pulse delay-200" />

//       {/* Main Content */}
//       <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
//         <div className="max-w-4xl w-full text-center">
//           {/* 🧠 3D Glass Card */}
//           <div
//             className="relative rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl
//                        shadow-[0_20px_60px_rgba(0,0,0,0.6)]
//                        hover:shadow-[0_30px_80px_rgba(250,204,21,0.25)]
//                        transition-all duration-500"
//           >
//             {/* Inner Glow */}
//             <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

//             <div className="relative p-10 md:p-14">
//               {/* Title */}
//               <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
//                 Mentor <span className="text-yellow-400">QnA</span>
//               </h1>

//               {/* Subtitle */}
//               <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
//                 A college-focused platform where juniors connect with seniors,
//                 mentors guide careers, and real questions get real answers.
//               </p>

//               {/* Features */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
//                 {[
//                   "🎓 Verified College Network",
//                   "🧑‍🏫 Mentor-based Answers",
//                   "🚀 Learn Faster, Together",
//                 ].map((text) => (
//                   <div
//                     key={text}
//                     className="rounded-xl border border-white/15 bg-white/5 px-4 py-3
//                                hover:bg-white/10 transition backdrop-blur"
//                   >
//                     {text}
//                   </div>
//                 ))}
//               </div>

//               {/* Buttons */}
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <button
//                   onClick={() => router.push("/login")}
//                   className="px-8 py-3 rounded-full bg-yellow-400 text-black font-semibold
//                              hover:bg-yellow-500 hover:scale-105
//                              shadow-lg shadow-yellow-400/30 transition-all"
//                 >
//                   Login
//                 </button>

//                 <button
//                   onClick={() => router.push("/signup")}
//                   className="px-8 py-3 rounded-full border border-white/30
//                              hover:bg-white/10 hover:scale-105
//                              transition-all"
//                 >
//                   Sign Up
//                 </button>
//               </div>

//               {/* Footer Credit */}
//               <div className="mt-10 text-sm text-white/50">
//                 Built with ❤️ by{" "}
//                 <span className="text-yellow-400 font-medium">
//                   Divy Prakash Singh
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Bottom Tagline */}
//           <p className="mt-8 text-white/40 text-sm">
//             Ask better questions. Get better direction.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }








"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* 🌌 Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#6d28d9_0%,_#000_55%)] opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_#facc15_0%,_#000_60%)] opacity-40" />

      {/* Glow blobs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-yellow-400/20 rounded-full blur-3xl animate-pulse delay-200" />

      {/* CONTENT */}
      <div className="relative z-10">
        {/* ================= HERO ================= */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-6xl text-center">
            <div className="relative rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.6)] p-10 md:p-16">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                Mentor <span className="text-yellow-400">QnA</span>
              </h1>

              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8">
                A private college networking platform where juniors ask real
                questions, seniors mentor with experience, and clarity replaces confusion.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <button
                  onClick={() => router.push("/login")}
                  className="px-8 py-3 rounded-full bg-yellow-400 text-black font-semibold
                             hover:bg-yellow-500 hover:scale-105 transition shadow-lg shadow-yellow-400/30"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/signup")}
                  className="px-8 py-3 rounded-full border border-white/30
                             hover:bg-white/10 hover:scale-105 transition"
                >
                  Sign Up
                </button>
              </div>

              <p className="text-sm text-white/50">
                Built & designed by <span className="text-yellow-400">Divy Prakash Singh</span>
              </p>
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
              How Mentor QnA Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Ask Questions",
                  desc: "Juniors ask academic, career, placement, or skill-related questions in a trusted college-only environment.",
                },
                {
                  title: "Mentor Answers",
                  desc: "Verified seniors and mentors answer questions based on real experience, not generic internet advice.",
                },
                {
                  title: "Grow Together",
                  desc: "Likes, comments, societies, and categories help the best guidance surface naturally.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="relative rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg p-6
                             hover:-translate-y-2 transition-all duration-300
                             shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                >
                  <h3 className="text-xl font-semibold mb-3 text-yellow-400">
                    {item.title}
                  </h3>
                  <p className="text-white/75">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 3D VIDEO / PREVIEW ================= */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Experience the Platform Visually
              </h2>
              <p className="text-white/75 mb-6">
                Mentor QnA is designed like a modern product — smooth,
                distraction-free, and built for daily student usage.
                Questions, answers, societies, and profiles feel connected.
              </p>
              {/* <p className="text-white/60">
                (You can replace this preview with a real demo video anytime.)
              </p> */}
            </div>

            {/* 3D Video Card */}
            <div className="relative rounded-3xl border border-white/20 bg-black/40 backdrop-blur-xl p-3
                            shadow-[0_30px_80px_rgba(0,0,0,0.6)]
                            hover:rotate-1 hover:scale-[1.02] transition-all">
              <div className="aspect-video rounded-2xl overflow-hidden bg-black">
                {/* Placeholder for demo video */}
                {/* <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-90"
                >
                  <source src="/demo.mp4" type="video/mp4" />
                </video> */}

                <img
  src="/mentor-preview.png"
  alt="Mentor QnA Platform Preview"
  className="w-full h-full object-cover opacity-90"
/>


                {/* Fallback */}
                <div className="absolute inset-0 flex items-center justify-center text-white/40 text-sm">
                  Demo Video Placeholder
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
              Platform Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "🎓 College-only authentication",
                "🧑‍🏫 Mentor-based answering",
                "💬 Comments & likes",
                "🏫 Societies & communities",
                "🧠 Category-based questions",
                "📩 Questions for mentors",
                "🖼 Profile & background images",
                "⚡ Fast & modern UI",
              ].map((feature) => (
                <div
                  key={feature}
                  className="rounded-xl border border-white/15 bg-white/5 backdrop-blur p-4
                             hover:bg-white/10 transition"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-24 px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Built for Students. Powered by Seniors.
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            One right mentor can save months of confusion.
            Mentor QnA exists to make that connection simple.
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => router.push("/signup")}
              className="px-10 py-4 rounded-full bg-yellow-400 text-black font-semibold
                         hover:bg-yellow-500 hover:scale-105 transition shadow-xl shadow-yellow-400/30"
            >
              Get Started
            </button>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="py-8 text-center text-white/40 text-sm">
          © {new Date().getFullYear()} Mentor QnA • Created by Divy Prakash Singh
        </footer>
      </div>
    </div>
  );
}








