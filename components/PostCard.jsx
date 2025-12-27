// // components/PostCard.jsx
// "use client";
// import React, { useState } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import dayjs from "dayjs";

// export default function PostCard({ post, currentUser, onLikeUpdate }) {
//   const [showComments, setShowComments] = useState(false);
//   const [comments, setComments] = useState(post._comments || []); // may be passed
//   const [commentText, setCommentText] = useState("");
//   const [creatingComment, setCreatingComment] = useState(false);
//   const [liking, setLiking] = useState(false);

//   const like = async () => {
//     if (!currentUser?.id) return alert("Please sign in to like.");
//     setLiking(true);
//     try {
//       await supabase.from("post_likes").insert([{ post_id: post.id, user_id: currentUser.id }]);
//       onLikeUpdate && onLikeUpdate(post.id);
//     } catch (err) {
//       console.warn("like err", err);
//     } finally {
//       setLiking(false);
//     }
//   };

//   const addComment = async () => {
//     if (!currentUser?.id) return alert("Please sign in to comment.");
//     const text = commentText.trim();
//     if (!text) return;
//     setCreatingComment(true);
//     try {
//       const { data, error } = await supabase
//         .from("post_comments")
//         .insert([{ post_id: post.id, user_id: currentUser.id, comment: text }])
//         .select()
//         .single();
//       if (error) throw error;
//       setComments((c) => [...c, data]);
//       setCommentText("");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add comment: " + err.message);
//     } finally {
//       setCreatingComment(false);
//     }
//   };

//   return (
//     <article className="rounded-xl p-4 bg-gray-800 border border-gray-700">
//       <div className="flex items-start gap-3">
//         <img src={post.users?.profile_image || "https://via.placeholder.com/44"} className="w-11 h-11 rounded-full object-cover" />
//         <div className="flex-1">
//           <div className="flex justify-between">
//             <div>
//               <div className="font-medium">{post.users?.name || "Unknown"}</div>
//               <div className="text-xs text-gray-400">{dayjs(post.created_at).fromNow()}</div>
//             </div>
//             <div className="flex items-center gap-2">
//               <button onClick={like} className="px-3 py-1 rounded border">👍 Like</button>
//             </div>
//           </div>

//           <p className="mt-3">{post.content}</p>

//           {/* images grid */}
//           {post._images && post._images.length > 0 && (
//             <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
//               {post._images.map((img, idx) => (
//                 <img key={idx} src={img.image_url} className="w-full object-cover rounded" />
//               ))}
//             </div>
//           )}

//           {/* comments */}
//           <div className="mt-3">
//             <button onClick={() => setShowComments((s) => !s)} className="text-sm text-gray-300">
//               {showComments ? "Hide comments" : `Comments (${comments.length})`}
//             </button>

//             {showComments && (
//               <div className="mt-2">
//                 {(comments || []).map((c) => (
//                   <div key={c.id} className="rounded p-2 bg-gray-900/30 mb-2">
//                     <div className="text-xs text-gray-300">{c.comment}</div>
//                     <div className="text-xs text-gray-500">{dayjs(c.created_at).fromNow()}</div>
//                   </div>
//                 ))}

//                 <div className="flex gap-2 mt-2">
//                   <input value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Write a comment..." className="flex-1 p-2 rounded bg-black/40" />
//                   <button onClick={addComment} disabled={creatingComment} className="px-3 py-1 bg-yellow-400 rounded">
//                     {creatingComment ? "..." : "Add"}
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// }



















// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import dayjs from "dayjs";
// import { Heart, MessageCircle, Trash2 } from "lucide-react";

// export default function PostCard({ post, currentUser, isAdmin }) {
//   const [comments, setComments] = useState(post._comments || []);
//   const [commentText, setCommentText] = useState("");
//   const [replyTo, setReplyTo] = useState(null);

//   const [liked, setLiked] = useState(false);
//   const [likeCount, setLikeCount] = useState(0);
//   const [showComments, setShowComments] = useState(false);

//   /* ===================== LOAD LIKES ===================== */
//   useEffect(() => {
//     loadLikes();
//     if (currentUser?.id) checkLiked();
//   }, [currentUser?.id]);

//   const loadLikes = async () => {
//     const { count } = await supabase
//       .from("post_likes")
//       .select("*", { count: "exact", head: true })
//       .eq("post_id", post.id);

//     setLikeCount(count || 0);
//   };

//   const checkLiked = async () => {
//     const { data } = await supabase
//       .from("post_likes")
//       .select("id")
//       .eq("post_id", post.id)
//       .eq("user_id", currentUser.id)
//       .maybeSingle();

//     setLiked(!!data);
//   };

//   /* ===================== LIKE TOGGLE ===================== */
//   const toggleLike = async () => {
//     if (!currentUser) return alert("Login required");

//     if (liked) {
//       await supabase
//         .from("post_likes")
//         .delete()
//         .eq("post_id", post.id)
//         .eq("user_id", currentUser.id);

//       setLiked(false);
//       setLikeCount((c) => Math.max(0, c - 1));
//     } else {
//       const { error } = await supabase.from("post_likes").insert({
//         post_id: post.id,
//         user_id: currentUser.id,
//       });

//       if (!error) {
//         setLiked(true);
//         setLikeCount((c) => c + 1);
//       }
//     }
//   };

//   /* ===================== COMMENTS ===================== */
//   const addComment = async () => {
//     if (!currentUser) return alert("Login required");
//     if (!commentText.trim()) return;

//     const { data, error } = await supabase
//       .from("post_comments")
//       .insert({
//         post_id: post.id,
//         user_id: currentUser.id,
//         parent_id: replyTo,
//         comment: commentText.trim(),
//       })
//       .select()
//       .single();

//     if (error) return alert(error.message);

//     setComments((c) => [...c, data]);
//     setCommentText("");
//     setReplyTo(null);
//   };

//   const deleteComment = async (commentId) => {
//     const { error } = await supabase
//       .from("post_comments")
//       .delete()
//       .eq("id", commentId);

//     if (error) return alert(error.message);

//     setComments((c) => c.filter((x) => x.id !== commentId));
//   };

//   /* ===================== DELETE POST (ADMIN ONLY) ===================== */
//   const deletePost = async () => {
//     if (!isAdmin) return;

//     const confirm = window.confirm("Delete this post?");
//     if (!confirm) return;

//     await supabase.from("society_posts").delete().eq("id", post.id);
//     location.reload();
//   };

//   /* ===================== HELPERS ===================== */
//   const rootComments = comments.filter((c) => !c.parent_id);
//   const replies = (id) => comments.filter((c) => c.parent_id === id);

//   /* ===================== UI ===================== */
//   return (
//     <article className="bg-gray-800 p-4 rounded-xl border border-gray-700">
//       {/* HEADER */}
//       <div className="flex justify-between items-start">
//         <div>
//           <div className="font-semibold">{post.users?.name || "User"}</div>
//           <div className="text-xs text-gray-400">
//             {dayjs(post.created_at).fromNow()}
//           </div>
//         </div>

//         {isAdmin && (
//           <button
//             onClick={deletePost}
//             className="text-red-400 hover:text-red-500"
//           >
//             <Trash2 size={16} />
//           </button>
//         )}
//       </div>

//       {/* CONTENT */}
//       <p className="mt-3">{post.content}</p>

//       {/* IMAGES */}
//       {post._images?.length > 0 && (
//         <div className="grid grid-cols-2 gap-2 mt-3">
//           {post._images.map((img, i) => (
//             <img
//               key={i}
//               src={img.image_url}
//               className="rounded-lg object-cover"
//             />
//           ))}
//         </div>
//       )}

//       {/* ACTION BAR */}
//       <div className="flex items-center gap-6 mt-4 text-sm text-gray-300">
//         <button
//           onClick={toggleLike}
//           className="flex items-center gap-2 hover:text-red-400"
//         >
//           <Heart
//             size={18}
//             className={liked ? "fill-red-500 text-red-500" : ""}
//           />
//           {likeCount}
//         </button>

//         <button
//           onClick={() => setShowComments((s) => !s)}
//           className="flex items-center gap-2 hover:text-blue-400"
//         >
//           <MessageCircle size={18} />
//           {comments.length}
//         </button>
//       </div>

//       {/* COMMENTS */}
//       {showComments && (
//         <div className="mt-4 space-y-3">
//           {rootComments.map((c) => (
//             <div key={c.id}>
//               <div className="flex justify-between">
//                 <div className="text-sm">{c.comment}</div>

//                 {(currentUser?.id === c.user_id || isAdmin) && (
//                   <button
//                     onClick={() => deleteComment(c.id)}
//                     className="text-xs text-red-400"
//                   >
//                     Delete
//                   </button>
//                 )}
//               </div>

//               <button
//                 onClick={() => setReplyTo(c.id)}
//                 className="text-xs text-gray-400"
//               >
//                 Reply
//               </button>

//               {replies(c.id).map((r) => (
//                 <div
//                   key={r.id}
//                   className="ml-6 mt-1 flex justify-between text-xs text-gray-300"
//                 >
//                   <span>↳ {r.comment}</span>

//                   {(currentUser?.id === r.user_id || isAdmin) && (
//                     <button
//                       onClick={() => deleteComment(r.id)}
//                       className="text-red-400"
//                     >
//                       Delete
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>
//           ))}

//           {/* ADD COMMENT */}
//           <div className="flex gap-2 mt-2">
//             <input
//               className="flex-1 p-2 rounded bg-black/40"
//               placeholder={replyTo ? "Reply..." : "Write a comment..."}
//               value={commentText}
//               onChange={(e) => setCommentText(e.target.value)}
//             />
//             <button
//               onClick={addComment}
//               className="bg-yellow-400 px-3 rounded text-black"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </article>
//   );
// }







// // components/PostCard.js
// "use client";

// import React, { useState } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import { Heart, MessageCircle, Send } from "lucide-react";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// import { useRouter } from "next/navigation";

// dayjs.extend(relativeTime);

// export default function PostCard({ post, currentUser, onLikeUpdate, onCommentAdded }) {
//   const router = useRouter();
//   const [showComments, setShowComments] = useState(false);
//   const [commentText, setCommentText] = useState("");
//   const [submittingComment, setSubmittingComment] = useState(false);
//   const [isLiked, setIsLiked] = useState(post._isLiked || false);
//   const [likesCount, setLikesCount] = useState(post._likesCount || 0);
//   const [localComments, setLocalComments] = useState(post._comments || []);

//   const handleLike = async () => {
//     if (!currentUser?.id) {
//       router.push("/signup");
//       return;
//     }

//     try {
//       if (isLiked) {
//         // Unlike
//         await supabase
//           .from("society_post_likes")
//           .delete()
//           .eq("post_id", post.id)
//           .eq("user_id", currentUser.id);
        
//         setIsLiked(false);
//         setLikesCount(prev => Math.max(0, prev - 1));
//       } else {
//         // Like
//         await supabase
//           .from("society_post_likes")
//           .insert([{
//             post_id: post.id,
//             user_id: currentUser.id
//           }]);
        
//         setIsLiked(true);
//         setLikesCount(prev => prev + 1);
//       }
      
//       if (onLikeUpdate) onLikeUpdate();
//     } catch (err) {
//       console.error("Like error:", err);
//       alert("Failed to update like. Please try again.");
//     }
//   };

//   const handleComment = async (e) => {
//     e.preventDefault();
    
//     if (!currentUser?.id) {
//       router.push("/signup");
//       return;
//     }

//     if (!commentText.trim()) return;

//     setSubmittingComment(true);
//     try {
//       const { data: newComment, error } = await supabase
//         .from("society_post_comments")
//         .insert([{
//           post_id: post.id,
//           user_id: currentUser.id,
//           content: commentText.trim()
//         }])
//         .select("id, post_id, user_id, content, created_at")
//         .single();

//       if (error) throw error;

//       // Add current user info to the new comment
//       const enrichedComment = {
//         ...newComment,
//         users: {
//           id: currentUser.id,
//           name: currentUser.name,
//           profile_image: currentUser.profile_image
//         }
//       };

//       setLocalComments(prev => [...prev, enrichedComment]);
//       setCommentText("");
      
//       if (onCommentAdded) onCommentAdded();
//     } catch (err) {
//       console.error("Comment error:", err);
//       alert("Failed to post comment. Please try again.");
//     } finally {
//       setSubmittingComment(false);
//     }
//   };

//   return (
//     <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
//       {/* Post Header */}
//       <div className="flex items-center gap-3 mb-3">
//         <img
//           src={post.users?.profile_image || "https://via.placeholder.com/40"}
//           alt={post.users?.name || "User"}
//           className="w-10 h-10 rounded-full object-cover"
//         />
//         <div>
//           <div className="font-medium">{post.users?.name || "Unknown User"}</div>
//           <div className="text-xs text-gray-400">
//             {dayjs(post.created_at).fromNow()}
//           </div>
//         </div>
//       </div>

//       {/* Post Content */}
//       <div className="mb-3">
//         <p className="text-gray-200 whitespace-pre-wrap">{post.content}</p>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex items-center gap-6 py-2 border-t border-gray-700">
//         <button
//           onClick={handleLike}
//           className={`flex items-center gap-2 transition-colors ${
//             isLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"
//           }`}
//         >
//           <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
//           <span className="text-sm">{likesCount}</span>
//         </button>

//         <button
//           onClick={() => setShowComments(!showComments)}
//           className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors"
//         >
//           <MessageCircle className="w-5 h-5" />
//           <span className="text-sm">{localComments.length}</span>
//         </button>
//       </div>

//       {/* Comments Section */}
//       {showComments && (
//         <div className="mt-4 pt-4 border-t border-gray-700">
//           {/* Comment Input */}
//           {currentUser ? (
//             <form onSubmit={handleComment} className="mb-4">
//               <div className="flex gap-2">
//                 <img
//                   src={currentUser.profile_image || "https://via.placeholder.com/32"}
//                   alt="You"
//                   className="w-8 h-8 rounded-full object-cover"
//                 />
//                 <div className="flex-1 flex gap-2">
//                   <input
//                     type="text"
//                     value={commentText}
//                     onChange={(e) => setCommentText(e.target.value)}
//                     placeholder="Write a comment..."
//                     className="flex-1 bg-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     disabled={submittingComment}
//                   />
//                   <button
//                     type="submit"
//                     disabled={submittingComment || !commentText.trim()}
//                     className="px-3 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     <Send className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </form>
//           ) : (
//             <div className="mb-4 p-3 bg-gray-700 rounded-lg text-center text-sm text-gray-300">
//               <button
//                 onClick={() => router.push("/signup")}
//                 className="text-blue-400 hover:underline"
//               >
//                 Sign in
//               </button>
//               {" "}to comment
//             </div>
//           )}

//           {/* Comments List */}
//           <div className="space-y-3">
//             {localComments.length === 0 ? (
//               <div className="text-sm text-gray-400 text-center py-2">
//                 No comments yet. Be the first to comment!
//               </div>
//             ) : (
//               localComments.map((comment) => (
//                 <div key={comment.id} className="flex gap-2">
//                   <img
//                     src={comment.users?.profile_image || "https://via.placeholder.com/32"}
//                     alt={comment.users?.name || "User"}
//                     className="w-8 h-8 rounded-full object-cover"
//                   />
//                   <div className="flex-1 bg-gray-700 rounded-lg p-3">
//                     <div className="flex items-center justify-between mb-1">
//                       <span className="font-medium text-sm">
//                         {comment.users?.name || "Unknown User"}
//                       </span>
//                       <span className="text-xs text-gray-400">
//                         {dayjs(comment.created_at).fromNow()}
//                       </span>
//                     </div>
//                     <p className="text-sm text-gray-200">{comment.content}</p>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




















// components/PostCard.js
"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Heart, MessageCircle, Send, X } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/navigation";

dayjs.extend(relativeTime);

export default function PostCard({ post, currentUser, onLikeUpdate, onCommentAdded }) {
  const router = useRouter();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [isLiked, setIsLiked] = useState(post._isLiked || false);
  const [likesCount, setLikesCount] = useState(post._likesCount || 0);
  const [localComments, setLocalComments] = useState(post._comments || []);
  const [lightboxImage, setLightboxImage] = useState(null);

  const images = post._images || [];

  const handleLike = async () => {
    if (!currentUser?.id) {
      router.push("/signup");
      return;
    }

    try {
      if (isLiked) {
        // Unlike
        await supabase
          .from("society_post_likes")
          .delete()
          .eq("post_id", post.id)
          .eq("user_id", currentUser.id);
        
        setIsLiked(false);
        setLikesCount(prev => Math.max(0, prev - 1));
      } else {
        // Like
        await supabase
          .from("society_post_likes")
          .insert([{
            post_id: post.id,
            user_id: currentUser.id
          }]);
        
        setIsLiked(true);
        setLikesCount(prev => prev + 1);
      }
      
      if (onLikeUpdate) onLikeUpdate();
    } catch (err) {
      console.error("Like error:", err);
      alert("Failed to update like. Please try again.");
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    
    if (!currentUser?.id) {
      router.push("/signup");
      return;
    }

    if (!commentText.trim()) return;

    setSubmittingComment(true);
    try {
      const { data: newComment, error } = await supabase
        .from("society_post_comments")
        .insert([{
          post_id: post.id,
          user_id: currentUser.id,
          content: commentText.trim()
        }])
        .select("id, post_id, user_id, content, created_at")
        .single();

      if (error) throw error;

      // Add current user info to the new comment
      const enrichedComment = {
        ...newComment,
        users: {
          id: currentUser.id,
          name: currentUser.name,
          profile_image: currentUser.profile_image
        }
      };

      setLocalComments(prev => [...prev, enrichedComment]);
      setCommentText("");
      
      if (onCommentAdded) onCommentAdded();
    } catch (err) {
      console.error("Comment error:", err);
      alert("Failed to post comment. Please try again.");
    } finally {
      setSubmittingComment(false);
    }
  };

  const renderImages = () => {
    if (images.length === 0) return null;

    if (images.length === 1) {
      return (
        <div 
          className="mt-3 cursor-pointer"
          onClick={() => setLightboxImage(images[0])}
        >
          <img 
            src={images[0]} 
            alt="Post image" 
            className="w-full max-h-[500px] object-cover rounded-lg"
          />
        </div>
      );
    }

    if (images.length === 2) {
      return (
        <div className="grid grid-cols-2 gap-2 mt-3">
          {images.map((img, i) => (
            <div 
              key={i}
              className="cursor-pointer"
              onClick={() => setLightboxImage(img)}
            >
              <img 
                src={img} 
                alt={`Post image ${i + 1}`} 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      );
    }

    if (images.length === 3) {
      return (
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div 
            className="cursor-pointer"
            onClick={() => setLightboxImage(images[0])}
          >
            <img 
              src={images[0]} 
              alt="Post image 1" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-2">
            {images.slice(1).map((img, i) => (
              <div 
                key={i}
                className="cursor-pointer"
                onClick={() => setLightboxImage(img)}
              >
                <img 
                  src={img} 
                  alt={`Post image ${i + 2}`} 
                  className="w-full h-[calc(50%-4px)] object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 4 or more images
    return (
      <div className="grid grid-cols-2 gap-2 mt-3">
        {images.slice(0, 4).map((img, i) => (
          <div 
            key={i}
            className="relative cursor-pointer"
            onClick={() => setLightboxImage(img)}
          >
            <img 
              src={img} 
              alt={`Post image ${i + 1}`} 
              className="w-full h-48 object-cover rounded-lg"
            />
            {i === 3 && images.length > 4 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                <span className="text-white text-2xl font-bold">
                  +{images.length - 4}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
        {/* Post Header */}
        <div className="flex items-center gap-3 mb-3">
          <img
            src={post.users?.profile_image || "https://via.placeholder.com/40"}
            alt={post.users?.name || "User"}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-medium">{post.users?.name || "Unknown User"}</div>
            <div className="text-xs text-gray-400">
              {dayjs(post.created_at).fromNow()}
            </div>
          </div>
        </div>

        {/* Post Content */}
        {post.content && (
          <div className="mb-3">
            <p className="text-gray-200 whitespace-pre-wrap">{post.content}</p>
          </div>
        )}

        {/* Post Images */}
        {renderImages()}

        {/* Action Buttons */}
        <div className="flex items-center gap-6 py-3 mt-3 border-t border-gray-700">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 transition-colors ${
              isLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
            <span className="text-sm font-medium">{likesCount}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">{localComments.length}</span>
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            {/* Comment Input */}
            {currentUser ? (
              <form onSubmit={handleComment} className="mb-4">
                <div className="flex gap-2">
                  <img
                    src={currentUser.profile_image || "https://via.placeholder.com/32"}
                    alt="You"
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Write a comment..."
                      className="flex-1 bg-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={submittingComment}
                    />
                    <button
                      type="submit"
                      disabled={submittingComment || !commentText.trim()}
                      className="px-3 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="mb-4 p-3 bg-gray-700 rounded-lg text-center text-sm text-gray-300">
                <button
                  onClick={() => router.push("/signup")}
                  className="text-blue-400 hover:underline"
                >
                  Sign in
                </button>
                {" "}to comment
              </div>
            )}

            {/* Comments List */}
            <div className="space-y-3">
              {localComments.length === 0 ? (
                <div className="text-sm text-gray-400 text-center py-2">
                  No comments yet. Be the first to comment!
                </div>
              ) : (
                localComments.map((comment) => (
                  <div key={comment.id} className="flex gap-2">
                    <img
                      src={comment.users?.profile_image || "https://via.placeholder.com/32"}
                      alt={comment.users?.name || "User"}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 bg-gray-700 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">
                          {comment.users?.name || "Unknown User"}
                        </span>
                        <span className="text-xs text-gray-400">
                          {dayjs(comment.created_at).fromNow()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-200">{comment.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Image Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={lightboxImage}
            alt="Full size"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}