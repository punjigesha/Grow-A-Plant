"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

function PlantSelection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedPlant, setSelectedPlant] = useState<string | null>(null);

  const plants = ["Cactus", "Lavender", "Basil", "Wildflower"];

  return (
    <main className="min-h-screen bg-[#F3EFE6] flex flex-col items-center justify-center p-8">
      
      <div className="text-center space-y-6 mb-20">
        <h1 className="text-6xl font-great-vibes text-gray-800 font-normal">
          Pick Your Plant
        </h1>
        
        <p className="font-cormorant text-xs uppercase tracking-[0.3em] text-gray-600 font-light">
          Select One to Begin
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-x-16 gap-y-12 mb-20 max-w-3xl">
        {plants.map((plant) => (
          <button
            key={plant}
            onClick={() => setSelectedPlant(plant)}
            className={`font-cormorant text-3xl transition-all duration-300 relative font-light
              ${selectedPlant === plant 
                ? "text-gray-800" 
                : "text-gray-400 hover:text-gray-600"
              }`}
          >
            {plant}
            {selectedPlant === plant && (
              <span className="absolute -bottom-2 left-0 right-0 h-px bg-gray-800"></span>
            )}
          </button>
        ))}
      </div>

      {selectedPlant && (
        <button 
          onClick={() => router.push(`/message?plant=${encodeURIComponent(selectedPlant)}`)}
          className="px-10 py-3 bg-black text-white font-cormorant text-sm uppercase tracking-[0.2em] transition-opacity hover:opacity-75 font-light"
        >
          Continue
        </button>
      )}

    </main>
  );
}

export default function PotPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#F3EFE6] flex items-center justify-center">
        <p className="font-cormorant text-gray-600">Loading...</p>
      </main>
    }>
      <PlantSelection />
    </Suspense>
  );
}