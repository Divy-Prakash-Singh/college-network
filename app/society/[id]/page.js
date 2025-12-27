// "use client";
// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import { useParams } from "next/navigation";

// export default function SocietyPage() {
//   const { id } = useParams();
//   const [society, setSociety] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [followed, setFollowed] = useState(false);
//   const [newPost, setNewPost] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadSociety = async () => {
//       const user = (await supabase.auth.getUser()).data.user;
//       const { data: s } = await supabase
//         .from("societies")
//         .select("*")
//         .eq("id", id)
//         .single();
//       setSociety(s);

//       // check admin
//       const { count } = await supabase
//         .from("society_admins")
//         .select("*", { count: "exact", head: true })
//         .eq("society_id", id)
//         .eq("user_id", user?.id);
//       setIsAdmin(count > 0);

//       // check follow
//       const { count: f } = await supabase
//         .from("society_followers")
//         .select("*", { count: "exact", head: true })
//         .eq("society_id", id)
//         .eq("user_id", user?.id);
//       setFollowed(f > 0);

//       // load posts
//       const { data: p } = await supabase
//         .from("society_posts")
//         .select("*, users(name, profile_image)")
//         .eq("society_id", id)
//         .order("created_at", { ascending: false });
//       setPosts(p || []);
//       setLoading(false);
//     };
//     loadSociety();
//   }, [id]);

//   const handleFollow = async () => {
//     const user = (await supabase.auth.getUser()).data.user;
//     if (!user) return alert("Login first");
//     if (followed) {
//       await supabase
//         .from("society_followers")
//         .delete()
//         .eq("society_id", id)
//         .eq("user_id", user.id);
//     } else {
//       await supabase
//         .from("society_followers")
//         .insert([{ society_id: id, user_id: user.id }]);
//     }
//     setFollowed(!followed);
//   };

//   const handlePost = async () => {
//     if (!newPost.trim()) return;
//     const user = (await supabase.auth.getUser()).data.user;
//     const { data, error } = await supabase
//       .from("society_posts")
//       .insert([{ society_id: id, author_id: user.id, content: newPost }])
//       .select()
//       .single();
//     if (!error) setPosts((p) => [data, ...p]);
//     setNewPost("");
//   };

//   if (loading) return <p className="text-center text-white py-20">Loading...</p>;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white p-6">
//       <div className="max-w-3xl mx-auto space-y-6">
//         <div className="bg-white/10 p-6 rounded-xl border border-white/20">
//           <h1 className="text-3xl font-bold mb-2">{society.name}</h1>
//           <p className="text-white/70 mb-4">{society.description}</p>
//           <button
//             onClick={handleFollow}
//             className={`px-4 py-2 rounded-lg ${
//               followed
//                 ? "bg-white/20 text-yellow-400"
//                 : "bg-yellow-400 text-black hover:bg-yellow-500"
//             }`}
//           >
//             {followed ? "Following" : "Follow"}
//           </button>
//         </div>

//         {isAdmin && (
//           <div className="bg-white/10 p-4 rounded-xl border border-white/20">
//             <textarea
//               value={newPost}
//               onChange={(e) => setNewPost(e.target.value)}
//               placeholder="Write a new post..."
//               className="w-full bg-transparent border border-white/20 rounded-lg p-3 mb-2 text-white"
//             />
//             <button
//               onClick={handlePost}
//               className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold"
//             >
//               Post
//             </button>
//           </div>
//         )}

//         <div className="space-y-4">
//           {posts.map((p) => (
//             <div
//               key={p.id}
//               className="bg-white/10 p-4 rounded-lg border border-white/20"
//             >
//               <div className="flex items-center gap-3 mb-2">
//                 <img
//                   src={p.users?.profile_image || "/user.png"}
//                   alt="user"
//                   className="w-8 h-8 rounded-full border border-white/20"
//                 />
//                 <span className="font-medium">{p.users?.name}</span>
//                 <span className="text-xs text-white/60 ml-auto">
//                   {new Date(p.created_at).toLocaleString()}
//                 </span>
//               </div>
//               <p>{p.content}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



















// // app/society/[id]/page.js
// "use client";

// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";
// import { AuthContext } from "@/lib/AuthProvider"; // make sure this exists in your app
// import Navbar from "@/components/Navbar";
// import BottomNavbar from "@/components/BottomNavbar";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// import { Loader2 } from "lucide-react";
// dayjs.extend(relativeTime);

// export default function SocietyPage() {
//   const { id: societyId } = useParams();
//   const router = useRouter();
//   const { currentUser } = useContext(AuthContext);

//   const [society, setSociety] = useState(null);
//   const [admins, setAdmins] = useState([]);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isFollower, setIsFollower] = useState(false);
//   const [followersCount, setFollowersCount] = useState(0);
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [posting, setPosting] = useState(false);
//   const [newPost, setNewPost] = useState("");

//   useEffect(() => {
//     if (!societyId) return;
//     setLoading(true);

//     const fetch = async () => {
//       try {
//         // 1) society row
//         const { data: s, error: sErr } = await supabase
//           .from("societies")
//           .select("id, name, description, profile_image, banner_image, created_by, created_at")
//           .eq("id", societyId)
//           .single();

//         if (sErr) throw sErr;
//         setSociety(s);

//         // 2) admins from join table
//         const { data: adminRows } = await supabase
//           .from("society_admins")
//           .select("user_id");

//         // fetch admins specifically for this society
//         const { data: sa, error: saErr } = await supabase
//           .from("society_admins")
//           .select("user_id")
//           .eq("society_id", societyId);

//         if (saErr) throw saErr;
//         const adminIds = (sa || []).map((r) => r.user_id);

//         if (adminIds.length) {
//           const { data: adminUsers } = await supabase
//             .from("users")
//             .select("id, name, profile_image")
//             .in("id", adminIds);
//           setAdmins(adminUsers || []);
//         } else {
//           setAdmins([]);
//         }

//         // 3) followers count & follow state
//         const { count } = await supabase
//           .from("society_followers")
//           .select("*", { count: "exact", head: true })
//           .eq("society_id", societyId);
//         setFollowersCount(count || 0);

//         if (currentUser?.id) {
//           const { data: f } = await supabase
//             .from("society_followers")
//             .select("id")
//             .eq("society_id", societyId)
//             .eq("user_id", currentUser.id)
//             .maybeSingle();
//           setIsFollower(!!f);
//         }

//         // 4) is admin?
//         if (currentUser?.id && adminIds.length) {
//           setIsAdmin(adminIds.includes(currentUser.id));
//         } else setIsAdmin(false);

//         // 5) posts with author join
//         const { data: p, error: pErr } = await supabase
//           .from("society_posts")
//           .select(`
//             id, content, image, created_at, author_id,
//             users:author_id ( id, name, profile_image )
//           `)
//           .eq("society_id", societyId)
//           .order("created_at", { ascending: false });
//         if (pErr) throw pErr;
//         setPosts(p || []);
//       } catch (err) {
//         console.error("society fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetch();
//   }, [societyId, currentUser?.id]);

//   const toggleFollow = async () => {
//     if (!currentUser?.id) return router.push("/signup");
//     try {
//       if (isFollower) {
//         await supabase.from("society_followers").delete().eq("society_id", societyId).eq("user_id", currentUser.id);
//         setIsFollower(false);
//         setFollowersCount((c) => Math.max(0, c - 1));
//       } else {
//         await supabase.from("society_followers").insert([{ society_id: societyId, user_id: currentUser.id }]);
//         setIsFollower(true);
//         setFollowersCount((c) => c + 1);
//       }
//     } catch (err) {
//       console.error("follow error:", err);
//       alert("Failed to change follow state: " + err.message);
//     }
//   };

//   const createPost = async () => {
//     if (!isAdmin) return alert("Only admins can post.");
//     if (!newPost.trim()) return;

//     setPosting(true);
//     try {
//       const { data: created, error } = await supabase
//         .from("society_posts")
//         .insert([{ society_id: societyId, author_id: currentUser.id, content: newPost.trim() }])
//         .select("id, content, image, created_at, author_id, users:author_id (id,name,profile_image)")
//         .single();
//       if (error) throw error;
//       setPosts((p) => [created, ...p]);
//       setNewPost("");
//     } catch (err) {
//       console.error("create post failed:", err);
//       alert("Failed to create post: " + err.message);
//     } finally {
//       setPosting(false);
//     }
//   };

//   if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
//   if (!society) return <div className="min-h-screen flex items-center justify-center text-white">Society not found.</div>;

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <Navbar />
//       <div className="w-full bg-black">
//         <div className="relative mx-auto max-w-6xl" style={{ minHeight: 220 }}>
//           <img src={society.banner_image || "https://via.placeholder.com/1200x250?text=Society+Banner"} alt="banner" className="w-full h-52 object-cover rounded-b-xl" />
//           <div className="absolute left-6 -bottom-12 flex items-end gap-4">
//             <img src={society.profile_image || "https://via.placeholder.com/150"} alt="profile" className="w-28 h-28 rounded-full border-4 border-gray-900 object-cover" />
//             <div className="ml-2 mt-6">
//               <h1 className="text-2xl font-bold">{society.name}</h1>
//               <p className="text-sm text-gray-300">{society.description?.slice(0, 140)}</p>
//             </div>
//           </div>

//           <div className="absolute right-6 top-6 flex items-center gap-4">
//             <div className="text-right mr-4">
//               <div className="text-sm text-gray-300">Followers</div>
//               <div className="font-semibold">{followersCount}</div>
//             </div>
//             <button onClick={toggleFollow} className={`px-4 py-2 rounded-full ${isFollower ? "bg-gray-700" : "bg-blue-600"}`}>
//               {isFollower ? "Following" : "Follow"}
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 mt-20 pb-20">
//         <aside className="col-span-1">
//           <div className="rounded-xl p-4 bg-gray-800 border border-gray-700">
//             <h3 className="font-semibold text-lg">About</h3>
//             <p className="text-sm text-gray-300 mt-2">{society.description}</p>
//           </div>

//           <div className="mt-4 rounded-xl p-4 bg-gray-800 border border-gray-700">
//             <h4 className="font-semibold">Admins</h4>
//             <div className="mt-3 space-y-3">
//               {admins.length === 0 ? <div className="text-sm text-gray-400">No admins</div> : admins.map(a => (
//                 <div key={a.id} className="flex items-center gap-3">
//                   <img src={a.profile_image || "https://via.placeholder.com/40"} alt={a.name} className="w-10 h-10 rounded-full object-cover" />
//                   <div>
//                     <div className="font-medium text-sm">{a.name}</div>
//                     <div className="text-xs text-gray-400">Admin</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </aside>

//         <main className="col-span-2 space-y-4">
//           {isAdmin && (
//             <div className="rounded-xl p-4 bg-gray-800 border border-gray-700">
//               <textarea value={newPost} onChange={(e) => setNewPost(e.target.value)} className="w-full bg-black/40 p-3 rounded" placeholder={`Share something with ${society.name}...`} />
//               <div className="flex justify-end mt-3">
//                 <button onClick={() => setNewPost("")} className="px-4 py-2 rounded border mr-2">Cancel</button>
//                 <button onClick={createPost} disabled={posting || !newPost.trim()} className="px-4 py-2 rounded bg-yellow-400 text-black">{posting ? "Posting..." : "Post"}</button>
//               </div>
//             </div>
//           )}

//           {posts.length === 0 ? <div className="p-4 rounded bg-gray-800 border text-gray-400">No posts yet.</div> : posts.map(p => (
//             <article key={p.id} className="rounded-xl p-4 bg-gray-800 border border-gray-700">
//               <div className="flex items-start gap-3">
//                 <img src={p.users?.profile_image || "https://via.placeholder.com/44"} alt={p.users?.name} className="w-11 h-11 rounded-full object-cover" />
//                 <div className="flex-1">
//                   <div className="flex justify-between">
//                     <div>
//                       <div className="font-medium">{p.users?.name || "Unknown"}</div>
//                       <div className="text-xs text-gray-400">{dayjs(p.created_at).fromNow()}</div>
//                     </div>
//                     <button onClick={() => {}} className="text-sm px-2 py-1 border rounded">👍 Like</button>
//                   </div>

//                   <p className="mt-3">{p.content}</p>
//                   {p.image && <img src={p.image} className="mt-3 rounded w-full object-cover" alt="post" />}
//                 </div>
//               </div>
//             </article>
//           ))}
//         </main>
//       </div>

//       <BottomNavbar />
//     </div>
//   );
// }










// // app/society/[id]/page.js
// "use client";

// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";
// import { AuthContext } from "@/lib/AuthProvider";
// import Navbar from "@/components/Navbar";
// import BottomNavbar from "@/components/BottomNavbar";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// import { Loader2 } from "lucide-react";
// import CreatePostModal from "@/components/CreatePostModal";
// import PostCard from "@/components/PostCard";

// dayjs.extend(relativeTime);

// export default function SocietyPage() {
//   const { id: societyId } = useParams();
//   const router = useRouter();
//   const { currentUser } = useContext(AuthContext);

//   const [society, setSociety] = useState(null);
//   const [admins, setAdmins] = useState([]);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isFollower, setIsFollower] = useState(false);
//   const [followersCount, setFollowersCount] = useState(0);
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [modalOpen, setModalOpen] = useState(false);

//   useEffect(() => {
//     if (!societyId) return;
//     setLoading(true);

//     const fetchAll = async () => {
//       try {
//         // society row
//         const { data: s, error: sErr } = await supabase
//           .from("societies")
//           .select("id, name, description, profile_image, banner_image, created_by, created_at")
//           .eq("id", societyId)
//           .single();
//         if (sErr) throw sErr;
//         setSociety(s);

//         // admins for this society (join table)
//         const { data: sa } = await supabase
//           .from("society_admins")
//           .select("user_id")
//           .eq("society_id", societyId);

//         const adminIds = (sa || []).map((r) => r.user_id);

//         if (adminIds.length) {
//           const { data: adminUsers } = await supabase
//             .from("users")
//             .select("id,name,profile_image")
//             .in("id", adminIds);
//           setAdmins(adminUsers || []);
//         } else {
//           setAdmins([]);
//         }

//         // followers count
//         const { count } = await supabase
//           .from("society_followers")
//           .select("*", { count: "exact", head: true })
//           .eq("society_id", societyId);
//         setFollowersCount(count || 0);

//         // follow state
//         if (currentUser?.id) {
//           const { data: f } = await supabase
//             .from("society_followers")
//             .select("id")
//             .eq("society_id", societyId)
//             .eq("user_id", currentUser.id)
//             .maybeSingle();
//           setIsFollower(!!f);
//         }

//         // is admin?
//         setIsAdmin(currentUser?.id ? adminIds.includes(currentUser.id) : false);

//         // posts
//         const { data: p } = await supabase
//           .from("society_posts")
//           .select("id, society_id, author_id, content, created_at, users:author_id (id,name,profile_image)")
//           .eq("society_id", societyId)
//           .order("created_at", { ascending: false })
//           .limit(50);

//         const postsArray = p || [];

//         // load images for posts
//         const postIds = postsArray.map((x) => x.id);
//         let images = [];
//         if (postIds.length) {
//           const { data: imgs } = await supabase
//             .from("post_images")
//             .select("post_id, image_url")
//             .in("post_id", postIds);
//           images = imgs || [];
//         }

//         // load comments counts and optionally comments
//         const { data: cmts } = await supabase
//           .from("post_comments")
//           .select("post_id, id, user_id, comment, created_at")
//           .in("post_id", postIds || []);

//         const groupedImages = {};
//         for (const im of images) {
//           groupedImages[im.post_id] = groupedImages[im.post_id] || [];
//           groupedImages[im.post_id].push(im);
//         }

//         const groupedComments = {};
//         for (const c of (cmts || [])) {
//           groupedComments[c.post_id] = groupedComments[c.post_id] || [];
//           groupedComments[c.post_id].push(c);
//         }

//         const enriched = postsArray.map((ps) => ({
//           ...ps,
//           _images: groupedImages[ps.id] || [],
//           _comments: groupedComments[ps.id] || [],
//         }));

//         setPosts(enriched);
//       } catch (err) {
//         console.error("Fetch society error:", err);
//         setSociety(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAll();
//   }, [societyId, currentUser?.id]);

//   const toggleFollow = async () => {
//     if (!currentUser?.id) return router.push("/signup");
//     try {
//       if (isFollower) {
//         await supabase.from("society_followers").delete().eq("society_id", societyId).eq("user_id", currentUser.id);
//         setIsFollower(false);
//         setFollowersCount((c) => Math.max(0, c - 1));
//       } else {
//         await supabase.from("society_followers").insert([{ society_id: societyId, user_id: currentUser.id }]);
//         setIsFollower(true);
//         setFollowersCount((c) => c + 1);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Follow action failed.");
//     }
//   };

//   const onPosted = (newPostRow) => {
//     // fetch post images & author join for the new post ideally,
//     // but since CreatePostModal inserted images and post, we fetch post+images and prepend.
//     (async () => {
//       try {
//         const { data: post } = await supabase
//           .from("society_posts")
//           .select("id, society_id, author_id, content, created_at, users:author_id (id,name,profile_image)")
//           .eq("id", newPostRow.id)
//           .single();

//         const { data: imgs } = await supabase.from("post_images").select("image_url").eq("post_id", newPostRow.id);
//         const { data: cmts } = await supabase.from("post_comments").select("id,post_id,user_id,comment,created_at").eq("post_id", newPostRow.id);

//         const enriched = {
//           ...post,
//           _images: imgs || [],
//           _comments: cmts || [],
//         };

//         setPosts((p) => [enriched, ...p]);
//       } catch (err) {
//         console.warn("onPosted fetch error", err);
//       }
//     })();
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader2 className="animate-spin" />
//       </div>
//     );
//   }

//   if (!society) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white">
//         Society not found.
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <Navbar />

//       {/* Banner */}
//       <div className="w-full bg-black">
//         <div className="relative mx-auto max-w-6xl" style={{ minHeight: 220 }}>
//           <img src={society.banner_image || "https://via.placeholder.com/1200x250?text=Society+Banner"} alt="banner" className="w-full h-52 object-cover rounded-b-xl" />
//           <div className="absolute left-6 -bottom-12 flex items-end gap-4">
//             <img src={society.profile_image || "https://via.placeholder.com/150"} alt="profile" className="w-28 h-28 rounded-full border-4 border-gray-900 object-cover" />
//             <div className="ml-2 mt-6">
//               <h1 className="text-2xl font-bold">{society.name}</h1>
//               <p className="text-sm text-gray-300">{society.description?.slice(0, 140)}</p>
//             </div>
//           </div>

//           <div className="absolute right-6 top-6 flex items-center gap-4">
//             <div className="text-right mr-4">
//               <div className="text-sm text-gray-300">Followers</div>
//               <div className="font-semibold">{followersCount}</div>
//             </div>
//             <button onClick={toggleFollow} className={`px-4 py-2 rounded-full ${isFollower ? "bg-gray-700" : "bg-blue-600"}`}>
//               {isFollower ? "Following" : "Follow"}
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 mt-20 pb-20">
//         <aside className="col-span-1">
//           <div className="rounded-xl p-4 bg-gray-800 border border-gray-700">
//             <h3 className="font-semibold text-lg">About</h3>
//             <p className="text-sm text-gray-300 mt-2">{society.description}</p>
//           </div>

//           <div className="mt-4 rounded-xl p-4 bg-gray-800 border border-gray-700">
//             <h4 className="font-semibold">Admins</h4>
//             <div className="mt-3 space-y-3">
//               {admins.length === 0 ? <div className="text-sm text-gray-400">No admins</div> : admins.map(a => (
//                 <div key={a.id} className="flex items-center gap-3">
//                   <img src={a.profile_image || "https://via.placeholder.com/40"} alt={a.name} className="w-10 h-10 rounded-full object-cover" />
//                   <div>
//                     <div className="font-medium text-sm">{a.name}</div>
//                     <div className="text-xs text-gray-400">Admin</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {isAdmin && (
//             <div className="mt-4">
//               <button onClick={() => setModalOpen(true)} className="w-full bg-yellow-400 text-black py-2 rounded-lg font-semibold">Create Post</button>
//             </div>
//           )}
//         </aside>

//         <main className="col-span-2 space-y-4">
//           {posts.length === 0 ? <div className="p-4 rounded bg-gray-800 border text-gray-400">No posts yet.</div> : posts.map(p => (
//             <PostCard key={p.id} post={p} currentUser={currentUser} onLikeUpdate={() => { /* optionally refresh counts */ }} />
//           ))}
//         </main>
//       </div>

//       <CreatePostModal open={modalOpen} onClose={() => setModalOpen(false)} societyId={societyId} onPosted={onPosted} />
//       <BottomNavbar />
//     </div>
//   );
// }










// // app/society/[id]/page.js
// "use client";

// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";
// import { AuthContext } from "@/lib/AuthProvider";
// import Navbar from "@/components/Navbar";
// import BottomNavbar from "@/components/BottomNavbar";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// import { Loader2 } from "lucide-react";
// import CreatePostModal from "@/components/CreatePostModal";
// import PostCard from "@/components/PostCard";

// dayjs.extend(relativeTime);

// export default function SocietyPage() {
//   const { id: societyId } = useParams();
//   const router = useRouter();
//   const { currentUser } = useContext(AuthContext);

//   const [society, setSociety] = useState(null);
//   const [admins, setAdmins] = useState([]);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isFollower, setIsFollower] = useState(false);
//   const [followersCount, setFollowersCount] = useState(0);
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [modalOpen, setModalOpen] = useState(false);

//   const fetchPosts = async () => {
//     try {
//       // Fetch posts with author info
//       const { data: p } = await supabase
//         .from("society_posts")
//         .select("id, society_id, author_id, content, created_at, users:author_id (id,name,profile_image)")
//         .eq("society_id", societyId)
//         .order("created_at", { ascending: false })
//         .limit(50);

//       const postsArray = p || [];
//       const postIds = postsArray.map((x) => x.id);

//       if (postIds.length === 0) {
//         setPosts([]);
//         return;
//       }

//       // Fetch likes for all posts
//       const { data: likes } = await supabase
//         .from("society_post_likes")
//         .select("post_id, user_id")
//         .in("post_id", postIds);

//       // Fetch comments for all posts with user info
//       const { data: comments } = await supabase
//         .from("society_post_comments")
//         .select("id, post_id, user_id, content, created_at, users:user_id(id,name,profile_image)")
//         .in("post_id", postIds)
//         .order("created_at", { ascending: true });

//       // Group likes by post_id
//       const groupedLikes = {};
//       for (const like of (likes || [])) {
//         groupedLikes[like.post_id] = groupedLikes[like.post_id] || [];
//         groupedLikes[like.post_id].push(like);
//       }

//       // Group comments by post_id
//       const groupedComments = {};
//       for (const comment of (comments || [])) {
//         groupedComments[comment.post_id] = groupedComments[comment.post_id] || [];
//         groupedComments[comment.post_id].push(comment);
//       }

//       // Enrich posts with likes and comments
//       const enriched = postsArray.map((post) => {
//         const postLikes = groupedLikes[post.id] || [];
//         const postComments = groupedComments[post.id] || [];
//         const isLikedByUser = currentUser?.id 
//           ? postLikes.some(l => l.user_id === currentUser.id) 
//           : false;

//         return {
//           ...post,
//           _likes: postLikes,
//           _likesCount: postLikes.length,
//           _isLiked: isLikedByUser,
//           _comments: postComments,
//           _commentsCount: postComments.length,
//         };
//       });

//       setPosts(enriched);
//     } catch (err) {
//       console.error("Fetch posts error:", err);
//     }
//   };

//   useEffect(() => {
//     if (!societyId) return;
//     setLoading(true);

//     const fetchAll = async () => {
//       try {
//         // Fetch society info
//         const { data: s, error: sErr } = await supabase
//           .from("societies")
//           .select("id, name, description, profile_image, banner_image, created_by, created_at")
//           .eq("id", societyId)
//           .single();
//         if (sErr) throw sErr;
//         setSociety(s);

//         // Fetch admins
//         const { data: sa } = await supabase
//           .from("society_admins")
//           .select("user_id")
//           .eq("society_id", societyId);

//         const adminIds = (sa || []).map((r) => r.user_id);

//         if (adminIds.length) {
//           const { data: adminUsers } = await supabase
//             .from("users")
//             .select("id,name,profile_image")
//             .in("id", adminIds);
//           setAdmins(adminUsers || []);
//         } else {
//           setAdmins([]);
//         }

//         // Fetch followers count
//         const { count } = await supabase
//           .from("society_followers")
//           .select("*", { count: "exact", head: true })
//           .eq("society_id", societyId);
//         setFollowersCount(count || 0);

//         // Check if current user follows
//         if (currentUser?.id) {
//           const { data: f } = await supabase
//             .from("society_followers")
//             .select("id")
//             .eq("society_id", societyId)
//             .eq("user_id", currentUser.id)
//             .maybeSingle();
//           setIsFollower(!!f);
//         }

//         // Check if current user is admin
//         setIsAdmin(currentUser?.id ? adminIds.includes(currentUser.id) : false);

//         // Fetch posts
//         await fetchPosts();
//       } catch (err) {
//         console.error("Fetch society error:", err);
//         setSociety(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAll();
//   }, [societyId, currentUser?.id]);

//   const toggleFollow = async () => {
//     if (!currentUser?.id) return router.push("/signup");
//     try {
//       if (isFollower) {
//         await supabase
//           .from("society_followers")
//           .delete()
//           .eq("society_id", societyId)
//           .eq("user_id", currentUser.id);
//         setIsFollower(false);
//         setFollowersCount((c) => Math.max(0, c - 1));
//       } else {
//         await supabase
//           .from("society_followers")
//           .insert([{ society_id: societyId, user_id: currentUser.id }]);
//         setIsFollower(true);
//         setFollowersCount((c) => c + 1);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Follow action failed.");
//     }
//   };

//   const onPosted = async () => {
//     // Refresh posts after new post is created
//     await fetchPosts();
//   };

//   const handleLikeUpdate = async (postId) => {
//     // Refresh just this post's like status
//     await fetchPosts();
//   };

//   const handleCommentAdded = async (postId) => {
//     // Refresh posts after comment is added
//     await fetchPosts();
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader2 className="animate-spin" />
//       </div>
//     );
//   }

//   if (!society) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white">
//         Society not found.
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <Navbar />

//       {/* Banner */}
//       <div className="w-full bg-black">
//         <div className="relative mx-auto max-w-6xl" style={{ minHeight: 220 }}>
//           <img 
//             src={society.banner_image || "https://via.placeholder.com/1200x250?text=Society+Banner"} 
//             alt="banner" 
//             className="w-full h-52 object-cover rounded-b-xl" 
//           />
//           <div className="absolute left-6 -bottom-12 flex items-end gap-4">
//             <img 
//               src={society.profile_image || "https://via.placeholder.com/150"} 
//               alt="profile" 
//               className="w-28 h-28 rounded-full border-4 border-gray-900 object-cover" 
//             />
//             <div className="ml-2 mt-6">
//               <h1 className="text-2xl font-bold">{society.name}</h1>
//               <p className="text-sm text-gray-300">{society.description?.slice(0, 140)}</p>
//             </div>
//           </div>

//           <div className="absolute right-6 top-6 flex items-center gap-4">
//             <div className="text-right mr-4">
//               <div className="text-sm text-gray-300">Followers</div>
//               <div className="font-semibold">{followersCount}</div>
//             </div>
//             <button 
//               onClick={toggleFollow} 
//               className={`px-4 py-2 rounded-full ${isFollower ? "bg-gray-700" : "bg-blue-600"}`}
//             >
//               {isFollower ? "Following" : "Follow"}
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 mt-20 pb-20">
//         <aside className="col-span-1">
//           <div className="rounded-xl p-4 bg-gray-800 border border-gray-700">
//             <h3 className="font-semibold text-lg">About</h3>
//             <p className="text-sm text-gray-300 mt-2">{society.description}</p>
//           </div>

//           <div className="mt-4 rounded-xl p-4 bg-gray-800 border border-gray-700">
//             <h4 className="font-semibold">Admins</h4>
//             <div className="mt-3 space-y-3">
//               {admins.length === 0 ? (
//                 <div className="text-sm text-gray-400">No admins</div>
//               ) : (
//                 admins.map(a => (
//                   <div key={a.id} className="flex items-center gap-3">
//                     <img 
//                       src={a.profile_image || "https://via.placeholder.com/40"} 
//                       alt={a.name} 
//                       className="w-10 h-10 rounded-full object-cover" 
//                     />
//                     <div>
//                       <div className="font-medium text-sm">{a.name}</div>
//                       <div className="text-xs text-gray-400">Admin</div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {isAdmin && (
//             <div className="mt-4">
//               <button 
//                 onClick={() => setModalOpen(true)} 
//                 className="w-full bg-yellow-400 text-black py-2 rounded-lg font-semibold"
//               >
//                 Create Post
//               </button>
//             </div>
//           )}
//         </aside>

//         <main className="col-span-2 space-y-4">
//           {posts.length === 0 ? (
//             <div className="p-4 rounded bg-gray-800 border text-gray-400">No posts yet.</div>
//           ) : (
//             posts.map(p => (
//               <PostCard 
//                 key={p.id} 
//                 post={p} 
//                 currentUser={currentUser} 
//                 onLikeUpdate={() => handleLikeUpdate(p.id)}
//                 onCommentAdded={() => handleCommentAdded(p.id)}
//               />
//             ))
//           )}
//         </main>
//       </div>

//       <CreatePostModal 
//         open={modalOpen} 
//         onClose={() => setModalOpen(false)} 
//         societyId={societyId} 
//         onPosted={onPosted} 
//       />
//       <BottomNavbar />
//     </div>
//   );
// }



















// // app/society/[id]/page.js
// "use client";

// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";
// import { AuthContext } from "@/lib/AuthProvider";
// import Navbar from "@/components/Navbar";
// import BottomNavbar from "@/components/BottomNavbar";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// import { Loader2 } from "lucide-react";
// import CreatePostModal from "@/components/CreatePostModal";
// import PostCard from "@/components/PostCard";

// dayjs.extend(relativeTime);

// export default function SocietyPage() {
//   const { id: societyId } = useParams();
//   const router = useRouter();
//   const { currentUser } = useContext(AuthContext);

//   const [society, setSociety] = useState(null);
//   const [admins, setAdmins] = useState([]);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isFollower, setIsFollower] = useState(false);
//   const [followersCount, setFollowersCount] = useState(0);
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [modalOpen, setModalOpen] = useState(false);

//   const fetchPosts = async () => {
//     try {
//       // Fetch posts with author info
//       const { data: p } = await supabase
//         .from("society_posts")
//         .select("id, society_id, author_id, content, created_at, users:author_id (id,name,profile_image)")
//         .eq("society_id", societyId)
//         .order("created_at", { ascending: false })
//         .limit(50);

//       const postsArray = p || [];
//       const postIds = postsArray.map((x) => x.id);

//       if (postIds.length === 0) {
//         setPosts([]);
//         return;
//       }

//       // Fetch images for all posts
//       const { data: postImages } = await supabase
//         .from("society_post_images")
//         .select("post_id, image_url")
//         .in("post_id", postIds)
//         .order("created_at", { ascending: true });

//       // Fetch likes for all posts
//       const { data: likes } = await supabase
//         .from("society_post_likes")
//         .select("post_id, user_id")
//         .in("post_id", postIds);

//       // Fetch comments for all posts with user info
//       const { data: comments } = await supabase
//         .from("society_post_comments")
//         .select("id, post_id, user_id, content, created_at, users:user_id(id,name,profile_image)")
//         .in("post_id", postIds)
//         .order("created_at", { ascending: true });

//       // Group images by post_id
//       const groupedImages = {};
//       for (const img of (postImages || [])) {
//         groupedImages[img.post_id] = groupedImages[img.post_id] || [];
//         groupedImages[img.post_id].push(img.image_url);
//       }

//       // Group likes by post_id
//       const groupedLikes = {};
//       for (const like of (likes || [])) {
//         groupedLikes[like.post_id] = groupedLikes[like.post_id] || [];
//         groupedLikes[like.post_id].push(like);
//       }

//       // Group comments by post_id
//       const groupedComments = {};
//       for (const comment of (comments || [])) {
//         groupedComments[comment.post_id] = groupedComments[comment.post_id] || [];
//         groupedComments[comment.post_id].push(comment);
//       }

//       // Enrich posts with images, likes and comments
//       const enriched = postsArray.map((post) => {
//         const postImages = groupedImages[post.id] || [];
//         const postLikes = groupedLikes[post.id] || [];
//         const postComments = groupedComments[post.id] || [];
//         const isLikedByUser = currentUser?.id 
//           ? postLikes.some(l => l.user_id === currentUser.id) 
//           : false;

//         return {
//           ...post,
//           _images: postImages,
//           _likes: postLikes,
//           _likesCount: postLikes.length,
//           _isLiked: isLikedByUser,
//           _comments: postComments,
//           _commentsCount: postComments.length,
//         };
//       });

//       setPosts(enriched);
//     } catch (err) {
//       console.error("Fetch posts error:", err);
//     }
//   };

//   useEffect(() => {
//     if (!societyId) return;
//     setLoading(true);

//     const fetchAll = async () => {
//       try {
//         // Fetch society info
//         const { data: s, error: sErr } = await supabase
//           .from("societies")
//           .select("id, name, description, profile_image, banner_image, created_by, created_at")
//           .eq("id", societyId)
//           .single();
//         if (sErr) throw sErr;
//         setSociety(s);

//         // Fetch admins
//         const { data: sa } = await supabase
//           .from("society_admins")
//           .select("user_id")
//           .eq("society_id", societyId);

//         const adminIds = (sa || []).map((r) => r.user_id);

//         if (adminIds.length) {
//           const { data: adminUsers } = await supabase
//             .from("users")
//             .select("id,name,profile_image")
//             .in("id", adminIds);
//           setAdmins(adminUsers || []);
//         } else {
//           setAdmins([]);
//         }

//         // Fetch followers count
//         const { count } = await supabase
//           .from("society_followers")
//           .select("*", { count: "exact", head: true })
//           .eq("society_id", societyId);
//         setFollowersCount(count || 0);

//         // Check if current user follows
//         if (currentUser?.id) {
//           const { data: f } = await supabase
//             .from("society_followers")
//             .select("id")
//             .eq("society_id", societyId)
//             .eq("user_id", currentUser.id)
//             .maybeSingle();
//           setIsFollower(!!f);
//         }

//         // Check if current user is admin
//         setIsAdmin(currentUser?.id ? adminIds.includes(currentUser.id) : false);

//         // Fetch posts
//         await fetchPosts();
//       } catch (err) {
//         console.error("Fetch society error:", err);
//         setSociety(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAll();
//   }, [societyId, currentUser?.id]);

//   const toggleFollow = async () => {
//     if (!currentUser?.id) return router.push("/signup");
//     try {
//       if (isFollower) {
//         await supabase
//           .from("society_followers")
//           .delete()
//           .eq("society_id", societyId)
//           .eq("user_id", currentUser.id);
//         setIsFollower(false);
//         setFollowersCount((c) => Math.max(0, c - 1));
//       } else {
//         await supabase
//           .from("society_followers")
//           .insert([{ society_id: societyId, user_id: currentUser.id }]);
//         setIsFollower(true);
//         setFollowersCount((c) => c + 1);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Follow action failed.");
//     }
//   };

//   const onPosted = async () => {
//     // Refresh posts after new post is created
//     await fetchPosts();
//   };

//   const handleLikeUpdate = async (postId) => {
//     // Refresh posts after like update
//     await fetchPosts();
//   };

//   const handleCommentAdded = async (postId) => {
//     // Refresh posts after comment is added
//     await fetchPosts();
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-900">
//         <Loader2 className="animate-spin text-white" size={40} />
//       </div>
//     );
//   }

//   if (!society) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-2">Society not found</h2>
//           <button 
//             onClick={() => router.push("/")} 
//             className="text-blue-400 hover:underline"
//           >
//             Go back home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <Navbar />

//       {/* Banner */}
//       <div className="w-full bg-black">
//         <div className="relative mx-auto max-w-6xl" style={{ minHeight: 220 }}>
//           <img 
//             src={society.banner_image || "https://via.placeholder.com/1200x250?text=Society+Banner"} 
//             alt="banner" 
//             className="w-full h-52 object-cover rounded-b-xl" 
//           />
//           <div className="absolute left-6 -bottom-12 flex items-end gap-4">
//             <img 
//               src={society.profile_image || "https://via.placeholder.com/150"} 
//               alt="profile" 
//               className="w-28 h-28 rounded-full border-4 border-gray-900 object-cover" 
//             />
//             <div className="ml-2 mt-6">
//               <h1 className="text-2xl font-bold">{society.name}</h1>
//               <p className="text-sm text-gray-300">{society.description?.slice(0, 140)}</p>
//             </div>
//           </div>

//           <div className="absolute right-6 top-6 flex items-center gap-4">
//             <div className="text-right mr-4">
//               <div className="text-sm text-gray-300">Followers</div>
//               <div className="font-semibold">{followersCount}</div>
//             </div>
//             <button 
//               onClick={toggleFollow} 
//               className={`px-4 py-2 rounded-full transition-colors ${
//                 isFollower 
//                   ? "bg-gray-700 hover:bg-gray-600" 
//                   : "bg-blue-600 hover:bg-blue-700"
//               }`}
//             >
//               {isFollower ? "Following" : "Follow"}
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 mt-20 pb-20">
//         <aside className="col-span-1">
//           <div className="rounded-xl p-4 bg-gray-800 border border-gray-700">
//             <h3 className="font-semibold text-lg">About</h3>
//             <p className="text-sm text-gray-300 mt-2">{society.description}</p>
//           </div>

//           <div className="mt-4 rounded-xl p-4 bg-gray-800 border border-gray-700">
//             <h4 className="font-semibold">Admins</h4>
//             <div className="mt-3 space-y-3">
//               {admins.length === 0 ? (
//                 <div className="text-sm text-gray-400">No admins</div>
//               ) : (
//                 admins.map(a => (
//                   <div key={a.id} className="flex items-center gap-3">
//                     <img 
//                       src={a.profile_image || "https://via.placeholder.com/40"} 
//                       alt={a.name} 
//                       className="w-10 h-10 rounded-full object-cover" 
//                     />
//                     <div>
//                       <div className="font-medium text-sm">{a.name}</div>
//                       <div className="text-xs text-gray-400">Admin</div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {isAdmin && (
//             <div className="mt-4">
//               <button 
//                 onClick={() => setModalOpen(true)} 
//                 className="w-full bg-yellow-400 text-black py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
//               >
//                 Create Post
//               </button>
//             </div>
//           )}
//         </aside>

//         <main className="col-span-1 lg:col-span-2 space-y-4">
//           {posts.length === 0 ? (
//             <div className="p-8 rounded-xl bg-gray-800 border border-gray-700 text-center">
//               <p className="text-gray-400">No posts yet.</p>
//               {isAdmin && (
//                 <button
//                   onClick={() => setModalOpen(true)}
//                   className="mt-3 text-blue-400 hover:underline"
//                 >
//                   Create the first post
//                 </button>
//               )}
//             </div>
//           ) : (
//             posts.map(p => (
//               <PostCard 
//                 key={p.id} 
//                 post={p} 
//                 currentUser={currentUser} 
//                 onLikeUpdate={() => handleLikeUpdate(p.id)}
//                 onCommentAdded={() => handleCommentAdded(p.id)}
//               />
//             ))
//           )}
//         </main>
//       </div>

//       <CreatePostModal 
//         open={modalOpen} 
//         onClose={() => setModalOpen(false)} 
//         societyId={societyId} 
//         onPosted={onPosted} 
//       />
//       <BottomNavbar />
//     </div>
//   );
// }

















// app/society/[id]/page.js
"use client";

import React, { useEffect, useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { AuthContext } from "@/lib/AuthProvider";
import Navbar from "@/components/Navbar";
import BottomNavbar from "@/components/BottomNavbar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Loader2 } from "lucide-react";
import CreatePostModal from "@/components/CreatePostModal";
import PostCard from "@/components/PostCard";

dayjs.extend(relativeTime);

export default function SocietyPage() {
  const { id: societyId } = useParams();
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  const [society, setSociety] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFollower, setIsFollower] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);

  const fetchPosts = async () => {
    try {
      // Fetch posts first
      const { data: postsData, error: postsError } = await supabase
        .from("society_posts")
        .select("id, society_id, author_id, content, created_at")
        .eq("society_id", societyId)
        .order("created_at", { ascending: false })
        .limit(50);

      if (postsError) {
        console.error("Posts fetch error:", postsError);
        throw postsError;
      }

      const postsArray = postsData || [];
      
      if (postsArray.length === 0) {
        setPosts([]);
        return;
      }

      const postIds = postsArray.map((x) => x.id);
      const authorIds = [...new Set(postsArray.map(p => p.author_id))];

      // Fetch authors separately
      const { data: authorsData } = await supabase
        .from("users")
        .select("id, name, profile_image")
        .in("id", authorIds);

      const authorsMap = {};
      (authorsData || []).forEach(author => {
        authorsMap[author.id] = author;
      });

      // Fetch images for all posts
      const { data: postImages } = await supabase
        .from("society_post_images")
        .select("post_id, image_url")
        .in("post_id", postIds)
        .order("created_at", { ascending: true });

      // Fetch likes for all posts
      const { data: likes } = await supabase
        .from("society_post_likes")
        .select("post_id, user_id")
        .in("post_id", postIds);

      // Fetch comments for all posts
      const { data: commentsData } = await supabase
        .from("society_post_comments")
        .select("id, post_id, user_id, content, created_at")
        .in("post_id", postIds)
        .order("created_at", { ascending: true });

      // Fetch comment authors
      const commentUserIds = [...new Set((commentsData || []).map(c => c.user_id))];
      const { data: commentAuthors } = await supabase
        .from("users")
        .select("id, name, profile_image")
        .in("id", commentUserIds);

      const commentAuthorsMap = {};
      (commentAuthors || []).forEach(author => {
        commentAuthorsMap[author.id] = author;
      });

      // Add author info to comments
      const enrichedComments = (commentsData || []).map(comment => ({
        ...comment,
        users: commentAuthorsMap[comment.user_id] || null
      }));

      // Group images by post_id
      const groupedImages = {};
      for (const img of (postImages || [])) {
        groupedImages[img.post_id] = groupedImages[img.post_id] || [];
        groupedImages[img.post_id].push(img.image_url);
      }

      // Group likes by post_id
      const groupedLikes = {};
      for (const like of (likes || [])) {
        groupedLikes[like.post_id] = groupedLikes[like.post_id] || [];
        groupedLikes[like.post_id].push(like);
      }

      // Group comments by post_id
      const groupedComments = {};
      for (const comment of enrichedComments) {
        groupedComments[comment.post_id] = groupedComments[comment.post_id] || [];
        groupedComments[comment.post_id].push(comment);
      }

      // Enrich posts with author, images, likes and comments
      const enriched = postsArray.map((post) => {
        const postImages = groupedImages[post.id] || [];
        const postLikes = groupedLikes[post.id] || [];
        const postComments = groupedComments[post.id] || [];
        const isLikedByUser = currentUser?.id 
          ? postLikes.some(l => l.user_id === currentUser.id) 
          : false;

        return {
          ...post,
          users: authorsMap[post.author_id] || null,
          _images: postImages,
          _likes: postLikes,
          _likesCount: postLikes.length,
          _isLiked: isLikedByUser,
          _comments: postComments,
          _commentsCount: postComments.length,
        };
      });

      setPosts(enriched);
    } catch (err) {
      console.error("Fetch posts error:", err);
      setPosts([]);
    }
  };

  useEffect(() => {
    if (!societyId) return;
    setLoading(true);

    const fetchAll = async () => {
      try {
        // Fetch society info
        const { data: s, error: sErr } = await supabase
          .from("societies")
          .select("id, name, description, profile_image, banner_image, created_by, created_at")
          .eq("id", societyId)
          .single();
        
        if (sErr) {
          console.error("Society fetch error:", sErr);
          throw sErr;
        }
        setSociety(s);

        // Fetch admins
        const { data: sa } = await supabase
          .from("society_admins")
          .select("user_id")
          .eq("society_id", societyId);

        const adminIds = (sa || []).map((r) => r.user_id);

        if (adminIds.length) {
          const { data: adminUsers } = await supabase
            .from("users")
            .select("id, name, profile_image")
            .in("id", adminIds);
          setAdmins(adminUsers || []);
        } else {
          setAdmins([]);
        }

        // Fetch followers count
        const { count } = await supabase
          .from("society_followers")
          .select("*", { count: "exact", head: true })
          .eq("society_id", societyId);
        setFollowersCount(count || 0);

        // Check if current user follows
        if (currentUser?.id) {
          const { data: f } = await supabase
            .from("society_followers")
            .select("id")
            .eq("society_id", societyId)
            .eq("user_id", currentUser.id)
            .maybeSingle();
          setIsFollower(!!f);
        }

        // Check if current user is admin
        setIsAdmin(currentUser?.id ? adminIds.includes(currentUser.id) : false);

        // Fetch posts
        await fetchPosts();
      } catch (err) {
        console.error("Fetch society error:", err);
        setSociety(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [societyId, currentUser?.id]);

  const toggleFollow = async () => {
    if (!currentUser?.id) return router.push("/signup");
    try {
      if (isFollower) {
        await supabase
          .from("society_followers")
          .delete()
          .eq("society_id", societyId)
          .eq("user_id", currentUser.id);
        setIsFollower(false);
        setFollowersCount((c) => Math.max(0, c - 1));
      } else {
        await supabase
          .from("society_followers")
          .insert([{ society_id: societyId, user_id: currentUser.id }]);
        setIsFollower(true);
        setFollowersCount((c) => c + 1);
      }
    } catch (err) {
      console.error(err);
      alert("Follow action failed.");
    }
  };

  const onPosted = async () => {
    // Refresh posts after new post is created
    await fetchPosts();
  };

  const handleLikeUpdate = async (postId) => {
    // Refresh posts after like update
    await fetchPosts();
  };

  const handleCommentAdded = async (postId) => {
    // Refresh posts after comment is added
    await fetchPosts();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <Loader2 className="animate-spin text-white" size={40} />
      </div>
    );
  }

  if (!society) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Society not found</h2>
          <button 
            onClick={() => router.push("/")} 
            className="text-blue-400 hover:underline"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      {/* Banner */}
      <div className="w-full bg-black">
        <div className="relative mx-auto max-w-6xl" style={{ minHeight: 220 }}>
          <img 
            src={society.banner_image || "https://via.placeholder.com/1200x250?text=Society+Banner"} 
            alt="banner" 
            className="w-full h-52 object-cover rounded-b-xl" 
          />
          <div className="absolute left-6 -bottom-12 flex items-end gap-4">
            <img 
              src={society.profile_image || "https://via.placeholder.com/150"} 
              alt="profile" 
              className="w-28 h-28 rounded-full border-4 border-gray-900 object-cover" 
            />
            <div className="ml-2 mt-6">
              <h1 className="text-2xl font-bold">{society.name}</h1>
              <p className="text-sm text-gray-300">{society.description?.slice(0, 140)}</p>
            </div>
          </div>

          <div className="absolute right-6 top-6 flex items-center gap-4">
            <div className="text-right mr-4">
              <div className="text-sm text-gray-300">Followers</div>
              <div className="font-semibold">{followersCount}</div>
            </div>
            <button 
              onClick={toggleFollow} 
              className={`px-4 py-2 rounded-full transition-colors ${
                isFollower 
                  ? "bg-gray-700 hover:bg-gray-600" 
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isFollower ? "Following" : "Follow"}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 mt-20 pb-20">
        <aside className="col-span-1">
          <div className="rounded-xl p-4 bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-lg">About</h3>
            <p className="text-sm text-gray-300 mt-2">{society.description}</p>
          </div>

          <div className="mt-4 rounded-xl p-4 bg-gray-800 border border-gray-700">
            <h4 className="font-semibold">Admins</h4>
            <div className="mt-3 space-y-3">
              {admins.length === 0 ? (
                <div className="text-sm text-gray-400">No admins</div>
              ) : (
                admins.map(a => (
                  <div key={a.id} className="flex items-center gap-3">
                    <img 
                      src={a.profile_image || "https://via.placeholder.com/40"} 
                      alt={a.name} 
                      className="w-10 h-10 rounded-full object-cover" 
                    />
                    <div>
                      <div className="font-medium text-sm">{a.name}</div>
                      <div className="text-xs text-gray-400">Admin</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {isAdmin && (
            <div className="mt-4">
              <button 
                onClick={() => setModalOpen(true)} 
                className="w-full bg-yellow-400 text-black py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
              >
                Create Post
              </button>
            </div>
          )}
        </aside>

        <main className="col-span-1 lg:col-span-2 space-y-4">
          {posts.length === 0 ? (
            <div className="p-8 rounded-xl bg-gray-800 border border-gray-700 text-center">
              <p className="text-gray-400">No posts yet.</p>
              {isAdmin && (
                <button
                  onClick={() => setModalOpen(true)}
                  className="mt-3 text-blue-400 hover:underline"
                >
                  Create the first post
                </button>
              )}
            </div>
          ) : (
            posts.map(p => (
              <PostCard 
                key={p.id} 
                post={p} 
                currentUser={currentUser} 
                onLikeUpdate={() => handleLikeUpdate(p.id)}
                onCommentAdded={() => handleCommentAdded(p.id)}
              />
            ))
          )}
        </main>
      </div>

      <CreatePostModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        societyId={societyId} 
        onPosted={onPosted} 
      />
      <BottomNavbar />
    </div>
  );
}