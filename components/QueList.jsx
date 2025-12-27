// 'use client'
// import React,{ useState} from 'react'
// import { que_data } from '@/Assets/assets';
// import Quebox from '@/components/QueBox';

// export default function QueList() {

//    const [menu,setMenu]=useState("All")
//     // const [blogs,setBlogs]=useState([]);
//     console.log("imported quedata",que_data);
//   return (
//    <>
//      <div>
//         <div className='flex justify-center gap-6 my-10'>
//             <button onClick={()=>setMenu('All')}  className={menu==="All"?'bg-black text-white py-1 px-4 rounded-sm':""}>All</button>
//         <button onClick={()=>setMenu('Technology')}  className={menu==="Technology"?'bg-black text-white py-1 px-4 rounded-sm':""}>Technology</button>
//         <button onClick={()=>setMenu('Startup')}  className={menu==="Startup"?'bg-black text-white py-1 px-4 rounded-sm':""}>Startup</button>
//         <button onClick={()=>setMenu('Finance')}  className={menu==="Finance"?'bg-black text-white py-1 px-4 rounded-sm':""}>Finance</button>
//               <button onClick={()=>setMenu('GATE')}  className={menu==="GATE"?'bg-black text-white py-1 px-4 rounded-sm':""}>GATE</button>
//         </div>   
//         <div className='flex flex-col items-center px-4 sm:px-2 md:px-3 w-full'>
        
//             {que_data
//   .filter((item) => menu === "All" ? true : item.category === menu)
//   .map((item, index) => (
//     <Quebox 
//       key={item.id || index} 
//       id={item.id} 
//       category={item.category} 
//       que={item.que} 
//     />
//   ))
// }

//         </div>
//     </div>
//    </>
//   );
// }




// "use client";
// import React, { useState } from "react";
// import { que_data } from "@/Assets/assets";
// import Quebox from "./Quebox";

// export default function QueList() {
//   const [menu, setMenu] = useState("All");

//   return (
//     <div>
//       {/* Filter Buttons */}
//       <div className="flex justify-center gap-6 my-10">
//         {["All", "Technology", "Startup", "Finance", "GATE"].map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setMenu(cat)}
//             className={
//               menu === cat
//                 ? "bg-black text-white py-1 px-4 rounded-sm"
//                 : "py-1 px-4"
//             }
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* Questions */}
//       <div className="flex flex-col items-center px-4 sm:px-2 md:px-3 w-full">
//         {que_data
//           .filter((item) => (menu === "All" ? true : item.category === menu))
//           .map((item, index) => (
//             <Quebox
//               key={item.id || index}
//               id={item.id}
//               category={item.category}
//               que={item.que}
//             />
//           ))}
//       </div>
//     </div>
//   );
// }




"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import QueBox from "./QueBox";


export default function QueList() {
  const [menu, setMenu] = useState("All");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch questions from Supabase
  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from("questions")
        .select("id, title, question, category, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching questions:", error.message);
      } else {
        setQuestions(data || []);
      }
      setLoading(false);
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      {/* Category Filter */}
      <div className="flex justify-center gap-6 my-6">
        {["All", "Technology", "Startup", "Finance", "GATE"].map((cat) => (
          <button
            key={cat}
            onClick={() => setMenu(cat)}
            className={
              menu === cat
                ? "bg-black text-white py-1 px-4 rounded-sm"
                : "py-1 px-4 border border-gray-600 rounded-sm text-gray-300"
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Questions */}
      <div className="flex flex-col items-center w-full space-y-4">
        {loading ? (
          <p className="text-gray-400 text-sm">Loading questions...</p>
        ) : questions.length === 0 ? (
          <p className="text-gray-400 text-sm">No questions posted yet.</p>
        ) : (
          questions
            .filter((item) => (menu === "All" ? true : item.category === menu))
            .map((item) => (
              <QueBox
                key={item.id}
                id={item.id}
                category={item.category}
                que={item.question}
              />
            ))
        )}
      </div>
    </div>
  );
}
