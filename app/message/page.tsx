"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

function MessageForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plant = searchParams.get("plant");
  
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");
  const [senderName, setSenderName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wordCount = message.trim().split(/\s+/).filter(word => word.length > 0).length;
  const isOverLimit = wordCount > 30;

  const handleSubmit = async () => {
    if (!recipientName || !message || !senderName || isOverLimit || !plant) return;
    
    setIsSubmitting(true);
    setError(null);

    // Randomly select a pot
    const pots = ["Clay", "Ceramic", "Glass", "Vintage"];
    const randomPot = pots[Math.floor(Math.random() * pots.length)];

    try {
      const { data, error } = await supabase
        .from("plants")
        .insert([
          {
            plant_name: plant,
            pot_type: randomPot,
            sender_name: senderName,
            recipient_name: recipientName,
            message: message,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Error saving plant:", error);
        setError("Failed to save plant. Please try again.");
        setIsSubmitting(false);
        return;
      }

      console.log("Plant saved successfully:", data);
      router.push(`/p/${data.id}`);
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F3EFE6] flex flex-col items-center justify-center p-8">
      
      <div className="text-center space-y-6 mb-16">
        <h1 className="text-6xl font-great-vibes text-gray-800 font-normal">
          Plant it with a note
        </h1>
        
        <p className="font-cormorant text-sm text-gray-600 italic font-light">
          Every plant carries a message.
        </p>
      </div>

      <div className="w-full max-w-md space-y-10">
        
        <div className="space-y-2">
          <label className="font-cormorant text-xs uppercase tracking-[0.2em] text-gray-600 font-light block">
            Recipient Name
          </label>
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className="w-full bg-transparent border-b border-gray-400 py-2 font-cormorant text-lg text-gray-800 focus:outline-none focus:border-gray-700 transition-colors"
            placeholder="Their name"
          />
        </div>

        <div className="space-y-2">
          <label className="font-cormorant text-xs uppercase tracking-[0.2em] text-gray-600 font-light block">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full bg-transparent border-b border-gray-400 py-2 font-cormorant text-lg text-gray-800 focus:outline-none focus:border-gray-700 transition-colors resize-none"
            placeholder="Your message..."
          />
          <p className={`font-cormorant text-xs text-right transition-colors ${isOverLimit ? 'text-red-500' : 'text-gray-500'}`}>
            {wordCount} / 30 words
          </p>
        </div>

        <div className="space-y-2">
          <label className="font-cormorant text-xs uppercase tracking-[0.2em] text-gray-600 font-light block">
            Your Name
          </label>
          <input
            type="text"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className="w-full bg-transparent border-b border-gray-400 py-2 font-cormorant text-lg text-gray-800 focus:outline-none focus:border-gray-700 transition-colors"
            placeholder="From you"
          />
        </div>

      </div>

      {error && (
        <p className="mt-8 font-cormorant text-sm text-red-600">
          {error}
        </p>
      )}

      <button 
        onClick={handleSubmit}
        disabled={!recipientName || !message || !senderName || isOverLimit || isSubmitting}
        className="mt-16 px-10 py-3 bg-black text-white font-cormorant text-sm uppercase tracking-[0.2em] transition-opacity hover:opacity-75 font-light disabled:opacity-30 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Planting..." : "Grow This Plant"}
      </button>

    </main>
  );
}

export default function MessagePage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#F3EFE6] flex items-center justify-center">
        <p className="font-cormorant text-gray-600">Loading...</p>
      </main>
    }>
      <MessageForm />
    </Suspense>
  );
}
