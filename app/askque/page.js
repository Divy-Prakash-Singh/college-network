

// "use client";
// import React, { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabaseClient";

// export default function AskQuestion() {
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("Technology");
//   const [imageFile, setImageFile] = useState(null);
//   const [suggestions, setSuggestions] = useState([]);
//   const [content, setContent] = useState("");

//   // Fetch similar questions
//   useEffect(() => {
//     const fetchSimilar = async () => {
//       if (title.length < 3) {
//         setSuggestions([]);
//         return;
//       }
//       const { data } = await supabase
//         .from("questions")
//         .select("*")
//         .ilike("title", `%${title}%`)
//         .limit(5);
//       setSuggestions(data || []);
//     };
//     fetchSimilar();
//   }, [title]);

//   // Upload image to Supabase Storage
//   const uploadImage = async () => {
//     if (!imageFile) return null;

//     const fileName = `${Date.now()}-${imageFile.name}`;

//     const { data, error } = await supabase.storage
//       .from("uploads")
//       .upload(fileName, imageFile, {
//         cacheControl: "3600",
//         upsert: false,
//       });

//     if (error) {
//       console.error("❌ Image upload error:", error.message);
//       return null;
//     }

//     const { data: publicUrlData } = supabase.storage
//       .from("uploads")
//       .getPublicUrl(fileName);

//     if (!publicUrlData || !publicUrlData.publicUrl) {
//       console.error("❌ Could not get public URL");
//       return null;
//     }

//     return publicUrlData.publicUrl;
//   };

//   // Submit Question
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let image_url = null;
//     if (imageFile) {
//       image_url = await uploadImage();
//     }

//     const { error } = await supabase.from("questions").insert([
//       {
//         title,
//         category,
//         content, // ✅ Now always included
//         image_url,
//         created_at: new Date().toISOString(),
//       },
//     ]);

//     if (error) {
//       console.error("❌ Question insert error:", error.message);
//       alert("❌ Failed to submit question. Check console.");
//       return;
//     }

//     // Reset form
//     setTitle("");
//     setCategory("Technology");
//     setContent(""); // ✅ Reset content too
//     setImageFile(null);
//     alert("✅ Question submitted!");
//   };

//   return (
//     <div className="max-w-xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-3">Ask Your Mentor</h1>
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input
//           type="text"
//           placeholder="Ask your question..."
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />

//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="w-full p-2 border rounded"
//         >
//           <option>Technology</option>
//           <option>Startup</option>
//           <option>Finance</option>
//           <option>GATE</option>
//           <option>Acting</option>
//         </select>

//         {/* ✅ Content (question details) */}
//         <textarea
//           placeholder="Add more details about your question..."
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           className="w-full p-2 border rounded"
//           rows="4"
//           required
//         />

//         {/* Image Upload */}
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImageFile(e.target.files[0])}
//           className="w-full"
//         />

//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           Ask
//         </button>
//       </form>

//       {/* Suggestions */}
//       {suggestions.length > 0 && (
//         <div className="mt-4 bg-gray-100 p-3 rounded">
//           <h3 className="font-semibold">Similar Questions:</h3>
//           <ul>
//             {suggestions.map((q) => (
//               <li key={q.id} className="p-1 border-b">
//                 {q.title} ({q.category})
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }














// 'use client'

// import BottomNavbar from "@/components/BottomNavbar";
// import Navbar from "@/components/Navbar";
// import React, { useState } from "react";

// const AskQuestion = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     category: "",
//     question: "",
//     image: null,
//     displayPublicly: true,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;
//     if (type === "checkbox") {
//       setFormData({ ...formData, [name]: checked });
//     } else if (type === "file") {
//       setFormData({ ...formData, [name]: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Question submitted (prototype only — backend not connected)");
//     console.log(formData);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black ">
//       <Navbar/>
//        <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black flex items-center justify-center p-6">
//       <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/10 text-white">
//         <h1 className="text-2xl font-bold mb-4 text-yellow-400">Ask A Question</h1>
//         <p className="text-gray-300 mb-8">
//           Fill out the form below to post your question.
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Title */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Title</label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="Enter a short and clear title"
//               className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400/60"
//               required
//             />
//           </div>

//           {/* Category */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Category</label>
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-yellow-400/60"
//               required
//             >
//               <option value="" disabled>Select a category</option>
//               <option value="technology">Technology</option>
//               <option value="startup">Startup</option>
//               <option value="acting">Acting</option>
//               <option value="finance">Finance</option>
//               <option value="health">Health</option>
//               <option value="career">Career</option>
//               <option value="others">Others</option>
//             </select>
//           </div>

//           {/* Question */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Your Question</label>
//             <textarea
//               name="question"
//               value={formData.question}
//               onChange={handleChange}
//               rows="5"
//               placeholder="Type your question here..."
//               className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400/60"
//               required
//             />
//           </div>

//           {/* Optional Image Upload */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Upload Image (optional)</label>
//             <input
//               type="file"
//               name="image"
//               accept="image/*"
//               onChange={handleChange}
//               className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
//                 file:text-sm file:font-semibold file:bg-yellow-400 file:text-gray-900 hover:file:bg-yellow-300"
//             />
//           </div>

//           {/* Display Publicly */}
//           {/* <div className="flex items-center">
//             <input
//               id="displayPublicly"
//               type="checkbox"
//               name="displayPublicly"
//               checked={formData.displayPublicly}
//               onChange={handleChange}
//               className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-gray-600 rounded"
//             />
//             {/* <label htmlFor="displayPublicly" className="ml-2 text-sm text-gray-300">
//               Display my question publicly (untick to keep private)
//             </label> */}
//           {/* </div>  */}

//           {/* Submit Button */}
//           <div className="text-center">
//             <button
//               type="submit"
//               className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-full shadow-lg shadow-yellow-400/30 transition-all duration-200"
//             >
//               Send Your Question
//             </button>
//           </div>
//         </form>
//       </div>
//       </div>
//       <BottomNavbar/>
//     </div>
//   );
// };

// export default AskQuestion;






// 'use client';
// import BottomNavbar from "@/components/BottomNavbar";
// import Navbar from "@/components/Navbar";
// import React, { useState } from "react";
// import { supabase } from "@/lib/supabaseClient";

// const AskQuestion = () => {
// const [formData, setFormData] = useState({
// title: "",
// category: "",
// question: "",
// image: null,
// });
// const [loading, setLoading] = useState(false);

// const handleChange = (e) => {
// const { name, value, type, files } = e.target;
// if (type === "file") {
// setFormData({ ...formData, [name]: files[0] });
// } else {
// setFormData({ ...formData, [name]: value });
// }
// };

// const handleSubmit = async (e) => {
// e.preventDefault();
// const user = JSON.parse(localStorage.getItem("user"));
// if (!user) return alert("Please sign up or log in first.");


// setLoading(true);
// try {
//   const { data, error } = await supabase.from("questions").insert([
//     {
//       title: formData.title,
//       category: formData.category,
//       question: formData.question,
//       author_id: user.id,
//     },
//   ]);

//   if (error) throw error;
//   alert("✅ Question posted successfully!");
//   setFormData({ title: "", category: "", question: "", image: null });
// } catch (err) {
//   alert("Error posting question: " + err.message);
// } finally {
//   setLoading(false);
// }


// };

// return ( <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black"> <Navbar /> <div className="min-h-screen flex items-center justify-center p-6"> <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/10 text-white"> <h1 className="text-2xl font-bold mb-4 text-yellow-400">Ask A Question</h1> <p className="text-gray-300 mb-8">Fill out the form below to post your question.</p>


//       <form onSubmit={handleSubmit} className="space-y-6">
//         <input
//           type="text"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           placeholder="Enter a short and clear title"
//           className="w-full bg-white/5 border border-white/20 rounded-lg p-3"
//           required
//         />
//         <select
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           className="w-full bg-white/5 border border-white/20 rounded-lg p-3"
//           required
//         >
//           <option value="" disabled>Select a category</option>
//           <option value="Technology">Technology</option>
//           <option value="Startup">Startup</option>
//           <option value="Acting">Acting</option>
//           <option value="Finance">Finance</option>
//           <option value="Health">Health</option>
//           <option value="Career">Career</option>
//           <option value="Others">Others</option>
//         </select>
//         <textarea
//           name="question"
//           value={formData.question}
//           onChange={handleChange}
//           rows="5"
//           placeholder="Type your question here..."
//           className="w-full bg-white/5 border border-white/20 rounded-lg p-3"
//           required
//         />
//         <input
//           type="file"
//           name="image"
//           accept="image/*"
//           onChange={handleChange}
//           className="w-full text-gray-300 file:bg-yellow-400 file:text-black file:rounded-full file:py-2 file:px-4"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-yellow-400 text-black font-semibold p-3 rounded-full"
//         >
//           {loading ? "Posting..." : "Send Your Question"}
//         </button>
//       </form>
//     </div>
//   </div>
//   <BottomNavbar />
// </div>

// );
// };

// export default AskQuestion;













// "use client";

// import React, { useEffect, useMemo, useState, useContext } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Navbar from "@/components/Navbar";
// import BottomNavbar from "@/components/BottomNavbar";
// import { supabase } from "@/lib/supabaseClient";
// import { AuthContext } from "@/lib/AuthProvider";

// export default function AskQuestionPage() {
//   const router = useRouter();
//   const search = useSearchParams();
//   const { currentUser } = useContext(AuthContext);

//   const toMentorId = search.get("to") || null;
//   const toMentorName = search.get("name") || null;

//   const [mentor, setMentor] = useState(null);
//   const [loadingMentor, setLoadingMentor] = useState(!!toMentorId);

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
//     "Technology",
//     "Startup",
//     "Finance",
//     "GATE",
//     "Career",
//     "Health",
//     "AI/ML",
//     "Photography",
//     "Robotics",
//     "Others",
//   ];

//   // Fetch mentor info if applicable
//   useEffect(() => {
//     const fetchMentor = async () => {
//       if (!toMentorId) return;
//       setLoadingMentor(true);
//       const { data, error } = await supabase
//         .from("users")
//         .select("id, name, branch, categories, profile_image, background_image, is_mentor")
//         .eq("id", toMentorId)
//         .single();

//       if (error) console.error("Failed to fetch mentor:", error.message);
//       else setMentor(data);
//       setLoadingMentor(false);
//     };

//     fetchMentor();
//   }, [toMentorId]);

//   const categoryOptions = useMemo(() => {
//     if (mentor?.categories?.length) return mentor.categories;
//     return GLOBAL_CATEGORIES;
//   }, [mentor?.categories]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image") {
//       setFormData((prev) => ({ ...prev, imageFile: files?.[0] || null }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   // ✅ Fixed upload function with correct bucket name and URL handling
//   // 
  
//   const uploadImageIfAny = async () => {
//   if (!formData.imageFile) {
//     console.log("❌ No image selected");
//     return null;
//   }

//   const file = formData.imageFile;
//   const ext = file.name.split(".").pop();
//   const who = currentUser?.id || "anon";
//   const path = `${who}/${Date.now()}.${ext}`;

//   console.log("📤 Uploading to path =", path);

//   const { error: uploadErr } = await supabase.storage
//     .from("question-images")   // <--- confirm this EXACT spelling
//     .upload(path, file, {
//       cacheControl: "3600",
//       upsert: false,
//     });

//   if (uploadErr) {
//     console.error("❌ UPLOAD FAILED:", uploadErr.message);
//     return null;
//   }

//   const { data: pub } = supabase.storage
//     .from("question-images")
//     .getPublicUrl(path);

//   console.log("✅ Public URL =", pub?.publicUrl);
//   return pub?.publicUrl || null;
// };





// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setErrorMsg("");
//   setSuccessMsg("");

//   if (!formData.title.trim() || !formData.question.trim() || !formData.category) {
//     setErrorMsg("Please fill Title, Category, and Question.");
//     return;
//   }

//   setSubmitting(true);
//   try {
//     // 1) Upload image (optional)
//     const imageUrl = await uploadImageIfAny(); // returns null if no image

//     // 2) Build payload
//     const basePayload = {
//       title: formData.title.trim(),
//       question: formData.question.trim(),
//       category: formData.category,
//       image: imageUrl,   // <--- will be null if no image
//       author_id: currentUser?.id || null,
//     };

//     const finalPayload = toMentorId
//       ? { ...basePayload, assigned_to: toMentorId }  // ✅ because assigned_to column exists
//       : basePayload;

//     console.log("✅ FINAL PAYLOAD =", finalPayload);

//     // 3) Insert only ONCE
//     const { data, error } = await supabase
//       .from("questions")
//       .insert([finalPayload])
//       .select()
//       .single();

//     if (error) throw error;

//     setSuccessMsg("✅ Your question has been posted successfully!");
//     setTimeout(() => router.push("/home"), 1200);

//   } catch (err) {
//     console.error(err);
//     setErrorMsg(err.message || "Something went wrong.");
//   } finally {
//     setSubmitting(false);
//   }
// };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black">
//       <Navbar />

//       <div className="min-h-screen flex items-center justify-center p-6">
//         <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/10 text-white">
//           <h1 className="text-2xl font-bold mb-1 text-yellow-400">Ask A Question</h1>
//           <p className="text-gray-300 mb-6">Fill out the form below to post your question.</p>

//           {toMentorId && (
//             <div className="mb-6 rounded-xl border border-white/15 bg-white/5 p-4">
//               {loadingMentor ? (
//                 <p className="text-gray-400 text-sm">Loading mentor info…</p>
//               ) : mentor ? (
//                 <>
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={mentor.profile_image || "https://via.placeholder.com/56?text=User"}
//                       alt={mentor.name || "Mentor"}
//                       className="w-12 h-12 rounded-full border border-white/20 object-cover"
//                     />
//                     <div>
//                       <p className="text-sm text-white/80">Asking</p>
//                       <h3 className="text-lg font-semibold text-white">
//                         {mentor.name || toMentorName || "Mentor"}
//                       </h3>
//                       <p className="text-xs text-white/60">
//                         {mentor.branch || "Department not set"}
//                       </p>
//                     </div>
//                   </div>

//                   {Array.isArray(mentor.categories) && mentor.categories.length > 0 && (
//                     <div className="mt-3 flex flex-wrap gap-2">
//                       {mentor.categories.map((c) => (
//                         <span
//                           key={c}
//                           className="px-2.5 py-1 text-xs rounded-full bg-white/10 border border-white/15 text-white/80"
//                         >
//                           {c}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 <p className="text-red-300 text-sm">
//                   Couldn’t load mentor info. You can still submit a general question.
//                 </p>
//               )}
//             </div>
//           )}

//           {errorMsg && (
//             <div className="mb-4 text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded p-3">
//               {errorMsg}
//             </div>
//           )}
//           {successMsg && (
//             <div className="mb-4 text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded p-3">
//               {successMsg}
//             </div>
//           )}

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium mb-2">Title</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 placeholder="Enter a short and clear title"
//                 className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400/60"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">Category</label>
//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-yellow-400/60"
//                 required
//               >
//                 <option value="" disabled>
//                   {mentor ? "Choose one of mentor’s categories" : "Select a category"}
//                 </option>
//                 {categoryOptions.map((cat) => (
//                   <option key={cat} value={cat} className="bg-black">
//                     {cat}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">Your Question</label>
//               <textarea
//                 name="question"
//                 value={formData.question}
//                 onChange={handleChange}
//                 rows="5"
//                 placeholder="Type your question here..."
//                 className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400/60"
//                 required
//               />
//             </div>

//             {/* ✅ Optional image upload */}
//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Upload Image (optional)
//               </label>
//               <input
//                 type="file"
//                 name="image"
//                 accept="image/*"
//                 onChange={handleChange}
//                 className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
//                   file:text-sm file:font-semibold file:bg-yellow-400 file:text-gray-900 hover:file:bg-yellow-300"
//               />
//               <p className="text-xs text-white/50 mt-2">
//                 Images are saved to <code>questions-image</code> bucket.
//               </p>
//             </div>

//             <div className="text-center">
//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="mt-2 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 font-semibold px-8 py-3 rounded-full shadow-lg shadow-yellow-400/30 transition-all duration-200"
//               >
//                 {submitting ? "Posting..." : "Send Your Question"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       <BottomNavbar />
//     </div>
//   );
// }
















// "use client";

// import React, { useEffect, useMemo, useState, useContext } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Navbar from "@/components/Navbar";
// import BottomNavbar from "@/components/BottomNavbar";
// import { supabase } from "@/lib/supabaseClient";
// import { AuthContext } from "@/lib/AuthProvider";

// export default function AskQuestionPage() {
//   const router = useRouter();
//   const search = useSearchParams();
//   const { currentUser } = useContext(AuthContext);

//   const toMentorId = search.get("to") || null;
//   const toMentorName = search.get("name") || null;

//   const [mentor, setMentor] = useState(null);
//   const [loadingMentor, setLoadingMentor] = useState(!!toMentorId);

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
//     "AI"
//   ];

//   // Fetch mentor info if applicable
//   useEffect(() => {
//     const fetchMentor = async () => {
//       if (!toMentorId) return;
//       setLoadingMentor(true);
//       const { data, error } = await supabase
//         .from("users")
//         .select("id, name, branch, categories, profile_image, background_image, is_mentor")
//         .eq("id", toMentorId)
//         .single();

//       if (error) console.error("Failed to fetch mentor:", error.message);
//       else setMentor(data);
//       setLoadingMentor(false);
//     };

//     fetchMentor();
//   }, [toMentorId]);

//   const categoryOptions = useMemo(() => {
//     if (mentor?.categories?.length) return mentor.categories;
//     return GLOBAL_CATEGORIES;
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
//     if (!formData.imageFile) {
//       console.log("❌ No image selected");
//       return null;
//     }

//     const file = formData.imageFile;
//     const ext = file.name.split(".").pop();
//     const who = currentUser?.id || "anon";
//     const path = `${who}/${Date.now()}.${ext}`;

//     console.log("📤 Uploading to path =", path);

//     const { error: uploadErr } = await supabase.storage
//       .from("question-images")
//       .upload(path, file, {
//         cacheControl: "3600",
//         upsert: false,
//       });

//     if (uploadErr) {
//       console.error("❌ UPLOAD FAILED:", uploadErr.message);
//       return null;
//     }

//     const { data: pub } = supabase.storage
//       .from("question-images")
//       .getPublicUrl(path);

//     console.log("✅ Public URL =", pub?.publicUrl);
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

//     setSubmitting(true);
//     try {
//       // 1) Upload image (optional)
//       const imageUrl = await uploadImageIfAny();

//       // 2) Build payload
//       const basePayload = {
//         title: formData.title.trim(),
//         question: formData.question.trim(),
//         category: formData.category,
//         image: imageUrl,
//         author_id: currentUser?.id || null,
//       };

//       const finalPayload = toMentorId
//         ? { ...basePayload, assigned_to: toMentorId }
//         : basePayload;

//       console.log("✅ FINAL PAYLOAD =", finalPayload);

//       // 3) Insert only ONCE
//       const { data, error } = await supabase
//         .from("questions")
//         .insert([finalPayload])
//         .select()
//         .single();

//       if (error) throw error;

//       setSuccessMsg("✅ Your question has been posted successfully!");
//       setTimeout(() => router.push("/home"), 1200);

//     } catch (err) {
//       console.error(err);
//       setErrorMsg(err.message || "Something went wrong.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black">
//       <Navbar />

//       <div className="min-h-screen flex items-center justify-center p-6">
//         <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/10 text-white">
//           <h1 className="text-2xl font-bold mb-1 text-yellow-400">Ask A Question</h1>
//           <p className="text-gray-300 mb-6">Fill out the form below to post your question.</p>

//           {toMentorId && (
//             <div className="mb-6 rounded-xl border border-white/15 bg-white/5 p-4">
//               {loadingMentor ? (
//                 <p className="text-gray-400 text-sm">Loading mentor info…</p>
//               ) : mentor ? (
//                 <>
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={mentor.profile_image || "https://via.placeholder.com/56?text=User"}
//                       alt={mentor.name || "Mentor"}
//                       className="w-12 h-12 rounded-full border border-white/20 object-cover"
//                     />
//                     <div>
//                       <p className="text-sm text-white/80">Asking</p>
//                       <h3 className="text-lg font-semibold text-white">
//                         {mentor.name || toMentorName || "Mentor"}
//                       </h3>
//                       <p className="text-xs text-white/60">
//                         {mentor.branch || "Department not set"}
//                       </p>
//                     </div>
//                   </div>

//                   {Array.isArray(mentor.categories) && mentor.categories.length > 0 && (
//                     <div className="mt-3 flex flex-wrap gap-2">
//                       {mentor.categories.map((c) => (
//                         <span
//                           key={c}
//                           className="px-2.5 py-1 text-xs rounded-full bg-white/10 border border-white/15 text-white/80"
//                         >
//                           {c}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 <p className="text-red-300 text-sm">
//                   Couldn't load mentor info. You can still submit a general question.
//                 </p>
//               )}
//             </div>
//           )}

//           {errorMsg && (
//             <div className="mb-4 text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded p-3">
//               {errorMsg}
//             </div>
//           )}
//           {successMsg && (
//             <div className="mb-4 text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded p-3">
//               {successMsg}
//             </div>
//           )}

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium mb-2">Title</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 placeholder="Enter a short and clear title"
//                 className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400/60"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">Category</label>
//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-yellow-400/60"
//                 required
//               >
//                 <option value="" disabled>
//                   {mentor ? "Choose one of mentor's categories" : "Select a category"}
//                 </option>
//                 {categoryOptions.map((cat) => (
//                   <option key={cat} value={cat} className="bg-black">
//                     {cat}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">Your Question</label>
//               <textarea
//                 name="question"
//                 value={formData.question}
//                 onChange={handleChange}
//                 rows="5"
//                 placeholder="Type your question here..."
//                 className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400/60"
//                 required
//               />
//             </div>

//             {/* ✅ Optional image upload */}
//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Upload Image (optional)
//               </label>
//               <input
//                 type="file"
//                 name="image"
//                 accept="image/*"
//                 onChange={handleChange}
//                 className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
//                   file:text-sm file:font-semibold file:bg-yellow-400 file:text-gray-900 hover:file:bg-yellow-300"
//               />
//               <p className="text-xs text-white/50 mt-2">
//                 Images are saved to <code>question-images</code> bucket.
//               </p>
//             </div>

//             <div className="text-center">
//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="mt-2 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 font-semibold px-8 py-3 rounded-full shadow-lg shadow-yellow-400/30 transition-all duration-200"
//               >
//                 {submitting ? "Posting..." : "Send Your Question"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       <BottomNavbar />
//     </div>
//   );
// }










// "use client";

// import React, { useEffect, useMemo, useState, useContext } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Navbar from "@/components/Navbar";
// import BottomNavbar from "@/components/BottomNavbar";
// import { supabase } from "@/lib/supabaseClient";
// import { AuthContext } from "@/lib/AuthProvider";

// export default function AskQuestionPage() {
//   const router = useRouter();
//   const search = useSearchParams();
//   const { currentUser, loading: authLoading } = useContext(AuthContext);

//   const toMentorId = search.get("to") || null;
//   const toMentorName = search.get("name") || null;

//   const [mentor, setMentor] = useState(null);
//   const [loadingMentor, setLoadingMentor] = useState(!!toMentorId);

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
//     "AI"
//   ];

//   // 🔹 AUTH PROTECTION - Redirect if not logged in
//   useEffect(() => {
//     if (!authLoading && !currentUser) {
//       console.log("❌ Not authenticated, redirecting to login");
//       router.push("/login");
//     }
//   }, [currentUser, authLoading, router]);

//   // Fetch mentor info if applicable
//   useEffect(() => {
//     if (authLoading || !currentUser) return; // Don't fetch until auth is ready

//     const fetchMentor = async () => {
//       if (!toMentorId) return;
//       setLoadingMentor(true);
//       try {
//         const { data, error } = await supabase
//           .from("users")
//           .select("id, name, branch, categories, profile_image, background_image, is_mentor")
//           .eq("id", toMentorId)
//           .single();

//         if (error) {
//           console.error("Failed to fetch mentor:", error.message);
//         } else {
//           setMentor(data);
//         }
//       } catch (err) {
//         console.error("Mentor fetch error:", err);
//       } finally {
//         setLoadingMentor(false);
//       }
//     };

//     fetchMentor();
//   }, [toMentorId, authLoading, currentUser]);

//   const categoryOptions = useMemo(() => {
//     if (mentor?.categories?.length) return mentor.categories;
//     return GLOBAL_CATEGORIES;
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
//     if (!formData.imageFile) {
//       console.log("❌ No image selected");
//       return null;
//     }

//     const file = formData.imageFile;
//     const ext = file.name.split(".").pop();
//     const who = currentUser?.id || "anon";
//     const path = `${who}/${Date.now()}.${ext}`;

//     console.log("📤 Uploading to path =", path);

//     const { error: uploadErr } = await supabase.storage
//       .from("question-images")
//       .upload(path, file, {
//         cacheControl: "3600",
//         upsert: false,
//       });

//     if (uploadErr) {
//       console.error("❌ UPLOAD FAILED:", uploadErr.message);
//       return null;
//     }

//     const { data: pub } = supabase.storage
//       .from("question-images")
//       .getPublicUrl(path);

//     console.log("✅ Public URL =", pub?.publicUrl);
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

//     setSubmitting(true);
//     try {
//       // 1) Upload image (optional)
//       const imageUrl = await uploadImageIfAny();

//       // 2) Build payload
//       const basePayload = {
//         title: formData.title.trim(),
//         question: formData.question.trim(),
//         category: formData.category,
//         image: imageUrl,
//         author_id: currentUser?.id || null,
//       };

//       const finalPayload = toMentorId
//         ? { ...basePayload, assigned_to: toMentorId }
//         : basePayload;

//       console.log("✅ FINAL PAYLOAD =", finalPayload);

//       // 3) Insert only ONCE
//       const { data, error } = await supabase
//         .from("questions")
//         .insert([finalPayload])
//         .select()
//         .single();

//       if (error) throw error;

//       setSuccessMsg("✅ Your question has been posted successfully!");
//       setTimeout(() => router.push("/home"), 1200);

//     } catch (err) {
//       console.error(err);
//       setErrorMsg(err.message || "Something went wrong.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // 🔹 LOADING STATE - Show while auth is checking
//   if (authLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black flex items-center justify-center">
//         <div className="text-white text-lg">Loading...</div>
//       </div>
//     );
//   }

//   // 🔹 NOT LOGGED IN - Show nothing (will redirect)
//   if (!currentUser) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black">
//       <Navbar />

//       <div className="min-h-screen flex items-center justify-center p-6">
//         <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/10 text-white">
//           <h1 className="text-2xl font-bold mb-1 text-yellow-400">Ask A Question</h1>
//           <p className="text-gray-300 mb-6">Fill out the form below to post your question.</p>

//           {toMentorId && (
//             <div className="mb-6 rounded-xl border border-white/15 bg-white/5 p-4">
//               {loadingMentor ? (
//                 <p className="text-gray-400 text-sm">Loading mentor info…</p>
//               ) : mentor ? (
//                 <>
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={mentor.profile_image || "https://via.placeholder.com/56?text=User"}
//                       alt={mentor.name || "Mentor"}
//                       className="w-12 h-12 rounded-full border border-white/20 object-cover"
//                     />
//                     <div>
//                       <p className="text-sm text-white/80">Asking</p>
//                       <h3 className="text-lg font-semibold text-white">
//                         {mentor.name || toMentorName || "Mentor"}
//                       </h3>
//                       <p className="text-xs text-white/60">
//                         {mentor.branch || "Department not set"}
//                       </p>
//                     </div>
//                   </div>

//                   {Array.isArray(mentor.categories) && mentor.categories.length > 0 && (
//                     <div className="mt-3 flex flex-wrap gap-2">
//                       {mentor.categories.map((c) => (
//                         <span
//                           key={c}
//                           className="px-2.5 py-1 text-xs rounded-full bg-white/10 border border-white/15 text-white/80"
//                         >
//                           {c}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 <p className="text-red-300 text-sm">
//                   Couldn't load mentor info. You can still submit a general question.
//                 </p>
//               )}
//             </div>
//           )}

//           {errorMsg && (
//             <div className="mb-4 text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded p-3">
//               {errorMsg}
//             </div>
//           )}
//           {successMsg && (
//             <div className="mb-4 text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded p-3">
//               {successMsg}
//             </div>
//           )}

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium mb-2">Title</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 placeholder="Enter a short and clear title"
//                 className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400/60"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">Category</label>
//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-yellow-400/60"
//                 required
//               >
//                 <option value="" disabled>
//                   {mentor ? "Choose one of mentor's categories" : "Select a category"}
//                 </option>
//                 {categoryOptions.map((cat) => (
//                   <option key={cat} value={cat} className="bg-black">
//                     {cat}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">Your Question</label>
//               <textarea
//                 name="question"
//                 value={formData.question}
//                 onChange={handleChange}
//                 rows="5"
//                 placeholder="Type your question here..."
//                 className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400/60"
//                 required
//               />
//             </div>

//             {/* ✅ Optional image upload */}
//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Upload Image (optional)
//               </label>
//               <input
//                 type="file"
//                 name="image"
//                 accept="image/*"
//                 onChange={handleChange}
//                 className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
//                   file:text-sm file:font-semibold file:bg-yellow-400 file:text-gray-900 hover:file:bg-yellow-300"
//               />
//               <p className="text-xs text-white/50 mt-2">
//                 Images are saved to <code>question-images</code> bucket.
//               </p>
//             </div>

//             <div className="text-center">
//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="mt-2 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 font-semibold px-8 py-3 rounded-full shadow-lg shadow-yellow-400/30 transition-all duration-200"
//               >
//                 {submitting ? "Posting..." : "Send Your Question"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       <BottomNavbar />
//     </div>
//   );
// }



























// //this is my askque/page.js


// "use client";

// import React, { useEffect, useMemo, useState, useContext } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Navbar from "@/components/Navbar";
// import BottomNavbar from "@/components/BottomNavbar";
// import { supabase } from "@/lib/supabaseClient";
// import { AuthContext } from "@/lib/AuthProvider";

// export default function AskQuestionPage() {
//   const router = useRouter();
//   const search = useSearchParams();
//   const { currentUser, loading: authLoading } = useContext(AuthContext);

//   const toMentorId = search.get("to") || null;
//   const toMentorName = search.get("name") || null;

//   const [mentor, setMentor] = useState(null);
//   const [loadingMentor, setLoadingMentor] = useState(!!toMentorId);
//   const [pageReady, setPageReady] = useState(false);

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
//     "AI"
//   ];

//   // Auth check
//   useEffect(() => {
//     console.log("🔍 Auth state:", { authLoading, currentUser: !!currentUser });
    
//     if (authLoading) {
//       console.log("⏳ Still loading auth...");
//       return;
//     }

//     if (!currentUser) {
//       console.log("❌ No user, redirecting to login");
//       router.replace("/login");
//       return;
//     }

//     console.log("✅ User authenticated:", currentUser.name);
//     setPageReady(true);
//   }, [authLoading, currentUser, router]);










//   useEffect(() => {
//   console.log("🐛 [Page] Auth state:", { 
//     loading: authLoading, 
//     hasUser: !!currentUser,
//     userId: currentUser?.id 
//   });
// }, [authLoading, currentUser]);








//   // Fetch mentor info
//   useEffect(() => {
//     if (!pageReady || !toMentorId) {
//       setLoadingMentor(false);
//       return;
//     }

//     const fetchMentor = async () => {
//       setLoadingMentor(true);
//       try {
//         console.log("📥 Fetching mentor:", toMentorId);
//         const { data, error } = await supabase
//           .from("users")
//           .select("id, name, branch, categories, profile_image, background_image, is_mentor")
//           .eq("id", toMentorId)
//           .single();

//         if (error) {
//           console.error("❌ Mentor fetch error:", error.message);
//         } else {
//           console.log("✅ Mentor loaded:", data.name);
//           setMentor(data);
//         }
//       } catch (err) {
//         console.error("❌ Mentor fetch failed:", err);
//       } finally {
//         setLoadingMentor(false);
//       }
//     };

//     fetchMentor();
//   }, [toMentorId, pageReady]);

//   const categoryOptions = useMemo(() => {
//     if (mentor?.categories?.length) return mentor.categories;
//     return GLOBAL_CATEGORIES;
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

//     const file = formData.imageFile;
//     const ext = file.name.split(".").pop();
//     const path = `${currentUser.id}/${Date.now()}.${ext}`;

//     console.log("📤 Uploading image:", path);

//     const { error: uploadErr } = await supabase.storage
//       .from("question-images")
//       .upload(path, file, {
//         cacheControl: "3600",
//         upsert: false,
//       });

//     if (uploadErr) {
//       console.error("❌ Upload failed:", uploadErr.message);
//       return null;
//     }

//     const { data: pub } = supabase.storage
//       .from("question-images")
//       .getPublicUrl(path);

//     console.log("✅ Image uploaded:", pub?.publicUrl);
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

//     setSubmitting(true);
//     try {
//       const imageUrl = await uploadImageIfAny();

//       const basePayload = {
//         title: formData.title.trim(),
//         question: formData.question.trim(),
//         category: formData.category,
//         image: imageUrl,
//         author_id: currentUser.id,
//       };

//       const finalPayload = toMentorId
//         ? { ...basePayload, assigned_to: toMentorId }
//         : basePayload;

//       console.log("📤 Submitting question:", finalPayload);

//       const { data, error } = await supabase
//         .from("questions")
//         .insert([finalPayload])
//         .select()
//         .single();

//       if (error) throw error;

//       console.log("✅ Question posted:", data.id);
//       setSuccessMsg("✅ Your question has been posted successfully!");
      
//       setTimeout(() => {
//         router.push("/home");
//       }, 1200);

//     } catch (err) {
//       console.error("❌ Submit error:", err);
//       setErrorMsg(err.message || "Something went wrong.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Show loading while auth is checking
//   // if (authLoading || !pageReady) {
//   //   return (
//   //     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black flex items-center justify-center">
//   //       <div className="text-center text-white">
//   //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
//   //         <p>Loading page...</p>
//   //       </div>
//   //     </div>
//   //   );
//   // }

//   // // Don't render if not authenticated (will redirect)
//   // if (!currentUser) {
//   //   return null;
//   // }



//   useEffect(() => {
//   if (authLoading) return;
//   if (!currentUser) router.replace("/login");
// }, [authLoading, currentUser]);

// if (authLoading) return null;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black">
//       <Navbar />

//       <div className="min-h-screen flex items-center justify-center p-6">
//         <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/10 text-white">
//           <h1 className="text-2xl font-bold mb-1 text-yellow-400">Ask A Question</h1>
//           <p className="text-gray-300 mb-6">Fill out the form below to post your question.</p>

//           {toMentorId && (
//             <div className="mb-6 rounded-xl border border-white/15 bg-white/5 p-4">
//               {loadingMentor ? (
//                 <p className="text-gray-400 text-sm">Loading mentor info…</p>
//               ) : mentor ? (
//                 <>
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={mentor.profile_image || "https://via.placeholder.com/56?text=User"}
//                       alt={mentor.name || "Mentor"}
//                       className="w-12 h-12 rounded-full border border-white/20 object-cover"
//                     />
//                     <div>
//                       <p className="text-sm text-white/80">Asking</p>
//                       <h3 className="text-lg font-semibold text-white">
//                         {mentor.name || toMentorName || "Mentor"}
//                       </h3>
//                       <p className="text-xs text-white/60">
//                         {mentor.branch || "Department not set"}
//                       </p>
//                     </div>
//                   </div>

//                   {Array.isArray(mentor.categories) && mentor.categories.length > 0 && (
//                     <div className="mt-3 flex flex-wrap gap-2">
//                       {mentor.categories.map((c) => (
//                         <span
//                           key={c}
//                           className="px-2.5 py-1 text-xs rounded-full bg-white/10 border border-white/15 text-white/80"
//                         >
//                           {c}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 <p className="text-red-300 text-sm">
//                   Couldn't load mentor info. You can still submit a general question.
//                 </p>
//               )}
//             </div>
//           )}

//           {errorMsg && (
//             <div className="mb-4 text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded p-3">
//               {errorMsg}
//             </div>
//           )}
//           {successMsg && (
//             <div className="mb-4 text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded p-3">
//               {successMsg}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium mb-2">Title</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 placeholder="Enter a short and clear title"
//                 className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400/60"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">Category</label>
//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-yellow-400/60"
//                 required
//               >
//                 <option value="" disabled>
//                   {mentor ? "Choose one of mentor's categories" : "Select a category"}
//                 </option>
//                 {categoryOptions.map((cat) => (
//                   <option key={cat} value={cat} className="bg-black">
//                     {cat}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">Your Question</label>
//               <textarea
//                 name="question"
//                 value={formData.question}
//                 onChange={handleChange}
//                 rows="5"
//                 placeholder="Type your question here..."
//                 className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400/60"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Upload Image (optional)
//               </label>
//               <input
//                 type="file"
//                 name="image"
//                 accept="image/*"
//                 onChange={handleChange}
//                 className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
//                   file:text-sm file:font-semibold file:bg-yellow-400 file:text-gray-900 hover:file:bg-yellow-300"
//               />
//               <p className="text-xs text-white/50 mt-2">
//                 Images are saved to <code>question-images</code> bucket.
//               </p>
//             </div>

//             <div className="text-center">
//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="mt-2 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 font-semibold px-8 py-3 rounded-full shadow-lg shadow-yellow-400/30 transition-all duration-200"
//               >
//                 {submitting ? "Posting..." : "Send Your Question"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       <BottomNavbar />
//     </div>
//   );
// }




















// //this is askque/page.js


// "use client";

// import React, { useEffect, useMemo, useState, useContext } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Navbar from "@/components/Navbar";
// import BottomNavbar from "@/components/BottomNavbar";
// import { supabase } from "@/lib/supabaseClient";
// import { AuthContext } from "@/lib/AuthProvider";

// export default function AskQuestionPage() {
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
//     "Civil", "Computer Science", "Electrical", "Electronics & Communication",
//     "Mechanical", "Information Technology", "Production & Industrial Engineering",
//     "Artificial Intelligence & Data Science", "Robotics & Automation",
//     "Sustainable Energy Engineering Technologies", "GATE", "UPSC", "DSA",
//     "Web Dev", "Finance", "Startup", "AI"
//   ];

//   // Auth redirect
//   useEffect(() => {
//     console.log("🔍 [AskQue] Auth:", { authLoading, hasUser: !!currentUser });
//     if (!authLoading && !currentUser) {
//       console.log("❌ [AskQue] Redirecting to login");
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

//     return () => { mounted = false; };
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
//         <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/10 text-white">
//           <h1 className="text-2xl font-bold mb-1 text-yellow-400">Ask A Question</h1>
//           <p className="text-gray-300 mb-6">Fill out the form below to post your question.</p>

//           {toMentorId && (
//             <div className="mb-6 rounded-xl border border-white/15 bg-white/5 p-4">
//               {loadingMentor ? (
//                 <p className="text-gray-400 text-sm">Loading mentor info…</p>
//               ) : mentor ? (
//                 <div className="flex items-center gap-3">
//                   <img
//                     src={mentor.profile_image || "https://via.placeholder.com/56"}
//                     alt={mentor.name}
//                     className="w-12 h-12 rounded-full border border-white/20 object-cover"
//                   />
//                   <div>
//                     <p className="text-sm text-white/80">Asking</p>
//                     <h3 className="text-lg font-semibold">{mentor.name || toMentorName}</h3>
//                     <p className="text-xs text-white/60">{mentor.branch || "Department not set"}</p>
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-red-300 text-sm">Couldn't load mentor info.</p>
//               )}
//             </div>
//           )}

//           {errorMsg && <div className="mb-4 text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded p-3">{errorMsg}</div>}
//           {successMsg && <div className="mb-4 text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded p-3">{successMsg}</div>}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium mb-2">Title</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 placeholder="Enter a short and clear title"
//                 className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400/60"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">Category</label>
//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-yellow-400/60"
//                 required
//               >
//                 <option value="" disabled>{mentor ? "Choose mentor's category" : "Select a category"}</option>
//                 {categoryOptions.map((cat) => (
//                   <option key={cat} value={cat} className="bg-black">{cat}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">Your Question</label>
//               <textarea
//                 name="question"
//                 value={formData.question}
//                 onChange={handleChange}
//                 rows="5"
//                 placeholder="Type your question here..."
//                 className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400/60"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">Upload Image (optional)</label>
//               <input
//                 type="file"
//                 name="image"
//                 accept="image/*"
//                 onChange={handleChange}
//                 className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-gray-900 hover:file:bg-yellow-300"
//               />
//             </div>

//             <div className="text-center">
//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="mt-2 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60 text-gray-900 font-semibold px-8 py-3 rounded-full shadow-lg"
//               >
//                 {submitting ? "Posting..." : "Send Your Question"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       <BottomNavbar />
//     </div>
//   );
// }
















// "use client"

// import React, { useEffect, useMemo, useState, useContext } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Navbar from "@/components/Navbar";
// import BottomNavbar from "@/components/BottomNavbar";
// import { supabase } from "@/lib/supabaseClient";
// import { AuthContext } from "@/lib/AuthProvider";

// export default function AskQuestionPage() {
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

//   /* 🔐 AUTH REDIRECT — ONLY HERE */
//   useEffect(() => {
//     if (!authLoading && !currentUser) {
//       router.replace("/login");
//     }
//   }, [authLoading, currentUser, router]);

//   /* 👤 FETCH MENTOR */
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
//         if (error) console.error("❌ Mentor fetch error:", error);
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
//     if (!formData.imageFile || !currentUser?.id) return null;

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

//     const { data } = supabase.storage
//       .from("question-images")
//       .getPublicUrl(path);

//     return data?.publicUrl || null;
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

//   /* 🧠 NON-BLOCKING LOADING */
//   if (authLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black flex items-center justify-center">
//         <p className="text-white/80">Preparing page…</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black">
//       <Navbar />

//       <div className="min-h-screen flex items-center justify-center p-6">
//         <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/10 text-white">
//           <h1 className="text-2xl font-bold mb-1 text-yellow-400">
//             Ask A Question
//           </h1>
//           <p className="text-gray-300 mb-6">
//             Fill out the form below to post your question.
//           </p>

//           {toMentorId && (
//             <div className="mb-6 rounded-xl border border-white/15 bg-white/5 p-4">
//               {loadingMentor ? (
//                 <p className="text-gray-400 text-sm">Loading mentor info…</p>
//               ) : mentor ? (
//                 <div className="flex items-center gap-3">
//                   <img
//                     src={mentor.profile_image || "https://via.placeholder.com/56"}
//                     alt={mentor.name}
//                     className="w-12 h-12 rounded-full border border-white/20 object-cover"
//                   />
//                   <div>
//                     <p className="text-sm text-white/80">Asking</p>
//                     <h3 className="text-lg font-semibold">
//                       {mentor.name || toMentorName}
//                     </h3>
//                     <p className="text-xs text-white/60">
//                       {mentor.branch || "Department not set"}
//                     </p>
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-red-300 text-sm">
//                   Couldn't load mentor info.
//                 </p>
//               )}
//             </div>
//           )}

//           {errorMsg && (
//             <div className="mb-4 text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded p-3">
//               {errorMsg}
//             </div>
//           )}

//           {successMsg && (
//             <div className="mb-4 text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded p-3">
//               {successMsg}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium mb-2">Title</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">Category</label>
//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white"
//                 required
//               >
//                 <option value="" disabled>
//                   {mentor ? "Choose mentor's category" : "Select a category"}
//                 </option>
//                 {categoryOptions.map((cat) => (
//                   <option key={cat} value={cat} className="bg-black">
//                     {cat}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Your Question
//               </label>
//               <textarea
//                 name="question"
//                 value={formData.question}
//                 onChange={handleChange}
//                 rows="5"
//                 className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Upload Image (optional)
//               </label>
//               <input
//                 type="file"
//                 name="image"
//                 accept="image/*"
//                 onChange={handleChange}
//                 className="w-full text-gray-300"
//               />
//             </div>

//             <div className="text-center">
//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="mt-2 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60 text-gray-900 font-semibold px-8 py-3 rounded-full"
//               >
//                 {submitting ? "Posting..." : "Send Your Question"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       <BottomNavbar />
//     </div>
//   );
// }





// import { Suspense } from "react";
// import AskQueClient from "./AskQueClient";

// export default function AskQuePage() {
//   return (
//     <Suspense fallback={<AskQueSkeleton />}>
//       <AskQueClient />
//     </Suspense>
//   );
// }

// function AskQueSkeleton() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black flex items-center justify-center text-white">
//       Preparing page…
//     </div>
//   );
// }




// import { Suspense } from "react";
// import AskQueClient from "./AskQueClient";

// export default function AskQuePage() {
//   return (
//     <Suspense fallback={<AskQueSkeleton />}>
//       <AskQueClient />
//     </Suspense>
//   );
// }

// function AskQueSkeleton() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black flex items-center justify-center text-white">
//       Preparing page…
//     </div>
//   );
// }





export const dynamic = 'force-dynamic';

import { Suspense } from "react";
import AskQueClient from "./AskQueClient";

export default function AskQuePage() {
  return (
    <Suspense fallback={<AskQueSkeleton />}>
      <AskQueClient />
    </Suspense>
  );
}

function AskQueSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black flex items-center justify-center text-white">
      Preparing page…
    </div>
  );
}