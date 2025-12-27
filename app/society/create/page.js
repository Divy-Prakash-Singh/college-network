// 











// "use client";

// import { useState } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// export default function CreateSociety() {
//   const router = useRouter();

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [banner, setBanner] = useState(null);
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState("");

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMsg("");

//     try {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();
//       if (!user) throw new Error("⚠️ Please log in before creating a society.");

//       // 1️⃣ Upload banner image (if provided)
//       let bannerUrl = null;
//       if (banner) {
//         const fileName = `banner-${Date.now()}-${banner.name}`;
//         const { data: bannerData, error: bannerErr } = await supabase.storage
//           .from("society-media")
//           .upload(fileName, banner);

//         if (bannerErr) throw bannerErr;
//         const {
//           data: { publicUrl },
//         } = supabase.storage.from("society-media").getPublicUrl(bannerData.path);
//         bannerUrl = publicUrl;
//       }

//       // 2️⃣ Upload profile image (if provided)
//       let profileUrl = null;
//       if (profile) {
//         const fileName = `profile-${Date.now()}-${profile.name}`;
//         const { data: profileData, error: profileErr } = await supabase.storage
//           .from("society-media")
//           .upload(fileName, profile);

//         if (profileErr) throw profileErr;
//         const {
//           data: { publicUrl },
//         } = supabase.storage.from("society-media").getPublicUrl(profileData.path);
//         profileUrl = publicUrl;
//       }

//       // 3️⃣ Insert society
//       const { data, error } = await supabase
//         .from("societies")
//         .insert([
//           {
//             name,
//             description,
//             created_by: user.id,
//             banner_image: bannerUrl,
//             profile_image: profileUrl,
//           },
//         ])
//         .select()
//         .single();

//       if (error) throw error;

//       // 4️⃣ Make creator admin
//       const { error: adminError } = await supabase
//         .from("society_admins")
//         .insert([{ society_id: data.id, user_id: user.id }]);
//       if (adminError) throw adminError;

//       setMsg("✅ Society created successfully!");
//       setTimeout(() => router.push(`/society/${data.id}`), 1200);
//     } catch (err) {
//       console.error("❌ Error creating society:", err.message);
//       setMsg("❌ " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white flex items-center justify-center px-4 py-8">
//       <form
//         onSubmit={handleCreate}
//         className="w-full max-w-2xl bg-white/10 p-8 rounded-2xl border border-white/20 shadow-lg"
//       >
//         <h1 className="text-3xl font-bold mb-6 text-center text-yellow-400">
//           Create a New Society
//         </h1>

//         {/* Society name */}
//         <div className="mb-4">
//           <label className="block mb-1 text-sm font-medium text-gray-200">
//             Society Name
//           </label>
//           <input
//             type="text"
//             placeholder="e.g. Robotics Club"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
//             required
//           />
//         </div>

//         {/* Description */}
//         <div className="mb-4">
//           <label className="block mb-1 text-sm font-medium text-gray-200">
//             Description
//           </label>
//           <textarea
//             placeholder="Describe your society’s vision, mission, and activities..."
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full p-3 rounded-lg bg-white/10 border border-white/20 min-h-[100px] focus:outline-none"
//           />
//         </div>

//         {/* Banner upload */}
//         <div className="mb-4">
//           <label className="block mb-1 text-sm font-medium text-gray-200">
//             Banner Image (Cover)
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setBanner(e.target.files?.[0] || null)}
//             className="w-full bg-white/10 border border-white/20 rounded-lg p-2"
//           />
//         </div>

//         {/* Profile upload */}
//         <div className="mb-6">
//           <label className="block mb-1 text-sm font-medium text-gray-200">
//             Profile Image (Logo)
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setProfile(e.target.files?.[0] || null)}
//             className="w-full bg-white/10 border border-white/20 rounded-lg p-2"
//           />
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full py-3 rounded-lg font-semibold transition-all ${
//             loading
//               ? "bg-gray-600 cursor-not-allowed"
//               : "bg-yellow-400 hover:bg-yellow-500 text-black"
//           }`}
//         >
//           {loading ? "Creating..." : "Create Society"}
//         </button>

//         {/* Message */}
//         {msg && (
//           <p className="text-yellow-300 text-sm mt-4 text-center">{msg}</p>
//         )}
//       </form>
//     </div>
//   );
// }




// app/society/create/page.js
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function CreateSocietyPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function uploadFile(file, folder = "") {
    // returns public url or throws
    if (!file) return null;
    const fileName = `${folder}${Date.now()}-${file.name}`;
    const bucket = "society-media";

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, { cacheControl: "3600", upsert: false });

    if (uploadError) throw uploadError;

    // get public url
    const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(uploadData.path);
    return publicData?.publicUrl || null;
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      // 0 - ensure logged in user and use same session
      const { data: sessionData, error: sessionErr } = await supabase.auth.getUser();
      if (sessionErr) throw sessionErr;
      const user = sessionData?.user;
      if (!user?.id) throw new Error("Please log in before creating a society.");

      // 1 - upload banner/profile (if provided)
      const bannerUrl = banner ? await uploadFile(banner, "banners/") : null;
      const profileUrl = profile ? await uploadFile(profile, "profiles/") : null;

      // 2 - insert society (RLS: this will succeed only if created_by = auth.uid())
      const { data: society, error: societyErr } = await supabase
        .from("societies")
        .insert([
          {
            name,
            description,
            created_by: user.id,
            banner_image: bannerUrl,
            profile_image: profileUrl,
          },
        ])
        .select()
        .single();

      if (societyErr) throw societyErr;

      // 3 - create admin row (RLS: auth.uid() must equal user_id)
      const { error: adminErr } = await supabase
        .from("society_admins")
        .insert([{ society_id: society.id, user_id: user.id }]);

      if (adminErr) throw adminErr;

      setMsg("✅ Society created — redirecting...");
      setTimeout(() => router.push(`/society/${society.id}`), 900);
    } catch (err) {
      console.error("❌ Error creating society:", err);
      setMsg("❌ " + (err?.message || String(err)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black text-white p-6">
      <form onSubmit={handleCreate} className="w-full max-w-2xl bg-white/6 p-6 rounded-xl border border-white/10">
        <h2 className="text-2xl font-semibold mb-4">Create a New Society</h2>

        <input className="w-full p-3 mb-3 rounded bg-white/8" value={name} onChange={(e) => setName(e.target.value)} placeholder="Society name" required />

        <textarea className="w-full p-3 mb-3 rounded bg-white/8" rows={5} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="About this society (short)" />

        <label className="block mb-2">Banner image</label>
        <input type="file" accept="image/*" onChange={(e) => setBanner(e.target.files?.[0] || null)} className="mb-3" />

        <label className="block mb-2">Profile image (logo)</label>
        <input type="file" accept="image/*" onChange={(e) => setProfile(e.target.files?.[0] || null)} className="mb-4" />

        <button type="submit" disabled={loading} className="w-full py-2 rounded bg-yellow-400 text-black font-semibold">
          {loading ? "Creating..." : "Create Society"}
        </button>

        {msg && <p className="mt-3 text-sm text-yellow-200">{msg}</p>}
      </form>
    </div>
  );
}
