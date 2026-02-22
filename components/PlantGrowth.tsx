import Image from "next/image";

interface PlantGrowthProps {
  plantName: string;
  currentStage: "seed" | "sprout" | "leaves" | "bloom";
}

export default function PlantGrowth({ plantName, currentStage }: PlantGrowthProps) {
  // Convert plant name to lowercase for file path
  const plantFolder = plantName.toLowerCase();

  // Map internal stage names to file names
  const stages = {
    seed: "seed",
    sprout: "sprout",
    leaves: "young",
    bloom: "bloom"
  };

  // Determine visibility and animation classes for each stage
  const getStageClasses = (stage: keyof typeof stages) => {
    let isVisible = false;

    if (stage === "seed" && currentStage === "seed") {
      isVisible = true;
    } else if (stage === "sprout" && currentStage !== "seed") {
      isVisible = true;
    } else if (stage === "leaves" && (currentStage === "leaves" || currentStage === "bloom")) {
      isVisible = true;
    } else if (stage === "bloom" && currentStage === "bloom") {
      isVisible = true;
    }

    return `absolute inset-0 transition-all duration-[2600ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
      isVisible 
        ? "opacity-100 scale-100 blur-0 translate-y-0" 
        : "opacity-0 scale-[0.96] blur-sm translate-y-2"
    }`;
  };

  return (
    <div className="plant-breathe">
      <div className="relative w-[280px] h-[280px] mx-auto">
        {/* Watercolor glow effect */}
        <div className="absolute inset-0 bg-[#f4efe6] blur-3xl opacity-40 rounded-full" />
        
        {/* Seed stage */}
        <div className={getStageClasses("seed")}>
          <Image
            src={`/plants/${plantFolder}/seed.png`}
            alt={`${plantName} seed`}
            fill
            className="object-contain"
            priority
            loading="eager"
          />
        </div>

        {/* Sprout stage */}
        <div className={getStageClasses("sprout")}>
          <Image
            src={`/plants/${plantFolder}/sprout.png`}
            alt={`${plantName} sprout`}
            fill
            className="object-contain"
            priority
            loading="eager"
          />
        </div>

        {/* Young/Leaves stage */}
        <div className={getStageClasses("leaves")}>
          <Image
            src={`/plants/${plantFolder}/young.png`}
            alt={`${plantName} young`}
            fill
            className="object-contain"
            priority
            loading="eager"
          />
        </div>

        {/* Bloom stage */}
        <div className={getStageClasses("bloom")}>
          <Image
            src={`/plants/${plantFolder}/bloom.png`}
            alt={`${plantName} bloom`}
            fill
            className="object-contain"
            priority
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}
