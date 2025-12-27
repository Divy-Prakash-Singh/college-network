"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/lib/AuthProvider";
import { supabase } from "@/lib/supabaseClient";

export default function SessionDebugger() {
  const { currentUser, loading } = useContext(AuthContext);
  const [sessionInfo, setSessionInfo] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSessionInfo({
        hasSession: !!session,
        userId: session?.user?.id,
        email: session?.user?.email,
        expiresAt: session?.expires_at,
      });
    };
    checkSession();

    // Update every 5 seconds
    const interval = setInterval(checkSession, 5000);
    return () => clearInterval(interval);
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setShow(!show)}
        className="fixed bottom-24 right-4 bg-purple-600 text-white px-3 py-2 rounded-full text-xs font-bold z-50 shadow-lg hover:bg-purple-700 transition-all"
      >
        🔐 Debug
      </button>

      {/* Debug Panel */}
      {show && (
        <div className="fixed bottom-40 right-4 bg-black/95 border border-purple-500 text-white p-4 rounded-lg text-xs z-50 max-w-sm shadow-2xl">
          <div className="flex items-center justify-between mb-3">
            <div className="font-bold text-purple-400">🔐 Auth Debug Panel</div>
            <button 
              onClick={() => setShow(false)}
              className="text-white/60 hover:text-white"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-white/5 rounded">
              <span className="text-white/70">Loading:</span>
              <span className={loading ? 'text-yellow-400' : 'text-green-400'}>
                {loading ? '⏳ Yes' : '✅ No'}
              </span>
            </div>

            <div className="flex items-center justify-between p-2 bg-white/5 rounded">
              <span className="text-white/70">User Loaded:</span>
              <span className={currentUser ? 'text-green-400' : 'text-red-400'}>
                {currentUser ? '✅ Yes' : '❌ No'}
              </span>
            </div>

            <div className="flex items-center justify-between p-2 bg-white/5 rounded">
              <span className="text-white/70">Session:</span>
              <span className={sessionInfo?.hasSession ? 'text-green-400' : 'text-red-400'}>
                {sessionInfo?.hasSession ? '✅ Active' : '❌ None'}
              </span>
            </div>

            {currentUser && (
              <div className="mt-3 p-2 bg-purple-900/30 rounded border border-purple-500/30">
                <div className="text-purple-400 font-semibold mb-2">User Info:</div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/60">ID:</span>
                    <span className="text-white/90 font-mono">{currentUser.id?.slice(0, 8)}...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Email:</span>
                    <span className="text-white/90">{currentUser.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Name:</span>
                    <span className="text-white/90">{currentUser.name || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Mentor:</span>
                    <span className={currentUser.is_mentor ? 'text-green-400' : 'text-gray-400'}>
                      {currentUser.is_mentor ? '✅ Yes' : '❌ No'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {sessionInfo?.expiresAt && (
              <div className="mt-2 text-xs text-white/50">
                Session expires: {new Date(sessionInfo.expiresAt * 1000).toLocaleTimeString()}
              </div>
            )}

            <div className="mt-3 pt-3 border-t border-white/10">
              <button
                onClick={async () => {
                  const { data, error } = await supabase.auth.refreshSession();
                  if (error) alert('Refresh failed: ' + error.message);
                  else alert('Session refreshed!');
                }}
                className="w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white font-medium transition-colors"
              >
                🔄 Refresh Session
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// TO USE: Add this to any page
// import SessionDebugger from '@/components/SessionDebugger';
// <SessionDebugger />