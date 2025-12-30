import { Suspense } from "react";
import AskQuestionClient from "./AskQuestionClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AskQuestionPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black flex items-center justify-center">
          <div className="text-white text-center">
            <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p>Loading...</p>
          </div>
        </div>
      }
    >
      <AskQuestionClient />
    </Suspense>
  );
}
