import React from 'react';

interface PredictionCardProps {
  icon: string;
  title: string;
  color: string;
  children: React.ReactNode;
}

const GLASS_BG = "rgba(255, 255, 255, 0.05)";
const GLASS_BLUR = "blur(25px)";
const GLASS_BORDER = "1px solid rgba(255, 255, 255, 0.1)";

const predictionCardStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "40px 30px",
  background: GLASS_BG,
  backdropFilter: GLASS_BLUR,
  borderRadius: "24px",
  border: GLASS_BORDER,
  width: "100%",
  minHeight: "350px",
  transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)"
};

const columnTitle: React.CSSProperties = {
  fontSize: "1rem",
  letterSpacing: "3px",
  marginBottom: "15px"
};

const columnDesc: React.CSSProperties = {
  fontSize: "1rem",
  color: "rgba(255,255,255,0.7)",
  lineHeight: "1.8",
  textAlign: "center"
};

export default function PredictionCard({ icon, title, color, children }: PredictionCardProps) {
  return (
    <section style={predictionCardStyle} className="prediction-card-hover cosmicMap-card-fix">
      <div style={{
        fontSize: "3rem",
        marginBottom: "20px",
        filter: `drop-shadow(0 0 15px ${color})`,
        zIndex: 2
      }}>
        {icon}
      </div>

      <h3 style={{ ...columnTitle, color, zIndex: 2 }}>{title}</h3>

      <div style={{
        height: "1px",
        width: "40px",
        background: color,
        opacity: 0.3,
        marginBottom: "20px",
        zIndex: 2
      }} />

      <div className="custom-scroll" style={{ overflowY: "auto", width: "100%", zIndex: 2 }}>
        <p style={{ ...columnDesc, textAlign: "center", padding: "0 10px" }}>
          {children}
        </p>
      </div>
    </section>
  );
}
