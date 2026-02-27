"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#F3EFE6] flex flex-col items-center justify-center p-8">
      
      <div className="text-center space-y-8 mb-24">
        <h1 className="text-6xl font-beth-ellen text-gray-800 font-normal">
          Grow a Plant
        </h1>
        
        <p className="font-cormorant text-xs uppercase tracking-[0.3em] text-gray-600 font-light">
          Beautiful Plants Delivered Digitally
        </p>
      </div>

      <div className="flex flex-col gap-5 items-center">
        <button 
          onClick={() => router.push("/pot")}
          className="px-10 py-3 bg-black text-white font-cormorant text-sm uppercase tracking-[0.2em] transition-opacity hover:opacity-75 font-light"
        >
          Build a Plant
        </button>
        
        <button 
          className="px-10 py-3 border border-black bg-transparent text-black font-cormorant text-sm uppercase tracking-[0.2em] transition-opacity hover:opacity-60 font-light"
        >
          Learn More
        </button>
      </div>

    </main>
  );
}