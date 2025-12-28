// "use client";
// import { supabase } from "./supabaseClient";
// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export default function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const getUser = async () => {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (user) {
//         // fetch role from users table
//         const { data } = await supabase
//           .from("users")
//           .select("id, email, role")
//           .eq("id", user.id)
//           .single();
//         setCurrentUser(data);
//       }
//     };

//     getUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }



// "use client";
// import { supabase } from "./supabaseClient";
// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export default function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const getUser = async () => {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (user) {
//         // fetch user details from users table
//         const { data, error } = await supabase
//           .from("users")
//           .select("id, email, name, is_mentor, categories")
//           .eq("id", user.id)
//           .single();

//         if (!error && data) {
//           setCurrentUser(data);
//         }
//       }
//     };

//     getUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }





// 'use client'
// import { supabase } from "@/lib/supabaseClient";
// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export default function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const getUser = async () => {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (user) {
//         // fetch user with mentor info
//         const { data } = await supabase
//           .from("users")
//           .select("id, email, name, is_mentor")   // 👈 IMPORTANT
//           .eq("id", user.id)
//           .single();

//         setCurrentUser(data);
//       }
//     };

//     getUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }



// 'use client';
// import { supabase } from "@/lib/supabaseClient";
// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export default function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const getUser = async () => {
//       const { data: { user } } = await supabase.auth.getUser();

//       if (user) {
//         // fetch user with mentor info
//         let { data, error } = await supabase
//           .from("users")
//           .select("id, email, name, is_mentor")
//           .eq("id", user.id)
//           .single();

//         // if user not found in users table → insert it
//         if (!data) {
//           const { data: newUser, error: insertError } = await supabase
//             .from("users")
//             .insert([
//               {
//                 id: user.id,
//                 email: user.email,
//                 name: user.user_metadata?.full_name || "New User",
//                 is_mentor: false, // default false (you can set true in Supabase SQL)
//               },
//             ])
//             .select("id, email, name, is_mentor")
//             .single();

//           if (!insertError) data = newUser;
//         }

//         setCurrentUser(data);
//         console.log("AuthProvider -> currentUser:", data); // 👈 Debug log
//       }
//     };

//     getUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }


// 'use client';
// import { supabase } from "@/lib/supabaseClient";
// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export default function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getUser = async () => {
//       setLoading(true);

//       // ✅ Get logged-in user from Supabase Auth
//       const { data: { user }, error: authError } = await supabase.auth.getUser();

//       if (authError) {
//         console.error("Auth error:", authError);
//         setLoading(false);
//         return;
//       }

//       if (user) {
//         // ✅ Fetch user row from `users` table, including is_mentor
//         let { data, error } = await supabase
//           .from("users")
//           .select("id, email, name, is_mentor")
//           .eq("id", user.id)
//           .single();

//         // ✅ If not found in users table → insert new row
//         if (!data) {
//           const { data: newUser, error: insertError } = await supabase
//             .from("users")
//             .insert([
//               {
//                 id: user.id,
//                 email: user.email,
//                 name: user.user_metadata?.full_name || "New User",
//                 is_mentor: false, // default → you can update in Supabase
//               },
//             ])
//             .select("id, email, name, is_mentor")
//             .single();

//           if (!insertError) {
//             data = newUser;
//           }
//         }

//         // ✅ Save to state
//         setCurrentUser(data);
//         console.log("AuthProvider -> currentUser:", data); // 👀 Debug log
//       }

//       setLoading(false);
//     };

//     getUser();

//     // ✅ Listen to auth state changes (login/logout)
//     const { data: listener } = supabase.auth.onAuthStateChange(() => {
//       getUser();
//     });

//     return () => {
//       listener.subscription.unsubscribe();
//     };
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }









// 'use client';
// import { supabase } from "@/lib/supabaseClient";
// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export default function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const getUser = async () => {
//     setLoading(true);
//     console.log("🔍 Checking Supabase session...");

//     const { data: { user }, error: authError } = await supabase.auth.getUser();

//     if (authError) {
//       console.error("❌ Auth error:", authError);
//       setCurrentUser(null);
//       setLoading(false);
//       return;
//     }

//     if (!user) {
//       console.log("⚠️ No active user session.");
//       setCurrentUser(null);
//       setLoading(false);
//       return;
//     }

//     console.log("👤 Supabase Auth user:", user);

//     // Fetch from users table
//     let { data, error } = await supabase
//       .from("users")
//       .select("id, email, name, is_mentor")
//       .eq("id", user.id)
//       .single();

//     if (error) {
//       console.error("❌ Users table fetch error:", error);
//     }

//     if (!data) {
//       console.log("⚠️ No row in users table, inserting new user...");
//       const { data: newUser, error: insertError } = await supabase
//         .from("users")
//         .insert([
//           {
//             id: user.id,
//             email: user.email,
//             name: user.user_metadata?.full_name || "New User",
//             is_mentor: false,
//           },
//         ])
//         .select("id, email, name, is_mentor")
//         .single();

//       if (insertError) {
//         console.error("❌ Insert error:", insertError);
//       } else {
//         console.log("✅ Inserted new user:", newUser);
//         data = newUser;
//       }
//     }

//     setCurrentUser(data);
//     console.log("✅ AuthProvider -> currentUser:", data);
//     setLoading(false);
//   };

//   useEffect(() => {
//     getUser();

//     // ✅ Keep session synced
//     const { data: listener } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         console.log("🔄 Auth state changed:", event);
//         if (session) {
//           await getUser();
//         } else {
//           setCurrentUser(null);
//         }
//       }
//     );

//     return () => {
//       listener.subscription.unsubscribe();
//     };
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }







// "use client";
// import { supabase } from "@/lib/supabaseClient";
// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext(null);

// export default function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const loadUserProfile = async (user) => {
//     // fetch user row
//     let { data, error } = await supabase
//       .from("users")
//       .select("id, email, name, is_mentor")
//       .eq("id", user.id)
//       .single();

//     // if not exists — create
//     if (!data) {
//       const { data: newUser } = await supabase
//         .from("users")
//         .insert([
//           {
//             id: user.id,
//             email: user.email,
//             name: user.user_metadata?.full_name || "New User",
//             is_mentor: false,
//           },
//         ])
//         .select("id, email, name, is_mentor")
//         .single();

//       data = newUser;
//     }

//     setCurrentUser(data);
//     console.log("✅ CurrentUser:", data);
//   };

//   useEffect(() => {
//     const init = async () => {
//       setLoading(true);

//       const res = await supabase.auth.getSession();
//       const session = res?.data?.session || null;

//       if (session?.user) {
//         await loadUserProfile(session.user);
//       }

//       setLoading(false);
//     };

//     init();

//     // auth state listener
//     const { data: listener } = supabase.auth.onAuthStateChange(
//       async (_event, session) => {
//         if (session?.user) {
//           await loadUserProfile(session.user);
//         } else {
//           setCurrentUser(null);
//         }
//       }
//     );

//     return () => listener?.subscription?.unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }














// "use client";
// import { supabase } from "@/lib/supabaseClient";
// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext(null);

// export default function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // const loadUserProfile = async (user) => {
//   //   try {
//   //     // 1️⃣ Try fetching from users table
//   //     let { data, error } = await supabase
//   //       .from("users")
//   //       .select("id, email, name, branch, is_mentor, categories")
//   //       .eq("id", user.id)
//   //       .maybeSingle();

//   //     // 2️⃣ If no row exists, create one using metadata
//   //     if (!data) {
//   //       console.log("🆕 Creating new profile for:", user.email);
//   //       const { data: newUser, error: insertError } = await supabase
//   //         .from("users")
//   //         .insert([
//   //           {
//   //             id: user.id,
//   //             email: user.email,
//   //             name: user.user_metadata?.full_name || "New User",
//   //             branch: user.user_metadata?.branch || "",
//   //             is_mentor:
//   //               user.user_metadata?.is_mentor === true ||
//   //               user.user_metadata?.is_mentor === "true",
//   //             categories:
//   //               Array.isArray(user.user_metadata?.categories)
//   //                 ? user.user_metadata?.categories
//   //                 : [],
//   //           },
//   //         ])
//   //         .select()
//   //         .single();

//   //       if (insertError) throw insertError;
//   //       data = newUser;
//   //     }

//   //     // 3️⃣ Set current user
//   //     setCurrentUser(data);
//   //     console.log("✅ CurrentUser LOADED:", data);
//   //   } catch (err) {
//   //     console.error("❌ loadUserProfile error:", err.message);
//   //   }
//   // };



//   // In lib/AuthProvider.jsx around line 480-500

// const loadUserProfile = async (userId) => {
//   try {
//     console.log("📊 Loading user profile for:", userId);

//     // First, check if user exists in users table
//     const { data: existingUser, error: fetchError } = await supabase
//       .from("users")
//       .select("*")
//       .eq("id", userId)
//       .single();

//     if (fetchError && fetchError.code !== 'PGRST116') {
//       // PGRST116 = not found, which is okay
//       throw fetchError;
//     }

//     if (existingUser) {
//       console.log("✅ User profile loaded:", existingUser);
//       setCurrentUser(existingUser);
//       return existingUser;
//     }

//     // If user doesn't exist in users table, get from auth metadata
//     const { data: { user }, error: authError } = await supabase.auth.getUser();
    
//     if (authError) throw authError;

//     if (user) {
//       // Create user record from auth metadata
//       const newUserData = {
//         id: user.id,
//         email: user.email,
//         name: user.user_metadata?.full_name || "",
//         branch: user.user_metadata?.branch || "",
//         is_mentor: user.user_metadata?.is_mentor || false,
//         categories: user.user_metadata?.categories || [],
//       };

//       // Use upsert to avoid duplicate key errors
//       const { data: insertedUser, error: insertError } = await supabase
//         .from("users")
//         .upsert(newUserData, {
//           onConflict: 'id',
//           ignoreDuplicates: false
//         })
//         .select()
//         .single();

//       if (insertError) throw insertError;

//       console.log("✅ User profile created:", insertedUser);
//       setCurrentUser(insertedUser);
//       return insertedUser;
//     }

//   } catch (err) {
//     console.error("❌ loadUserProfile error:", err.message);
//   }
// };
//   useEffect(() => {
//     const init = async () => {
//       setLoading(true);
//       const { data } = await supabase.auth.getSession();
//       const session = data?.session;

//       if (session?.user) {
//         await loadUserProfile(session.user.id);

//       }

//       setLoading(false);
//     };

//     init();

//     const { data: listener } = supabase.auth.onAuthStateChange(
//       async (_event, session) => {
//         if (session?.user) {
//           await loadUserProfile(session.user.id);

//         } else {
//           setCurrentUser(null);
//         }
//       }
//     );

//     return () => listener?.subscription?.unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }





// "use client";
// import { supabase } from "@/lib/supabaseClient";
// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext(null);

// export default function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const loadUserProfile = async (userId) => {
//     try {
//       console.log("📊 Loading user profile for:", userId);

//       // Check if user exists in users table
//       const { data: existingUser, error: fetchError } = await supabase
//         .from("users")
//         .select("*")
//         .eq("id", userId)
//         .maybeSingle();

//       if (fetchError && fetchError.code !== 'PGRST116') {
//         throw fetchError;
//       }

//       if (existingUser) {
//         console.log("✅ User profile loaded:", existingUser);
//         setCurrentUser(existingUser);
//         return existingUser;
//       }

//       // If user doesn't exist, get from auth metadata and create
//       const { data: { user }, error: authError } = await supabase.auth.getUser();
      
//       if (authError) throw authError;

//       if (user) {
//         const newUserData = {
//           id: user.id,
//           email: user.email,
//           name: user.user_metadata?.full_name || "",
//           branch: user.user_metadata?.branch || "",
//           is_mentor: user.user_metadata?.is_mentor || false,
//           categories: user.user_metadata?.categories || [],
//         };

//         // Use upsert to avoid duplicate key errors
//         const { data: insertedUser, error: insertError } = await supabase
//           .from("users")
//           .upsert(newUserData, {
//             onConflict: 'id',
//             ignoreDuplicates: false
//           })
//           .select()
//           .single();

//         if (insertError) {
//           console.error("❌ Insert error:", insertError);
//           throw insertError;
//         }

//         console.log("✅ User profile created:", insertedUser);
//         setCurrentUser(insertedUser);
//         return insertedUser;
//       }

//     } catch (err) {
//       console.error("❌ loadUserProfile error:", err.message);
//     }
//   };

//   useEffect(() => {
//     const init = async () => {
//       setLoading(true);
//       const { data } = await supabase.auth.getSession();
//       const session = data?.session;

//       if (session?.user) {
//         await loadUserProfile(session.user.id);
//       }

//       setLoading(false);
//     };

//     init();

//     const { data: listener } = supabase.auth.onAuthStateChange(
//       async (_event, session) => {
//         if (session?.user) {
//           await loadUserProfile(session.user.id);
//         } else {
//           setCurrentUser(null);
//         }
//       }
//     );

//     return () => listener?.subscription?.unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }




// "use client";
// import { supabase } from "@/lib/supabaseClient";
// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext(null);

// export default function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const loadUserProfile = async (userId) => {
//     try {
//       console.log("📊 Loading user profile for:", userId);

//       // Fetch user from users table (created by trigger)
//       const { data: user, error } = await supabase
//         .from("users")
//         .select("*")
//         .eq("id", userId)
//         .single();

//       if (error) {
//         if (error.code === 'PGRST116') {
//           // User not found - wait a moment for trigger to complete
//           console.log("⏳ Waiting for user profile creation...");
//           await new Promise(resolve => setTimeout(resolve, 1000));
          
//           // Try one more time
//           const { data: retryUser, error: retryError } = await supabase
//             .from("users")
//             .select("*")
//             .eq("id", userId)
//             .single();

//           if (!retryError && retryUser) {
//             console.log("✅ User profile loaded (retry):", retryUser);
//             setCurrentUser(retryUser);
//             return retryUser;
//           }
//         }
//         throw error;
//       }

//       console.log("✅ User profile loaded:", user);
//       setCurrentUser(user);
//       return user;

//     } catch (err) {
//       console.error("❌ loadUserProfile error:", err.message);
//     }
//   };

//   useEffect(() => {
//     const init = async () => {
//       setLoading(true);
//       const { data } = await supabase.auth.getSession();
//       const session = data?.session;

//       if (session?.user) {
//         await loadUserProfile(session.user.id);
//       }

//       setLoading(false);
//     };

//     init();

//     const { data: listener } = supabase.auth.onAuthStateChange(
//       async (_event, session) => {
//         if (session?.user) {
//           await loadUserProfile(session.user.id);
//         } else {
//           setCurrentUser(null);
//         }
//       }
//     );

//     return () => listener?.subscription?.unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }






// "use client";
// import { supabase } from "@/lib/supabaseClient";
// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext(null);

// export default function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const loadUserProfile = async (userId) => {
//     try {
//       console.log("📊 Loading user profile for:", userId);

//       // Fetch user from users table
//       const { data: user, error } = await supabase
//         .from("users")
//         .select("*")
//         .eq("id", userId)
//         .maybeSingle();

//       if (error) {
//         console.error("❌ Error loading profile:", error);
        
//         // If user not found, wait for trigger to create it
//         if (error.code === 'PGRST116') {
//           console.log("⏳ User profile not found, waiting for creation...");
//           await new Promise(resolve => setTimeout(resolve, 1500));
          
//           // Try one more time
//           const { data: retryUser, error: retryError } = await supabase
//             .from("users")
//             .select("*")
//             .eq("id", userId)
//             .maybeSingle();

//           if (!retryError && retryUser) {
//             console.log("✅ User profile loaded (retry):", retryUser);
//             setCurrentUser(retryUser);
//             return retryUser;
//           } else {
//             console.error("❌ Still no profile after retry");
//           }
//         }
        
//         throw error;
//       }

//       if (user) {
//         console.log("✅ User profile loaded:", user);
//         setCurrentUser(user);
//         return user;
//       }

//     } catch (err) {
//       console.error("❌ loadUserProfile error:", err.message);
//       setCurrentUser(null);
//     }
//   };

//   useEffect(() => {
//     let isMounted = true;

//     const init = async () => {
//       try {
//         setLoading(true);
        
//         const { data, error } = await supabase.auth.getSession();
        
//         if (error) {
//           console.error("Session error:", error);
//           return;
//         }

//         const session = data?.session;

//         if (session?.user && isMounted) {
//           await loadUserProfile(session.user.id);
//         }
//       } catch (error) {
//         console.error("Init error:", error);
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     init();

//     // Listen for auth changes
//     const { data: listener } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         console.log("🔔 Auth state changed:", event);
        
//         if (!isMounted) return;

//         if (session?.user) {
//           setLoading(true);
//           await loadUserProfile(session.user.id);
//           setLoading(false);
//         } else {
//           setCurrentUser(null);
//           setLoading(false);
//         }
//       }
//     );

//     return () => {
//       isMounted = false;
//       listener?.subscription?.unsubscribe();
//     };
//   }, []);

//   // Don't render children until we've checked auth
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black">
//         <div className="text-white flex flex-col items-center gap-3">
//           <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
//           <span className="text-sm">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <AuthContext.Provider value={{ currentUser, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }





// "use client";

// import { createContext, useEffect, useState } from "react";
// import { supabase } from "@/lib/supabaseClient";

// export const AuthContext = createContext({
//   currentUser: null,
//   loading: true,
// });

// export default function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const loadUserProfile = async (userId) => {
//     const { data, error } = await supabase
//       .from("users")
//       .select("*")
//       .eq("id", userId)
//       .single();

//     if (error) {
//       console.error("❌ Profile load error:", error.message);
//       return null;
//     }

//     return data;
//   };

//   useEffect(() => {
//     let mounted = true;

//     // 1️⃣ Get initial session
//     const init = async () => {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();

//       if (!mounted) return;

//       if (session?.user) {
//         const profile = await loadUserProfile(session.user.id);
//         if (mounted) setCurrentUser(profile);
//       }

//       if (mounted) setLoading(false);
//     };

//     init();

//     // 2️⃣ Listen to auth changes
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange(async (event, session) => {
//       if (!mounted) return;

//       if (!session?.user) {
//         setCurrentUser(null);
//         setLoading(false);
//         return;
//       }

//       setLoading(true);
//       const profile = await loadUserProfile(session.user.id);
//       setCurrentUser(profile);
//       setLoading(false);
//     });

//     return () => {
//       mounted = false;
//       subscription.unsubscribe();
//     };
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black">
//         <div className="flex items-center gap-3 text-white">
//           <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
//           <span>Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <AuthContext.Provider value={{ currentUser, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }











// "use client";

// import { createContext, useEffect, useState } from "react";
// import { supabase } from "@/lib/supabaseClient";

// export const AuthContext = createContext({
//   currentUser: null,
//   loading: true,
// });

// export default function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const loadUserProfile = async (userId) => {
//     try {
//       // Add timeout to prevent hanging
//       const timeoutPromise = new Promise((_, reject) =>
//         setTimeout(() => reject(new Error('Profile fetch timeout')), 8000)
//       );

//       const fetchPromise = supabase
//         .from("users")
//         .select("*")
//         .eq("id", userId)
//         .single();

//       const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);

//       if (error) {
//         console.error("❌ Profile load error:", error.message);
        
//         // If profile doesn't exist, create it
//         if (error.code === 'PGRST116') {
//           console.log("🔧 Creating user profile...");
//           const { data: { user } } = await supabase.auth.getUser();
          
//           if (user) {
//             const { data: newProfile, error: insertError } = await supabase
//               .from("users")
//               .insert({
//                 id: user.id,
//                 email: user.email,
//                 name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
//                 is_mentor: false,
//               })
//               .select()
//               .single();

//             if (insertError) {
//               console.error("❌ Profile creation error:", insertError);
//               return null;
//             }

//             return newProfile;
//           }
//         }
        
//         return null;
//       }

//       return data;
//     } catch (err) {
//       console.error("❌ Profile fetch failed:", err.message);
//       return null;
//     }
//   };

//   useEffect(() => {
//     let mounted = true;
//     let authSubscription = null;

//     const initAuth = async () => {
//       try {
//         // Set a maximum initialization time
//         const initTimeout = setTimeout(() => {
//           if (mounted && loading) {
//             console.warn("⚠️ Auth initialization timeout, continuing anyway...");
//             setLoading(false);
//           }
//         }, 10000); // 10 second max

//         // Get initial session with timeout
//         const sessionPromise = supabase.auth.getSession();
//         const timeoutPromise = new Promise((_, reject) =>
//           setTimeout(() => reject(new Error('Session fetch timeout')), 5000)
//         );

//         const { data: { session }, error } = await Promise.race([
//           sessionPromise,
//           timeoutPromise
//         ]);

//         clearTimeout(initTimeout);

//         if (!mounted) return;

//         if (error) {
//           console.error("❌ Session error:", error.message);
//           setCurrentUser(null);
//           setLoading(false);
//           return;
//         }

//         if (session?.user) {
//           const profile = await loadUserProfile(session.user.id);
//           if (mounted) {
//             setCurrentUser(profile);
//           }
//         }

//         if (mounted) {
//           setLoading(false);
//         }
//       } catch (err) {
//         console.error("❌ Auth initialization error:", err.message);
//         if (mounted) {
//           setCurrentUser(null);
//           setLoading(false);
//         }
//       }
//     };

//     // Initialize auth
//     initAuth();

//     // Listen to auth changes
//     const setupAuthListener = () => {
//       const { data: { subscription } } = supabase.auth.onAuthStateChange(
//         async (event, session) => {
//           if (!mounted) return;

//           console.log("🔐 Auth event:", event);

//           // Handle sign out
//           if (event === 'SIGNED_OUT' || !session?.user) {
//             setCurrentUser(null);
//             setLoading(false);
//             return;
//           }

//           // Handle sign in or token refresh
//           if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
//             setLoading(true);
//             const profile = await loadUserProfile(session.user.id);
//             if (mounted) {
//               setCurrentUser(profile);
//               setLoading(false);
//             }
//           }
//         }
//       );

//       authSubscription = subscription;
//     };

//     setupAuthListener();

//     // Cleanup
//     return () => {
//       mounted = false;
//       if (authSubscription) {
//         authSubscription.unsubscribe();
//       }
//     };
//   }, []);

//   // Show loading screen while initializing
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black">
//         <div className="flex items-center gap-3 text-white">
//           <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
//           <span>Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <AuthContext.Provider value={{ currentUser, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }












// "use client";

// import { createContext, useEffect, useState, useCallback } from "react";
// import { supabase } from "@/lib/supabaseClient";

// export const AuthContext = createContext({
//   currentUser: null,
//   loading: true,
//   refreshUser: () => {},
// });

// export default function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [initializing, setInitializing] = useState(true);

//   // Load user profile with timeout and auto-create
//   const loadUserProfile = useCallback(async (userId) => {
//     try {
//       // Add timeout to prevent hanging (5 seconds)
//       const controller = new AbortController();
//       const timeoutId = setTimeout(() => controller.abort(), 5000);

//       const { data, error } = await supabase
//         .from("users")
//         .select("*")
//         .eq("id", userId)
//         .abortSignal(controller.signal)
//         .single();

//       clearTimeout(timeoutId);

//       if (error) {
//         console.error("❌ Profile load error:", error.message);
        
//         // If profile doesn't exist (PGRST116), create it
//         if (error.code === 'PGRST116') {
//           console.log("🔧 Creating user profile for:", userId);
          
//           const { data: { user } } = await supabase.auth.getUser();
          
//           if (user && user.id === userId) {
//             const { data: newProfile, error: insertError } = await supabase
//               .from("users")
//               .insert({
//                 id: user.id,
//                 email: user.email,
//                 name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
//                 is_mentor: false,
//               })
//               .select()
//               .single();

//             if (insertError) {
//               console.error("❌ Profile creation error:", insertError);
//               return null;
//             }

//             console.log("✅ Profile created successfully");
//             return newProfile;
//           }
//         }
        
//         return null;
//       }

//       return data;
//     } catch (err) {
//       if (err.name === 'AbortError') {
//         console.error("⏱️ Profile fetch timeout");
//       } else {
//         console.error("❌ Profile fetch failed:", err.message);
//       }
//       return null;
//     }
//   }, []);

//   // Refresh user profile
//   const refreshUser = useCallback(async () => {
//     const { data: { session } } = await supabase.auth.getSession();
//     if (session?.user) {
//       const profile = await loadUserProfile(session.user.id);
//       setCurrentUser(profile);
//     }
//   }, [loadUserProfile]);

//   useEffect(() => {
//     let mounted = true;
//     let authSubscription = null;
//     let maxInitTimeout = null;

//     const initAuth = async () => {
//       try {
//         // Maximum initialization time: 8 seconds
//         maxInitTimeout = setTimeout(() => {
//           if (mounted && initializing) {
//             console.warn("⚠️ Auth initialization timeout - continuing anyway");
//             setInitializing(false);
//             setLoading(false);
//           }
//         }, 8000);

//         // Get initial session with timeout
//         const controller = new AbortController();
//         const sessionTimeout = setTimeout(() => controller.abort(), 4000);

//         const { data: { session }, error } = await supabase.auth.getSession();
        
//         clearTimeout(sessionTimeout);
//         clearTimeout(maxInitTimeout);

//         if (!mounted) return;

//         if (error) {
//           console.error("❌ Session error:", error.message);
//           setCurrentUser(null);
//           setInitializing(false);
//           setLoading(false);
//           return;
//         }

//         if (session?.user) {
//           console.log("✅ Session found, loading profile...");
//           const profile = await loadUserProfile(session.user.id);
//           if (mounted) {
//             setCurrentUser(profile);
//             console.log("✅ Profile loaded:", profile?.email);
//           }
//         } else {
//           console.log("ℹ️ No active session");
//         }

//         if (mounted) {
//           setInitializing(false);
//           setLoading(false);
//         }
//       } catch (err) {
//         console.error("❌ Auth initialization error:", err.message);
//         if (mounted) {
//           setCurrentUser(null);
//           setInitializing(false);
//           setLoading(false);
//         }
//       }
//     };

//     // Initialize auth
//     initAuth();

//     // Listen to auth changes
//     const setupAuthListener = () => {
//       const { data: { subscription } } = supabase.auth.onAuthStateChange(
//         async (event, session) => {
//           if (!mounted) return;

//           console.log("🔐 Auth event:", event);

//           // Handle sign out
//           if (event === 'SIGNED_OUT' || !session?.user) {
//             setCurrentUser(null);
//             setLoading(false);
//             return;
//           }

//           // Handle sign in or token refresh
//           if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
//             // Only show loading if we don't have a user yet
//             if (!currentUser) {
//               setLoading(true);
//             }
            
//             const profile = await loadUserProfile(session.user.id);
            
//             if (mounted) {
//               setCurrentUser(profile);
//               setLoading(false);
//             }
//           }
//         }
//       );

//       authSubscription = subscription;
//     };

//     setupAuthListener();

//     // Cleanup
//     return () => {
//       mounted = false;
//       if (authSubscription) {
//         authSubscription.unsubscribe();
//       }
//       if (maxInitTimeout) {
//         clearTimeout(maxInitTimeout);
//       }
//     };
//   }, [loadUserProfile, currentUser]);

//   // Show loading screen only during initial load
//   if (initializing || loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black">
//         <div className="flex flex-col items-center gap-4 text-white">
//           <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
//           <span className="text-lg">Loading your experience...</span>
//           <span className="text-sm text-white/60">This should only take a moment</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <AuthContext.Provider value={{ currentUser, loading, refreshUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }










// "use client";

// import { createContext, useEffect, useState, useCallback } from "react";
// import { supabase } from "@/lib/supabaseClient";

// export const AuthContext = createContext({
//   currentUser: null,
//   loading: true,
//   refreshUser: async () => {},
// });

// export default function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 🔹 Load profile safely (never blocks app)
//   const loadProfile = useCallback(async (userId) => {
//     const { data, error } = await supabase
//       .from("users")
//       .select("*")
//       .eq("id", userId)
//       .maybeSingle();

//     if (error) {
//       console.error("Profile fetch error:", error.message);
//       return null;
//     }

//     return data ?? null;
//   }, []);

//   // 🔹 Manual refresh
//   const refreshUser = useCallback(async () => {
//     const { data: { session } } = await supabase.auth.getSession();
//     if (session?.user) {
//       const profile = await loadProfile(session.user.id);
//       setCurrentUser(profile);
//     }
//   }, [loadProfile]);

//   // 🔹 INIT ONCE
//   useEffect(() => {
//     let mounted = true;

//     const init = async () => {
//       try {
//         const { data: { session } } = await supabase.auth.getSession();

//         if (!mounted) return;

//         if (!session?.user) {
//           setCurrentUser(null);
//           setLoading(false);
//           return;
//         }

//         const profile = await loadProfile(session.user.id);
//         if (mounted) {
//           setCurrentUser(profile);
//           setLoading(false);
//         }
//       } catch (err) {
//         console.error("Auth init failed:", err);
//         if (mounted) setLoading(false);
//       }
//     };

//     init();

//     // 🔹 Auth listener (NO INITIAL_SESSION LOOP)
//     const { data: { subscription } } =
//       supabase.auth.onAuthStateChange(async (event, session) => {

//         if (!mounted) return;

//         // ❌ IGNORE this (Supabase fires it automatically)
//         if (event === "INITIAL_SESSION") return;

//         if (!session?.user) {
//           setCurrentUser(null);
//           setLoading(false);
//           return;
//         }

//         setLoading(true);
//         const profile = await loadProfile(session.user.id);
//         setCurrentUser(profile);
//         setLoading(false);
//       });

//     return () => {
//       mounted = false;
//       subscription.unsubscribe();
//     };
//   }, [loadProfile]); // ✅ NO currentUser dependency

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-black text-white">
//         Loading…
//       </div>
//     );
//   }

//   return (
//     <AuthContext.Provider value={{ currentUser, loading, refreshUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
















// "use client";

// import { createContext, useEffect, useState, useCallback } from "react";
// import { supabase } from "@/lib/supabaseClient";

// export const AuthContext = createContext({
//   currentUser: null,
//   loading: true,
//   refreshUser: async () => {},
// });

// export default function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 🔹 Load profile safely
//   const loadProfile = async (userId) => {
//     try {
//       const { data, error } = await supabase
//         .from("users")
//         .select("*")
//         .eq("id", userId)
//         .maybeSingle();

//       if (error) {
//         console.error("Profile fetch error:", error.message);
//         return null;
//       }

//       return data ?? null;
//     } catch (err) {
//       console.error("Profile fetch failed:", err);
//       return null;
//     }
//   };

//   // 🔹 Manual refresh
//   const refreshUser = useCallback(async () => {
//     try {
//       const { data: { session } } = await supabase.auth.getSession();
//       if (session?.user) {
//         const profile = await loadProfile(session.user.id);
//         setCurrentUser(profile);
//       } else {
//         setCurrentUser(null);
//       }
//     } catch (err) {
//       console.error("Refresh user failed:", err);
//     }
//   }, []);

//   // 🔹 INIT ONCE - NO dependencies that change
//   useEffect(() => {
//     let mounted = true;
//     let hasInitialized = false;

//     const init = async () => {
//       try {
//         const { data: { session } } = await supabase.auth.getSession();

//         if (!mounted) return;

//         if (!session?.user) {
//           setCurrentUser(null);
//           setLoading(false);
//           return;
//         }

//         const profile = await loadProfile(session.user.id);
//         if (mounted) {
//           setCurrentUser(profile);
//           setLoading(false);
//         }
//       } catch (err) {
//         console.error("Auth init failed:", err);
//         if (mounted) {
//           setCurrentUser(null);
//           setLoading(false);
//         }
//       }
//     };

//     init();

//     // 🔹 Auth listener
//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         console.log("Auth event:", event); // Debug log

//         if (!mounted) return;

//         // Skip initial session to prevent double-load
//         if (event === "INITIAL_SESSION") {
//           if (!hasInitialized) {
//             hasInitialized = true;
//           }
//           return;
//         }

//         if (event === "SIGNED_OUT") {
//           setCurrentUser(null);
//           setLoading(false);
//           return;
//         }

//         if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
//           if (session?.user) {
//             setLoading(true);
//             const profile = await loadProfile(session.user.id);
//             if (mounted) {
//               setCurrentUser(profile);
//               setLoading(false);
//             }
//           }
//         }
//       }
//     );

//     return () => {
//       mounted = false;
//       subscription.unsubscribe();
//     };
//   }, []); // ✅ Empty dependency array

//   // 🔹 Add timeout fallback
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       if (loading) {
//         console.warn("Auth loading timeout - forcing load completion");
//         setLoading(false);
//       }
//     }, 5000); // 5 second timeout

//     return () => clearTimeout(timeout);
//   }, [loading]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-black text-white">
//         Loading…
//       </div>
//     );
//   }

//   return (
//     <AuthContext.Provider value={{ currentUser, loading, refreshUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }








// "use client";

// import { createContext, useEffect, useState } from "react";
// import { supabase } from "@/lib/supabaseClient";

// export const AuthContext = createContext({
//   currentUser: null,
//   loading: true,
//   refreshUser: async () => {},
// });

// export default function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [initialized, setInitialized] = useState(false);

//   useEffect(() => {
//     let mounted = true;

//     const initAuth = async () => {
//       try {
//         console.log("🔄 Initializing auth...");
        
//         const { data: { session }, error } = await supabase.auth.getSession();
        
//         if (error) {
//           console.error("❌ Session error:", error);
//           if (mounted) {
//             setCurrentUser(null);
//             setLoading(false);
//             setInitialized(true);
//           }
//           return;
//         }

//         if (!session?.user) {
//           console.log("❌ No session found");
//           if (mounted) {
//             setCurrentUser(null);
//             setLoading(false);
//             setInitialized(true);
//           }
//           return;
//         }

//         console.log("✅ Session found, fetching profile...");
        
//         // Fetch profile
//         const { data: profile, error: profileError } = await supabase
//           .from("users")
//           .select("*")
//           .eq("id", session.user.id)
//           .maybeSingle();

//         if (profileError) {
//           console.error("❌ Profile error:", profileError);
//         }

//         if (mounted) {
//           setCurrentUser(profile || null);
//           setLoading(false);
//           setInitialized(true);
//           console.log("✅ Auth initialized with user:", profile?.name || profile?.id);
//         }

//       } catch (err) {
//         console.error("❌ Init error:", err);
//         if (mounted) {
//           setCurrentUser(null);
//           setLoading(false);
//           setInitialized(true);
//         }
//       }
//     };

//     // Only init once
//     if (!initialized) {
//       initAuth();
//     }

//     // Auth state listener
//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         console.log("🔔 Auth event:", event);

//         if (!mounted) return;

//         // Ignore initial session - we handle it above
//         if (event === "INITIAL_SESSION") return;

//         if (event === "SIGNED_OUT") {
//           setCurrentUser(null);
//           return;
//         }

//         if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
//           if (session?.user) {
//             const { data: profile } = await supabase
//               .from("users")
//               .select("*")
//               .eq("id", session.user.id)
//               .maybeSingle();
            
//             setCurrentUser(profile || null);
//           }
//         }
//       }
//     );

//     // Safety timeout - force loading to complete after 3 seconds
//     const timeout = setTimeout(() => {
//       if (mounted && loading) {
//         console.warn("⚠️ Auth timeout - forcing completion");
//         setLoading(false);
//         setInitialized(true);
//       }
//     }, 3000);

//     return () => {
//       mounted = false;
//       subscription.unsubscribe();
//       clearTimeout(timeout);
//     };
//   }, []); // Empty deps - runs once

//   const refreshUser = async () => {
//     try {
//       const { data: { session } } = await supabase.auth.getSession();
//       if (session?.user) {
//         const { data: profile } = await supabase
//           .from("users")
//           .select("*")
//           .eq("id", session.user.id)
//           .maybeSingle();
//         setCurrentUser(profile || null);
//       }
//     } catch (err) {
//       console.error("Refresh error:", err);
//     }
//   };

//   // Always show loading screen if still loading
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-black text-white">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
//           <p>Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <AuthContext.Provider value={{ currentUser, loading, refreshUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }













// "use client";

// import { createContext, useEffect, useState } from "react";
// import { supabase } from "@/lib/supabaseClient";

// export const AuthContext = createContext({
//   currentUser: null,
//   loading: true,
//   refreshUser: async () => {},
// });

// export default function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let mounted = true;
//     let authSubscription = null;

//     const initAuth = async () => {
//       try {
//         console.log("🔄 [AuthProvider] Starting initialization...");

//         // Get current session
//         const { data: { session }, error: sessionError } = await supabase.auth.getSession();

//         if (sessionError) {
//           console.error("❌ [AuthProvider] Session error:", sessionError);
//           if (mounted) {
//             setCurrentUser(null);
//             setLoading(false);
//           }
//           return;
//         }

//         if (!session) {
//           console.log("❌ [AuthProvider] No active session");
//           if (mounted) {
//             setCurrentUser(null);
//             setLoading(false);
//           }
//           return;
//         }

//         console.log("✅ [AuthProvider] Session found, user ID:", session.user.id);

//         // Fetch user profile
//         const { data: profile, error: profileError } = await supabase
//           .from("users")
//           .select("*")
//           .eq("id", session.user.id)
//           .maybeSingle();

//         if (profileError) {
//           console.error("❌ [AuthProvider] Profile error:", profileError);
//           if (mounted) {
//             setCurrentUser(null);
//             setLoading(false);
//           }
//           return;
//         }

//         if (!profile) {
//           console.warn("⚠️ [AuthProvider] No profile found for user:", session.user.id);
//           if (mounted) {
//             setCurrentUser(null);
//             setLoading(false);
//           }
//           return;
//         }

//         console.log("✅ [AuthProvider] Profile loaded:", profile.name || profile.id);

//         if (mounted) {
//           setCurrentUser(profile);
//           setLoading(false);
//         }

//       } catch (err) {
//         console.error("❌ [AuthProvider] Unexpected error:", err);
//         if (mounted) {
//           setCurrentUser(null);
//           setLoading(false);
//         }
//       }
//     };

//     // Initialize auth
//     initAuth();

//     // Set up auth state listener
//     const setupAuthListener = () => {
//       const { data: { subscription } } = supabase.auth.onAuthStateChange(
//         async (event, session) => {
//           console.log("🔔 [AuthProvider] Auth event:", event);

//           if (!mounted) {
//             console.log("⏭️ [AuthProvider] Component unmounted, ignoring event");
//             return;
//           }

//           // Skip INITIAL_SESSION - we handle it in initAuth
//           if (event === "INITIAL_SESSION") {
//             console.log("⏭️ [AuthProvider] Skipping INITIAL_SESSION");
//             return;
//           }

//           // Handle sign out
//           if (event === "SIGNED_OUT") {
//             console.log("👋 [AuthProvider] User signed out");
//             setCurrentUser(null);
//             setLoading(false);
//             return;
//           }

//           // Handle sign in or token refresh
//           if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
//             if (!session) {
//               console.log("⚠️ [AuthProvider] No session in", event);
//               setCurrentUser(null);
//               setLoading(false);
//               return;
//             }

//             console.log("🔄 [AuthProvider] Refreshing profile for:", session.user.id);

//             try {
//               const { data: profile, error } = await supabase
//                 .from("users")
//                 .select("*")
//                 .eq("id", session.user.id)
//                 .maybeSingle();

//               if (error) {
//                 console.error("❌ [AuthProvider] Profile refresh error:", error);
//                 setCurrentUser(null);
//               } else if (profile) {
//                 console.log("✅ [AuthProvider] Profile refreshed:", profile.name || profile.id);
//                 setCurrentUser(profile);
//               } else {
//                 console.warn("⚠️ [AuthProvider] No profile found on refresh");
//                 setCurrentUser(null);
//               }
//             } catch (err) {
//               console.error("❌ [AuthProvider] Profile refresh failed:", err);
//               setCurrentUser(null);
//             }

//             setLoading(false);
//           }
//         }
//       );

//       authSubscription = subscription;
//       console.log("✅ [AuthProvider] Auth listener setup complete");
//     };

//     setupAuthListener();

//     // Safety timeout - force loading to complete
//     const safetyTimeout = setTimeout(() => {
//       if (mounted && loading) {
//         console.warn("⚠️ [AuthProvider] Safety timeout triggered - forcing load complete");
//         setLoading(false);
//       }
//     }, 5000);

//     // Cleanup
//     return () => {
//       console.log("🧹 [AuthProvider] Cleaning up...");
//       mounted = false;
//       if (authSubscription) {
//         authSubscription.unsubscribe();
//       }
//       clearTimeout(safetyTimeout);
//     };
//   }, []); // Empty dependency array - only run once

//   const refreshUser = async () => {
//     console.log("🔄 [AuthProvider] Manual refresh requested");
//     try {
//       const { data: { session } } = await supabase.auth.getSession();
//       if (session?.user) {
//         const { data: profile } = await supabase
//           .from("users")
//           .select("*")
//           .eq("id", session.user.id)
//           .maybeSingle();
//         setCurrentUser(profile || null);
//         console.log("✅ [AuthProvider] Manual refresh complete");
//       } else {
//         setCurrentUser(null);
//         console.log("❌ [AuthProvider] No session on manual refresh");
//       }
//     } catch (err) {
//       console.error("❌ [AuthProvider] Manual refresh error:", err);
//     }
//   };

//   console.log("🎨 [AuthProvider] Rendering - loading:", loading, "user:", !!currentUser);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-black text-white">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400 mx-auto mb-4"></div>
//           <p className="text-lg">Loading your session...</p>
//         </div>
//       </div>
//     );
//   }
// console.log("🔄 [AuthProvider] Starting initialization...");
//   return (
//     <AuthContext.Provider value={{ currentUser, loading, refreshUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }















// "use client";

// import { createContext, useEffect, useState, useCallback } from "react";
// import { supabase } from "@/lib/supabaseClient";

// export const AuthContext = createContext({
//   currentUser: null,
//   loading: true,
//   refreshUser: async () => {},
// });

// export default function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const loadProfile = useCallback(async (userId) => {
//     try {
//       const { data, error } = await supabase
//         .from("users")
//         .select("*")
//         .eq("id", userId)
//         .maybeSingle();

//       if (error) throw error;
//       return data ?? null;
//     } catch (err) {
//       console.error("Profile fetch failed:", err.message);
//       return null;
//     }
//   }, []);

//   const initAuth = useCallback(async () => {
//     try {
//       const { data: { session } } = await supabase.auth.getSession();

//       if (!session?.user) {
//         setCurrentUser(null);
//         setLoading(false);
//         return;
//       }

//       // 🔑 IMPORTANT: set minimal user immediately
//       setCurrentUser({ id: session.user.id });

//       // 🔄 Fetch profile in background
//       loadProfile(session.user.id).then((profile) => {
//         if (profile) setCurrentUser(profile);
//       });

//       setLoading(false);
//     } catch (err) {
//       console.error("Auth init error:", err);
//       setLoading(false);
//     }
//   }, [loadProfile]);

//   useEffect(() => {
//     initAuth();

//     const { data: { subscription } } =
//       supabase.auth.onAuthStateChange((event, session) => {
//         if (!session?.user) {
//           setCurrentUser(null);
//           return;
//         }

//         setCurrentUser({ id: session.user.id });
//         loadProfile(session.user.id).then((profile) => {
//           if (profile) setCurrentUser(profile);
//         });
//       });

//     return () => subscription.unsubscribe();
//   }, [initAuth, loadProfile]);

//   return (
//     <AuthContext.Provider value={{ currentUser, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }















// "use client";

// import { createContext, useEffect, useState, useCallback } from "react";
// import { supabase } from "@/lib/supabaseClient";

// export const AuthContext = createContext({
//   currentUser: null,
//   loading: true,
//   refreshUser: async () => {},
// });

// export default function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const loadProfile = useCallback(async (userId) => {
//     try {
//       const { data, error } = await supabase
//         .from("users")
//         .select("*")
//         .eq("id", userId)
//         .maybeSingle();

//       if (error) throw error;
//       return data ?? null;
//     } catch (err) {
//       console.error("Profile fetch failed:", err.message);
//       return null;
//     }
//   }, []);

//   const initAuth = useCallback(async () => {
//     try {
//       const { data: { session } } = await supabase.auth.getSession();

//       if (!session?.user) {
//         setCurrentUser(null);
//         setLoading(false);
//         return;
//       }

//       // 🔑 IMPORTANT: set minimal user immediately
//       setCurrentUser({ id: session.user.id });

//       // 🔄 Fetch profile in background
//       loadProfile(session.user.id).then((profile) => {
//         if (profile) setCurrentUser(profile);
//       });

//       setLoading(false);
//     } catch (err) {
//       console.error("Auth init error:", err);
//       setLoading(false);
//     }
//   }, [loadProfile]);

//   useEffect(() => {
//     initAuth();

//     const { data: { subscription } } =
//       supabase.auth.onAuthStateChange((event, session) => {
//         if (!session?.user) {
//           setCurrentUser(null);
//           return;
//         }

//         setCurrentUser({ id: session.user.id });
//         loadProfile(session.user.id).then((profile) => {
//           if (profile) setCurrentUser(profile);
//         });
//       });

//     return () => subscription.unsubscribe();
//   }, [initAuth, loadProfile]);

//   return (
//     <AuthContext.Provider value={{ currentUser, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }









// "use client";

// import { createContext, useEffect, useState } from "react";
// import { supabase } from "@/lib/supabaseClient";

// export const AuthContext = createContext({
//   currentUser: null,
//   loading: true,
//   refreshUser: async () => {},
// });

// export default function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let mounted = true;

//     // 🔹 Load profile function (defined inside useEffect)
//     const loadProfile = async (userId) => {
//       try {
//         console.log("📥 [AuthProvider] Fetching profile for:", userId);
//         const { data, error } = await supabase
//           .from("users")
//           .select("*")
//           .eq("id", userId)
//           .maybeSingle();

//         if (error) {
//           console.error("❌ [AuthProvider] Profile error:", error);
//           return null;
//         }

//         console.log("✅ [AuthProvider] Profile loaded:", data?.name || data?.id);
//         return data ?? null;
//       } catch (err) {
//         console.error("❌ [AuthProvider] Profile fetch failed:", err);
//         return null;
//       }
//     };

//     // 🔹 Initialize auth
//     const initAuth = async () => {
//       try {
//         console.log("🔄 [AuthProvider] Initializing auth...");
        
//         const { data: { session }, error } = await supabase.auth.getSession();

//         if (error) {
//           console.error("❌ [AuthProvider] Session error:", error);
//           if (mounted) {
//             setCurrentUser(null);
//             setLoading(false);
//           }
//           return;
//         }

//         if (!session?.user) {
//           console.log("❌ [AuthProvider] No session found");
//           if (mounted) {
//             setCurrentUser(null);
//             setLoading(false);
//           }
//           return;
//         }

//         console.log("✅ [AuthProvider] Session found:", session.user.id);

//         // Set minimal user first (fast)
//         if (mounted) {
//           setCurrentUser({ id: session.user.id });
//           setLoading(false); // ← Set loading false immediately
//         }

//         // Load full profile in background
//         const profile = await loadProfile(session.user.id);
//         if (mounted && profile) {
//           setCurrentUser(profile);
//         }

//       } catch (err) {
//         console.error("❌ [AuthProvider] Init error:", err);
//         if (mounted) {
//           setCurrentUser(null);
//           setLoading(false);
//         }
//       }
//     };

//     // Run initialization
//     initAuth();

//     // 🔹 Auth state listener
//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         console.log("🔔 [AuthProvider] Auth event:", event);

//         if (!mounted) return;

//         // Skip INITIAL_SESSION (handled by initAuth)
//         if (event === "INITIAL_SESSION") return;

//         if (event === "SIGNED_OUT") {
//           console.log("👋 [AuthProvider] User signed out");
//           setCurrentUser(null);
//           return;
//         }

//         if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
//           if (!session?.user) {
//             setCurrentUser(null);
//             return;
//           }

//           console.log("🔄 [AuthProvider] Updating user:", session.user.id);
          
//           // Set minimal user first
//           setCurrentUser({ id: session.user.id });

//           // Load full profile
//           const profile = await loadProfile(session.user.id);
//           if (mounted && profile) {
//             setCurrentUser(profile);
//           }
//         }
//       }
//     );

//     // Cleanup
//     return () => {
//       console.log("🧹 [AuthProvider] Cleaning up");
//       mounted = false;
//       subscription.unsubscribe();
//     };
//   }, []); // ✅ EMPTY DEPENDENCIES - runs only once

//   const refreshUser = async () => {
//     try {
//       const { data: { session } } = await supabase.auth.getSession();
//       if (session?.user) {
//         const { data: profile } = await supabase
//           .from("users")
//           .select("*")
//           .eq("id", session.user.id)
//           .maybeSingle();
//         setCurrentUser(profile || null);
//       }
//     } catch (err) {
//       console.error("Refresh error:", err);
//     }
//   };

//   console.log("🎨 [AuthProvider] Render - loading:", loading, "user:", !!currentUser);

//   // Don't block render with loading screen
//   // Let pages handle their own loading states
//   return (
//     <AuthContext.Provider value={{ currentUser, loading, refreshUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }



























// "use client";

// import { createContext, useEffect, useState } from "react";
// import { supabase } from "@/lib/supabaseClient";

// export const AuthContext = createContext({
//   currentUser: null,
//   loading: true,
//   refreshUser: async () => {},
// });

// export default function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const loadProfile = async (userId) => {
//     const { data, error } = await supabase
//       .from("users")
//       .select("*")
//       .eq("id", userId)
//       .single();

//     if (error) {
//       console.error("Profile load error:", error);
//       return null;
//     }
//     return data;
//   };

//   useEffect(() => {
//     let mounted = true;

//     const init = async () => {
//       const { data } = await supabase.auth.getSession();
//       const session = data.session;

//       if (!session?.user) {
//         if (mounted) {
//           setCurrentUser(null);
//           setLoading(false);
//         }
//         return;
//       }

//       const profile = await loadProfile(session.user.id);

//       if (mounted) {
//         setCurrentUser(profile); // ✅ ALWAYS full profile
//         setLoading(false);
//       }
//     };

//     init();

//     const { data: sub } = supabase.auth.onAuthStateChange(
//       async (_event, session) => {
//         if (!mounted) return;

//         if (!session?.user) {
//           setCurrentUser(null);
//           return;
//         }

//         const profile = await loadProfile(session.user.id);
//         setCurrentUser(profile);
//       }
//     );

//     return () => {
//       mounted = false;
//       sub.subscription.unsubscribe();
//     };
//   }, []);

//   const refreshUser = async () => {
//     const { data } = await supabase.auth.getSession();
//     if (!data.session?.user) return;

//     const profile = await loadProfile(data.session.user.id);
//     setCurrentUser(profile);
//   };

//   return (
//     <AuthContext.Provider value={{ currentUser, loading, refreshUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }














"use client";

import { createContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export const AuthContext = createContext({
  currentUser: null,
  loading: true,
  refreshUser: async () => {},
});

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadProfile = async (userId) => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", userId)
          .maybeSingle();

        if (error) {
          console.error("❌ [AuthProvider] Profile error:", error);
          return null;
        }
        return data ?? null;
      } catch (err) {
        console.error("❌ [AuthProvider] Profile error:", err);
        return null;
      }
    };

    const initAuth = async () => {
      try {
        console.log("🔄 [AuthProvider] Starting...");

        const { data: { session }, error } = await supabase.auth.getSession();

        if (error || !session?.user) {
          console.log("❌ [AuthProvider] No session");
          if (mounted) {
            setCurrentUser(null);
            setLoading(false);
          }
          return;
        }

        console.log("✅ [AuthProvider] Session found:", session.user.id);

        // Set loading false IMMEDIATELY
        if (mounted) {
          setLoading(false);
          setCurrentUser({ id: session.user.id });
        }

        // Load profile in background
        const profile = await loadProfile(session.user.id);
        if (mounted && profile) {
          setCurrentUser(profile);
          console.log("✅ [AuthProvider] Profile loaded:", profile.name);
        }
      } catch (err) {
        console.error("❌ [AuthProvider] Init error:", err);
        if (mounted) {
          setCurrentUser(null);
          setLoading(false);
        }
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("🔔 [AuthProvider] Event:", event);
        if (!mounted || event === "INITIAL_SESSION") return;

        if (event === "SIGNED_OUT") {
          setCurrentUser(null);
        } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          if (session?.user) {
            setCurrentUser({ id: session.user.id });
            const profile = await loadProfile(session.user.id);
            if (mounted && profile) setCurrentUser(profile);
          }
        }
      }
    );

    // Safety timeout
    const timeout = setTimeout(() => {
      if (mounted && loading) {
        console.warn("⚠️ [AuthProvider] Timeout - forcing complete");
        setLoading(false);
      }
    }, 3000);

    return () => {
      mounted = false;
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const refreshUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .maybeSingle();
        setCurrentUser(profile || null);
      }
    } catch (err) {
      console.error("Refresh error:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}