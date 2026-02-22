import Image from "next/image";

interface PlantGrowthProps {
  plantName: string;
  currentStage: "seed" | "sprout" | "leaves" | "bloom";
}

export default function PlantGrowth({ plantName, currentStage }: PlantGrowthProps) {
  // Convert plant name to lowercase for file path
  const plantFolder = plantName.toLowerCase();

  // Map stage to image filename
  const stageToFile: Record<string, string> = {
    seed: "seed",
    sprout: "sprout",
    leaves: "young",
    bloom: "bloom"
  };

  // Get the current plant image path
  const plantImage = `/plants/${plantFolder}/${stageToFile[currentStage]}.png`;

  return (
    <div className="plant-container">
      <div className="plant-breathe">
        <img
          key={currentStage}
          src={plantImage}
          alt={`${plantName} ${currentStage}`}
          className="plant-image"
        />
      </div>
    </div>
  );
}
