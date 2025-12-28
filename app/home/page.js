

















// "use client";

// import { useEffect, useState } from "react";
// import Navbar from "@/components/Navbar";
// import BottomNavbar from "@/components/BottomNavbar";
// import QueBox from "@/components/QueBox";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// // TEMP: fixed user until auth finishes (for comments likes if needed later)
// const DEFAULT_USER_ID = "25e8f399-a8d1-464b-a5dd-314b6d0a78ab";

// const timeAgo = (iso) => {
//   const d = new Date(iso);
//   const diff = (Date.now() - d.getTime()) / 1000;
//   const h = Math.floor(diff / 3600);
//   const m = Math.floor((diff % 3600) / 60);
//   if (h > 0) return `${h} hour${h > 1 ? "s" : ""} ago`;
//   if (m > 0) return `${m} minute${m > 1 ? "s" : ""} ago`;
//   return "just now";
// };
// const absoluteDate = (iso) =>
//   new Date(iso).toLocaleString(undefined, {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   const { data, error } = await supabase.auth.getUser();
// console.log("AUTH USER:", data?.user);


// export default function HomePage() {
//   const router = useRouter();
//   const [questions, setQuestions] = useState([]);
//   const [societies, setSocieties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Modal state
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedQuestion, setSelectedQuestion] = useState(null);
//   const [modalAnswers, setModalAnswers] = useState([]);
//   const [modalLoading, setModalLoading] = useState(false);

//   // 🟣 Fetch Questions
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       setLoading(true);
//       const { data, error } = await supabase
//         .from("questions")
//         .select(`
//           id, title, question, category, image, created_at,
//           users:author_id ( name, profile_image )
//         `)
//         .order("created_at", { ascending: false });

//       if (error) {
//         console.error("Questions fetch error:", error.message);
//         setQuestions([]);
//       } else {
//         setQuestions(data || []);
//       }
//       setLoading(false);
//     };

//     fetchQuestions();
//   }, []);

//   // 🟡 Fetch Societies
//   useEffect(() => {
//     const fetchSocieties = async () => {
//       const { data, error } = await supabase
//         .from("societies")
//         .select("id, name, description, created_at")
//         .order("created_at", { ascending: false });

//       if (error) {
//         console.error("Society fetch error:", error.message);
//         setSocieties([]);
//       } else {
//         setSocieties(data || []);
//       }
//     };
//     fetchSocieties();
//   }, []);

//   // 🟠 Modal Handling (Answers + Comments)
//   const openModal = async (q) => {
//     setSelectedQuestion(q);
//     setIsModalOpen(true);
//     setModalLoading(true);
//     setModalAnswers([]);

//     const { data: answers, error } = await supabase
//       .from("answers")
//       .select("id, content, created_at, author_id")
//       .eq("question_id", q.id);

//     if (error) {
//       console.error("Answers fetch error:", error.message);
//       setModalAnswers([]);
//       setModalLoading(false);
//       return;
//     }

//     const enriched = await Promise.all(
//       answers.map(async (a) => {
//         const { count } = await supabase
//           .from("answer_likes")
//           .select("*", { count: "exact", head: true })
//           .eq("answer_id", a.id);

//         let author = null;
//         if (a.author_id) {
//           const { data: u } = await supabase
//             .from("users")
//             .select("id, name, profile_image")
//             .eq("id", a.author_id)
//             .single();
//           author = u || null;
//         }

//         return {
//           ...a,
//           like_count: count || 0,
//           author,
//         };
//       })
//     );

//     enriched.sort((a, b) => {
//       if (b.like_count !== a.like_count) return b.like_count - a.like_count;
//       return new Date(b.created_at) - new Date(a.created_at);
//     });

//     setModalAnswers(enriched);
//     setModalLoading(false);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedQuestion(null);
//     setModalAnswers([]);
//   };

//   // 🟢 Like Answer
//   const likeAnswer = async (answerId) => {
//     await supabase.from("answer_likes").insert([{ answer_id: answerId }]);
//     setModalAnswers((prev) =>
//       prev.map((a) =>
//         a.id === answerId ? { ...a, like_count: (a.like_count || 0) + 1 } : a
//       )
//     );
//   };

//   // 🟤 Comments System
//   const [openComments, setOpenComments] = useState({});
//   const [comments, setComments] = useState({});
//   const [commentInputs, setCommentInputs] = useState({});

//   const toggleComments = async (answerId) => {
//     setOpenComments((prev) => ({ ...prev, [answerId]: !prev[answerId] }));
//     const opening = !openComments[answerId];
//     if (opening && !comments[answerId]) {
//       const { data: rows, error } = await supabase
//         .from("comments")
//         .select("id, content, created_at, user_id")
//         .eq("answer_id", answerId)
//         .order("created_at", { ascending: true });

//       if (!error) {
//         const enriched = await Promise.all(
//           (rows || []).map(async (c) => {
//             let author = null;
//             if (c.user_id) {
//               const { data: u } = await supabase
//                 .from("users")
//                 .select("id, name, profile_image")
//                 .eq("id", c.user_id)
//                 .single();
//               author = u || null;
//             }
//             return { ...c, author };
//           })
//         );
//         setComments((prev) => ({ ...prev, [answerId]: enriched }));
//       }
//     }
//   };

//   const addComment = async (answerId) => {
//     const text = (commentInputs[answerId] || "").trim();
//     if (!text) return;
//     const { data, error } = await supabase
//       .from("comments")
//       .insert([
//         {
//           answer_id: answerId,
//           content: text,
//           user_id: DEFAULT_USER_ID,
//         },
//       ])
//       .select("id, content, created_at, user_id")
//       .single();

//     if (error) {
//       alert("Failed to add comment: " + error.message);
//       return;
//     }

//     let author = null;
//     if (data.user_id) {
//       const { data: u } = await supabase
//         .from("users")
//         .select("id, name, profile_image")
//         .eq("id", data.user_id)
//         .single();
//       author = u || null;
//     }

//     setComments((prev) => ({
//       ...prev,
//       [answerId]: [...(prev[answerId] || []), { ...data, author }],
//     }));
//     setCommentInputs((prev) => ({ ...prev, [answerId]: "" }));
//   };

//   const getEmoji = (name) => {
//     const n = name.toLowerCase();
//     if (n.includes("tech") || n.includes("coding")) return "💻";
//     if (n.includes("cultural") || n.includes("music") || n.includes("dance")) return "🎭";
//     if (n.includes("literary") || n.includes("debate") || n.includes("writing")) return "📚";
//     if (n.includes("drama") || n.includes("film")) return "🎬";
//     if (n.includes("photo")) return "📷";
//     if (n.includes("robot")) return "🤖";
//     if (n.includes("entrepreneur")) return "🚀";
//     if (n.includes("environment")) return "🌿";
//     if (n.includes("math")) return "➗";
//     if (n.includes("astro")) return "🌌";
//     if (n.includes("ml") || n.includes("ai")) return "🧠";
//     if (n.includes("fin")) return "💹";
//     return "🏫";
//   };




//   return (
//     <div
//       className="min-h-screen text-white"
//       style={{ background: "linear-gradient(to bottom, #4C1D95, #000000 60%)" }}
//     >
//       <Navbar />

//       <div className="w-screen mx-auto flex gap-6 mt-6 px-4 pb-20">
//         {/* 🟣 LEFT SIDEBAR — Societies */}
//         <aside className="hidden lg:block w-1/4">
//           <div className="sticky top-20 space-y-4">
//             <button
//               onClick={() => router.push("/society/create")}
//               className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg transition"
//             >
//               + Create Society
//             </button>

//             <div
//               className="rounded-xl p-4 shadow-lg border"
//               style={{
//                 background: "rgba(255,255,255,0.05)",
//                 borderColor: "rgba(255,255,255,0.1)",
//               }}
//             >
//               <h2 className="text-lg font-semibold mb-3">College Societies</h2>
//               <div className="space-y-3 max-h-[70vh] overflow-hidden hover:overflow-y-auto pr-1">
//                 {societies.length === 0 ? (
//                   <p className="text-sm text-white/60">No societies yet.</p>
//                 ) : (
//                   societies.map((s) => (
//                     <div
//                       key={s.id}
//                       className="flex items-center justify-between pb-2 border-b last:border-b-0"
//                       style={{ borderColor: "rgba(255,255,255,0.1)" }}
//                     >
//                       <div className="flex items-center gap-3">
//                         <div
//                           className="w-10 h-10 rounded-full flex items-center justify-center text-lg border"
//                           style={{
//                             background: "rgba(255,255,255,0.1)",
//                             borderColor: "rgba(255,255,255,0.2)",
//                           }}
//                         >
//                           <span>{getEmoji(s.name)}</span>
//                         </div>
//                         <div>
//                           <h3 className="text-sm font-semibold text-white/90">
//                             {s.name}
//                           </h3>
//                           <p className="text-xs text-white/60 line-clamp-1">
//                             {s.description}
//                           </p>
//                         </div>
//                       </div>
//                       <button
//                         onClick={() => router.push(`/society/${s.id}`)}
//                         className="px-3 py-1 text-xs rounded-full border"
//                         style={{
//                           background: "rgba(255,255,255,0.1)",
//                           borderColor: "rgba(255,255,255,0.15)",
//                           color: "rgba(255,255,255,0.85)",
//                         }}
//                       >
//                         Visit
//                       </button>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>
//         </aside>

//         {/* 🟡 MAIN FEED — Questions */}
//         <main className="flex-1 mx-auto">
//           <div
//             className="rounded-xl shadow-lg border p-4 md:p-5"
//             style={{
//               background: "rgba(255,255,255,0.05)",
//               borderColor: "rgba(255,255,255,0.1)",
//             }}
//           >
//             <h2 className="text-xl font-semibold mb-4 text-[#FDE68A]">
//               Latest Questions
//             </h2>

//             {loading ? (
//               <p className="text-white/70 text-center py-10">
//                 Loading questions…
//               </p>
//             ) : questions.length === 0 ? (
//               <p className="text-white/70 text-center py-10">
//                 No questions posted yet.
//               </p>
//             ) : (
//               <div className="space-y-4">
//                 {questions.map((q) => (
//                   <QueBox
//                     key={q.id}
//                     id={q.id}
//                     category={q.category}
//                     que={q.question}
//                     title={q.title}
//                     image={q.image}
//                     user={q.users}
//                     onOpenModal={openModal}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </main>

//         {/* 🟠 RIGHT SIDEBAR */}
//         <aside className="hidden lg:block w-1/4">
//           <div className="sticky top-20">
//             <div
//               className="rounded-xl p-4 shadow-lg border"
//               style={{
//                 background: "rgba(255,255,255,0.05)",
//                 borderColor: "rgba(255,255,255,0.1)",
//               }}
//             >
//               <h2 className="text-lg font-semibold">Right Sidebar</h2>
//               <p className="text-sm text-white/70">
//                 Add trending topics, upcoming events, or ads here.
//               </p>
//             </div>
//           </div>
//         </aside>
//       </div>

//       {/* 🔵 ANSWER MODAL (same as before) */}
//       {isModalOpen && (
//         <div
//           onClick={(e) => e.target === e.currentTarget && closeModal()}
//           className="fixed inset-0 z-50 flex items-center justify-center"
//           style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
//         >
//           <div
//             className="w-full max-w-xl rounded-xl border shadow-lg p-6 mx-4"
//             style={{
//               background: "rgba(17,24,39,0.95)",
//               borderColor: "rgba(255,255,255,0.12)",
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={closeModal}
//               className="text-white/70 hover:text-white mb-4 float-right"
//               aria-label="Close"
//             >
//               ✕
//             </button>

//             <h2 className="text-xl font-bold text-[#FDE68A] mb-2">
//               {selectedQuestion?.title}
//             </h2>
//             <p className="text-white/90 mb-2">{selectedQuestion?.que}</p>
//             <p className="text-white/70 text-sm mb-4">
//               {selectedQuestion?.category}
//             </p>

//             {modalLoading ? (
//               <p className="text-white/70">Loading answers…</p>
//             ) : modalAnswers.length === 0 ? (
//               <p className="text-white/75 italic">No answers yet.</p>
//             ) : (
//               <div className="space-y-4">
//                 {modalAnswers.map((a) => (
//                   <div
//                     key={a.id}
//                     className="rounded-lg p-4 border"
//                     style={{
//                       background: "rgba(255,255,255,0.06)",
//                       borderColor: "rgba(255,255,255,0.12)",
//                     }}
//                   >
//                     <div className="flex items-center gap-3">
//                       {a.author?.profile_image ? (
//                         <img
//                           src={a.author.profile_image}
//                           alt={a.author?.name || "User"}
//                           className="w-9 h-9 rounded-full border border-white/20 object-cover"
//                         />
//                       ) : (
//                         <div className="w-9 h-9 rounded-full border flex items-center justify-center text-sm font-bold bg-white/10 border-white/20">
//                           {(a.author?.name?.[0] || "?").toUpperCase()}
//                         </div>
//                       )}

//                       <div className="flex-1">
//                         <div className="text-sm font-medium text-white/90">
//                           {a.author?.name || "Unknown User"}
//                         </div>
//                         <div className="text-white/60 text-xs">
//                           {timeAgo(a.created_at)} • {absoluteDate(a.created_at)}
//                         </div>
//                       </div>

//                       <button
//                         onClick={() => likeAnswer(a.id)}
//                         className="text-sm px-3 py-1 rounded-md border bg-white/10 hover:bg-white/20"
//                       >
//                         👍 {a.like_count || 0}
//                       </button>
//                     </div>

//                     <p className="mt-3 text-white/90">{a.content}</p>

//                     {/* Comments */}
//                     <div className="mt-3">
//                       <button
//                         onClick={() => toggleComments(a.id)}
//                         className="text-xs px-2 py-1 rounded-md border bg-white/10 hover:bg-white/20"
//                       >
//                         {openComments[a.id] ? "Hide Comments" : "View Comments"}
//                       </button>
//                     </div>

//                     {openComments[a.id] && (
//                       <div className="mt-3 space-y-3">
//                         {(comments[a.id] || []).map((c) => (
//                           <div
//                             key={c.id}
//                             className="rounded-md p-3 border bg-white/5 border-white/10"
//                           >
//                             <div className="flex items-center gap-2 mb-1">
//                               <div className="w-7 h-7 rounded-full border flex items-center justify-center text-xs bg-white/10 border-white/20">
//                                 {(c.author?.name?.[0] || "?").toUpperCase()}
//                               </div>
//                               <div className="text-xs">
//                                 <div className="font-medium text-white/90">
//                                   {c.author?.name || "Unknown"}
//                                 </div>
//                                 <div className="text-white/60">
//                                   {timeAgo(c.created_at)}
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="text-sm text-white/90">
//                               {c.content}
//                             </div>
//                           </div>
//                         ))}

//                         <div className="flex gap-2">
//                           <input
//                             value={commentInputs[a.id] || ""}
//                             onChange={(e) =>
//                               setCommentInputs((prev) => ({
//                                 ...prev,
//                                 [a.id]: e.target.value,
//                               }))
//                             }
//                             placeholder="Write a comment…"
//                             className="flex-1 rounded-md px-3 py-2 outline-none bg-white/5 border border-white/20 text-white"
//                           />
//                           <button
//                             onClick={() => addComment(a.id)}
//                             className="px-3 py-2 rounded-md font-medium bg-yellow-400 text-black"
//                           >
//                             Add
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       <BottomNavbar />
//     </div>
//   );
// }










// "use client";

// import { useEffect, useState } from "react";
// import Navbar from "@/components/Navbar";
// import BottomNavbar from "@/components/BottomNavbar";
// import QueBox from "@/components/QueBox";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// const timeAgo = (iso) => {
//   const d = new Date(iso);
//   const diff = (Date.now() - d.getTime()) / 1000;
//   const h = Math.floor(diff / 3600);
//   const m = Math.floor((diff % 3600) / 60);
//   if (h > 0) return `${h} hour${h > 1 ? "s" : ""} ago`;
//   if (m > 0) return `${m} minute${m > 1 ? "s" : ""} ago`;
//   return "just now";
// };

// const absoluteDate = (iso) =>
//   new Date(iso).toLocaleString(undefined, {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   const getEmoji = (name = "") => {
//   const n = name.toLowerCase();
//   if (n.includes("tech") || n.includes("coding")) return "💻";
//   if (n.includes("cultural") || n.includes("music") || n.includes("dance")) return "🎭";
//   if (n.includes("literary") || n.includes("debate") || n.includes("writing")) return "📚";
//   if (n.includes("drama") || n.includes("film")) return "🎬";
//   if (n.includes("photo")) return "📷";
//   if (n.includes("robot")) return "🤖";
//   if (n.includes("entrepreneur")) return "🚀";
//   if (n.includes("environment")) return "🌿";
//   if (n.includes("math")) return "➗";
//   if (n.includes("astro")) return "🌌";
//   if (n.includes("ml") || n.includes("ai")) return "🧠";
//   if (n.includes("fin")) return "💹";
//   return "🏫";
// };


// export default function HomePage() {
//   const router = useRouter();
//   const [questions, setQuestions] = useState([]);
//   const [societies, setSocieties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedQuestion, setSelectedQuestion] = useState(null);
//   const [modalAnswers, setModalAnswers] = useState([]);
//   const [modalLoading, setModalLoading] = useState(false);

//   const [openComments, setOpenComments] = useState({});
//   const [comments, setComments] = useState({});
//   const [commentInputs, setCommentInputs] = useState({});
//   const [answerText, setAnswerText] = useState("");


//   // 🔐 helper
//   const getUserOrAlert = async () => {
//     const { data } = await supabase.auth.getUser();
//     if (!data?.user) {
//       alert("Please login first");
//       return null;
//     }
//     return data.user;
//   };

//   // 🟣 Fetch Questions
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       setLoading(true);
//       const { data } = await supabase
//         .from("questions")
//         .select(`
//           id, title, question, category, image, created_at,
//           users:author_id ( name, profile_image )
//         `)
//         .order("created_at", { ascending: false });

//       setQuestions(data || []);
//       setLoading(false);
//     };

//     fetchQuestions();
//   }, []);

//   // 🟡 Fetch Societies
//   useEffect(() => {
//     const fetchSocieties = async () => {
//       const { data } = await supabase
//         .from("societies")
//         .select("id, name, description, created_at")
//         .order("created_at", { ascending: false });

//       setSocieties(data || []);
//     };
//     fetchSocieties();
//   }, []);

//   // 🟠 Modal
//   const openModal = async (q) => {
//     setSelectedQuestion(q);
//     setIsModalOpen(true);
//     setModalLoading(true);

//     const { data, error } = await supabase
//       .from("answers")
//       .select("id, content, created_at, author_id")
//       .eq("question_id", q.id);

//     if (error) {
//       console.warn("Answers blocked by RLS");
//       setModalAnswers([]);
//     } else {
//       setModalAnswers(data || []);
//     }

//     setModalLoading(false);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedQuestion(null);
//     setModalAnswers([]);
//   };
    



// ///post ans 

// //   const postAnswer = async () => {
// //   const {
// //     data: { user },
// //     error,
// //   } = await supabase.auth.getUser();

// //   if (error || !user) {
// //     alert("Login required");
// //     return;
// //   }

// //   if (!selectedQuestion?.id) {
// //     alert("Invalid question");
// //     return;
// //   }

// //   const { error: insertError } = await supabase
// //     .from("answers")
// //     .insert({
// //       question_id: selectedQuestion.id,
// //       author_id: user.id,
// //       content: answerText,
// //     });

// //   if (insertError) {
// //     console.error(insertError);
// //     alert(insertError.message);
// //     return;
// //   }

// //   alert("Answer posted successfully");
// // };



// // const postAnswer = async () => {
// //   const {
// //     data: { user },
// //     error,
// //   } = await supabase.auth.getUser();

// //   if (error || !user) {
// //     alert("Login required");
// //     return;
// //   }

// //   if (!selectedQuestion?.id) {
// //     alert("Invalid question");
// //     return;
// //   }

// //   if (!answerText.trim()) {
// //     alert("Answer cannot be empty");
// //     return;
// //   }

// //   const { error: insertError } = await supabase
// //     .from("answers")
// //     .insert({
// //       question_id: selectedQuestion.id,
// //       author_id: user.id,
// //       content: answerText.trim(),
// //     });

// //   if (insertError) {
// //     console.error(insertError);
// //     alert(insertError.message);
// //     return;
// //   }

// //   setAnswerText("");
// //   alert("Answer posted successfully");
// // };




// const postAnswer = async () => {
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     alert("Login required");
//     return;
//   }

//   // 🔒 check mentor
//   const { data: profile } = await supabase
//     .from("users")
//     .select("is_mentor")
//     .eq("id", user.id)
//     .single();

//   if (!profile?.is_mentor) {
//     alert("Only mentors can answer questions");
//     return;
//   }

//   const { error } = await supabase.from("answers").insert({
//     question_id: selectedQuestion.id,
//     author_id: user.id,
//     content: answerText,
//   });

//   if (error) {
//     alert(error.message);
//     return;
//   }

//   alert("Answer posted successfully");
// };









//   // 👍 Like
//   const likeAnswer = async (answerId) => {
//     const user = await getUserOrAlert();
//     if (!user) return;

//     const { error } = await supabase
//       .from("answer_likes")
//       .insert({ answer_id: answerId });

//     if (error) {
//       alert("Likes blocked by security policy");
//     }
//   };

//   // 💬 Toggle comments
//   const toggleComments = async (answerId) => {
//     setOpenComments((p) => ({ ...p, [answerId]: !p[answerId] }));

//     if (!comments[answerId]) {
//       const { data, error } = await supabase
//         .from("comments")
//         .select("id, content, created_at, user_id")
//         .eq("answer_id", answerId);

//       if (!error) {
//         setComments((p) => ({ ...p, [answerId]: data || [] }));
//       }
//     }
//   };

//   // ➕ Add Comment
//   const addComment = async (answerId) => {
//     const text = commentInputs[answerId]?.trim();
//     if (!text) return;

//     const user = await getUserOrAlert();
//     if (!user) return;

//     const { error } = await supabase.from("comments").insert({
//       answer_id: answerId,
//       content: text,
//       user_id: user.id,
//     });

//     if (error) {
//       alert("Comment blocked by security policy");
//       return;
//     }

//     setCommentInputs((p) => ({ ...p, [answerId]: "" }));
//   };


  


//   return (
//     <div
//       className="min-h-screen text-white"
//       style={{ background: "linear-gradient(to bottom, #4C1D95, #000000 60%)" }}
//     >
//       <Navbar />

//       <div className="w-screen mx-auto flex gap-6 mt-6 px-4 pb-20">
//         {/* 🟣 LEFT SIDEBAR — Societies */}
//         <aside className="hidden lg:block w-1/4">
//           <div className="sticky top-20 space-y-4">
//             <button
//               onClick={() => router.push("/society/create")}
//               className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg transition"
//             >
//               + Create Society
//             </button>

//             <div
//               className="rounded-xl p-4 shadow-lg border"
//               style={{
//                 background: "rgba(255,255,255,0.05)",
//                 borderColor: "rgba(255,255,255,0.1)",
//               }}
//             >
//               <h2 className="text-lg font-semibold mb-3">College Societies</h2>
//               <div className="space-y-3 max-h-[70vh] overflow-hidden hover:overflow-y-auto pr-1">
//                 {societies.length === 0 ? (
//                   <p className="text-sm text-white/60">No societies yet.</p>
//                 ) : (
//                   societies.map((s) => (
//                     <div
//                       key={s.id}
//                       className="flex items-center justify-between pb-2 border-b last:border-b-0"
//                       style={{ borderColor: "rgba(255,255,255,0.1)" }}
//                     >
//                       <div className="flex items-center gap-3">
//                         <div
//                           className="w-10 h-10 rounded-full flex items-center justify-center text-lg border"
//                           style={{
//                             background: "rgba(255,255,255,0.1)",
//                             borderColor: "rgba(255,255,255,0.2)",
//                           }}
//                         >
//                           <span>{getEmoji(s.name)}</span>
//                         </div>
//                         <div>
//                           <h3 className="text-sm font-semibold text-white/90">
//                             {s.name}
//                           </h3>
//                           <p className="text-xs text-white/60 line-clamp-1">
//                             {s.description}
//                           </p>
//                         </div>
//                       </div>
//                       <button
//                         onClick={() => router.push(`/society/${s.id}`)}
//                         className="px-3 py-1 text-xs rounded-full border"
//                         style={{
//                           background: "rgba(255,255,255,0.1)",
//                           borderColor: "rgba(255,255,255,0.15)",
//                           color: "rgba(255,255,255,0.85)",
//                         }}
//                       >
//                         Visit
//                       </button>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>
//         </aside>

//         {/* 🟡 MAIN FEED — Questions */}
//         <main className="flex-1 mx-auto">
//           <div
//             className="rounded-xl shadow-lg border p-4 md:p-5"
//             style={{
//               background: "rgba(255,255,255,0.05)",
//               borderColor: "rgba(255,255,255,0.1)",
//             }}
//           >
//             <h2 className="text-xl font-semibold mb-4 text-[#FDE68A]">
//               Latest Questions
//             </h2>

//             {loading ? (
//               <p className="text-white/70 text-center py-10">
//                 Loading questions…
//               </p>
//             ) : questions.length === 0 ? (
//               <p className="text-white/70 text-center py-10">
//                 No questions posted yet.
//               </p>
//             ) : (
//               <div className="space-y-4">
//                 {questions.map((q) => (
//                   <QueBox
//                     key={q.id}
//                     id={q.id}
//                     category={q.category}
//                     que={q.question}
//                     title={q.title}
//                     image={q.image}
//                     user={q.users}
//                     onOpenModal={openModal}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </main>

//         {/* 🟠 RIGHT SIDEBAR */}
//         <aside className="hidden lg:block w-1/4">
//           <div className="sticky top-20">
//             <div
//               className="rounded-xl p-4 shadow-lg border"
//               style={{
//                 background: "rgba(255,255,255,0.05)",
//                 borderColor: "rgba(255,255,255,0.1)",
//               }}
//             >
//               <h2 className="text-lg font-semibold">Right Sidebar</h2>
//               <p className="text-sm text-white/70">
//                 Add trending topics, upcoming events, or ads here.
//               </p>
//             </div>
//           </div>
//         </aside>
//       </div>

//       {/* 🔵 ANSWER MODAL (same as before) */}
//       {isModalOpen && (
//         <div
//           onClick={(e) => e.target === e.currentTarget && closeModal()}
//           className="fixed inset-0 z-50 flex items-center justify-center"
//           style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
//         >
//           <div
//             className="w-full max-w-xl rounded-xl border shadow-lg p-6 mx-4"
//             style={{
//               background: "rgba(17,24,39,0.95)",
//               borderColor: "rgba(255,255,255,0.12)",
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={closeModal}
//               className="text-white/70 hover:text-white mb-4 float-right"
//               aria-label="Close"
//             >
//               ✕
//             </button>

//             <h2 className="text-xl font-bold text-[#FDE68A] mb-2">
//               {selectedQuestion?.title}
//             </h2>
//             <p className="text-white/90 mb-2">{selectedQuestion?.que}</p>
//             <p className="text-white/70 text-sm mb-4">
//               {selectedQuestion?.category}
//             </p>

//             {modalLoading ? (
//               <p className="text-white/70">Loading answers…</p>
//             ) : modalAnswers.length === 0 ? (
//               <p className="text-white/75 italic">No answers yet.</p>
//             ) : (
//               <div className="space-y-4">
//                 {modalAnswers.map((a) => (
//                   <div
//                     key={a.id}
//                     className="rounded-lg p-4 border"
//                     style={{
//                       background: "rgba(255,255,255,0.06)",
//                       borderColor: "rgba(255,255,255,0.12)",
//                     }}
//                   >
//                     <div className="flex items-center gap-3">
//                       {a.author?.profile_image ? (
//                         <img
//                           src={a.author.profile_image}
//                           alt={a.author?.name || "User"}
//                           className="w-9 h-9 rounded-full border border-white/20 object-cover"
//                         />
//                       ) : (
//                         <div className="w-9 h-9 rounded-full border flex items-center justify-center text-sm font-bold bg-white/10 border-white/20">
//                           {(a.author?.name?.[0] || "?").toUpperCase()}
//                         </div>
//                       )}

//                       <div className="flex-1">
//                         <div className="text-sm font-medium text-white/90">
//                           {a.author?.name || "Unknown User"}
//                         </div>
//                         <div className="text-white/60 text-xs">
//                           {timeAgo(a.created_at)} • {absoluteDate(a.created_at)}
//                         </div>
//                       </div>

//                       <button
//                         onClick={() => likeAnswer(a.id)}
//                         className="text-sm px-3 py-1 rounded-md border bg-white/10 hover:bg-white/20"
//                       >
//                         👍 {a.like_count || 0}
//                       </button>
//                     </div>

//                     <p className="mt-3 text-white/90">{a.content}</p>

//                     {/* Comments */}
//                     <div className="mt-3">
//                       <button
//                         onClick={() => toggleComments(a.id)}
//                         className="text-xs px-2 py-1 rounded-md border bg-white/10 hover:bg-white/20"
//                       >
//                         {openComments[a.id] ? "Hide Comments" : "View Comments"}
//                       </button>
//                     </div>

//                     {openComments[a.id] && (
//                       <div className="mt-3 space-y-3">
//                         {(comments[a.id] || []).map((c) => (
//                           <div
//                             key={c.id}
//                             className="rounded-md p-3 border bg-white/5 border-white/10"
//                           >
//                             <div className="flex items-center gap-2 mb-1">
//                               <div className="w-7 h-7 rounded-full border flex items-center justify-center text-xs bg-white/10 border-white/20">
//                                 {(c.author?.name?.[0] || "?").toUpperCase()}
//                               </div>
//                               <div className="text-xs">
//                                 <div className="font-medium text-white/90">
//                                   {c.author?.name || "Unknown"}
//                                 </div>
//                                 <div className="text-white/60">
//                                   {timeAgo(c.created_at)}
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="text-sm text-white/90">
//                               {c.content}
//                             </div>
//                           </div>
//                         ))}

//                         <div className="flex gap-2">
//                           <input
//                             value={commentInputs[a.id] || ""}
//                             onChange={(e) =>
//                               setCommentInputs((prev) => ({
//                                 ...prev,
//                                 [a.id]: e.target.value,
//                               }))
//                             }
//                             placeholder="Write a comment…"
//                             className="flex-1 rounded-md px-3 py-2 outline-none bg-white/5 border border-white/20 text-white"
//                           />
//                           <button
//                             onClick={() => addComment(a.id)}
//                             className="px-3 py-2 rounded-md font-medium bg-yellow-400 text-black"
//                           >
//                             Add
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       <BottomNavbar />
//     </div>
//   );

// }






















// "use client";

// import { useEffect, useState, useContext } from "react";
// import Navbar from "@/components/Navbar";
// import BottomNavbar from "@/components/BottomNavbar";
// import QueBox from "@/components/QueBox";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";
// import { AuthContext } from "@/lib/AuthProvider";

// const timeAgo = (iso) => {
//   const d = new Date(iso);
//   const diff = (Date.now() - d.getTime()) / 1000;
//   const h = Math.floor(diff / 3600);
//   const m = Math.floor((diff % 3600) / 60);
//   if (h > 0) return `${h} hour${h > 1 ? "s" : ""} ago`;
//   if (m > 0) return `${m} minute${m > 1 ? "s" : ""} ago`;
//   return "just now";
// };

// const absoluteDate = (iso) =>
//   new Date(iso).toLocaleString(undefined, {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });

// const getEmoji = (name = "") => {
//   const n = name.toLowerCase();
//   if (n.includes("tech") || n.includes("coding")) return "💻";
//   if (n.includes("cultural") || n.includes("music") || n.includes("dance")) return "🎭";
//   if (n.includes("literary") || n.includes("debate") || n.includes("writing")) return "📚";
//   if (n.includes("drama") || n.includes("film")) return "🎬";
//   if (n.includes("photo")) return "📷";
//   if (n.includes("robot")) return "🤖";
//   if (n.includes("entrepreneur")) return "🚀";
//   if (n.includes("environment")) return "🌿";
//   if (n.includes("math")) return "➗";
//   if (n.includes("astro")) return "🌌";
//   if (n.includes("ml") || n.includes("ai")) return "🧠";
//   if (n.includes("fin")) return "💹";
//   return "🏫";
// };

// export default function HomePage() {
//   const router = useRouter();
//   const { currentUser, loading: authLoading } = useContext(AuthContext);
  
//   const [questions, setQuestions] = useState([]);
//   const [societies, setSocieties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedQuestion, setSelectedQuestion] = useState(null);
//   const [modalAnswers, setModalAnswers] = useState([]);
//   const [modalLoading, setModalLoading] = useState(false);

//   const [openComments, setOpenComments] = useState({});
//   const [comments, setComments] = useState({});
//   const [commentInputs, setCommentInputs] = useState({});
//   const [answerText, setAnswerText] = useState("");

//   // 🔐 Check authentication
//   useEffect(() => {
//     if (!authLoading && !currentUser) {
//       router.push("/login");
//     }
//   }, [currentUser, authLoading, router]);

//   // 🔐 helper
//   const getUserOrAlert = async () => {
//     const { data } = await supabase.auth.getUser();
//     if (!data?.user) {
//       alert("Please login first");
//       router.push("/login");
//       return null;
//     }
//     return data.user;
//   };

//   // 🟣 Fetch Questions
//   useEffect(() => {
//     if (!currentUser) return;

//     const fetchQuestions = async () => {
//       setLoading(true);
//       const { data } = await supabase
//         .from("questions")
//         .select(`
//           id, title, question, category, image, created_at,
//           users:author_id ( name, profile_image )
//         `)
//         .order("created_at", { ascending: false });

//       setQuestions(data || []);
//       setLoading(false);
//     };

//     fetchQuestions();
//   }, [currentUser]);

//   // 🟡 Fetch Societies
//   useEffect(() => {
//     if (!currentUser) return;

//     const fetchSocieties = async () => {
//       const { data } = await supabase
//         .from("societies")
//         .select("id, name, description, created_at")
//         .order("created_at", { ascending: false });

//       setSocieties(data || []);
//     };
//     fetchSocieties();
//   }, [currentUser]);

//   // 🟠 Modal
//   const openModal = async (q) => {
//     setSelectedQuestion(q);
//     setIsModalOpen(true);
//     setModalLoading(true);

//     const { data, error } = await supabase
//       .from("answers")
//       .select(`
//         id, content, created_at, author_id,
//         users:author_id ( name, profile_image )
//       `)
//       .eq("question_id", q.id)
//       .order("created_at", { ascending: false });

//     if (error) {
//       console.warn("Answers error:", error);
//       setModalAnswers([]);
//     } else {
//       setModalAnswers(data || []);
//     }

//     setModalLoading(false);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedQuestion(null);
//     setModalAnswers([]);
//     setAnswerText("");
//   };

//   // Post Answer
//   const postAnswer = async () => {
//     if (!answerText.trim()) {
//       alert("Answer cannot be empty");
//       return;
//     }

//     const { data: { user } } = await supabase.auth.getUser();

//     if (!user) {
//       alert("Login required");
//       router.push("/login");
//       return;
//     }

//     // 🔒 check mentor
//     const { data: profile } = await supabase
//       .from("users")
//       .select("is_mentor")
//       .eq("id", user.id)
//       .single();

//     if (!profile?.is_mentor) {
//       alert("Only mentors can answer questions");
//       return;
//     }

//     const { error } = await supabase.from("answers").insert({
//       question_id: selectedQuestion.id,
//       author_id: user.id,
//       content: answerText.trim(),
//     });

//     if (error) {
//       alert(error.message);
//       return;
//     }

//     // Refresh answers
//     setAnswerText("");
//     alert("Answer posted successfully");
    
//     // Reload answers
//     const { data } = await supabase
//       .from("answers")
//       .select(`
//         id, content, created_at, author_id,
//         users:author_id ( name, profile_image )
//       `)
//       .eq("question_id", selectedQuestion.id)
//       .order("created_at", { ascending: false });
    
//     setModalAnswers(data || []);
//   };

//   // 👍 Like
//   const likeAnswer = async (answerId) => {
//     const user = await getUserOrAlert();
//     if (!user) return;

//     const { error } = await supabase
//       .from("answer_likes")
//       .insert({ answer_id: answerId, user_id: user.id });

//     if (error) {
//       if (error.code === '23505') {
//         alert("You already liked this answer");
//       } else {
//         alert("Could not like answer");
//       }
//     } else {
//       alert("Answer liked!");
//       // Refresh answers to show updated count
//       openModal(selectedQuestion);
//     }
//   };

//   // 💬 Toggle comments
//   const toggleComments = async (answerId) => {
//     setOpenComments((p) => ({ ...p, [answerId]: !p[answerId] }));

//     if (!comments[answerId]) {
//       const { data, error } = await supabase
//         .from("comments")
//         .select(`
//           id, content, created_at, user_id,
//           users:user_id ( name, profile_image )
//         `)
//         .eq("answer_id", answerId)
//         .order("created_at", { ascending: true });

//       if (!error) {
//         setComments((p) => ({ ...p, [answerId]: data || [] }));
//       }
//     }
//   };

//   // ➕ Add Comment
//   const addComment = async (answerId) => {
//     const text = commentInputs[answerId]?.trim();
//     if (!text) {
//       alert("Comment cannot be empty");
//       return;
//     }

//     const user = await getUserOrAlert();
//     if (!user) return;

//     const { error } = await supabase.from("comments").insert({
//       answer_id: answerId,
//       content: text,
//       user_id: user.id,
//     });

//     if (error) {
//       alert("Could not post comment: " + error.message);
//       return;
//     }

//     setCommentInputs((p) => ({ ...p, [answerId]: "" }));
    
//     // Refresh comments
//     const { data } = await supabase
//       .from("comments")
//       .select(`
//         id, content, created_at, user_id,
//         users:user_id ( name, profile_image )
//       `)
//       .eq("answer_id", answerId)
//       .order("created_at", { ascending: true });
    
//     setComments((p) => ({ ...p, [answerId]: data || [] }));
//   };

//   // Show loading while checking auth
//   if (authLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black">
//         <div className="text-white flex items-center gap-3">
//           <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
//           <span>Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   // If not authenticated, don't render
//   if (!currentUser) {
//     return null;
//   }

//   return (
//     <div
//       className="min-h-screen text-white"
//       style={{ background: "linear-gradient(to bottom, #4C1D95, #000000 60%)" }}
//     >
//       <Navbar />

//       <div className="w-screen mx-auto flex gap-6 mt-6 px-4 pb-20">
//         {/* 🟣 LEFT SIDEBAR — Societies */}
//         <aside className="hidden lg:block w-1/4">
//           <div className="sticky top-20 space-y-4">
//             <button
//               onClick={() => router.push("/society/create")}
//               className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg transition"
//             >
//               + Create Society
//             </button>

//             <div
//               className="rounded-xl p-4 shadow-lg border"
//               style={{
//                 background: "rgba(255,255,255,0.05)",
//                 borderColor: "rgba(255,255,255,0.1)",
//               }}
//             >
//               <h2 className="text-lg font-semibold mb-3">College Societies</h2>
//               <div className="space-y-3 max-h-[70vh] overflow-hidden hover:overflow-y-auto pr-1">
//                 {societies.length === 0 ? (
//                   <p className="text-sm text-white/60">No societies yet.</p>
//                 ) : (
//                   societies.map((s) => (
//                     <div
//                       key={s.id}
//                       className="flex items-center justify-between pb-2 border-b last:border-b-0"
//                       style={{ borderColor: "rgba(255,255,255,0.1)" }}
//                     >
//                       <div className="flex items-center gap-3">
//                         <div
//                           className="w-10 h-10 rounded-full flex items-center justify-center text-lg border"
//                           style={{
//                             background: "rgba(255,255,255,0.1)",
//                             borderColor: "rgba(255,255,255,0.2)",
//                           }}
//                         >
//                           <span>{getEmoji(s.name)}</span>
//                         </div>
//                         <div>
//                           <h3 className="text-sm font-semibold text-white/90">
//                             {s.name}
//                           </h3>
//                           <p className="text-xs text-white/60 line-clamp-1">
//                             {s.description}
//                           </p>
//                         </div>
//                       </div>
//                       <button
//                         onClick={() => router.push(`/society/${s.id}`)}
//                         className="px-3 py-1 text-xs rounded-full border"
//                         style={{
//                           background: "rgba(255,255,255,0.1)",
//                           borderColor: "rgba(255,255,255,0.15)",
//                           color: "rgba(255,255,255,0.85)",
//                         }}
//                       >
//                         Visit
//                       </button>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>
//         </aside>

//         {/* 🟡 MAIN FEED — Questions */}
//         <main className="flex-1 mx-auto">
//           <div
//             className="rounded-xl shadow-lg border p-4 md:p-5"
//             style={{
//               background: "rgba(255,255,255,0.05)",
//               borderColor: "rgba(255,255,255,0.1)",
//             }}
//           >
//             <h2 className="text-xl font-semibold mb-4 text-[#FDE68A]">
//               Latest Questions
//             </h2>

//             {loading ? (
//               <p className="text-white/70 text-center py-10">
//                 Loading questions…
//               </p>
//             ) : questions.length === 0 ? (
//               <p className="text-white/70 text-center py-10">
//                 No questions posted yet.
//               </p>
//             ) : (
//               <div className="space-y-4">
//                 {questions.map((q) => (
//                   <QueBox
//                     key={q.id}
//                     id={q.id}
//                     category={q.category}
//                     que={q.question}
//                     title={q.title}
//                     image={q.image}
//                     user={q.users}
//                     onOpenModal={() => openModal(q)}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </main>

//         {/* 🟠 RIGHT SIDEBAR */}
//         <aside className="hidden lg:block w-1/4">
//           <div className="sticky top-20">
//             <div
//               className="rounded-xl p-4 shadow-lg border"
//               style={{
//                 background: "rgba(255,255,255,0.05)",
//                 borderColor: "rgba(255,255,255,0.1)",
//               }}
//             >
//               <h2 className="text-lg font-semibold">Right Sidebar</h2>
//               <p className="text-sm text-white/70">
//                 Add trending topics, upcoming events, or ads here.
//               </p>
//             </div>
//           </div>
//         </aside>
//       </div>

//       {/* 🔵 ANSWER MODAL */}
//       {isModalOpen && (
//         <div
//           onClick={(e) => e.target === e.currentTarget && closeModal()}
//           className="fixed inset-0 z-50 flex items-center justify-center"
//           style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
//         >
//           <div
//             className="w-full max-w-xl rounded-xl border shadow-lg p-6 mx-4 max-h-[90vh] overflow-y-auto"
//             style={{
//               background: "rgba(17,24,39,0.95)",
//               borderColor: "rgba(255,255,255,0.12)",
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={closeModal}
//               className="text-white/70 hover:text-white mb-4 float-right text-2xl"
//               aria-label="Close"
//             >
//               ✕
//             </button>

//             <h2 className="text-xl font-bold text-[#FDE68A] mb-2">
//               {selectedQuestion?.title}
//             </h2>
//             <p className="text-white/90 mb-2">{selectedQuestion?.question}</p>
//             <p className="text-white/70 text-sm mb-4">
//               {selectedQuestion?.category}
//             </p>

//             {/* Answer Input */}
//             {currentUser?.is_mentor && (
//               <div className="mb-6 p-4 rounded-lg border" style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}>
//                 <h3 className="text-sm font-semibold mb-2 text-yellow-400">Post Your Answer</h3>
//                 <textarea
//                   value={answerText}
//                   onChange={(e) => setAnswerText(e.target.value)}
//                   placeholder="Write your answer here..."
//                   className="w-full rounded-md px-3 py-2 outline-none bg-white/5 border border-white/20 text-white min-h-[100px]"
//                 />
//                 <button
//                   onClick={postAnswer}
//                   className="mt-2 px-4 py-2 rounded-md font-medium bg-yellow-400 text-black hover:bg-yellow-500 transition"
//                 >
//                   Post Answer
//                 </button>
//               </div>
//             )}

//             {modalLoading ? (
//               <p className="text-white/70">Loading answers…</p>
//             ) : modalAnswers.length === 0 ? (
//               <p className="text-white/75 italic">No answers yet.</p>
//             ) : (
//               <div className="space-y-4">
//                 {modalAnswers.map((a) => (
//                   <div
//                     key={a.id}
//                     className="rounded-lg p-4 border"
//                     style={{
//                       background: "rgba(255,255,255,0.06)",
//                       borderColor: "rgba(255,255,255,0.12)",
//                     }}
//                   >
//                     <div className="flex items-center gap-3">
//                       {a.users?.profile_image ? (
//                         <img
//                           src={a.users.profile_image}
//                           alt={a.users?.name || "User"}
//                           className="w-9 h-9 rounded-full border border-white/20 object-cover"
//                         />
//                       ) : (
//                         <div className="w-9 h-9 rounded-full border flex items-center justify-center text-sm font-bold bg-white/10 border-white/20">
//                           {(a.users?.name?.[0] || "?").toUpperCase()}
//                         </div>
//                       )}

//                       <div className="flex-1">
//                         <div className="text-sm font-medium text-white/90">
//                           {a.users?.name || "Unknown User"}
//                         </div>
//                         <div className="text-white/60 text-xs">
//                           {timeAgo(a.created_at)} • {absoluteDate(a.created_at)}
//                         </div>
//                       </div>

//                       <button
//                         onClick={() => likeAnswer(a.id)}
//                         className="text-sm px-3 py-1 rounded-md border bg-white/10 hover:bg-white/20"
//                       >
//                         👍 {a.like_count || 0}
//                       </button>
//                     </div>

//                     <p className="mt-3 text-white/90">{a.content}</p>

//                     {/* Comments */}
//                     <div className="mt-3">
//                       <button
//                         onClick={() => toggleComments(a.id)}
//                         className="text-xs px-2 py-1 rounded-md border bg-white/10 hover:bg-white/20"
//                       >
//                         {openComments[a.id] ? "Hide Comments" : "View Comments"}
//                       </button>
//                     </div>

//                     {openComments[a.id] && (
//                       <div className="mt-3 space-y-3">
//                         {(comments[a.id] || []).map((c) => (
//                           <div
//                             key={c.id}
//                             className="rounded-md p-3 border bg-white/5 border-white/10"
//                           >
//                             <div className="flex items-center gap-2 mb-1">
//                               <div className="w-7 h-7 rounded-full border flex items-center justify-center text-xs bg-white/10 border-white/20">
//                                 {(c.users?.name?.[0] || "?").toUpperCase()}
//                               </div>
//                               <div className="text-xs">
//                                 <div className="font-medium text-white/90">
//                                   {c.users?.name || "Unknown"}
//                                 </div>
//                                 <div className="text-white/60">
//                                   {timeAgo(c.created_at)}
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="text-sm text-white/90">
//                               {c.content}
//                             </div>
//                           </div>
//                         ))}

//                         <div className="flex gap-2">
//                           <input
//                             value={commentInputs[a.id] || ""}
//                             onChange={(e) =>
//                               setCommentInputs((prev) => ({
//                                 ...prev,
//                                 [a.id]: e.target.value,
//                               }))
//                             }
//                             onKeyPress={(e) => e.key === 'Enter' && addComment(a.id)}
//                             placeholder="Write a comment…"
//                             className="flex-1 rounded-md px-3 py-2 outline-none bg-white/5 border border-white/20 text-white"
//                           />
//                           <button
//                             onClick={() => addComment(a.id)}
//                             className="px-3 py-2 rounded-md font-medium bg-yellow-400 text-black"
//                           >
//                             Add
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       <BottomNavbar />
//     </div>
//   );
// }
















// "use client";

// import { useEffect, useState, useContext } from "react";
// import Navbar from "@/components/Navbar";
// import BottomNavbar from "@/components/BottomNavbar";
// import QueBox from "@/components/QueBox";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";
// import { AuthContext } from "@/lib/AuthProvider";

// const timeAgo = (iso) => {
//   const d = new Date(iso);
//   const diff = (Date.now() - d.getTime()) / 1000;
//   const h = Math.floor(diff / 3600);
//   const m = Math.floor((diff % 3600) / 60);
//   if (h > 0) return `${h} hour${h > 1 ? "s" : ""} ago`;
//   if (m > 0) return `${m} minute${m > 1 ? "s" : ""} ago`;
//   return "just now";
// };

// const absoluteDate = (iso) =>
//   new Date(iso).toLocaleString(undefined, {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });

// const getEmoji = (name = "") => {
//   const n = name.toLowerCase();
//   if (n.includes("tech") || n.includes("coding")) return "💻";
//   if (n.includes("cultural") || n.includes("music") || n.includes("dance")) return "🎭";
//   if (n.includes("literary") || n.includes("debate") || n.includes("writing")) return "📚";
//   if (n.includes("drama") || n.includes("film")) return "🎬";
//   if (n.includes("photo")) return "📷";
//   if (n.includes("robot")) return "🤖";
//   if (n.includes("entrepreneur")) return "🚀";
//   if (n.includes("environment")) return "🌿";
//   if (n.includes("math")) return "➗";
//   if (n.includes("astro")) return "🌌";
//   if (n.includes("ml") || n.includes("ai")) return "🧠";
//   if (n.includes("fin")) return "💹";
//   return "🏫";
// };

// export default function HomePage() {
//   const router = useRouter();
//   const { currentUser, loading: authLoading } = useContext(AuthContext);
  
//   const [questions, setQuestions] = useState([]);
//   const [societies, setSocieties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedQuestion, setSelectedQuestion] = useState(null);
//   const [modalAnswers, setModalAnswers] = useState([]);
//   const [modalLoading, setModalLoading] = useState(false);

//   const [openComments, setOpenComments] = useState({});
//   const [comments, setComments] = useState({});
//   const [commentInputs, setCommentInputs] = useState({});
//   const [answerText, setAnswerText] = useState("");
  
//   const [isMentor, setIsMentor] = useState(false);
//   const [checkingMentor, setCheckingMentor] = useState(true);

//   // Check authentication
//   useEffect(() => {
//     if (!authLoading && !currentUser) {
//       router.push("/login");
//     }
//   }, [currentUser, authLoading, router]);

//   // Check if current user is a mentor
//   useEffect(() => {
//     let mounted = true;

//     const checkMentorStatus = async () => {
//       if (!currentUser?.id) {
//         if (mounted) {
//           setIsMentor(false);
//           setCheckingMentor(false);
//         }
//         return;
//       }

//       try {
//         const { data: userData, error } = await supabase
//           .from('users')
//           .select('is_mentor')
//           .eq('id', currentUser.id)
//           .single();

//         if (error) {
//           console.error('Error fetching mentor status:', error);
//         }

//         if (mounted) {
//           setIsMentor(userData?.is_mentor || false);
//           setCheckingMentor(false);
//         }
//       } catch (err) {
//         console.error('Error checking mentor status:', err);
//         if (mounted) {
//           setIsMentor(false);
//           setCheckingMentor(false);
//         }
//       }
//     };

//     checkMentorStatus();

//     return () => {
//       mounted = false;
//     };
//   }, [currentUser]);

//   // Helper function
//   const getUserOrAlert = async () => {
//     const { data } = await supabase.auth.getUser();
//     if (!data?.user) {
//       alert("Please login first");
//       router.push("/login");
//       return null;
//     }
//     return data.user;
//   };

//   // Fetch Questions
//   useEffect(() => {
//     if (!currentUser) return;

//     let mounted = true;

//     const fetchQuestions = async () => {
//       setLoading(true);
      
//       try {
//         const { data, error } = await supabase
//           .from("questions")
//           .select(`
//             id, title, question, category, image, created_at,
//             users:author_id ( name, profile_image )
//           `)
//           .order("created_at", { ascending: false });

//         if (error) throw error;

//         if (mounted) {
//           setQuestions(data || []);
//           setLoading(false);
//         }
//       } catch (err) {
//         console.error('Error fetching questions:', err);
//         if (mounted) {
//           setQuestions([]);
//           setLoading(false);
//         }
//       }
//     };

//     fetchQuestions();

//     return () => {
//       mounted = false;
//     };
//   }, [currentUser]);

//   // Fetch Societies
//   useEffect(() => {
//     if (!currentUser) return;

//     let mounted = true;

//     const fetchSocieties = async () => {
//       try {
//         const { data, error } = await supabase
//           .from("societies")
//           .select("id, name, description, created_at")
//           .order("created_at", { ascending: false });

//         if (error) throw error;

//         if (mounted) {
//           setSocieties(data || []);
//         }
//       } catch (err) {
//         console.error('Error fetching societies:', err);
//         if (mounted) {
//           setSocieties([]);
//         }
//       }
//     };

//     fetchSocieties();

//     return () => {
//       mounted = false;
//     };
//   }, [currentUser]);

//   // Modal
//   const openModal = async (q) => {
//     setSelectedQuestion(q);
//     setIsModalOpen(true);
//     setModalLoading(true);

//     try {
//       const { data, error } = await supabase
//         .from("answers")
//         .select(`
//           id, content, created_at, author_id,
//           users:author_id ( name, profile_image )
//         `)
//         .eq("question_id", q.id)
//         .order("created_at", { ascending: false });

//       if (error) {
//         console.warn("Answers error:", error);
//         setModalAnswers([]);
//       } else {
//         // Fetch like counts for each answer
//         const answersWithLikes = await Promise.all(
//           (data || []).map(async (answer) => {
//             const { count } = await supabase
//               .from("answer_likes")
//               .select("*", { count: "exact", head: true })
//               .eq("answer_id", answer.id);
            
//             return { ...answer, like_count: count || 0 };
//           })
//         );
        
//         setModalAnswers(answersWithLikes);
//       }
//     } catch (err) {
//       console.error('Error opening modal:', err);
//       setModalAnswers([]);
//     }

//     setModalLoading(false);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedQuestion(null);
//     setModalAnswers([]);
//     setAnswerText("");
//   };

//   // Post Answer
//   const postAnswer = async () => {
//     if (!answerText.trim()) {
//       alert("Answer cannot be empty");
//       return;
//     }

//     const { data: { user } } = await supabase.auth.getUser();

//     if (!user) {
//       alert("Login required");
//       router.push("/login");
//       return;
//     }

//     // Check mentor status
//     if (!isMentor) {
//       alert("Only mentors can answer questions");
//       return;
//     }

//     try {
//       const { error } = await supabase.from("answers").insert({
//         question_id: selectedQuestion.id,
//         author_id: user.id,
//         content: answerText.trim(),
//       });

//       if (error) {
//         if (error.code === '42501') {
//           alert("Permission denied. Please ensure you are a mentor.");
//         } else {
//           alert(error.message);
//         }
//         return;
//       }

//       // Refresh answers
//       setAnswerText("");
//       alert("Answer posted successfully");
      
//       // Reload answers with like counts
//       const { data } = await supabase
//         .from("answers")
//         .select(`
//           id, content, created_at, author_id,
//           users:author_id ( name, profile_image )
//         `)
//         .eq("question_id", selectedQuestion.id)
//         .order("created_at", { ascending: false });
      
//       const answersWithLikes = await Promise.all(
//         (data || []).map(async (answer) => {
//           const { count } = await supabase
//             .from("answer_likes")
//             .select("*", { count: "exact", head: true })
//             .eq("answer_id", answer.id);
          
//           return { ...answer, like_count: count || 0 };
//         })
//       );
      
//       setModalAnswers(answersWithLikes);
//     } catch (err) {
//       console.error('Error posting answer:', err);
//       alert('Failed to post answer. Please try again.');
//     }
//   };

//   // Like Answer
//   const likeAnswer = async (answerId) => {
//     const user = await getUserOrAlert();
//     if (!user) return;

//     try {
//       const { error } = await supabase
//         .from("answer_likes")
//         .insert({ answer_id: answerId, user_id: user.id });

//       if (error) {
//         if (error.code === '23505') {
//           alert("You already liked this answer");
//         } else {
//           alert("Could not like answer");
//         }
//       } else {
//         // Refresh answers to show updated count
//         openModal(selectedQuestion);
//       }
//     } catch (err) {
//       console.error('Error liking answer:', err);
//       alert('Failed to like answer');
//     }
//   };

//   // Toggle comments
//   const toggleComments = async (answerId) => {
//     setOpenComments((p) => ({ ...p, [answerId]: !p[answerId] }));

//     if (!comments[answerId]) {
//       try {
//         const { data, error } = await supabase
//           .from("comments")
//           .select(`
//             id, content, created_at, user_id,
//             users:user_id ( name, profile_image )
//           `)
//           .eq("answer_id", answerId)
//           .order("created_at", { ascending: true });

//         if (!error) {
//           setComments((p) => ({ ...p, [answerId]: data || [] }));
//         }
//       } catch (err) {
//         console.error('Error fetching comments:', err);
//       }
//     }
//   };

//   // Add Comment
//   const addComment = async (answerId) => {
//     const text = commentInputs[answerId]?.trim();
//     if (!text) {
//       alert("Comment cannot be empty");
//       return;
//     }

//     const user = await getUserOrAlert();
//     if (!user) return;

//     try {
//       const { error } = await supabase.from("comments").insert({
//         answer_id: answerId,
//         content: text,
//         user_id: user.id,
//       });

//       if (error) {
//         alert("Could not post comment: " + error.message);
//         return;
//       }

//       setCommentInputs((p) => ({ ...p, [answerId]: "" }));
      
//       // Refresh comments
//       const { data } = await supabase
//         .from("comments")
//         .select(`
//           id, content, created_at, user_id,
//           users:user_id ( name, profile_image )
//         `)
//         .eq("answer_id", answerId)
//         .order("created_at", { ascending: true });
      
//       setComments((p) => ({ ...p, [answerId]: data || [] }));
//     } catch (err) {
//       console.error('Error adding comment:', err);
//       alert('Failed to post comment');
//     }
//   };

//   // Show loading while checking auth
//   if (authLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black">
//         <div className="text-white flex items-center gap-3">
//           <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
//           <span>Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   // If not authenticated, don't render
//   // if (!currentUser) {
//   //   return null;
//   // }


//   if (!currentUser) {
//   return (
//     <div className="min-h-screen flex items-center justify-center text-white">
//       Redirecting to login…
//     </div>
//   );
// }


//   return (
//     <div
//       className="min-h-screen text-white"
//       style={{ background: "linear-gradient(to bottom, #4C1D95, #000000 60%)" }}
//     >
//       <Navbar />

//       <div className="w-screen mx-auto flex gap-6 mt-6 px-4 pb-20">
//         {/* LEFT SIDEBAR — Societies */}
//         <aside className="hidden lg:block w-1/4">
//           <div className="sticky top-20 space-y-4">
//             <button
//               onClick={() => router.push("/society/create")}
//               className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg transition"
//             >
//               + Create Society
//             </button>

//             <div
//               className="rounded-xl p-4 shadow-lg border"
//               style={{
//                 background: "rgba(255,255,255,0.05)",
//                 borderColor: "rgba(255,255,255,0.1)",
//               }}
//             >
//               <h2 className="text-lg font-semibold mb-3">College Societies</h2>
//               <div className="space-y-3 max-h-[70vh] overflow-hidden hover:overflow-y-auto pr-1">
//                 {societies.length === 0 ? (
//                   <p className="text-sm text-white/60">No societies yet.</p>
//                 ) : (
//                   societies.map((s) => (
//                     <div
//                       key={s.id}
//                       className="flex items-center justify-between pb-2 border-b last:border-b-0"
//                       style={{ borderColor: "rgba(255,255,255,0.1)" }}
//                     >
//                       <div className="flex items-center gap-3">
//                         <div
//                           className="w-10 h-10 rounded-full flex items-center justify-center text-lg border"
//                           style={{
//                             background: "rgba(255,255,255,0.1)",
//                             borderColor: "rgba(255,255,255,0.2)",
//                           }}
//                         >
//                           <span>{getEmoji(s.name)}</span>
//                         </div>
//                         <div>
//                           <h3 className="text-sm font-semibold text-white/90">
//                             {s.name}
//                           </h3>
//                           <p className="text-xs text-white/60 line-clamp-1">
//                             {s.description}
//                           </p>
//                         </div>
//                       </div>
//                       <button
//                         onClick={() => router.push(`/society/${s.id}`)}
//                         className="px-3 py-1 text-xs rounded-full border"
//                         style={{
//                           background: "rgba(255,255,255,0.1)",
//                           borderColor: "rgba(255,255,255,0.15)",
//                           color: "rgba(255,255,255,0.85)",
//                         }}
//                       >
//                         Visit
//                       </button>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>
//         </aside>

//         {/* MAIN FEED — Questions */}
//         <main className="flex-1 mx-auto">
//           <div
//             className="rounded-xl shadow-lg border p-4 md:p-5"
//             style={{
//               background: "rgba(255,255,255,0.05)",
//               borderColor: "rgba(255,255,255,0.1)",
//             }}
//           >
//             <h2 className="text-xl font-semibold mb-4 text-[#FDE68A]">
//               Latest Questions
//             </h2>

//             {loading ? (
//               <p className="text-white/70 text-center py-10">
//                 Loading questions…
//               </p>
//             ) : questions.length === 0 ? (
//               <p className="text-white/70 text-center py-10">
//                 No questions posted yet.
//               </p>
//             ) : (
//               <div className="space-y-4">
//                 {questions.map((q) => (
//                   <QueBox
//                     key={q.id}
//                     id={q.id}
//                     category={q.category}
//                     que={q.question}
//                     title={q.title}
//                     image={q.image}
//                     user={q.users}
//                     onOpenModal={() => openModal(q)}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </main>

//         {/* RIGHT SIDEBAR */}
//         {/* <aside className="hidden lg:block w-1/4">
//           <div className="sticky top-20">
//             <div
//               className="rounded-xl p-4 shadow-lg border"
//               style={{
//                 background: "rgba(255,255,255,0.05)",
//                 borderColor: "rgba(255,255,255,0.1)",
//               }}
//             >
//               <h2 className="text-lg font-semibold">Right Sidebar</h2>
//               <p className="text-sm text-white/70">
//                 Add trending topics, upcoming events, or ads here.
//               </p>
//             </div>
//           </div>
//         </aside> */}

//         {/* RIGHT SIDEBAR */}
// <aside className="hidden lg:block w-1/4">
//   <div className="sticky top-20">
//     <div
//       className="rounded-xl p-4 shadow-lg border"
//       style={{
//         background: "rgba(255,255,255,0.05)",
//         borderColor: "rgba(255,255,255,0.1)",
//       }}
//     >
//       <h2 className="text-lg font-semibold text-yellow-400">
//         About Mentor QnA
//       </h2>

//       <p className="text-sm text-white/80 mt-2 leading-relaxed">
//         Mentor QnA is a student-driven platform where juniors can
//         connect with experienced seniors and mentors across branches,
//         domains, and career paths.
//       </p>

//       <ul className="mt-3 space-y-2 text-sm text-white/70">
//         <li>• Ask doubts without hesitation</li>
//         <li>• Get guidance from verified mentors</li>
//         <li>• Explore GATE, UPSC, Tech, Startups & more</li>
//       </ul>

//       <div className="mt-4 pt-3 border-t border-white/10">
//         <p className="text-xs text-white/60">
//           Built with by <span className="text-sm font-semibold text-white">
//           Divy 
//         </span>
//         </p>
//         {/* <p className="text-sm font-semibold text-white">
//           Divy Prakash Singh
//         </p> */}
//         <p className="text-xs text-white/50">
//           Solving a real problem faced by students
//         </p>
//       </div>
//     </div>
//   </div>
// </aside>

//       </div>

//       {/* ANSWER MODAL */}
//       {isModalOpen && (
//         <div
//           onClick={(e) => e.target === e.currentTarget && closeModal()}
//           className="fixed inset-0 z-50 flex items-center justify-center"
//           style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
//         >
//           <div
//             className="w-full max-w-xl rounded-xl border shadow-lg p-6 mx-4 max-h-[90vh] overflow-y-auto"
//             style={{
//               background: "rgba(17,24,39,0.95)",
//               borderColor: "rgba(255,255,255,0.12)",
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={closeModal}
//               className="text-white/70 hover:text-white mb-4 float-right text-2xl"
//               aria-label="Close"
//             >
//               ✕
//             </button>

//             <h2 className="text-xl font-bold text-[#FDE68A] mb-2">
//               {selectedQuestion?.title}
//             </h2>
//             <p className="text-white/90 mb-2">{selectedQuestion?.question}</p>
//             <p className="text-white/70 text-sm mb-4">
//               {selectedQuestion?.category}
//             </p>

//             {/* Answer Input - Only show if mentor */}
//             {!checkingMentor && isMentor && (
//               <div className="mb-6 p-4 rounded-lg border" style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}>
//                 <h3 className="text-sm font-semibold mb-2 text-yellow-400">Post Your Answer</h3>
//                 <textarea
//                   value={answerText}
//                   onChange={(e) => setAnswerText(e.target.value)}
//                   placeholder="Write your answer here..."
//                   className="w-full rounded-md px-3 py-2 outline-none bg-white/5 border border-white/20 text-white min-h-[100px]"
//                 />
//                 <button
//                   onClick={postAnswer}
//                   className="mt-2 px-4 py-2 rounded-md font-medium bg-yellow-400 text-black hover:bg-yellow-500 transition"
//                 >
//                   Post Answer
//                 </button>
//               </div>
//             )}

//             {/* Non-mentor message */}
//             {!checkingMentor && !isMentor && (
//               <div className="mb-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
//                 <p className="text-yellow-200 text-sm">
//                   Only mentors can answer questions.
//                 </p>
//               </div>
//             )}

//             {modalLoading ? (
//               <p className="text-white/70">Loading answers…</p>
//             ) : modalAnswers.length === 0 ? (
//               <p className="text-white/75 italic">No answers yet.</p>
//             ) : (
//               <div className="space-y-4">
//                 {modalAnswers.map((a) => (
//                   <div
//                     key={a.id}
//                     className="rounded-lg p-4 border"
//                     style={{
//                       background: "rgba(255,255,255,0.06)",
//                       borderColor: "rgba(255,255,255,0.12)",
//                     }}
//                   >
//                     <div className="flex items-center gap-3">
//                       {a.users?.profile_image ? (
//                         <img
//                           src={a.users.profile_image}
//                           alt={a.users?.name || "User"}
//                           className="w-9 h-9 rounded-full border border-white/20 object-cover"
//                         />
//                       ) : (
//                         <div className="w-9 h-9 rounded-full border flex items-center justify-center text-sm font-bold bg-white/10 border-white/20">
//                           {(a.users?.name?.[0] || "?").toUpperCase()}
//                         </div>
//                       )}

//                       <div className="flex-1">
//                         <div className="text-sm font-medium text-white/90">
//                           {a.users?.name || "Unknown User"}
//                         </div>
//                         <div className="text-white/60 text-xs">
//                           {timeAgo(a.created_at)} • {absoluteDate(a.created_at)}
//                         </div>
//                       </div>

//                       <button
//                         onClick={() => likeAnswer(a.id)}
//                         className="text-sm px-3 py-1 rounded-md border bg-white/10 hover:bg-white/20"
//                       >
//                         👍 {a.like_count || 0}
//                       </button>
//                     </div>

//                     <p className="mt-3 text-white/90">{a.content}</p>

//                     {/* Comments */}
//                     <div className="mt-3">
//                       <button
//                         onClick={() => toggleComments(a.id)}
//                         className="text-xs px-2 py-1 rounded-md border bg-white/10 hover:bg-white/20"
//                       >
//                         {openComments[a.id] ? "Hide Comments" : "View Comments"}
//                       </button>
//                     </div>

//                     {openComments[a.id] && (
//                       <div className="mt-3 space-y-3">
//                         {(comments[a.id] || []).map((c) => (
//                           <div
//                             key={c.id}
//                             className="rounded-md p-3 border bg-white/5 border-white/10"
//                           >
//                             <div className="flex items-center gap-2 mb-1">
//                               <div className="w-7 h-7 rounded-full border flex items-center justify-center text-xs bg-white/10 border-white/20">
//                                 {(c.users?.name?.[0] || "?").toUpperCase()}
//                               </div>
//                               <div className="text-xs">
//                                 <div className="font-medium text-white/90">
//                                   {c.users?.name || "Unknown"}
//                                 </div>
//                                 <div className="text-white/60">
//                                   {timeAgo(c.created_at)}
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="text-sm text-white/90">
//                               {c.content}
//                             </div>
//                           </div>
//                         ))}

//                         <div className="flex gap-2">
//                           <input
//                             value={commentInputs[a.id] || ""}
//                             onChange={(e) =>
//                               setCommentInputs((prev) => ({
//                                 ...prev,
//                                 [a.id]: e.target.value,
//                               }))
//                             }
//                             onKeyPress={(e) => e.key === 'Enter' && addComment(a.id)}
//                             placeholder="Write a comment…"
//                             className="flex-1 rounded-md px-3 py-2 outline-none bg-white/5 border border-white/20 text-white"
//                           />
//                           <button
//                             onClick={() => addComment(a.id)}
//                             className="px-3 py-2 rounded-md font-medium bg-yellow-400 text-black"
//                           >
//                             Add
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       <BottomNavbar />
//     </div>
//   );
// }











"use client";

import { useEffect, useState, useContext } from "react";
import Navbar from "@/components/Navbar";
import BottomNavbar from "@/components/BottomNavbar";
import QueBox from "@/components/QueBox";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/lib/AuthProvider";

const timeAgo = (iso) => {
  const d = new Date(iso);
  const diff = (Date.now() - d.getTime()) / 1000;
  const h = Math.floor(diff / 3600);
  const m = Math.floor((diff % 3600) / 60);
  if (h > 0) return `${h} hour${h > 1 ? "s" : ""} ago`;
  if (m > 0) return `${m} minute${m > 1 ? "s" : ""} ago`;
  return "just now";
};

const absoluteDate = (iso) =>
  new Date(iso).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const getEmoji = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("tech") || n.includes("coding")) return "💻";
  if (n.includes("cultural") || n.includes("music") || n.includes("dance")) return "🎭";
  if (n.includes("literary") || n.includes("debate") || n.includes("writing")) return "📚";
  if (n.includes("drama") || n.includes("film")) return "🎬";
  if (n.includes("photo")) return "📷";
  if (n.includes("robot")) return "🤖";
  if (n.includes("entrepreneur")) return "🚀";
  if (n.includes("environment")) return "🌿";
  if (n.includes("math")) return "➗";
  if (n.includes("astro")) return "🌌";
  if (n.includes("ml") || n.includes("ai")) return "🧠";
  if (n.includes("fin")) return "💹";
  return "🏫";
};

export default function HomePage() {
  const router = useRouter();
  const { currentUser, loading: authLoading } = useContext(AuthContext);
  
  const [questions, setQuestions] = useState([]);
  const [societies, setSocieties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageReady, setPageReady] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [modalAnswers, setModalAnswers] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);

  const [openComments, setOpenComments] = useState({});
  const [comments, setComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [answerText, setAnswerText] = useState("");
  
  const [isMentor, setIsMentor] = useState(false);
  const [checkingMentor, setCheckingMentor] = useState(true);

  // 🔹 Auth check and page ready state
  useEffect(() => {
    console.log("🏠 [HomePage] Auth state:", { authLoading, hasUser: !!currentUser });

    if (authLoading) {
      console.log("⏳ [HomePage] Waiting for auth...");
      return;
    }

    if (!currentUser) {
      console.log("❌ [HomePage] No user, redirecting...");
      router.replace("/login");
      return;
    }

    console.log("✅ [HomePage] User authenticated, setting page ready");
    setPageReady(true);
  }, [currentUser, authLoading, router]);

  // 🔹 Check mentor status
  useEffect(() => {
    if (!pageReady || !currentUser?.id) {
      setIsMentor(false);
      setCheckingMentor(false);
      return;
    }

    let mounted = true;

    const checkMentorStatus = async () => {
      try {
        console.log("🔍 [HomePage] Checking mentor status...");
        const { data: userData, error } = await supabase
          .from('users')
          .select('is_mentor')
          .eq('id', currentUser.id)
          .single();

        if (error) {
          console.error("❌ [HomePage] Mentor check error:", error);
        }

        if (mounted) {
          setIsMentor(userData?.is_mentor || false);
          setCheckingMentor(false);
          console.log("✅ [HomePage] Mentor status:", userData?.is_mentor || false);
        }
      } catch (err) {
        console.error("❌ [HomePage] Mentor check failed:", err);
        if (mounted) {
          setIsMentor(false);
          setCheckingMentor(false);
        }
      }
    };

    checkMentorStatus();

    return () => {
      mounted = false;
    };
  }, [pageReady, currentUser]);

  // 🔹 Fetch Questions
  useEffect(() => {
    if (!pageReady || !currentUser) {
      return;
    }

    let mounted = true;

    const fetchQuestions = async () => {
      setLoading(true);
      
      try {
        console.log("📥 [HomePage] Fetching questions...");
        const { data, error } = await supabase
          .from("questions")
          .select(`
            id, title, question, category, image, created_at,
            users:author_id ( name, profile_image )
          `)
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (mounted) {
          setQuestions(data || []);
          setLoading(false);
          console.log("✅ [HomePage] Questions loaded:", data?.length || 0);
        }
      } catch (err) {
        console.error("❌ [HomePage] Questions error:", err);
        if (mounted) {
          setQuestions([]);
          setLoading(false);
        }
      }
    };

    fetchQuestions();

    return () => {
      mounted = false;
    };
  }, [pageReady, currentUser]);

  // 🔹 Fetch Societies
  useEffect(() => {
    if (!pageReady || !currentUser) {
      return;
    }

    let mounted = true;

    const fetchSocieties = async () => {
      try {
        console.log("📥 [HomePage] Fetching societies...");
        const { data, error } = await supabase
          .from("societies")
          .select("id, name, description, created_at")
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (mounted) {
          setSocieties(data || []);
          console.log("✅ [HomePage] Societies loaded:", data?.length || 0);
        }
      } catch (err) {
        console.error("❌ [HomePage] Societies error:", err);
        if (mounted) {
          setSocieties([]);
        }
      }
    };

    fetchSocieties();

    return () => {
      mounted = false;
    };
  }, [pageReady, currentUser]);

  // Helper function
  const getUserOrAlert = async () => {
    const { data } = await supabase.auth.getUser();
    if (!data?.user) {
      alert("Please login first");
      router.push("/login");
      return null;
    }
    return data.user;
  };

  // Modal
  const openModal = async (q) => {
    setSelectedQuestion(q);
    setIsModalOpen(true);
    setModalLoading(true);

    try {
      const { data, error } = await supabase
        .from("answers")
        .select(`
          id, content, created_at, author_id,
          users:author_id ( name, profile_image )
        `)
        .eq("question_id", q.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Answers error:", error);
        setModalAnswers([]);
      } else {
        // Fetch like counts for each answer
        const answersWithLikes = await Promise.all(
          (data || []).map(async (answer) => {
            const { count } = await supabase
              .from("answer_likes")
              .select("*", { count: "exact", head: true })
              .eq("answer_id", answer.id);
            
            return { ...answer, like_count: count || 0 };
          })
        );
        
        setModalAnswers(answersWithLikes);
      }
    } catch (err) {
      console.error('Error opening modal:', err);
      setModalAnswers([]);
    }

    setModalLoading(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
    setModalAnswers([]);
    setAnswerText("");
  };

  // Post Answer
  const postAnswer = async () => {
    if (!answerText.trim()) {
      alert("Answer cannot be empty");
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("Login required");
      router.push("/login");
      return;
    }

    // Check mentor status
    if (!isMentor) {
      alert("Only mentors can answer questions");
      return;
    }

    try {
      const { error } = await supabase.from("answers").insert({
        question_id: selectedQuestion.id,
        author_id: user.id,
        content: answerText.trim(),
      });

      if (error) {
        if (error.code === '42501') {
          alert("Permission denied. Please ensure you are a mentor.");
        } else {
          alert(error.message);
        }
        return;
      }

      // Refresh answers
      setAnswerText("");
      alert("Answer posted successfully");
      
      // Reload answers with like counts
      const { data } = await supabase
        .from("answers")
        .select(`
          id, content, created_at, author_id,
          users:author_id ( name, profile_image )
        `)
        .eq("question_id", selectedQuestion.id)
        .order("created_at", { ascending: false });
      
      const answersWithLikes = await Promise.all(
        (data || []).map(async (answer) => {
          const { count } = await supabase
            .from("answer_likes")
            .select("*", { count: "exact", head: true })
            .eq("answer_id", answer.id);
          
          return { ...answer, like_count: count || 0 };
        })
      );
      
      setModalAnswers(answersWithLikes);
    } catch (err) {
      console.error('Error posting answer:', err);
      alert('Failed to post answer. Please try again.');
    }
  };

  // Like Answer
  const likeAnswer = async (answerId) => {
    const user = await getUserOrAlert();
    if (!user) return;

    try {
      const { error } = await supabase
        .from("answer_likes")
        .insert({ answer_id: answerId, user_id: user.id });

      if (error) {
        if (error.code === '23505') {
          alert("You already liked this answer");
        } else {
          alert("Could not like answer");
        }
      } else {
        // Refresh answers to show updated count
        openModal(selectedQuestion);
      }
    } catch (err) {
      console.error('Error liking answer:', err);
      alert('Failed to like answer');
    }
  };

  // Toggle comments
  const toggleComments = async (answerId) => {
    setOpenComments((p) => ({ ...p, [answerId]: !p[answerId] }));

    if (!comments[answerId]) {
      try {
        const { data, error } = await supabase
          .from("comments")
          .select(`
            id, content, created_at, user_id,
            users:user_id ( name, profile_image )
          `)
          .eq("answer_id", answerId)
          .order("created_at", { ascending: true });

        if (!error) {
          setComments((p) => ({ ...p, [answerId]: data || [] }));
        }
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    }
  };

  // Add Comment
  const addComment = async (answerId) => {
    const text = commentInputs[answerId]?.trim();
    if (!text) {
      alert("Comment cannot be empty");
      return;
    }

    const user = await getUserOrAlert();
    if (!user) return;

    try {
      const { error } = await supabase.from("comments").insert({
        answer_id: answerId,
        content: text,
        user_id: user.id,
      });

      if (error) {
        alert("Could not post comment: " + error.message);
        return;
      }

      setCommentInputs((p) => ({ ...p, [answerId]: "" }));
      
      // Refresh comments
      const { data } = await supabase
        .from("comments")
        .select(`
          id, content, created_at, user_id,
          users:user_id ( name, profile_image )
        `)
        .eq("answer_id", answerId)
        .order("created_at", { ascending: true });
      
      setComments((p) => ({ ...p, [answerId]: data || [] }));
    } catch (err) {
      console.error('Error adding comment:', err);
      alert('Failed to post comment');
    }
  };

  // 🔹 Show loading while auth is checking
  if (authLoading || !pageReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <span className="text-lg">Loading home page...</span>
        </div>
      </div>
    );
  }

  // 🔹 If not authenticated, don't render (will redirect)
  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black">
        <div className="text-white">Redirecting to login…</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "linear-gradient(to bottom, #4C1D95, #000000 60%)" }}
    >
      <Navbar />

      <div className="w-screen mx-auto flex gap-6 mt-6 px-4 pb-20">
        {/* LEFT SIDEBAR — Societies */}
        <aside className="hidden lg:block w-1/4">
          <div className="sticky top-20 space-y-4">
            <button
              onClick={() => router.push("/society/create")}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold p-3 rounded-lg transition"
            >
              + Create Society
            </button>

            <div
              className="rounded-xl p-4 shadow-lg border"
              style={{
                background: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <h2 className="text-lg font-semibold mb-3">College Societies</h2>
              <div className="space-y-3 max-h-[70vh] overflow-hidden hover:overflow-y-auto pr-1">
                {societies.length === 0 ? (
                  <p className="text-sm text-white/60">No societies yet.</p>
                ) : (
                  societies.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between pb-2 border-b last:border-b-0"
                      style={{ borderColor: "rgba(255,255,255,0.1)" }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-lg border"
                          style={{
                            background: "rgba(255,255,255,0.1)",
                            borderColor: "rgba(255,255,255,0.2)",
                          }}
                        >
                          <span>{getEmoji(s.name)}</span>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-white/90">
                            {s.name}
                          </h3>
                          <p className="text-xs text-white/60 line-clamp-1">
                            {s.description}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => router.push(`/society/${s.id}`)}
                        className="px-3 py-1 text-xs rounded-full border"
                        style={{
                          background: "rgba(255,255,255,0.1)",
                          borderColor: "rgba(255,255,255,0.15)",
                          color: "rgba(255,255,255,0.85)",
                        }}
                      >
                        Visit
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN FEED — Questions */}
        <main className="flex-1 mx-auto">
          <div
            className="rounded-xl shadow-lg border p-4 md:p-5"
            style={{
              background: "rgba(255,255,255,0.05)",
              borderColor: "rgba(255,255,255,0.1)",
            }}
          >
            <h2 className="text-xl font-semibold mb-4 text-[#FDE68A]">
              Latest Questions
            </h2>

            {loading ? (
              <p className="text-white/70 text-center py-10">
                Loading questions…
              </p>
            ) : questions.length === 0 ? (
              <p className="text-white/70 text-center py-10">
                No questions posted yet.
              </p>
            ) : (
              <div className="space-y-4">
                {questions.map((q) => (
                  <QueBox
                    key={q.id}
                    id={q.id}
                    category={q.category}
                    que={q.question}
                    title={q.title}
                    image={q.image}
                    user={q.users}
                    onOpenModal={() => openModal(q)}
                  />
                ))}
              </div>
            )}
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="hidden lg:block w-1/4">
          <div className="sticky top-20">
            <div
              className="rounded-xl p-4 shadow-lg border"
              style={{
                background: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <h2 className="text-lg font-semibold text-yellow-400">
                About Mentor QnA
              </h2>

              <p className="text-sm text-white/80 mt-2 leading-relaxed">
                Mentor QnA is a student-driven platform where juniors can
                connect with experienced seniors and mentors across branches,
                domains, and career paths.
              </p>

              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li>• Ask doubts without hesitation</li>
                <li>• Get guidance from verified mentors</li>
                <li>• Explore GATE, UPSC, Tech, Startups & more</li>
              </ul>

              <div className="mt-4 pt-3 border-t border-white/10">
                <p className="text-xs text-white/60">
                  Built with by <span className="text-sm font-semibold text-white">
                  Divy 
                </span>
                </p>
                <p className="text-xs text-white/50">
                  Solving a real problem faced by students
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ANSWER MODAL */}
      {isModalOpen && (
        <div
          onClick={(e) => e.target === e.currentTarget && closeModal()}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
        >
          <div
            className="w-full max-w-xl rounded-xl border shadow-lg p-6 mx-4 max-h-[90vh] overflow-y-auto"
            style={{
              background: "rgba(17,24,39,0.95)",
              borderColor: "rgba(255,255,255,0.12)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="text-white/70 hover:text-white mb-4 float-right text-2xl"
              aria-label="Close"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-[#FDE68A] mb-2">
              {selectedQuestion?.title}
            </h2>
            <p className="text-white/90 mb-2">{selectedQuestion?.question}</p>
            <p className="text-white/70 text-sm mb-4">
              {selectedQuestion?.category}
            </p>

            {/* Answer Input - Only show if mentor */}
            {!checkingMentor && isMentor && (
              <div className="mb-6 p-4 rounded-lg border" style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}>
                <h3 className="text-sm font-semibold mb-2 text-yellow-400">Post Your Answer</h3>
                <textarea
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  placeholder="Write your answer here..."
                  className="w-full rounded-md px-3 py-2 outline-none bg-white/5 border border-white/20 text-white min-h-[100px]"
                />
                <button
                  onClick={postAnswer}
                  className="mt-2 px-4 py-2 rounded-md font-medium bg-yellow-400 text-black hover:bg-yellow-500 transition"
                >
                  Post Answer
                </button>
              </div>
            )}

            {/* Non-mentor message */}
            {!checkingMentor && !isMentor && (
              <div className="mb-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <p className="text-yellow-200 text-sm">
                  Only mentors can answer questions.
                </p>
              </div>
            )}

            {modalLoading ? (
              <p className="text-white/70">Loading answers…</p>
            ) : modalAnswers.length === 0 ? (
              <p className="text-white/75 italic">No answers yet.</p>
            ) : (
              <div className="space-y-4">
                {modalAnswers.map((a) => (
                  <div
                    key={a.id}
                    className="rounded-lg p-4 border"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      borderColor: "rgba(255,255,255,0.12)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {a.users?.profile_image ? (
                        <img
                          src={a.users.profile_image}
                          alt={a.users?.name || "User"}
                          className="w-9 h-9 rounded-full border border-white/20 object-cover"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full border flex items-center justify-center text-sm font-bold bg-white/10 border-white/20">
                          {(a.users?.name?.[0] || "?").toUpperCase()}
                        </div>
                      )}

                      <div className="flex-1">
                        <div className="text-sm font-medium text-white/90">
                          {a.users?.name || "Unknown User"}
                        </div>
                        <div className="text-white/60 text-xs">
                          {timeAgo(a.created_at)} • {absoluteDate(a.created_at)}
                        </div>
                      </div>

                      <button
                        onClick={() => likeAnswer(a.id)}
                        className="text-sm px-3 py-1 rounded-md border bg-white/10 hover:bg-white/20"
                      >
                        👍 {a.like_count || 0}
                      </button>
                    </div>

                    <p className="mt-3 text-white/90">{a.content}</p>

                    {/* Comments */}
                    <div className="mt-3">
                      <button
                        onClick={() => toggleComments(a.id)}
                        className="text-xs px-2 py-1 rounded-md border bg-white/10 hover:bg-white/20"
                      >
                        {openComments[a.id] ? "Hide Comments" : "View Comments"}
                      </button>
                    </div>

                    {openComments[a.id] && (
                      <div className="mt-3 space-y-3">
                        {(comments[a.id] || []).map((c) => (
                          <div
                            key={c.id}
                            className="rounded-md p-3 border bg-white/5 border-white/10"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-7 h-7 rounded-full border flex items-center justify-center text-xs bg-white/10 border-white/20">
                                {(c.users?.name?.[0] || "?").toUpperCase()}
                              </div>
                              <div className="text-xs">
                                <div className="font-medium text-white/90">
                                  {c.users?.name || "Unknown"}
                                </div>
                                <div className="text-white/60">
                                  {timeAgo(c.created_at)}
                                </div>
                              </div>
                            </div>
                            <div className="text-sm text-white/90">
                              {c.content}
                            </div>
                          </div>
                        ))}

                        <div className="flex gap-2">
                          <input
                            value={commentInputs[a.id] || ""}
                            onChange={(e) =>
                              setCommentInputs((prev) => ({
                                ...prev,
                                [a.id]: e.target.value,
                              }))
                            }
                            onKeyPress={(e) => e.key === 'Enter' && addComment(a.id)}
                            placeholder="Write a comment…"
                            className="flex-1 rounded-md px-3 py-2 outline-none bg-white/5 border border-white/20 text-white"
                          />
                          <button
                            onClick={() => addComment(a.id)}
                            className="px-3 py-2 rounded-md font-medium bg-yellow-400 text-black"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <BottomNavbar />
    </div>
  );
}