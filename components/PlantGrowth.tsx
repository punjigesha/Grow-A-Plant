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

  // Determine visibility for each stage
  const getStageClasses = (stage: keyof typeof stages) => {
    let isVisible = false;

    if (stage === "seed" && currentStage === "seed") {
      isVisible = true;
    } else if (stage === "sprout" && (currentStage === "sprout" || currentStage === "leaves" || currentStage === "bloom")) {
      isVisible = true;
    } else if (stage === "leaves" && (currentStage === "leaves" || currentStage === "bloom")) {
      isVisible = true;
    } else if (stage === "bloom" && currentStage === "bloom") {
      isVisible = true;
    }

    return `absolute inset-0 transition-all duration-[2000ms] ease-in-out ${
      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
    }`;
  };

  return (
    <div className="relative w-[260px] h-[260px] mx-auto">
      {/* Seed stage */}
      <div className={getStageClasses("seed")}>
        <Image
          src={`/plants/${plantFolder}/seed.png`}
          alt={`${plantName} seed`}
          fill
          className="object-contain"
          priority
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
        />
      </div>
    </div>
  );
}
