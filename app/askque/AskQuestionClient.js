// app/askque/AskQuestionClient.js
"use client";

import React, { useEffect, useMemo, useState, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import BottomNavbar from "@/components/BottomNavbar";
import { supabase } from "@/lib/supabaseClient";
import { AuthContext } from "@/lib/AuthProvider";

export default function AskQuestionClient() {
  const router = useRouter();
  const search = useSearchParams();
  const { currentUser, loading: authLoading } = useContext(AuthContext);

  const toMentorId = search.get("to") || null;
  const toMentorName = search.get("name") || null;

  const [mentor, setMentor] = useState(null);
  const [loadingMentor, setLoadingMentor] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    question: "",
    imageFile: null,
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const GLOBAL_CATEGORIES = [
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
    "AI",
  ];

  // Auth redirect
  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.replace("/login");
    }
  }, [authLoading, currentUser, router]);

  // Fetch mentor
  useEffect(() => {
    if (!toMentorId || !currentUser) return;

    let mounted = true;
    setLoadingMentor(true);

    supabase
      .from("users")
      .select("id, name, branch, categories, profile_image, background_image, is_mentor")
      .eq("id", toMentorId)
      .single()
      .then(({ data, error }) => {
        if (error) console.error("❌ [AskQue] Mentor error:", error);
        if (mounted) {
          setMentor(data || null);
          setLoadingMentor(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [toMentorId, currentUser]);

  const categoryOptions = useMemo(() => {
    return mentor?.categories?.length ? mentor.categories : GLOBAL_CATEGORIES;
  }, [mentor?.categories]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, imageFile: files?.[0] || null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const uploadImageIfAny = async () => {
    if (!formData.imageFile) return null;
    if (!currentUser?.id) return null;

    const file = formData.imageFile;
    const ext = file.name.split(".").pop();
    const path = `${currentUser.id}/${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from("question-images")
      .upload(path, file, { cacheControl: "3600", upsert: false });

    if (error) {
      console.error("❌ Upload failed:", error);
      return null;
    }

    const { data: pub } = supabase.storage.from("question-images").getPublicUrl(path);
    return pub?.publicUrl || null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!formData.title.trim() || !formData.question.trim() || !formData.category) {
      setErrorMsg("Please fill Title, Category, and Question.");
      return;
    }

    if (!currentUser?.id) {
      setErrorMsg("You must be logged in.");
      return;
    }

    setSubmitting(true);
    try {
      const imageUrl = await uploadImageIfAny();

      const payload = {
        title: formData.title.trim(),
        question: formData.question.trim(),
        category: formData.category,
        image: imageUrl,
        author_id: currentUser.id,
        ...(toMentorId && { assigned_to: toMentorId }),
      };

      const { error } = await supabase.from("questions").insert([payload]);
      if (error) throw error;

      setSuccessMsg("✅ Question posted successfully!");
      setTimeout(() => router.push("/home"), 1200);
    } catch (err) {
      console.error("❌ Submit error:", err);
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  // Show loading
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center p-6">
        {/* KEEP YOUR EXISTING JSX HERE — you already have it */}
        {/* I’m not rewriting the whole form again; paste your form JSX back in this spot unchanged */}
      </div>
      <BottomNavbar />
    </div>
  );
}