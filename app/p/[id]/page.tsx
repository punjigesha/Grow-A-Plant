"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type GrowthStage = "seed" | "sprout" | "leaves" | "bloom";

interface PlantData {
  id: string;
  plant_name: string;
  pot_type: string;
  recipient_name: string;
  sender_name: string;
  message: string;
  created_at: string;
}

export default function PlantViewPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [stage, setStage] = useState<GrowthStage>("seed");
  const [plantData, setPlantData] = useState<PlantData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlant = async () => {
      const { data, error } = await supabase
        .from("plants")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        console.error("Error fetching plant:", error);
        router.push("/");
        return;
      }

      setPlantData(data);
      setLoading(false);
    };

    fetchPlant();
  }, [id, router]);

  useEffect(() => {
    if (!plantData) return;

    // Get or set the viewer's first visit time for this plant
    const storageKey = `plant_first_view_${id}`;
    let firstViewTime = localStorage.getItem(storageKey);
    
    if (!firstViewTime) {
      // First time viewing this plant
      firstViewTime = Date.now().toString();
      localStorage.setItem(storageKey, firstViewTime);
    }

    // Calculate and update growth stage based on viewer's first visit
    const updateStage = () => {
      const timePassed = (Date.now() - parseInt(firstViewTime!)) / 1000; // in seconds
      
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
  }, [plantData, id]);

  if (loading || !plantData) {
    return (
      <main className="min-h-screen bg-[#F3EFE6] flex items-center justify-center">
        <p className="font-cormorant text-gray-600">Loading...</p>
      </main>
    );
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
            {plantData.plant_name}
          </h1>
          
          <p className="font-cormorant text-xs uppercase tracking-[0.3em] text-gray-600 font-light">
            In a {plantData.pot_type} Pot
          </p>
        </div>

        <p className="font-cormorant text-lg text-gray-700 italic font-light">
          {getStageText()}
        </p>

        {stage === "bloom" && (
          <div className="mt-16 space-y-6 animate-fade-in">
            <p className="font-cormorant text-base text-gray-700 font-light">
              To {plantData.recipient_name},
            </p>
            
            <p className="font-cormorant text-xl text-gray-800 leading-relaxed font-light italic">
              "{plantData.message}"
            </p>
            
            <p className="font-cormorant text-base text-gray-700 font-light">
              — {plantData.sender_name}
            </p>
          </div>
        )}

      </div>

    </main>
  );
}
