import Image from "next/image";

interface PotIllustrationProps {
  potType: string;
  className?: string;
}

export default function PotIllustration({ potType, className = "" }: PotIllustrationProps) {
  // Convert pot type to lowercase for file path
  const potFileName = potType.toLowerCase();
  const imagePath = `/pots/${potFileName}.svg`;

  return (
    <Image
      src={imagePath}
      alt={`${potType} pot`}
      width={256}
      height={128}
      className={className}
      priority
    />
  );
}
