// // components/CreatePostModal.jsx
// "use client";
// import React, { useState } from "react";
// import ImageUploader from "./ImageUploader";
// import { supabase } from "@/lib/supabaseClient";

// export default function CreatePostModal({ open, onClose, societyId, onPosted }) {
//   const [content, setContent] = useState("");
//   const [files, setFiles] = useState([]); // File objects
//   const [loading, setLoading] = useState(false);
//   const bucket = "post-media"; // ensure this bucket exists

//   if (!open) return null;

//   const uploadFile = async (file, pathPrefix = "") => {
//     const name = `${pathPrefix}${Date.now()}-${file.name}`;
//     const { data, error } = await supabase.storage.from(bucket).upload(name, file, { cacheControl: "3600", upsert: false });
//     if (error) throw error;
//     const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(data.path);
//     return publicData.publicUrl;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       // create post
//       const { data: sessionData } = await supabase.auth.getUser();
//       const user = sessionData?.user;
//       if (!user?.id) throw new Error("Please sign in");

//       const { data: createdPost, error: postErr } = await supabase
//         .from("society_posts")
//         .insert([{ society_id: societyId, author_id: user.id, content }])
//         .select()
//         .single();

//       if (postErr) throw postErr;

//       // upload images (if any) and insert into post_images
//       if (files?.length) {
//         // sequentially upload to keep it simple (could parallelize)
//         for (let f of files) {
//           // if file already a string (existing URL), skip upload and insert directly
//           let url = null;
//           if (typeof f === "string") url = f;
//           else url = await uploadFile(f, `society-${societyId}/posts/`);

//           const { error: imgErr } = await supabase
//             .from("post_images")
//             .insert([{ post_id: createdPost.id, image_url: url }]);

//           if (imgErr) console.warn("image insert error:", imgErr);
//         }
//       }

//       setContent("");
//       setFiles([]);
//       onPosted && onPosted(createdPost);
//       onClose && onClose();
//     } catch (err) {
//       console.error("Create post fail:", err);
//       alert("Failed to create post: " + (err.message || err));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
//       <div className="w-full max-w-2xl bg-white/6 rounded-lg p-4">
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="text-lg font-semibold">Create Post</h3>
//           <button onClick={onClose} className="px-2">✕</button>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             placeholder="Write something..."
//             className="w-full p-3 bg-black/40 rounded mb-3 min-h-[100px]"
//           />

//           <ImageUploader files={files} setFiles={setFiles} />

//           <div className="flex justify-end gap-2 mt-3">
//             <button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
//             <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-yellow-400">
//               {loading ? "Posting..." : "Post"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }




// "use client";

// import { useState } from "react";
// import { supabase } from "@/lib/supabaseClient";

// export default function CreatePostModal({ open, onClose, societyId, onPosted }) {
//   const [content, setContent] = useState("");
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   if (!open) return null;

//   const handlePost = async () => {
//     if (!content.trim()) return alert("Write something");

//     setLoading(true);
//     try {
//       const { data: userData } = await supabase.auth.getUser();
//       const user = userData.user;

//       // 1️⃣ create post
//       const { data: post, error } = await supabase
//         .from("society_posts")
//         .insert({
//           society_id: societyId,
//           author_id: user.id,
//           content,
//         })
//         .select()
//         .single();

//       if (error) throw error;

//       // 2️⃣ upload images
//       for (const file of images) {
//         const filePath = `posts/${post.id}/${Date.now()}-${file.name}`;

//         const { error: uploadErr } = await supabase.storage
//           .from("society-media")
//           .upload(filePath, file);

//         if (uploadErr) throw uploadErr;

//         const { data: publicUrl } = supabase.storage
//           .from("society-media")
//           .getPublicUrl(filePath);

//         await supabase.from("post_images").insert({
//           post_id: post.id,
//           image_url: publicUrl.publicUrl,
//         });
//       }

//       onPosted(post);
//       onClose();
//       setContent("");
//       setImages([]);
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//       <div className="bg-gray-900 p-6 rounded-xl w-full max-w-lg">
//         <h2 className="text-lg font-semibold mb-3">Create Post</h2>

//         <textarea
//           className="w-full p-3 rounded bg-black/40"
//           placeholder="Write something..."
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />

//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           className="mt-3"
//           onChange={(e) => setImages([...e.target.files])}
//         />

//         <div className="flex justify-end gap-2 mt-4">
//           <button onClick={onClose} className="px-4 py-2 border rounded">
//             Cancel
//           </button>
//           <button
//             onClick={handlePost}
//             disabled={loading}
//             className="px-4 py-2 bg-yellow-400 text-black rounded"
//           >
//             {loading ? "Posting..." : "Post"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }












// // components/CreatePostModal.js
// "use client";

// import React, { useState, useContext } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import { AuthContext } from "@/lib/AuthProvider";
// import { X, Loader2 } from "lucide-react";

// export default function CreatePostModal({ open, onClose, societyId, onPosted }) {
//   const { currentUser } = useContext(AuthContext);
//   const [content, setContent] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!content.trim()) {
//       setError("Post content cannot be empty");
//       return;
//     }

//     if (!currentUser?.id) {
//       setError("You must be logged in to post");
//       return;
//     }

//     setSubmitting(true);
//     setError("");

//     try {
//       // Insert the post
//       const { data: newPost, error: postError } = await supabase
//         .from("society_posts")
//         .insert([{
//           society_id: societyId,
//           author_id: currentUser.id,
//           content: content.trim()
//         }])
//         .select()
//         .single();

//       if (postError) throw postError;

//       // Clear form and close modal
//       setContent("");
//       onClose();
      
//       // Notify parent to refresh posts
//       if (onPosted) onPosted(newPost);
//     } catch (err) {
//       console.error("Post creation error:", err);
//       setError(err.message || "Failed to create post. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleClose = () => {
//     if (!submitting) {
//       setContent("");
//       setError("");
//       onClose();
//     }
//   };

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
//       <div className="bg-gray-800 rounded-xl w-full max-w-2xl border border-gray-700">
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b border-gray-700">
//           <h2 className="text-xl font-semibold text-white">Create Post</h2>
//           <button
//             onClick={handleClose}
//             disabled={submitting}
//             className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-4">
//           {/* User Info */}
//           <div className="flex items-center gap-3 mb-4">
//             <img
//               src={currentUser?.profile_image || "https://via.placeholder.com/40"}
//               alt={currentUser?.name || "User"}
//               className="w-10 h-10 rounded-full object-cover"
//             />
//             <div>
//               <div className="font-medium text-white">{currentUser?.name || "User"}</div>
//               <div className="text-xs text-gray-400">Posting to society</div>
//             </div>
//           </div>

//           {/* Content Input */}
//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             placeholder="What's on your mind?"
//             rows={6}
//             className="w-full bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//             disabled={submitting}
//             required
//           />

//           {/* Error Message */}
//           {error && (
//             <div className="mt-3 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-sm">
//               {error}
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div className="flex items-center justify-end gap-3 mt-4">
//             <button
//               type="button"
//               onClick={handleClose}
//               disabled={submitting}
//               className="px-4 py-2 text-gray-300 hover:text-white transition-colors disabled:opacity-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={submitting || !content.trim()}
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
//             >
//               {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
//               {submitting ? "Posting..." : "Post"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }













// // components/CreatePostModal.js
// "use client";

// import React, { useState, useContext } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import { AuthContext } from "@/lib/AuthProvider";
// import { X, Loader2, Image as ImageIcon, Trash2 } from "lucide-react";

// export default function CreatePostModal({ open, onClose, societyId, onPosted }) {
//   const { currentUser } = useContext(AuthContext);
//   const [content, setContent] = useState("");
//   const [images, setImages] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   const handleImageSelect = (e) => {
//     const files = Array.from(e.target.files || []);
    
//     if (files.length === 0) return;

//     // Limit to 10 images
//     if (images.length + files.length > 10) {
//       setError("Maximum 10 images allowed per post");
//       return;
//     }

//     // Validate file types and sizes
//     const validFiles = [];
//     const validPreviews = [];

//     for (const file of files) {
//       // Check file type
//       if (!file.type.startsWith('image/')) {
//         setError("Only image files are allowed");
//         continue;
//       }

//       // Check file size (max 5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         setError("Each image must be less than 5MB");
//         continue;
//       }

//       validFiles.push(file);
      
//       // Create preview URL
//       const previewUrl = URL.createObjectURL(file);
//       validPreviews.push(previewUrl);
//     }

//     setImages([...images, ...validFiles]);
//     setImagePreviews([...imagePreviews, ...validPreviews]);
//     setError("");
//   };

//   const removeImage = (index) => {
//     // Revoke preview URL to free memory
//     URL.revokeObjectURL(imagePreviews[index]);
    
//     setImages(images.filter((_, i) => i !== index));
//     setImagePreviews(imagePreviews.filter((_, i) => i !== index));
//   };

//   const uploadImage = async (file) => {
//     try {
//       const fileExt = file.name.split('.').pop();
//       const fileName = `${currentUser.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
//       const { data, error } = await supabase.storage
//         .from('society-post-images')
//         .upload(fileName, file, {
//           cacheControl: '3600',
//           upsert: false
//         });

//       if (error) throw error;

//       // Get public URL
//       const { data: { publicUrl } } = supabase.storage
//         .from('society-post-images')
//         .getPublicUrl(data.path);

//       return publicUrl;
//     } catch (err) {
//       console.error("Upload error:", err);
//       throw new Error(`Failed to upload ${file.name}`);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!content.trim() && images.length === 0) {
//       setError("Post must have content or at least one image");
//       return;
//     }

//     if (!currentUser?.id) {
//       setError("You must be logged in to post");
//       return;
//     }

//     setSubmitting(true);
//     setError("");

//     try {
//       // 1. Create the post
//       const { data: newPost, error: postError } = await supabase
//         .from("society_posts")
//         .insert([{
//           society_id: societyId,
//           author_id: currentUser.id,
//           content: content.trim() || ""
//         }])
//         .select()
//         .single();

//       if (postError) throw postError;

//       // 2. Upload images if any
//       if (images.length > 0) {
//         const uploadPromises = images.map(img => uploadImage(img));
//         const imageUrls = await Promise.all(uploadPromises);

//         // 3. Save image URLs to database
//         const imageRecords = imageUrls.map(url => ({
//           post_id: newPost.id,
//           image_url: url
//         }));

//         const { error: imagesError } = await supabase
//           .from("society_post_images")
//           .insert(imageRecords);

//         if (imagesError) throw imagesError;
//       }

//       // Clean up
//       imagePreviews.forEach(url => URL.revokeObjectURL(url));
//       setContent("");
//       setImages([]);
//       setImagePreviews([]);
//       onClose();
      
//       // Notify parent to refresh posts
//       if (onPosted) onPosted(newPost);
//     } catch (err) {
//       console.error("Post creation error:", err);
//       setError(err.message || "Failed to create post. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleClose = () => {
//     if (!submitting) {
//       // Clean up preview URLs
//       imagePreviews.forEach(url => URL.revokeObjectURL(url));
//       setContent("");
//       setImages([]);
//       setImagePreviews([]);
//       setError("");
//       onClose();
//     }
//   };

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
//       <div className="bg-gray-800 rounded-xl w-full max-w-2xl border border-gray-700 max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b border-gray-700 sticky top-0 bg-gray-800 z-10">
//           <h2 className="text-xl font-semibold text-white">Create Post</h2>
//           <button
//             onClick={handleClose}
//             disabled={submitting}
//             className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-4">
//           {/* User Info */}
//           <div className="flex items-center gap-3 mb-4">
//             <img
//               src={currentUser?.profile_image || "https://via.placeholder.com/40"}
//               alt={currentUser?.name || "User"}
//               className="w-10 h-10 rounded-full object-cover"
//             />
//             <div>
//               <div className="font-medium text-white">{currentUser?.name || "User"}</div>
//               <div className="text-xs text-gray-400">Posting to society</div>
//             </div>
//           </div>

//           {/* Content Input */}
//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             placeholder="What's on your mind?"
//             rows={6}
//             className="w-full bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-3"
//             disabled={submitting}
//           />

//           {/* Image Previews */}
//           {imagePreviews.length > 0 && (
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
//               {imagePreviews.map((preview, index) => (
//                 <div key={index} className="relative group">
//                   <img
//                     src={preview}
//                     alt={`Preview ${index + 1}`}
//                     className="w-full h-32 object-cover rounded-lg"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => removeImage(index)}
//                     disabled={submitting}
//                     className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Image Upload Button */}
//           <div className="mb-3">
//             <label className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 cursor-pointer transition-colors w-fit">
//               <ImageIcon className="w-5 h-5" />
//               <span>Add Photos ({images.length}/10)</span>
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={handleImageSelect}
//                 disabled={submitting || images.length >= 10}
//                 className="hidden"
//               />
//             </label>
//             <p className="text-xs text-gray-400 mt-1">
//               Maximum 10 images, 5MB each
//             </p>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="mb-3 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-sm">
//               {error}
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div className="flex items-center justify-end gap-3">
//             <button
//               type="button"
//               onClick={handleClose}
//               disabled={submitting}
//               className="px-4 py-2 text-gray-300 hover:text-white transition-colors disabled:opacity-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={submitting || (!content.trim() && images.length === 0)}
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
//             >
//               {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
//               {submitting ? "Posting..." : "Post"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
































// components/CreatePostModal.js
"use client";

import React, { useState, useContext } from "react";
import { supabase } from "@/lib/supabaseClient";
import { AuthContext } from "@/lib/AuthProvider";
import { X, Loader2, Image as ImageIcon, Trash2 } from "lucide-react";

export default function CreatePostModal({ open, onClose, societyId, onPosted }) {
  const { currentUser } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState("");

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length === 0) return;

    // Limit to 10 images
    if (images.length + files.length > 10) {
      setError("Maximum 10 images allowed per post");
      return;
    }

    // Validate file types and sizes
    const validFiles = [];
    const validPreviews = [];

    for (const file of files) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        setError("Only image files are allowed");
        continue;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Each image must be less than 5MB");
        continue;
      }

      validFiles.push(file);
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      validPreviews.push(previewUrl);
    }

    setImages([...images, ...validFiles]);
    setImagePreviews([...imagePreviews, ...validPreviews]);
    setError("");
  };

  const removeImage = (index) => {
    // Revoke preview URL to free memory
    URL.revokeObjectURL(imagePreviews[index]);
    
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const uploadImage = async (file) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${currentUser.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('society-post-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error("Upload error:", error);
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('society-post-images')
        .getPublicUrl(data.path);

      return publicUrl;
    } catch (err) {
      console.error("Upload error for file:", file.name, err);
      throw new Error(`Failed to upload ${file.name}: ${err.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim() && images.length === 0) {
      setError("Post must have content or at least one image");
      return;
    }

    if (!currentUser?.id) {
      setError("You must be logged in to post");
      return;
    }

    setSubmitting(true);
    setError("");
    setUploadProgress("Creating post...");

    try {
      // 1. Create the post
      const { data: newPost, error: postError } = await supabase
        .from("society_posts")
        .insert([{
          society_id: societyId,
          author_id: currentUser.id,
          content: content.trim() || ""
        }])
        .select()
        .single();

      if (postError) {
        console.error("Post creation error:", postError);
        throw new Error(`Failed to create post: ${postError.message}`);
      }

      // 2. Upload images if any
      if (images.length > 0) {
        setUploadProgress(`Uploading ${images.length} image(s)...`);
        
        const imageUrls = [];
        for (let i = 0; i < images.length; i++) {
          setUploadProgress(`Uploading image ${i + 1} of ${images.length}...`);
          try {
            const url = await uploadImage(images[i]);
            imageUrls.push(url);
          } catch (uploadErr) {
            console.error(`Failed to upload image ${i + 1}:`, uploadErr);
            // Continue with other images even if one fails
          }
        }

        // 3. Save image URLs to database
        if (imageUrls.length > 0) {
          setUploadProgress("Saving images...");
          const imageRecords = imageUrls.map(url => ({
            post_id: newPost.id,
            image_url: url
          }));

          const { error: imagesError } = await supabase
            .from("society_post_images")
            .insert(imageRecords);

          if (imagesError) {
            console.error("Image save error:", imagesError);
            throw new Error(`Failed to save images: ${imagesError.message}`);
          }
        }
      }

      // Clean up
      imagePreviews.forEach(url => URL.revokeObjectURL(url));
      setContent("");
      setImages([]);
      setImagePreviews([]);
      setUploadProgress("");
      onClose();
      
      // Notify parent to refresh posts
      if (onPosted) onPosted(newPost);
    } catch (err) {
      console.error("Post creation error:", err);
      setError(err.message || "Failed to create post. Please try again.");
      setUploadProgress("");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!submitting) {
      // Clean up preview URLs
      imagePreviews.forEach(url => URL.revokeObjectURL(url));
      setContent("");
      setImages([]);
      setImagePreviews([]);
      setError("");
      setUploadProgress("");
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-gray-800 rounded-xl w-full max-w-2xl border border-gray-700 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 sticky top-0 bg-gray-800 z-10">
          <h2 className="text-xl font-semibold text-white">Create Post</h2>
          <button
            onClick={handleClose}
            disabled={submitting}
            className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4">
          {/* User Info */}
          <div className="flex items-center gap-3 mb-4">
            <img
              src={currentUser?.profile_image || "https://via.placeholder.com/40"}
              alt={currentUser?.name || "User"}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-medium text-white">{currentUser?.name || "User"}</div>
              <div className="text-xs text-gray-400">Posting to society</div>
            </div>
          </div>

          {/* Content Input */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            rows={6}
            className="w-full bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-3"
            disabled={submitting}
          />

          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    disabled={submitting}
                    className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Image Upload Button */}
          <div className="mb-3">
            <label className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 cursor-pointer transition-colors w-fit">
              <ImageIcon className="w-5 h-5" />
              <span>Add Photos ({images.length}/10)</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                disabled={submitting || images.length >= 10}
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-400 mt-1">
              Maximum 10 images, 5MB each
            </p>
          </div>

          {/* Upload Progress */}
          {uploadProgress && (
            <div className="mb-3 p-3 bg-blue-500/20 border border-blue-500 rounded-lg text-blue-200 text-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              {uploadProgress}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-3 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={submitting}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || (!content.trim() && images.length === 0)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {submitting ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}