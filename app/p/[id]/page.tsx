"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import PlantIllustration from "@/components/PlantIllustration";

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
  const [copied, setCopied] = useState(false);

  const plantUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareMessage = "hey, grow a plant with me!";

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

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(plantUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Grow a Plant",
          text: shareMessage,
          url: plantUrl,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback to copy if Web Share API is not supported
      handleCopyLink();
    }
  };

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

        {/* Plant Illustration */}
        <div className="w-64 h-64 mx-auto flex items-center justify-center">
          <PlantIllustration 
            plantName={plantData.plant_name} 
            stage={stage} 
            className="w-48 h-48" 
          />
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

        <div className="mt-16 flex flex-col gap-4 items-center">
          <button
            onClick={() => router.push("/")}
            className="px-8 py-3 bg-black text-white font-cormorant text-sm uppercase tracking-[0.2em] transition-opacity hover:opacity-75 font-light"
          >
            Grow a New Plant!
          </button>
          
          <div className="flex gap-4">
            <button
              onClick={handleCopyLink}
              className="px-8 py-3 border border-black bg-transparent text-black font-cormorant text-sm uppercase tracking-[0.2em] transition-opacity hover:opacity-60 font-light"
            >
              {copied ? "Copied!" : "Copy Link"}
            </button>
            
            <button
              onClick={handleShare}
              className="px-8 py-3 border border-black bg-transparent text-black font-cormorant text-sm uppercase tracking-[0.2em] transition-opacity hover:opacity-60 font-light"
            >
              Share
            </button>
          </div>
        </div>

      </div>

    </main>
  );
}
