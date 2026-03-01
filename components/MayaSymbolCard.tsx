import React from 'react';

interface MayaSymbolCardProps {
  kin: number;
  toneNumber: number;
  signNumber: number;
  signName: string;
  size?: 'small' | 'large';
}

export default function MayaSymbolCard({ kin, toneNumber, signNumber, signName, size = 'small' }: MayaSymbolCardProps) {
  const isLarge = size === 'large';
  
  return (
    <div style={{ 
      position: "relative", 
      width: isLarge ? "280px" : "min(40vw, 300px)", 
      height: isLarge ? "400px" : "min(56vw, 420px)", 
      margin: isLarge ? "20px auto" : "0 auto" 
    }}>
      <img src="/frame.png" alt="Frame" style={{ position: "absolute", width: "100%", height: "100%", objectFit: "contain" }} />
      <div style={{ 
        position: "absolute", 
        top: "12%", 
        right: "12%", 
        bottom: "12%", 
        left: "12%", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "flex-start", 
        paddingTop: isLarge ? "30px" : "clamp(20px, 5vw, 30px)", 
        paddingLeft: isLarge ? "20px" : "clamp(20px, 5vw, 30px)", 
        paddingRight: isLarge ? "20px" : "clamp(20px, 5vw, 30px)", 
        gap: isLarge ? "25px" : "clamp(15px, 4vw, 25px)" 
      }}>
        <div style={{ 
          fontSize: isLarge ? "3rem" : "clamp(2.5rem, 7vw, 4rem)", 
          fontWeight: "bold", 
          color: "#fcd34d", 
          textShadow: "0 0 20px rgba(252, 211, 77, 0.6)" 
        }}>
          {kin}
        </div>
        <img 
          src={`/Maya Symbol/Galatic Tones/${toneNumber}.png`} 
          alt={`Tone ${toneNumber}`} 
          style={{ 
            width: isLarge ? "90px" : "clamp(70px, 16vw, 100px)", 
            height: isLarge ? "90px" : "clamp(70px, 16vw, 100px)", 
            objectFit: "contain" 
          }} 
        />
        <img 
          src={`/Maya Symbol/Day Sign/${signNumber}-${signName.toLowerCase()}.png`} 
          alt={signName} 
          style={{ 
            width: isLarge ? "90px" : "clamp(70px, 16vw, 100px)", 
            height: isLarge ? "90px" : "clamp(70px, 16vw, 100px)", 
            objectFit: "contain" 
          }} 
        />
      </div>
    </div>
  );
}
