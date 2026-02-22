interface PotIllustrationProps {
  potType: string;
  className?: string;
}

export default function PotIllustration({ potType, className = "" }: PotIllustrationProps) {
  // Clay pot
  if (potType === "Clay") {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 75 L25 90 C25 95 30 98 50 98 C70 98 75 95 75 90 L70 75 Z" fill="#C17A5C" />
        <ellipse cx="50" cy="75" rx="20" ry="6" fill="#D4956F" />
        <rect x="35" y="70" width="30" height="3" rx="1" fill="#A86B4E" />
      </svg>
    );
  }

  // Ceramic pot
  if (potType === "Ceramic") {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 75 L28 90 C28 94 33 97 50 97 C67 97 72 94 72 90 L68 75 Z" fill="#E8E8E8" />
        <ellipse cx="50" cy="75" rx="18" ry="5" fill="#F5F5F5" />
        <rect x="37" y="71" width="26" height="2" rx="1" fill="#D0D0D0" />
        <line x1="40" y1="80" x2="40" y2="92" stroke="#D0D0D0" strokeWidth="0.5" opacity="0.5" />
        <line x1="60" y1="80" x2="60" y2="92" stroke="#D0D0D0" strokeWidth="0.5" opacity="0.5" />
      </svg>
    );
  }

  // Glass pot
  if (potType === "Glass") {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M33 75 L30 90 C30 93 35 96 50 96 C65 96 70 93 70 90 L67 75 Z" fill="#E3F2F7" opacity="0.6" stroke="#B8D8E3" strokeWidth="1.5" />
        <ellipse cx="50" cy="75" rx="17" ry="5" fill="#D4E8EF" opacity="0.4" stroke="#B8D8E3" strokeWidth="1" />
        <line x1="38" y1="78" x2="37" y2="88" stroke="#FFFFFF" strokeWidth="1" opacity="0.7" />
        <line x1="62" y1="78" x2="63" y2="88" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.5" />
      </svg>
    );
  }

  // Vintage pot
  if (potType === "Vintage") {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M31 75 L27 90 C27 94 32 97 50 97 C68 97 73 94 73 90 L69 75 Z" fill="#9B8B7E" />
        <ellipse cx="50" cy="75" rx="19" ry="6" fill="#B5A599" />
        <rect x="36" y="70" width="28" height="3" rx="1" fill="#7A6B5D" />
        <circle cx="50" cy="83" r="4" fill="#8B7B6F" opacity="0.6" />
        <path d="M45 83 Q50 80 55 83" stroke="#7A6B5D" strokeWidth="1" fill="none" />
      </svg>
    );
  }

  return null;
}
