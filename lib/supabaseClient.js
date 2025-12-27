// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// lib/supabaseClient.js


// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseAnonKey) {
//   console.error("❌ Supabase credentials are missing.");
// }

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);





// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseAnonKey) {
//   console.error("❌ Supabase credentials are missing.");
// }
// console.log("ENV URL RAW =", process.env.NEXT_PUBLIC_SUPABASE_URL);
// console.log("ENV KEY RAW =", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     persistSession: true,   // ✅ keep session in localStorage
//     autoRefreshToken: true, // ✅ automatically refresh tokens
//     detectSessionInUrl: true,
//   },
// });








// // lib/supabaseClient.js
// import { createClient } from "@supabase/supabase-js";

// const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// console.log("------ SUPABASE DEBUG ------");
// console.log("URL present:", !!url, "| value =", url);
// console.log("KEY present:", !!key, "| begins with =", key ? key.substring(0, 6) + "..." : "undefined");
// console.log("-----------------------------");

// if (!url || !key) {
//   console.error("❌ Supabase credentials are missing from .env.local !");
// }

// export const supabase = createClient(url, key, {
//   auth: {
//     persistSession: true,
//     autoRefreshToken: true,
//     detectSessionInUrl: true,
//   },
//   // NOTE: default headers, etc. could be added here if needed
// });



// import { createClient } from "@supabase/supabase-js";

// const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// export const supabase = createClient(url, key, {auth: {
//     persistSession: true,
//     autoRefreshToken: true,
//     detectSessionInUrl: true,
//   },})

// // 👇 DEV ONLY
// if (typeof window !== "undefined") {
//   window.supabase = supabase;
 
// }



// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error('Missing Supabase environment variables');
// }

// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     persistSession: true,
//     autoRefreshToken: true,
//     detectSessionInUrl: true,
//     flowType: 'pkce',
//   },
// });

// // Dev tool
// if (typeof window !== "undefined") {
//   window.supabase = supabase;
// }





// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error('Missing Supabase environment variables');
// }

// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     persistSession: true,
//     autoRefreshToken: true,
//     detectSessionInUrl: true,
//     flowType: 'pkce',
//     storage: typeof window !== 'undefined' ? window.localStorage : undefined,
//     storageKey: 'supabase.auth.token',
//   },
//   global: {
//     headers: {
//       'x-client-info': 'supabase-js-web'
//     }
//   },
//   db: {
//     schema: 'public'
//   },
//   realtime: {
//     params: {
//       eventsPerSecond: 10
//     }
//   }
// });

// // Handle visibility changes to refresh session
// if (typeof window !== 'undefined') {
//   window.supabase = supabase;

//   let refreshTimeout;
  
//   const handleVisibilityChange = async () => {
//     if (!document.hidden) {
//       // Clear any pending refresh
//       if (refreshTimeout) {
//         clearTimeout(refreshTimeout);
//       }
      
//       // Debounce the refresh to avoid too many calls
//       refreshTimeout = setTimeout(async () => {
//         try {
//           const { error } = await supabase.auth.refreshSession();
//           if (error && error.message !== 'Auth session missing!') {
//             console.warn('Session refresh warning:', error.message);
//           }
//         } catch (err) {
//           console.warn('Failed to refresh session:', err);
//         }
//       }, 300);
//     }
//   };

//   const handleOnline = async () => {
//     try {
//       await supabase.auth.refreshSession();
//     } catch (err) {
//       console.warn('Failed to refresh session on online:', err);
//     }
//   };

//   document.addEventListener('visibilitychange', handleVisibilityChange);
//   window.addEventListener('online', handleOnline);
//   window.addEventListener('focus', handleVisibilityChange);

//   // Cleanup on page unload
//   window.addEventListener('beforeunload', () => {
//     if (refreshTimeout) {
//       clearTimeout(refreshTimeout);
//     }
//   });
// }




// // lib/supabaseClient.js
// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error("Missing Supabase environment variables");
// }

// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     persistSession: true,
//     autoRefreshToken: true,
//     detectSessionInUrl: true,
//     flowType: "pkce",
//     storageKey: "sb-auth",
//   },
// });








// // lib/supabaseClient.js
// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error("Missing Supabase environment variables");
// }

// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     persistSession: true,
//     autoRefreshToken: true,
//     detectSessionInUrl: true,
//     flowType: "pkce",
//     // Use default storage key to avoid conflicts
//     storage: typeof window !== 'undefined' ? window.localStorage : undefined,
//   },
//   global: {
//     headers: {
//       'x-client-info': 'supabase-js-web'
//     }
//   },
//   db: {
//     schema: 'public'
//   }
// });

// // Dev tool (optional)
// if (typeof window !== "undefined") {
//   window.supabase = supabase;
// }












// lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: "pkce",
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
  global: {
    headers: {
      'x-client-info': 'supabase-js-web'
    }
  },
  db: {
    schema: 'public'
  },
  // Add request timeout
  fetch: typeof window !== 'undefined' ? window.fetch.bind(window) : undefined,
});

// Dev tool (optional - remove in production)
if (typeof window !== "undefined" && process.env.NODE_ENV === 'development') {
  window.supabase = supabase;
}