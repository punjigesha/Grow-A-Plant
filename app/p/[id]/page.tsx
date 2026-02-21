"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { plantStore } from "@/lib/store";

type GrowthStage = "seed" | "sprout" | "leaves" | "bloom";

export default function PlantViewPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [stage, setStage] = useState<GrowthStage>("seed");
  const [plantData, setPlantData] = useState<ReturnType<typeof plantStore.get> | null>(null);

  useEffect(() => {
    // Fetch plant data
    const data = plantStore.get(id);
    
    if (!data) {
      router.push("/");
      return;
    }
    
    setPlantData(data);

    // Calculate and update growth stage
    const updateStage = () => {
      const timePassed = (Date.now() - data.createdAt) / 1000; // in seconds
      
      if (timePassed < 10) {
        setStage("seed");
      } else if (timePassed < 30) {
        setStage("sprout");
      } else if (timePassed < 60) {
        setStage("leaves");
      } else {
        setStage("bloom");
      }
    };

    updateStage();
    const interval = setInterval(updateStage, 1000);

    return () => clearInterval(interval);
  }, [id, router]);

  if (!plantData) {
    return null;
  }

  const getStageText = (): string => {
    switch (stage) {
      case "seed":
        return "The seed has been planted...";
      case "sprout":
        return "The first leaves appear...";
      case "leaves":
        return "It begins to grow...";
      case "bloom":
        return "It is in full bloom.";
    }
  };

  return (
    <main className="min-h-screen bg-[#F3EFE6] flex flex-col items-center justify-center p-8">
      
      <div className="text-center space-y-12 max-w-2xl">
        
        <div className="space-y-6">
          <h1 className="text-6xl font-great-vibes text-gray-800 font-normal">
            {plantData.plant}
          </h1>
          
          <p className="font-cormorant text-xs uppercase tracking-[0.3em] text-gray-600 font-light">
            In a {plantData.pot} Pot
          </p>
        </div>

        <p className="font-cormorant text-lg text-gray-700 italic font-light">
          {getStageText()}
        </p>

        {stage === "bloom" && (
          <div className="mt-16 space-y-6 animate-fade-in">
            <p className="font-cormorant text-base text-gray-700 font-light">
              To {plantData.recipient},
            </p>
            
            <p className="font-cormorant text-xl text-gray-800 leading-relaxed font-light italic">
              "{plantData.message}"
            </p>
            
            <p className="font-cormorant text-base text-gray-700 font-light">
              — {plantData.sender}
            </p>
          </div>
        )}

      </div>

    </main>
  );
}
