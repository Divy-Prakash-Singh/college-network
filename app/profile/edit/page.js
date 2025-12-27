// "use client";

// import { useContext, useEffect, useMemo, useState } from "react";
// import { useRouter } from "next/navigation";
// import Navbar from "@/components/Navbar";
// import BottomNavbar from "@/components/BottomNavbar";
// import { supabase } from "@/lib/supabaseClient";
// import { AuthContext } from "@/lib/AuthProvider";

// const CATEGORIES = [
//   "Technology","Startup","Finance","GATE","UPSC","Acting",
//   "AI/ML","Photography","Robotics","Web Development","DSA","Art",
// ];

// export default function EditProfilePage() {
//   const router = useRouter();
//   const { currentUser, loading: authLoading } = useContext(AuthContext);

//   const [form, setForm] = useState({
//     name: "",
//     branch: "",
//     bio: "",
//     categories: [],
//     is_mentor: false,
//   });
//   const [avatarFile, setAvatarFile] = useState(null);
//   const [bannerFile, setBannerFile] = useState(null);
//   const [serverMsg, setServerMsg] = useState("");
//   const [saving, setSaving] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const uid = currentUser?.id;

//   useEffect(() => {
//     const load = async () => {
//       if (authLoading) return;
//       if (!uid) {
//         setLoading(false);
//         return;
//       }
//       const { data, error } = await supabase
//         .from("users")
//         .select("name, branch, bio, categories, is_mentor")
//         .eq("id", uid)
//         .single();
//       if (!error && data) {
//         setForm({
//           name: data.name || "",
//           branch: data.branch || "",
//           bio: data.bio || "",
//           categories: Array.isArray(data.categories) ? data.categories : [],
//           is_mentor: !!data.is_mentor,
//         });
//       }
//       setLoading(false);
//     };
//     load();
//   }, [authLoading, uid]);

//   const toggleCategory = (cat) => {
//     setForm((p) => ({
//       ...p,
//       categories: p.categories.includes(cat)
//         ? p.categories.filter((c) => c !== cat)
//         : [...p.categories, cat],
//     }));
//   };

//   const uploadIfAny = async (file, kind /* "avatar" | "banner" */) => {
//     if (!file || !uid) return null;
//     const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
//     const path = `${kind}/${uid}.${ext}`;

//     // upsert to overwrite previous uploads
//     const { error: upErr } = await supabase.storage
//       .from("profile-images")
//       .upload(path, file, { cacheControl: "3600", upsert: true });

//     if (upErr) {
//       console.error(`[upload ${kind}]`, upErr.message);
//       return null;
//     }
//     const { data: pub } = supabase.storage
//       .from("profile-images")
//       .getPublicUrl(path);
//     return pub?.publicUrl || null;
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     if (!uid) return;

//     setSaving(true);
//     setServerMsg("");

//     try {
//       const avatarUrl = await uploadIfAny(avatarFile, "avatar");
//       const bannerUrl = await uploadIfAny(bannerFile, "banner");

//       const payload = {
//         name: form.name.trim(),
//         branch: form.branch.trim(),
//         bio: form.bio.trim(),
//         categories: form.categories,
//         is_mentor: form.is_mentor,
//       };
//       if (avatarUrl) payload.profile_image = avatarUrl;
//       if (bannerUrl) payload.background_image = bannerUrl;

//       const { error } = await supabase
//         .from("users")
//         .update(payload)
//         .eq("id", uid);

//       if (error) throw error;

//       setServerMsg("✅ Profile updated");
//       // AFTER_SAVE = Y → redirect to own profile after a short pause
//       setTimeout(() => router.replace(`/profile/${uid}`), 600);
//     } catch (err) {
//       setServerMsg(err.message || "Failed to update profile");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (authLoading || loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white">
//         <Navbar />
//         <div className="max-w-3xl mx-auto px-4 py-24">Loading…</div>
//         <BottomNavbar />
//       </div>
//     );
//   }

//   if (!uid) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white">
//         <Navbar />
//         <div className="max-w-3xl mx-auto px-4 py-24">
//           Please log in to edit your profile.
//         </div>
//         <BottomNavbar />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white">
//       <Navbar />

//       <form
//         onSubmit={handleSave}
//         className="max-w-3xl mx-auto px-4 py-8 bg-white/5 border border-white/10 rounded-2xl mt-6"
//       >
//         <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>

//         <div className="grid md:grid-cols-2 gap-4">
//           <div>
//             <label className="text-sm text-white/70">Full name</label>
//             <input
//               type="text"
//               value={form.name}
//               onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
//               className="w-full mt-1 bg-white/10 border border-white/20 rounded-lg p-3"
//               required
//             />
//           </div>

//           <div>
//             <label className="text-sm text-white/70">Branch</label>
//             <input
//               type="text"
//               value={form.branch}
//               onChange={(e) =>
//                 setForm((p) => ({ ...p, branch: e.target.value }))
//               }
//               className="w-full mt-1 bg-white/10 border border-white/20 rounded-lg p-3"
//             />
//           </div>
//         </div>

//         <div className="mt-4">
//           <label className="text-sm text-white/70">Bio</label>
//           <textarea
//             rows={4}
//             value={form.bio}
//             onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
//             className="w-full mt-1 bg-white/10 border border-white/20 rounded-lg p-3"
//           />
//         </div>

//         <div className="mt-4">
//           <label className="text-sm text-white/70">Categories</label>
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
//             {CATEGORIES.map((cat) => (
//               <label
//                 key={cat}
//                 className={`flex items-center gap-2 px-3 py-2 rounded-md border ${
//                   form.categories.includes(cat)
//                     ? "bg-yellow-400/20 border-yellow-400/40"
//                     : "bg-white/5 border-white/10"
//                 }`}
//               >
//                 <input
//                   type="checkbox"
//                   checked={form.categories.includes(cat)}
//                   onChange={() => toggleCategory(cat)}
//                 />
//                 <span className="text-sm">{cat}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         <div className="mt-4 flex items-center gap-6">
//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={form.is_mentor}
//               onChange={(e) =>
//                 setForm((p) => ({ ...p, is_mentor: e.target.checked }))
//               }
//             />
//             I am a mentor
//           </label>
//         </div>

//         <div className="mt-6 grid md:grid-cols-2 gap-4">
//           <div>
//             <label className="text-sm text-white/70">Profile image</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
//               className="block mt-1"
//             />
//           </div>
//           <div>
//             <label className="text-sm text-white/70">Background image</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setBannerFile(e.target.files?.[0] || null)}
//               className="block mt-1"
//             />
//           </div>
//         </div>

//         <div className="mt-8 flex gap-3">
//           <button
//             type="submit"
//             disabled={saving}
//             className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-full disabled:opacity-60"
//           >
//             {saving ? "Saving..." : "Save changes"}
//           </button>
//           <button
//             type="button"
//             onClick={() => router.back()}
//             className="px-6 py-2 rounded-full border border-white/20 hover:bg-white/10"
//           >
//             Cancel
//           </button>
//         </div>

//         {serverMsg && (
//           <p className="mt-4 text-sm text-yellow-300">{serverMsg}</p>
//         )}
//       </form>

//       <BottomNavbar />
//     </div>
//   );
// }













// "use client";

// import React, { useContext, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";
// import { AuthContext } from "@/lib/AuthProvider";

// const CATEGORIES = [
//   "Technology",
//   "Startup",
//   "Finance",
//   "GATE",
//   "UPSC",
//   "Acting",
//   "AI/ML",
//   "Photography",
//   "Robotics",
//   "Web Development",
//   "DSA",
//   "Art",
// ];

// export default function EditProfilePage() {
//   const { currentUser } = useContext(AuthContext);
//   const router = useRouter();

//   const [name, setName] = useState("");
//   const [branch, setBranch] = useState("");
//   const [bio, setBio] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [isMentor, setIsMentor] = useState(false);
//   const [profileImage, setProfileImage] = useState(null);
//   const [backgroundImage, setBackgroundImage] = useState(null);
//   const [saving, setSaving] = useState(false);

//   // Load current user data
//   useEffect(() => {
//     if (!currentUser) return;
//     setName(currentUser.name || "");
//     setBranch(currentUser.branch || "");
//     setBio(currentUser.bio || "");
//     setCategories(currentUser.categories || []);
//     setIsMentor(currentUser.is_mentor || false);
//   }, [currentUser]);

//   // Handle category toggle
//   const toggleCategory = (cat) => {
//     setCategories((prev) =>
//       prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
//     );
//   };

//   // File upload helper
//   const uploadIfAny = async (file, kind) => {
//     if (!file) return null;

//     const ext = file.name.split(".").pop();
//     const filePath = `${currentUser.id}/${kind}.${ext}`;
//     const { error: upErr } = await supabase.storage
//       .from("profile-images")
//       .upload(filePath, file, { upsert: true });

//     if (upErr) {
//       console.error(`[upload ${kind}]`, upErr.message);
//       alert(`Upload failed: ${upErr.message}`);
//       return null;
//     }

//     const { data: pub } = supabase.storage
//       .from("profile-images")
//       .getPublicUrl(filePath);

//     return pub.publicUrl;
//   };

//   // Save handler
//   const handleSave = async () => {
//     if (!currentUser) return;
//     setSaving(true);

//     try {
//       const uploadedProfile =
//         (profileImage && (await uploadIfAny(profileImage, "profile"))) || null;
//       const uploadedBg =
//         (backgroundImage && (await uploadIfAny(backgroundImage, "background"))) ||
//         null;

//       const updates = {
//         name,
//         branch,
//         bio,
//         categories, // ✅ include updated categories
//         is_mentor: isMentor,
//       };

//       if (uploadedProfile) updates.profile_image = uploadedProfile;
//       if (uploadedBg) updates.background_image = uploadedBg;

//       const { error } = await supabase
//         .from("users")
//         .update(updates)
//         .eq("id", currentUser.id);

//       if (error) {
//         console.error("Update error:", error.message);
//         alert("Error saving profile: " + error.message);
//       } else {
//         alert("✅ Profile updated successfully!");
//         router.push(`/profile/${currentUser.id}`);
//       }
//     } catch (err) {
//       console.error("Unexpected error:", err);
//       alert("Something went wrong while saving profile.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white flex flex-col items-center p-6">
//       <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

//       <div className="w-full max-w-xl space-y-4">
//         {/* Name */}
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full bg-white/10 p-3 rounded-lg border border-white/20"
//         />

//         {/* Branch */}
//         <input
//           type="text"
//           placeholder="Branch"
//           value={branch}
//           onChange={(e) => setBranch(e.target.value)}
//           className="w-full bg-white/10 p-3 rounded-lg border border-white/20"
//         />

//         {/* Bio */}
//         <textarea
//           placeholder="Bio"
//           value={bio}
//           onChange={(e) => setBio(e.target.value)}
//           className="w-full bg-white/10 p-3 rounded-lg border border-white/20 min-h-[100px]"
//         />

//         {/* ✅ Category Selector */}
//         <div className="space-y-2 mt-4">
//           <h3 className="text-sm font-semibold mb-2">
//             Select categories of interest
//           </h3>
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//             {CATEGORIES.map((cat) => (
//               <label
//                 key={cat}
//                 className={`flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer ${
//                   categories.includes(cat)
//                     ? "bg-yellow-400/20 border-yellow-400/40"
//                     : "bg-white/5 border-white/10"
//                 }`}
//               >
//                 <input
//                   type="checkbox"
//                   checked={categories.includes(cat)}
//                   onChange={() => toggleCategory(cat)}
//                 />
//                 <span className="text-sm">{cat}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Profile + Background images */}
//         <div className="flex flex-col gap-2 mt-4">
//           <label className="text-sm text-white/70">Profile image</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setProfileImage(e.target.files[0])}
//           />

//           <label className="text-sm text-white/70">Background image</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setBackgroundImage(e.target.files[0])}
//           />
//         </div>

//         {/* Mentor Checkbox */}
//         <div className="flex items-center gap-2 mt-4">
//           <input
//             type="checkbox"
//             checked={isMentor}
//             onChange={(e) => setIsMentor(e.target.checked)}
//           />
//           <label>I am a mentor</label>
//         </div>

//         {/* Save Button */}
//         <button
//           disabled={saving}
//           onClick={handleSave}
//           className={`mt-4 w-full py-3 rounded-lg font-semibold ${
//             saving
//               ? "bg-gray-500"
//               : "bg-yellow-400 hover:bg-yellow-500 text-black"
//           }`}
//         >
//           {saving ? "Saving..." : "Save Changes"}
//         </button>
//       </div>
//     </div>
//   );
// }














// "use client";

// import { useContext, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";
// import { AuthContext } from "@/lib/AuthProvider";

// const CATEGORIES = [
//   "Technology",
//   "Startup",
//   "Finance",
//   "GATE",
//   "UPSC",
//   "Acting",
//   "AI/ML",
//   "Photography",
//   "Robotics",
//   "Web Development",
//   "DSA",
//   "Art",
// ];

// export default function EditProfilePage() {
//   const { currentUser, refreshUser } = useContext(AuthContext);
//   const router = useRouter();

//   const [name, setName] = useState("");
//   const [branch, setBranch] = useState("");
//   const [bio, setBio] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [isMentor, setIsMentor] = useState(false);
//   const [profileImage, setProfileImage] = useState(null);
//   const [backgroundImage, setBackgroundImage] = useState(null);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     if (!currentUser) return;

//     setName(currentUser.name || "");
//     setBranch(currentUser.branch || "");
//     setBio(currentUser.bio || "");
//     setCategories(Array.isArray(currentUser.categories) ? currentUser.categories : []);
//     setIsMentor(!!currentUser.is_mentor);
//   }, [currentUser]);

//   const toggleCategory = (cat) => {
//     setCategories((prev) =>
//       prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
//     );
//   };

//   // ✅ FIXED upload helper
//   const uploadImage = async (file, type) => {
//     if (!file || !currentUser) return null;

//     const ext = file.name.split(".").pop();
//     const path = `${currentUser.id}/${type}.${ext}`;

//     const { error } = await supabase.storage
//       .from("PROFILE-IMAGES") // ✅ CORRECT BUCKET
//       .upload(path, file, { upsert: true });

//     if (error) {
//       console.error("Upload error:", error.message);
//       alert("Image upload failed");
//       return null;
//     }

//     const { data } = supabase.storage
//       .from("PROFILE-IMAGES")
//       .getPublicUrl(path);

//     return data.publicUrl;
//   };

//   const handleSave = async () => {
//     if (!currentUser) return;

//     setSaving(true);

//     try {
//       const profileUrl = profileImage
//         ? await uploadImage(profileImage, "profile")
//         : null;

//       const bgUrl = backgroundImage
//         ? await uploadImage(backgroundImage, "background")
//         : null;

//       const payload = {
//         name: name.trim(),
//         branch: branch.trim(),
//         bio: bio.trim(),
//         is_mentor: isMentor,
//         categories: Array.isArray(categories) ? categories : [],
//       };

//       if (profileUrl) payload.profile_image = profileUrl;
//       if (bgUrl) payload.background_image = bgUrl;

//       const { error } = await supabase
//         .from("users")
//         .update(payload)
//         .eq("id", currentUser.id);

//       if (error) {
//         console.error(error.message);
//         alert("Failed to update profile");
//         return;
//       }

//       await refreshUser(); // 🔄 refresh context
//       alert("✅ Profile updated");
//       router.push(`/profile/${currentUser.id}`);
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white flex justify-center p-6">
//       <div className="w-full max-w-xl space-y-4">
//         <h1 className="text-2xl font-bold">Edit Profile</h1>

//         <input
//           className="w-full p-3 bg-white/10 rounded"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Name"
//         />

//         <input
//           className="w-full p-3 bg-white/10 rounded"
//           value={branch}
//           onChange={(e) => setBranch(e.target.value)}
//           placeholder="Branch"
//         />

//         <textarea
//           className="w-full p-3 bg-white/10 rounded min-h-[100px]"
//           value={bio}
//           onChange={(e) => setBio(e.target.value)}
//           placeholder="Bio"
//         />

//         <div>
//           <p className="mb-2 font-medium">Categories</p>
//           <div className="grid grid-cols-2 gap-2">
//             {CATEGORIES.map((cat) => (
//               <label key={cat} className="flex gap-2">
//                 <input
//                   type="checkbox"
//                   checked={categories.includes(cat)}
//                   onChange={() => toggleCategory(cat)}
//                 />
//                 {cat}
//               </label>
//             ))}
//           </div>
//         </div>

//         <div className="space-y-2">
//           <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} />
//           <input type="file" onChange={(e) => setBackgroundImage(e.target.files[0])} />
//         </div>

//         <label className="flex gap-2 items-center">
//           <input
//             type="checkbox"
//             checked={isMentor}
//             onChange={(e) => setIsMentor(e.target.checked)}
//           />
//           I am a mentor
//         </label>

//         <button
//           onClick={handleSave}
//           disabled={saving}
//           className="w-full py-3 bg-yellow-400 text-black rounded font-semibold"
//         >
//           {saving ? "Saving..." : "Save Profile"}
//         </button>
//       </div>
//     </div>
//   );
// }











// "use client";

// import { useContext, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";
// import { AuthContext } from "@/lib/AuthProvider";
// import ImageUploader from "@/components/ImageUploader";

// const CATEGORIES = [
//   "Technology",
//   "Startup",
//   "Finance",
//   "GATE",
//   "UPSC",
//   "Acting",
//   "AI/ML",
//   "Photography",
//   "Robotics",
//   "Web Development",
//   "DSA",
//   "Art",
// ];

// export default function EditProfilePage() {
//   const { currentUser, refreshUser } = useContext(AuthContext);
//   const router = useRouter();

//   const [name, setName] = useState("");
//   const [branch, setBranch] = useState("");
//   const [bio, setBio] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [isMentor, setIsMentor] = useState(false);

//   // 👇 IMPORTANT: arrays so ImageUploader works
//   const [profileFiles, setProfileFiles] = useState([]);
//   const [bgFiles, setBgFiles] = useState([]);

//   const [saving, setSaving] = useState(false);

//   // preload existing data
//   useEffect(() => {
//     if (!currentUser) return;

//     setName(currentUser.name || "");
//     setBranch(currentUser.branch || "");
//     setBio(currentUser.bio || "");
//     setCategories(Array.isArray(currentUser.categories) ? currentUser.categories : []);
//     setIsMentor(!!currentUser.is_mentor);

//     // 👇 preload existing images as URLs
//     if (currentUser.profile_image) {
//       setProfileFiles([currentUser.profile_image]);
//     }
//     if (currentUser.background_image) {
//       setBgFiles([currentUser.background_image]);
//     }
//   }, [currentUser]);

//   const toggleCategory = (cat) => {
//     setCategories((prev) =>
//       prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
//     );
//   };

//   // upload helper (handles File OR keeps existing URL)
//   const uploadOne = async (item, type) => {
//     if (!item) return null;
//     if (typeof item === "string") return item; // already uploaded

//     const ext = item.name.split(".").pop();
//     const path = `${currentUser.id}/${type}.${ext}`;

//     const { error } = await supabase.storage
//       .from("PROFILE-IMAGES")
//       .upload(path, item, { upsert: true });

//     if (error) throw error;

//     const { data } = supabase.storage
//       .from("PROFILE-IMAGES")
//       .getPublicUrl(path);

//     return data.publicUrl;
//   };

//   const handleSave = async () => {
//     if (!currentUser) return;
//     setSaving(true);

//     try {
//       const profileUrl = await uploadOne(profileFiles[0], "profile");
//       const bgUrl = await uploadOne(bgFiles[0], "background");

//       const payload = {
//         name: name.trim(),
//         branch: branch.trim(),
//         bio: bio.trim(),
//         is_mentor: isMentor,
//         categories,
//         profile_image: profileUrl,
//         background_image: bgUrl,
//       };

//       const { error } = await supabase
//         .from("users")
//         .update(payload)
//         .eq("id", currentUser.id);

//       if (error) throw error;

//       await refreshUser();
//       router.push(`/profile?userId=${currentUser.id}`);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save profile");
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white flex justify-center p-6">
//       <div className="w-full max-w-xl space-y-6">

//         <h1 className="text-2xl font-bold">Edit Profile</h1>

//         {/* Profile Image */}
//         <div>
//           <p className="mb-2 text-sm text-white/70">Profile Image</p>
//           <ImageUploader
//             files={profileFiles}
//             setFiles={setProfileFiles}
//             maxFiles={1}
//           />
//         </div>

//         {/* Background Image */}
//         <div>
//           <p className="mb-2 text-sm text-white/70">Background Image</p>
//           <ImageUploader
//             files={bgFiles}
//             setFiles={setBgFiles}
//             maxFiles={1}
//           />
//         </div>

//         <input
//           className="w-full p-3 bg-white/10 rounded"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Name"
//         />

//         <input
//           className="w-full p-3 bg-white/10 rounded"
//           value={branch}
//           onChange={(e) => setBranch(e.target.value)}
//           placeholder="Branch"
//         />

//         <textarea
//           className="w-full p-3 bg-white/10 rounded min-h-[100px]"
//           value={bio}
//           onChange={(e) => setBio(e.target.value)}
//           placeholder="Bio"
//         />

//         <div>
//           <p className="mb-2 font-medium">Categories</p>
//           <div className="grid grid-cols-2 gap-2">
//             {CATEGORIES.map((cat) => (
//               <label key={cat} className="flex gap-2">
//                 <input
//                   type="checkbox"
//                   checked={categories.includes(cat)}
//                   onChange={() => toggleCategory(cat)}
//                 />
//                 {cat}
//               </label>
//             ))}
//           </div>
//         </div>

//         <label className="flex gap-2 items-center">
//           <input
//             type="checkbox"
//             checked={isMentor}
//             onChange={(e) => setIsMentor(e.target.checked)}
//           />
//           I am a mentor
//         </label>

//         <button
//           onClick={handleSave}
//           disabled={saving}
//           className="w-full py-3 bg-yellow-400 text-black rounded font-semibold"
//         >
//           {saving ? "Saving..." : "Save Profile"}
//         </button>
//       </div>
//     </div>
//   );
// }













// "use client";

// import { useContext, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";
// import { AuthContext } from "@/lib/AuthProvider";

// const CATEGORIES = [
//   "Technology","Startup","Finance","GATE","UPSC","Acting",
//   "AI/ML","Photography","Robotics","Web Development","DSA","Art",
// ];

// export default function EditProfilePage() {
//   const { currentUser, refreshUser } = useContext(AuthContext);
//   const router = useRouter();

//   const [name, setName] = useState("");
//   const [branch, setBranch] = useState("");
//   const [bio, setBio] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [isMentor, setIsMentor] = useState(false);

//   const [profileImage, setProfileImage] = useState(null);
//   const [backgroundImage, setBackgroundImage] = useState(null);

//   const [profilePreview, setProfilePreview] = useState(null);
//   const [backgroundPreview, setBackgroundPreview] = useState(null);

//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     if (!currentUser) return;

//     setName(currentUser.name || "");
//     setBranch(currentUser.branch || "");
//     setBio(currentUser.bio || "");
//     setCategories(Array.isArray(currentUser.categories) ? currentUser.categories : []);
//     setIsMentor(!!currentUser.is_mentor);

//     // ✅ existing image placeholders
//     setProfilePreview(currentUser.profile_image || null);
//     setBackgroundPreview(currentUser.background_image || null);
//   }, [currentUser]);

//   const toggleCategory = (cat) => {
//     setCategories(prev =>
//       prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
//     );
//   };

//   // const uploadImage = async (file, type) => {
//   //   if (!file || !currentUser) return null;

//   //   const ext = file.name.split(".").pop();
//   //   const path = `${currentUser.id}/${type}.${ext}`;

//   //   const { error } = await supabase.storage
//   //     .from("PROFILE-IMAGES")
//   //     .upload(path, file, { upsert: true });

//   //   if (error) {
//   //     console.error("Upload error:", error.message);
//   //     return null;
//   //   }

//   //   const { data } = supabase.storage
//   //     .from("PROFILE-IMAGES")
//   //     .getPublicUrl(path);

//   //   return data.publicUrl;
//   // };



//   const uploadImage = async (file, type) => {
//   if (!file || !currentUser) return null;

//   const ext = file.name.split(".").pop();
//   const fileName = `${type}.${ext}`;
//   const path = `${currentUser.id}/${fileName}`;

//   // ✅ CORRECT bucket name (lowercase)
//   const { error } = await supabase.storage
//     .from("profile-images")
//     .upload(path, file, {
//       upsert: true,
//       contentType: file.type,
//     });

//   if (error) {
//     console.error("Upload error:", error.message);
//     alert("Image upload failed");
//     return null;
//   }

//   const { data } = supabase.storage
//     .from("profile-images")
//     .getPublicUrl(path);

//   // ✅ cache busting so browser reloads image
//   return `${data.publicUrl}?t=${Date.now()}`;
// };





//   // const handleSave = async () => {
//   //   if (!currentUser) return;
//   //   setSaving(true);

//   //   try {
//   //     const profileUrl = profileImage
//   //       ? await uploadImage(profileImage, "profile")
//   //       : null;

//   //     const bgUrl = backgroundImage
//   //       ? await uploadImage(backgroundImage, "background")
//   //       : null;

//   //     const payload = {
//   //       name: name.trim(),
//   //       branch: branch.trim(),
//   //       bio: bio.trim(),
//   //       categories,
//   //       is_mentor: isMentor,
//   //     };

//   //     if (profileUrl) payload.profile_image = profileUrl;
//   //     if (bgUrl) payload.background_image = bgUrl;

//   //     const { error } = await supabase
//   //       .from("users")
//   //       .update(payload)
//   //       .eq("id", currentUser.id);

//   //     if (error) {
//   //       alert("Failed to update profile");
//   //       return;
//   //     }

//   //     await refreshUser();
//   //     router.push(`/profile?userId=${currentUser.id}`);
//   //   } finally {
//   //     setSaving(false);
//   //   }
//   // };


//   const handleSave = async () => {
//   if (!currentUser) return;
//   setSaving(true);

//   try {
//     const profileUrl = profileImage
//       ? await uploadImage(profileImage, "profile")
//       : null;

//     const bgUrl = backgroundImage
//       ? await uploadImage(backgroundImage, "background")
//       : null;

//     const payload = {
//       name: name.trim(),
//       branch: branch.trim(),
//       bio: bio.trim(),
//       categories,
//       is_mentor: isMentor,
//     };

//     if (profileUrl) payload.profile_image = profileUrl;
//     if (bgUrl) payload.background_image = bgUrl;

//     const { error } = await supabase
//       .from("users")
//       .update(payload)
//       .eq("id", currentUser.id);

//     if (error) {
//       alert("Failed to update profile");
//       return;
//     }

//     await refreshUser();

//     // ✅ force profile reload with fresh images
//     router.push(`/profile?userId=${currentUser.id}&t=${Date.now()}`);
//   } finally {
//     setSaving(false);
//   }
// };



//   return (
//     <div className="min-h-screen bg-black text-white flex justify-center p-6">
//       <div className="w-full max-w-xl space-y-4">
//         <h1 className="text-2xl font-bold">Edit Profile</h1>

//         {/* Profile Image Preview */}
//         <div className="flex items-center gap-4">
//           <img
//             src={profilePreview || "https://via.placeholder.com/120?text=Profile"}
//             className="w-24 h-24 rounded-full object-cover border"
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => {
//               const f = e.target.files[0];
//               if (!f) return;
//               setProfileImage(f);
//               setProfilePreview(URL.createObjectURL(f));
//             }}
//           />
//         </div>

//         {/* Background Preview */}
//         <div>
//           <img
//             src={backgroundPreview || "https://via.placeholder.com/600x200?text=Background"}
//             className="w-full h-32 object-cover rounded border mb-2"
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => {
//               const f = e.target.files[0];
//               if (!f) return;
//               setBackgroundImage(f);
//               setBackgroundPreview(URL.createObjectURL(f));
//             }}
//           />
//         </div>

//         <input
//           className="w-full p-3 bg-white/10 rounded"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Name"
//         />

//         <input
//           className="w-full p-3 bg-white/10 rounded"
//           value={branch}
//           onChange={(e) => setBranch(e.target.value)}
//           placeholder="Branch"
//         />

//         <textarea
//           className="w-full p-3 bg-white/10 rounded min-h-[100px]"
//           value={bio}
//           onChange={(e) => setBio(e.target.value)}
//           placeholder="Bio"
//         />

//         <div>
//           <p className="mb-2 font-medium">Categories</p>
//           <div className="grid grid-cols-2 gap-2">
//             {CATEGORIES.map((cat) => (
//               <label key={cat} className="flex gap-2">
//                 <input
//                   type="checkbox"
//                   checked={categories.includes(cat)}
//                   onChange={() => toggleCategory(cat)}
//                 />
//                 {cat}
//               </label>
//             ))}
//           </div>
//         </div>

//         <label className="flex gap-2 items-center">
//           <input
//             type="checkbox"
//             checked={isMentor}
//             onChange={(e) => setIsMentor(e.target.checked)}
//           />
//           I am a mentor
//         </label>

//         <button
//           onClick={handleSave}
//           disabled={saving}
//           className="w-full py-3 bg-yellow-400 text-black rounded font-semibold"
//         >
//           {saving ? "Saving..." : "Save Profile"}
//         </button>
//       </div>
//     </div>
//   );
// }














"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { AuthContext } from "@/lib/AuthProvider";

const CATEGORIES = [
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
  "AI"
];

export default function EditProfilePage() {
  const { currentUser, refreshUser } = useContext(AuthContext);
  const router = useRouter();

  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [bio, setBio] = useState("");
  const [categories, setCategories] = useState([]);
  const [isMentor, setIsMentor] = useState(false);

  const [profileImage, setProfileImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  const [profilePreview, setProfilePreview] = useState(null);
  const [backgroundPreview, setBackgroundPreview] = useState(null);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    setName(currentUser.name || "");
    setBranch(currentUser.branch || "");
    setBio(currentUser.bio || "");
    setCategories(Array.isArray(currentUser.categories) ? currentUser.categories : []);
    setIsMentor(!!currentUser.is_mentor);

    // ✅ existing image placeholders
    setProfilePreview(currentUser.profile_image || null);
    setBackgroundPreview(currentUser.background_image || null);
  }, [currentUser]);

  const toggleCategory = (cat) => {
    setCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const uploadImage = async (file, type) => {
    if (!file || !currentUser) return null;

    const ext = file.name.split(".").pop();
    const fileName = `${type}.${ext}`;
    const path = `${currentUser.id}/${fileName}`;

    // ✅ CORRECT bucket name (lowercase)
    const { error } = await supabase.storage
      .from("profile-images")
      .upload(path, file, {
        upsert: true,
        contentType: file.type,
      });

    if (error) {
      console.error("Upload error:", error.message);
      alert("Image upload failed");
      return null;
    }

    const { data } = supabase.storage
      .from("profile-images")
      .getPublicUrl(path);

    // ✅ cache busting so browser reloads image
    return `${data.publicUrl}?t=${Date.now()}`;
  };

  const handleSave = async () => {
    if (!currentUser) return;
    setSaving(true);

    try {
      const profileUrl = profileImage
        ? await uploadImage(profileImage, "profile")
        : null;

      const bgUrl = backgroundImage
        ? await uploadImage(backgroundImage, "background")
        : null;

      const payload = {
        name: name.trim(),
        branch: branch.trim(),
        bio: bio.trim(),
        categories,
        is_mentor: isMentor,
      };

      if (profileUrl) payload.profile_image = profileUrl;
      if (bgUrl) payload.background_image = bgUrl;

      const { error } = await supabase
        .from("users")
        .update(payload)
        .eq("id", currentUser.id);

      if (error) {
        alert("Failed to update profile");
        return;
      }

      await refreshUser();

      // ✅ force profile reload with fresh images
      router.push(`/profile?userId=${currentUser.id}&t=${Date.now()}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center p-6">
      <div className="w-full max-w-xl space-y-4">
        <h1 className="text-2xl font-bold">Edit Profile</h1>

        {/* Profile Image Preview */}
        <div className="flex items-center gap-4">
          <img
            src={profilePreview || "https://via.placeholder.com/120?text=Profile"}
            className="w-24 h-24 rounded-full object-cover border"
            alt="Profile"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files[0];
              if (!f) return;
              setProfileImage(f);
              setProfilePreview(URL.createObjectURL(f));
            }}
          />
        </div>

        {/* Background Preview */}
        <div>
          <img
            src={backgroundPreview || "https://via.placeholder.com/600x200?text=Background"}
            className="w-full h-32 object-cover rounded border mb-2"
            alt="Background"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files[0];
              if (!f) return;
              setBackgroundImage(f);
              setBackgroundPreview(URL.createObjectURL(f));
            }}
          />
        </div>

        <input
          className="w-full p-3 bg-white/10 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />

        <input
          className="w-full p-3 bg-white/10 rounded"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          placeholder="Branch"
        />

        <textarea
          className="w-full p-3 bg-white/10 rounded min-h-[100px]"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
        />

        <div>
          <p className="mb-2 font-medium">Categories</p>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => (
              <label key={cat} className="flex gap-2">
                <input
                  type="checkbox"
                  checked={categories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={isMentor}
            onChange={(e) => setIsMentor(e.target.checked)}
          />
          I am a mentor
        </label>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-3 bg-yellow-400 text-black rounded font-semibold"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
}