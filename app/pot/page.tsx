"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const dynamic = "force-dynamic";

function PlantSelection() {
  const router = useRouter();
  const [selectedPlant, setSelectedPlant] = useState<string | null>(null);

  const plants = ["Cactus", "Lavender", "Basil", "Wildflower"];

  return (
    <main className="min-h-screen bg-[#F3EFE6] flex flex-col items-center justify-center p-8">
      
      <div className="text-center space-y-6 mb-20">
        <h1 className="text-6xl font-beth-ellen text-gray-800 font-normal">
          Pick Your Plant
        </h1>
        
        <p className="font-cormorant text-xs uppercase tracking-[0.3em] text-gray-600 font-light">
          Select One to Begin
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 max-w-5xl">
        {plants.map((plant) => (
          <button
            key={plant}
            onClick={() => setSelectedPlant(plant)}
            className={`flex flex-col items-center gap-4 p-6 transition-all duration-300 rounded-2xl
              ${selectedPlant === plant 
                ? "bg-white/50 shadow-lg" 
                : "hover:bg-white/30"
              }`}
          >
            <div className="relative w-32 h-32">
              <Image
                src={`/plants/${plant.toLowerCase()}/bloom.png`}
                alt={plant}
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className={`font-cormorant text-2xl transition-all duration-300 font-light
              ${selectedPlant === plant 
                ? "text-gray-800" 
                : "text-gray-500"
              }`}
            >
              {plant}
            </span>
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