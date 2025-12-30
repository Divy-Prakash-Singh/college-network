// app/profile/ProfileClient.js
"use client";

import BottomNavbar from "@/components/BottomNavbar";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState, useContext, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { AuthContext } from "@/lib/AuthProvider";

const ProfileClient = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { currentUser, loading: authLoading } = useContext(AuthContext);

  const userId = params.get("userId"); // profile being viewed

  const [userData, setUserData] = useState(null);

  // ✅ check if this is my own profile
  const isOwnProfile = useMemo(() => {
    if (!currentUser) return false;
    if (!userId) return true;
    return currentUser.id === userId;
  }, [currentUser, userId]);

  useEffect(() => {
    if (authLoading) return;
    if (!currentUser) router.replace("/login");
  }, [authLoading, currentUser, router]);

  useEffect(() => {
    const fetchProfile = async () => {
      let idToFetch = userId;
      if (!idToFetch && currentUser?.id) idToFetch = currentUser.id;
      if (!idToFetch) return;

      const { data, error } = await supabase
        .from("users")
        .select("id, name, branch, bio, is_mentor, profile_image, background_image, categories")
        .eq("id", idToFetch)
        .single();

      if (!error) setUserData(data);
    };

    fetchProfile();
  }, [userId, currentUser?.id]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  const handleAskQuestion = () => {
    if (!userData?.id) return;
    const defaultCat =
      Array.isArray(userData.categories) && userData.categories.length > 0
        ? userData.categories[0]
        : "Technology";

    router.push(`/ask?mentorId=${userData.id}&category=${encodeURIComponent(defaultCat)}`);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-white text-center">
            <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        </div>
        <BottomNavbar />
      </div>
    );
  }

  if (!currentUser) return null;

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white">
        <Navbar />
        <div className="flex items-center justify-center py-20">User not found.</div>
        <BottomNavbar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white">
      <Navbar />

      <div className="flex flex-col items-center">
        {/* Banner */}
        <div className="w-full max-w-4xl relative">
          <div className="h-48 sm:h-56 md:h-64 bg-gray-800 rounded-xl overflow-hidden">
            <img
              src={
                userData.background_image ||
                "https://via.placeholder.com/1200x400?text=Background"
              }
              className="w-full h-full object-cover opacity-90"
              alt="Background"
            />
          </div>

          {/* Avatar */}
          <div className="absolute -bottom-14 left-8 flex items-center space-x-4">
            <img
              src={userData.profile_image || "https://via.placeholder.com/160?text=User"}
              className="w-28 h-28 rounded-full border-4 border-gray-950 object-cover"
              alt="Profile"
            />
            <div className="mt-16">
              <h2 className="text-2xl font-semibold">{userData.name}</h2>
              <p className="text-gray-400">{userData.branch || "Branch"}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="w-full max-w-4xl mt-24 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">About</h3>

            <div className="flex items-center gap-2">
              {userData.is_mentor && (
                <span className="px-4 py-1 text-sm rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-400/30">
                  Mentor
                </span>
              )}

              {isOwnProfile && (
                <>
                  <button
                    onClick={() => router.push("/profile/edit")}
                    className="px-4 py-1 text-sm rounded-full bg-yellow-400 text-black hover:bg-yellow-500"
                  >
                    Edit Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="px-4 py-1 text-sm rounded-full bg-white/10 border border-white/20 hover:bg-white/20"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed">
            {userData.bio || "No bio added yet."}
          </p>

          {/* Categories */}
          {Array.isArray(userData.categories) && userData.categories.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2 text-white/80">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {userData.categories.map((cat) => (
                  <span
                    key={cat}
                    className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/20"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Ask Button */}
          {!isOwnProfile && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleAskQuestion}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-2 rounded-full shadow-lg shadow-yellow-400/30"
              >
                Ask Question
              </button>
            </div>
          )}
        </div>

        <BottomNavbar />
      </div>
    </div>
  );
};

export default ProfileClient;