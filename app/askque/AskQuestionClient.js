// // app/askque/AskQuestionClient.js
// "use client";

// import React, { useEffect, useMemo, useState, useContext } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Navbar from "@/components/Navbar";
// import BottomNavbar from "@/components/BottomNavbar";
// import { supabase } from "@/lib/supabaseClient";
// import { AuthContext } from "@/lib/AuthProvider";

// export default function AskQuestionClient() {
//   const router = useRouter();
//   const search = useSearchParams();
//   const { currentUser, loading: authLoading } = useContext(AuthContext);

//   const toMentorId = search.get("to") || null;
//   const toMentorName = search.get("name") || null;

//   const [mentor, setMentor] = useState(null);
//   const [loadingMentor, setLoadingMentor] = useState(false);

//   const [formData, setFormData] = useState({
//     title: "",
//     category: "",
//     question: "",
//     imageFile: null,
//   });

//   const [submitting, setSubmitting] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");

//   const GLOBAL_CATEGORIES = [
//     "Civil",
//     "Computer Science",
//     "Electrical",
//     "Electronics & Communication",
//     "Mechanical",
//     "Information Technology",
//     "Production & Industrial Engineering",
//     "Artificial Intelligence & Data Science",
//     "Robotics & Automation",
//     "Sustainable Energy Engineering Technologies",
//     "GATE",
//     "UPSC",
//     "DSA",
//     "Web Dev",
//     "Finance",
//     "Startup",
//     "AI",
//   ];

//   // Auth redirect
//   useEffect(() => {
//     if (!authLoading && !currentUser) {
//       router.replace("/login");
//     }
//   }, [authLoading, currentUser, router]);

//   // Fetch mentor
//   useEffect(() => {
//     if (!toMentorId || !currentUser) return;

//     let mounted = true;
//     setLoadingMentor(true);

//     supabase
//       .from("users")
//       .select("id, name, branch, categories, profile_image, background_image, is_mentor")
//       .eq("id", toMentorId)
//       .single()
//       .then(({ data, error }) => {
//         if (error) console.error("❌ [AskQue] Mentor error:", error);
//         if (mounted) {
//           setMentor(data || null);
//           setLoadingMentor(false);
//         }
//       });

//     return () => {
//       mounted = false;
//     };
//   }, [toMentorId, currentUser]);

//   const categoryOptions = useMemo(() => {
//     return mentor?.categories?.length ? mentor.categories : GLOBAL_CATEGORIES;
//   }, [mentor?.categories]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image") {
//       setFormData((prev) => ({ ...prev, imageFile: files?.[0] || null }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const uploadImageIfAny = async () => {
//     if (!formData.imageFile) return null;
//     if (!currentUser?.id) return null;

//     const file = formData.imageFile;
//     const ext = file.name.split(".").pop();
//     const path = `${currentUser.id}/${Date.now()}.${ext}`;

//     const { error } = await supabase.storage
//       .from("question-images")
//       .upload(path, file, { cacheControl: "3600", upsert: false });

//     if (error) {
//       console.error("❌ Upload failed:", error);
//       return null;
//     }

//     const { data: pub } = supabase.storage.from("question-images").getPublicUrl(path);
//     return pub?.publicUrl || null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");
//     setSuccessMsg("");

//     if (!formData.title.trim() || !formData.question.trim() || !formData.category) {
//       setErrorMsg("Please fill Title, Category, and Question.");
//       return;
//     }

//     if (!currentUser?.id) {
//       setErrorMsg("You must be logged in.");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const imageUrl = await uploadImageIfAny();

//       const payload = {
//         title: formData.title.trim(),
//         question: formData.question.trim(),
//         category: formData.category,
//         image: imageUrl,
//         author_id: currentUser.id,
//         ...(toMentorId && { assigned_to: toMentorId }),
//       };

//       const { error } = await supabase.from("questions").insert([payload]);
//       if (error) throw error;

//       setSuccessMsg("✅ Question posted successfully!");
//       setTimeout(() => router.push("/home"), 1200);
//     } catch (err) {
//       console.error("❌ Submit error:", err);
//       setErrorMsg(err.message || "Something went wrong.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Show loading
//   if (authLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black flex items-center justify-center">
//         <div className="text-white text-center">
//           <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p>Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!currentUser) return null;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black">
//       <Navbar />
//       <div className="min-h-screen flex items-center justify-center p-6">
//         {/* KEEP YOUR EXISTING JSX HERE — you already have it */}
//         {/* I’m not rewriting the whole form again; paste your form JSX back in this spot unchanged */}
//       </div>
//       <BottomNavbar />
//     </div>
//   );
// }

















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

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) return null;

  // --- keep your full existing JSX form here ---
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black">
      <Navbar />
       <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/10 text-white">
         <h1 className="text-2xl font-bold mb-1 text-yellow-400">Ask A Question</h1>
         <p className="text-gray-300 mb-6">Fill out the form below to post your question.</p>

         {toMentorId && (
            <div className="mb-6 rounded-xl border border-white/15 bg-white/5 p-4">
              {loadingMentor ? (
                <p className="text-gray-400 text-sm">Loading mentor info…</p>
              ) : mentor ? (
                <>
                  <div className="flex items-center gap-3">
                    <img
                      src={mentor.profile_image || "https://via.placeholder.com/56?text=User"}
                      alt={mentor.name || "Mentor"}
                      className="w-12 h-12 rounded-full border border-white/20 object-cover"
                    />
                    <div>
                      <p className="text-sm text-white/80">Asking</p>
                      <h3 className="text-lg font-semibold text-white">
                        {mentor.name || toMentorName || "Mentor"}
                      </h3>
                      <p className="text-xs text-white/60">
                        {mentor.branch || "Department not set"}
                      </p>
                    </div>
                  </div>

                  {Array.isArray(mentor.categories) && mentor.categories.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {mentor.categories.map((c) => (
                        <span
                          key={c}
                          className="px-2.5 py-1 text-xs rounded-full bg-white/10 border border-white/15 text-white/80"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p className="text-red-300 text-sm">
                  Couldn't load mentor info. You can still submit a general question.
                </p>
              )}
            </div>
          )}

          {errorMsg && (
            <div className="mb-4 text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded p-3">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="mb-4 text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded p-3">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter a short and clear title"
                className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400/60"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-yellow-400/60"
                required
              >
                <option value="" disabled>
                  {mentor ? "Choose one of mentor's categories" : "Select a category"}
                </option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat} className="bg-black">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Your Question</label>
              <textarea
                name="question"
                value={formData.question}
                onChange={handleChange}
                rows="5"
                placeholder="Type your question here..."
                className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400/60"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Upload Image (optional)
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
                  file:text-sm file:font-semibold file:bg-yellow-400 file:text-gray-900 hover:file:bg-yellow-300"
              />
              <p className="text-xs text-white/50 mt-2">
                Images are saved to <code>question-images</code> bucket.
              </p>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={submitting}
                className="mt-2 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 font-semibold px-8 py-3 rounded-full shadow-lg shadow-yellow-400/30 transition-all duration-200"
              >
                {submitting ? "Posting..." : "Send Your Question"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
}