

// 'use client'
// import React, { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { inspirationalQuotes } from "@/Assets/assets";

// export default function SignUpPage() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [isFading, setIsFading] = useState(false);

//   // Form states
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({ email: "", password: "" });

//   const goToSlide = (index) => {
//     setIsFading(true);
//     setTimeout(() => {
//       setCurrentSlide(index);
//       setIsFading(false);
//     }, 200);
//   };

//   const handleNext = () => {
//     const nextIndex = (currentSlide + 1) % inspirationalQuotes.length;
//     goToSlide(nextIndex);
//   };

//   const handlePrev = () => {
//     const prevIndex = (currentSlide - 1 + inspirationalQuotes.length) % inspirationalQuotes.length;
//     goToSlide(prevIndex);
//   };

//   useEffect(() => {
//     if (isPaused) return;
//     const intervalId = setInterval(() => {
//       handleNext();
//     }, 4500);
//     return () => clearInterval(intervalId);
//   }, [isPaused, currentSlide]);

//   useEffect(() => {
//     const onKeyDown = (e) => {
//       if (e.key === 'ArrowRight') handleNext();
//       if (e.key === 'ArrowLeft') handlePrev();
//     };
//     window.addEventListener('keydown', onKeyDown);
//     return () => window.removeEventListener('keydown', onKeyDown);
//   }, [currentSlide]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let valid = true;
//     let newErrors = { email: "", password: "" };

//     if (!email.endsWith("@nitkkr.ac.in")) {
//       newErrors.email = "Email must be your college email (@nitkkr.ac.in)";
//       valid = false;
//     }

//     if (password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters long";
//       valid = false;
//     }

//     setErrors(newErrors);

//     if (valid) {
//       console.log("Form submitted", { email, password });
//       // You can handle API call or redirect here
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black flex items-stretch justify-center px-4 py-8 md:px-8">
//       <div className="flex w-full max-w-7xl mx-auto gap-6 md:gap-10 flex-col md:flex-row">
        
//         {/* Left Section */}
//         <div className="w-full md:w-1/2 text-white flex flex-col justify-center">
//           <div className="max-w-xl mx-auto w-full">
//             <div className="mb-6 flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-black font-extrabold shadow-lg">
//                 B
//               </div>
//               <span className="text-white/70">College Network</span>
//             </div>

//             <h2 className="text-2xl md:text-3xl font-semibold mb-3">Get inspired and keep going</h2>
//             <p className="text-white/70 mb-6">A few words from thinkers and builders to nudge you forward.</p>

//             {/* Quote Carousel */}
//             <div
//               className="relative mb-12 max-w-2xl"
//               onMouseEnter={() => setIsPaused(true)}
//               onMouseLeave={() => setIsPaused(false)}
//             >
//               <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/15 shadow-2xl">
//                 <div className={`transition-all duration-500 ${isFading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}`}>
//                   <div className="flex items-center justify-center mb-6">
//                     <img
//                       src={inspirationalQuotes[currentSlide].image}
//                       alt={inspirationalQuotes[currentSlide].author}
//                       className="w-16 h-16 rounded-full object-cover border-2 border-white/30 shadow-md"
//                     />
//                   </div>
//                   <blockquote className="text-2xl md:text-3xl font-light italic mb-4 text-center leading-snug">
//                     “{inspirationalQuotes[currentSlide].quote}”
//                   </blockquote>
//                   <cite className="block text-center text-yellow-400 font-semibold text-lg">
//                     — {inspirationalQuotes[currentSlide].author}
//                   </cite>
//                 </div>
//               </div>

//               <button
//                 aria-label="Previous quote"
//                 onClick={handlePrev}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition duration-300 border border-white/15"
//               >
//                 <ChevronLeft className="w-5 h-5" />
//               </button>
//               <button
//                 aria-label="Next quote"
//                 onClick={handleNext}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition duration-300 border border-white/15"
//               >
//                 <ChevronRight className="w-5 h-5" />
//               </button>

//               {/* Dots Indicator */}
//               <div className="flex justify-center gap-2 mt-6">
//                 {inspirationalQuotes.map((_, index) => (
//                   <button
//                     key={index}
//                     aria-label={`Go to quote ${index + 1}`}
//                     onClick={() => goToSlide(index)}
//                     className={`h-2.5 rounded-full transition-all duration-300 ${
//                       index === currentSlide ? 'bg-yellow-400 w-6' : 'bg-white/30 w-2.5'
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="w-full md:w-1/2 flex justify-center items-center">
//           <div className="w-full max-w-md p-8 bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md text-white">
//             <h2 className="text-2xl font-bold mb-2">Create your account</h2>
//             <p className="text-white/70 text-sm mb-6">Start your journey in minutes.</p>
            
//             <form className="space-y-4" onSubmit={handleSubmit}>
              
//               {/* Full Name */}
//               <input
//                 type="text"
//                 placeholder="Full name"
//                 className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-transparent"
//               />

//               {/* Branch */}
//               <input
//                 type="text"
//                 placeholder="Branch (optional)"
//                 className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-transparent"
//               />

//               {/* Email Note */}
//               <p className="text-sm text-yellow-400">* Please enter your college email ID (@nitkkr.ac.in)</p>
              
//               {/* Email */}
//               <input
//                 type="email"
//                 placeholder="College Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-transparent"
//               />
//               {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}

//               {/* Password */}
//               <input
//                 type="password"
//                 placeholder="Password (min 8 characters)"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-transparent"
//               />
//               {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}


//  {/* <select
//   value={role}
//   onChange={(e) => setRole(e.target.value)}
//   className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-transparent"
// >
//   <option value="" disabled>Select your role</option>
//   <option value="mentor">I want to be a Mentor</option>
//   <option value="mentee">I don’t want to be a Mentor</option>
// </select> */}
//               <button
//                 type="submit"
//                 className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg transition"
//               >
//                 Sign Up
//               </button>
//             </form>

//             <p className="text-center mt-4 text-sm text-white/80">
//               Already have an account? <a href="#" className="text-yellow-400 hover:underline">Log in</a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







// "use client";
// import React, { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { inspirationalQuotes } from "@/Assets/assets";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// export default function SignUpPage() {
// const [currentSlide, setCurrentSlide] = useState(0);
// const [isPaused, setIsPaused] = useState(false);
// const [isFading, setIsFading] = useState(false);
// const [form, setForm] = useState({
// name: "",
// branch: "",
// email: "",
// password: "",
// is_mentor: false,
// categories: [],
// });
// const [errors, setErrors] = useState({});
// const [loading, setLoading] = useState(false);
// const router = useRouter();

// const goToSlide = (index) => {
// setIsFading(true);
// setTimeout(() => {
// setCurrentSlide(index);
// setIsFading(false);
// }, 200);
// };

// const handleNext = () =>
// goToSlide((currentSlide + 1) % inspirationalQuotes.length);
// const handlePrev = () =>
// goToSlide((currentSlide - 1 + inspirationalQuotes.length) % inspirationalQuotes.length);

// useEffect(() => {
// if (isPaused) return;
// const interval = setInterval(handleNext, 4500);
// return () => clearInterval(interval);
// }, [isPaused, currentSlide]);

// const handleSubmit = async (e) => {
// e.preventDefault();
// let valid = true;
// const newErrors = {};


// if (!form.email.endsWith("@nitkkr.ac.in")) {
//   newErrors.email = "Use college email (@nitkkr.ac.in)";
//   valid = false;
// }
// if (form.password.length < 8) {
//   newErrors.password = "Password must be 8+ characters";
//   valid = false;
// }

// setErrors(newErrors);
// if (!valid) return;

// setLoading(true);
// try {
//   const { data, error } = await supabase
//     .from("users")
//     .insert([{
//       name: form.name,
//       branch: form.branch,
//       email: form.email,
//       is_mentor: form.is_mentor,
//       categories: form.categories,
//     }])
//     .select();

//   if (error) throw error;
//   localStorage.setItem("user", JSON.stringify(data[0]));
//   router.push("/home");
// } catch (err) {
//   alert("Error: " + err.message);
// } finally {
//   setLoading(false);
// }


// };

// const handleCheckbox = (cat) =>
// setForm((prev) => ({
// ...prev,
// categories: prev.categories.includes(cat)
// ? prev.categories.filter((c) => c !== cat)
// : [...prev.categories, cat],
// }));

// return ( <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black flex items-center justify-center px-6 py-8"> <div className="flex flex-col md:flex-row gap-10 w-full max-w-7xl">
// {/* LEFT */} <div className="w-full md:w-1/2 text-white flex flex-col justify-center"> <div className="max-w-lg"> <h2 className="text-2xl font-bold mb-2">Get Inspired</h2> <p className="text-white/70 mb-4">Words from thinkers and doers</p>
// <div
// className="bg-white/10 rounded-xl p-6 relative"
// onMouseEnter={() => setIsPaused(true)}
// onMouseLeave={() => setIsPaused(false)}
// >
// <blockquote className={`transition-all duration-500 ${isFading ? "opacity-0" : "opacity-100"}`}> <p className="text-lg italic">
// “{inspirationalQuotes[currentSlide].quote}” </p> <cite className="block mt-3 text-yellow-400">
// — {inspirationalQuotes[currentSlide].author} </cite> </blockquote> <button onClick={handlePrev} className="absolute left-2 top-1/2"> <ChevronLeft /> </button> <button onClick={handleNext} className="absolute right-2 top-1/2"> <ChevronRight /> </button> </div> </div> </div>

// ```
//     {/* RIGHT */}
//     <div className="w-full md:w-1/2 bg-white/5 border border-white/10 rounded-2xl p-8 text-white backdrop-blur-md">
//       <h2 className="text-2xl font-bold mb-4">Create your account</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input type="text" placeholder="Full name" value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           className="w-full bg-white/10 border border-white/20 rounded-lg p-3" required />
//         <input type="text" placeholder="Branch"
//           value={form.branch}
//           onChange={(e) => setForm({ ...form, branch: e.target.value })}
//           className="w-full bg-white/10 border border-white/20 rounded-lg p-3" />
//         <input type="email" placeholder="College Email"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//           className="w-full bg-white/10 border border-white/20 rounded-lg p-3" required />
//         {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
//         <input type="password" placeholder="Password"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//           className="w-full bg-white/10 border border-white/20 rounded-lg p-3" required />
//         {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}

//         <label className="flex items-center gap-2">
//           <input type="checkbox"
//             checked={form.is_mentor}
//             onChange={(e) => setForm({ ...form, is_mentor: e.target.checked })} />
//           I want to be a mentor
//         </label>

//         {form.is_mentor && (
//           <div className="space-y-2">
//             {["Technology", "Startup", "Finance", "Career"].map((cat) => (
//               <label key={cat} className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={form.categories.includes(cat)}
//                   onChange={() => handleCheckbox(cat)} />
//                 {cat}
//               </label>
//             ))}
//           </div>
//         )}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-yellow-400 text-black p-3 rounded-lg mt-4 font-semibold">
//           {loading ? "Creating..." : "Sign Up"}
//         </button>
//       </form>
//     </div>
//   </div>
// </div>

// );
// }













// "use client";
// import React, { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { inspirationalQuotes } from "@/Assets/assets";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// export default function SignUpPage() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [isFading, setIsFading] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     branch: "",
//     email: "",
//     password: "",
//     is_mentor: false,
//     categories: [],
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const goToSlide = (index) => {
//     setIsFading(true);
//     setTimeout(() => {
//       setCurrentSlide(index);
//       setIsFading(false);
//     }, 200);
//   };

//   const handleNext = () =>
//     goToSlide((currentSlide + 1) % inspirationalQuotes.length);
//   const handlePrev = () =>
//     goToSlide((currentSlide - 1 + inspirationalQuotes.length) % inspirationalQuotes.length);

//   useEffect(() => {
//     if (isPaused) return;
//     const interval = setInterval(handleNext, 4500);
//     return () => clearInterval(interval);
//   }, [isPaused, currentSlide]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let valid = true;
//     const newErrors = {};

//     if (!form.email.endsWith("@nitkkr.ac.in")) {
//       newErrors.email = "Use college email (@nitkkr.ac.in)";
//       valid = false;
//     }
//     if (form.password.length < 8) {
//       newErrors.password = "Password must be 8+ characters";
//       valid = false;
//     }

//     setErrors(newErrors);
//     if (!valid) return;

//     setLoading(true);
//     try {
//       // Step 1: Try signup in Supabase Auth
//       let { data, error } = await supabase.auth.signUp({
//         email: form.email,
//         password: form.password,
//       });

//       // Step 2: If duplicate error, try login
//       if (error && error.message.includes("duplicate key")) {
//         const { data: loginData, error: loginError } =
//           await supabase.auth.signInWithPassword({
//             email: form.email,
//             password: form.password,
//           });

//         if (loginError) throw loginError;
//         data = loginData;
//       } else if (error) {
//         throw error;
//       }

//       const user = data?.user;
//       if (!user) throw new Error("No user returned");

//       // Step 3: Insert extra profile data into "users" table
//       const { error: insertError } = await supabase.from("users").upsert(
//         {
//           id: user.id, // link Supabase Auth user.id
//           name: form.name,
//           branch: form.branch,
//           email: form.email,
//           is_mentor: form.is_mentor,
//           categories: form.categories,
//         },
//         { onConflict: "id" } // avoid duplicate rows
//       );

//       if (insertError) throw insertError;

//       // Save user locally
//       localStorage.setItem("user", JSON.stringify(user));
//       router.push("/home");
//     } catch (err) {
//       alert("Error: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCheckbox = (cat) =>
//     setForm((prev) => ({
//       ...prev,
//       categories: prev.categories.includes(cat)
//         ? prev.categories.filter((c) => c !== cat)
//         : [...prev.categories, cat],
//     }));

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black flex items-center justify-center px-6 py-8">
//       <div className="flex flex-col md:flex-row gap-10 w-full max-w-7xl">
//         {/* LEFT */}
//         <div className="w-full md:w-1/2 text-white flex flex-col justify-center">
//           <div className="max-w-lg">
//             <h2 className="text-2xl font-bold mb-2">Get Inspired</h2>
//             <p className="text-white/70 mb-4">Words from thinkers and doers</p>
//             <div
//               className="bg-white/10 rounded-xl p-6 relative"
//               onMouseEnter={() => setIsPaused(true)}
//               onMouseLeave={() => setIsPaused(false)}
//             >
//               <blockquote
//                 className={`transition-all duration-500 ${
//                   isFading ? "opacity-0" : "opacity-100"
//                 }`}
//               >
//                 <p className="text-lg italic">
//                   “{inspirationalQuotes[currentSlide].quote}”
//                 </p>
//                 <cite className="block mt-3 text-yellow-400">
//                   — {inspirationalQuotes[currentSlide].author}
//                 </cite>
//               </blockquote>
//               <button onClick={handlePrev} className="absolute left-2 top-1/2">
//                 <ChevronLeft />
//               </button>
//               <button onClick={handleNext} className="absolute right-2 top-1/2">
//                 <ChevronRight />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="w-full md:w-1/2 bg-white/5 border border-white/10 rounded-2xl p-8 text-white backdrop-blur-md">
//           <h2 className="text-2xl font-bold mb-4">Create your account</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               placeholder="Full name"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               className="w-full bg-white/10 border border-white/20 rounded-lg p-3"
//               required
//             />
//             <input
//               type="text"
//               placeholder="Branch"
//               value={form.branch}
//               onChange={(e) => setForm({ ...form, branch: e.target.value })}
//               className="w-full bg-white/10 border border-white/20 rounded-lg p-3"
//             />
//             <input
//               type="email"
//               placeholder="College Email"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               className="w-full bg-white/10 border border-white/20 rounded-lg p-3"
//               required
//             />
//             {errors.email && (
//               <p className="text-red-400 text-sm">{errors.email}</p>
//             )}
//             <input
//               type="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               className="w-full bg-white/10 border border-white/20 rounded-lg p-3"
//               required
//             />
//             {errors.password && (
//               <p className="text-red-400 text-sm">{errors.password}</p>
//             )}

//             <label className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={form.is_mentor}
//                 onChange={(e) =>
//                   setForm({ ...form, is_mentor: e.target.checked })
//                 }
//               />
//               I want to be a mentor
//             </label>

//             {form.is_mentor && (
//               <div className="space-y-2">
//                 {["Technology", "Startup", "Finance", "Career"].map((cat) => (
//                   <label key={cat} className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       checked={form.categories.includes(cat)}
//                       onChange={() => handleCheckbox(cat)}
//                     />
//                     {cat}
//                   </label>
//                 ))}
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-yellow-400 text-black p-3 rounded-lg mt-4 font-semibold"
//             >
//               {loading ? "Creating..." : "Sign Up"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }









// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
// import { inspirationalQuotes } from "@/Assets/assets";
// import { useRouter } from "next/navigation";

// /**
//  * CATEGORIES — confirmed by you
//  */
// const CATEGORIES = [
//   "Technology",
//   "Startup",
//   "Finance",
//   "GATE",
//   "UPSC",
//   "Acting",
//   "AI/ML",
//   "Photography",
//   "Robotics",
//   "Web Development",
//   "DSA",
//   "Art",
// ];

// export default function SignUpPage() {
//   const router = useRouter();

//   // ----- Carousel (left panel) -----
//   const [slide, setSlide] = useState(0);
//   const [paused, setPaused] = useState(false);
//   useEffect(() => {
//     if (paused) return;
//     const timer = setInterval(() => {
//       setSlide((s) => (s + 1) % inspirationalQuotes.length);
//     }, 4500);
//     return () => clearInterval(timer);
//   }, [paused]);

//   // ----- Steps -----
//   // 1 = enter email → send OTP
//   // 2 = enter OTP → verify
//   // 3 = complete profile + set password
//   // 4 = success
//   const [step, setStep] = useState(1);

//   // ----- Step 1: email -----
//   const [email, setEmail] = useState("");
//   const [sending, setSending] = useState(false);
//   const [emailError, setEmailError] = useState("");

//   // resend OTP timer
//   const [cooldown, setCooldown] = useState(0);
//   useEffect(() => {
//     if (cooldown <= 0) return;
//     const t = setInterval(() => setCooldown((c) => c - 1), 1000);
//     return () => clearInterval(t);
//   }, [cooldown]);

//   // ----- Step 2: otp -----
//   const [otp, setOtp] = useState("");
//   const [verifying, setVerifying] = useState(false);
//   const [otpError, setOtpError] = useState("");

//   // ----- Step 3: profile + password -----
//   const [name, setName] = useState("");
//   const [branch, setBranch] = useState("");
//   const [isMentor, setIsMentor] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [password, setPassword] = useState("");
//   const [password2, setPassword2] = useState("");
//   const [profileSaving, setProfileSaving] = useState(false);
//   const [profileError, setProfileError] = useState("");

//   const passwordValid = useMemo(() => {
//     // 8+ chars, at least 1 uppercase, at least 1 number
//     return (
//       password.length >= 8 &&
//       /[A-Z]/.test(password) &&
//       /[0-9]/.test(password)
//     );
//   }, [password]);

//   const toggleCategory = (cat) => {
//     setCategories((prev) =>
//       prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
//     );
//   };

//   // ---------- ACTIONS ----------
//   const sendOtp = async () => {
//     setEmailError("");

//     // domain check
//     if (!email.endsWith("@nitkkr.ac.in")) {
//       setEmailError("Please use your college email (@nitkkr.ac.in).");
//       return;
//     }

//     setSending(true);
//     try {
//       // Send OTP to email; allows creating user if not exists
//       const { error } = await supabase.auth.signInWithOtp({
//         email,
//         options: {
//           shouldCreateUser: true, // auto create user in auth if not present
//           emailRedirectTo:
//             typeof window !== "undefined"
//               ? `${window.location.origin}/signup` // stays on this page
//               : undefined,
//         },
//       });
//       if (error) throw error;

//       // move to OTP step + start cooldown
//       setStep(2);
//       setCooldown(30);
//     } catch (e) {
//       setEmailError(e.message || "Failed to send OTP.");
//     } finally {
//       setSending(false);
//     }
//   };

//   const verifyOtp = async () => {
//     setOtpError("");
//     if (!otp || otp.length < 6) {
//       setOtpError("Enter the 6-digit OTP sent to your email.");
//       return;
//     }
//     setVerifying(true);
//     try {
//       const { data, error } = await supabase.auth.verifyOtp({
//         email,
//         token: otp,
//         type: "email", // Supabase email OTP
//       });
//       if (error) throw error;

//       // success → go to profile step
//       setStep(3);
//     } catch (e) {
//       setOtpError(e.message || "Invalid OTP, please try again.");
//     } finally {
//       setVerifying(false);
//     }
//   };

//   const saveProfileAndPassword = async () => {
//     setProfileError("");

//     if (!name.trim()) {
//       setProfileError("Please enter your full name.");
//       return;
//     }
//     if (!passwordValid) {
//       setProfileError(
//         "Password must be 8+ characters with at least 1 uppercase and 1 number."
//       );
//       return;
//     }
//     if (password !== password2) {
//       setProfileError("Passwords do not match.");
//       return;
//     }

//     setProfileSaving(true);
//     try {
//       // must have a valid session now
//       const {
//         data: { session },
//         error: sessionErr,
//       } = await supabase.auth.getSession();
//       if (sessionErr || !session?.user) {
//         throw new Error("No session found. Please verify OTP again.");
//       }

//       const user = session.user;

//       // 1) Set password in Supabase auth
//       const { error: upErr } = await supabase.auth.updateUser({
//         password,
//       });
//       if (upErr) throw upErr;

//       // 2) Upsert into your `users` table
//       const { error: insertErr } = await supabase
//         .from("users")
//         .upsert(
//           {
//             id: user.id, // auth user id as PK
//             email: user.email,
//             name,
//             branch,
//             is_mentor: isMentor,
//             categories,
//           },
//           { onConflict: "id" }
//         );
//       if (insertErr) throw insertErr;

//       // 3) Success → step 4
//       setStep(4);
//     } catch (e) {
//       setProfileError(e.message || "Failed to save your profile.");
//     } finally {
//       setProfileSaving(false);
//     }
//   };

//   const resendOtp = async () => {
//     if (cooldown > 0) return;
//     await sendOtp();
//   };

//   // ---------- UI ----------
//   return (
//     <div className="min-h-screen w-full bg-gradient-to-b from-purple-900 via-black to-black text-white">
//       <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10 items-center md:items-stretch">

//         {/* LEFT — Quotes (fullscreen-friendly) */}
//         <div
//           className="w-full md:w-1/2 flex flex-col justify-center"
//           onMouseEnter={() => setPaused(true)}
//           onMouseLeave={() => setPaused(false)}
//         >
//           <div className="mb-6 flex items-center gap-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-black font-extrabold shadow-lg">
//               B
//             </div>
//             <span className="text-white/70">College Network</span>
//           </div>

//           <h2 className="text-3xl md:text-4xl font-semibold mb-3">
//             Get inspired and keep going
//           </h2>
//           <p className="text-white/70 mb-6">
//             A few words from thinkers and builders to nudge you forward.
//           </p>

//           <div className="relative">
//             <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/15 shadow-2xl">
//               <div className="transition-all duration-500">
//                 <div className="flex items-center justify-center mb-6">
//                   <img
//                     src={inspirationalQuotes[slide].image}
//                     alt={inspirationalQuotes[slide].author}
//                     className="w-16 h-16 rounded-full object-cover border-2 border-white/30 shadow-md"
//                   />
//                 </div>
//                 <blockquote className="text-2xl md:text-3xl font-light italic mb-4 text-center leading-snug">
//                   “{inspirationalQuotes[slide].quote}”
//                 </blockquote>
//                 <cite className="block text-center text-yellow-400 font-semibold text-lg">
//                   — {inspirationalQuotes[slide].author}
//                 </cite>
//               </div>
//             </div>

//             <button
//               aria-label="Previous quote"
//               onClick={() =>
//                 setSlide((s) =>
//                   (s - 1 + inspirationalQuotes.length) %
//                   inspirationalQuotes.length
//                 )
//               }
//               className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition duration-300 border border-white/15"
//             >
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//             <button
//               aria-label="Next quote"
//               onClick={() =>
//                 setSlide((s) => (s + 1) % inspirationalQuotes.length)
//               }
//               className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition duration-300 border border-white/15"
//             >
//               <ChevronRight className="w-5 h-5" />
//             </button>

//             <div className="flex justify-center gap-2 mt-6">
//               {inspirationalQuotes.map((_, i) => (
//                 <button
//                   key={i}
//                   aria-label={`Go to quote ${i + 1}`}
//                   onClick={() => setSlide(i)}
//                   className={`h-2.5 rounded-full transition-all duration-300 ${
//                     i === slide ? "bg-yellow-400 w-6" : "bg-white/30 w-2.5"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* RIGHT — Steps content (fullscreen style inside column) */}
//         <div className="w-full md:w-1/2">

//           {/* STEP 1 — Enter Email */}
//           {step === 1 && (
//             <div className="w-full p-0 text-white">
//               <h2 className="text-3xl font-bold mb-2">Create your account</h2>
//               <p className="text-white/70 text-sm mb-6">
//                 Use your college email to receive a 6-digit OTP.
//               </p>

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm text-white/70 mb-1">
//                     College Email
//                   </label>
//                   <input
//                     type="email"
//                     placeholder="yourid@nitkkr.ac.in"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400/60"
//                   />
//                   {emailError && (
//                     <p className="text-red-400 text-sm mt-2">{emailError}</p>
//                   )}
//                 </div>

//                 <button
//                   onClick={sendOtp}
//                   disabled={sending}
//                   className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg transition flex items-center justify-center gap-2"
//                 >
//                   {sending && (
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                   )}
//                   {sending ? "Sending OTP..." : "Send OTP"}
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* STEP 2 — Verify OTP */}
//           {step === 2 && (
//             <div className="w-full p-0 text-white">
//               <h2 className="text-3xl font-bold mb-2">Verify your email</h2>
//               <p className="text-white/70 text-sm mb-6">
//                 Enter the 6-digit OTP sent to <span className="text-yellow-300">{email}</span>
//               </p>

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm text-white/70 mb-1">
//                     6-digit OTP
//                   </label>
//                   <input
//                     type="text"
//                     inputMode="numeric"
//                     maxLength={6}
//                     placeholder="------"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
//                     className="w-full tracking-[0.5em] text-center text-xl bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-yellow-400/60"
//                   />
//                   {otpError && (
//                     <p className="text-red-400 text-sm mt-2">{otpError}</p>
//                   )}
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <button
//                     onClick={() => setStep(1)}
//                     className="text-white/70 hover:text-white text-sm"
//                   >
//                     ← Change email
//                   </button>

//                   <button
//                     onClick={resendOtp}
//                     disabled={cooldown > 0}
//                     className={`text-sm ${
//                       cooldown > 0
//                         ? "text-white/40 cursor-not-allowed"
//                         : "text-yellow-300 hover:text-yellow-200"
//                     }`}
//                   >
//                     {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend OTP"}
//                   </button>
//                 </div>

//                 <button
//                   onClick={verifyOtp}
//                   disabled={verifying || otp.length < 6}
//                   className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg transition flex items-center justify-center gap-2"
//                 >
//                   {verifying && <Loader2 className="h-4 w-4 animate-spin" />}
//                   {verifying ? "Verifying..." : "Verify & Continue"}
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* STEP 3 — Complete Profile + Set Password */}
//           {step === 3 && (
//             <div className="w-full p-0 text-white">
//               <h2 className="text-3xl font-bold mb-2">Complete your profile</h2>
//               <p className="text-white/70 text-sm mb-6">
//                 Tell us a bit about you and set your password.
//               </p>

//               <div className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm text-white/70 mb-1">
//                       Full Name
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Your name"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400/60"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm text-white/70 mb-1">
//                       Branch
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="e.g., CSE, ECE"
//                       value={branch}
//                       onChange={(e) => setBranch(e.target.value)}
//                       className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400/60"
//                     />
//                   </div>
//                 </div>

//                 <label className="flex items-center gap-2 mt-2">
//                   <input
//                     type="checkbox"
//                     checked={isMentor}
//                     onChange={(e) => setIsMentor(e.target.checked)}
//                   />
//                   I want to be a mentor
//                 </label>

//                 <div className="mt-3">
//                   <h3 className="text-sm font-semibold mb-2">
//                     Select your interests / categories
//                   </h3>
//                   <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                     {CATEGORIES.map((cat) => (
//                       <label
//                         key={cat}
//                         className={`flex items-center gap-2 px-3 py-2 rounded-md border ${
//                           categories.includes(cat)
//                             ? "bg-yellow-400/20 border-yellow-400/40"
//                             : "bg-white/5 border-white/10"
//                         }`}
//                       >
//                         <input
//                           type="checkbox"
//                           checked={categories.includes(cat)}
//                           onChange={() => toggleCategory(cat)}
//                         />
//                         <span className="text-sm">{cat}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
//                   <div>
//                     <label className="block text-sm text-white/70 mb-1">
//                       Set Password
//                     </label>
//                     <input
//                       type="password"
//                       placeholder="At least 8 chars"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400/60"
//                     />
//                     <p className="text-xs text-white/50 mt-1">
//                       Must include an uppercase letter and a number.
//                     </p>
//                   </div>
//                   <div>
//                     <label className="block text-sm text-white/70 mb-1">
//                       Confirm Password
//                     </label>
//                     <input
//                       type="password"
//                       placeholder="Re-enter password"
//                       value={password2}
//                       onChange={(e) => setPassword2(e.target.value)}
//                       className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400/60"
//                     />
//                   </div>
//                 </div>

//                 {profileError && (
//                   <p className="text-red-400 text-sm">{profileError}</p>
//                 )}

//                 <div className="flex items-center justify-between pt-2">
//                   <button
//                     onClick={() => setStep(2)}
//                     className="text-white/70 hover:text-white text-sm"
//                   >
//                     ← Back
//                   </button>

//                   <button
//                     onClick={saveProfileAndPassword}
//                     disabled={profileSaving}
//                     className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg transition flex items-center justify-center gap-2"
//                   >
//                     {profileSaving && (
//                       <Loader2 className="h-4 w-4 animate-spin" />
//                     )}
//                     {profileSaving ? "Saving..." : "Save & Continue"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* STEP 4 — Success */}
//           {step === 4 && (
//             <div className="w-full p-0 text-white">
//               <h2 className="text-3xl font-bold mb-2">You're all set 🎉</h2>
//               <p className="text-white/70 text-sm mb-6">
//                 Your email is verified and your profile is saved.
//               </p>
//               <button
//                 onClick={() => router.push("/home")}
//                 className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg transition"
//               >
//                 Go to Home
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }














// // app/signup/page.js
// "use client";

// import React, { useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
// import { inspirationalQuotes } from "@/Assets/assets";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// const CATEGORIES = [
//   "Technology",
//   "Startup",
//   "Finance",
//   "GATE",
//   "UPSC",
//   "Acting",
//   "AI/ML",
//   "Photography",
//   "Robotics",
//   "Web Development",
//   "DSA",
//   "Art",
// ];

// export default function SignUpPage() {
//   const router = useRouter();

//   // Quotes carousel
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [isFading, setIsFading] = useState(false);

//   const goToSlide = (index) => {
//     setIsFading(true);
//     setTimeout(() => {
//       setCurrentSlide(index);
//       setIsFading(false);
//     }, 200);
//   };
//   const handleNext = () =>
//     goToSlide((currentSlide + 1) % inspirationalQuotes.length);
//   const handlePrev = () =>
//     goToSlide(
//       (currentSlide - 1 + inspirationalQuotes.length) %
//         inspirationalQuotes.length
//     );

//   useEffect(() => {
//     if (isPaused) return;
//     const interval = setInterval(handleNext, 4500);
//     return () => clearInterval(interval);
//   }, [isPaused, currentSlide]);

//   // Form
//   const [form, setForm] = useState({
//     name: "",
//     branch: "",
//     email: "",
//     password: "",
//     is_mentor: false,
//     categories: [],
//   });
//   const [errors, setErrors] = useState({ email: "", password: "", name: "" });
//   const [loading, setLoading] = useState(false);
//   const [serverMsg, setServerMsg] = useState("");

//   const toggleCategory = (cat) => {
//     setForm((prev) => ({
//       ...prev,
//       categories: prev.categories.includes(cat)
//         ? prev.categories.filter((c) => c !== cat)
//         : [...prev.categories, cat],
//     }));
//   };

//   const handleSubmit = async (e) => {

//     e.preventDefault();
//     setServerMsg("");
//     let valid = true;
//     const newErrors = { email: "", password: "", name: "" };

//     if (!form.name.trim()) {
//       newErrors.name = "Full name is required";
//       valid = false;
//     }
//     if (!form.email.endsWith("@nitkkr.ac.in")) {
//       newErrors.email = "Use your college email (@nitkkr.ac.in)";
//       valid = false;
//     }
//     if (form.password.length < 8) {
//       newErrors.password = "Password must be 8+ characters";
//       valid = false;
//     }

//     setErrors(newErrors);
//     if (!valid) return;

//     setLoading(true);
//     try {
//       // 1) Create auth user (email + password)
//       const { data: signUpData, error: signUpError } =
//         await supabase.auth.signUp({
//           email: form.email,
//           password: form.password,
//           options: {
//             data: { full_name: form.name },
//           },
//         });

        
// console.log("SIGNUP ERROR RAW =", signUpError);  // <--- ADD THIS
//       // If user already exists, try login so we can proceed
//       let authUser = signUpData?.user || null;
//       if (signUpError?.message?.toLowerCase().includes("already registered")) {
//         const { data: signInData, error: signInError } =
//           await supabase.auth.signInWithPassword({
//             email: form.email,
//             password: form.password,
//           });
//         if (signInError) throw signInError;
//         authUser = signInData.user;
//       } else if (signUpError) {
//         throw signUpError;
//       }

//       if (!authUser) throw new Error("Auth failed. Please try again.");

//       // 2) Upsert into your `users` table
//       const { error: upsertError } = await supabase.from("users").upsert(
//         {
//           id: authUser.id, // use auth UID as PK
//           email: form.email,
//           name: form.name,
//           branch: form.branch,
//           is_mentor: form.is_mentor,
//           categories: form.categories,
//         },
//         { onConflict: "id" }
//       );
//       if (upsertError) throw upsertError;

//       // Optional: cache minimal user locally
//       localStorage.setItem(
//         "user",
//         JSON.stringify({
//           id: authUser.id,
//           email: form.email,
//           name: form.name,
//           is_mentor: form.is_mentor,
//           categories: form.categories,
//         })
//       );

//       router.push("/home");
//     } catch (err) {
//       setServerMsg(err.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black flex items-center justify-center px-6 py-8">
//       <div className="flex flex-col md:flex-row gap-10 w-full max-w-7xl">
//         {/* LEFT Section — Quotes */}
//         <div className="w-full md:w-1/2 text-white flex flex-col justify-center">
//           <div className="max-w-lg">
//             <div className="mb-6 flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-black font-extrabold shadow-lg">
//                 B
//               </div>
//               <span className="text-white/70">College Network</span>
//             </div>

//             <h2 className="text-2xl font-bold mb-2">Get inspired and keep going</h2>
//             <p className="text-white/70 mb-4">
//               A few words from thinkers and builders to nudge you forward.
//             </p>

//             <div
//               className="bg-white/10 rounded-2xl p-6 relative border border-white/15 shadow-2xl"
//               onMouseEnter={() => setIsPaused(true)}
//               onMouseLeave={() => setIsPaused(false)}
//             >
//               <div
//                 className={`transition-all duration-500 ${
//                   isFading ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
//                 }`}
//               >
//                 <div className="flex items-center justify-center mb-6">
//                   <img
//                     src={inspirationalQuotes[currentSlide].image}
//                     alt={inspirationalQuotes[currentSlide].author}
//                     className="w-16 h-16 rounded-full object-cover border-2 border-white/30 shadow-md"
//                   />
//                 </div>
//                 <blockquote className="text-2xl md:text-3xl font-light italic mb-4 text-center leading-snug">
//                   “{inspirationalQuotes[currentSlide].quote}”
//                 </blockquote>
//                 <cite className="block text-center text-yellow-400 font-semibold text-lg">
//                   — {inspirationalQuotes[currentSlide].author}
//                 </cite>
//               </div>

//               <button
//                 aria-label="Previous quote"
//                 onClick={handlePrev}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition duration-300 border border-white/15"
//               >
//                 <ChevronLeft className="w-5 h-5" />
//               </button>
//               <button
//                 aria-label="Next quote"
//                 onClick={handleNext}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition duration-300 border border-white/15"
//               >
//                 <ChevronRight className="w-5 h-5" />
//               </button>

//               <div className="flex justify-center gap-2 mt-6">
//                 {inspirationalQuotes.map((_, index) => (
//                   <button
//                     key={index}
//                     aria-label={`Go to quote ${index + 1}`}
//                     onClick={() => goToSlide(index)}
//                     className={`h-2.5 rounded-full transition-all duration-300 ${
//                       index === currentSlide ? "bg-yellow-400 w-6" : "bg-white/30 w-2.5"
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT Section — Signup Form */}
//         <div className="w-full md:w-1/2 bg-white/5 border border-white/10 rounded-2xl p-8 text-white backdrop-blur-md">
//           <h2 className="text-2xl font-bold mb-4">Create your account</h2>
//           <p className="text-white/70 text-sm mb-4">
//             Use your college email (@nitkkr.ac.in)
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Full Name */}
//             <div>
//               <input
//                 type="text"
//                 placeholder="Full name"
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3"
//                 required
//               />
//               {errors.name && (
//                 <p className="text-red-400 text-sm mt-1">{errors.name}</p>
//               )}
//             </div>

//             {/* Branch */}
//             <input
//               type="text"
//               placeholder="Branch (optional)"
//               value={form.branch}
//               onChange={(e) => setForm({ ...form, branch: e.target.value })}
//               className="w-full bg-white/10 border border-white/20 rounded-lg p-3"
//             />

//             {/* Email */}
//             <input
//               type="email"
//               placeholder="College Email"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               className="w-full bg-white/10 border border-white/20 rounded-lg p-3"
//               required
//             />
//             {errors.email && (
//               <p className="text-red-400 text-sm">{errors.email}</p>
//             )}

//             {/* Password */}
//             <input
//               type="password"
//               placeholder="Password (min 8 characters)"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               className="w-full bg-white/10 border border-white/20 rounded-lg p-3"
//               required
//             />
//             {errors.password && (
//               <p className="text-red-400 text-sm">{errors.password}</p>
//             )}

//             {/* Mentor Checkbox */}
//             <label className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={form.is_mentor}
//                 onChange={(e) =>
//                   setForm({ ...form, is_mentor: e.target.checked })
//                 }
//               />
//               I want to be a mentor
//             </label>

//             {/* Categories (available for everyone; mentors should pick their topics) */}
//             <div className="space-y-2">
//               <h3 className="text-sm font-semibold mb-2">
//                 Select categories of interest
//               </h3>
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                 {CATEGORIES.map((cat) => (
//                   <label
//                     key={cat}
//                     className={`flex items-center gap-2 px-3 py-2 rounded-md border ${
//                       form.categories.includes(cat)
//                         ? "bg-yellow-400/20 border-yellow-400/40"
//                         : "bg-white/5 border-white/10"
//                     }`}
//                   >
//                     <input
//                       type="checkbox"
//                       checked={form.categories.includes(cat)}
//                       onChange={() => toggleCategory(cat)}
//                     />
//                     <span className="text-sm">{cat}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg transition flex items-center justify-center gap-2"
//             >
//               {loading && <Loader2 className="h-4 w-4 animate-spin" />}
//               {loading ? "Creating..." : "Sign Up"}
//             </button>
//           </form>

//           {serverMsg && (
//             <p className="text-yellow-300 text-sm mt-4 text-center">
//               {serverMsg}
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }















// "use client";

// import React, { useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
// import { inspirationalQuotes } from "@/Assets/assets";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// const CATEGORIES = [
//   "Technology", "Startup", "Finance", "GATE", "UPSC", "Acting",
//   "AI/ML", "Photography", "Robotics", "Web Development", "DSA", "Art"
// ];

// export default function SignUpPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({
//     name: "",
//     branch: "",
//     email: "",
//     password: "",
//     is_mentor: false,
//     categories: [],
//   });
//   const [loading, setLoading] = useState(false);
//   const [serverMsg, setServerMsg] = useState("");

//   const toggleCategory = (cat) => {
//     setForm((prev) => ({
//       ...prev,
//       categories: prev.categories.includes(cat)
//         ? prev.categories.filter((c) => c !== cat)
//         : [...prev.categories, cat],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setServerMsg("");

//     try {
//       // 1️⃣ Validate
//       if (!form.name.trim())
//         throw new Error("Full name is required");
//       if (!form.email.endsWith("@nitkkr.ac.in"))
//         throw new Error("Use your college email (@nitkkr.ac.in)");
//       if (form.password.length < 8)
//         throw new Error("Password must be 8+ characters");

//       // 2️⃣ Try signup
//       const { data, error } = await supabase.auth.signUp({
//         email: form.email,
//         password: form.password,
//         options: {
//           data: {
//             full_name: form.name,
//             branch: form.branch,
//             is_mentor: form.is_mentor,
//             categories: form.categories,
//           },
//         },
//       });

//       if (error) {
//         if (error.message.includes("already registered")) {
//           // auto-login existing user
//           const { data: signInData, error: signInError } =
//             await supabase.auth.signInWithPassword({
//               email: form.email,
//               password: form.password,
//             });
//           if (signInError) throw signInError;

//           // insert/update in users table
//           await supabase.from("users").upsert({
//             id: signInData.user.id,
//             email: form.email,
//             name: form.name,
//             branch: form.branch,
//             is_mentor: form.is_mentor,
//             categories: form.categories,
//           });
//           setServerMsg("✅ Logged in successfully!");
//           router.push("/home");
//           return;
//         }
//         throw error;
//       }

//       // 3️⃣ Handle email confirmation scenario
//       const user = data?.user;
//       if (!user) {
//         setServerMsg(
//           "📧 Check your email to confirm your account before logging in."
//         );
//         return;
//       }

//       // 4️⃣ Upsert user record
//       await supabase.from("users").upsert({
//         id: user.id,
//         email: form.email,
//         name: form.name,
//         branch: form.branch,
//         is_mentor: form.is_mentor,
//         categories: form.categories,
//       });

//       setServerMsg("✅ Account created successfully!");
//       setTimeout(() => router.push("/home"), 1500);
//     } catch (err) {
//       console.error("❌ Signup error:", err);
//       setServerMsg(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black px-6 py-8">
//       <div className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-2xl p-8 text-white backdrop-blur-md">
//         <h2 className="text-2xl font-bold mb-4">Create your account</h2>
//         <p className="text-white/70 text-sm mb-4">
//           Use your college email (@nitkkr.ac.in)
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Full name"
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             className="w-full bg-white/10 border border-white/20 rounded-lg p-3"
//           />
//           <input
//             type="text"
//             placeholder="Branch"
//             value={form.branch}
//             onChange={(e) => setForm({ ...form, branch: e.target.value })}
//             className="w-full bg-white/10 border border-white/20 rounded-lg p-3"
//           />
//           <input
//             type="email"
//             placeholder="College Email"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             className="w-full bg-white/10 border border-white/20 rounded-lg p-3"
//           />
//           <input
//             type="password"
//             placeholder="Password (min 8 characters)"
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             className="w-full bg-white/10 border border-white/20 rounded-lg p-3"
//           />

//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={form.is_mentor}
//               onChange={(e) =>
//                 setForm({ ...form, is_mentor: e.target.checked })
//               }
//             />
//             I want to be a mentor
//           </label>

//           <div>
//             <h3 className="text-sm font-semibold mb-2">
//               Select categories of interest
//             </h3>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//               {CATEGORIES.map((cat) => (
//                 <label
//                   key={cat}
//                   className={`flex items-center gap-2 px-3 py-2 rounded-md border ${
//                     form.categories.includes(cat)
//                       ? "bg-yellow-400/20 border-yellow-400/40"
//                       : "bg-white/5 border-white/10"
//                   }`}
//                 >
//                   <input
//                     type="checkbox"
//                     checked={form.categories.includes(cat)}
//                     onChange={() => toggleCategory(cat)}
//                   />
//                   <span className="text-sm">{cat}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg transition flex items-center justify-center gap-2"
//           >
//             {loading && <Loader2 className="h-4 w-4 animate-spin" />}
//             {loading ? "Creating..." : "Sign Up"}
//           </button>
//         </form>

//         {serverMsg && (
//           <p className="text-yellow-300 text-sm mt-4 text-center">
//             {serverMsg}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }






// "use client";

// import React, { useState } from "react";
// import { Loader2, CheckCircle, Mail } from "lucide-react";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// const CATEGORIES = [
//   "Technology", "Startup", "Finance", "GATE", "UPSC", "Acting",
//   "AI/ML", "Photography", "Robotics", "Web Development", "DSA", "Art"
// ];

// export default function SignUpPage() {
//   const router = useRouter();
//   const [step, setStep] = useState(1); // 1: Form, 2: OTP Verification, 3: Success
//   const [form, setForm] = useState({
//     name: "",
//     branch: "",
//     email: "",
//     password: "",
//     is_mentor: false,
//     categories: [],
//   });
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [serverMsg, setServerMsg] = useState("");
//   const [msgType, setMsgType] = useState("");

//   const toggleCategory = (cat) => {
//     setForm((prev) => ({
//       ...prev,
//       categories: prev.categories.includes(cat)
//         ? prev.categories.filter((c) => c !== cat)
//         : [...prev.categories, cat],
//     }));
//   };

//   const showMessage = (msg, type = "error") => {
//     setServerMsg(msg);
//     setMsgType(type);
//   };

//   // Step 1: Send OTP to email
//   const handleSendOTP = async () => {
//     setLoading(true);
//     setServerMsg("");

//     try {
//       // Validate form
//       if (!form.name.trim()) throw new Error("Full name is required");
//       if (!form.email.endsWith("@nitkkr.ac.in")) {
//         throw new Error("Only @nitkkr.ac.in emails are allowed");
//       }
//       if (form.password.length < 8) {
//         throw new Error("Password must be at least 8 characters");
//       }
//       if (form.categories.length === 0) {
//         throw new Error("Select at least one category");
//       }

//       // Check if user already exists
//       const { data: existingUser } = await supabase
//         .from("users")
//         .select("email")
//         .eq("email", form.email)
//         .single();

//       if (existingUser) {
//         throw new Error("User already exists. Please login instead.");
//       }

//       // Send OTP via Supabase Auth
//       const { error } = await supabase.auth.signInWithOtp({
//         email: form.email,
//         options: {
//           shouldCreateUser: false, // Don't create user yet
//         },
//       });

//       if (error) throw error;

//       showMessage(`OTP sent to ${form.email}`, "success");
//       setStep(2);
//     } catch (err) {
//       showMessage(err.message, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step 2: Verify OTP and create account
//   const handleVerifyOTP = async () => {
//     setLoading(true);
//     setServerMsg("");

//     try {
//       if (otp.length !== 6) {
//         throw new Error("Please enter a valid 6-digit OTP");
//       }

//       // Verify OTP
//       const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
//         email: form.email,
//         token: otp,
//         type: "email",
//       });

//       if (verifyError) throw verifyError;

//       console.log("✅ OTP Verified, user session:", verifyData);

//       // Now create the user account with password
//       const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
//         email: form.email,
//         password: form.password,
//         options: {
//           emailRedirectTo: `${window.location.origin}/home`,
//         },
//       });

//       if (signUpError) throw signUpError;

//       // Insert user data into users table
//       const { error: dbError } = await supabase.from("users").insert({
//         id: signUpData.user.id,
//         email: form.email,
//         name: form.name,
//         branch: form.branch,
//         is_mentor: form.is_mentor,
//         categories: form.categories,
//       });

//       if (dbError) throw dbError;

//       showMessage("Account created successfully!", "success");
//       setStep(3);

//       // Redirect to login after 2 seconds
//       setTimeout(() => {
//         router.push("/login");
//       }, 2000);
//     } catch (err) {
//       console.error("❌ Verification error:", err);
//       showMessage(err.message, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     setLoading(true);
//     try {
//       const { error } = await supabase.auth.signInWithOtp({
//         email: form.email,
//       });

//       if (error) throw error;
//       showMessage("OTP resent successfully!", "success");
//     } catch (err) {
//       showMessage("Failed to resend OTP", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black px-6 py-8">
//       <div className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-2xl p-8 text-white backdrop-blur-md">
        
//         {/* Step Indicator */}
//         <div className="flex items-center justify-center mb-6 gap-2">
//           <div className={`flex items-center gap-2 ${step >= 1 ? 'text-yellow-400' : 'text-white/40'}`}>
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/40'}`}>
//               {step > 1 ? <CheckCircle className="w-5 h-5" /> : "1"}
//             </div>
//             <span className="text-sm font-medium">Details</span>
//           </div>
//           <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-yellow-400' : 'bg-white/20'}`}></div>
//           <div className={`flex items-center gap-2 ${step >= 2 ? 'text-yellow-400' : 'text-white/40'}`}>
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/40'}`}>
//               {step > 2 ? <CheckCircle className="w-5 h-5" /> : "2"}
//             </div>
//             <span className="text-sm font-medium">Verify</span>
//           </div>
//           <div className={`w-12 h-0.5 ${step >= 3 ? 'bg-yellow-400' : 'bg-white/20'}`}></div>
//           <div className={`flex items-center gap-2 ${step >= 3 ? 'text-yellow-400' : 'text-white/40'}`}>
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/40'}`}>
//               {step >= 3 ? <CheckCircle className="w-5 h-5" /> : "3"}
//             </div>
//             <span className="text-sm font-medium">Done</span>
//           </div>
//         </div>

//         {/* Step 1: Registration Form */}
//         {step === 1 && (
//           <>
//             <h2 className="text-2xl font-bold mb-2">Create your account</h2>
//             <p className="text-white/70 text-sm mb-6">
//               Use your college email (@nitkkr.ac.in)
//             </p>

//             <div className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Full name"
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white"
//               />
//               <input
//                 type="text"
//                 placeholder="Branch (e.g., Computer Science)"
//                 value={form.branch}
//                 onChange={(e) => setForm({ ...form, branch: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white"
//               />
//               <input
//                 type="email"
//                 placeholder="College Email (@nitkkr.ac.in)"
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white"
//               />
//               <input
//                 type="password"
//                 placeholder="Password (min 8 characters)"
//                 value={form.password}
//                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white"
//               />

//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={form.is_mentor}
//                   onChange={(e) => setForm({ ...form, is_mentor: e.target.checked })}
//                   className="w-4 h-4 accent-yellow-400"
//                 />
//                 <span className="text-sm">I want to be a mentor</span>
//               </label>

//               <div>
//                 <h3 className="text-sm font-semibold mb-3">
//                   Select categories of interest *
//                 </h3>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                   {CATEGORIES.map((cat) => (
//                     <label
//                       key={cat}
//                       className={`flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer transition ${
//                         form.categories.includes(cat)
//                           ? "bg-yellow-400/20 border-yellow-400/40"
//                           : "bg-white/5 border-white/10 hover:border-white/30"
//                       }`}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={form.categories.includes(cat)}
//                         onChange={() => toggleCategory(cat)}
//                         className="w-4 h-4 accent-yellow-400"
//                       />
//                       <span className="text-sm">{cat}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <button
//                 onClick={handleSendOTP}
//                 disabled={loading}
//                 className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading && <Loader2 className="h-4 w-4 animate-spin" />}
//                 {loading ? "Sending OTP..." : "Send OTP"}
//               </button>
//             </div>
//           </>
//         )}

//         {/* Step 2: OTP Verification */}
//         {step === 2 && (
//           <div className="text-center">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400/20 rounded-full mb-4">
//               <Mail className="w-8 h-8 text-yellow-400" />
//             </div>
//             <h2 className="text-2xl font-bold mb-2">Verify your email</h2>
//             <p className="text-white/70 text-sm mb-6">
//               We've sent a 6-digit OTP to<br />
//               <span className="text-yellow-400 font-medium">{form.email}</span>
//             </p>

//             <div className="max-w-sm mx-auto space-y-4">
//               <input
//                 type="text"
//                 placeholder="Enter 6-digit OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-center text-2xl tracking-widest focus:outline-none focus:border-yellow-400 transition text-white"
//                 maxLength={6}
//               />

//               <button
//                 onClick={handleVerifyOTP}
//                 disabled={loading || otp.length !== 6}
//                 className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading && <Loader2 className="h-4 w-4 animate-spin" />}
//                 {loading ? "Verifying..." : "Verify & Create Account"}
//               </button>

//               <button
//                 onClick={handleResendOTP}
//                 disabled={loading}
//                 className="w-full text-yellow-400 hover:text-yellow-300 text-sm underline disabled:opacity-50"
//               >
//                 Didn't receive OTP? Resend
//               </button>

//               <button
//                 onClick={() => setStep(1)}
//                 className="w-full text-white/60 hover:text-white text-sm"
//               >
//                 ← Change email address
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Step 3: Success */}
//         {step === 3 && (
//           <div className="text-center py-8">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-4">
//               <CheckCircle className="w-12 h-12 text-green-400" />
//             </div>
//             <h2 className="text-2xl font-bold mb-2">Account Created!</h2>
//             <p className="text-white/70 text-sm mb-6">
//               Your account has been successfully created.<br />
//               Redirecting to login page...
//             </p>
//             <div className="flex items-center justify-center gap-2 text-yellow-400">
//               <Loader2 className="w-5 h-5 animate-spin" />
//               <span className="text-sm">Please wait</span>
//             </div>
//           </div>
//         )}

//         {/* Message Display */}
//         {serverMsg && (
//           <div className={`mt-4 p-3 rounded-lg border text-sm ${
//             msgType === "success" 
//               ? "bg-green-500/10 border-green-500/30 text-green-400"
//               : "bg-red-500/10 border-red-500/30 text-red-400"
//           }`}>
//             {serverMsg}
//           </div>
//         )}

//         {/* Login Link */}
//         {step === 1 && (
//           <p className="text-center text-sm text-white/60 mt-6">
//             Already have an account?{" "}
//             <a href="/login" className="text-yellow-400 hover:text-yellow-300 underline">
//               Log in
//             </a>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }









// "use client";

// import React, { useState } from "react";
// import { Loader2, CheckCircle, Mail } from "lucide-react";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// const CATEGORIES = [
//   "Technology", "Startup", "Finance", "GATE", "UPSC", "Acting",
//   "AI/ML", "Photography", "Robotics", "Web Development", "DSA", "Art"
// ];

// export default function SignUpPage() {
//   const router = useRouter();
//   const [step, setStep] = useState(1);
//   const [form, setForm] = useState({
//     name: "",
//     branch: "",
//     email: "",
//     password: "",
//     is_mentor: false,
//     categories: [],
//   });
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [serverMsg, setServerMsg] = useState("");
//   const [msgType, setMsgType] = useState("");

//   const toggleCategory = (cat) => {
//     setForm((prev) => ({
//       ...prev,
//       categories: prev.categories.includes(cat)
//         ? prev.categories.filter((c) => c !== cat)
//         : [...prev.categories, cat],
//     }));
//   };

//   const showMessage = (msg, type = "error") => {
//     setServerMsg(msg);
//     setMsgType(type);
//     setTimeout(() => {
//       if (type === "error") setServerMsg("");
//     }, 5000);
//   };

//   // Step 1: Send OTP to email
//   const handleSendOTP = async () => {
//     setLoading(true);
//     setServerMsg("");

//     try {
//       // Validate form
//       if (!form.name.trim()) throw new Error("Full name is required");
//       if (!form.email.endsWith("@nitkkr.ac.in")) {
//         throw new Error("Only @nitkkr.ac.in emails are allowed");
//       }
//       if (form.password.length < 8) {
//         throw new Error("Password must be at least 8 characters");
//       }
//       if (form.categories.length === 0) {
//         throw new Error("Select at least one category");
//       }

//       // Check if user already exists in your users table
//       const { data: existingUser } = await supabase
//         .from("users")
//         .select("email")
//         .eq("email", form.email)
//         .single();

//       if (existingUser) {
//         throw new Error("User already exists. Please login instead.");
//       }

//       console.log("📧 Sending OTP to:", form.email);

//       // ✅ FIXED: Set shouldCreateUser to TRUE
//       const { data, error } = await supabase.auth.signInWithOtp({
//         email: form.email,
//         options: {
//           shouldCreateUser: true, // ← THIS IS THE FIX!
//           data: {
//             full_name: form.name,
//             branch: form.branch,
//             is_mentor: form.is_mentor,
//             categories: form.categories,
//           },
//         },
//       });

//       if (error) {
//         console.error("❌ OTP Error:", error);
//         throw error;
//       }

//       console.log("✅ OTP sent successfully:", data);
//       showMessage(`OTP sent to ${form.email}`, "success");
//       setStep(2);
//     } catch (err) {
//       console.error("❌ Error:", err);
//       showMessage(err.message, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step 2: Verify OTP and create account
//   const handleVerifyOTP = async () => {
//     setLoading(true);
//     setServerMsg("");

//     try {
//       if (otp.length !== 6) {
//         throw new Error("Please enter a valid 6-digit OTP");
//       }

//       console.log("🔐 Verifying OTP for:", form.email);

//       // Verify OTP
//       const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
//         email: form.email,
//         token: otp,
//         type: "email",
//       });

//       if (verifyError) {
//         console.error("❌ Verification Error:", verifyError);
//         throw verifyError;
//       }

//       console.log("✅ OTP Verified, user session:", verifyData);

//       // Get the user ID from the verified session
//       const userId = verifyData.user?.id;

//       if (!userId) {
//         throw new Error("User ID not found after verification");
//       }

//       // Update user password
//       const { error: updateError } = await supabase.auth.updateUser({
//         password: form.password,
//       });

//       if (updateError) {
//         console.error("❌ Password update error:", updateError);
//         throw updateError;
//       }

//       console.log("✅ Password set successfully");

//       // Insert user data into users table
//       const { error: dbError } = await supabase.from("users").upsert({
//         id: userId,
//         email: form.email,
//         name: form.name,
//         branch: form.branch,
//         is_mentor: form.is_mentor,
//         categories: form.categories,
//       }, {
//         onConflict: 'id'
//       });

//       if (dbError) {
//         console.error("❌ Database error:", dbError);
//         throw dbError;
//       }

//       console.log("✅ User data saved to database");

//       showMessage("Account created successfully!", "success");
//       setStep(3);

//       // Sign out the user so they can login properly
//       await supabase.auth.signOut();

//       // Redirect to login after 2 seconds
//       setTimeout(() => {
//         router.push("/login");
//       }, 2000);
//     } catch (err) {
//       console.error("❌ Verification error:", err);
//       showMessage(err.message, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     setLoading(true);
//     try {
//       const { error } = await supabase.auth.signInWithOtp({
//         email: form.email,
//         options: {
//           shouldCreateUser: true,
//         },
//       });

//       if (error) throw error;
//       showMessage("OTP resent successfully!", "success");
//     } catch (err) {
//       showMessage("Failed to resend OTP. Try again in 60 seconds.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black px-6 py-8">
//       <div className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-2xl p-8 text-white backdrop-blur-md">
        
//         {/* Step Indicator */}
//         <div className="flex items-center justify-center mb-6 gap-2">
//           <div className={`flex items-center gap-2 ${step >= 1 ? 'text-yellow-400' : 'text-white/40'}`}>
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/40'}`}>
//               {step > 1 ? <CheckCircle className="w-5 h-5" /> : "1"}
//             </div>
//             <span className="text-sm font-medium">Details</span>
//           </div>
//           <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-yellow-400' : 'bg-white/20'}`}></div>
//           <div className={`flex items-center gap-2 ${step >= 2 ? 'text-yellow-400' : 'text-white/40'}`}>
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/40'}`}>
//               {step > 2 ? <CheckCircle className="w-5 h-5" /> : "2"}
//             </div>
//             <span className="text-sm font-medium">Verify</span>
//           </div>
//           <div className={`w-12 h-0.5 ${step >= 3 ? 'bg-yellow-400' : 'bg-white/20'}`}></div>
//           <div className={`flex items-center gap-2 ${step >= 3 ? 'text-yellow-400' : 'text-white/40'}`}>
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/40'}`}>
//               {step >= 3 ? <CheckCircle className="w-5 h-5" /> : "3"}
//             </div>
//             <span className="text-sm font-medium">Done</span>
//           </div>
//         </div>

//         {/* Step 1: Registration Form */}
//         {step === 1 && (
//           <>
//             <h2 className="text-2xl font-bold mb-2">Create your account</h2>
//             <p className="text-white/70 text-sm mb-6">
//               Use your college email (@nitkkr.ac.in)
//             </p>

//             <div className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Full name"
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//               />
//               <input
//                 type="text"
//                 placeholder="Branch (e.g., Computer Science)"
//                 value={form.branch}
//                 onChange={(e) => setForm({ ...form, branch: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//               />
//               <input
//                 type="email"
//                 placeholder="College Email (@nitkkr.ac.in)"
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//               />
//               <input
//                 type="password"
//                 placeholder="Password (min 8 characters)"
//                 value={form.password}
//                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//               />

//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={form.is_mentor}
//                   onChange={(e) => setForm({ ...form, is_mentor: e.target.checked })}
//                   className="w-4 h-4 accent-yellow-400"
//                 />
//                 <span className="text-sm">I want to be a mentor</span>
//               </label>

//               <div>
//                 <h3 className="text-sm font-semibold mb-3">
//                   Select categories of interest *
//                 </h3>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                   {CATEGORIES.map((cat) => (
//                     <label
//                       key={cat}
//                       className={`flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer transition ${
//                         form.categories.includes(cat)
//                           ? "bg-yellow-400/20 border-yellow-400/40"
//                           : "bg-white/5 border-white/10 hover:border-white/30"
//                       }`}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={form.categories.includes(cat)}
//                         onChange={() => toggleCategory(cat)}
//                         className="w-4 h-4 accent-yellow-400"
//                       />
//                       <span className="text-sm">{cat}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <button
//                 onClick={handleSendOTP}
//                 disabled={loading}
//                 className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading && <Loader2 className="h-4 w-4 animate-spin" />}
//                 {loading ? "Sending OTP..." : "Send OTP"}
//               </button>
//             </div>
//           </>
//         )}

//         {/* Step 2: OTP Verification */}
//         {step === 2 && (
//           <div className="text-center">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400/20 rounded-full mb-4">
//               <Mail className="w-8 h-8 text-yellow-400" />
//             </div>
//             <h2 className="text-2xl font-bold mb-2">Verify your email</h2>
//             <p className="text-white/70 text-sm mb-6">
//               We've sent a 6-digit OTP to<br />
//               <span className="text-yellow-400 font-medium">{form.email}</span>
//             </p>

//             <div className="max-w-sm mx-auto space-y-4">
//               <input
//                 type="text"
//                 placeholder="Enter 6-digit OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-center text-2xl tracking-widest focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//                 maxLength={6}
//                 autoFocus
//               />

//               <button
//                 onClick={handleVerifyOTP}
//                 disabled={loading || otp.length !== 6}
//                 className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading && <Loader2 className="h-4 w-4 animate-spin" />}
//                 {loading ? "Verifying..." : "Verify & Create Account"}
//               </button>

//               <button
//                 onClick={handleResendOTP}
//                 disabled={loading}
//                 className="w-full text-yellow-400 hover:text-yellow-300 text-sm underline disabled:opacity-50"
//               >
//                 Didn't receive OTP? Resend
//               </button>

//               <button
//                 onClick={() => {
//                   setStep(1);
//                   setOtp("");
//                 }}
//                 className="w-full text-white/60 hover:text-white text-sm"
//               >
//                 ← Change email address
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Step 3: Success */}
//         {step === 3 && (
//           <div className="text-center py-8">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-4">
//               <CheckCircle className="w-12 h-12 text-green-400" />
//             </div>
//             <h2 className="text-2xl font-bold mb-2">Account Created!</h2>
//             <p className="text-white/70 text-sm mb-6">
//               Your account has been successfully created.<br />
//               Redirecting to login page...
//             </p>
//             <div className="flex items-center justify-center gap-2 text-yellow-400">
//               <Loader2 className="w-5 h-5 animate-spin" />
//               <span className="text-sm">Please wait</span>
//             </div>
//           </div>
//         )}

//         {/* Message Display */}
//         {serverMsg && (
//           <div className={`mt-4 p-3 rounded-lg border text-sm ${
//             msgType === "success" 
//               ? "bg-green-500/10 border-green-500/30 text-green-400"
//               : "bg-red-500/10 border-red-500/30 text-red-400"
//           }`}>
//             {serverMsg}
//           </div>
//         )}

//         {/* Login Link */}
//         {step === 1 && (
//           <p className="text-center text-sm text-white/60 mt-6">
//             Already have an account?{" "}
//             <a href="/login" className="text-yellow-400 hover:text-yellow-300 underline">
//               Log in
//             </a>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }









// "use client";

// import React, { useState } from "react";
// import { Loader2, CheckCircle, Mail } from "lucide-react";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// const CATEGORIES = [
//   "Technology", "Startup", "Finance", "GATE", "UPSC", "Acting",
//   "AI/ML", "Photography", "Robotics", "Web Development", "DSA", "Art"
// ];

// export default function SignUpPage() {
//   const router = useRouter();
//   const [step, setStep] = useState(1);
//   const [form, setForm] = useState({
//     name: "",
//     branch: "",
//     email: "",
//     password: "",
//     is_mentor: false,
//     categories: [],
//   });
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [serverMsg, setServerMsg] = useState("");
//   const [msgType, setMsgType] = useState("");

//   const toggleCategory = (cat) => {
//     setForm((prev) => ({
//       ...prev,
//       categories: prev.categories.includes(cat)
//         ? prev.categories.filter((c) => c !== cat)
//         : [...prev.categories, cat],
//     }));
//   };

//   const showMessage = (msg, type = "error") => {
//     setServerMsg(msg);
//     setMsgType(type);
//   };

//   // Step 1: Send OTP
//   const handleSendOTP = async () => {
//     setLoading(true);
//     setServerMsg("");

//     try {
//       // Validate
//       if (!form.name.trim()) throw new Error("Full name is required");
//       if (!form.email.endsWith("@nitkkr.ac.in")) {
//         throw new Error("Only @nitkkr.ac.in emails are allowed");
//       }
//       if (form.password.length < 8) {
//         throw new Error("Password must be at least 8 characters");
//       }
//       if (form.categories.length === 0) {
//         throw new Error("Select at least one category");
//       }

//       // Check if user exists
//       const { data: existingUser } = await supabase
//         .from("users")
//         .select("email")
//         .eq("email", form.email)
//         .single();

//       if (existingUser) {
//         throw new Error("User already exists. Please login instead.");
//       }

//       console.log("📧 Sending OTP to:", form.email);

//       // Send OTP
//       const { error } = await supabase.auth.signInWithOtp({
//         email: form.email,
//         options: {
//           shouldCreateUser: true,
//         },
//       });

//       if (error) throw error;

//       console.log("✅ OTP sent");
//       showMessage(`OTP sent to ${form.email}`, "success");
//       setStep(2);
//     } catch (err) {
//       console.error("❌ Send OTP error:", err);
//       showMessage(err.message, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step 2: Verify OTP
//   const handleVerifyOTP = async () => {
//     setLoading(true);
//     setServerMsg("");

//     try {
//       if (otp.length !== 6) {
//         throw new Error("Please enter a valid 6-digit OTP");
//       }

//       console.log("🔐 Step 1: Verifying OTP...");

//       // Verify OTP
//       const { data, error } = await supabase.auth.verifyOtp({
//         email: form.email,
//         token: otp,
//         type: "email",
//       });

//       if (error) throw error;

//       console.log("✅ Step 2: OTP verified, user:", data.user?.id);

//       if (!data.user?.id) {
//         throw new Error("No user ID after verification");
//       }

//       console.log("🔑 Step 3: Setting password...");

//       // Set password
//       const { error: pwdError } = await supabase.auth.updateUser({
//         password: form.password,
//       });

//       if (pwdError) throw pwdError;

//       console.log("✅ Step 4: Password set");

//       console.log("💾 Step 5: Saving to database...");

//       // Save to database
//       const { error: dbError } = await supabase.from("users").insert({
//         id: data.user.id,
//         email: form.email,
//         name: form.name,
//         branch: form.branch,
//         is_mentor: form.is_mentor,
//         categories: form.categories,
//       });

//       if (dbError) {
//         // If user already exists, update instead
//         if (dbError.code === '23505') {
//           console.log("⚠️ User exists, updating...");
//           const { error: updateError } = await supabase
//             .from("users")
//             .update({
//               name: form.name,
//               branch: form.branch,
//               is_mentor: form.is_mentor,
//               categories: form.categories,
//             })
//             .eq("id", data.user.id);
          
//           if (updateError) throw updateError;
//         } else {
//           throw dbError;
//         }
//       }

//       console.log("✅ Step 6: Data saved");

//       console.log("🚪 Step 7: Signing out...");

//       // Sign out
//       await supabase.auth.signOut();

//       console.log("✅ Step 8: Complete! Moving to success screen");

//       showMessage("Account created successfully!", "success");
//       setStep(3);

//       setTimeout(() => {
//         console.log("🔄 Redirecting to login...");
//         router.push("/login");
//       }, 2000);

//     } catch (err) {
//       console.error("❌ ERROR:", err);
//       console.error("Error details:", {
//         message: err.message,
//         code: err.code,
//         details: err.details
//       });
//       showMessage(err.message || "Verification failed", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     setLoading(true);
//     try {
//       const { error } = await supabase.auth.signInWithOtp({
//         email: form.email,
//         options: { shouldCreateUser: true },
//       });

//       if (error) throw error;
//       showMessage("OTP resent successfully!", "success");
//     } catch (err) {
//       showMessage("Failed to resend. Try again in 60 seconds.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black px-6 py-8">
//       <div className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-2xl p-8 text-white backdrop-blur-md">
        
//         {/* Step Indicator */}
//         <div className="flex items-center justify-center mb-6 gap-2">
//           <div className={`flex items-center gap-2 ${step >= 1 ? 'text-yellow-400' : 'text-white/40'}`}>
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/40'}`}>
//               {step > 1 ? <CheckCircle className="w-5 h-5" /> : "1"}
//             </div>
//             <span className="text-sm font-medium">Details</span>
//           </div>
//           <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-yellow-400' : 'bg-white/20'}`}></div>
//           <div className={`flex items-center gap-2 ${step >= 2 ? 'text-yellow-400' : 'text-white/40'}`}>
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/40'}`}>
//               {step > 2 ? <CheckCircle className="w-5 h-5" /> : "2"}
//             </div>
//             <span className="text-sm font-medium">Verify</span>
//           </div>
//           <div className={`w-12 h-0.5 ${step >= 3 ? 'bg-yellow-400' : 'bg-white/20'}`}></div>
//           <div className={`flex items-center gap-2 ${step >= 3 ? 'text-yellow-400' : 'text-white/40'}`}>
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/40'}`}>
//               {step >= 3 ? <CheckCircle className="w-5 h-5" /> : "3"}
//             </div>
//             <span className="text-sm font-medium">Done</span>
//           </div>
//         </div>

//         {/* Step 1: Registration Form */}
//         {step === 1 && (
//           <>
//             <h2 className="text-2xl font-bold mb-2">Create your account</h2>
//             <p className="text-white/70 text-sm mb-6">
//               Use your college email (@nitkkr.ac.in)
//             </p>

//             <div className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Full name"
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//               />
//               <input
//                 type="text"
//                 placeholder="Branch (e.g., Computer Science)"
//                 value={form.branch}
//                 onChange={(e) => setForm({ ...form, branch: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//               />
//               <input
//                 type="email"
//                 placeholder="College Email (@nitkkr.ac.in)"
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//               />
//               <input
//                 type="password"
//                 placeholder="Password (min 8 characters)"
//                 value={form.password}
//                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//               />

//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={form.is_mentor}
//                   onChange={(e) => setForm({ ...form, is_mentor: e.target.checked })}
//                   className="w-4 h-4 accent-yellow-400"
//                 />
//                 <span className="text-sm">I want to be a mentor</span>
//               </label>

//               <div>
//                 <h3 className="text-sm font-semibold mb-3">
//                   Select categories of interest *
//                 </h3>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                   {CATEGORIES.map((cat) => (
//                     <label
//                       key={cat}
//                       className={`flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer transition ${
//                         form.categories.includes(cat)
//                           ? "bg-yellow-400/20 border-yellow-400/40"
//                           : "bg-white/5 border-white/10 hover:border-white/30"
//                       }`}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={form.categories.includes(cat)}
//                         onChange={() => toggleCategory(cat)}
//                         className="w-4 h-4 accent-yellow-400"
//                       />
//                       <span className="text-sm">{cat}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <button
//                 onClick={handleSendOTP}
//                 disabled={loading}
//                 className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading && <Loader2 className="h-4 w-4 animate-spin" />}
//                 {loading ? "Sending OTP..." : "Send OTP"}
//               </button>
//             </div>
//           </>
//         )}

//         {/* Step 2: OTP Verification */}
//         {step === 2 && (
//           <div className="text-center">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400/20 rounded-full mb-4">
//               <Mail className="w-8 h-8 text-yellow-400" />
//             </div>
//             <h2 className="text-2xl font-bold mb-2">Verify your email</h2>
//             <p className="text-white/70 text-sm mb-6">
//               We've sent a 6-digit OTP to<br />
//               <span className="text-yellow-400 font-medium">{form.email}</span>
//             </p>

//             <div className="max-w-sm mx-auto space-y-4">
//               <input
//                 type="text"
//                 placeholder="Enter 6-digit OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-center text-2xl tracking-widest focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//                 maxLength={6}
//                 autoFocus
//               />

//               <button
//                 onClick={handleVerifyOTP}
//                 disabled={loading || otp.length !== 6}
//                 className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading && <Loader2 className="h-4 w-4 animate-spin" />}
//                 {loading ? "Verifying..." : "Verify & Create Account"}
//               </button>

//               <button
//                 onClick={handleResendOTP}
//                 disabled={loading}
//                 className="w-full text-yellow-400 hover:text-yellow-300 text-sm underline disabled:opacity-50"
//               >
//                 Didn't receive OTP? Resend
//               </button>

//               <button
//                 onClick={() => {
//                   setStep(1);
//                   setOtp("");
//                 }}
//                 className="w-full text-white/60 hover:text-white text-sm"
//               >
//                 ← Change email address
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Step 3: Success */}
//         {step === 3 && (
//           <div className="text-center py-8">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-4">
//               <CheckCircle className="w-12 h-12 text-green-400" />
//             </div>
//             <h2 className="text-2xl font-bold mb-2">Account Created!</h2>
//             <p className="text-white/70 text-sm mb-6">
//               Your account has been successfully created.<br />
//               Redirecting to login page...
//             </p>
//             <div className="flex items-center justify-center gap-2 text-yellow-400">
//               <Loader2 className="w-5 h-5 animate-spin" />
//               <span className="text-sm">Please wait</span>
//             </div>
//           </div>
//         )}

//         {/* Message Display */}
//         {serverMsg && (
//           <div className={`mt-4 p-3 rounded-lg border text-sm ${
//             msgType === "success" 
//               ? "bg-green-500/10 border-green-500/30 text-green-400"
//               : "bg-red-500/10 border-red-500/30 text-red-400"
//           }`}>
//             {serverMsg}
//           </div>
//         )}

//         {/* Login Link */}
//         {step === 1 && (
//           <p className="text-center text-sm text-white/60 mt-6">
//             Already have an account?{" "}
//             <a href="/login" className="text-yellow-400 hover:text-yellow-300 underline">
//               Log in
//             </a>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }






// "use client";

// import React, { useState } from "react";
// import { Loader2, CheckCircle, Mail } from "lucide-react";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// const CATEGORIES = [
//   "Technology", "Startup", "Finance", "GATE", "UPSC", "Acting",
//   "AI/ML", "Photography", "Robotics", "Web Development", "DSA", "Art"
// ];

// export default function SignUpPage() {
//   const router = useRouter();
//   const [step, setStep] = useState(1);
//   const [form, setForm] = useState({
//     name: "",
//     branch: "",
//     email: "",
//     password: "",
//     is_mentor: false,
//     categories: [],
//   });
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [serverMsg, setServerMsg] = useState("");
//   const [msgType, setMsgType] = useState("");

//   const toggleCategory = (cat) => {
//     setForm((prev) => ({
//       ...prev,
//       categories: prev.categories.includes(cat)
//         ? prev.categories.filter((c) => c !== cat)
//         : [...prev.categories, cat],
//     }));
//   };

//   const showMessage = (msg, type = "error") => {
//     setServerMsg(msg);
//     setMsgType(type);
//   };

//   // Step 1: Send OTP
//   const handleSendOTP = async () => {
//     setLoading(true);
//     setServerMsg("");

//     try {
//       // Validate
//       if (!form.name.trim()) throw new Error("Full name is required");
//       if (!form.email.endsWith("@nitkkr.ac.in")) {
//         throw new Error("Only @nitkkr.ac.in emails are allowed");
//       }
//       if (form.password.length < 8) {
//         throw new Error("Password must be at least 8 characters");
//       }
//       if (form.categories.length === 0) {
//         throw new Error("Select at least one category");
//       }

//       // Check if user exists
//       const { data: existingUser } = await supabase
//         .from("users")
//         .select("email")
//         .eq("email", form.email)
//         .single();

//       if (existingUser) {
//         throw new Error("User already exists. Please login instead.");
//       }

//       console.log("📧 Sending OTP to:", form.email);

//       // Send OTP with explicit channel
//       const { error } = await supabase.auth.signInWithOtp({
//         email: form.email,
//         options: {
//           shouldCreateUser: true,
//           emailRedirectTo: undefined, // Prevent magic link
//           data: {
//             full_name: form.name,
//             branch: form.branch,
//           }
//         },
//       });

//       if (error) throw error;

//       console.log("✅ OTP sent");
//       showMessage(`Check your email for a 6-digit code (not a link!)`, "success");
//       setStep(2);
//     } catch (err) {
//       console.error("❌ Send OTP error:", err);
//       showMessage(err.message, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step 2: Verify OTP
//   const handleVerifyOTP = async () => {
//     setLoading(true);
//     setServerMsg("");

//     try {
//       if (otp.length !== 6) {
//         throw new Error("Please enter a valid 6-digit OTP");
//       }

//       console.log("🔐 Step 1: Verifying OTP...");

//       // Verify OTP
//       const { data, error } = await supabase.auth.verifyOtp({
//         email: form.email,
//         token: otp,
//         type: "email",
//       });

//       if (error) throw error;

//       console.log("✅ Step 2: OTP verified, user:", data.user?.id);

//       if (!data.user?.id) {
//         throw new Error("No user ID after verification");
//       }

//       console.log("🔑 Step 3: Setting password...");

//       // Set password
//       const { error: pwdError } = await supabase.auth.updateUser({
//         password: form.password,
//       });

//       if (pwdError) throw pwdError;

//       console.log("✅ Step 4: Password set");

//       console.log("💾 Step 5: Saving to database...");

//       // Save to database
//       const { error: dbError } = await supabase.from("users").insert({
//         id: data.user.id,
//         email: form.email,
//         name: form.name,
//         branch: form.branch,
//         is_mentor: form.is_mentor,
//         categories: form.categories,
//       });

//       if (dbError) {
//         // If user already exists, update instead
//         if (dbError.code === '23505') {
//           console.log("⚠️ User exists, updating...");
//           const { error: updateError } = await supabase
//             .from("users")
//             .update({
//               name: form.name,
//               branch: form.branch,
//               is_mentor: form.is_mentor,
//               categories: form.categories,
//             })
//             .eq("id", data.user.id);
          
//           if (updateError) throw updateError;
//         } else {
//           throw dbError;
//         }
//       }

//       console.log("✅ Step 6: Data saved");

//       console.log("🚪 Step 7: Signing out...");

//       // Sign out
//       await supabase.auth.signOut();

//       console.log("✅ Step 8: Complete! Moving to success screen");

//       showMessage("Account created successfully!", "success");
//       setStep(3);

//       setTimeout(() => {
//         console.log("🔄 Redirecting to login...");
//         router.push("/login");
//       }, 2000);

//     } catch (err) {
//       console.error("❌ ERROR:", err);
//       console.error("Error details:", {
//         message: err.message,
//         code: err.code,
//         details: err.details
//       });
//       showMessage(err.message || "Verification failed", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     setLoading(true);
//     try {
//       const { error } = await supabase.auth.signInWithOtp({
//         email: form.email,
//         options: { shouldCreateUser: true },
//       });

//       if (error) throw error;
//       showMessage("OTP resent successfully!", "success");
//     } catch (err) {
//       showMessage("Failed to resend. Try again in 60 seconds.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black px-6 py-8">
//       <div className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-2xl p-8 text-white backdrop-blur-md">
        
//         {/* Step Indicator */}
//         <div className="flex items-center justify-center mb-6 gap-2">
//           <div className={`flex items-center gap-2 ${step >= 1 ? 'text-yellow-400' : 'text-white/40'}`}>
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/40'}`}>
//               {step > 1 ? <CheckCircle className="w-5 h-5" /> : "1"}
//             </div>
//             <span className="text-sm font-medium">Details</span>
//           </div>
//           <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-yellow-400' : 'bg-white/20'}`}></div>
//           <div className={`flex items-center gap-2 ${step >= 2 ? 'text-yellow-400' : 'text-white/40'}`}>
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/40'}`}>
//               {step > 2 ? <CheckCircle className="w-5 h-5" /> : "2"}
//             </div>
//             <span className="text-sm font-medium">Verify</span>
//           </div>
//           <div className={`w-12 h-0.5 ${step >= 3 ? 'bg-yellow-400' : 'bg-white/20'}`}></div>
//           <div className={`flex items-center gap-2 ${step >= 3 ? 'text-yellow-400' : 'text-white/40'}`}>
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/40'}`}>
//               {step >= 3 ? <CheckCircle className="w-5 h-5" /> : "3"}
//             </div>
//             <span className="text-sm font-medium">Done</span>
//           </div>
//         </div>

//         {/* Step 1: Registration Form */}
//         {step === 1 && (
//           <>
//             <h2 className="text-2xl font-bold mb-2">Create your account</h2>
//             <p className="text-white/70 text-sm mb-6">
//               Use your college email (@nitkkr.ac.in)
//             </p>

//             <div className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Full name"
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//               />
//               <input
//                 type="text"
//                 placeholder="Branch (e.g., Computer Science)"
//                 value={form.branch}
//                 onChange={(e) => setForm({ ...form, branch: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//               />
//               <input
//                 type="email"
//                 placeholder="College Email (@nitkkr.ac.in)"
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//               />
//               <input
//                 type="password"
//                 placeholder="Password (min 8 characters)"
//                 value={form.password}
//                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//               />

//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={form.is_mentor}
//                   onChange={(e) => setForm({ ...form, is_mentor: e.target.checked })}
//                   className="w-4 h-4 accent-yellow-400"
//                 />
//                 <span className="text-sm">I want to be a mentor</span>
//               </label>

//               <div>
//                 <h3 className="text-sm font-semibold mb-3">
//                   Select categories of interest *
//                 </h3>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                   {CATEGORIES.map((cat) => (
//                     <label
//                       key={cat}
//                       className={`flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer transition ${
//                         form.categories.includes(cat)
//                           ? "bg-yellow-400/20 border-yellow-400/40"
//                           : "bg-white/5 border-white/10 hover:border-white/30"
//                       }`}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={form.categories.includes(cat)}
//                         onChange={() => toggleCategory(cat)}
//                         className="w-4 h-4 accent-yellow-400"
//                       />
//                       <span className="text-sm">{cat}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <button
//                 onClick={handleSendOTP}
//                 disabled={loading}
//                 className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading && <Loader2 className="h-4 w-4 animate-spin" />}
//                 {loading ? "Sending OTP..." : "Send OTP"}
//               </button>
//             </div>
//           </>
//         )}

//         {/* Step 2: OTP Verification */}
//         {step === 2 && (
//           <div className="text-center">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400/20 rounded-full mb-4">
//               <Mail className="w-8 h-8 text-yellow-400" />
//             </div>
//             <h2 className="text-2xl font-bold mb-2">Verify your email</h2>
//             <p className="text-white/70 text-sm mb-6">
//               We've sent a 6-digit OTP to<br />
//               <span className="text-yellow-400 font-medium">{form.email}</span>
//             </p>

//             <div className="max-w-sm mx-auto space-y-4">
//               <input
//                 type="text"
//                 placeholder="Enter 6-digit OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-center text-2xl tracking-widest focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//                 maxLength={6}
//                 autoFocus
//               />

//               <button
//                 onClick={handleVerifyOTP}
//                 disabled={loading || otp.length !== 6}
//                 className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading && <Loader2 className="h-4 w-4 animate-spin" />}
//                 {loading ? "Verifying..." : "Verify & Create Account"}
//               </button>

//               <button
//                 onClick={handleResendOTP}
//                 disabled={loading}
//                 className="w-full text-yellow-400 hover:text-yellow-300 text-sm underline disabled:opacity-50"
//               >
//                 Didn't receive OTP? Resend
//               </button>

//               <button
//                 onClick={() => {
//                   setStep(1);
//                   setOtp("");
//                 }}
//                 className="w-full text-white/60 hover:text-white text-sm"
//               >
//                 ← Change email address
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Step 3: Success */}
//         {step === 3 && (
//           <div className="text-center py-8">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-4">
//               <CheckCircle className="w-12 h-12 text-green-400" />
//             </div>
//             <h2 className="text-2xl font-bold mb-2">Account Created!</h2>
//             <p className="text-white/70 text-sm mb-6">
//               Your account has been successfully created.<br />
//               Redirecting to login page...
//             </p>
//             <div className="flex items-center justify-center gap-2 text-yellow-400">
//               <Loader2 className="w-5 h-5 animate-spin" />
//               <span className="text-sm">Please wait</span>
//             </div>
//           </div>
//         )}

//         {/* Message Display */}
//         {serverMsg && (
//           <div className={`mt-4 p-3 rounded-lg border text-sm ${
//             msgType === "success" 
//               ? "bg-green-500/10 border-green-500/30 text-green-400"
//               : "bg-red-500/10 border-red-500/30 text-red-400"
//           }`}>
//             {serverMsg}
//           </div>
//         )}

//         {/* Login Link */}
//         {step === 1 && (
//           <p className="text-center text-sm text-white/60 mt-6">
//             Already have an account?{" "}
//             <a href="/login" className="text-yellow-400 hover:text-yellow-300 underline">
//               Log in
//             </a>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }







// "use client";

// import React, { useState } from "react";
// import { Loader2, CheckCircle, Mail } from "lucide-react";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// const CATEGORIES = [
//   "Technology", "Startup", "Finance", "GATE", "UPSC", "Acting",
//   "AI/ML", "Photography", "Robotics", "Web Development", "DSA", "Art"
// ];

// export default function SignUpPage() {
//   const router = useRouter();
//   const [step, setStep] = useState(1);
//   const [form, setForm] = useState({
//     name: "",
//     branch: "",
//     email: "",
//     password: "",
//     is_mentor: false,
//     categories: [],
//   });
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [serverMsg, setServerMsg] = useState("");
//   const [msgType, setMsgType] = useState("");

//   const toggleCategory = (cat) => {
//     setForm((prev) => ({
//       ...prev,
//       categories: prev.categories.includes(cat)
//         ? prev.categories.filter((c) => c !== cat)
//         : [...prev.categories, cat],
//     }));
//   };

//   const showMessage = (msg, type = "error") => {
//     setServerMsg(msg);
//     setMsgType(type);
//   };

//   // ✅ FIXED: Use signUp() instead of signInWithOtp()
//   const handleSendOTP = async () => {
//     setLoading(true);
//     setServerMsg("");

//     try {
//       // Validate
//       if (!form.name.trim()) throw new Error("Full name is required");
//       if (!form.email.endsWith("@nitkkr.ac.in")) {
//         throw new Error("Only @nitkkr.ac.in emails are allowed");
//       }
//       if (form.password.length < 8) {
//         throw new Error("Password must be at least 8 characters");
//       }
//       if (form.categories.length === 0) {
//         throw new Error("Select at least one category");
//       }

//       // Check if user exists
//       const { data: existingUser } = await supabase
//         .from("users")
//         .select("email")
//         .eq("email", form.email)
//         .single();

//       if (existingUser) {
//         throw new Error("User already exists. Please login instead.");
//       }

//       console.log("📧 Creating account and sending OTP to:", form.email);

//       // ✅ Use signUp - this sends the "Confirm sign up" email with OTP
//       const { data, error } = await supabase.auth.signUp({
//         email: form.email,
//         password: form.password,
//         options: {
//           emailRedirectTo: undefined, // Prevent redirect
//           data: {
//             full_name: form.name,
//             branch: form.branch,
//             is_mentor: form.is_mentor,
//             categories: form.categories,
//           },
//         },
//       });

//       if (error) throw error;

//       console.log("✅ OTP sent, user created:", data);
//       showMessage(`OTP sent to ${form.email}. Check your email!`, "success");
//       setStep(2);
//     } catch (err) {
//       console.error("❌ Send OTP error:", err);
//       showMessage(err.message, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Verify OTP and save to database
//   const handleVerifyOTP = async () => {
//     setLoading(true);
//     setServerMsg("");

//     try {
//       if (otp.length !== 6) {
//         throw new Error("Please enter a valid 6-digit OTP");
//       }

//       console.log("🔐 Verifying OTP...");

//       // Verify OTP using email type
//       const { data, error } = await supabase.auth.verifyOtp({
//         email: form.email,
//         token: otp,
//         type: "signup", // Use 'signup' type for email confirmation
//       });

//       if (error) throw error;

//       console.log("✅ OTP verified:", data);

//       if (!data.user?.id) {
//         throw new Error("No user ID after verification");
//       }

//       console.log("💾 Saving user data to database...");

//       // Save to users table
//       const { error: dbError } = await supabase.from("users").insert({
//         id: data.user.id,
//         email: form.email,
//         name: form.name,
//         branch: form.branch,
//         is_mentor: form.is_mentor,
//         categories: form.categories,
//       });

//       if (dbError) {
//         // Handle duplicate - update instead
//         if (dbError.code === '23505') {
//           const { error: updateError } = await supabase
//             .from("users")
//             .update({
//               name: form.name,
//               branch: form.branch,
//               is_mentor: form.is_mentor,
//               categories: form.categories,
//             })
//             .eq("id", data.user.id);
          
//           if (updateError) throw updateError;
//         } else {
//           throw dbError;
//         }
//       }

//       console.log("✅ User data saved successfully");

//       // Sign out so user can login with password
//       await supabase.auth.signOut();

//       showMessage("Account created successfully!", "success");
//       setStep(3);

//       setTimeout(() => {
//         console.log("🔄 Redirecting to login...");
//         router.push("/login");
//       }, 2000);

//     } catch (err) {
//       console.error("❌ Verification error:", err);
//       showMessage(err.message || "Invalid or expired OTP", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     setLoading(true);
//     try {
//       // Resend by calling signUp again
//       const { error } = await supabase.auth.resend({
//         type: 'signup',
//         email: form.email,
//       });

//       if (error) throw error;
//       showMessage("OTP resent successfully!", "success");
//     } catch (err) {
//       showMessage("Failed to resend. Try again in 60 seconds.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black px-6 py-8">
//       <div className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-2xl p-8 text-white backdrop-blur-md">
        
//         {/* Step Indicator */}
//         <div className="flex items-center justify-center mb-6 gap-2">
//           <div className={`flex items-center gap-2 ${step >= 1 ? 'text-yellow-400' : 'text-white/40'}`}>
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/40'}`}>
//               {step > 1 ? <CheckCircle className="w-5 h-5" /> : "1"}
//             </div>
//             <span className="text-sm font-medium">Details</span>
//           </div>
//           <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-yellow-400' : 'bg-white/20'}`}></div>
//           <div className={`flex items-center gap-2 ${step >= 2 ? 'text-yellow-400' : 'text-white/40'}`}>
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/40'}`}>
//               {step > 2 ? <CheckCircle className="w-5 h-5" /> : "2"}
//             </div>
//             <span className="text-sm font-medium">Verify</span>
//           </div>
//           <div className={`w-12 h-0.5 ${step >= 3 ? 'bg-yellow-400' : 'bg-white/20'}`}></div>
//           <div className={`flex items-center gap-2 ${step >= 3 ? 'text-yellow-400' : 'text-white/40'}`}>
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/40'}`}>
//               {step >= 3 ? <CheckCircle className="w-5 h-5" /> : "3"}
//             </div>
//             <span className="text-sm font-medium">Done</span>
//           </div>
//         </div>

//         {/* Step 1: Registration Form */}
//         {step === 1 && (
//           <>
//             <h2 className="text-2xl font-bold mb-2">Create your account</h2>
//             <p className="text-white/70 text-sm mb-6">
//               Use your college email (@nitkkr.ac.in)
//             </p>

//             <div className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Full name"
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//               />
//               <input
//                 type="text"
//                 placeholder="Branch (e.g., Computer Science)"
//                 value={form.branch}
//                 onChange={(e) => setForm({ ...form, branch: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//               />
//               <input
//                 type="email"
//                 placeholder="College Email (@nitkkr.ac.in)"
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//               />
//               <input
//                 type="password"
//                 placeholder="Password (min 8 characters)"
//                 value={form.password}
//                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//               />

//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={form.is_mentor}
//                   onChange={(e) => setForm({ ...form, is_mentor: e.target.checked })}
//                   className="w-4 h-4 accent-yellow-400"
//                 />
//                 <span className="text-sm">I want to be a mentor</span>
//               </label>

//               <div>
//                 <h3 className="text-sm font-semibold mb-3">
//                   Select categories of interest *
//                 </h3>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                   {CATEGORIES.map((cat) => (
//                     <label
//                       key={cat}
//                       className={`flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer transition ${
//                         form.categories.includes(cat)
//                           ? "bg-yellow-400/20 border-yellow-400/40"
//                           : "bg-white/5 border-white/10 hover:border-white/30"
//                       }`}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={form.categories.includes(cat)}
//                         onChange={() => toggleCategory(cat)}
//                         className="w-4 h-4 accent-yellow-400"
//                       />
//                       <span className="text-sm">{cat}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <button
//                 onClick={handleSendOTP}
//                 disabled={loading}
//                 className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading && <Loader2 className="h-4 w-4 animate-spin" />}
//                 {loading ? "Sending OTP..." : "Send OTP"}
//               </button>
//             </div>
//           </>
//         )}

//         {/* Step 2: OTP Verification */}
//         {step === 2 && (
//           <div className="text-center">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400/20 rounded-full mb-4">
//               <Mail className="w-8 h-8 text-yellow-400" />
//             </div>
//             <h2 className="text-2xl font-bold mb-2">Verify your email</h2>
//             <p className="text-white/70 text-sm mb-6">
//               We've sent a 6-digit OTP code to<br />
//               <span className="text-yellow-400 font-medium">{form.email}</span>
//             </p>

//             <div className="max-w-sm mx-auto space-y-4">
//               <input
//                 type="text"
//                 placeholder="Enter 6-digit OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-center text-2xl tracking-widest focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//                 maxLength={6}
//                 autoFocus
//               />

//               <button
//                 onClick={handleVerifyOTP}
//                 disabled={loading || otp.length !== 6}
//                 className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading && <Loader2 className="h-4 w-4 animate-spin" />}
//                 {loading ? "Verifying..." : "Verify & Create Account"}
//               </button>

//               <button
//                 onClick={handleResendOTP}
//                 disabled={loading}
//                 className="w-full text-yellow-400 hover:text-yellow-300 text-sm underline disabled:opacity-50"
//               >
//                 Didn't receive OTP? Resend
//               </button>

//               <button
//                 onClick={() => {
//                   setStep(1);
//                   setOtp("");
//                 }}
//                 className="w-full text-white/60 hover:text-white text-sm"
//               >
//                 ← Change email address
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Step 3: Success */}
//         {step === 3 && (
//           <div className="text-center py-8">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-4">
//               <CheckCircle className="w-12 h-12 text-green-400" />
//             </div>
//             <h2 className="text-2xl font-bold mb-2">Account Created!</h2>
//             <p className="text-white/70 text-sm mb-6">
//               Your account has been successfully created.<br />
//               Redirecting to login page...
//             </p>
//             <div className="flex items-center justify-center gap-2 text-yellow-400">
//               <Loader2 className="w-5 h-5 animate-spin" />
//               <span className="text-sm">Please wait</span>
//             </div>
//           </div>
//         )}

//         {/* Message Display */}
//         {serverMsg && (
//           <div className={`mt-4 p-3 rounded-lg border text-sm ${
//             msgType === "success" 
//               ? "bg-green-500/10 border-green-500/30 text-green-400"
//               : "bg-red-500/10 border-red-500/30 text-red-400"
//           }`}>
//             {serverMsg}
//           </div>
//         )}

//         {/* Login Link */}
//         {step === 1 && (
//           <p className="text-center text-sm text-white/60 mt-6">
//             Already have an account?{" "}
//             <a href="/login" className="text-yellow-400 hover:text-yellow-300 underline">
//               Log in
//             </a>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }  









// "use client";

// import React, { useState } from "react";
// import { Loader2, CheckCircle, Mail } from "lucide-react";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// const CATEGORIES = [
//   "Technology", "Startup", "Finance", "GATE", "UPSC", "Acting",
//   "AI/ML", "Photography", "Robotics", "Web Development", "DSA", "Art"
// ];

// export default function SignUpPage() {
//   const router = useRouter();
//   const [step, setStep] = useState(1);
//   const [form, setForm] = useState({
//     name: "",
//     branch: "",
//     email: "",
//     password: "",
//     is_mentor: false,
//     categories: [],
//   });
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [serverMsg, setServerMsg] = useState("");
//   const [msgType, setMsgType] = useState("");

//   const toggleCategory = (cat) => {
//     setForm((prev) => ({
//       ...prev,
//       categories: prev.categories.includes(cat)
//         ? prev.categories.filter((c) => c !== cat)
//         : [...prev.categories, cat],
//     }));
//   };

//   const showMessage = (msg, type = "error") => {
//     setServerMsg(msg);
//     setMsgType(type);
//   };

//   // ✅ FIXED: Use signUp() instead of signInWithOtp()
//   // const handleSendOTP = async () => {
//   //   setLoading(true);
//   //   setServerMsg("");

//   //   try {
//   //     // Validate
//   //     if (!form.name.trim()) throw new Error("Full name is required");
//   //     if (!form.email.endsWith("@nitkkr.ac.in")) {
//   //       throw new Error("Only @nitkkr.ac.in emails are allowed");
//   //     }
//   //     if (form.password.length < 8) {
//   //       throw new Error("Password must be at least 8 characters");
//   //     }
//   //     if (form.categories.length === 0) {
//   //       throw new Error("Select at least one category");
//   //     }

//   //     // Check if user exists
//   //     const { data: existingUser } = await supabase
//   //       .from("users")
//   //       .select("email")
//   //       .eq("email", form.email)
//   //       .single();

//   //     if (existingUser) {
//   //       throw new Error("User already exists. Please login instead.");
//   //     }

//   //     console.log("📧 Creating account and sending OTP to:", form.email);

//   //     // ✅ Use signUp - this sends the "Confirm sign up" email with OTP
//   //     const { data, error } = await supabase.auth.signUp({
//   //       email: form.email,
//   //       password: form.password,
//   //       options: {
//   //         emailRedirectTo: undefined, // Prevent redirect
//   //         data: {
//   //           full_name: form.name,
//   //           branch: form.branch,
//   //           is_mentor: form.is_mentor,
//   //           categories: form.categories,
//   //         },
//   //       },
//   //     });

//   //     if (error) throw error;

//   //     console.log("✅ OTP sent, user created:", data);
//   //     showMessage(`OTP sent to ${form.email}. Check your email!`, "success");
//   //     setStep(2);
//   //   } catch (err) {
//   //     console.error("❌ Send OTP error:", err);
//   //     showMessage(err.message, "error");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };



//   const handleSendOTP = async () => {
//   setLoading(true);
//   setServerMsg("");

//   try {
//     if (!form.name.trim()) throw new Error("Full name is required");
//     if (!form.email.endsWith("@nitkkr.ac.in"))
//       throw new Error("Only @nitkkr.ac.in emails are allowed");
//     if (form.password.length < 8)
//       throw new Error("Password must be at least 8 characters");
//     if (form.categories.length === 0)
//       throw new Error("Select at least one category");

//     const { error } = await supabase.auth.signUp({
//       email: form.email,
//       password: form.password,
//       options: {
//         data: {
//           full_name: form.name,
//           branch: form.branch,
//           is_mentor: form.is_mentor,
//           categories: form.categories,
//         },
//       },
//     });

//     if (error) throw error;

//     showMessage(`OTP sent to ${form.email}`, "success");
//     setStep(2);
//   } catch (err) {
//     showMessage(err.message, "error");
//   } finally {
//     setLoading(false);
//   }
// };


//   // ✅ Verify OTP and save to database
//   const handleVerifyOTP = async () => {
//     setLoading(true);
//     setServerMsg("");

//     try {
//       if (otp.length !== 6) {
//         throw new Error("Please enter a valid 6-digit OTP");
//       }

//       console.log("🔐 Verifying OTP...");

//       // Verify OTP using email type
//       const { data, error } = await supabase.auth.verifyOtp({
//         email: form.email,
//         token: otp,
//         type: "signup", // Use 'signup' type for email confirmation
//       });

//       if (error) throw error;

//       console.log("✅ OTP verified:", data);

//       if (!data.user?.id) {
//         throw new Error("No user ID after verification");
//       }

//       console.log("💾 Saving user data to database...");

//       // Use upsert to handle both insert and update
//       const { error: dbError } = await supabase.from("users").upsert(
//         {
//           id: data.user.id,
//           email: form.email,
//           name: form.name,
//           branch: form.branch,
//           is_mentor: form.is_mentor,
//           categories: form.categories,
//         },
//         {
//           onConflict: 'id', // Handle conflict on id column
//           ignoreDuplicates: false, // Update if exists
//         }
//       );

//       if (dbError) {
//         console.error("Database error:", dbError);
//         throw dbError;
//       }

//       console.log("✅ User data saved successfully");

//       // Sign out so user can login with password
//       await supabase.auth.signOut();

//       showMessage("Account created successfully!", "success");
//       setStep(3);

//       setTimeout(() => {
//         console.log("🔄 Redirecting to login...");
//         router.push("/login");
//       }, 2000);

//     } catch (err) {
//       console.error("❌ Verification error:", err);
//       showMessage(err.message || "Invalid or expired OTP", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     setLoading(true);
//     try {
//       // Resend by calling signUp again
//       const { error } = await supabase.auth.resend({
//         type: 'signup',
//         email: form.email,
//       });

//       if (error) throw error;
//       showMessage("OTP resent successfully!", "success");
//     } catch (err) {
//       showMessage("Failed to resend. Try again in 60 seconds.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black px-6 py-8">
//       <div className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-2xl p-8 text-white backdrop-blur-md">
        
//         {/* Step Indicator */}
//         <div className="flex items-center justify-center mb-6 gap-2">
//           <div className={`flex items-center gap-2 ${step >= 1 ? 'text-yellow-400' : 'text-white/40'}`}>
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/40'}`}>
//               {step > 1 ? <CheckCircle className="w-5 h-5" /> : "1"}
//             </div>
//             <span className="text-sm font-medium">Details</span>
//           </div>
//           <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-yellow-400' : 'bg-white/20'}`}></div>
//           <div className={`flex items-center gap-2 ${step >= 2 ? 'text-yellow-400' : 'text-white/40'}`}>
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/40'}`}>
//               {step > 2 ? <CheckCircle className="w-5 h-5" /> : "2"}
//             </div>
//             <span className="text-sm font-medium">Verify</span>
//           </div>
//           <div className={`w-12 h-0.5 ${step >= 3 ? 'bg-yellow-400' : 'bg-white/20'}`}></div>
//           <div className={`flex items-center gap-2 ${step >= 3 ? 'text-yellow-400' : 'text-white/40'}`}>
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/40'}`}>
//               {step >= 3 ? <CheckCircle className="w-5 h-5" /> : "3"}
//             </div>
//             <span className="text-sm font-medium">Done</span>
//           </div>
//         </div>

//         {/* Step 1: Registration Form */}
//         {step === 1 && (
//           <>
//             <h2 className="text-2xl font-bold mb-2">Create your account</h2>
//             <p className="text-white/70 text-sm mb-6">
//               Use your college email (@nitkkr.ac.in)
//             </p>

//             <div className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Full name"
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//               />
//               <input
//                 type="text"
//                 placeholder="Branch (e.g., Computer Science)"
//                 value={form.branch}
//                 onChange={(e) => setForm({ ...form, branch: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//               />
//               <input
//                 type="email"
//                 placeholder="College Email (@nitkkr.ac.in)"
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//               />
//               <input
//                 type="password"
//                 placeholder="Password (min 8 characters)"
//                 value={form.password}
//                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//               />

//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={form.is_mentor}
//                   onChange={(e) => setForm({ ...form, is_mentor: e.target.checked })}
//                   className="w-4 h-4 accent-yellow-400"
//                 />
//                 <span className="text-sm">I want to be a mentor</span>
//               </label>

//               <div>
//                 <h3 className="text-sm font-semibold mb-3">
//                   Select categories of interest *
//                 </h3>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                   {CATEGORIES.map((cat) => (
//                     <label
//                       key={cat}
//                       className={`flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer transition ${
//                         form.categories.includes(cat)
//                           ? "bg-yellow-400/20 border-yellow-400/40"
//                           : "bg-white/5 border-white/10 hover:border-white/30"
//                       }`}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={form.categories.includes(cat)}
//                         onChange={() => toggleCategory(cat)}
//                         className="w-4 h-4 accent-yellow-400"
//                       />
//                       <span className="text-sm">{cat}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <button
//                 onClick={handleSendOTP}
//                 disabled={loading}
//                 className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading && <Loader2 className="h-4 w-4 animate-spin" />}
//                 {loading ? "Sending OTP..." : "Send OTP"}
//               </button>
//             </div>
//           </>
//         )}

//         {/* Step 2: OTP Verification */}
//         {step === 2 && (
//           <div className="text-center">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400/20 rounded-full mb-4">
//               <Mail className="w-8 h-8 text-yellow-400" />
//             </div>
//             <h2 className="text-2xl font-bold mb-2">Verify your email</h2>
//             <p className="text-white/70 text-sm mb-6">
//               We've sent a 6-digit OTP code to<br />
//               <span className="text-yellow-400 font-medium">{form.email}</span>
//             </p>

//             <div className="max-w-sm mx-auto space-y-4">
//               <input
//                 type="text"
//                 placeholder="Enter 6-digit OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-center text-2xl tracking-widest focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//                 maxLength={6}
//                 autoFocus
//               />

//               <button
//                 onClick={handleVerifyOTP}
//                 disabled={loading || otp.length !== 6}
//                 className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading && <Loader2 className="h-4 w-4 animate-spin" />}
//                 {loading ? "Verifying..." : "Verify & Create Account"}
//               </button>

//               <button
//                 onClick={handleResendOTP}
//                 disabled={loading}
//                 className="w-full text-yellow-400 hover:text-yellow-300 text-sm underline disabled:opacity-50"
//               >
//                 Didn't receive OTP? Resend
//               </button>

//               <button
//                 onClick={() => {
//                   setStep(1);
//                   setOtp("");
//                 }}
//                 className="w-full text-white/60 hover:text-white text-sm"
//               >
//                 ← Change email address
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Step 3: Success */}
//         {step === 3 && (
//           <div className="text-center py-8">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-4">
//               <CheckCircle className="w-12 h-12 text-green-400" />
//             </div>
//             <h2 className="text-2xl font-bold mb-2">Account Created!</h2>
//             <p className="text-white/70 text-sm mb-6">
//               Your account has been successfully created.<br />
//               Redirecting to login page...
//             </p>
//             <div className="flex items-center justify-center gap-2 text-yellow-400">
//               <Loader2 className="w-5 h-5 animate-spin" />
//               <span className="text-sm">Please wait</span>
//             </div>
//           </div>
//         )}

//         {/* Message Display */}
//         {serverMsg && (
//           <div className={`mt-4 p-3 rounded-lg border text-sm ${
//             msgType === "success" 
//               ? "bg-green-500/10 border-green-500/30 text-green-400"
//               : "bg-red-500/10 border-red-500/30 text-red-400"
//           }`}>
//             {serverMsg}
//           </div>
//         )}

//         {/* Login Link */}
//         {step === 1 && (
//           <p className="text-center text-sm text-white/60 mt-6">
//             Already have an account?{" "}
//             <a href="/login" className="text-yellow-400 hover:text-yellow-300 underline">
//               Log in
//             </a>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }







// "use client";

// import React, { useState } from "react";
// import { Loader2, CheckCircle, Mail } from "lucide-react";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// const CATEGORIES = [
//   "Technology", "Startup", "Finance", "GATE", "UPSC", "Acting",
//   "AI/ML", "Photography", "Robotics", "Web Development", "DSA", "Art"
// ];

// export default function SignUpPage() {
//   const router = useRouter();
//   const [step, setStep] = useState(1);
//   const [form, setForm] = useState({
//     name: "",
//     branch: "",
//     email: "",
//     password: "",
//     is_mentor: false,
//     categories: [],
//   });
//   const [loading, setLoading] = useState(false);
//   const [serverMsg, setServerMsg] = useState("");
//   const [msgType, setMsgType] = useState("");

//   const toggleCategory = (cat) => {
//     setForm((prev) => ({
//       ...prev,
//       categories: prev.categories.includes(cat)
//         ? prev.categories.filter((c) => c !== cat)
//         : [...prev.categories, cat],
//     }));
//   };

//   const showMessage = (msg, type = "error") => {
//     setServerMsg(msg);
//     setMsgType(type);
//   };

//   const handleSignUp = async () => {
//     setLoading(true);
//     setServerMsg("");

//     try {
//       // Validate
//       if (!form.name.trim()) throw new Error("Full name is required");
//       if (!form.email.endsWith("@nitkkr.ac.in")) {
//         throw new Error("Only @nitkkr.ac.in emails are allowed");
//       }
//       if (form.password.length < 8) {
//         throw new Error("Password must be at least 8 characters");
//       }
//       if (form.categories.length === 0) {
//         throw new Error("Select at least one category");
//       }

//       // Check if user exists
//       const { data: existingUser } = await supabase
//         .from("users")
//         .select("email")
//         .eq("email", form.email)
//         .maybeSingle();

//       if (existingUser) {
//         throw new Error("User already exists. Please login instead.");
//       }

//       console.log("📧 Sending magic link to:", form.email);

//       // Send magic link for signup
//       const { data, error } = await supabase.auth.signInWithOtp({
//         email: form.email,
//         options: {
//           emailRedirectTo: `${window.location.origin}/auth/callback`,
//           data: {
//             full_name: form.name,
//             branch: form.branch,
//             is_mentor: form.is_mentor,
//             categories: form.categories,
//             password: form.password,
//             signup_mode: true,
//           },
//         },
//       });

//       if (error) throw error;

//       console.log("✅ Magic link sent:", data);
//       showMessage("Check your email for the verification link!", "success");
//       setStep(2);
//     } catch (err) {
//       console.error("❌ Signup error:", err);
//       showMessage(err.message, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendLink = async () => {
//     setLoading(true);
//     try {
//       const { error } = await supabase.auth.signInWithOtp({
//         email: form.email,
//         options: {
//           emailRedirectTo: `${window.location.origin}/auth/callback`,
//           data: {
//             full_name: form.name,
//             branch: form.branch,
//             is_mentor: form.is_mentor,
//             categories: form.categories,
//             password: form.password,
//             signup_mode: true,
//           },
//         },
//       });

//       if (error) throw error;
//       showMessage("Verification link resent successfully!", "success");
//     } catch (err) {
//       showMessage("Failed to resend. Try again in 60 seconds.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black px-6 py-8">
//       <div className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-2xl p-8 text-white backdrop-blur-md">
        
//         {/* Step Indicator */}
//         <div className="flex items-center justify-center mb-6 gap-2">
//           <div className={`flex items-center gap-2 ${step >= 1 ? 'text-yellow-400' : 'text-white/40'}`}>
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/40'}`}>
//               {step > 1 ? <CheckCircle className="w-5 h-5" /> : "1"}
//             </div>
//             <span className="text-sm font-medium">Details</span>
//           </div>
//           <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-yellow-400' : 'bg-white/20'}`}></div>
//           <div className={`flex items-center gap-2 ${step >= 2 ? 'text-yellow-400' : 'text-white/40'}`}>
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/40'}`}>
//               {step >= 2 ? <CheckCircle className="w-5 h-5" /> : "2"}
//             </div>
//             <span className="text-sm font-medium">Verify Email</span>
//           </div>
//         </div>

//         {/* Step 1: Registration Form */}
//         {step === 1 && (
//           <>
//             <h2 className="text-2xl font-bold mb-2">Create your account</h2>
//             <p className="text-white/70 text-sm mb-6">
//               Use your college email (@nitkkr.ac.in)
//             </p>

//             <div className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Full name"
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//               />
//               <input
//                 type="text"
//                 placeholder="Branch (e.g., Computer Science)"
//                 value={form.branch}
//                 onChange={(e) => setForm({ ...form, branch: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//               />
//               <input
//                 type="email"
//                 placeholder="College Email (@nitkkr.ac.in)"
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//               />
//               <input
//                 type="password"
//                 placeholder="Password (min 8 characters)"
//                 value={form.password}
//                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//               />

//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={form.is_mentor}
//                   onChange={(e) => setForm({ ...form, is_mentor: e.target.checked })}
//                   className="w-4 h-4 accent-yellow-400"
//                 />
//                 <span className="text-sm">I want to be a mentor</span>
//               </label>

//               <div>
//                 <h3 className="text-sm font-semibold mb-3">
//                   Select categories of interest *
//                 </h3>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                   {CATEGORIES.map((cat) => (
//                     <label
//                       key={cat}
//                       className={`flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer transition ${
//                         form.categories.includes(cat)
//                           ? "bg-yellow-400/20 border-yellow-400/40"
//                           : "bg-white/5 border-white/10 hover:border-white/30"
//                       }`}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={form.categories.includes(cat)}
//                         onChange={() => toggleCategory(cat)}
//                         className="w-4 h-4 accent-yellow-400"
//                       />
//                       <span className="text-sm">{cat}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <button
//                 onClick={handleSignUp}
//                 disabled={loading}
//                 className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading && <Loader2 className="h-4 w-4 animate-spin" />}
//                 {loading ? "Sending Link..." : "Sign Up"}
//               </button>
//             </div>
//           </>
//         )}

//         {/* Step 2: Check Email */}
//         {step === 2 && (
//           <div className="text-center">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400/20 rounded-full mb-4">
//               <Mail className="w-8 h-8 text-yellow-400" />
//             </div>
//             <h2 className="text-2xl font-bold mb-2">Check your email</h2>
//             <p className="text-white/70 text-sm mb-6">
//               We've sent a verification link to<br />
//               <span className="text-yellow-400 font-medium">{form.email}</span>
//             </p>

//             <div className="max-w-md mx-auto space-y-4 text-left">
//               <div className="bg-white/5 border border-white/10 rounded-lg p-4">
//                 <h3 className="font-semibold mb-2 flex items-center gap-2">
//                   <CheckCircle className="w-5 h-5 text-yellow-400" />
//                   Next Steps:
//                 </h3>
//                 <ol className="text-sm text-white/70 space-y-2 ml-7">
//                   <li>1. Check your email inbox</li>
//                   <li>2. Click the verification link</li>
//                   <li>3. You'll be automatically logged in</li>
//                 </ol>
//               </div>

//               <button
//                 onClick={handleResendLink}
//                 disabled={loading}
//                 className="w-full text-yellow-400 hover:text-yellow-300 text-sm underline disabled:opacity-50"
//               >
//                 Didn't receive the email? Resend
//               </button>

//               <button
//                 onClick={() => {
//                   setStep(1);
//                 }}
//                 className="w-full text-white/60 hover:text-white text-sm"
//               >
//                 ← Change email address
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Message Display */}
//         {serverMsg && (
//           <div className={`mt-4 p-3 rounded-lg border text-sm ${
//             msgType === "success" 
//               ? "bg-green-500/10 border-green-500/30 text-green-400"
//               : "bg-red-500/10 border-red-500/30 text-red-400"
//           }`}>
//             {serverMsg}
//           </div>
//         )}

//         {/* Login Link */}
//         {step === 1 && (
//           <p className="text-center text-sm text-white/60 mt-6">
//             Already have an account?{" "}
//             <a href="/login" className="text-yellow-400 hover:text-yellow-300 underline">
//               Log in
//             </a>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }








// "use client";

// import React, { useState } from "react";
// import { Loader2, CheckCircle, Mail } from "lucide-react";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// const CATEGORIES = [
//   "Technology", "Startup", "Finance", "GATE", "UPSC", "Acting",
//   "AI/ML", "Photography", "Robotics", "Web Development", "DSA", "Art"
// ];

// export default function SignUpPage() {
//   const router = useRouter();
//   const [step, setStep] = useState(1);
//   const [form, setForm] = useState({
//     name: "",
//     branch: "",
//     email: "",
//     password: "",
//     is_mentor: false,
//     categories: [],
//   });
//   const [loading, setLoading] = useState(false);
//   const [serverMsg, setServerMsg] = useState("");
//   const [msgType, setMsgType] = useState("");

//   const toggleCategory = (cat) => {
//     setForm((prev) => ({
//       ...prev,
//       categories: prev.categories.includes(cat)
//         ? prev.categories.filter((c) => c !== cat)
//         : [...prev.categories, cat],
//     }));
//   };

//   const showMessage = (msg, type = "error") => {
//     setServerMsg(msg);
//     setMsgType(type);
//   };

//   const handleSignUp = async () => {
//     setLoading(true);
//     setServerMsg("");

//     try {
//       // Validate
//       if (!form.name.trim()) throw new Error("Full name is required");
      
//       // Accept both college and personal emails for testing
//       const isCollegeEmail = form.email.endsWith("@nitkkr.ac.in");
//       const isGmail = form.email.endsWith("@gmail.com");
//       const isPersonalEmail = form.email.includes("@") && (isGmail || form.email.endsWith("@yahoo.com") || form.email.endsWith("@outlook.com"));
      
//       if (!isCollegeEmail && !isPersonalEmail) {
//         throw new Error("Please use your college email (@nitkkr.ac.in) or a valid personal email for testing");
//       }
      
//       if (form.password.length < 8) {
//         throw new Error("Password must be at least 8 characters");
//       }
//       if (form.categories.length === 0) {
//         throw new Error("Select at least one category");
//       }

//       // Check if user exists
//       const { data: existingUser } = await supabase
//         .from("users")
//         .select("email")
//         .eq("email", form.email)
//         .maybeSingle();

//       if (existingUser) {
//         throw new Error("User already exists. Please login instead.");
//       }

//       console.log("📧 Sending magic link to:", form.email);
//       console.log("🔧 Redirect URL:", `${window.location.origin}/auth/callback`);

//       // Send magic link for signup
//       const { data, error } = await supabase.auth.signInWithOtp({
//         email: form.email,
//         options: {
//           emailRedirectTo: `${window.location.origin}/auth/callback`,
//           data: {
//             full_name: form.name,
//             branch: form.branch,
//             is_mentor: form.is_mentor,
//             categories: form.categories,
//             password: form.password,
//             signup_mode: true,
//           },
//         },
//       });

//       console.log("📬 Supabase Response:", { data, error });

//       if (error) {
//         console.error("❌ Error details:", JSON.stringify(error, null, 2));
//         throw error;
//       }

//       console.log("✅ Magic link sent successfully");
      
//       if (isPersonalEmail && !isCollegeEmail) {
//         showMessage("Check your personal email for the verification link! (Testing mode)", "success");
//       } else {
//         showMessage("Check your email for the verification link!", "success");
//       }
      
//       setStep(2);
//     } catch (err) {
//       console.error("❌ Signup error:", err);
//       showMessage(err.message, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendLink = async () => {
//     setLoading(true);
//     try {
//       const { error } = await supabase.auth.signInWithOtp({
//         email: form.email,
//         options: {
//           emailRedirectTo: `${window.location.origin}/auth/callback`,
//           data: {
//             full_name: form.name,
//             branch: form.branch,
//             is_mentor: form.is_mentor,
//             categories: form.categories,
//             password: form.password,
//             signup_mode: true,
//           },
//         },
//       });

//       if (error) throw error;
//       showMessage("Verification link resent successfully!", "success");
//     } catch (err) {
//       showMessage("Failed to resend. Wait 60 seconds before trying again.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black px-6 py-8">
//       <div className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-2xl p-8 text-white backdrop-blur-md">
        
//         {/* Step Indicator */}
//         <div className="flex items-center justify-center mb-6 gap-2">
//           <div className={`flex items-center gap-2 ${step >= 1 ? 'text-yellow-400' : 'text-white/40'}`}>
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/40'}`}>
//               {step > 1 ? <CheckCircle className="w-5 h-5" /> : "1"}
//             </div>
//             <span className="text-sm font-medium">Details</span>
//           </div>
//           <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-yellow-400' : 'bg-white/20'}`}></div>
//           <div className={`flex items-center gap-2 ${step >= 2 ? 'text-yellow-400' : 'text-white/40'}`}>
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/40'}`}>
//               {step >= 2 ? <CheckCircle className="w-5 h-5" /> : "2"}
//             </div>
//             <span className="text-sm font-medium">Verify Email</span>
//           </div>
//         </div>

//         {/* Step 1: Registration Form */}
//         {step === 1 && (
//           <>
//             <h2 className="text-2xl font-bold mb-2">Create your account</h2>
//             <p className="text-white/70 text-sm mb-6">
//               Use your college email (@nitkkr.ac.in) or personal email for testing
//             </p>

//             <div className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Full name"
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//               />
//               <input
//                 type="text"
//                 placeholder="Branch (e.g., Computer Science)"
//                 value={form.branch}
//                 onChange={(e) => setForm({ ...form, branch: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//               />
//               <div>
//                 <input
//                   type="email"
//                   placeholder="Email (college or personal)"
//                   value={form.email}
//                   onChange={(e) => setForm({ ...form, email: e.target.value })}
//                   className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//                 />
//                 <p className="text-xs text-yellow-400/70 mt-1 ml-1">
//                   💡 Testing mode: You can use Gmail, Yahoo, or Outlook
//                 </p>
//               </div>
//               <input
//                 type="password"
//                 placeholder="Password (min 8 characters)"
//                 value={form.password}
//                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//               />

//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={form.is_mentor}
//                   onChange={(e) => setForm({ ...form, is_mentor: e.target.checked })}
//                   className="w-4 h-4 accent-yellow-400"
//                 />
//                 <span className="text-sm">I want to be a mentor</span>
//               </label>

//               <div>
//                 <h3 className="text-sm font-semibold mb-3">
//                   Select categories of interest *
//                 </h3>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                   {CATEGORIES.map((cat) => (
//                     <label
//                       key={cat}
//                       className={`flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer transition ${
//                         form.categories.includes(cat)
//                           ? "bg-yellow-400/20 border-yellow-400/40"
//                           : "bg-white/5 border-white/10 hover:border-white/30"
//                       }`}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={form.categories.includes(cat)}
//                         onChange={() => toggleCategory(cat)}
//                         className="w-4 h-4 accent-yellow-400"
//                       />
//                       <span className="text-sm">{cat}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <button
//                 onClick={handleSignUp}
//                 disabled={loading}
//                 className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading && <Loader2 className="h-4 w-4 animate-spin" />}
//                 {loading ? "Sending Link..." : "Sign Up"}
//               </button>
//             </div>
//           </>
//         )}

//         {/* Step 2: Check Email */}
//         {step === 2 && (
//           <div className="text-center">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400/20 rounded-full mb-4">
//               <Mail className="w-8 h-8 text-yellow-400" />
//             </div>
//             <h2 className="text-2xl font-bold mb-2">Check your email</h2>
//             <p className="text-white/70 text-sm mb-6">
//               We've sent a verification link to<br />
//               <span className="text-yellow-400 font-medium">{form.email}</span>
//             </p>

//             <div className="max-w-md mx-auto space-y-4 text-left">
//               <div className="bg-white/5 border border-white/10 rounded-lg p-4">
//                 <h3 className="font-semibold mb-2 flex items-center gap-2">
//                   <CheckCircle className="w-5 h-5 text-yellow-400" />
//                   Next Steps:
//                 </h3>
//                 <ol className="text-sm text-white/70 space-y-2 ml-7">
//                   <li>1. Check your email inbox (and spam folder)</li>
//                   <li>2. Click the verification link</li>
//                   <li>3. You'll be automatically logged in</li>
//                 </ol>
//               </div>

//               <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-3 text-sm">
//                 <p className="text-yellow-400 font-medium mb-1">⚠️ Troubleshooting:</p>
//                 <ul className="text-white/70 space-y-1 ml-4">
//                   <li>• Check spam/junk folder</li>
//                   <li>• Wait 60 seconds before resending</li>
//                   <li>• Make sure email is correct</li>
//                 </ul>
//               </div>

//               <button
//                 onClick={handleResendLink}
//                 disabled={loading}
//                 className="w-full text-yellow-400 hover:text-yellow-300 text-sm underline disabled:opacity-50"
//               >
//                 {loading ? "Sending..." : "Didn't receive the email? Resend"}
//               </button>

//               <button
//                 onClick={() => {
//                   setStep(1);
//                 }}
//                 className="w-full text-white/60 hover:text-white text-sm"
//               >
//                 ← Change email address
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Message Display */}
//         {serverMsg && (
//           <div className={`mt-4 p-3 rounded-lg border text-sm ${
//             msgType === "success" 
//               ? "bg-green-500/10 border-green-500/30 text-green-400"
//               : "bg-red-500/10 border-red-500/30 text-red-400"
//           }`}>
//             {serverMsg}
//           </div>
//         )}

//         {/* Login Link */}
//         {step === 1 && (
//           <p className="text-center text-sm text-white/60 mt-6">
//             Already have an account?{" "}
//             <a href="/login" className="text-yellow-400 hover:text-yellow-300 underline">
//               Log in
//             </a>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }





// "use client";

// import React, { useState } from "react";
// import { Loader2, CheckCircle, Mail } from "lucide-react";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// const CATEGORIES = [
//   "Technology", "Startup", "Finance", "GATE", "UPSC", "Acting",
//   "AI/ML", "Photography", "Robotics", "Web Development", "DSA", "Art"
// ];

// export default function SignUpPage() {
//   const router = useRouter();
//   const [step, setStep] = useState(1);
//   const [form, setForm] = useState({
//     name: "",
//     branch: "",
//     email: "",
//     password: "",
//     is_mentor: false,
//     categories: [],
//   });
//   const [loading, setLoading] = useState(false);
//   const [serverMsg, setServerMsg] = useState("");
//   const [msgType, setMsgType] = useState("");

//   const toggleCategory = (cat) => {
//     setForm((prev) => ({
//       ...prev,
//       categories: prev.categories.includes(cat)
//         ? prev.categories.filter((c) => c !== cat)
//         : [...prev.categories, cat],
//     }));
//   };

//   const showMessage = (msg, type = "error") => {
//     setServerMsg(msg);
//     setMsgType(type);
//   };

//   const handleSignUp = async () => {
//     setLoading(true);
//     setServerMsg("");

//     try {
//       // Validate
//       if (!form.name.trim()) throw new Error("Full name is required");
      
//       // Accept both college and personal emails for testing
//       const isCollegeEmail = form.email.endsWith("@nitkkr.ac.in");
//       const isGmail = form.email.endsWith("@gmail.com");
//       const isPersonalEmail = form.email.includes("@") && (isGmail || form.email.endsWith("@yahoo.com") || form.email.endsWith("@outlook.com"));
      
//       if (!isCollegeEmail && !isPersonalEmail) {
//         throw new Error("Please use your college email (@nitkkr.ac.in) or a valid personal email for testing");
//       }
      
//       if (form.password.length < 8) {
//         throw new Error("Password must be at least 8 characters");
//       }
//       if (form.categories.length === 0) {
//         throw new Error("Select at least one category");
//       }

//       // Check if user exists
//       const { data: existingUser } = await supabase
//         .from("users")
//         .select("email")
//         .eq("email", form.email)
//         .maybeSingle();

//       if (existingUser) {
//         throw new Error("User already exists. Please login instead.");
//       }

//       console.log("📧 Testing direct signup first...");
      
//       // TEST MODE: Try direct signup without magic link
//       const testDirectSignup = false; // Set to true to test
      
//       if (testDirectSignup) {
//         console.log("🧪 Using direct signup (no magic link)");
//         const { data: signupData, error: signupError } = await supabase.auth.signUp({
//           email: form.email,
//           password: form.password,
//           options: {
//             data: {
//               full_name: form.name,
//               branch: form.branch,
//               is_mentor: form.is_mentor,
//               categories: form.categories,
//             },
//           },
//         });

//         if (signupError) {
//           console.error("❌ Direct signup error:", signupError);
//           throw signupError;
//         }

//         console.log("✅ Direct signup success:", signupData);
        
//         // Create user record
//         if (signupData.user) {
//           const { error: dbError } = await supabase.from('users').upsert({
//             id: signupData.user.id,
//             email: form.email,
//             name: form.name,
//             branch: form.branch,
//             is_mentor: form.is_mentor,
//             categories: form.categories,
//           });

//           if (dbError) {
//             console.error("❌ DB Error:", dbError);
//             throw dbError;
//           }

//           showMessage("Account created! Check email to verify.", "success");
//           setStep(2);
//           return;
//         }
//       }
      
//       console.log("📧 Sending magic link to:", form.email);
//       console.log("🔧 Redirect URL:", `${window.location.origin}/auth/callback`);

//       // First, try to check if user already exists in auth
//       const { data: existingAuthUser } = await supabase.auth.admin.listUsers();
//       const userExists = existingAuthUser?.users?.some(u => u.email === form.email);
      
//       if (userExists) {
//         console.log("⚠️ User exists in auth.users, deleting first...");
//         // Get user ID
//         const user = existingAuthUser.users.find(u => u.email === form.email);
//         if (user) {
//           // Delete from public.users first
//           await supabase.from('users').delete().eq('email', form.email);
//           // Note: We can't delete from auth.users via client, must be done via SQL
//         }
//         throw new Error("User already exists. Please delete via SQL Editor and try again.");
//       }

//       // Send magic link for signup
//       const { data, error } = await supabase.auth.signInWithOtp({
//         email: form.email,
//         options: {
//           shouldCreateUser: true, // Explicitly allow user creation
//           emailRedirectTo: `${window.location.origin}/auth/callback`,
//           data: {
//             full_name: form.name,
//             branch: form.branch,
//             is_mentor: form.is_mentor,
//             categories: form.categories,
//             password: form.password,
//             signup_mode: true,
//           },
//         },
//       });

//       console.log("📬 Supabase Response:", { data, error });

//       if (error) {
//         console.error("❌ Error details:", JSON.stringify(error, null, 2));
//         console.error("❌ Error name:", error.name);
//         console.error("❌ Error status:", error.status);
//         console.error("❌ Error code:", error.code);
        
//         // Provide specific error messages
//         if (error.status === 500) {
//           throw new Error("Server error. Please check: 1) Database triggers 2) RLS policies 3) Try with a different email");
//         }
        
//         throw error;
//       }

//       console.log("✅ Magic link sent successfully");
      
//       if (isPersonalEmail && !isCollegeEmail) {
//         showMessage("Check your personal email for the verification link! (Testing mode)", "success");
//       } else {
//         showMessage("Check your email for the verification link!", "success");
//       }
      
//       setStep(2);
//     } catch (err) {
//       console.error("❌ Signup error:", err);
//       showMessage(err.message, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendLink = async () => {
//     setLoading(true);
//     try {
//       const { error } = await supabase.auth.signInWithOtp({
//         email: form.email,
//         options: {
//           emailRedirectTo: `${window.location.origin}/auth/callback`,
//           data: {
//             full_name: form.name,
//             branch: form.branch,
//             is_mentor: form.is_mentor,
//             categories: form.categories,
//             password: form.password,
//             signup_mode: true,
//           },
//         },
//       });

//       if (error) throw error;
//       showMessage("Verification link resent successfully!", "success");
//     } catch (err) {
//       showMessage("Failed to resend. Wait 60 seconds before trying again.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black px-6 py-8">
//       <div className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-2xl p-8 text-white backdrop-blur-md">
        
//         {/* Step Indicator */}
//         <div className="flex items-center justify-center mb-6 gap-2">
//           <div className={`flex items-center gap-2 ${step >= 1 ? 'text-yellow-400' : 'text-white/40'}`}>
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/40'}`}>
//               {step > 1 ? <CheckCircle className="w-5 h-5" /> : "1"}
//             </div>
//             <span className="text-sm font-medium">Details</span>
//           </div>
//           <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-yellow-400' : 'bg-white/20'}`}></div>
//           <div className={`flex items-center gap-2 ${step >= 2 ? 'text-yellow-400' : 'text-white/40'}`}>
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/40'}`}>
//               {step >= 2 ? <CheckCircle className="w-5 h-5" /> : "2"}
//             </div>
//             <span className="text-sm font-medium">Verify Email</span>
//           </div>
//         </div>

//         {/* Step 1: Registration Form */}
//         {step === 1 && (
//           <>
//             <h2 className="text-2xl font-bold mb-2">Create your account</h2>
//             <p className="text-white/70 text-sm mb-6">
//               Use your college email (@nitkkr.ac.in) or personal email for testing
//             </p>

//             <div className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Full name"
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//               />
//               <input
//                 type="text"
//                 placeholder="Branch (e.g., Computer Science)"
//                 value={form.branch}
//                 onChange={(e) => setForm({ ...form, branch: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//               />
//               <div>
//                 <input
//                   type="email"
//                   placeholder="Email (college or personal)"
//                   value={form.email}
//                   onChange={(e) => setForm({ ...form, email: e.target.value })}
//                   className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//                 />
//                 <p className="text-xs text-yellow-400/70 mt-1 ml-1">
//                   💡 Testing mode: You can use Gmail, Yahoo, or Outlook
//                 </p>
//               </div>
//               <input
//                 type="password"
//                 placeholder="Password (min 8 characters)"
//                 value={form.password}
//                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white placeholder:text-white/50"
//               />

//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={form.is_mentor}
//                   onChange={(e) => setForm({ ...form, is_mentor: e.target.checked })}
//                   className="w-4 h-4 accent-yellow-400"
//                 />
//                 <span className="text-sm">I want to be a mentor</span>
//               </label>

//               <div>
//                 <h3 className="text-sm font-semibold mb-3">
//                   Select categories of interest *
//                 </h3>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                   {CATEGORIES.map((cat) => (
//                     <label
//                       key={cat}
//                       className={`flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer transition ${
//                         form.categories.includes(cat)
//                           ? "bg-yellow-400/20 border-yellow-400/40"
//                           : "bg-white/5 border-white/10 hover:border-white/30"
//                       }`}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={form.categories.includes(cat)}
//                         onChange={() => toggleCategory(cat)}
//                         className="w-4 h-4 accent-yellow-400"
//                       />
//                       <span className="text-sm">{cat}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <button
//                 onClick={handleSignUp}
//                 disabled={loading}
//                 className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading && <Loader2 className="h-4 w-4 animate-spin" />}
//                 {loading ? "Sending Link..." : "Sign Up"}
//               </button>
//             </div>
//           </>
//         )}

//         {/* Step 2: Check Email */}
//         {step === 2 && (
//           <div className="text-center">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400/20 rounded-full mb-4">
//               <Mail className="w-8 h-8 text-yellow-400" />
//             </div>
//             <h2 className="text-2xl font-bold mb-2">Check your email</h2>
//             <p className="text-white/70 text-sm mb-6">
//               We've sent a verification link to<br />
//               <span className="text-yellow-400 font-medium">{form.email}</span>
//             </p>

//             <div className="max-w-md mx-auto space-y-4 text-left">
//               <div className="bg-white/5 border border-white/10 rounded-lg p-4">
//                 <h3 className="font-semibold mb-2 flex items-center gap-2">
//                   <CheckCircle className="w-5 h-5 text-yellow-400" />
//                   Next Steps:
//                 </h3>
//                 <ol className="text-sm text-white/70 space-y-2 ml-7">
//                   <li>1. Check your email inbox (and spam folder)</li>
//                   <li>2. Click the verification link</li>
//                   <li>3. You'll be automatically logged in</li>
//                 </ol>
//               </div>

//               <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-3 text-sm">
//                 <p className="text-yellow-400 font-medium mb-1">⚠️ Troubleshooting:</p>
//                 <ul className="text-white/70 space-y-1 ml-4">
//                   <li>• Check spam/junk folder</li>
//                   <li>• Wait 60 seconds before resending</li>
//                   <li>• Make sure email is correct</li>
//                 </ul>
//               </div>

//               <button
//                 onClick={handleResendLink}
//                 disabled={loading}
//                 className="w-full text-yellow-400 hover:text-yellow-300 text-sm underline disabled:opacity-50"
//               >
//                 {loading ? "Sending..." : "Didn't receive the email? Resend"}
//               </button>

//               <button
//                 onClick={() => {
//                   setStep(1);
//                 }}
//                 className="w-full text-white/60 hover:text-white text-sm"
//               >
//                 ← Change email address
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Message Display */}
//         {serverMsg && (
//           <div className={`mt-4 p-3 rounded-lg border text-sm ${
//             msgType === "success" 
//               ? "bg-green-500/10 border-green-500/30 text-green-400"
//               : "bg-red-500/10 border-red-500/30 text-red-400"
//           }`}>
//             {serverMsg}
//           </div>
//         )}

//         {/* Login Link */}
//         {step === 1 && (
//           <p className="text-center text-sm text-white/60 mt-6">
//             Already have an account?{" "}
//             <a href="/login" className="text-yellow-400 hover:text-yellow-300 underline">
//               Log in
//             </a>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }






// "use client";

// import React, { useState } from "react";
// import { Loader2, CheckCircle, Mail, ArrowRight } from "lucide-react";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// const CATEGORIES = [
//   "Technology", "Startup", "Finance", "GATE", "UPSC", "Acting",
//   "AI/ML", "Photography", "Robotics", "Web Development", "DSA", "Art"
// ];

// export default function SignUpPage() {
//   const router = useRouter();
//   const [step, setStep] = useState(1);
//   const [form, setForm] = useState({
//     name: "",
//     branch: "",
//     email: "",
//     is_mentor: false,
//     categories: [],
//   });
//   const [loading, setLoading] = useState(false);
//   const [serverMsg, setServerMsg] = useState("");
//   const [msgType, setMsgType] = useState("");

//   const toggleCategory = (cat) => {
//     setForm((prev) => ({
//       ...prev,
//       categories: prev.categories.includes(cat)
//         ? prev.categories.filter((c) => c !== cat)
//         : [...prev.categories, cat],
//     }));
//   };

//   const showMessage = (msg, type = "error") => {
//     setServerMsg(msg);
//     setMsgType(type);
//   };

//   const handleSendMagicLink = async () => {
//     setLoading(true);
//     setServerMsg("");

//     try {
//       // Validate
//       if (!form.name.trim()) throw new Error("Full name is required");
//       if (!form.email.includes("@")) throw new Error("Valid email is required");
//       if (form.categories.length === 0) throw new Error("Select at least one category");

//       console.log("📧 Sending magic link to:", form.email);

//       // Send magic link with metadata
//       const { data, error } = await supabase.auth.signInWithOtp({
//         email: form.email,
//         options: {
//           emailRedirectTo: `${window.location.origin}/auth/callback`,
//           data: {
//             full_name: form.name,
//             branch: form.branch,
//             is_mentor: form.is_mentor,
//             categories: form.categories,
//           },
//         },
//       });

//       if (error) {
//         console.error("❌ Magic link error:", error);
//         throw error;
//       }

//       console.log("✅ Magic link sent successfully");
//       showMessage("Check your email for the magic link!", "success");
//       setStep(2);

//     } catch (err) {
//       console.error("❌ Error:", err);
//       showMessage(err.message || "Failed to send magic link. Please try again.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendLink = async () => {
//     setLoading(true);
//     try {
//       const { error } = await supabase.auth.signInWithOtp({
//         email: form.email,
//         options: {
//           emailRedirectTo: `${window.location.origin}/auth/callback`,
//           data: {
//             full_name: form.name,
//             branch: form.branch,
//             is_mentor: form.is_mentor,
//             categories: form.categories,
//           },
//         },
//       });

//       if (error) throw error;
//       showMessage("Magic link resent successfully!", "success");
//     } catch (err) {
//       showMessage("Failed to resend. Wait 60 seconds and try again.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black px-6 py-8">
//       <div className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-2xl p-8 text-white backdrop-blur-md shadow-2xl">
        
//         {/* Step Indicator */}
//         <div className="flex items-center justify-center mb-8 gap-3">
//           <div className={`flex items-center gap-2 ${step >= 1 ? 'text-yellow-400' : 'text-white/40'}`}>
//             <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${step >= 1 ? 'border-yellow-400 bg-yellow-400/20 shadow-lg shadow-yellow-400/20' : 'border-white/40'}`}>
//               {step > 1 ? <CheckCircle className="w-6 h-6" /> : "1"}
//             </div>
//             <span className="text-sm font-semibold">Your Details</span>
//           </div>
//           <ArrowRight className={`w-5 h-5 ${step >= 2 ? 'text-yellow-400' : 'text-white/40'}`} />
//           <div className={`flex items-center gap-2 ${step >= 2 ? 'text-yellow-400' : 'text-white/40'}`}>
//             <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${step >= 2 ? 'border-yellow-400 bg-yellow-400/20 shadow-lg shadow-yellow-400/20' : 'border-white/40'}`}>
//               {step >= 2 ? <CheckCircle className="w-6 h-6" /> : "2"}
//             </div>
//             <span className="text-sm font-semibold">Verify Email</span>
//           </div>
//         </div>

//         {/* Step 1: Registration Form */}
//         {step === 1 && (
//           <>
//             <div className="text-center mb-6">
//               <h2 className="text-3xl font-bold mb-2">Join College Network</h2>
//               <p className="text-white/70 text-sm">
//                 Connect with mentors and mentees from NIT Kurukshetra
//               </p>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-2">Full Name *</label>
//                 <input
//                   type="text"
//                   placeholder="Enter your full name"
//                   value={form.name}
//                   onChange={(e) => setForm({ ...form, name: e.target.value })}
//                   className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition text-white placeholder:text-white/50"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">Branch</label>
//                 <input
//                   type="text"
//                   placeholder="e.g., Computer Science Engineering"
//                   value={form.branch}
//                   onChange={(e) => setForm({ ...form, branch: e.target.value })}
//                   className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition text-white placeholder:text-white/50"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">Email Address *</label>
//                 <input
//                   type="email"
//                   placeholder="your.email@nitkkr.ac.in"
//                   value={form.email}
//                   onChange={(e) => setForm({ ...form, email: e.target.value })}
//                   className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition text-white placeholder:text-white/50"
//                 />
//                 <p className="text-xs text-white/50 mt-1.5 ml-1">
//                   ✨ We'll send a magic link to this email
//                 </p>
//               </div>

//               <div className="bg-white/5 border border-white/10 rounded-lg p-4">
//                 <label className="flex items-start gap-3 cursor-pointer group">
//                   <input
//                     type="checkbox"
//                     checked={form.is_mentor}
//                     onChange={(e) => setForm({ ...form, is_mentor: e.target.checked })}
//                     className="w-5 h-5 mt-0.5 accent-yellow-400 cursor-pointer"
//                   />
//                   <div>
//                     <span className="text-sm font-medium group-hover:text-yellow-400 transition">
//                       I want to be a mentor
//                     </span>
//                     <p className="text-xs text-white/60 mt-1">
//                       Help juniors by sharing your knowledge and experience
//                     </p>
//                   </div>
//                 </label>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-3">
//                   Areas of Interest * <span className="text-white/50">(Select at least one)</span>
//                 </label>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                   {CATEGORIES.map((cat) => (
//                     <label
//                       key={cat}
//                       className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer transition-all ${
//                         form.categories.includes(cat)
//                           ? "bg-yellow-400/20 border-yellow-400/40 shadow-lg shadow-yellow-400/10"
//                           : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10"
//                       }`}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={form.categories.includes(cat)}
//                         onChange={() => toggleCategory(cat)}
//                         className="w-4 h-4 accent-yellow-400 cursor-pointer"
//                       />
//                       <span className="text-sm font-medium">{cat}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <button
//                 onClick={handleSendMagicLink}
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold p-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-yellow-400/20 mt-6"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="h-5 w-5 animate-spin" />
//                     Sending Magic Link...
//                   </>
//                 ) : (
//                   <>
//                     <Mail className="h-5 w-5" />
//                     Send Magic Link
//                   </>
//                 )}
//               </button>
//             </div>
//           </>
//         )}

//         {/* Step 2: Check Email */}
//         {step === 2 && (
//           <div className="text-center py-8">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-full mb-6 shadow-lg shadow-yellow-400/20">
//               <Mail className="w-10 h-10 text-yellow-400" />
//             </div>
            
//             <h2 className="text-3xl font-bold mb-3">Check your email!</h2>
//             <p className="text-white/70 text-base mb-2">
//               We've sent a magic link to
//             </p>
//             <p className="text-yellow-400 font-semibold text-lg mb-8">
//               {form.email}
//             </p>

//             <div className="max-w-md mx-auto space-y-4 text-left">
//               <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-xl p-5 shadow-xl">
//                 <h3 className="font-semibold mb-3 flex items-center gap-2 text-yellow-400">
//                   <CheckCircle className="w-5 h-5" />
//                   What to do next:
//                 </h3>
//                 <ol className="text-sm text-white/80 space-y-2.5">
//                   <li className="flex items-start gap-2">
//                     <span className="text-yellow-400 font-bold">1.</span>
//                     <span>Open your email inbox (check spam if not found)</span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <span className="text-yellow-400 font-bold">2.</span>
//                     <span>Click the magic link in the email</span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <span className="text-yellow-400 font-bold">3.</span>
//                     <span>You'll be automatically logged in!</span>
//                   </li>
//                 </ol>
//               </div>

//               <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4 text-sm">
//                 <p className="text-yellow-400 font-semibold mb-2">💡 Pro Tips:</p>
//                 <ul className="text-white/70 space-y-1.5 ml-4">
//                   <li>• Link expires in 1 hour</li>
//                   <li>• Check spam/junk folder if not in inbox</li>
//                   <li>• Wait 60 seconds before requesting a new link</li>
//                 </ul>
//               </div>

//               <button
//                 onClick={handleResendLink}
//                 disabled={loading}
//                 className="w-full text-yellow-400 hover:text-yellow-300 text-sm font-medium underline disabled:opacity-50 py-3"
//               >
//                 {loading ? "Sending..." : "Didn't receive? Resend magic link"}
//               </button>

//               <button
//                 onClick={() => {
//                   setStep(1);
//                   setServerMsg("");
//                 }}
//                 className="w-full text-white/60 hover:text-white text-sm py-3"
//               >
//                 ← Change email address
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Message Display */}
//         {serverMsg && (
//           <div className={`mt-6 p-4 rounded-lg border text-sm font-medium ${
//             msgType === "success" 
//               ? "bg-green-500/10 border-green-500/30 text-green-400"
//               : "bg-red-500/10 border-red-500/30 text-red-400"
//           }`}>
//             {serverMsg}
//           </div>
//         )}

//         {/* Login Link */}
//         {step === 1 && (
//           <p className="text-center text-sm text-white/60 mt-8">
//             Already have an account?{" "}
//             <a href="/login" className="text-yellow-400 hover:text-yellow-300 underline font-medium">
//               Log in with magic link
//             </a>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }









// "use client";

// import React, { useState } from "react";
// import { Loader2, CheckCircle, Mail, ArrowRight } from "lucide-react";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// const CATEGORIES = [
//   "Technology", "Startup", "Finance", "GATE", "UPSC", "Acting",
//   "AI/ML", "Photography", "Robotics", "Web Development", "DSA", "Art"
// ];

// export default function SignUpPage() {
//   const router = useRouter();
//   const [step, setStep] = useState(1);
//   const [form, setForm] = useState({
//     name: "",
//     branch: "",
//     email: "",
//     is_mentor: false,
//     categories: [],
//   });
//   const [loading, setLoading] = useState(false);
//   const [serverMsg, setServerMsg] = useState("");
//   const [msgType, setMsgType] = useState("");
//   const [isCheckingAuth, setIsCheckingAuth] = useState(true);

//   // Check if user is already logged in
//   React.useEffect(() => {
//     const checkAuth = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
      
//       if (session) {
//         // User is already logged in, redirect to home
//         console.log('⚠️ User already logged in, redirecting...');
//         router.replace('/home');
//       } else {
//         setIsCheckingAuth(false);
//       }
//     };
    
//     checkAuth();
//   }, [router]);

//   // Show loading while checking auth
//   if (isCheckingAuth) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black">
//         <div className="text-white flex items-center gap-3">
//           <Loader2 className="w-6 h-6 animate-spin" />
//           <span>Checking authentication...</span>
//         </div>
//       </div>
//     );
//   }

//   const toggleCategory = (cat) => {
//     setForm((prev) => ({
//       ...prev,
//       categories: prev.categories.includes(cat)
//         ? prev.categories.filter((c) => c !== cat)
//         : [...prev.categories, cat],
//     }));
//   };

//   const showMessage = (msg, type = "error") => {
//     setServerMsg(msg);
//     setMsgType(type);
//   };

//   const handleSendMagicLink = async () => {
//     setLoading(true);
//     setServerMsg("");

//     try {
//       // Validate
//       if (!form.name.trim()) throw new Error("Full name is required");
//       if (!form.email.includes("@")) throw new Error("Valid email is required");
//       if (form.categories.length === 0) throw new Error("Select at least one category");

//       console.log("📧 Sending magic link to:", form.email);

//       // Get redirect URL from environment or window location
//       const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 
//                      (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
//       const redirectUrl = `${baseUrl}/auth/callback`;

//       console.log("🔗 Redirect URL:", redirectUrl);

//       // Send magic link with metadata
//       const { data, error } = await supabase.auth.signInWithOtp({
//         email: form.email,
//         options: {
//           emailRedirectTo: redirectUrl,
//           data: {
//             full_name: form.name,
//             branch: form.branch,
//             is_mentor: form.is_mentor,
//             categories: form.categories,
//           },
//         },
//       });

//       if (error) {
//         console.error("❌ Magic link error:", error);
//         throw error;
//       }

//       console.log("✅ Magic link sent successfully");
//       showMessage("Check your email for the magic link!", "success");
//       setStep(2);

//     } catch (err) {
//       console.error("❌ Error:", err);
//       showMessage(err.message || "Failed to send magic link. Please try again.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendLink = async () => {
//     setLoading(true);
//     try {
//       const redirectUrl = typeof window !== 'undefined' 
//         ? `${window.location.origin}/auth/callback`
//         : 'http://localhost:3000/auth/callback';

//       const { error } = await supabase.auth.signInWithOtp({
//         email: form.email,
//         options: {
//           emailRedirectTo: redirectUrl,
//           data: {
//             full_name: form.name,
//             branch: form.branch,
//             is_mentor: form.is_mentor,
//             categories: form.categories,
//           },
//         },
//       });

//       if (error) throw error;
//       showMessage("Magic link resent successfully!", "success");
//     } catch (err) {
//       showMessage("Failed to resend. Wait 60 seconds and try again.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black px-6 py-8">
//       <div className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-2xl p-8 text-white backdrop-blur-md shadow-2xl">
        
//         {/* Step Indicator */}
//         <div className="flex items-center justify-center mb-8 gap-3">
//           <div className={`flex items-center gap-2 ${step >= 1 ? 'text-yellow-400' : 'text-white/40'}`}>
//             <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${step >= 1 ? 'border-yellow-400 bg-yellow-400/20 shadow-lg shadow-yellow-400/20' : 'border-white/40'}`}>
//               {step > 1 ? <CheckCircle className="w-6 h-6" /> : "1"}
//             </div>
//             <span className="text-sm font-semibold">Your Details</span>
//           </div>
//           <ArrowRight className={`w-5 h-5 ${step >= 2 ? 'text-yellow-400' : 'text-white/40'}`} />
//           <div className={`flex items-center gap-2 ${step >= 2 ? 'text-yellow-400' : 'text-white/40'}`}>
//             <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${step >= 2 ? 'border-yellow-400 bg-yellow-400/20 shadow-lg shadow-yellow-400/20' : 'border-white/40'}`}>
//               {step >= 2 ? <CheckCircle className="w-6 h-6" /> : "2"}
//             </div>
//             <span className="text-sm font-semibold">Verify Email</span>
//           </div>
//         </div>

//         {/* Step 1: Registration Form */}
//         {step === 1 && (
//           <>
//             <div className="text-center mb-6">
//               <h2 className="text-3xl font-bold mb-2">Join College Network</h2>
//               <p className="text-white/70 text-sm">
//                 Connect with mentors and mentees from NIT Kurukshetra
//               </p>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-2">Full Name *</label>
//                 <input
//                   type="text"
//                   placeholder="Enter your full name"
//                   value={form.name}
//                   onChange={(e) => setForm({ ...form, name: e.target.value })}
//                   className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition text-white placeholder:text-white/50"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">Branch</label>
//                 <input
//                   type="text"
//                   placeholder="e.g., Computer Science Engineering"
//                   value={form.branch}
//                   onChange={(e) => setForm({ ...form, branch: e.target.value })}
//                   className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition text-white placeholder:text-white/50"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">Email Address *</label>
//                 <input
//                   type="email"
//                   placeholder="your.email@nitkkr.ac.in"
//                   value={form.email}
//                   onChange={(e) => setForm({ ...form, email: e.target.value })}
//                   className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition text-white placeholder:text-white/50"
//                 />
//                 <p className="text-xs text-white/50 mt-1.5 ml-1">
//                   ✨ We'll send a magic link to this email
//                 </p>
//               </div>

//               <div className="bg-white/5 border border-white/10 rounded-lg p-4">
//                 <label className="flex items-start gap-3 cursor-pointer group">
//                   <input
//                     type="checkbox"
//                     checked={form.is_mentor}
//                     onChange={(e) => setForm({ ...form, is_mentor: e.target.checked })}
//                     className="w-5 h-5 mt-0.5 accent-yellow-400 cursor-pointer"
//                   />
//                   <div>
//                     <span className="text-sm font-medium group-hover:text-yellow-400 transition">
//                       I want to be a mentor
//                     </span>
//                     <p className="text-xs text-white/60 mt-1">
//                       Help juniors by sharing your knowledge and experience
//                     </p>
//                   </div>
//                 </label>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-3">
//                   Areas of Interest * <span className="text-white/50">(Select at least one)</span>
//                 </label>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                   {CATEGORIES.map((cat) => (
//                     <label
//                       key={cat}
//                       className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer transition-all ${
//                         form.categories.includes(cat)
//                           ? "bg-yellow-400/20 border-yellow-400/40 shadow-lg shadow-yellow-400/10"
//                           : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10"
//                       }`}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={form.categories.includes(cat)}
//                         onChange={() => toggleCategory(cat)}
//                         className="w-4 h-4 accent-yellow-400 cursor-pointer"
//                       />
//                       <span className="text-sm font-medium">{cat}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <button
//                 onClick={handleSendMagicLink}
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold p-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-yellow-400/20 mt-6"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="h-5 w-5 animate-spin" />
//                     Sending Magic Link...
//                   </>
//                 ) : (
//                   <>
//                     <Mail className="h-5 w-5" />
//                     Send Magic Link
//                   </>
//                 )}
//               </button>
//             </div>
//           </>
//         )}

//         {/* Step 2: Check Email */}
//         {step === 2 && (
//           <div className="text-center py-8">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-full mb-6 shadow-lg shadow-yellow-400/20">
//               <Mail className="w-10 h-10 text-yellow-400" />
//             </div>
            
//             <h2 className="text-3xl font-bold mb-3">Check your email!</h2>
//             <p className="text-white/70 text-base mb-2">
//               We've sent a magic link to
//             </p>
//             <p className="text-yellow-400 font-semibold text-lg mb-8">
//               {form.email}
//             </p>

//             <div className="max-w-md mx-auto space-y-4 text-left">
//               <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-xl p-5 shadow-xl">
//                 <h3 className="font-semibold mb-3 flex items-center gap-2 text-yellow-400">
//                   <CheckCircle className="w-5 h-5" />
//                   What to do next:
//                 </h3>
//                 <ol className="text-sm text-white/80 space-y-2.5">
//                   <li className="flex items-start gap-2">
//                     <span className="text-yellow-400 font-bold">1.</span>
//                     <span>Open your email inbox (check spam if not found)</span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <span className="text-yellow-400 font-bold">2.</span>
//                     <span>Click the magic link in the email</span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <span className="text-yellow-400 font-bold">3.</span>
//                     <span>You'll be automatically logged in!</span>
//                   </li>
//                 </ol>
//               </div>

//               <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4 text-sm">
//                 <p className="text-yellow-400 font-semibold mb-2">💡 Pro Tips:</p>
//                 <ul className="text-white/70 space-y-1.5 ml-4">
//                   <li>• Link expires in 1 hour</li>
//                   <li>• Check spam/junk folder if not in inbox</li>
//                   <li>• Wait 60 seconds before requesting a new link</li>
//                 </ul>
//               </div>

//               <button
//                 onClick={handleResendLink}
//                 disabled={loading}
//                 className="w-full text-yellow-400 hover:text-yellow-300 text-sm font-medium underline disabled:opacity-50 py-3"
//               >
//                 {loading ? "Sending..." : "Didn't receive? Resend magic link"}
//               </button>

//               <button
//                 onClick={() => {
//                   setStep(1);
//                   setServerMsg("");
//                 }}
//                 className="w-full text-white/60 hover:text-white text-sm py-3"
//               >
//                 ← Change email address
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Message Display */}
//         {serverMsg && (
//           <div className={`mt-6 p-4 rounded-lg border text-sm font-medium ${
//             msgType === "success" 
//               ? "bg-green-500/10 border-green-500/30 text-green-400"
//               : "bg-red-500/10 border-red-500/30 text-red-400"
//           }`}>
//             {serverMsg}
//           </div>
//         )}

//         {/* Login Link */}
//         {step === 1 && (
//           <>
//             <p className="text-center text-sm text-white/60 mt-8">
//               Already have an account?{" "}
//               <a href="/login" className="text-yellow-400 hover:text-yellow-300 underline font-medium">
//                 Log in with magic link
//               </a>
//             </p>
            
//             {/* Show logout option if somehow they got here while logged in */}
//             <button
//               onClick={async () => {
//                 await supabase.auth.signOut();
//                 window.location.reload();
//               }}
//               className="w-full text-white/40 hover:text-white/60 text-xs mt-4"
//             >
//               Sign out of current session
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }







// "use client";

// import React, { useState } from "react";
// import { Loader2, CheckCircle, Mail, ArrowRight } from "lucide-react";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// const CATEGORIES = [
//   "Technology", "Startup", "Finance", "GATE", "UPSC", "Acting",
//   "AI/ML", "Photography", "Robotics", "Web Development", "DSA", "Art"
// ];

// export default function SignUpPage() {
//   const router = useRouter();
//   const [step, setStep] = useState(1);
//   const [form, setForm] = useState({
//     name: "",
//     branch: "",
//     email: "",
//     password: "",
//     is_mentor: false,
//     categories: [],
//   });
//   const [loading, setLoading] = useState(false);
//   const [serverMsg, setServerMsg] = useState("");
//   const [msgType, setMsgType] = useState("");

//   const toggleCategory = (cat) => {
//     setForm((prev) => ({
//       ...prev,
//       categories: prev.categories.includes(cat)
//         ? prev.categories.filter((c) => c !== cat)
//         : [...prev.categories, cat],
//     }));
//   };

//   const showMessage = (msg, type = "error") => {
//     setServerMsg(msg);
//     setMsgType(type);
//   };

//   const handleSendMagicLink = async () => {
//     setLoading(true);
//     setServerMsg("");

//     try {
//       // Validate
//       if (!form.name.trim()) throw new Error("Full name is required");
//       if (!form.email.includes("@")) throw new Error("Valid email is required");
//       if (!form.password) throw new Error("Password is required");
//       if (form.password.length < 8) throw new Error("Password must be at least 8 characters");
//       if (form.categories.length === 0) throw new Error("Select at least one category");

//       console.log("📧 Starting signup for:", form.email);

//       // Step 1: Create user account with password
//       const { data: signupData, error: signupError } = await supabase.auth.signUp({
//         email: form.email,
//         password: form.password,
//         options: {
//           emailRedirectTo:  `${window.location.origin}/auth/callback?next=/home`,
//           data: {
//             full_name: form.name,
//             branch: form.branch,
//             is_mentor: form.is_mentor,
//             categories: form.categories,
//           },
//         },
//       });

//       if (signupError) throw signupError;

//       console.log("✅ Signup successful:", signupData);

//       // Check if email confirmation is required
//       if (signupData.user && !signupData.user.confirmed_at) {
//         showMessage("Check your email to verify your account!", "success");
//         setStep(2);
//       } else {
//         // Auto-confirmed, redirect
//         showMessage("Account created! Redirecting...", "success");
//         setTimeout(() => router.push("/home"), 1500);
//       }

//     } catch (err) {
//       console.error("❌ Signup error:", err);
//       showMessage(err.message || "Failed to create account. Please try again.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendLink = async () => {
//     setLoading(true);
//     try {
//       const { error } = await supabase.auth.resend({
//         type: 'signup',
//         email: form.email,
//       });

//       if (error) throw error;
//       showMessage("Verification email resent!", "success");
//     } catch (err) {
//       showMessage("Failed to resend. Wait 60 seconds and try again.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black px-6 py-8">
//       <div className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-2xl p-8 text-white backdrop-blur-md shadow-2xl">
        
//         {/* Step Indicator */}
//         <div className="flex items-center justify-center mb-8 gap-3">
//           <div className={`flex items-center gap-2 ${step >= 1 ? 'text-yellow-400' : 'text-white/40'}`}>
//             <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${step >= 1 ? 'border-yellow-400 bg-yellow-400/20 shadow-lg shadow-yellow-400/20' : 'border-white/40'}`}>
//               {step > 1 ? <CheckCircle className="w-6 h-6" /> : "1"}
//             </div>
//             <span className="text-sm font-semibold">Your Details</span>
//           </div>
//           <ArrowRight className={`w-5 h-5 ${step >= 2 ? 'text-yellow-400' : 'text-white/40'}`} />
//           <div className={`flex items-center gap-2 ${step >= 2 ? 'text-yellow-400' : 'text-white/40'}`}>
//             <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${step >= 2 ? 'border-yellow-400 bg-yellow-400/20 shadow-lg shadow-yellow-400/20' : 'border-white/40'}`}>
//               {step >= 2 ? <CheckCircle className="w-6 h-6" /> : "2"}
//             </div>
//             <span className="text-sm font-semibold">Verify Email</span>
//           </div>
//         </div>

//         {/* Step 1: Registration Form */}
//         {step === 1 && (
//           <>
//             <div className="text-center mb-6">
//               <h2 className="text-3xl font-bold mb-2">Join College Network</h2>
//               <p className="text-white/70 text-sm">
//                 Connect with mentors and mentees from NIT Kurukshetra
//               </p>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-2">Full Name *</label>
//                 <input
//                   type="text"
//                   placeholder="Enter your full name"
//                   value={form.name}
//                   onChange={(e) => setForm({ ...form, name: e.target.value })}
//                   className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition text-white placeholder:text-white/50"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">Branch</label>
//                 <input
//                   type="text"
//                   placeholder="e.g., Computer Science Engineering"
//                   value={form.branch}
//                   onChange={(e) => setForm({ ...form, branch: e.target.value })}
//                   className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition text-white placeholder:text-white/50"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">Email Address *</label>
//                 <input
//                   type="email"
//                   placeholder="your.email@nitkkr.ac.in"
//                   value={form.email}
//                   onChange={(e) => setForm({ ...form, email: e.target.value })}
//                   className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition text-white placeholder:text-white/50"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">Password *</label>
//                 <input
//                   type="password"
//                   placeholder="At least 8 characters"
//                   value={form.password}
//                   onChange={(e) => setForm({ ...form, password: e.target.value })}
//                   className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition text-white placeholder:text-white/50"
//                 />
//                 <p className="text-xs text-white/50 mt-1.5 ml-1">
//                   You'll use this to login later
//                 </p>
//               </div>

//               <div className="bg-white/5 border border-white/10 rounded-lg p-4">
//                 <label className="flex items-start gap-3 cursor-pointer group">
//                   <input
//                     type="checkbox"
//                     checked={form.is_mentor}
//                     onChange={(e) => setForm({ ...form, is_mentor: e.target.checked })}
//                     className="w-5 h-5 mt-0.5 accent-yellow-400 cursor-pointer"
//                   />
//                   <div>
//                     <span className="text-sm font-medium group-hover:text-yellow-400 transition">
//                       I want to be a mentor
//                     </span>
//                     <p className="text-xs text-white/60 mt-1">
//                       Help juniors by sharing your knowledge and experience
//                     </p>
//                   </div>
//                 </label>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-3">
//                   Areas of Interest * <span className="text-white/50">(Select at least one)</span>
//                 </label>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                   {CATEGORIES.map((cat) => (
//                     <label
//                       key={cat}
//                       className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer transition-all ${
//                         form.categories.includes(cat)
//                           ? "bg-yellow-400/20 border-yellow-400/40 shadow-lg shadow-yellow-400/10"
//                           : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10"
//                       }`}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={form.categories.includes(cat)}
//                         onChange={() => toggleCategory(cat)}
//                         className="w-4 h-4 accent-yellow-400 cursor-pointer"
//                       />
//                       <span className="text-sm font-medium">{cat}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <button
//                 onClick={handleSendMagicLink}
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold p-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-yellow-400/20 mt-6"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="h-5 w-5 animate-spin" />
//                     Creating Account...
//                   </>
//                 ) : (
//                   <>
//                     <Mail className="h-5 w-5" />
//                     Create Account
//                   </>
//                 )}
//               </button>
//             </div>
//           </>
//         )}

//         {/* Step 2: Check Email */}
//         {step === 2 && (
//           <div className="text-center py-8">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-full mb-6 shadow-lg shadow-yellow-400/20">
//               <Mail className="w-10 h-10 text-yellow-400" />
//             </div>
            
//             <h2 className="text-3xl font-bold mb-3">Check your email!</h2>
//             <p className="text-white/70 text-base mb-2">
//               We've sent a verification link to
//             </p>
//             <p className="text-yellow-400 font-semibold text-lg mb-8">
//               {form.email}
//             </p>

//             <div className="max-w-md mx-auto space-y-4 text-left">
//               <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-xl p-5 shadow-xl">
//                 <h3 className="font-semibold mb-3 flex items-center gap-2 text-yellow-400">
//                   <CheckCircle className="w-5 h-5" />
//                   What to do next:
//                 </h3>
//                 <ol className="text-sm text-white/80 space-y-2.5">
//                   <li className="flex items-start gap-2">
//                     <span className="text-yellow-400 font-bold">1.</span>
//                     <span>Open your email inbox (check spam if not found)</span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <span className="text-yellow-400 font-bold">2.</span>
//                     <span>Click the verification link</span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <span className="text-yellow-400 font-bold">3.</span>
//                     <span>You'll be automatically logged in!</span>
//                   </li>
//                 </ol>
//               </div>

//               <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4 text-sm">
//                 <p className="text-yellow-400 font-semibold mb-2">💡 Pro Tips:</p>
//                 <ul className="text-white/70 space-y-1.5 ml-4">
//                   <li>• Link expires in 1 hour</li>
//                   <li>• Check spam/junk folder if not in inbox</li>
//                   <li>• Wait 60 seconds before requesting a new link</li>
//                 </ul>
//               </div>

//               <button
//                 onClick={handleResendLink}
//                 disabled={loading}
//                 className="w-full text-yellow-400 hover:text-yellow-300 text-sm font-medium underline disabled:opacity-50 py-3"
//               >
//                 {loading ? "Sending..." : "Didn't receive? Resend verification email"}
//               </button>

//               <button
//                 onClick={() => router.push("/login")}
//                 className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold p-3 rounded-lg transition border border-white/20"
//               >
//                 Go to Login
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Message Display */}
//         {serverMsg && (
//           <div className={`mt-6 p-4 rounded-lg border text-sm font-medium ${
//             msgType === "success" 
//               ? "bg-green-500/10 border-green-500/30 text-green-400"
//               : "bg-red-500/10 border-red-500/30 text-red-400"
//           }`}>
//             {serverMsg}
//           </div>
//         )}

//         {/* Login Link */}
//         {step === 1 && (
//           <p className="text-center text-sm text-white/60 mt-8">
//             Already have an account?{" "}
//             <a href="/login" className="text-yellow-400 hover:text-yellow-300 underline font-medium">
//               Log in
//             </a>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }















// "use client";

// import React, { useState } from "react";
// import { Loader2, CheckCircle, ArrowRight } from "lucide-react";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// const CATEGORIES = [
//   "Technology", "Startup", "Finance", "GATE", "UPSC", "Acting",
//   "AI/ML", "Photography", "Robotics", "Web Development", "DSA", "Art"
// ];

// export default function SignUpPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({
//     name: "",
//     branch: "",
//     email: "",
//     password: "",
//     is_mentor: false,
//     categories: [],
//   });
//   const [loading, setLoading] = useState(false);
//   const [serverMsg, setServerMsg] = useState("");
//   const [msgType, setMsgType] = useState("");

//   const toggleCategory = (cat) => {
//     setForm((prev) => ({
//       ...prev,
//       categories: prev.categories.includes(cat)
//         ? prev.categories.filter((c) => c !== cat)
//         : [...prev.categories, cat],
//     }));
//   };

//   const showMessage = (msg, type = "error") => {
//     setServerMsg(msg);
//     setMsgType(type);
//   };

//   const handleSignUp = async () => {
//     setLoading(true);
//     setServerMsg("");

//     try {
//       // Validate
//       if (!form.name.trim()) throw new Error("Full name is required");
//       if (!form.email.includes("@")) throw new Error("Valid email is required");
//       if (!form.password) throw new Error("Password is required");
//       if (form.password.length < 8) throw new Error("Password must be at least 8 characters");
//       if (form.categories.length === 0) throw new Error("Select at least one category");

//       console.log("🚀 Starting signup for:", form.email);

//       // Create account with password (no email verification needed)
//       const { data, error } = await supabase.auth.signUp({
//         email: form.email,
//         password: form.password,
//         options: {
//           data: {
//             full_name: form.name,
//             branch: form.branch,
//             is_mentor: form.is_mentor,
//             categories: form.categories,
//           },
//         },
//       });

//       if (error) throw error;

//       console.log("✅ Signup successful:", data);

//       // Check if user was created
//       if (data.user) {
//         // Wait a moment for trigger to create profile
//         await new Promise(resolve => setTimeout(resolve, 1000));

//         showMessage("Account created successfully! Redirecting...", "success");
        
//         // Redirect to home after 1 second
//         setTimeout(() => {
//           router.push("/home");
//         }, 1000);
//       } else {
//         throw new Error("Signup failed - no user returned");
//       }

//     } catch (err) {
//       console.error("❌ Signup error:", err);
//       showMessage(err.message || "Failed to create account. Please try again.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black px-6 py-8">
//       <div className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-2xl p-8 text-white backdrop-blur-md shadow-2xl">
        
//         <div className="text-center mb-8">
//           <h2 className="text-4xl font-bold mb-2">Join College Network</h2>
//           <p className="text-white/70 text-base">
//             Connect with mentors and mentees from NIT Kurukshetra
//           </p>
//         </div>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-2">Full Name *</label>
//             <input
//               type="text"
//               placeholder="Enter your full name"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition text-white placeholder:text-white/50"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Branch</label>
//             <input
//               type="text"
//               placeholder="e.g., Computer Science Engineering"
//               value={form.branch}
//               onChange={(e) => setForm({ ...form, branch: e.target.value })}
//               className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition text-white placeholder:text-white/50"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Email Address *</label>
//             <input
//               type="email"
//               placeholder="your.email@nitkkr.ac.in"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition text-white placeholder:text-white/50"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Password *</label>
//             <input
//               type="password"
//               placeholder="At least 8 characters"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition text-white placeholder:text-white/50"
//             />
//           </div>

//           <div className="bg-white/5 border border-white/10 rounded-lg p-4">
//             <label className="flex items-start gap-3 cursor-pointer group">
//               <input
//                 type="checkbox"
//                 checked={form.is_mentor}
//                 onChange={(e) => setForm({ ...form, is_mentor: e.target.checked })}
//                 className="w-5 h-5 mt-0.5 accent-yellow-400 cursor-pointer"
//               />
//               <div>
//                 <span className="text-sm font-medium group-hover:text-yellow-400 transition">
//                   I want to be a mentor
//                 </span>
//                 <p className="text-xs text-white/60 mt-1">
//                   Help juniors by sharing your knowledge and experience
//                 </p>
//               </div>
//             </label>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-3">
//               Areas of Interest * <span className="text-white/50">(Select at least one)</span>
//             </label>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//               {CATEGORIES.map((cat) => (
//                 <label
//                   key={cat}
//                   className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer transition-all ${
//                     form.categories.includes(cat)
//                       ? "bg-yellow-400/20 border-yellow-400/40 shadow-lg shadow-yellow-400/10"
//                       : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10"
//                   }`}
//                 >
//                   <input
//                     type="checkbox"
//                     checked={form.categories.includes(cat)}
//                     onChange={() => toggleCategory(cat)}
//                     className="w-4 h-4 accent-yellow-400 cursor-pointer"
//                   />
//                   <span className="text-sm font-medium">{cat}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           <button
//             onClick={handleSignUp}
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold p-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-yellow-400/20 mt-6"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="h-5 w-5 animate-spin" />
//                 Creating Account...
//               </>
//             ) : (
//               <>
//                 <CheckCircle className="h-5 w-5" />
//                 Create Account
//               </>
//             )}
//           </button>
//         </div>

//         {serverMsg && (
//           <div className={`mt-6 p-4 rounded-lg border text-sm font-medium ${
//             msgType === "success" 
//               ? "bg-green-500/10 border-green-500/30 text-green-400"
//               : "bg-red-500/10 border-red-500/30 text-red-400"
//           }`}>
//             {serverMsg}
//           </div>
//         )}

//         <p className="text-center text-sm text-white/60 mt-8">
//           Already have an account?{" "}
//           <a href="/login" className="text-yellow-400 hover:text-yellow-300 underline font-medium">
//             Log in
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }










// "use client";

// import React, { useState } from "react";
// import { Loader2, CheckCircle, ArrowRight } from "lucide-react";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// const CATEGORIES = [
//   "Technology", "Startup", "Finance", "GATE", "UPSC", "Acting",
//   "AI/ML", "Photography", "Robotics", "Web Development", "DSA", "Art"
// ];

// export default function SignUpPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({
//     name: "",
//     branch: "",
//     email: "",
//     password: "",
//     is_mentor: false,
//     categories: [],
//   });
//   const [loading, setLoading] = useState(false);
//   const [serverMsg, setServerMsg] = useState("");
//   const [msgType, setMsgType] = useState("");

//   const toggleCategory = (cat) => {
//     setForm((prev) => ({
//       ...prev,
//       categories: prev.categories.includes(cat)
//         ? prev.categories.filter((c) => c !== cat)
//         : [...prev.categories, cat],
//     }));
//   };

//   const showMessage = (msg, type = "error") => {
//     setServerMsg(msg);
//     setMsgType(type);
//   };

//   const handleSignUp = async () => {
//     setLoading(true);
//     setServerMsg("");

//     try {
//       // Validate
//       if (!form.name.trim()) throw new Error("Full name is required");
//       if (!form.email.includes("@")) throw new Error("Valid email is required");
//       if (!form.password) throw new Error("Password is required");
//       if (form.password.length < 8) throw new Error("Password must be at least 8 characters");
//       if (form.categories.length === 0) throw new Error("Select at least one category");

//       console.log("🚀 Starting signup for:", form.email);

//       // Create account with password (no email verification needed)
//       const { data, error } = await supabase.auth.signUp({
//         email: form.email,
//         password: form.password,
//         options: {
//           data: {
//             full_name: form.name,
//             branch: form.branch,
//             is_mentor: form.is_mentor,
//             categories: form.categories,
//           },
//         },
//       });

//       if (error) throw error;

//       console.log("✅ Signup successful:", data);

//       // Check if user was created
//       if (data.user) {
//         // Wait a moment for trigger to create profile
//         await new Promise(resolve => setTimeout(resolve, 1000));

//         showMessage("Account created successfully! Redirecting...", "success");
        
//         // Redirect to home after 1 second
//         setTimeout(() => {
//           router.push("/home");
//         }, 1000);
//       } else {
//         throw new Error("Signup failed - no user returned");
//       }

//     } catch (err) {
//       console.error("❌ Signup error:", err);
//       showMessage(err.message || "Failed to create account. Please try again.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black px-6 py-8">
//       <div className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-2xl p-8 text-white backdrop-blur-md shadow-2xl">
        
//         <div className="text-center mb-8">
//           <h2 className="text-4xl font-bold mb-2">Join College Network</h2>
//           <p className="text-white/70 text-base">
//             Connect with mentors and mentees from NIT Kurukshetra
//           </p>
//         </div>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-2">Full Name *</label>
//             <input
//               type="text"
//               placeholder="Enter your full name"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition text-white placeholder:text-white/50"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Branch</label>
//             <input
//               type="text"
//               placeholder="e.g., Computer Science Engineering"
//               value={form.branch}
//               onChange={(e) => setForm({ ...form, branch: e.target.value })}
//               className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition text-white placeholder:text-white/50"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Email Address *</label>
//             <input
//               type="email"
//               placeholder="your.email@nitkkr.ac.in"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition text-white placeholder:text-white/50"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Password *</label>
//             <input
//               type="password"
//               placeholder="At least 8 characters"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition text-white placeholder:text-white/50"
//             />
//           </div>

//           <div className="bg-white/5 border border-white/10 rounded-lg p-4">
//             <label className="flex items-start gap-3 cursor-pointer group">
//               <input
//                 type="checkbox"
//                 checked={form.is_mentor}
//                 onChange={(e) => setForm({ ...form, is_mentor: e.target.checked })}
//                 className="w-5 h-5 mt-0.5 accent-yellow-400 cursor-pointer"
//               />
//               <div>
//                 <span className="text-sm font-medium group-hover:text-yellow-400 transition">
//                   I want to be a mentor
//                 </span>
//                 <p className="text-xs text-white/60 mt-1">
//                   Help juniors by sharing your knowledge and experience
//                 </p>
//               </div>
//             </label>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-3">
//               Areas of Interest * <span className="text-white/50">(Select at least one)</span>
//             </label>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//               {CATEGORIES.map((cat) => (
//                 <label
//                   key={cat}
//                   className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer transition-all ${
//                     form.categories.includes(cat)
//                       ? "bg-yellow-400/20 border-yellow-400/40 shadow-lg shadow-yellow-400/10"
//                       : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10"
//                   }`}
//                 >
//                   <input
//                     type="checkbox"
//                     checked={form.categories.includes(cat)}
//                     onChange={() => toggleCategory(cat)}
//                     className="w-4 h-4 accent-yellow-400 cursor-pointer"
//                   />
//                   <span className="text-sm font-medium">{cat}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           <button
//             onClick={handleSignUp}
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold p-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-yellow-400/20 mt-6"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="h-5 w-5 animate-spin" />
//                 Creating Account...
//               </>
//             ) : (
//               <>
//                 <CheckCircle className="h-5 w-5" />
//                 Create Account
//               </>
//             )}
//           </button>
//         </div>

//         {serverMsg && (
//           <div className={`mt-6 p-4 rounded-lg border text-sm font-medium ${
//             msgType === "success" 
//               ? "bg-green-500/10 border-green-500/30 text-green-400"
//               : "bg-red-500/10 border-red-500/30 text-red-400"
//           }`}>
//             {serverMsg}
//           </div>
//         )}

//         <p className="text-center text-sm text-white/60 mt-8">
//           Already have an account?{" "}
//           <a href="/login" className="text-yellow-400 hover:text-yellow-300 underline font-medium">
//             Log in
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }









"use client";

import React, { useState } from "react";
import { Loader2, CheckCircle, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  "Civil",
  "Computer Science",
  "Electrical",
  "Electronics & Communication",
  "Mechanical",
  "Information Technology",
  "Production & Industrial Engineering",
  "Artificial Intelligence & Data Science",
  "Robotics & Automation",
  "Sustainable Energy Engineering Technologies",
  "GATE",
  "UPSC",
  "DSA",
  "Web Dev",
  "Finance",
  "Startup",
  "AI"
];

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    branch: "",
    email: "",
    password: "",
    is_mentor: false,
    categories: [],
  });
  const [loading, setLoading] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  const toggleCategory = (cat) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }));
  };

  const showMessage = (msg, type = "error") => {
    setServerMsg(msg);
    setMsgType(type);
  };

  const handleSignUp = async () => {
    setLoading(true);
    setServerMsg("");

    try {
      // Validate
      if (!form.name.trim()) throw new Error("Full name is required");
      if (!form.email.includes("@")) throw new Error("Valid email is required");
      if (!form.password) throw new Error("Password is required");
      if (form.password.length < 8) throw new Error("Password must be at least 8 characters");
      if (form.categories.length === 0) throw new Error("Select at least one category");

      console.log("🚀 Starting signup for:", form.email);

      // Create account with password (no email verification needed)
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.name,
            branch: form.branch,
            is_mentor: form.is_mentor,
            categories: form.categories,
          },
        },
      });

      if (error) throw error;

      console.log("✅ Signup successful:", data);

      // Check if user was created
      if (data.user) {
        // Wait a moment for trigger to create profile
        await new Promise(resolve => setTimeout(resolve, 1000));

        showMessage("Account created successfully! Redirecting...", "success");
        
        // Redirect to home after 1 second
        setTimeout(() => {
          router.push("/home");
        }, 1000);
      } else {
        throw new Error("Signup failed - no user returned");
      }

    } catch (err) {
      console.error("❌ Signup error:", err);
      showMessage(err.message || "Failed to create account. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black px-6 py-8">
      <div className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-2xl p-8 text-white backdrop-blur-md shadow-2xl">
        
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-2">Join College Network</h2>
          <p className="text-white/70 text-base">
            Connect with mentors and mentees from NIT Kurukshetra
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name *</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition text-white placeholder:text-white/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Branch</label>
            <input
              type="text"
              placeholder="e.g., Computer Science Engineering"
              value={form.branch}
              onChange={(e) => setForm({ ...form, branch: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition text-white placeholder:text-white/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email Address *</label>
            <input
              type="email"
              placeholder="your.email@nitkkr.ac.in"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition text-white placeholder:text-white/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password *</label>
            <input
              type="password"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition text-white placeholder:text-white/50"
            />
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={form.is_mentor}
                onChange={(e) => setForm({ ...form, is_mentor: e.target.checked })}
                className="w-5 h-5 mt-0.5 accent-yellow-400 cursor-pointer"
              />
              <div>
                <span className="text-sm font-medium group-hover:text-yellow-400 transition">
                  I want to be a mentor
                </span>
                <p className="text-xs text-white/60 mt-1">
                  Help juniors by sharing your knowledge and experience
                </p>
              </div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">
              Areas of Interest * <span className="text-white/50">(Select at least one)</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => (
                <label
                  key={cat}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer transition-all ${
                    form.categories.includes(cat)
                      ? "bg-yellow-400/20 border-yellow-400/40 shadow-lg shadow-yellow-400/10"
                      : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.categories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="w-4 h-4 accent-yellow-400 cursor-pointer"
                  />
                  <span className="text-sm font-medium">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleSignUp}
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold p-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-yellow-400/20 mt-6"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                <CheckCircle className="h-5 w-5" />
                Create Account
              </>
            )}
          </button>
        </div>

        {serverMsg && (
          <div className={`mt-6 p-4 rounded-lg border text-sm font-medium ${
            msgType === "success" 
              ? "bg-green-500/10 border-green-500/30 text-green-400"
              : "bg-red-500/10 border-red-500/30 text-red-400"
          }`}>
            {serverMsg}
          </div>
        )}

        <p className="text-center text-sm text-white/60 mt-8">
          Already have an account?{" "}
          <a href="/login" className="text-yellow-400 hover:text-yellow-300 underline font-medium">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}