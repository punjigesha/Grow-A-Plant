"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import PlantGrowth from "@/components/PlantGrowth";
import Head from "next/head";

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
  const [timeUntilNext, setTimeUntilNext] = useState<number>(0);

  const plantUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = "Someone Grew This For You";
  const shareDescription = "someone sent you something that grows 🌱";

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

    // Calculate and update growth stage based on plant creation time
    const updateStage = () => {
      const createdAt = new Date(plantData.created_at).getTime();
      const timePassed = (Date.now() - createdAt) / 1000; // in seconds
      
      let nextStageTime = 0;
      
      if (timePassed < 10) {
        setStage("seed");
        nextStageTime = 10 - timePassed;
      } else if (timePassed < 30) {
        setStage("sprout");
        nextStageTime = 30 - timePassed;
      } else if (timePassed < 60) {
        setStage("leaves");
        nextStageTime = 60 - timePassed;
      } else {
        setStage("bloom");
        nextStageTime = 0;
      }
      
      setTimeUntilNext(Math.ceil(nextStageTime));
    };

    updateStage();
    const interval = setInterval(updateStage, 1000);

    return () => clearInterval(interval);
  }, [plantData]);

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
          title: shareTitle,
          text: shareDescription,
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

  // Set meta tags for social sharing
  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Update page title
      document.title = shareTitle;
      
      // Update or create meta tags
      const updateMetaTag = (property: string, content: string) => {
        let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        meta.content = content;
      };

      const updateMetaName = (name: string, content: string) => {
        let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('name', name);
          document.head.appendChild(meta);
        }
        meta.content = content;
      };

      // Open Graph tags
      updateMetaTag('og:title', shareTitle);
      updateMetaTag('og:description', shareDescription);
      updateMetaTag('og:url', plantUrl);
      updateMetaTag('og:type', 'website');
      
      // Twitter Card tags
      updateMetaName('twitter:card', 'summary_large_image');
      updateMetaName('twitter:title', shareTitle);
      updateMetaName('twitter:description', shareDescription);
      
      // Description meta tag
      updateMetaName('description', shareDescription);
    }
  }, [plantUrl]);

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
          <h1 className="text-6xl font-rallomy text-gray-800 font-normal">
            {plantData.plant_name}
          </h1>
        </div>

        {/* Plant Growth Animation */}
        <PlantGrowth 
          plantName={plantData.plant_name} 
          currentStage={stage}
        />

        <p className="font-cormorant text-lg text-gray-700 italic font-light">
          {getStageText()}
        </p>

        {stage !== "bloom" && timeUntilNext > 0 && (
          <p className="font-cormorant text-sm text-gray-500 font-light">
            Growing quietly… Next change in {timeUntilNext}s
          </p>
        )}

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
