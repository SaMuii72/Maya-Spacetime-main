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
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 });
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const baseSize = size === 'large' ? 280 : 200;
  const scaleFactor = size === 'large' ? 'min(1, 60vw / 280px)' : 'min(1, 45vw / 200px)';

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        position: "relative", 
        width: `${baseSize}px`, 
        height: `${baseSize * 1.43}px`,
        margin: "0 auto",
        transition: "transform 0.2s ease-out",
        transformStyle: "preserve-3d",
        transform: `scale(${scaleFactor}) perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        borderRadius: "20px",
        overflow: "visible"
      }}
    >
      <div style={{ position: "absolute", width: "calc(100% + 40px)", height: "calc(100% + 40px)", top: "-20px", left: "-20px", backgroundColor: "black", opacity: 0.2, borderRadius: "20px", zIndex: 1 }} />
      <img src="/frame.png" alt="Frame" style={{ position: "absolute", width: "100%", height: "100%", objectFit: "contain", zIndex: 2 }} />
      <div style={{ position: "absolute", top: "-10px", left: "50%", transform: "translateX(-50%)", fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: "normal", color: "#fcd34d", textShadow: "0 0 20px rgba(252, 211, 77, 0.6)", zIndex: 10 }}>{kin}</div>
      <div style={{ position: "absolute", top: "12%", right: "12%", bottom: "12%", left: "12%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: "30px", paddingLeft: "20px", paddingRight: "20px", gap: "25px", zIndex: 3 }}>
        <img src={`/Maya%20Symbol/Day%20Sign/${signNumber}-${SIGN_FILE_NAMES[signName]}.png`} alt={signName} style={{ width: "clamp(100px, 25vw, 130px)", height: "clamp(100px, 25vw, 130px)", objectFit: "contain", filter: "brightness(1.2)", position: "relative", top: "30px" }} />
        <img src={`/Maya%20Symbol/Galatic%20Tones/${toneNumber}.png`} alt={`Tone ${toneNumber}`} style={{ width: "clamp(100px, 25vw, 130px)", height: "clamp(100px, 25vw, 130px)", objectFit: "contain", filter: "brightness(1.2)", position: "relative", top: "-20px" }} />
      </div>
    </div>
  );
}
