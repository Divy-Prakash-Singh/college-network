// "use client";
// import { useRouter } from "next/navigation";
// import { AlertCircle } from "lucide-react";

// export default function ErrorPage() {
//   const router = useRouter();

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black px-6">
//       <div className="w-full max-w-md p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md text-white text-center">
//         <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4">
//           <AlertCircle className="w-8 h-8 text-red-400" />
//         </div>
//         <h2 className="text-2xl font-bold mb-2">Verification Failed</h2>
//         <p className="text-white/70 text-sm mb-6">
//           The verification link is invalid or has expired.
//         </p>
//         <button
//           onClick={() => router.push("/signup")}
//           className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg transition"
//         >
//           Try Again
//         </button>
//       </div>
//     </div>
//   );
// }




"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Suspense } from "react";

function ErrorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get('message') || 'Something went wrong';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black px-6">
      <div className="w-full max-w-md p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md text-white text-center shadow-2xl">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4">
          <AlertCircle className="w-8 h-8 text-red-400" />
        </div>
        <h2 className="text-2xl font-bold mb-3">Authentication Failed</h2>
        <p className="text-white/70 text-sm mb-6">
          {message}
        </p>
        <div className="space-y-3">
          <button
            onClick={() => router.push("/signup")}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg transition"
          >
            Try Signing Up Again
          </button>
          <button
            onClick={() => router.push("/login")}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold p-3 rounded-lg transition border border-white/20"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  );
}












// "use client";
// import { useRouter, useSearchParams } from "next/navigation";
// import { AlertCircle, RefreshCw, Home } from "lucide-react";
// import { Suspense } from "react";

// function ErrorContent() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const message = searchParams.get('message') || 'unknown_error';

//   const getErrorDetails = () => {
//     switch (message) {
//       case 'link_expired':
//         return {
//           title: 'Link Expired',
//           description: 'This magic link has expired or has already been used. Please request a new one.',
//           action: 'Request New Link',
//           actionPath: '/signup'
//         };
//       case 'invalid_link':
//         return {
//           title: 'Invalid Link',
//           description: 'This authentication link is not valid. Please make sure you used the correct link from your email.',
//           action: 'Try Again',
//           actionPath: '/signup'
//         };
//       case 'authentication_failed':
//         return {
//           title: 'Authentication Failed',
//           description: 'We couldn\'t authenticate your account. Please try signing up again.',
//           action: 'Back to Signup',
//           actionPath: '/signup'
//         };
//       case 'already_authenticated':
//         return {
//           title: 'Already Logged In',
//           description: 'You are already logged in. Redirecting to home...',
//           action: 'Go to Home',
//           actionPath: '/home'
//         };
//       default:
//         return {
//           title: 'Something Went Wrong',
//           description: message,
//           action: 'Try Again',
//           actionPath: '/signup'
//         };
//     }
//   };

//   const errorDetails = getErrorDetails();

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black px-6">
//       <div className="w-full max-w-md p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md text-white text-center shadow-2xl">
//         <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4">
//           <AlertCircle className="w-8 h-8 text-red-400" />
//         </div>
        
//         <h2 className="text-2xl font-bold mb-3">{errorDetails.title}</h2>
//         <p className="text-white/70 text-sm mb-6">
//           {errorDetails.description}
//         </p>
        
//         <div className="space-y-3">
//           <button
//             onClick={() => router.push(errorDetails.actionPath)}
//             className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg transition flex items-center justify-center gap-2"
//           >
//             <RefreshCw className="w-4 h-4" />
//             {errorDetails.action}
//           </button>
          
//           <button
//             onClick={() => router.push("/home")}
//             className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold p-3 rounded-lg transition border border-white/20 flex items-center justify-center gap-2"
//           >
//             <Home className="w-4 h-4" />
//             Go to Home
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function ErrorPage() {
//   return (
//     <Suspense fallback={
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black">
//         <div className="text-white">Loading...</div>
//       </div>
//     }>
//       <ErrorContent />
//     </Suspense>
//   );
// }