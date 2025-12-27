

// 'use client'
// import React, { useState, useEffect } from "react";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [serverMessage, setServerMessage] = useState("");
//   const [isFormValid, setIsFormValid] = useState(false);

//   useEffect(() => {
//     // Email validation
//     if (email && !email.endsWith("@nitkkr.ac.in")) {
//       setEmailError("Email must end with @nitkkr.ac.in");
//     } else {
//       setEmailError("");
//     }

//     // Password validation
//     if (password && password.length < 8) {
//       setPasswordError("Password must be at least 8 characters long");
//     } else {
//       setPasswordError("");
//     }

//     // Enable button only if no errors and fields are filled
//     setIsFormValid(
//       email.endsWith("@nitkkr.ac.in") &&
//       password.length >= 8
//     );
//   }, [email, password]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setServerMessage("");

//     try {
//       const res = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
//       setServerMessage(data.message || "Unknown response");
//     } catch {
//       setServerMessage("Server error. Please try again later.");
//     }
//   };

//   return (

// <div className="min-h-screen flex items-center bg-gradient-to-b from-purple-900 via-black to-black">
//      <div className="w-full top-1/2 flex justify-center items-center">
//           <div className="w-full max-w-md p-8 bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md text-white">
//             <h2 className="text-2xl font-bold mb-2">College Network</h2>
//             <p className="text-white/70 text-sm mb-6">Make your connections with seniors</p>
//             <form className="space-y-4">
            
//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-transparent"
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-transparent"
//               />

           
//               <button
//                 type="submit"
//                 className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg transition"
//               >
//                 Log in
//               </button>
//             </form>

          
//           </div>
//         </div>
//         </div>
//   );
// }










// "use client";
// import React, { useState } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";
// import { Loader2 } from "lucide-react";

// export default function Login() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [serverMessage, setServerMessage] = useState("");
//   const [msgType, setMsgType] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setServerMessage("");
//     setLoading(true);

//     try {
//       // Validate email domain
//       if (!email.endsWith("@nitkkr.ac.in")) {
//         throw new Error("Only @nitkkr.ac.in emails are allowed");
//       }

//       const { data, error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });

//       if (error) throw error;

//       // Verify session
//       const { data: sessionData } = await supabase.auth.getSession();
      
//       if (!sessionData.session) {
//         throw new Error("Login succeeded but session not stored!");
//       }

//       setServerMessage("✅ Login successful!");
//       setMsgType("success");
      
//       setTimeout(() => router.replace("/home"), 1000);
//     } catch (error) {
//       setServerMessage(error.message);
//       setMsgType("error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black relative">
//       {loading && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="text-white text-lg font-semibold flex items-center gap-2">
//             <Loader2 className="w-5 h-5 animate-spin" />
//             Logging in...
//           </div>
//         </div>
//       )}

//       <div className="w-full max-w-md p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md text-white shadow-xl">
//         <h2 className="text-2xl font-bold mb-2">College Network</h2>
//         <p className="text-white/70 text-sm mb-6">Login to your account</p>
        
//         <div className="space-y-4">
//           <input
//             type="email"
//             placeholder="College Email (@nitkkr.ac.in)"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition text-white"
//           />

//           <button
//             onClick={handleLogin}
//             disabled={!email || !password || loading}
//             className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
//           >
//             Log in
//           </button>
//         </div>

//         {serverMessage && (
//           <div className={`mt-4 p-3 rounded-lg border text-sm ${
//             msgType === "success" 
//               ? "bg-green-500/10 border-green-500/30 text-green-400"
//               : "bg-red-500/10 border-red-500/30 text-red-400"
//           }`}>
//             {serverMessage}
//           </div>
//         )}

//         <p className="text-center text-sm text-white/60 mt-6">
//           Don't have an account?{" "}
//           <a href="/signup" className="text-yellow-400 hover:text-yellow-300 underline">
//             Sign up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }




// "use client";
// import React, { useState } from "react";
// import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const router = useRouter();
//   const [loginMethod, setLoginMethod] = useState("password"); // "password" or "magic"
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [emailSent, setEmailSent] = useState(false);
//   const [message, setMessage] = useState("");
//   const [msgType, setMsgType] = useState("");




//    useEffect(() => {
//     const error = searchParams.get('error');
//     if (error) {
//       setMessage(decodeURIComponent(error), "error");
//     }
//   }, [searchParams]);



  
//   // Password Login
//   const handlePasswordLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       if (!form.email.includes("@")) {
//         throw new Error("Please enter a valid email");
//       }
//       if (form.password.length < 8) {
//         throw new Error("Password must be at least 8 characters");
//       }

//       console.log("🔐 Attempting password login for:", form.email);

//       const { data, error } = await supabase.auth.signInWithPassword({
//         email: form.email,
//         password: form.password,
//       });

//       if (error) throw error;

//       console.log("✅ Login successful:", data.user.id);
//       setMessage("Login successful! Redirecting...");
//       setMsgType("success");

//       // Redirect to home
//       setTimeout(() => {
//         router.push("/home");
//       }, 1000);

//     } catch (err) {
//       console.error("❌ Login error:", err);
//       setMessage(err.message || "Invalid email or password");
//       setMsgType("error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Magic Link Login
//   const handleMagicLinkLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       if (!form.email.includes("@")) {
//         throw new Error("Please enter a valid email");
//       }

//       console.log("📧 Sending magic link to:", form.email);

//       const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 
//                      (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
//       const redirectUrl = `${baseUrl}/auth/callback`;

//       const { error } = await supabase.auth.signInWithOtp({
//         email: form.email,
//         options: {
//           emailRedirectTo: redirectUrl,
//         },
//       });

//       if (error) throw error;

//       setMessage("Check your email for the magic link!");
//       setMsgType("success");
//       setEmailSent(true);
//     } catch (err) {
//       setMessage(err.message);
//       setMsgType("error");
//     } finally {
//       setLoading(false);
//     }
//   };


   
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black px-6 py-8">
//       <div className="w-full max-w-md p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md text-white shadow-2xl">
        
//         {!emailSent ? (
//           <>
//             <div className="text-center mb-6">
//               <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
//               <p className="text-white/70 text-sm">
//                 Sign in to your account
//               </p>
//             </div>

//             {/* Login Method Toggle */}
//             <div className="flex gap-2 mb-6 bg-white/5 p-1 rounded-lg">
//               <button
//                 onClick={() => setLoginMethod("password")}
//                 className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
//                   loginMethod === "password"
//                     ? "bg-yellow-400 text-black"
//                     : "text-white/70 hover:text-white"
//                 }`}
//               >
//                 <Lock className="w-4 h-4 inline mr-2" />
//                 Password
//               </button>
//               <button
//                 onClick={() => setLoginMethod("magic")}
//                 className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
//                   loginMethod === "magic"
//                     ? "bg-yellow-400 text-black"
//                     : "text-white/70 hover:text-white"
//                 }`}
//               >
//                 <Mail className="w-4 h-4 inline mr-2" />
//                 Magic Link
//               </button>
//             </div>

//             {/* Password Login Form */}
//             {loginMethod === "password" && (
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Email Address</label>
//                   <input
//                     type="email"
//                     placeholder="your.email@nitkkr.ac.in"
//                     value={form.email}
//                     onChange={(e) => setForm({ ...form, email: e.target.value })}
//                     className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition text-white placeholder:text-white/50"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2">Password</label>
//                   <div className="relative">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Enter your password"
//                       value={form.password}
//                       onChange={(e) => setForm({ ...form, password: e.target.value })}
//                       onKeyPress={(e) => e.key === 'Enter' && handlePasswordLogin(e)}
//                       className="w-full bg-white/10 border border-white/20 rounded-lg p-3 pr-12 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition text-white placeholder:text-white/50"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
//                     >
//                       {showPassword ? (
//                         <EyeOff className="w-5 h-5" />
//                       ) : (
//                         <Eye className="w-5 h-5" />
//                       )}
//                     </button>
//                   </div>
//                 </div>

//                 <button
//                   onClick={handlePasswordLogin}
//                   disabled={loading}
//                   className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold p-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-yellow-400/20"
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 className="h-5 w-5 animate-spin" />
//                       Signing in...
//                     </>
//                   ) : (
//                     <>
//                       <Lock className="h-5 w-5" />
//                       Sign In
//                     </>
//                   )}
//                 </button>

//                 {/* Forgot Password Link */}
//                 <button
//                   onClick={() => setLoginMethod("magic")}
//                   className="w-full text-yellow-400 hover:text-yellow-300 text-sm underline"
//                 >
//                   Forgot password? Use magic link
//                 </button>
//               </div>
//             )}

//             {/* Magic Link Login Form */}
//             {loginMethod === "magic" && (
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Email Address</label>
//                   <input
//                     type="email"
//                     placeholder="your.email@nitkkr.ac.in"
//                     value={form.email}
//                     onChange={(e) => setForm({ ...form, email: e.target.value })}
//                     onKeyPress={(e) => e.key === 'Enter' && handleMagicLinkLogin(e)}
//                     className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition text-white placeholder:text-white/50"
//                   />
//                   <p className="text-xs text-white/50 mt-2">
//                     We'll send you a magic link to sign in
//                   </p>
//                 </div>

//                 <button
//                   onClick={handleMagicLinkLogin}
//                   disabled={loading}
//                   className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold p-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-yellow-400/20"
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 className="h-5 w-5 animate-spin" />
//                       Sending Magic Link...
//                     </>
//                   ) : (
//                     <>
//                       <Mail className="h-5 w-5" />
//                       Send Magic Link
//                     </>
//                   )}
//                 </button>
//               </div>
//             )}

//             <p className="text-center text-sm text-white/60 mt-6">
//               Don't have an account?{" "}
//               <a href="/signup" className="text-yellow-400 hover:text-yellow-300 underline font-medium">
//                 Sign up
//               </a>
//             </p>
//           </>
//         ) : (
//           // Email Sent Confirmation
//           <div className="text-center py-8">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-full mb-6">
//               <Mail className="w-10 h-10 text-yellow-400" />
//             </div>
            
//             <h2 className="text-2xl font-bold mb-3">Check your email!</h2>
//             <p className="text-white/70 text-base mb-2">
//               We've sent a magic link to
//             </p>
//             <p className="text-yellow-400 font-semibold text-lg mb-6">
//               {form.email}
//             </p>

//             <div className="bg-white/10 border border-white/20 rounded-lg p-4 text-left">
//               <h3 className="font-semibold mb-2 text-yellow-400">Next steps:</h3>
//               <ol className="text-sm text-white/80 space-y-2">
//                 <li>1. Open your email inbox</li>
//                 <li>2. Click the magic link</li>
//                 <li>3. You'll be logged in automatically</li>
//               </ol>
//             </div>

//             <button
//               onClick={() => {
//                 setEmailSent(false);
//                 setMessage("");
//               }}
//               className="w-full text-white/60 hover:text-white text-sm mt-6"
//             >
//               ← Back to login
//             </button>
//           </div>
//         )}

//         {/* Message Display */}
//         {message && (
//           <div className={`mt-4 p-3 rounded-lg border text-sm font-medium ${
//             msgType === "success"
//               ? "bg-green-500/10 border-green-500/30 text-green-400"
//               : "bg-red-500/10 border-red-500/30 text-red-400"
//           }`}>
//             {message}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }











"use client";
import React, { useState } from "react";
import { Loader2, Lock, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (!form.email.includes("@")) {
        throw new Error("Please enter a valid email");
      }
      if (form.password.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }

      console.log("🔐 Attempting login for:", form.email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (error) throw error;

      console.log("✅ Login successful:", data.user.id);
      setMessage("Login successful! Redirecting...");
      setMsgType("success");

      setTimeout(() => {
        router.push("/home");
      }, 500);

    } catch (err) {
      console.error("❌ Login error:", err);
      setMessage(err.message || "Invalid email or password");
      setMsgType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black px-6">
      <div className="w-full max-w-md p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md text-white shadow-2xl">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-white/70 text-sm">
            Sign in to your account
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              placeholder="your.email@nitkkr.ac.in"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition text-white placeholder:text-white/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                className="w-full bg-white/10 border border-white/20 rounded-lg p-3 pr-12 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition text-white placeholder:text-white/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold p-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-yellow-400/20"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <Lock className="h-5 w-5" />
                Sign In
              </>
            )}
          </button>
        </div>

        {message && (
          <div className={`mt-4 p-3 rounded-lg border text-sm font-medium ${
            msgType === "success"
              ? "bg-green-500/10 border-green-500/30 text-green-400"
              : "bg-red-500/10 border-red-500/30 text-red-400"
          }`}>
            {message}
          </div>
        )}

        <p className="text-center text-sm text-white/60 mt-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-yellow-400 hover:text-yellow-300 underline font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}