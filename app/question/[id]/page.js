// "use client";

// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import dayjs from "dayjs";
// import Navbar from "@/components/Navbar";
// import BottomNavbar from "@/components/BottomNavbar";

// export default function QuestionPage() {
//   const { id } = useParams();
//   const [question, setQuestion] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!id) return;

//     const fetchQuestion = async () => {
//       const { data, error } = await supabase
//         .from("questions")
//         .select(`
//           id,
//           title,
//           question,
//           category,
//           image,
//           created_at,
//           users:author_id (
//             id,
//             name,
//             profile_image
//           )
//         `)
//         .eq("id", id)
//         .single();

//       if (error) {
//         console.error(error);
//         setQuestion(null);
//       } else {
//         setQuestion(data);
//       }

//       setLoading(false);
//     };

//     fetchQuestion();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white">
//         Loading...
//       </div>
//     );
//   }

//   if (!question) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white">
//         Question not found
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <Navbar />

//       <main className="max-w-4xl mx-auto px-4 py-6">
//         {/* HEADER */}
//         <div className="flex items-center gap-3 mb-4">
//           <img
//             src={
//               question.users?.profile_image ||
//               "https://via.placeholder.com/40?text=U"
//             }
//             className="w-10 h-10 rounded-full object-cover"
//           />
//           <div>
//             <div className="font-medium">
//               {question.users?.name || "Anonymous"}
//             </div>
//             <div className="text-xs text-gray-400">
//               {dayjs(question.created_at).fromNow()}
//             </div>
//           </div>
//         </div>

//         {/* QUESTION */}
//         <h1 className="text-2xl font-bold mb-2">{question.title}</h1>

//         <span className="inline-block mb-4 text-xs px-2 py-1 bg-blue-600 rounded">
//           {question.category}
//         </span>

//         <p className="text-gray-200 leading-relaxed">
//           {question.question}
//         </p>

//         {question.image && (
//           <img
//             src={question.image}
//             className="mt-4 rounded-lg max-h-96 object-cover"
//           />
//         )}
//       </main>

//       <BottomNavbar />
//     </div>
//   );
// }







// "use client";

// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import Navbar from "@/components/Navbar";
// import BottomNavbar from "@/components/BottomNavbar";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";

// dayjs.extend(relativeTime);

// export default function QuestionPage() {
//   const { id } = useParams();

//   const [question, setQuestion] = useState(null);
//   const [qComments, setQComments] = useState([]);
//   const [answers, setAnswers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   /* ---------------- FETCH ALL ---------------- */
//   useEffect(() => {
//     if (!id) return;

//     const fetchAll = async () => {
//       setLoading(true);

//       // 1️⃣ Question
//       const { data: q } = await supabase
//         .from("questions")
//         .select(`
//           id,
//           title,
//           question,
//           created_at,
//           users:author_id ( id, name, profile_image )
//         `)
//         .eq("id", id)
//         .single();

//       // 2️⃣ Question comments
//       const { data: qc } = await supabase
//         .from("question_comments")
//         .select(`
//           id, comment, created_at,
//           users:user_id ( name, profile_image )
//         `)
//         .eq("question_id", id)
//         .order("created_at");

//       // 3️⃣ Answers
//       const { data: ans } = await supabase
//         .from("answers")
//         .select(`
//           id,
//           answer,
//           created_at,
//           users:author_id ( id, name, profile_image )
//         `)
//         .eq("question_id", id)
//         .order("created_at");

//       // 4️⃣ Answer comments
//       const answerIds = (ans || []).map(a => a.id);
//       let ac = [];

//       if (answerIds.length) {
//         const { data } = await supabase
//           .from("answer_comments")
//           .select(`
//             id, answer_id, comment, created_at,
//             users:user_id ( name, profile_image )
//           `)
//           .in("answer_id", answerIds);
//         ac = data || [];
//       }

//       // attach comments to answers
//       const enrichedAnswers = (ans || []).map(a => ({
//         ...a,
//         comments: ac.filter(c => c.answer_id === a.id)
//       }));

//       setQuestion(q);
//       setQComments(qc || []);
//       setAnswers(enrichedAnswers);
//       setLoading(false);
//     };

//     fetchAll();
//   }, [id]);

//   if (loading) return <div className="text-white p-10">Loading...</div>;
//   if (!question) return <div className="text-white p-10">Question not found</div>;

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <Navbar />

//       <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">

//         {/* QUESTION */}
//         <section className="bg-gray-800 p-4 rounded-xl border border-gray-700">
//           <div className="flex gap-3 mb-2">
//             <img
//               src={question.users?.profile_image || "https://via.placeholder.com/40"}
//               className="w-10 h-10 rounded-full"
//             />
//             <div>
//               <div className="font-semibold">{question.users?.name}</div>
//               <div className="text-xs text-gray-400">
//                 {dayjs(question.created_at).fromNow()}
//               </div>
//             </div>
//           </div>

//           <h1 className="text-2xl font-bold mb-2">{question.title}</h1>
//           <p className="text-gray-300">{question.question}</p>
//         </section>

//         {/* QUESTION COMMENTS */}
//         {qComments.length > 0 && (
//           <section className="ml-4">
//             <h3 className="text-sm text-gray-400 mb-2">Comments</h3>
//             {qComments.map(c => (
//               <div key={c.id} className="text-sm text-gray-300 mb-1">
//                 <b>{c.users?.name}:</b> {c.comment}
//               </div>
//             ))}
//           </section>
//         )}

//         {/* ANSWERS */}
//         <section className="space-y-4">
//           <h2 className="text-xl font-semibold">
//             {answers.length} Answers
//           </h2>

//           {answers.map(a => (
//             <div
//               key={a.id}
//               className="bg-gray-800 p-4 rounded-xl border border-gray-700"
//             >
//               <div className="flex gap-3 mb-2">
//                 <img
//                   src={a.users?.profile_image || "https://via.placeholder.com/40"}
//                   className="w-9 h-9 rounded-full"
//                 />
//                 <div>
//                   <div className="font-medium">{a.users?.name}</div>
//                   <div className="text-xs text-gray-400">
//                     {dayjs(a.created_at).fromNow()}
//                   </div>
//                 </div>
//               </div>

//               <p className="text-gray-200">{a.answer}</p>

//               {/* ANSWER COMMENTS */}
//               {a.comments.length > 0 && (
//                 <div className="mt-3 ml-4 border-l border-gray-700 pl-3">
//                   {a.comments.map(c => (
//                     <div key={c.id} className="text-sm text-gray-300 mb-1">
//                       <b>{c.users?.name}:</b> {c.comment}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </section>

//       </main>

//       <BottomNavbar />
//     </div>
//   );
// }













"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { supabase } from "@/lib/supabaseClient";
import { AuthContext } from "@/lib/AuthProvider";
import Navbar from "@/components/Navbar";
import BottomNavbar from "@/components/BottomNavbar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function QuestionPage() {
  const { id } = useParams();
  const router = useRouter();
  const { currentUser, loading: authLoading } = useContext(AuthContext);

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newAnswer, setNewAnswer] = useState("");
  const [submittingAnswer, setSubmittingAnswer] = useState(false);
  const [isMentor, setIsMentor] = useState(false);

  const [commentInputs, setCommentInputs] = useState({});
  const [submittingComments, setSubmittingComments] = useState({});

  // Check authentication
  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push("/login");
    }
  }, [currentUser, authLoading, router]);

  // Check if user is mentor
  useEffect(() => {
    let mounted = true;

    const checkMentorStatus = async () => {
      if (!currentUser?.id) {
        if (mounted) setIsMentor(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('users')
          .select('is_mentor')
          .eq('id', currentUser.id)
          .single();

        if (error) {
          console.error('Error fetching mentor status:', error);
        }

        if (mounted) {
          setIsMentor(data?.is_mentor || false);
        }
      } catch (err) {
        console.error('Error checking mentor status:', err);
        if (mounted) setIsMentor(false);
      }
    };

    checkMentorStatus();

    return () => {
      mounted = false;
    };
  }, [currentUser]);

  // Fetch question and answers
  useEffect(() => {
    if (!id || !currentUser) return;

    let mounted = true;
    let timeoutId;

    const fetchAll = async () => {
      setLoading(true);
      setError(null);

      try {
        // Add timeout protection
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), 10000)
        );

        // 1. Fetch Question
        const questionPromise = supabase
          .from("questions")
          .select(`
            id,
            title,
            question,
            category,
            image,
            created_at,
            users:author_id ( id, name, profile_image )
          `)
          .eq("id", id)
          .single();

        const { data: q, error: qError } = await Promise.race([
          questionPromise,
          timeoutPromise
        ]);

        if (qError) throw qError;

        if (!mounted) return;

        // 2. Fetch Answers
        const answersPromise = supabase
          .from("answers")
          .select(`
            id,
            content,
            created_at,
            author_id,
            users:author_id ( id, name, profile_image )
          `)
          .eq("question_id", id)
          .order("created_at", { ascending: false });

        const { data: ans, error: ansError } = await Promise.race([
          answersPromise,
          timeoutPromise
        ]);

        if (ansError) throw ansError;

        if (!mounted) return;

        // 3. Fetch like counts for each answer
        const answersWithLikes = await Promise.all(
          (ans || []).map(async (answer) => {
            const { count } = await supabase
              .from("answer_likes")
              .select("*", { count: "exact", head: true })
              .eq("answer_id", answer.id);
            
            return { ...answer, like_count: count || 0 };
          })
        );

        if (!mounted) return;

        // 4. Fetch comments for each answer
        const answerIds = answersWithLikes.map(a => a.id);
        let allComments = [];

        if (answerIds.length > 0) {
          const { data: comments } = await supabase
            .from("comments")
            .select(`
              id,
              answer_id,
              content,
              created_at,
              users:user_id ( name, profile_image )
            `)
            .in("answer_id", answerIds)
            .order("created_at", { ascending: true });

          allComments = comments || [];
        }

        if (!mounted) return;

        // 5. Attach comments to answers
        const enrichedAnswers = answersWithLikes.map(a => ({
          ...a,
          comments: allComments.filter(c => c.answer_id === a.id)
        }));

        setQuestion(q);
        setAnswers(enrichedAnswers);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        if (mounted) {
          if (err.message === 'Request timeout') {
            setError('Request timed out. Please refresh the page.');
          } else {
            setError('Failed to load question. Please try again.');
          }
          setLoading(false);
        }
      }
    };

    fetchAll();

    return () => {
      mounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [id, currentUser]);

  // Submit new answer
  const handleSubmitAnswer = async (e) => {
    e.preventDefault();

    if (!newAnswer.trim()) {
      alert("Please write an answer");
      return;
    }

    if (!isMentor) {
      alert("Only mentors can answer questions");
      return;
    }

    setSubmittingAnswer(true);

    try {
      const { error } = await supabase
        .from("answers")
        .insert({
          question_id: id,
          author_id: currentUser.id,
          content: newAnswer.trim()
        });

      if (error) {
        if (error.code === '42501') {
          alert("Permission denied. Please ensure you are a mentor.");
        } else {
          alert("Failed to post answer: " + error.message);
        }
        setSubmittingAnswer(false);
        return;
      }

      // Refresh answers
      setNewAnswer("");
      
      const { data: ans } = await supabase
        .from("answers")
        .select(`
          id,
          content,
          created_at,
          author_id,
          users:author_id ( id, name, profile_image )
        `)
        .eq("question_id", id)
        .order("created_at", { ascending: false });

      const answersWithLikes = await Promise.all(
        (ans || []).map(async (answer) => {
          const { count } = await supabase
            .from("answer_likes")
            .select("*", { count: "exact", head: true })
            .eq("answer_id", answer.id);
          
          return { ...answer, like_count: count || 0, comments: [] };
        })
      );

      setAnswers(answersWithLikes);
      setSubmittingAnswer(false);
      alert("Answer posted successfully!");
    } catch (err) {
      console.error('Error submitting answer:', err);
      alert('Failed to post answer. Please try again.');
      setSubmittingAnswer(false);
    }
  };

  // Like answer
  const handleLikeAnswer = async (answerId) => {
    if (!currentUser?.id) {
      alert("Please login to like answers");
      return;
    }

    try {
      const { error } = await supabase
        .from("answer_likes")
        .insert({ answer_id: answerId, user_id: currentUser.id });

      if (error) {
        if (error.code === '23505') {
          alert("You already liked this answer");
        } else {
          alert("Could not like answer");
        }
      } else {
        // Refresh like count
        const { count } = await supabase
          .from("answer_likes")
          .select("*", { count: "exact", head: true })
          .eq("answer_id", answerId);

        setAnswers(prev => prev.map(a => 
          a.id === answerId ? { ...a, like_count: count || 0 } : a
        ));
      }
    } catch (err) {
      console.error('Error liking answer:', err);
      alert('Failed to like answer');
    }
  };

  // Submit comment on answer
  const handleSubmitComment = async (answerId) => {
    const text = commentInputs[answerId]?.trim();
    if (!text) {
      alert("Please write a comment");
      return;
    }

    if (!currentUser?.id) {
      alert("Please login to comment");
      return;
    }

    setSubmittingComments(prev => ({ ...prev, [answerId]: true }));

    try {
      const { error } = await supabase
        .from("comments")
        .insert({
          answer_id: answerId,
          user_id: currentUser.id,
          content: text
        });

      if (error) {
        alert("Failed to post comment: " + error.message);
        setSubmittingComments(prev => ({ ...prev, [answerId]: false }));
        return;
      }

      // Clear input
      setCommentInputs(prev => ({ ...prev, [answerId]: "" }));

      // Refresh comments for this answer
      const { data: comments } = await supabase
        .from("comments")
        .select(`
          id,
          answer_id,
          content,
          created_at,
          users:user_id ( name, profile_image )
        `)
        .eq("answer_id", answerId)
        .order("created_at", { ascending: true });

      setAnswers(prev => prev.map(a => 
        a.id === answerId ? { ...a, comments: comments || [] } : a
      ));

      setSubmittingComments(prev => ({ ...prev, [answerId]: false }));
    } catch (err) {
      console.error('Error submitting comment:', err);
      alert('Failed to post comment');
      setSubmittingComments(prev => ({ ...prev, [answerId]: false }));
    }
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black">
        <div className="text-white flex items-center gap-3">
          <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="text-white p-10 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Loading question...</span>
          </div>
        </div>
        <BottomNavbar />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="text-white p-10 text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500"
          >
            Retry
          </button>
        </div>
        <BottomNavbar />
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="text-white p-10 text-center">
          <p className="mb-4">Question not found</p>
          <button
            onClick={() => router.push('/home')}
            className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500"
          >
            Go to Home
          </button>
        </div>
        <BottomNavbar />
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen text-white"
      style={{ background: "linear-gradient(to bottom, #4C1D95, #000000 60%)" }}
    >
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6 pb-20">
        {/* QUESTION */}
        <section className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg">
          <div className="flex gap-3 mb-4">
            {question.users?.profile_image ? (
              <img
                src={question.users.profile_image}
                alt={question.users?.name}
                className="w-12 h-12 rounded-full border-2 border-yellow-400 object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full border-2 border-yellow-400 bg-white/10 flex items-center justify-center font-bold">
                {(question.users?.name?.[0] || "?").toUpperCase()}
              </div>
            )}
            <div>
              <div className="font-semibold text-white/90">
                {question.users?.name || "Unknown User"}
              </div>
              <div className="text-xs text-white/60">
                {dayjs(question.created_at).fromNow()}
              </div>
            </div>
          </div>

          {question.category && (
            <span className="inline-block px-3 py-1 text-xs rounded-full bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 mb-3">
              {question.category}
            </span>
          )}

          <h1 className="text-2xl md:text-3xl font-bold mb-3 text-yellow-400">
            {question.title}
          </h1>
          <p className="text-white/90 leading-relaxed">{question.question}</p>

          {question.image && (
            <img
              src={question.image}
              alt="Question attachment"
              className="mt-4 w-full rounded-lg border border-white/20 object-cover"
            />
          )}
        </section>

        {/* ANSWER FORM - Only for mentors */}
        {isMentor && (
          <section className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg">
            <h3 className="text-lg font-semibold mb-3 text-yellow-400">
              Post Your Answer
            </h3>
            <form onSubmit={handleSubmitAnswer}>
              <textarea
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="Write your answer here..."
                className="w-full rounded-lg p-3 outline-none bg-white/5 border border-white/20 text-white min-h-[120px] focus:border-yellow-400 transition-colors"
                disabled={submittingAnswer}
              />
              <div className="flex justify-end mt-3">
                <button
                  type="submit"
                  disabled={submittingAnswer || !newAnswer.trim()}
                  className="px-6 py-2 rounded-lg font-medium bg-yellow-400 text-black hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {submittingAnswer ? "Posting..." : "Post Answer"}
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Non-mentor message */}
        {!isMentor && (
          <section className="bg-yellow-500/10 backdrop-blur-md p-4 rounded-xl border border-yellow-500/20">
            <p className="text-yellow-200 text-sm">
              💡 Only mentors can answer questions. Want to become a mentor? Update your profile settings.
            </p>
          </section>
        )}

        {/* ANSWERS */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-yellow-400">
            {answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}
          </h2>

          {answers.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-xl border border-white/10 text-center">
              <p className="text-white/60">No answers yet. Be the first to answer!</p>
            </div>
          ) : (
            answers.map(a => (
              <div
                key={a.id}
                className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg"
              >
                <div className="flex gap-3 mb-3">
                  {a.users?.profile_image ? (
                    <img
                      src={a.users.profile_image}
                      alt={a.users?.name}
                      className="w-10 h-10 rounded-full border border-white/20 object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full border border-white/20 bg-white/10 flex items-center justify-center font-bold text-sm">
                      {(a.users?.name?.[0] || "?").toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-white/90">
                          {a.users?.name || "Unknown User"}
                        </div>
                        <div className="text-xs text-white/60">
                          {dayjs(a.created_at).fromNow()}
                        </div>
                      </div>
                      <button
                        onClick={() => handleLikeAnswer(a.id)}
                        className="px-3 py-1 text-sm rounded-md bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
                      >
                        👍 {a.like_count || 0}
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-white/90 leading-relaxed mb-4">{a.content}</p>

                {/* COMMENTS ON THIS ANSWER */}
                {a.comments && a.comments.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                    <h4 className="text-sm font-medium text-white/70">Comments</h4>
                    {a.comments.map(c => (
                      <div key={c.id} className="flex gap-2 text-sm">
                        <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold border border-white/20">
                          {(c.users?.name?.[0] || "?").toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="text-white/80">
                            <span className="font-medium">{c.users?.name || "Unknown"}:</span>{" "}
                            {c.content}
                          </div>
                          <div className="text-xs text-white/50">
                            {dayjs(c.created_at).fromNow()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* COMMENT INPUT */}
                <div className="mt-4 flex gap-2">
                  <input
                    value={commentInputs[a.id] || ""}
                    onChange={(e) =>
                      setCommentInputs(prev => ({ ...prev, [a.id]: e.target.value }))
                    }
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !submittingComments[a.id]) {
                        handleSubmitComment(a.id);
                      }
                    }}
                    placeholder="Write a comment..."
                    className="flex-1 rounded-md px-3 py-2 outline-none bg-white/5 border border-white/20 text-white text-sm focus:border-yellow-400 transition-colors"
                    disabled={submittingComments[a.id]}
                  />
                  <button
                    onClick={() => handleSubmitComment(a.id)}
                    disabled={submittingComments[a.id] || !commentInputs[a.id]?.trim()}
                    className="px-4 py-2 rounded-md font-medium bg-yellow-400 text-black hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
                  >
                    {submittingComments[a.id] ? "..." : "Comment"}
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </main>

      <BottomNavbar />
    </div>
  );
}