interface PlantIllustrationProps {
  plantName: string;
  stage: "seed" | "sprout" | "leaves" | "bloom";
  className?: string;
}

export default function PlantIllustration({ plantName, stage, className = "" }: PlantIllustrationProps) {
  // Cactus illustrations
  if (plantName === "Cactus") {
    if (stage === "seed") {
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="70" rx="8" ry="6" fill="#8B7355" />
        </svg>
      );
    }
    if (stage === "sprout") {
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="75" rx="10" ry="7" fill="#8B7355" />
          <rect x="47" y="60" width="6" height="15" rx="3" fill="#7C9A6D" />
        </svg>
      );
    }
    if (stage === "leaves") {
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="78" rx="12" ry="8" fill="#8B7355" />
          <rect x="46" y="50" width="8" height="28" rx="4" fill="#7C9A6D" />
          <line x1="50" y1="65" x2="48" y2="63" stroke="#5A6B54" strokeWidth="1" />
          <line x1="50" y1="60" x2="52" y2="58" stroke="#5A6B54" strokeWidth="1" />
        </svg>
      );
    }
    // bloom
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="80" rx="14" ry="9" fill="#8B7355" />
        <rect x="45" y="40" width="10" height="40" rx="5" fill="#7C9A6D" />
        <line x1="50" y1="70" x2="47" y2="68" stroke="#5A6B54" strokeWidth="1.5" />
        <line x1="50" y1="65" x2="53" y2="63" stroke="#5A6B54" strokeWidth="1.5" />
        <line x1="50" y1="55" x2="48" y2="53" stroke="#5A6B54" strokeWidth="1.5" />
        <circle cx="50" cy="35" r="5" fill="#E8B4B8" />
        <circle cx="46" cy="37" r="3" fill="#E8B4B8" opacity="0.8" />
        <circle cx="54" cy="37" r="3" fill="#E8B4B8" opacity="0.8" />
      </svg>
    );
  }

  // Lavender illustrations
  if (plantName === "Lavender") {
    if (stage === "seed") {
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="70" rx="8" ry="6" fill="#8B7355" />
        </svg>
      );
    }
    if (stage === "sprout") {
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="75" rx="10" ry="7" fill="#8B7355" />
          <line x1="50" y1="75" x2="50" y2="55" stroke="#7C9A6D" strokeWidth="2" />
          <ellipse cx="50" cy="53" rx="3" ry="5" fill="#9B8FA6" opacity="0.6" />
        </svg>
      );
    }
    if (stage === "leaves") {
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="78" rx="12" ry="8" fill="#8B7355" />
          <line x1="50" y1="78" x2="50" y2="45" stroke="#7C9A6D" strokeWidth="2.5" />
          <ellipse cx="50" cy="43" rx="4" ry="8" fill="#9B8FA6" opacity="0.7" />
          <ellipse cx="50" cy="50" rx="3" ry="6" fill="#9B8FA6" opacity="0.5" />
        </svg>
      );
    }
    // bloom
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="80" rx="14" ry="9" fill="#8B7355" />
        <line x1="50" y1="80" x2="50" y2="30" stroke="#7C9A6D" strokeWidth="3" />
        <ellipse cx="50" cy="28" rx="5" ry="12" fill="#B8A8D0" />
        <ellipse cx="50" cy="35" rx="4" ry="10" fill="#9B8FA6" opacity="0.8" />
        <ellipse cx="50" cy="42" rx="3" ry="8" fill="#9B8FA6" opacity="0.6" />
        <line x1="48" y1="60" x2="44" y2="58" stroke="#7C9A6D" strokeWidth="1.5" />
        <line x1="52" y1="60" x2="56" y2="58" stroke="#7C9A6D" strokeWidth="1.5" />
      </svg>
    );
  }

  // Basil illustrations
  if (plantName === "Basil") {
    if (stage === "seed") {
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="70" rx="8" ry="6" fill="#8B7355" />
        </svg>
      );
    }
    if (stage === "sprout") {
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="75" rx="10" ry="7" fill="#8B7355" />
          <line x1="50" y1="75" x2="50" y2="60" stroke="#7C9A6D" strokeWidth="2" />
          <ellipse cx="48" cy="58" rx="4" ry="6" fill="#7C9A6D" opacity="0.7" />
          <ellipse cx="52" cy="58" rx="4" ry="6" fill="#7C9A6D" opacity="0.7" />
        </svg>
      );
    }
    if (stage === "leaves") {
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="78" rx="12" ry="8" fill="#8B7355" />
          <line x1="50" y1="78" x2="50" y2="50" stroke="#7C9A6D" strokeWidth="2.5" />
          <ellipse cx="45" cy="55" rx="6" ry="9" fill="#7C9A6D" />
          <ellipse cx="55" cy="55" rx="6" ry="9" fill="#7C9A6D" />
          <ellipse cx="48" cy="48" rx="5" ry="8" fill="#7C9A6D" opacity="0.8" />
          <ellipse cx="52" cy="48" rx="5" ry="8" fill="#7C9A6D" opacity="0.8" />
        </svg>
      );
    }
    // bloom
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="80" rx="14" ry="9" fill="#8B7355" />
        <line x1="50" y1="80" x2="50" y2="40" stroke="#7C9A6D" strokeWidth="3" />
        <ellipse cx="42" cy="50" rx="7" ry="11" fill="#7C9A6D" />
        <ellipse cx="58" cy="50" rx="7" ry="11" fill="#7C9A6D" />
        <ellipse cx="45" cy="42" rx="6" ry="10" fill="#8AAF7A" />
        <ellipse cx="55" cy="42" rx="6" ry="10" fill="#8AAF7A" />
        <ellipse cx="48" cy="35" rx="5" ry="9" fill="#7C9A6D" opacity="0.9" />
        <ellipse cx="52" cy="35" rx="5" ry="9" fill="#7C9A6D" opacity="0.9" />
      </svg>
    );
  }

  // Wildflower illustrations
  if (plantName === "Wildflower") {
    if (stage === "seed") {
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="70" rx="8" ry="6" fill="#8B7355" />
        </svg>
      );
    }
    if (stage === "sprout") {
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="75" rx="10" ry="7" fill="#8B7355" />
          <line x1="50" y1="75" x2="50" y2="58" stroke="#7C9A6D" strokeWidth="2" />
          <circle cx="50" cy="55" r="3" fill="#E8D4A0" opacity="0.6" />
        </svg>
      );
    }
    if (stage === "leaves") {
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="78" rx="12" ry="8" fill="#8B7355" />
          <line x1="50" y1="78" x2="50" y2="48" stroke="#7C9A6D" strokeWidth="2.5" />
          <ellipse cx="46" cy="60" rx="4" ry="7" fill="#7C9A6D" opacity="0.7" />
          <ellipse cx="54" cy="60" rx="4" ry="7" fill="#7C9A6D" opacity="0.7" />
          <circle cx="50" cy="45" r="4" fill="#E8D4A0" opacity="0.8" />
        </svg>
      );
    }
    // bloom
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="80" rx="14" ry="9" fill="#8B7355" />
        <line x1="50" y1="80" x2="50" y2="35" stroke="#7C9A6D" strokeWidth="3" />
        <ellipse cx="45" cy="55" rx="5" ry="8" fill="#7C9A6D" />
        <ellipse cx="55" cy="55" rx="5" ry="8" fill="#7C9A6D" />
        <circle cx="50" cy="30" r="6" fill="#F4E4C1" />
        <circle cx="44" cy="32" r="4" fill="#E8D4A0" />
        <circle cx="56" cy="32" r="4" fill="#E8D4A0" />
        <circle cx="47" cy="26" r="3" fill="#E8D4A0" />
        <circle cx="53" cy="26" r="3" fill="#E8D4A0" />
        <circle cx="50" cy="30" r="3" fill="#D4A574" />
      </svg>
    );
  }

  return null;
}
