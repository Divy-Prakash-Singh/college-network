"use client";

import React, { useEffect, useMemo, useState, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import BottomNavbar from "@/components/BottomNavbar";
import { supabase } from "@/lib/supabaseClient";
import { AuthContext } from "@/lib/AuthProvider";

export default function AskQueClient() {
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

  // 🔐 Auth redirect (NON-blocking)
  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.replace("/login");
    }
  }, [authLoading, currentUser, router]);

  // 👤 Fetch mentor
  useEffect(() => {
    if (!toMentorId || !currentUser) return;

    let mounted = true;
    setLoadingMentor(true);

    supabase
      .from("users")
      .select(
        "id, name, branch, categories, profile_image, background_image, is_mentor"
      )
      .eq("id", toMentorId)
      .single()
      .then(({ data, error }) => {
        if (error) console.error("Mentor fetch error:", error);
        if (mounted) {
          setMentor(data || null);
          setLoadingMentor(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [toMentorId, currentUser]);

  const categoryOptions = useMemo(
    () => mentor?.categories?.length ? mentor.categories : GLOBAL_CATEGORIES,
    [mentor?.categories]
  );

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((p) => ({ ...p, imageFile: files?.[0] || null }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  const uploadImageIfAny = async () => {
    if (!formData.imageFile || !currentUser?.id) return null;

    const ext = formData.imageFile.name.split(".").pop();
    const path = `${currentUser.id}/${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from("question-images")
      .upload(path, formData.imageFile);

    if (error) return null;

    const { data } = supabase.storage
      .from("question-images")
      .getPublicUrl(path);

    return data?.publicUrl || null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!formData.title || !formData.question || !formData.category) {
      setErrorMsg("Please fill all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const imageUrl = await uploadImageIfAny();

      await supabase.from("questions").insert([
        {
          title: formData.title,
          question: formData.question,
          category: formData.category,
          image: imageUrl,
          author_id: currentUser.id,
          ...(toMentorId && { assigned_to: toMentorId }),
        },
      ]);

      setSuccessMsg("Question posted!");
      setTimeout(() => router.push("/home"), 1200);
    } catch (err) {
      setErrorMsg("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Preparing page…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black">
      <Navbar />
      {/* UI unchanged */}
      {/* … rest of your JSX exactly as before … */}
      <BottomNavbar />
    </div>
  );
}
