"use client";
import React from "react";

export default function SocietyBox({ name, description, image }) {
  return (
    <div className="flex items-center justify-between border-b pb-2">
      <div className="flex items-center gap-2">
        <img
          src={image}
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h3 className="text-sm font-semibold">{name}</h3>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
      <button className="px-3 py-1 text-sm rounded-full bg-blue-600 text-white hover:bg-blue-700">
        Follow
      </button>
    </div>
  );
}
