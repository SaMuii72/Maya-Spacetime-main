import React from 'react';

interface PredictionCardProps {
  icon: string;
  title: string;
  color: string;
  children: React.ReactNode;
}

const predictionCardStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  background: "linear-gradient(165deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)",
  backdropFilter: "blur(30px)",
  borderRadius: "24px",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  padding: "40px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
  transition: "all 0.4s ease",
  position: "relative",
  overflow: "hidden"
};

const predictionIconStyle: React.CSSProperties = { fontSize: "3rem", marginBottom: "20px" };

const scrollContentStyle: React.CSSProperties = { 
  flex: 1, 
  overflowY: "auto", 
  paddingRight: "15px", 
  width: "100%" 
};

const predictionTextStyle: React.CSSProperties = {
  fontSize: "1.1rem",
  lineHeight: "1.8",
  color: "rgba(255,255,255,0.85)",
  textAlign: "center",
  fontWeight: "300",
  textShadow: "0 2px 4px rgba(0,0,0,0.5)"
};

export default function PredictionCard({ icon, title, color, children }: PredictionCardProps) {
  return (
    <div style={predictionCardStyle} className="prediction-card-hover">
      {/* Watermark Icon */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "15rem",
        opacity: 0.04,
        pointerEvents: "none",
        zIndex: 0,
        filter: "blur(5px)"
      }}>
        {icon}
      </div>

      {/* Main Content */}
      <div style={{
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        width: "100%"
      }}>
        <div style={predictionIconStyle}>{icon}</div>
        
        <h3 style={{
          color,
          fontSize: "1.6rem",
          letterSpacing: "4px",
          marginBottom: "20px",
          textShadow: `0 0 20px ${color}60, 0 0 5px ${color}`,
          fontFamily: "'Cinzel', serif",
          textAlign: "center"
        }}>
          {title}
        </h3>

        <div className="custom-scroll" style={scrollContentStyle}>
          <p style={{
            ...predictionTextStyle,
            padding: "0 10px",
            animation: "floatUp 1.2s ease-out forwards"
          }}>
            {children}
          </p>
        </div>
      </div>
    </div>
  );
}
