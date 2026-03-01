import React from 'react';
import { SIGN_FILE_NAMES } from '@/lib/mayan/signFileNames';

interface MayaSymbolCardProps {
  kin: number;
  toneNumber: number;
  signNumber: number;
  signName: string;
  size?: 'small' | 'large';
}

export default function MayaSymbolCard({ kin, toneNumber, signNumber, signName, size = 'small' }: MayaSymbolCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        position: "relative", 
        width: "280px", 
        height: "400px", 
        margin: "20px auto",
        transition: "transform 0.6s ease",
        transformStyle: "preserve-3d",
        transform: isHovered ? "rotateY(15deg) rotateX(5deg)" : "rotateY(0deg) rotateX(0deg)"
      }}
    >
      <div style={{ position: "absolute", width: "calc(100% + 40px)", height: "calc(100% + 40px)", top: "-20px", left: "-20px", backgroundColor: "black", opacity: 0.2, borderRadius: "20px", zIndex: 1 }} />
      <img src="/frame.png" alt="Frame" style={{ position: "absolute", width: "100%", height: "100%", objectFit: "contain", zIndex: 2 }} />
      <div style={{ position: "absolute", top: "-10px", left: "50%", transform: "translateX(-50%)", fontSize: "2rem", fontWeight: "normal", color: "#fcd34d", textShadow: "0 0 20px rgba(252, 211, 77, 0.6)", zIndex: 10 }}>{kin}</div>
      <div style={{ position: "absolute", top: "12%", right: "12%", bottom: "12%", left: "12%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: "30px", paddingLeft: "20px", paddingRight: "20px", gap: "25px", zIndex: 3 }}>
        <img src={`/Maya%20Symbol/Day%20Sign/${signNumber}-${SIGN_FILE_NAMES[signName]}.png`} alt={signName} style={{ width: "130px", height: "130px", objectFit: "contain", filter: "brightness(1.2)", position: "relative", top: "30px" }} />
        <img src={`/Maya%20Symbol/Galatic%20Tones/${toneNumber}.png`} alt={`Tone ${toneNumber}`} style={{ width: "130px", height: "130px", objectFit: "contain", filter: "brightness(1.2)", position: "relative", top: "-20px" }} />
      </div>
    </div>
  );
}
