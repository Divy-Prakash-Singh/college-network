"use client";

import React, { useEffect, useMemo, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import BottomNavbar from "@/components/BottomNavbar";
import { supabase } from "@/lib/supabaseClient";
import { AuthContext } from "@/lib/AuthProvider";

export default function AskQuestionClient() {
  const router = useRouter();
  const { currentUser, loading: authLoading } = useContext(AuthContext);

  const [toMentorId, setToMentorId] = useState(null);
  const [toMentorName, setToMentorName] = useState(null);

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

  useEffect(() => {
    // client-only query string parsing
    const params = new URLSearchParams(window.location.search);
    setToMentorId(params.get("to") || null);
    setToMentorName(params.get("name") || null);
  }, []);

  useEffect(() => {
    if (!authLoading && !currentUser) router.replace("/login");
  }, [authLoading, currentUser, router]);

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
        if (error) console.error("❌ Mentor fetch error:", error);
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
    if (!formData.imageFile || !currentUser?.id) return null;

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

    const { data } = supabase.storage.from("question-images").getPublicUrl(path);
    return data?.publicUrl || null;
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

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black flex items-center justify-center">
        <p className="text-white/80">Preparing page…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black">
      <Navbar />

      <div className="min-h-screen flex items-center justify-center p-6">
        {/* ...keep your JSX exactly as you had it... */}
      </div>

      <BottomNavbar />
    </div>
  );
}