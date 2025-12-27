// components/ImageUploader.jsx
"use client";
import React from "react";

export default function ImageUploader({ files, setFiles, maxFiles = 6 }) {
  const onFiles = (e) => {
    const newFiles = Array.from(e.target.files || []);
    // combine and limit
    const combined = [...(files || []), ...newFiles].slice(0, maxFiles);
    setFiles(combined);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={onFiles}
        className="mb-2"
      />
      <div className="flex gap-2 overflow-auto">
        {(files || []).map((f, i) => {
          const url = typeof f === "string" ? f : URL.createObjectURL(f);
          return (
            <div key={i} className="relative w-24 h-24 rounded overflow-hidden border">
              <img src={url} alt={`img-${i}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
