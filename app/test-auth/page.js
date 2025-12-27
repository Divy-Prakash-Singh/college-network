"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/lib/AuthProvider";
import { supabase } from "@/lib/supabaseClient";
import SessionDebugger from "@/components/SessionDebugger";

export default function TestAuthPage() {
  const { currentUser, loading, refreshUser } = useContext(AuthContext);
  const [logs, setLogs] = useState([]);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);

  const addLog = (message, type = 'info') => {
    setLogs(prev => [...prev, { 
      message, 
      type, 
      time: new Date().toLocaleTimeString() 
    }].slice(-10)); // Keep last 10 logs
  };

  useEffect(() => {
    addLog('✅ Page loaded', 'success');
  }, []);

  useEffect(() => {
    if (currentUser) {
      addLog(`✅ User loaded: ${currentUser.email}`, 'success');
    } else if (!loading) {
      addLog('⚠️ No user found', 'warning');
    }
  }, [currentUser, loading]);

  // Test tab switching
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        addLog('👋 Tab hidden', 'info');
      } else {
        addLog('👁️ Tab visible', 'info');
        setTabSwitchCount(prev => prev + 1);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const testSession = async () => {
    addLog('🔍 Checking session...', 'info');
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      addLog(`❌ Session error: ${error.message}`, 'error');
    } else if (data.session) {
      addLog('✅ Session active', 'success');
    } else {
      addLog('❌ No session', 'error');
    }
  };

  const testProfileFetch = async () => {
    if (!currentUser?.id) {
      addLog('❌ No user ID', 'error');
      return;
    }
    
    addLog('🔍 Fetching profile...', 'info');
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', currentUser.id)
      .single();

    if (error) {
      addLog(`❌ Profile error: ${error.message}`, 'error');
    } else {
      addLog('✅ Profile fetched', 'success');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">
          🧪 Auth System Test Page
        </h1>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Loading Status */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="text-sm text-white/60 mb-2">Loading Status</div>
            <div className={`text-2xl font-bold ${loading ? 'text-yellow-400' : 'text-green-400'}`}>
              {loading ? '⏳ Loading...' : '✅ Ready'}
            </div>
          </div>

          {/* User Status */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="text-sm text-white/60 mb-2">User Status</div>
            <div className={`text-2xl font-bold ${currentUser ? 'text-green-400' : 'text-red-400'}`}>
              {currentUser ? '✅ Logged In' : '❌ Not Logged In'}
            </div>
          </div>

          {/* Tab Switches */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="text-sm text-white/60 mb-2">Tab Switches</div>
            <div className="text-2xl font-bold text-blue-400">
              {tabSwitchCount} times
            </div>
          </div>
        </div>

        {/* User Info */}
        {currentUser && (
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-yellow-400 mb-4">
              👤 Current User
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-white/60">Email:</span>
                <span className="text-white ml-2">{currentUser.email}</span>
              </div>
              <div>
                <span className="text-white/60">Name:</span>
                <span className="text-white ml-2">{currentUser.name || 'N/A'}</span>
              </div>
              <div>
                <span className="text-white/60">ID:</span>
                <span className="text-white ml-2 font-mono text-xs">{currentUser.id}</span>
              </div>
              <div>
                <span className="text-white/60">Mentor:</span>
                <span className={`ml-2 ${currentUser.is_mentor ? 'text-green-400' : 'text-gray-400'}`}>
                  {currentUser.is_mentor ? '✅ Yes' : '❌ No'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Test Buttons */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-yellow-400 mb-4">
            🧪 Test Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              onClick={testSession}
              className="px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors"
            >
              🔍 Check Session
            </button>
            <button
              onClick={testProfileFetch}
              className="px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
              disabled={!currentUser}
            >
              👤 Fetch Profile
            </button>
            <button
              onClick={refreshUser}
              className="px-4 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition-colors"
            >
              🔄 Refresh User
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-medium transition-colors"
            >
              ♻️ Reload Page
            </button>
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-yellow-400">
              📋 Activity Log
            </h2>
            <button
              onClick={() => setLogs([])}
              className="text-xs text-white/60 hover:text-white"
            >
              Clear
            </button>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {logs.length === 0 ? (
              <div className="text-white/40 text-center py-4">No logs yet</div>
            ) : (
              logs.map((log, idx) => (
                <div
                  key={idx}
                  className={`text-sm p-2 rounded ${
                    log.type === 'success' ? 'bg-green-500/10 text-green-400' :
                    log.type === 'error' ? 'bg-red-500/10 text-red-400' :
                    log.type === 'warning' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-blue-500/10 text-blue-400'
                  }`}
                >
                  <span className="text-white/40 text-xs">[{log.time}]</span>{' '}
                  {log.message}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
          <h3 className="text-lg font-bold text-yellow-400 mb-3">
            📝 Testing Instructions
          </h3>
          <ol className="text-white/80 space-y-2 text-sm list-decimal list-inside">
            <li>Check if loading status shows "Ready"</li>
            <li>Verify user status shows "Logged In"</li>
            <li>Switch to another tab and come back (watch tab switches counter)</li>
            <li>Click "Check Session" to verify session is active</li>
            <li>Click "Fetch Profile" to test database connection</li>
            <li>If everything works, you're good to go! ✅</li>
          </ol>
        </div>
      </div>

      <SessionDebugger />
    </div>
  );
}