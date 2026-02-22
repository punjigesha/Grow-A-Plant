import Image from "next/image";

interface PlantIllustrationProps {
  plantName: string;
  stage: "seed" | "sprout" | "leaves" | "bloom";
  className?: string;
}

export default function PlantIllustration({ plantName, stage, className = "" }: PlantIllustrationProps) {
  // Map "leaves" stage to "young" filename
  const stageFileName = stage === "leaves" ? "young" : stage;
  
  // Convert plant name to lowercase for file path
  const plantFolder = plantName.toLowerCase();
  
  const imagePath = `/plants/${plantFolder}/${stageFileName}.svg`;

  return (
    <Image
      src={imagePath}
      alt={`${plantName} - ${stage}`}
      width={128}
      height={128}
      className={className}
      priority
    />
  );
}
