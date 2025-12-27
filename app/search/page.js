"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { AuthContext } from "@/lib/AuthProvider";
import { Search, ArrowLeft } from "lucide-react";
import BottomNavbar from "@/components/BottomNavbar";

export default function SearchPage() {
  const router = useRouter();
  const { currentUser, loading: authLoading } = useContext(AuthContext);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  // Check authentication
  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push("/login");
    }
  }, [currentUser, authLoading, router]);

  // Load recent searches from localStorage
  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    setRecentSearches(recent.slice(0, 5));
  }, []);

  // Search effect
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    let mounted = true;

    const timeout = setTimeout(async () => {
      setLoading(true);

      try {
        const { data, error } = await supabase
          .from("questions")
          .select("id, title, category, question, created_at")
          .or(
            `title.ilike.%${query}%,question.ilike.%${query}%,category.ilike.%${query}%`
          )
          .order("created_at", { ascending: false })
          .limit(20);

        if (error) {
          console.error("Search error:", error);
          if (mounted) {
            setResults([]);
            setLoading(false);
          }
        } else {
          if (mounted) {
            setResults(data || []);
            setLoading(false);
          }
        }
      } catch (err) {
        console.error('Search failed:', err);
        if (mounted) {
          setResults([]);
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      mounted = false;
      clearTimeout(timeout);
    };
  }, [query]);

  const handleResultClick = (question) => {
    // Save to recent searches
    const recent = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    const newRecent = [
      question.title,
      ...recent.filter(r => r !== question.title)
    ].slice(0, 5);
    localStorage.setItem("recentSearches", JSON.stringify(newRecent));

    router.push(`/question/${question.id}`);
  };

  const handleRecentClick = (searchTerm) => {
    setQuery(searchTerm);
  };

  const clearRecent = () => {
    localStorage.removeItem("recentSearches");
    setRecentSearches([]);
  };

  if (authLoading || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-black to-black">
        <div className="text-white flex items-center gap-3">
          <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "linear-gradient(to bottom, #4C1D95, #000000 60%)" }}
    >
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/15 px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="text-white/80 hover:text-white"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1 flex items-center bg-white/10 border border-white/20 px-3 py-2 rounded-lg">
            <Search size={18} className="text-white/70" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions..."
              autoFocus
              className="ml-2 bg-transparent outline-none text-sm flex-1 text-white placeholder-white/60"
            />
          </div>
        </div>
      </div>

      <div className="px-4 py-6 pb-20">
        {/* Recent Searches */}
        {!query && recentSearches.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white/80">
                Recent Searches
              </h3>
              <button
                onClick={clearRecent}
                className="text-xs text-yellow-400 hover:text-yellow-300"
              >
                Clear
              </button>
            </div>
            <div className="space-y-2">
              {recentSearches.map((term, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRecentClick(term)}
                  className="w-full text-left px-4 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Search size={16} className="text-white/50" />
                    <span className="text-sm text-white/80">{term}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-10">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-white/70">Searching...</span>
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && query && results.length === 0 && (
          <div className="text-center py-10">
            <p className="text-white/60">No questions found matching "{query}"</p>
          </div>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white/80 mb-3">
              {results.length} Result{results.length !== 1 ? 's' : ''}
            </h3>
            {results.map((q) => (
              <div
                key={q.id}
                onClick={() => handleResultClick(q)}
                className="bg-white/5 border border-white/10 rounded-xl p-4 cursor-pointer hover:bg-white/10 transition-colors"
              >
                <h4 className="text-white font-medium mb-2 line-clamp-2">
                  {q.title}
                </h4>
                <p className="text-white/60 text-sm mb-2 line-clamp-2">
                  {q.question}
                </p>
                {q.category && (
                  <span className="inline-block text-xs px-2 py-1 rounded-full bg-yellow-400/20 text-yellow-400 border border-yellow-400/30">
                    {q.category}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!query && recentSearches.length === 0 && (
          <div className="text-center py-20">
            <Search size={48} className="text-white/30 mx-auto mb-4" />
            <p className="text-white/50">Search for questions</p>
          </div>
        )}
      </div>

      <BottomNavbar />
    </div>
  );
}