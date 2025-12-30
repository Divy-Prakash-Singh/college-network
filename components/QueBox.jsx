
// import React from "react";
// import { ThumbsUp, MessageCircle } from "lucide-react";


// const QueBox = ({ id, category, que }) => {
//   const avatarIndex = ((id ?? 1) % 70) + 10;
//   const answerAvatarIndex = ((id ?? 2) % 70) + 20;
//   return (
//     <div className="w-full max-w-2xl mx-auto p-4 sm:p-5 mb-6 bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md text-white">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-3">
//         <div className="flex items-center gap-3">
//           <img
//             src={`https://randomuser.me/api/portraits/men/${avatarIndex}.jpg`}
//             alt="profile"
//             className="w-10 h-10 rounded-full border border-white/20"
//           />
//           <div>
//             <div className="text-sm font-medium text-white/90">User {id ?? ""}</div>
//             <div className="text-xs text-white/60">just now</div>
//           </div>
//         </div>
//         <span className="px-2.5 py-1 bg-white/10 border border-white/15 text-white/80 text-xs rounded-full">
//           {category || "General"}
//         </span>
//       </div>

//       {/* Question */}
//       <div className="mb-4">
//         <p className="text-base leading-relaxed text-white/90">{que}</p>
//       </div>

//       {/* Answer Preview */}
//       <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
//         <div className="flex items-center gap-3 mb-3">
//           <img
//             src={`https://randomuser.me/api/portraits/women/${answerAvatarIndex}.jpg`}
//             alt="answer profile"
//             className="w-8 h-8 rounded-full border border-white/20"
//           />
//           <span className="text-sm text-white/80">Answered by User {id ? id + 1 : 2}</span>
//         </div>
//         <p className="text-sm text-white/80">
//           This is a sample answer related to the question. You can replace this with dynamic data later.
//         </p>
//       </div>

//       {/* Footer / Actions */}
//       <div className="flex items-center justify-between mt-4 text-xs text-white/70">
//         <div className="flex gap-3">
//           <span>{Math.floor(Math.random() * 100)} Likes</span>
//           <span>{Math.floor(Math.random() * 20)} Comments</span>
//         </div>
//       </div>
//       <div className="flex justify-around border-t border-white/10 pt-3 mt-3 text-white/80 text-sm">
//         <button className="flex items-center gap-2 hover:text-white transition">
//           <ThumbsUp size={18} /> Like
//         </button>
//         <button className="flex items-center gap-2 hover:text-white transition">
//           <MessageCircle size={18} /> Comment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QueBox;








// "use client";
// import React, { useEffect, useState } from "react";
// import { ThumbsUp, MessageCircle } from "lucide-react";
// import supabase from "@/utils/supabaseClient"; // make sure this path is correct

// const QueBox = ({ id, category, que }) => {
//   const [answers, setAnswers] = useState([]);

//   // Fetch answers for this specific question
//   useEffect(() => {
//     const fetchAnswers = async () => {
//       const { data, error } = await supabase
//         .from("answers")
//         .select("*")
//         .eq("question_id", id); // link answer to question
//       if (error) {
//         console.error("Error fetching answers:", error);
//       } else {
//         setAnswers(data);
//       }
//     };

//     if (id) {
//       fetchAnswers();
//     }
//   }, [id]);

//   const avatarIndex = ((id ?? 1) % 70) + 10;

//   return (
//     <div className="w-full max-w-2xl mx-auto p-4 sm:p-5 mb-6 bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md text-white">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-3">
//         <div className="flex items-center gap-3">
//           <img
//             src={`https://randomuser.me/api/portraits/men/${avatarIndex}.jpg`}
//             alt="profile"
//             className="w-10 h-10 rounded-full border border-white/20"
//           />
//           <div>
//             <div className="text-sm font-medium text-white/90">
//               User {id ?? ""}
//             </div>
//             <div className="text-xs text-white/60">just now</div>
//           </div>
//         </div>
//         <span className="px-2.5 py-1 bg-white/10 border border-white/15 text-white/80 text-xs rounded-full">
//           {category || "General"}
//         </span>
//       </div>

//       {/* Question */}
//       <div className="mb-4">
//         <p className="text-base leading-relaxed text-white/90">{que}</p>
//       </div>

//       {/* Answers */}
//       {answers.length > 0 ? (
//         answers.map((ans, index) => {
//           const answerAvatarIndex = ((ans.id ?? index) % 70) + 20;
//           return (
//             <div
//               key={ans.id}
//               className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10"
//             >
//               <div className="flex items-center gap-3 mb-3">
//                 <img
//                   src={`https://randomuser.me/api/portraits/women/${answerAvatarIndex}.jpg`}
//                   alt="answer profile"
//                   className="w-8 h-8 rounded-full border border-white/20"
//                 />
//                 <span className="text-sm text-white/80">
//                   Answered by User {ans.user_id || "Anonymous"}
//                 </span>
//               </div>
//               <p className="text-sm text-white/80">{ans.answer}</p>
//             </div>
//           );
//         })
//       ) : (
//         <p className="text-sm text-white/60 italic mt-2">
//           No answers yet. Be the first to answer!
//         </p>
//       )}

//       {/* Footer / Actions */}
//       <div className="flex items-center justify-between mt-4 text-xs text-white/70">
//         <div className="flex gap-3">
//           <span>{Math.floor(Math.random() * 100)} Likes</span>
//           <span>{answers.length} Answers</span>
//         </div>
//       </div>
//       <div className="flex justify-around border-t border-white/10 pt-3 mt-3 text-white/80 text-sm">
//         <button className="flex items-center gap-2 hover:text-white transition">
//           <ThumbsUp size={18} /> Like
//         </button>
//         <button className="flex items-center gap-2 hover:text-white transition">
//           <MessageCircle size={18} /> Comment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QueBox;



// "use client";
// import React, { useState } from "react";

// export default function Quebox({ id, category, que }) {
//   const [answer, setAnswer] = useState("");
//   const [submittedAnswers, setSubmittedAnswers] = useState([]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!answer.trim()) return;

//     // Save locally for now
//     setSubmittedAnswers((prev) => [
//       ...prev,
//       { id: Date.now(), text: answer }
//     ]);

//     console.log(`Answer submitted for Question ${id}:`, answer);

//     setAnswer(""); // clear input
//   };

//   return (
//     <div className="w-full max-w-2xl bg-gray-900 text-white p-4 rounded-lg shadow-md mb-6">
//       {/* Question */}
//       <div className="mb-3">
//         <h2 className="text-lg font-semibold">{que}</h2>
//         <p className="text-sm text-gray-400">Category: {category}</p>
//       </div>

//       {/* Answer Input */}
//       <form onSubmit={handleSubmit} className="flex gap-2">
//         <input
//           type="text"
//           value={answer}
//           onChange={(e) => setAnswer(e.target.value)}
//           placeholder="Write your answer..."
//           className="flex-1 p-2 rounded-md border border-gray-700 text-black"
//         />
//         <button
//           type="submit"
//           className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
//         >
//           Submit
//         </button>
//       </form>

//       {/* Show Answers */}
//       {submittedAnswers.length > 0 && (
//         <div className="mt-4">
//           <h3 className="text-md font-semibold mb-2">Answers:</h3>
//           <ul className="space-y-2">
//             {submittedAnswers.map((ans) => (
//               <li
//                 key={ans.id}
//                 className="bg-gray-800 p-2 rounded-md text-sm"
//               >
//                 {ans.text}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }






// "use client";
// import React, { useState, useEffect } from "react";
// import { ThumbsUp, MessageCircle } from "lucide-react";
// import { supabase } from "@/lib/supabaseClient"; // make sure supabase client is configured

// const Quebox = ({ id, category, que }) => {
//   const [answer, setAnswer] = useState("");
//   const [answers, setAnswers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch answers for this question
//   useEffect(() => {
//     const fetchAnswers = async () => {
//       const { data, error } = await supabase
//         .from("answers")
//         .select("*")
//         .eq("question_id", id);

//       if (!error && data) setAnswers(data);
//     };

//     fetchAnswers();
//   }, [id]);

//   // ✅ Submit new answer
//   const handleAnswerSubmit = async (e) => {
//     e.preventDefault();
//     if (!answer.trim()) return;

//     setLoading(true);
//     const { data, error } = await supabase
//       .from("answers")
//       .insert([{ question_id: id, answer }])
//       .select();

//     if (!error && data) {
//       setAnswers((prev) => [...prev, data[0]]);
//       setAnswer(""); // clear input
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="w-full max-w-2xl mx-auto p-4 sm:p-5 mb-6 bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md text-white">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-3">
//         <div>
//           <div className="text-sm font-medium text-white/90">Question #{id}</div>
//           <div className="text-xs text-white/60">{category || "General"}</div>
//         </div>
//       </div>

//       {/* Question */}
//       <div className="mb-4">
//         <p className="text-base leading-relaxed text-white/90">{que}</p>
//       </div>

//       {/* Answer Form */}
//       <form onSubmit={handleAnswerSubmit} className="mt-3 flex gap-2">
//         <input
//           type="text"
//           value={answer}
//           onChange={(e) => setAnswer(e.target.value)}
//           placeholder="Write your answer..."
//           className="flex-1 bg-white/10 border border-white/20 rounded-lg p-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400/60"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition disabled:opacity-50"
//         >
//           {loading ? "Posting..." : "Answer"}
//         </button>
//       </form>

//       {/* Answer List */}
//       <div className="mt-4 space-y-3">
//         {answers.length === 0 ? (
//           <p className="text-sm text-gray-400">No answers yet.</p>
//         ) : (
//           answers.map((ans) => (
//             <div
//               key={ans.id}
//               className="p-3 rounded-lg bg-white/10 border border-white/20"
//             >
//               <p className="text-sm text-white/90">{ans.answer}</p>
//               <p className="text-xs text-gray-400 mt-1">Answered just now</p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Quebox;








// "use client";
// import { useState, useContext } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import { AuthContext } from "@/lib/AuthProvider";

// export default function QueBox({ id, category, que }) {
//   const { currentUser } = useContext(AuthContext);
//   const [answer, setAnswer] = useState("");
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!answer.trim()) return;

//     const { error } = await supabase.from("answers").insert([
//       {
//         question_id: id,
//         answer_text: answer,
//         mentor_id: currentUser.id,
//       },
//     ]);

//     if (!error) {
//       setSubmitted(true);
//       setAnswer("");
//     }
//   };

//   return (
//     <div className="bg-white/5 p-4 rounded-xl border border-white/10 w-full">
//       <h3 className="text-lg font-semibold text-yellow-300">{que}</h3>
//       <p className="text-xs text-yellow-400 mt-1">{category}</p>

//       {/* Only mentors see the answer form */}
//       {currentUser?.is_mentor ? (
//         <form onSubmit={handleSubmit} className="mt-3">
//           <textarea
//             value={answer}
//             onChange={(e) => setAnswer(e.target.value)}
//             placeholder="Write your answer..."
//             className="w-full p-2 rounded-md border border-gray-700 bg-transparent text-white"
//           />
//           <button
//             type="submit"
//             className="mt-2 bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400"
//           >
//             Submit Answer
//           </button>
//           {submitted && (
//             <p className="text-green-400 text-sm mt-1">Answer submitted!</p>
//           )}
//         </form>
//       ) : (
//         <p className="text-gray-400 text-sm mt-2 italic">
//           Only mentors can answer this question.
//         </p>
//       )}
//     </div>
//   );
// }









// "use client";
// import { useState, useEffect, useContext } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import { AuthContext } from "@/lib/AuthProvider";

// export default function QueBox({ id, category, que }) {
//   const { currentUser } = useContext(AuthContext);
//   const [answer, setAnswer] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const [answers, setAnswers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // fetch all answers for this question
//   useEffect(() => {
//     const fetchAnswers = async () => {
//       const { data, error } = await supabase
//         .from("answers")
//         .select("id, answer_text, created_at, mentor_id, users(name)")
//         .eq("question_id", id)
//         .order("created_at", { ascending: false });

//       if (!error && data) {
//         setAnswers(data);
//       }
//       setLoading(false);
//     };

//     fetchAnswers();
//   }, [id, submitted]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!answer.trim()) return;

//     const { error } = await supabase.from("answers").insert([
//       {
//         question_id: id,
//         answer_text: answer,
//         mentor_id: currentUser.id,
//       },
//     ]);

//     if (!error) {
//       setSubmitted((prev) => !prev); // trigger refresh
//       setAnswer("");
//     }
//   };

//   return (
//     <div className="bg-white/5 p-4 rounded-xl border border-white/10 w-full">
//       {/* Question */}
//       <h3 className="text-lg font-semibold text-yellow-300">{que}</h3>
//       <p className="text-xs text-yellow-400 mt-1">{category}</p>

//       {/* Mentor Answer Form */}
//       {currentUser?.is_mentor ? (
//         <form onSubmit={handleSubmit} className="mt-3">
//           <textarea
//             value={answer}
//             onChange={(e) => setAnswer(e.target.value)}
//             placeholder="Write your answer..."
//             className="w-full p-2 rounded-md border border-gray-700 bg-transparent text-white"
//           />
//           <button
//             type="submit"
//             className="mt-2 bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400"
//           >
//             Submit Answer
//           </button>
//         </form>
//       ) : (
//         <p className="text-gray-400 text-sm mt-2 italic">
//           Only mentors can answer this question.
//         </p>
//       )}

//       {/* Answer List */}
//       <div className="mt-4">
//         <h4 className="text-md font-semibold text-white/80 mb-2">Answers</h4>
//         {loading ? (
//           <p className="text-gray-400 text-sm">Loading answers...</p>
//         ) : answers.length === 0 ? (
//           <p className="text-gray-400 text-sm">No answers yet.</p>
//         ) : (
//           <ul className="space-y-3">
//             {answers.map((ans) => (
//               <li
//                 key={ans.id}
//                 className="p-3 bg-white/10 rounded-md border border-white/20"
//               >
//                 <p className="text-white/90 text-sm">{ans.answer_text}</p>
//                 <p className="text-xs text-gray-400 mt-1">
//                   Answered by {ans.users?.name || "Mentor"} on{" "}
//                   {new Date(ans.created_at).toLocaleString()}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }



// "use client";
// import { useState, useEffect, useContext } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import { AuthContext } from "@/lib/AuthProvider";

// export default function Quebox({ id, category, que }) {
//   const { currentUser } = useContext(AuthContext);
//   const [answer, setAnswer] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const [answers, setAnswers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // fetch all answers for this question
//   useEffect(() => {
//     const fetchAnswers = async () => {
//       const { data, error } = await supabase
//         .from("answers")
//         .select("id, content, created_at, author_id, users!inner(name)")
//         .eq("question_id", id)
//         .order("created_at", { ascending: false });

//       if (!error && data) setAnswers(data);
//       setLoading(false);
//     };

//     fetchAnswers();
//   }, [id, submitted]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!answer.trim()) return;

//     const { error } = await supabase.from("answers").insert([
//       {
//         question_id: id,
//         author_id: currentUser.id,
//         content: answer,
//       },
//     ]);

//     if (!error) {
//       setSubmitted((prev) => !prev); // trigger refresh
//       setAnswer("");
//     }
//   };

//   return (
//     <div className="bg-white/5 p-4 rounded-xl border border-white/10 w-full">
//       <h3 className="text-lg font-semibold text-yellow-300">{que}</h3>
//       <p className="text-xs text-yellow-400 mt-1">{category}</p>

//       {currentUser?.is_mentor ? (
//         <form onSubmit={handleSubmit} className="mt-3">
//           <textarea
//             value={answer}
//             onChange={(e) => setAnswer(e.target.value)}
//             placeholder="Write your answer..."
//             className="w-full p-2 rounded-md border border-gray-700 bg-transparent text-white"
//           />
//           <button
//             type="submit"
//             className="mt-2 bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400"
//           >
//             Submit Answer
//           </button>
//         </form>
//       ) : (
//         <p className="text-gray-400 text-sm mt-2 italic">
//           Only mentors can answer this question.
//         </p>
//       )}

//       <div className="mt-4">
//         <h4 className="text-md font-semibold text-white/80 mb-2">Answers</h4>
//         {loading ? (
//           <p className="text-gray-400 text-sm">Loading answers...</p>
//         ) : answers.length === 0 ? (
//           <p className="text-gray-400 text-sm">No answers yet.</p>
//         ) : (
//           <ul className="space-y-3">
//             {answers.map((ans) => (
//               <li
//                 key={ans.id}
//                 className="p-3 bg-white/10 rounded-md border border-white/20"
//               >
//                 <p className="text-white/90 text-sm">{ans.content}</p>
//                 <p className="text-xs text-gray-400 mt-1">
//                   Answered by {ans.users?.name || "Mentor"} on{" "}
//                   {new Date(ans.created_at).toLocaleString()}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }




// "use client";
// import { useState, useEffect, useContext } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import { AuthContext } from "@/lib/AuthProvider";

// export default function QueBox({ id, category, que }) {
//   const { currentUser } = useContext(AuthContext);
//   const [answer, setAnswer] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const [answers, setAnswers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // fetch all answers for this question
//   useEffect(() => {
//     const fetchAnswers = async () => {
//       const { data, error } = await supabase
//         .from("answers")
//         .select("id, content, created_at, author_id, users!inner(name)")
//         .eq("question_id", id)
//         .order("created_at", { ascending: false });

//       if (!error && data) setAnswers(data);
//       setLoading(false);
//     };

//     fetchAnswers();
//   }, [id, submitted]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!answer.trim()) return;

//     const { error } = await supabase.from("answers").insert([
//       {
//         question_id: id,
//         author_id: currentUser.id,
//         content: answer,
//       },
//     ]);

//     if (!error) {
//       setSubmitted((prev) => !prev); // trigger refresh
//       setAnswer("");
//     }
//   };

//   return (
//     <div className="bg-white/5 p-4 rounded-xl border border-white/10 w-full">
//       <h3 className="text-lg font-semibold text-yellow-300">{que}</h3>
//       <p className="text-xs text-yellow-400 mt-1">{category}</p>

//       {currentUser?.is_mentor ? (
//         <form onSubmit={handleSubmit} className="mt-3">
//           <textarea
//             value={answer}
//             onChange={(e) => setAnswer(e.target.value)}
//             placeholder="Write your answer..."
//             className="w-full p-2 rounded-md border border-gray-700 bg-transparent text-white"
//           />
//           <button
//             type="submit"
//             className="mt-2 bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400"
//           >
//             Submit Answer
//           </button>
//         </form>
//       ) : (
//         <p className="text-gray-400 text-sm mt-2 italic">
//           Only mentors can answer this question.
//         </p>
//       )}

//       <div className="mt-4">
//         <h4 className="text-md font-semibold text-white/80 mb-2">Answers</h4>
//         {loading ? (
//           <p className="text-gray-400 text-sm">Loading answers...</p>
//         ) : answers.length === 0 ? (
//           <p className="text-gray-400 text-sm">No answers yet.</p>
//         ) : (
//           <ul className="space-y-3">
//             {answers.map((ans) => (
//               <li
//                 key={ans.id}
//                 className="p-3 bg-white/10 rounded-md border border-white/20"
//               >
//                 <p className="text-white/90 text-sm">{ans.content}</p>
//                 <p className="text-xs text-gray-400 mt-1">
//                   Answered by {ans.users?.name || "Mentor"} on{" "}
//                   {new Date(ans.created_at).toLocaleString()}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }









// "use client";
// import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabaseClient";

// export default function QueBox({ id, category, que }) {
//   const [answer, setAnswer] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const [answers, setAnswers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch all answers for this question
//   useEffect(() => {
//     const fetchAnswers = async () => {
//       const { data, error } = await supabase
//         .from("answers")
//         .select("id, content, created_at")
//         .eq("question_id", id)
//         .order("created_at", { ascending: false });

//       if (!error && data) setAnswers(data);
//       setLoading(false);
//     };

//     fetchAnswers();
//   }, [id, submitted]);

//   // ✅ Allow answering without auth
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!answer.trim()) return;

//     const { error } = await supabase.from("answers").insert([
//       {
//         question_id: id,
//         author_id: null, // no user auth
//         content: answer,
//       },
//     ]);

//     if (!error) {
//       setSubmitted((prev) => !prev);
//       setAnswer("");
//     }
//   };

//   return (
//     <div className="bg-white/5 p-4 rounded-xl border border-white/10 w-full">
//       <h3 className="text-lg font-semibold text-yellow-300">{que}</h3>
//       <p className="text-xs text-yellow-400 mt-1">{category}</p>

//       {/* ✅ Answer box always visible */}
//       <form onSubmit={handleSubmit} className="mt-3">
//         <textarea
//           value={answer}
//           onChange={(e) => setAnswer(e.target.value)}
//           placeholder="Write your answer..."
//           className="w-full p-2 rounded-md border border-gray-700 bg-transparent text-white"
//         />
//         <button
//           type="submit"
//           className="mt-2 bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400"
//         >
//           Submit Answer
//         </button>
//       </form>

//       <div className="mt-4">
//         <h4 className="text-md font-semibold text-white/80 mb-2">Answers</h4>
//         {loading ? (
//           <p className="text-gray-400 text-sm">Loading answers...</p>
//         ) : answers.length === 0 ? (
//           <p className="text-gray-400 text-sm">No answers yet.</p>
//         ) : (
//           <ul className="space-y-3">
//             {answers.map((ans) => (
//               <li
//                 key={ans.id}
//                 className="p-3 bg-white/10 rounded-md border border-white/20"
//               >
//                 <p className="text-white/90 text-sm">{ans.content}</p>
//                 <p className="text-xs text-gray-400 mt-1">
//                   Answered by Anonymous on{" "}
//                   {new Date(ans.created_at).toLocaleString()}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }









// "use client";
// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabaseClient";

// export default function QueBox({ id, category, que, onOpenModal }) {
//   const [topAnswer, setTopAnswer] = useState(null);

//   // Fetch top liked answer for preview
//   useEffect(() => {
//     const fetchTopAnswer = async () => {
//       // 1) Get all answers for this question
//       const { data: answers, error: ansError } = await supabase
//         .from("answers")
//         .select("id, content")
//         .eq("question_id", id);

//       if (ansError || !answers.length) return;

//       // 2) For each answer, count likes
//       const answersWithLikes = await Promise.all(
//         answers.map(async (ans) => {
//           const { count } = await supabase
//             .from("answer_likes")
//             .select("*", { count: "exact", head: true })
//             .eq("answer_id", ans.id);
//           return { ...ans, likes: count || 0 };
//         })
//       );

//       // 3) Sort by likes desc
//       answersWithLikes.sort((a, b) => b.likes - a.likes);

//       setTopAnswer(answersWithLikes[0]); // highest liked answer
//     };

//     fetchTopAnswer();
//   }, [id]);

//   // Shorten preview to ~200 chars
//   const getPreviewText = (text) => {
//     if (!text) return "";
//     return text.length > 200 ? text.substring(0, 200) + "..." : text;
//   };

//   return (
//     <div className="bg-white/5 p-4 rounded-xl border border-white/10 w-full">
//       {/* Question Title */}
//       <h3 className="text-lg font-semibold text-yellow-300">{que}</h3>
//       <p className="text-xs text-yellow-400 mt-1">{category}</p>

//       {/* Preview top answer */}
//       {topAnswer && (
//         <div className="mt-3 p-3 bg-white/10 rounded-lg">
//           <p className="text-sm text-gray-200">
//             {getPreviewText(topAnswer.content)}
//           </p>
//           <p className="text-xs text-gray-400 mt-1">
//             {topAnswer.likes} likes • top answer
//           </p>
//         </div>
//       )}

//       {/* VIEW FULL DETAILS BUTTON */}
//       <div className="mt-4 text-right">
//         <button
//           onClick={() => onOpenModal({ id, category, que })}
//           className="text-yellow-400 hover:underline text-sm"
//         >
//           View Details →
//         </button>
//       </div>
//     </div>
//   );
// }












// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { supabase } from "@/lib/supabaseClient";

// // TEMP: fixed user until auth finishes
// const DEFAULT_USER_ID = "25e8f399-a8d1-464b-a5dd-314b6d0a78ab";

// // --- small utils ---
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

// const Avatar = ({ name, src, size = 40 }) => {
//   const initial = (name?.[0] || "?").toUpperCase();
//   if (src) {
//     return (
//       <img
//         src={src}
//         alt={name || "User"}
//         width={size}
//         height={size}
//         className="rounded-full border border-[rgba(255,255,255,0.2)] object-cover"
//         style={{ width: size, height: size }}
//       />
//     );
//   }
//   return (
//     <div
//       className="rounded-full flex items-center justify-center border border-[rgba(255,255,255,0.2)] text-[rgba(255,255,255,0.85)]"
//       style={{
//         width: size,
//         height: size,
//         background: "rgba(255,255,255,0.08)",
//         fontWeight: 700,
//       }}
//     >
//       {initial}
//     </div>
//   );
// };

// export default function QueBox({ id, category, que, title,image, user, onOpenModal }) {
//   const [answerText, setAnswerText] = useState("");
//   const [topAnswer, setTopAnswer] = useState(null);
//   const [answerCount, setAnswerCount] = useState(0);
//   const [loadingPreview, setLoadingPreview] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   const askerName = user?.name || "Unknown User";
//   const askerAvatar = user?.profile_image || null;

//   // Fetch preview: top liked answer + total count
//   useEffect(() => {
//     let cancelled = false;

//     const fetchPreview = async () => {
//       setLoadingPreview(true);

//       // 1) get all answers for this question
//       const { data: answers, error } = await supabase
//         .from("answers")
//         .select("id, content, author_id, created_at")
//         .eq("question_id", id);

//       if (error) {
//         console.error("answers fetch error:", error);
//         setTopAnswer(null);
//         setAnswerCount(0);
//         setLoadingPreview(false);
//         return;
//       }

//       setAnswerCount(answers?.length || 0);

//       if (!answers || answers.length === 0) {
//         setTopAnswer(null);
//         setLoadingPreview(false);
//         return;
//       }

//       // 2) for each answer, fetch its like count (simple + reliable)
//       const withLikes = await Promise.all(
//         answers.map(async (a) => {
//           const { count } = await supabase
//             .from("answer_likes")
//             .select("*", { count: "exact", head: true })
//             .eq("answer_id", a.id);
//           return { ...a, like_count: count || 0 };
//         })
//       );

//       // 3) sort by like_count desc, then created_at desc
//       withLikes.sort((a, b) => {
//         if (b.like_count !== a.like_count) return b.like_count - a.like_count;
//         return new Date(b.created_at) - new Date(a.created_at);
//       });

//       const best = withLikes[0];

//       // 4) fetch author for best answer
//       let author = null;
//       if (best?.author_id) {
//         const { data: u } = await supabase
//           .from("users")
//           .select("id, name, profile_image")
//           .eq("id", best.author_id)
//           .single();
//         author = u || null;
//       }

//       if (!cancelled) {
//         setTopAnswer({ ...best, author });
//         setLoadingPreview(false);
//       }
//     };

//     fetchPreview();
//     return () => {
//       cancelled = true;
//     };
//   }, [id]);

//   // Submit a new answer (temp: always allowed, uses fixed user)
//   const submitAnswer = async (e) => {
//     e.preventDefault();
//     if (!answerText.trim()) return;
//     setSubmitting(true);
//     const { error } = await supabase.from("answers").insert([
//       {
//         question_id: id,
//         author_id: DEFAULT_USER_ID, // TEMP: fixed user until auth
//         content: answerText.trim(),
//       },
//     ]);
//     setSubmitting(false);
//     if (error) {
//       alert("Failed to post answer: " + error.message);
//       return;
//     }
//     setAnswerText("");
//     // refresh preview
//     // (quick way: re-run effect by touching state)
//     setLoadingPreview(true);
//     // force refresh by toggling a flag — simplest:
//     // re-run the preview logic by just calling it again
//     // (we'll rely on useEffect to refetch on id change — instead, hack:)
//     // no-op: change id is not possible, so trigger a manual refetch:
//     // easiest: just call fetch again by updating a dummy state, but to keep code simple:
//     // do a minimal inline refresh here:
//     // Optionally, you can window.location.reload(), but we won't.
//     // We'll just re-run the hook by a tiny setTimeout that sets loading false after preview effect above runs again
//     // For stability, let's just re-run the core preview block here:
//     (async () => {
//       const { data: answers } = await supabase
//         .from("answers")
//         .select("id, content, author_id, created_at")
//         .eq("question_id", id);

//       setAnswerCount(answers?.length || 0);
//       if (!answers || answers.length === 0) {
//         setTopAnswer(null);
//         setLoadingPreview(false);
//         return;
//       }
//       const withLikes = await Promise.all(
//         answers.map(async (a) => {
//           const { count } = await supabase
//             .from("answer_likes")
//             .select("*", { count: "exact", head: true })
//             .eq("answer_id", a.id);
//           return { ...a, like_count: count || 0 };
//         })
//       );
//       withLikes.sort((a, b) => {
//         if (b.like_count !== a.like_count) return b.like_count - a.like_count;
//         return new Date(b.created_at) - new Date(a.created_at);
//       });
//       const best = withLikes[0];

//       let author = null;
//       if (best?.author_id) {
//         const { data: u } = await supabase
//           .from("users")
//           .select("id, name, profile_image")
//           .eq("id", best.author_id)
//           .single();
//         author = u || null;
//       }
//       setTopAnswer({ ...best, author });
//       setLoadingPreview(false);
//     })();
//   };

//   const truncated = useMemo(() => {
//     if (!topAnswer?.content) return "";
//     const max = 220; // ~2-3 lines
//     return topAnswer.content.length > max
//       ? topAnswer.content.slice(0, max) + "…"
//       : topAnswer.content;
//   }, [topAnswer]);

//   return (
//     <div
//       className="w-full max-w-2xl mx-auto p-4 md:p-5 mb-6 rounded-xl border shadow-lg"
//       style={{
//         background: "rgba(255,255,255,0.05)",
//         borderColor: "rgba(255,255,255,0.1)",
//       }}
//     >
//       {/* Header (asker) */}
//       <div className="flex items-center justify-between mb-3">
//         <div className="flex items-center gap-3">
//           <Avatar name={askerName} src={askerAvatar} size={40} />
//           <div>
//             <div className="text-[rgba(255,255,255,0.92)] text-sm font-medium">
//               {askerName}
//             </div>
//             {/* If you have created_at here, you can show it; else hide */}
//             {/* <div className="text-[rgba(255,255,255,0.6)] text-xs">just now</div> */}
//           </div>
//         </div>
//         <span
//           className="px-2.5 py-1 text-xs rounded-full"
//           style={{
//             background: "rgba(255,255,255,0.08)",
//             border: "1px solid rgba(255,255,255,0.15)",
//             color: "rgba(255,255,255,0.85)",
//           }}
//         >
//           {category || "General"}
//         </span>
//       </div>

//       {/* Title + Question */}
//       {title ? (
//         <h3 className="text-lg font-semibold text-[#FDE68A]">{title}</h3>
//       ) : null}
//       <p className="text-[rgba(255,255,255,0.9)] mt-1">{que}</p>

//       {/* Show image if exists */}
// {image && (
//   <img
//     src={image}
//     alt="question attachment"
//     className="mt-3 w-full rounded-lg object-cover border border-white/20"
//   />
// )}


//       {/* Top answer preview or CTA */}
//       <div
//         className="mt-4 p-4 rounded-lg"
//         style={{
//           background: "rgba(255,255,255,0.06)",
//           border: "1px solid rgba(255,255,255,0.12)",
//         }}
//       >
//         {loadingPreview ? (
//           <p className="text-[rgba(255,255,255,0.7)] text-sm">Loading preview…</p>
//         ) : answerCount === 0 ? (
//           <p className="text-[rgba(255,255,255,0.75)] text-sm italic">
//             Be the first to answer this question.
//           </p>
//         ) : (
//           <>
//             <div className="flex items-center gap-3 mb-2">
//               <Avatar
//                 name={topAnswer?.author?.name || "Unknown"}
//                 src={topAnswer?.author?.profile_image || null}
//                 size={32}
//               />
//               <div className="text-sm">
//                 <div className="text-[rgba(255,255,255,0.9)] font-medium">
//                   {topAnswer?.author?.name || "Unknown User"}
//                 </div>
//                 <div className="text-[rgba(255,255,255,0.6)] text-xs">
//                   {timeAgo(topAnswer?.created_at)} • {absoluteDate(topAnswer?.created_at)}
//                 </div>
//               </div>
//               <div className="ml-auto text-xs text-[rgba(255,255,255,0.75)]">
//                 👍 {topAnswer?.like_count || 0}
//               </div>
//             </div>
//             <p className="text-[rgba(255,255,255,0.85)] text-sm">{truncated}</p>
//           </>
//         )}
//       </div>

//       {/* Actions */}
//       <div className="flex items-center justify-between mt-3">
//         <div className="text-xs text-[rgba(255,255,255,0.7)]">
//           {answerCount} answer{answerCount === 1 ? "" : "s"}
//         </div>
//         {answerCount > 0 && (
//           <button
//             onClick={() =>
//               onOpenModal?.({
//                 id,
//                 category,
//                 que,
//                 title,
//               })
//             }
//             className="px-3 py-2 text-sm rounded-lg"
//             style={{
//               background: "rgba(255,255,255,0.1)",
//               border: "1px solid rgba(255,255,255,0.15)",
//               color: "rgba(255,255,255,0.95)",
//             }}
//           >
//             View Details
//           </button>
//         )}
//       </div>

//       {/* Inline answer form */}
//       <form onSubmit={submitAnswer} className="mt-4">
//         <textarea
//           value={answerText}
//           onChange={(e) => setAnswerText(e.target.value)}
//           placeholder="Write your answer…"
//           className="w-full rounded-lg p-3 outline-none"
//           style={{
//             background: "rgba(255,255,255,0.06)",
//             border: "1px solid rgba(255,255,255,0.2)",
//             color: "white",
//           }}
//           rows={3}
//         />
//         <div className="flex justify-end mt-2">
//           <button
//             disabled={submitting || !answerText.trim()}
//             className="px-4 py-2 rounded-lg font-medium disabled:opacity-60"
//             style={{
//               background: "#FDE047",
//               color: "#111827",
//             }}
//           >
//             {submitting ? "Posting…" : "Post Answer"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }









// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { supabase } from "@/lib/supabaseClient";

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

// const Avatar = ({ name, src, size = 40 }) => {
//   const initial = (name?.[0] || "?").toUpperCase();
//   if (src) {
//     return (
//       <img
//         src={src}
//         alt={name || "User"}
//         width={size}
//         height={size}
//         className="rounded-full border border-[rgba(255,255,255,0.2)] object-cover"
//         style={{ width: size, height: size }}
//       />
//     );
//   }
//   return (
//     <div
//       className="rounded-full flex items-center justify-center border border-[rgba(255,255,255,0.2)] text-[rgba(255,255,255,0.85)]"
//       style={{
//         width: size,
//         height: size,
//         background: "rgba(255,255,255,0.08)",
//         fontWeight: 700,
//       }}
//     >
//       {initial}
//     </div>
//   );
// };

// export default function QueBox({ id, category, que, title, image, user, onOpenModal }) {
//   const [answerText, setAnswerText] = useState("");
//   const [topAnswer, setTopAnswer] = useState(null);
//   const [answerCount, setAnswerCount] = useState(0);
//   const [loadingPreview, setLoadingPreview] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [isMentor, setIsMentor] = useState(false);
//   const [checkingMentor, setCheckingMentor] = useState(true);
//   const [currentUserId, setCurrentUserId] = useState(null);

//   const askerName = user?.name || "Unknown User";
//   const askerAvatar = user?.profile_image || null;

//   // Check if user is a mentor
//   useEffect(() => {
//     let mounted = true;

//     const checkMentorStatus = async () => {
//       try {
//         const { data: { user: authUser }, error: userError } = await supabase.auth.getUser();
        
//         if (userError || !authUser) {
//           if (mounted) {
//             setIsMentor(false);
//             setCheckingMentor(false);
//             setCurrentUserId(null);
//           }
//           return;
//         }

//         if (mounted) {
//           setCurrentUserId(authUser.id);
//         }

//         const { data: userData, error: dbError } = await supabase
//           .from('users')
//           .select('is_mentor')
//           .eq('id', authUser.id)
//           .single();

//         if (dbError) {
//           console.error('Error fetching user data:', dbError);
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
//   }, []);

//   // Fetch preview: top liked answer + total count
//   useEffect(() => {
//     let cancelled = false;
//     let timeoutId;

//     const fetchPreview = async () => {
//       setLoadingPreview(true);

//       try {
//         // Add timeout to prevent hanging
//         const timeoutPromise = new Promise((_, reject) =>
//           setTimeout(() => reject(new Error('Request timeout')), 10000)
//         );

//         const fetchPromise = supabase
//           .from("answers")
//           .select("id, content, author_id, created_at")
//           .eq("question_id", id);

//         const { data: answers, error } = await Promise.race([fetchPromise, timeoutPromise]);

//         if (cancelled) return;

//         if (error) {
//           console.error("answers fetch error:", error);
//           setTopAnswer(null);
//           setAnswerCount(0);
//           setLoadingPreview(false);
//           return;
//         }

//         setAnswerCount(answers?.length || 0);

//         if (!answers || answers.length === 0) {
//           setTopAnswer(null);
//           setLoadingPreview(false);
//           return;
//         }

//         // Fetch like counts for each answer
//         const withLikes = await Promise.all(
//           answers.map(async (a) => {
//             const { count } = await supabase
//               .from("answer_likes")
//               .select("*", { count: "exact", head: true })
//               .eq("answer_id", a.id);
//             return { ...a, like_count: count || 0 };
//           })
//         );

//         if (cancelled) return;

//         // Sort by like_count desc, then created_at desc
//         withLikes.sort((a, b) => {
//           if (b.like_count !== a.like_count) return b.like_count - a.like_count;
//           return new Date(b.created_at) - new Date(a.created_at);
//         });

//         const best = withLikes[0];

//         // Fetch author for best answer
//         let author = null;
//         if (best?.author_id) {
//           const { data: u } = await supabase
//             .from("users")
//             .select("id, name, profile_image")
//             .eq("id", best.author_id)
//             .single();
//           author = u || null;
//         }

//         if (!cancelled) {
//           setTopAnswer({ ...best, author });
//           setLoadingPreview(false);
//         }
//       } catch (err) {
//         if (!cancelled) {
//           console.error('Error fetching preview:', err);
//           setTopAnswer(null);
//           setAnswerCount(0);
//           setLoadingPreview(false);
//         }
//       }
//     };

//     fetchPreview();

//     return () => {
//       cancelled = true;
//       if (timeoutId) clearTimeout(timeoutId);
//     };
//   }, [id]);

//   // Submit a new answer
//   const submitAnswer = async (e) => {
//     e.preventDefault();
    
//     if (!answerText.trim()) {
//       alert("Please write an answer");
//       return;
//     }

//     if (!currentUserId) {
//       alert("Please login to answer");
//       return;
//     }

//     if (!isMentor) {
//       alert("Only mentors can answer questions");
//       return;
//     }

//     setSubmitting(true);

//     try {
//       const timeoutPromise = new Promise((_, reject) =>
//         setTimeout(() => reject(new Error('Request timeout')), 10000)
//       );

//       const insertPromise = supabase.from("answers").insert([
//         {
//           question_id: id,
//           author_id: currentUserId,
//           content: answerText.trim(),
//         },
//       ]);

//       const { error } = await Promise.race([insertPromise, timeoutPromise]);

//       if (error) {
//         console.error('Insert error:', error);
//         if (error.code === '42501') {
//           alert("Permission denied. Please ensure you are a mentor.");
//         } else {
//           alert("Failed to post answer: " + error.message);
//         }
//         setSubmitting(false);
//         return;
//       }

//       setAnswerText("");
      
//       // Refresh preview
//       const { data: answers } = await supabase
//         .from("answers")
//         .select("id, content, author_id, created_at")
//         .eq("question_id", id);

//       setAnswerCount(answers?.length || 0);

//       if (!answers || answers.length === 0) {
//         setTopAnswer(null);
//         setLoadingPreview(false);
//         setSubmitting(false);
//         return;
//       }

//       const withLikes = await Promise.all(
//         answers.map(async (a) => {
//           const { count } = await supabase
//             .from("answer_likes")
//             .select("*", { count: "exact", head: true })
//             .eq("answer_id", a.id);
//           return { ...a, like_count: count || 0 };
//         })
//       );

//       withLikes.sort((a, b) => {
//         if (b.like_count !== a.like_count) return b.like_count - a.like_count;
//         return new Date(b.created_at) - new Date(a.created_at);
//       });

//       const best = withLikes[0];

//       let author = null;
//       if (best?.author_id) {
//         const { data: u } = await supabase
//           .from("users")
//           .select("id, name, profile_image")
//           .eq("id", best.author_id)
//           .single();
//         author = u || null;
//       }

//       setTopAnswer({ ...best, author });
//       setLoadingPreview(false);
//       setSubmitting(false);
      
//       alert("Answer posted successfully!");
//     } catch (err) {
//       console.error('Error submitting answer:', err);
//       if (err.message === 'Request timeout') {
//         alert('Request timed out. Please check your connection and try again.');
//       } else {
//         alert('Failed to post answer. Please try again.');
//       }
//       setSubmitting(false);
//     }
//   };

//   const truncated = useMemo(() => {
//     if (!topAnswer?.content) return "";
//     const max = 220;
//     return topAnswer.content.length > max
//       ? topAnswer.content.slice(0, max) + "…"
//       : topAnswer.content;
//   }, [topAnswer]);

//   return (
//     <div
//       className="w-full max-w-2xl mx-auto p-4 md:p-5 mb-6 rounded-xl border shadow-lg"
//       style={{
//         background: "rgba(255,255,255,0.05)",
//         borderColor: "rgba(255,255,255,0.1)",
//       }}
//     >
//       {/* Header (asker) */}
//       <div className="flex items-center justify-between mb-3">
//         <div className="flex items-center gap-3">
//           <Avatar name={askerName} src={askerAvatar} size={40} />
//           <div>
//             <div className="text-[rgba(255,255,255,0.92)] text-sm font-medium">
//               {askerName}
//             </div>
//           </div>
//         </div>
//         <span
//           className="px-2.5 py-1 text-xs rounded-full"
//           style={{
//             background: "rgba(255,255,255,0.08)",
//             border: "1px solid rgba(255,255,255,0.15)",
//             color: "rgba(255,255,255,0.85)",
//           }}
//         >
//           {category || "General"}
//         </span>
//       </div>

//       {/* Title + Question */}
//       {title && (
//         <h3 className="text-lg font-semibold text-[#FDE68A]">{title}</h3>
//       )}
//       <p className="text-[rgba(255,255,255,0.9)] mt-1">{que}</p>

//       {/* Show image if exists */}
//       {image && (
//         <img
//           src={image}
//           alt="question attachment"
//           className="mt-3 w-full rounded-lg object-cover border border-white/20"
//         />
//       )}

//       {/* Top answer preview or CTA */}
//       <div
//         className="mt-4 p-4 rounded-lg"
//         style={{
//           background: "rgba(255,255,255,0.06)",
//           border: "1px solid rgba(255,255,255,0.12)",
//         }}
//       >
//         {loadingPreview ? (
//           <p className="text-[rgba(255,255,255,0.7)] text-sm">Loading preview…</p>
//         ) : answerCount === 0 ? (
//           <p className="text-[rgba(255,255,255,0.75)] text-sm italic">
//             Be the first to answer this question.
//           </p>
//         ) : (
//           <>
//             <div className="flex items-center gap-3 mb-2">
//               <Avatar
//                 name={topAnswer?.author?.name || "Unknown"}
//                 src={topAnswer?.author?.profile_image || null}
//                 size={32}
//               />
//               <div className="text-sm">
//                 <div className="text-[rgba(255,255,255,0.9)] font-medium">
//                   {topAnswer?.author?.name || "Unknown User"}
//                 </div>
//                 <div className="text-[rgba(255,255,255,0.6)] text-xs">
//                   {timeAgo(topAnswer?.created_at)} • {absoluteDate(topAnswer?.created_at)}
//                 </div>
//               </div>
//               <div className="ml-auto text-xs text-[rgba(255,255,255,0.75)]">
//                 👍 {topAnswer?.like_count || 0}
//               </div>
//             </div>
//             <p className="text-[rgba(255,255,255,0.85)] text-sm">{truncated}</p>
//           </>
//         )}
//       </div>

//       {/* Actions */}
//       <div className="flex items-center justify-between mt-3">
//         <div className="text-xs text-[rgba(255,255,255,0.7)]">
//           {answerCount} answer{answerCount === 1 ? "" : "s"}
//         </div>
//         {answerCount > 0 && (
//           <button
//             onClick={() =>
//               onOpenModal?.({
//                 id,
//                 category,
//                 que,
//                 title,
//               })
//             }
//             className="px-3 py-2 text-sm rounded-lg"
//             style={{
//               background: "rgba(255,255,255,0.1)",
//               border: "1px solid rgba(255,255,255,0.15)",
//               color: "rgba(255,255,255,0.95)",
//             }}
//           >
//             View Details
//           </button>
//         )}
//       </div>

//       {/* Inline answer form - only show if mentor */}
//       {!checkingMentor && (
//         <>
//           {isMentor ? (
//             <form onSubmit={submitAnswer} className="mt-4">
//               <textarea
//                 value={answerText}
//                 onChange={(e) => setAnswerText(e.target.value)}
//                 placeholder="Write your answer…"
//                 className="w-full rounded-lg p-3 outline-none"
//                 style={{
//                   background: "rgba(255,255,255,0.06)",
//                   border: "1px solid rgba(255,255,255,0.2)",
//                   color: "white",
//                 }}
//                 rows={3}
//                 disabled={submitting}
//               />
//               <div className="flex justify-end mt-2">
//                 <button
//                   type="submit"
//                   disabled={submitting || !answerText.trim()}
//                   className="px-4 py-2 rounded-lg font-medium disabled:opacity-60 transition-opacity"
//                   style={{
//                     background: "#FDE047",
//                     color: "#111827",
//                   }}
//                 >
//                   {submitting ? "Posting…" : "Post Answer"}
//                 </button>
//               </div>
//             </form>
//           ) : (
//             <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
//               <p className="text-yellow-200 text-sm">
//                 Only mentors can answer questions.
//               </p>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }





















// components/QueBox.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

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

const Avatar = ({ name, src, size = 40 }) => {
  const initial = (name?.[0] || "?").toUpperCase();
  if (src) {
    return (
      <img
        src={src}
        alt={name || "User"}
        width={size}
        height={size}
        className="rounded-full border border-[rgba(255,255,255,0.2)] object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="rounded-full flex items-center justify-center border border-[rgba(255,255,255,0.2)] text-[rgba(255,255,255,0.85)]"
      style={{
        width: size,
        height: size,
        background: "rgba(255,255,255,0.08)",
        fontWeight: 700,
      }}
    >
      {initial}
    </div>
  );
};

export default function QueBox({ id, category, que, title, image, user, onOpenModal }) {
  const [answerText, setAnswerText] = useState("");
  const [topAnswer, setTopAnswer] = useState(null);
  const [answerCount, setAnswerCount] = useState(0);
  const [loadingPreview, setLoadingPreview] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isMentor, setIsMentor] = useState(false);
  const [checkingMentor, setCheckingMentor] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  const askerName = user?.name || "Unknown User";
  const askerAvatar = user?.profile_image || null;

  useEffect(() => {
    let mounted = true;

    const checkMentorStatus = async () => {
      try {
        const { data: { user: authUser }, error: userError } = await supabase.auth.getUser();

        if (userError || !authUser) {
          if (mounted) {
            setIsMentor(false);
            setCheckingMentor(false);
            setCurrentUserId(null);
          }
          return;
        }

        if (mounted) setCurrentUserId(authUser.id);

        const { data: userData, error: dbError } = await supabase
          .from("users")
          .select("is_mentor")
          .eq("id", authUser.id)
          .single();

        if (dbError) console.error("Error fetching user data:", dbError);

        if (mounted) {
          setIsMentor(userData?.is_mentor || false);
          setCheckingMentor(false);
        }
      } catch (err) {
        console.error("Error checking mentor status:", err);
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
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchPreview = async () => {
      setLoadingPreview(true);

      try {
        const { data: answers, error } = await supabase
          .from("answers")
          .select("id, content, author_id, created_at")
          .eq("question_id", id);

        if (cancelled) return;

        if (error) {
          console.error("answers fetch error:", error);
          setTopAnswer(null);
          setAnswerCount(0);
          setLoadingPreview(false);
          return;
        }

        setAnswerCount(answers?.length || 0);

        if (!answers || answers.length === 0) {
          setTopAnswer(null);
          setLoadingPreview(false);
          return;
        }

        const withLikes = await Promise.all(
          answers.map(async (a) => {
            const { count } = await supabase
              .from("answer_likes")
              .select("*", { count: "exact", head: true })
              .eq("answer_id", a.id);
            return { ...a, like_count: count || 0 };
          })
        );

        if (cancelled) return;

        withLikes.sort((a, b) => {
          if (b.like_count !== a.like_count) return b.like_count - a.like_count;
          return new Date(b.created_at) - new Date(a.created_at);
        });

        const best = withLikes[0];

        let author = null;
        if (best?.author_id) {
          const { data: u } = await supabase
            .from("users")
            .select("id, name, profile_image")
            .eq("id", best.author_id)
            .single();
          author = u || null;
        }

        if (!cancelled) {
          setTopAnswer({ ...best, author });
          setLoadingPreview(false);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Error fetching preview:", err);
          setTopAnswer(null);
          setAnswerCount(0);
          setLoadingPreview(false);
        }
      }
    };

    fetchPreview();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const submitAnswer = async (e) => {
    e.preventDefault();

    if (!answerText.trim()) {
      alert("Please write an answer");
      return;
    }

    if (!currentUserId) {
      alert("Please login to answer");
      return;
    }

    if (!isMentor) {
      alert("Only mentors can answer questions");
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase.from("answers").insert([
        {
          question_id: id,
          author_id: currentUserId,
          content: answerText.trim(),
        },
      ]);

      if (error) {
        console.error("Insert error:", error);
        if (error.code === "42501") {
          alert("Permission denied. Please ensure you are a mentor.");
        } else {
          alert("Failed to post answer: " + error.message);
        }
        setSubmitting(false);
        return;
      }

      setAnswerText("");
      setSubmitting(false);
      alert("Answer posted successfully!");
    } catch (err) {
      console.error("Error submitting answer:", err);
      alert("Failed to post answer. Please try again.");
      setSubmitting(false);
    }
  };

  const truncated = useMemo(() => {
    if (!topAnswer?.content) return "";
    const max = 220;
    return topAnswer.content.length > max ? topAnswer.content.slice(0, max) + "…" : topAnswer.content;
  }, [topAnswer]);

  return (
    <div
      className="w-full max-w-2xl mx-auto p-4 md:p-5 mb-6 rounded-xl border shadow-lg"
      style={{
        background: "rgba(255,255,255,0.05)",
        borderColor: "rgba(255,255,255,0.1)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar name={askerName} src={askerAvatar} size={40} />
          <div>
            <div className="text-[rgba(255,255,255,0.92)] text-sm font-medium">{askerName}</div>
          </div>
        </div>
        <span
          className="px-2.5 py-1 text-xs rounded-full"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          {category || "General"}
        </span>
      </div>

      {title && <h3 className="text-lg font-semibold text-[#FDE68A]">{title}</h3>}
      <p className="text-[rgba(255,255,255,0.9)] mt-1">{que}</p>

      {image && (
        <img
          src={image}
          alt="question attachment"
          className="mt-3 w-full rounded-lg object-cover border border-white/20"
        />
      )}

      <div
        className="mt-4 p-4 rounded-lg"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        {loadingPreview ? (
          <p className="text-[rgba(255,255,255,0.7)] text-sm">Loading preview…</p>
        ) : answerCount === 0 ? (
          <p className="text-[rgba(255,255,255,0.75)] text-sm italic">
            Be the first to answer this question.
          </p>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-2">
              <Avatar
                name={topAnswer?.author?.name || "Unknown"}
                src={topAnswer?.author?.profile_image || null}
                size={32}
              />
              <div className="text-sm">
                <div className="text-[rgba(255,255,255,0.9)] font-medium">
                  {topAnswer?.author?.name || "Unknown User"}
                </div>
                <div className="text-[rgba(255,255,255,0.6)] text-xs">
                  {timeAgo(topAnswer?.created_at)} • {absoluteDate(topAnswer?.created_at)}
                </div>
              </div>
              <div className="ml-auto text-xs text-[rgba(255,255,255,0.75)]">
                👍 {topAnswer?.like_count || 0}
              </div>
            </div>
            <p className="text-[rgba(255,255,255,0.85)] text-sm">{truncated}</p>
          </>
        )}
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="text-xs text-[rgba(255,255,255,0.7)]">
          {answerCount} answer{answerCount === 1 ? "" : "s"}
        </div>

        {answerCount > 0 && (
          <button
            onClick={() =>
              onOpenModal?.({
                id,
                title,
                question: que,  // ✅ match DB field name
                category,
                image,
                users: user,    // ✅ match how you use q.users elsewhere
              })
            }
            className="px-3 py-2 text-sm rounded-lg"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.95)",
            }}
          >
            View Details
          </button>
        )}
      </div>

      {!checkingMentor && (
        <>
          {isMentor ? (
            <form onSubmit={submitAnswer} className="mt-4">
              <textarea
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                placeholder="Write your answer…"
                className="w-full rounded-lg p-3 outline-none"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "white",
                }}
                rows={3}
                disabled={submitting}
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={submitting || !answerText.trim()}
                  className="px-4 py-2 rounded-lg font-medium disabled:opacity-60 transition-opacity"
                  style={{ background: "#FDE047", color: "#111827" }}
                >
                  {submitting ? "Posting…" : "Post Answer"}
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <p className="text-yellow-200 text-sm">Only mentors can answer questions.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}