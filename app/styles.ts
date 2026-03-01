import React from 'react';

export const GLASS_BG = "rgba(255, 255, 255, 0.05)";
export const GLASS_BLUR = "blur(25px)";
export const GLASS_BORDER = "1px solid rgba(255, 255, 255, 0.1)";

export const fullCenterStyle: React.CSSProperties = { 
  position: "absolute", 
  inset: 0, 
  display: "flex", 
  flexDirection: "column", 
  alignItems: "center", 
  justifyContent: "center", 
  zIndex: 10 
};

export const labelStyle: React.CSSProperties = {
  letterSpacing: "8px",
  fontSize: "0.75rem",
  color: "#7dd3fc",
  textTransform: "uppercase",
  opacity: 0.9,
  textShadow: "0 0 8px rgba(125, 211, 252, 0.5)"
};

export const titleStyle: React.CSSProperties = {
  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
  fontWeight: "200",
  margin: "5px 0",
  textShadow: "0 0 20px rgba(252, 211, 77, 0.5), 0 0 10px rgba(255, 255, 255, 0.2)",
  fontFamily: "'Cinzel', 'Georgia', serif",
  letterSpacing: "4px"
};

export const descStyle: React.CSSProperties = { 
  maxWidth: "300px",
  margin: "10px auto 20px",
  fontSize: "0.8rem",
  lineHeight: "1.4", 
  color: "rgba(255, 255, 255, 0.7)", 
  textAlign: "center" 
};

export const cardFaceStyle: React.CSSProperties = { 
  position: "absolute",
  inset: 0, 
  width: "100%", 
  height: "100%", 
  background: GLASS_BG, 
  backdropFilter: GLASS_BLUR, 
  borderRadius: "30px 2px", 
  padding: "30px 40px", 
  border: GLASS_BORDER, 
  backfaceVisibility: "hidden",
  display: "flex", 
  flexDirection: "column", 
  justifyContent: "center", 
  boxSizing: "border-box",
  WebkitBackfaceVisibility: "hidden"
};

export const cardContainerStyle = (view: string): React.CSSProperties => ({
  position: "relative",
  width: "90%",
  maxWidth: "500px",
  height: "400px",
  transformStyle: "preserve-3d",
  transition: "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1), top 1.2s ease",
  top: view === 'result' ? "-100px" : "0px", 
  margin: "0 auto",
});

export const buttonStyle: React.CSSProperties = { 
  width: "100%", 
  padding: "16px", 
  background: "transparent", 
  border: "1px solid rgba(252, 211, 77, 0.5)", 
  color: "#fcd34d", 
  borderRadius: "4px", 
  fontSize: "0.9rem", 
  letterSpacing: "5px", 
  cursor: "pointer", 
  transition: "all 0.4s" 
};

export const subButtonStyle: React.CSSProperties = { 
  background: "transparent", 
  border: "1px solid rgba(255, 255, 255, 0.2)", 
  color: "#fff", 
  borderRadius: "4px", 
  fontSize: "0.9rem", 
  letterSpacing: "2px", 
  padding: "12px 24px", 
  cursor: "pointer" 
};

export const resetFloatingBtn: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.03)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  color: "rgba(255, 255, 255, 0.8)",
  padding: "14px 35px",
  borderRadius: "100px",
  fontSize: "0.75rem",
  letterSpacing: "2px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  minWidth: "220px",
  textAlign: "center"
};

export const cosmicMapOverlayStyle: React.CSSProperties = { 
  position: "absolute", 
  inset: 0, 
  zIndex: 30, 
  display: "flex", 
  flexDirection: "column", 
  padding: "2vh 2vw", 
  justifyContent: "flex-start",
  overflowY: "auto" 
};

export const headerWrapperStyle = (view: string): React.CSSProperties => ({ 
  textAlign: "center", 
  transition: "all 0.8s ease", 
  opacity: view === 'result' ? 0 : 1, 
  transform: view === 'result' ? "translateY(-50px)" : "translateY(0)", 
  marginBottom: "30px", 
  pointerEvents: view === 'result' ? 'none' : 'auto' 
});

export const footerWrapperStyle = (view: string): React.CSSProperties => ({ 
  display: "flex", 
  gap: "30px", 
  fontSize: "0.75rem", 
  color: "rgba(255, 255, 255, 0.5)", 
  letterSpacing: "2px", 
  textTransform: "uppercase", 
  marginTop: "60px", 
  transition: "opacity 0.8s", 
  opacity: view === 'result' ? 0 : 1 
});
