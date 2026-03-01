"use client";

import { useState } from "react";
import SpaceBackground from "../components/SpaceBackground";
import MayaSymbolCard from "../components/MayaSymbolCard";
import { getTzolkinDate } from "@/lib/mayan/tzolkin";
import { WORK_LOVE_BY_SIGN } from "@/lib/mayan/workLoveBySign";
import { generateMayanNarrative } from "@/lib/mayan/profileNarrative";
import { highlightText } from "@/lib/mayan/highlightText";
import { SIGN_FILE_NAMES } from "@/lib/mayan/signFileNames";


// 🎯 Cosmic Design Constants
const GLASS_BG = "rgba(255, 255, 255, 0.05)";
const GLASS_BLUR = "blur(25px)";
const GLASS_BORDER = "1px solid rgba(255, 255, 255, 0.1)";

export default function Page() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  const [view, setView] = useState<'input' | 'result' | 'prediction' | 'cosmicMap' | 'loading'>('input');
  const [isExiting, setIsExiting] = useState(false);
  const [mayanResult, setMayanResult] = useState<any>(null);

  const validateDate = () => {
    setError("");
    if (!day || !month || !year) {
      setError("Please fulfill your celestial coordinates (Day/Month/Year).");
      return null;
    }
    const d = parseInt(day);
    const m = parseInt(month);
    let y = parseInt(year);
    if (y > 2400) y -= 543;
    if (y < 1000 || y > 3000) {
      setError("The Year must be between 1000 - 3000 (AD/BE).");
      return null;
    }
    const dateCheck = new Date(y, m - 1, d);
    if (dateCheck.getFullYear() !== y || dateCheck.getMonth() !== m - 1 || dateCheck.getDate() !== d) {
      setError(`Invalid Date.`);
      return null;
    }
    return { d, m, y };
  };

  const handleReveal = () => {
    const validated = validateDate();
    if (validated) {
      const dateString = `${validated.y}-${String(validated.m).padStart(2, '0')}-${String(validated.d).padStart(2, '0')}`;
      const result = getTzolkinDate(dateString);
      console.log('Maya Result:', result); // Debug
      setMayanResult(result);
      setView('loading');
      setTimeout(() => {
        console.log('Switching to result view, mayanResult:', result); // Debug
        setView('result');
      }, 3000);
    }
  };

  const handleToPrediction = () => {
    setIsExiting(true);
    setTimeout(() => { setView('cosmicMap'); setIsExiting(false); }, 800);
  };

  const handleToCosmicMap = () => {
    setIsExiting(true);
    setTimeout(() => { setView('prediction'); setIsExiting(false); }, 800);
  };

  const handleReset = () => {
    setView('input');
    setDay(""); setMonth(""); setYear(""); setError("");
    setMayanResult(null);
  };

  const getHighlightRules = () => {
    if (!mayanResult) return [];
    return [
      { word: `Tone ${mayanResult.toneNumber}`, className: "text-amber-400 font-semibold" },
      { word: mayanResult.tone.name, className: "text-amber-300 font-semibold" },
      { word: mayanResult.sign.name, className: "text-teal-300 font-semibold" },
      { word: mayanResult.sign.archetype, className: "text-teal-200 italic" }
    ];
  };

  return (
    <div id="main-layout" style={{ position: "relative", height: "100vh", overflowY: "auto", color: "#fff", fontFamily: "serif" }}>
      <SpaceBackground />

      {/* --- PHASE 1 & 2: INPUT & RESULT CARD --- */}
      {(view === 'input' || view === 'result') && (
        <div style={fullCenterStyle} className={isExiting ? "kin-card-exit" : "kin-card-entry"}>
          <header style={headerWrapperStyle(view)}>
            <span style={labelStyle}>Sacred Timekeeper</span>
            <h1 style={{ ...titleStyle, fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              <span style={{ fontSize: "0.6em", textShadow: "0 0 15px rgba(255, 255, 255, 0.4)" }}>Discover Your</span>
              <br />
              <span style={{ fontWeight: "600", color: "#fcd34d", textShadow: "0 0 20px rgba(252, 211, 77, 0.6)" }}>Maya Spacetime Identity</span>
            </h1>
            <p className="desc-text" style={{ ...descStyle, fontSize: "clamp(0.9rem, 2.5vw, 1.3rem)", maxWidth: "min(95%, 700px)", lineHeight: "1.7" }}>In the Maya worldview, your birth date is not random. It carries a Tone and a Sign <br className="hide-on-small" />a unique energetic signature that shapes how you think, feel, and move through life.</p>
            <p style={{ fontSize: "0.7rem", color: "rgba(255, 255, 255, 0.5)", letterSpacing: "3px", textTransform: "uppercase", marginTop: "15px" }}>Based on Maya Spacetime & Tzolk'in Calendar</p>
            <div style={{ height: "1px", width: "60px", background: "rgba(252, 211, 77, 0.3)", margin: "10px auto 0" }} />
          </header>

          <div className={`card-container ${view === 'result' ? "flipped" : ""}`} style={cardContainerStyle(view)}>
            {/* FRONT CARD (INPUT) */}
            <div style={inputCardStyle}>
              <div style={{ display: "flex", gap: "25px", marginBottom: "30px", alignItems: "flex-end" }}>
                <InputItem label="DAY" value={day} onChange={(val: string) => { setDay(val); setError(""); }} hint="DD" />
                <InputItem label="MONTH" value={month} onChange={(val: string) => { setMonth(val); setError(""); }} hint="Select..." isMonth={true} />
                <InputItem label="YEAR" value={year} onChange={(val: string) => { setYear(val); setError(""); }} hint="YYYY" />
              </div>
              <div style={{ height: "20px", marginBottom: "15px", textAlign: "center" }}>
                {error && <p style={{ color: "#fca5a5", fontSize: "0.75rem", animation: "fadeIn 0.3s ease" }}>{error}</p>}
              </div>
              <button onClick={handleReveal} style={buttonStyle} className="reveal-btn">REVEAL DESTINY</button>
            </div>

            {/* BACK CARD (IDENTITY) - ปรับให้อยู่กึ่งกลางหน้าจอ */}
            <div className="result-card-back" style={{ ...resultCardStyle, transform: "translate(-50%, -50%) rotateY(180deg)" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", height: "100%", textAlign: "center" }}>
                <span style={{ ...labelStyle, fontSize: "1.5rem", marginTop: "20px" }}>Cosmic Identity</span>
                
                {/* Maya Symbol Card */}
                <div style={{position: "relative"}}>
                  {mayanResult && (
                    <MayaSymbolCard 
                      kin={mayanResult.kin}
                      toneNumber={mayanResult.toneNumber}
                      signNumber={mayanResult.signNumber}
                      signName={mayanResult.sign.name}
                      size="large"
                    />
                  )}
                  <div style={{position: "relative", top: "30px"}}>
                    <h4 style={{
                      fontSize: "clamp(2rem, 4vw, 2.2rem)",
                      color: "#fcd34d",
                      margin: "10px 0",
                      textShadow: "0 0 25px rgba(252, 211, 77, 0.7), 0 0 10px rgba(252, 211, 77, 0.4)",
                      fontFamily: "'Cinzel', 'Georgia', serif",
                    }}>{mayanResult ? `${mayanResult.tone.name} ${mayanResult.sign.name}` : 'Blue Electric Eagle'}</h4>
                    <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "25px", fontSize: "clamp(1.3rem, 2vw, 1.4rem)" }}>
                      {mayanResult ? `Tone ${mayanResult.toneNumber} | Sign: ${mayanResult.sign.name}` : 'Tone 3 | Sign: Eagle'}
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "15px", justifyContent: "center", marginBottom: "20px" }}>
                    <button onClick={handleReset} style={subButtonStyle}>New Date</button>
                    <button
                      onClick={handleToPrediction}
                      style={{
                        ...subButtonStyle,
                        borderColor: "#fcd34d",
                        color: "#fcd34d",
                        boxShadow: "0 0 15px rgba(252, 211, 77, 0.2)",
                        transition: "all 0.3s ease"
                      }}
                      className="predict-btn"
                    >
                      View Full Reading →
                    </button>
                </div>
              </div>
            </div>
          </div>

          <footer style={footerWrapperStyle(view)}>
            <div>🌙 20 Signs</div><div>🪐 13 Tones</div><div>✨ 260 Days</div>
          </footer>
        </div>
      )}

      {/* --- LOADING VIEW --- */}
      {view === 'loading' && (
        <div style={{ ...fullCenterStyle, zIndex: 15 }} className="loading-view-entry">
          <div style={{ textAlign: "center" }}>
            {/* All Symbols Orbiting */}
            <div style={{ position: "relative", width: "600px", height: "600px", margin: "0 auto" }}>
              {/* 20 Day Signs */}
              {Array.from({ length: 20 }, (_, i) => {
                const angle = (i / 20) * 360;
                const signNames = Object.keys(SIGN_FILE_NAMES);
                return (
                  <img 
                    key={`sign-${i}`}
                    src={`/Maya%20Symbol/Day%20Sign/${i + 1}-${SIGN_FILE_NAMES[signNames[i]]}.png`}
                    alt={`Sign ${i + 1}`}
                    className={`orbit-sign-${i}`}
                    style={{ 
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: "60px", 
                      height: "60px", 
                      objectFit: "contain", 
                      filter: "brightness(1.2) drop-shadow(0 0 10px rgba(252, 211, 77, 0.6))",
                      transformOrigin: "0 0",
                      opacity: 0.7
                    }} 
                  />
                );
              })}
              {/* 13 Galactic Tones */}
              {Array.from({ length: 13 }, (_, i) => (
                <img 
                  key={`tone-${i}`}
                  src={`/Maya%20Symbol/Galatic%20Tones/${i + 1}.png`}
                  alt={`Tone ${i + 1}`}
                  className={`orbit-tone-${i}`}
                  style={{ 
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "50px", 
                    height: "50px", 
                    objectFit: "contain", 
                    filter: "brightness(1.2) drop-shadow(0 0 10px rgba(125, 211, 252, 0.6))",
                    transformOrigin: "0 0",
                    opacity: 0.8
                  }} 
                />
              ))}
              {/* Center - Empty space */}
            </div>
            <p style={{ marginTop: "30px", fontSize: "1.2rem", color: "#fcd34d", letterSpacing: "3px", animation: "pulse 1.5s ease-in-out infinite" }}>
              Revealing your cosmic identity...
            </p>
          </div>
        </div>
      )}

      {/* --- PHASE 2.5: PREDICTIONS (พร้อม Split Transition) --- */}
      {view === 'prediction' && (
        <div 
          className={isExiting ? "prediction-view-exit" : "prediction-view-entry"}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            minHeight: "100vh",
            padding: "60px 20px 40px 20px",
            overflowY: "auto"
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#fcd34d", marginBottom: "10px", fontFamily: "'Cinzel', serif" }}>
              Your Life Path
            </h2>
            <p style={{ fontSize: "1rem", color: "rgba(255, 255, 255, 0.7)" }}>
              How your Maya signature influences love and career
            </p>
          </div>

          {/* Maya Symbol Card at center */}
          <section style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "30px" }}>
            {mayanResult && (
              <MayaSymbolCard 
                kin={mayanResult.kin}
                toneNumber={mayanResult.toneNumber}
                signNumber={mayanResult.signNumber}
                signName={mayanResult.sign.name}
                size="large"
              />
            )}
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <h3 style={{ color: "#fcd34d", fontSize: "clamp(1.2rem, 3vw, 1.8rem)", margin: "5px 0", letterSpacing: "2px", fontFamily: "'Cinzel', serif" }}>
                {mayanResult ? `${mayanResult.tone.name} ${mayanResult.sign.name}`.toUpperCase() : 'BLUE ELECTRIC EAGLE'}
              </h3>
            </div>
          </section>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", maxWidth: "1200px", width: "100%", justifyContent: "center", padding: "0 20px" }}>
            
            <PredictionCard icon="❤️" title="LOVE DESTINY" color="#fca5a5">
              {mayanResult && WORK_LOVE_BY_SIGN[mayanResult.sign.name as keyof typeof WORK_LOVE_BY_SIGN]?.love || 
                "ความรักของ Blue Electric Eagle คือการมองหาความสัมพันธ์ที่ส่งเสริม \"วิสัยทัศน์\" คุณต้องการคู่ชีวิตที่เปรียบเสมือนปีกที่ช่วยให้คุณโบยบินไปสู่เป้าหมายที่สูงขึ้น..."}
            </PredictionCard>

            <PredictionCard icon="💼" title="CAREER PATH" color="#7dd3fc">
              {mayanResult && WORK_LOVE_BY_SIGN[mayanResult.sign.name as keyof typeof WORK_LOVE_BY_SIGN]?.work || 
                "ในด้านการงาน คุณคือผู้วางกลยุทธ์จากมุมสูง Eagle มอบพลังในการมองเห็นภาพรวมและการวิเคราะห์ที่แม่นยำ คุณเหมาะกับการเป็นผู้นำทางความคิดหรือนักออกแบบอนาคต..."}
            </PredictionCard>

          </div>

          {/* 💡 ปุ่มกลับไปหน้าแรก */}
          <footer style={{ marginTop: "40px", display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", width: "100%", padding: "0 20px" }}>
            <button onClick={() => setView('cosmicMap')} style={{ ...resetFloatingBtn, minWidth: "220px", padding: "16px 20px" }}>← COSMIC MAP</button>
            <button onClick={handleReset} style={{ ...resetFloatingBtn, borderColor: "#fcd34d", color: "#fcd34d", minWidth: "220px", padding: "16px 20px" }}>NEW READING</button>
          </footer>
        </div>
      )}

      {/* --- PHASE 3: COSMIC MAP VIEW --- */}
      {view === 'cosmicMap' && (
        <main style={cosmicMapOverlayStyle} className="cosmicMap-entry">
          <header style={{ textAlign: "center", marginBottom: "30px", zIndex: 40 }}>
            <span style={labelStyle}>MAYA SPACETIME DATE</span>
            <h2 style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "#fcd34d",
              margin: "10px 0 5px 0",
              textShadow: "0 0 25px rgba(252, 211, 77, 0.7)",
              fontFamily: "'Cinzel', 'Georgia', serif"
            }}>{mayanResult ? `${mayanResult.tone.name} ${mayanResult.sign.name}` : '4 Eb\' | 13 Galactic Tone'}</h2>
            <p style={{ fontSize: "1rem", color: "rgba(255, 255, 255, 0.7)", marginTop: "10px", maxWidth: "600px", margin: "10px auto 0" }}>
              Your Tone shapes how you act. Your Sign defines who you are.
            </p>
          </header>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "40px", maxWidth: "1400px", width: "100%", margin: "0 auto" }}>
            
            {/* วงกลมตรงกลาง - แทนด้วย Maya Symbol Card */}
            <section style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              {mayanResult && (
                <MayaSymbolCard 
                  kin={mayanResult.kin}
                  toneNumber={mayanResult.toneNumber}
                  signNumber={mayanResult.signNumber}
                  signName={mayanResult.sign.name}
                  size="large"
                />
              )}
              <div style={{ marginTop: "30px", textAlign: "center" }}>
                <h3 style={{ color: "#fcd34d", fontSize: "clamp(1.2rem, 3vw, 1.8rem)", margin: "5px 0", letterSpacing: "2px", fontFamily: "'Cinzel', serif" }}>
                  {mayanResult ? `${mayanResult.tone.name} ${mayanResult.sign.name}`.toUpperCase() : 'BLUE ELECTRIC EAGLE'}
                </h3>
              </div>
            </section>

            {/* การ์ดทั้งสองด้านล่าง */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(20px, 5vw, 50px)", width: "100%", maxWidth: "1200px", justifyContent: "center", padding: "0 20px" }} className="cosmicMap-cards-container">
              <div style={{ flex: "1 1 400px", maxWidth: "600px", display: "flex" }}>
                <DashboardColumn
                  title="GALAXY TONE"
                  icon="🌀"
                  color="#7dd3fc"
                  desc={mayanResult ? generateMayanNarrative(mayanResult.toneNumber, mayanResult.sign).tone : "พลังงานลำดับที่ 13 บอกวิธีขับเคลื่อนชีวิตของคุณในจักรวาล พลังแห่งการแผ่ขยายและการบรรลุจุดสูงสุดของรอบเวลา..."}
                  highlightRules={getHighlightRules()}
                />
              </div>

              <div style={{ flex: "1 1 400px", maxWidth: "600px", display: "flex" }}>
                <DashboardColumn
                  title="NAWAL SIGN"
                  icon="🦅"
                  color="#fcd34d"
                  desc={mayanResult ? generateMayanNarrative(mayanResult.toneNumber, mayanResult.sign).sign : "สัญลักษณ์ประจำวัน 20 นาวาล คือจิตวิญญาณดั้งเดิมที่บอกถึงตัวตนของคุณ Eagle คือผู้มองเห็นวิสัยทัศน์จากมุมสูง..."}
                  highlightRules={getHighlightRules()}
                />
              </div>
            </div>

          </div>

          {/* ปุ่มกดไปหน้า Love & Career */}
          <footer style={{ 
            padding: "40px 0 80px 0",
            textAlign: "center", 
            zIndex: 40, 
            display: "flex", 
            flexDirection: "column",
            gap: "20px", 
            alignItems: "center",
            width: "100%"
          }}>
            <button onClick={handleToCosmicMap} style={{ ...resetFloatingBtn, borderColor: "#fcd34d", color: "#fcd34d", minWidth: "260px", padding: "16px 20px" }}>
              LOVE & CAREER →
            </button>
            
            <button 
              onClick={handleReset} 
              style={{ 
                background: "transparent", 
                border: "none", 
                color: "rgba(255, 255, 255, 0.4)",
                fontSize: "0.75rem", 
                letterSpacing: "3px", 
                cursor: "pointer",
                textDecoration: "underline",
                textUnderlineOffset: "6px"
              }}
            >
              START NEW DESTINY
            </button>
          </footer>
        </main>
      )}
      <style jsx global>{`
      /* เพิ่มใน style jsx global เดิม */
.cosmicMap-card-fix {
  max-height: 500px;
  height: 100%;
  justify-content: flex-start !important;
  transition: all 0.5s ease;
}

.cosmicMap-card-fix .custom-scroll::-webkit-scrollbar {
  width: 2px;
}
  /* 1. การตั้งค่าพื้นฐานสำหรับหน้า Prediction */
  .prediction-card-hover {
    position: relative;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: 1;
  }

  .prediction-card-hover::before,
  .prediction-card-hover::after {
    content: none;
  }

  /* 3. เอฟเฟกต์เวลาเอาเมาส์ไปวาง - ลดการเคลื่อนไหว */
  .card-love, .card-career, .cosmicMap-card-fix {
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    flex: 1 1 340px;
    max-width: 600px;
  }

  .card-love:hover, .card-career:hover, .cosmicMap-card-fix:hover {
    transform: translateY(-8px) scale(1.01);
    box-shadow: 0 15px 35px rgba(0,0,0,0.5);
    border-color: rgba(252, 211, 77, 0.2) !important;
  }

  /* 4. การเลื่อนขึ้นของข้อความ (Text Entrance) */
  .prediction-view-entry .custom-scroll p {
    animation: floatUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    opacity: 0;
  }

  @keyframes floatUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* 5. ปุ่มและการเปลี่ยนหน้า (Transitions) */
  .predict-btn:hover {
    background: rgba(252, 211, 77, 0.1) !important;
    box-shadow: 0 0 25px rgba(252, 211, 77, 0.4);
    transform: translateY(-2px);
  }

  .card-container {
  transform-style: preserve-3d;
  transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.card-container.flipped { 
  transform: rotateY(180deg) scale(0.9); /* เพิ่ม scale เล็กน้อยตอนหมุนจะดูมีมิติมาก */
}
  .reveal-btn:hover { 
    background: rgba(252, 211, 77, 0.1) !important; 
    border-color: #fcd34d !important; 
    letter-spacing: 7px !important; 
  }

  .custom-scroll::-webkit-scrollbar { width: 4px; }
  .custom-scroll::-webkit-scrollbar-thumb { background: rgba(252, 211, 77, 0.3); border-radius: 10px; }

  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  
  /* Hide line break on small screens */
  @media (max-width: 768px) {
    .hide-on-small {
      display: none;
    }
  }
  
  /* Page Transitions */
  .kin-card-entry { 
    animation: kinCardEntry 0.8s ease forwards;
    /* เพิ่ม 3 บรรทัดนี้ครับ */
    display: flex !important;
    flex-direction: column;
    align-items: center;
    transform: scale(0.85); /* ย่อสเกลทั้งหน้าลงเหลือ 85% */
    transform-origin: center top; /* ให้มันย่อโดยยึดจากกึ่งกลางบน */
  }
    /* ปรับช่อง Input ให้เล็กลงตามสเกล */
  input, select {
    font-size: 1rem !important; /* ลดขนาดฟอนต์ช่องกรอก */
  }
  .kin-card-exit { animation: kinCardExit 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
  @keyframes kinCardEntry { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  @keyframes kinCardExit { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(0.85); } }
  
  .prediction-view-entry { animation: fadeIn 0.8s ease forwards; }
  .prediction-view-exit .card-love { animation: splitLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
  .prediction-view-exit .card-career { animation: splitRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }

  @keyframes splitLeft { to { transform: translateX(-200px) rotate(-10deg); opacity: 0; } }
  @keyframes splitRight { to { transform: translateX(200px) rotate(10deg); opacity: 0; } }

  .cosmicMap-entry { animation: cosmicMapFadeIn 1s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
  @keyframes cosmicMapFadeIn { from { opacity: 0; transform: scale(1.1); } to { opacity: 1; transform: scale(1); } }

  @keyframes symbolPulse { 
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
    50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
  }

  @keyframes orbit {
    0% { transform: translate(-50%, -50%) rotate(0deg) translateX(150px) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg) translateX(150px) rotate(-360deg); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }

  .loading-view-entry { animation: fadeIn 0.5s ease forwards; }


/* --- จัดการหน้า 3 (Prediction) และส่วนที่ล้นในมือถือ --- */
@media (max-width: 1024px) {
  /* ปลดล็อคความสูงหน้าจอให้เลื่อนได้ */
  #main-layout {
    height: auto !important;
    min-height: 100vh !important;
    overflow-y: auto !important;
    display: block !important;
  }

  /* หน้า 3: จัดการ Container ของการ์ดคู่ */
  .prediction-view-entry {
    padding: 60px 20px 40px 20px !important;
    height: auto !important;
    min-height: 100vh;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: flex-start !important;
  }

  /* ทำให้การ์ดต่อคิวกันลงมาบน-ล่าง */
  .prediction-container-mobile {
    flex-direction: column !important;
    height: auto !important;
    width: 100% !important;
    gap: 30px !important;
  }

  /* ปรับขนาดการ์ดในหน้า 3 ให้พอดี ไม่เบียด */
  .card-love, .card-career {
    width: 100% !important;
    max-width: 360px;
    height: 500px !important;
    margin: 0 auto;
    flex: none !important;
  }

  /* แก้ปัญหาปุ่มด้านล่างทับกัน */
  .prediction-view-entry footer {
    display: flex !important;
    flex-direction: column !important; /* บังคับปุ่มเรียงต่อกันเป็นแถวลงมา */
    gap: 15px !important; /* ระยะห่างระหว่างปุ่ม */
    margin-top: 40px !important;
    padding-bottom: 60px !important; /* เว้นที่ก้นจอให้ไถไปสุดแล้วปุ่มไม่จม */
    width: 100%;
    align-items: center;
  }

  .prediction-view-entry footer button {
    width: 90% !important; /* ขยายปุ่มให้กดง่ายเต็มมือ */
    max-width: 300px;
  }

  /* --- ส่วนนี้สำหรับหน้า Cosmic Map (Phase 3) ไม่ให้ล้น --- */
  .cosmicMap-grid-mobile {
    flex-direction: column !important;
    height: auto !important;
    gap: 30px !important;
    padding: 20px 10px 100px 10px !important;
  }

  .maya-circle-mobile {
    width: 100% !important;
    max-width: 320px !important;
    order: -1;
    margin: 20px auto !important;
  }
  
  .inner-circle-fix {
    width: 280px !important;
    height: 280px !important;
  }

  .cosmicMap-card-fix {
    width: 100% !important;
    max-width: 90% !important;
    margin: 0 auto !important;
    height: auto !important;
  }

  /* Cosmic Map cards - ย่อขนาดในมือถือ */
  .cosmicMap-cards-container {
    max-width: 100% !important;
  }

  .cosmicMap-cards-container > div {
    max-width: 90% !important;
  }










`}</style>
    </div>
  );
}

// --- Sub-Components ---
function InputItem({ label, value, onChange, hint, isMonth = false }: any) {
  return (
    <div style={{ flex: 1, minWidth: 0, textAlign: "center" }}>
      <label style={{ display: "block", fontSize: "1rem", color: "rgba(125, 211, 252, 0.5)", marginBottom: "10px", letterSpacing: "2px", fontWeight: "bold" }}>{label}</label>
      {isMonth ? (
        <select value={value} onChange={(e) => onChange(e.target.value)} style={{ ...selectStyle, color: value ? "#fff" : "rgba(255, 255, 255, 0.2)" }}>
          <option value="" disabled hidden>{hint}</option>
          {Array.from({ length: 12 }, (_, i) => (<option key={i + 1} value={i + 1} style={{ color: "#000" }}>{new Date(0, i).toLocaleString('en', { month: 'short' })}</option>))}
        </select>
      ) : (
        <input type="text" maxLength={label === "YEAR" ? 4 : 2} value={value} onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))} placeholder={hint} style={inputStyle} />
      )}
    </div>
  );
}
function PredictionCard({ icon, title, color, children }: any) {
  return (
    <section style={flexibleColumnStyle} className="prediction-card-hover cosmicMap-card-fix">
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

function DashboardColumn({ title, icon, desc, color = "#7dd3fc", highlightRules = [] }: any) {
  return (
    <section style={flexibleColumnStyle} className="prediction-card-hover cosmicMap-card-fix">
      {/* ส่วน Icon ด้านบน */}
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
          {highlightRules.length > 0 ? highlightText(desc, highlightRules) : desc}
        </p>
      </div>
    </section>
  );
}

// --- Style Objects (เหมือนเดิม แต่ปรับ cardContainerStyle) ---
const fullCenterStyle: React.CSSProperties = { position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 10 };
const labelStyle: React.CSSProperties = {
  letterSpacing: "8px",
  fontSize: "0.75rem",
  color: "#7dd3fc",
  textTransform: "uppercase",
  opacity: 0.9, // เพิ่มความชัดขึ้นนิดหนึ่ง
  textShadow: "0 0 8px rgba(125, 211, 252, 0.5)" // ฟุ้งสีฟ้าออโรร่า
};
const titleStyle: React.CSSProperties = {
  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
  fontWeight: "200",
  margin: "5px 0",
  // 🎯 เพิ่มความฟุ้งและเปลี่ยนฟอนต์ตรงนี้
  textShadow: "0 0 20px rgba(252, 211, 77, 0.5), 0 0 10px rgba(255, 255, 255, 0.2)",
  fontFamily: "'Cinzel', 'Georgia', serif",
  letterSpacing: "4px"
};
const descStyle: React.CSSProperties = { 
  maxWidth: "300px", // บีบความกว้างข้อความให้แคบลงเพื่อให้ดูเป็นทรงตั้ง
  margin: "10px auto 20px", // ลดระยะห่างบนล่าง
  fontSize: "0.8rem", // ย่อขนาดฟอนต์ลงเล็กน้อย
  lineHeight: "1.4", 
  color: "rgba(255, 255, 255, 0.7)", 
  textAlign: "center" 
};

const inputCardStyle: React.CSSProperties = { 
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(90vw, 500px)",
  height: "min(70vh, 400px)",
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

const resultCardStyle: React.CSSProperties = { 
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(90vw, 700px)",
  height: "min(95vh, 850px)",
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

const cardContainerStyle = (view: string): React.CSSProperties => ({
  position: "relative",
  width: "90%",
  maxWidth: "500px",
  height: "400px",
  transformStyle: "preserve-3d",
  transition: "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1), top 1.2s ease",
  // เมื่อเป็นหน้า result ให้เลื่อนขึ้นมาแทนที่ตำแหน่ง Header ที่หายไป
  top: view === 'result' ? "-100px" : "0px", 
  margin: "0 auto",
});

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
  position: "relative"
};
const predictionIconStyle: React.CSSProperties = { fontSize: "3rem", marginBottom: "20px" };
const scrollContentStyle: React.CSSProperties = { flex: 1, overflowY: "auto", paddingRight: "15px", width: "100%" };
const predictionTextStyle: React.CSSProperties = {
  fontSize: "1.1rem",
  lineHeight: "1.8",
  color: "rgba(255,255,255,0.85)", // สว่างขึ้นนิดหนึ่ง
  textAlign: "center",
  fontWeight: "300",
  // 🎯 เพิ่มเงาจางๆ ให้ตัวหนังสืออ่านง่ายขึ้นบนพื้นหลังอวกาศ
  textShadow: "0 2px 4px rgba(0,0,0,0.5)"
};

const buttonStyle: React.CSSProperties = { width: "100%", padding: "16px", background: "transparent", border: "1px solid rgba(252, 211, 77, 0.5)", color: "#fcd34d", borderRadius: "4px", fontSize: "0.9rem", letterSpacing: "5px", cursor: "pointer", transition: "all 0.4s" };
const subButtonStyle: React.CSSProperties = { 
  background: "transparent", 
  border: "1px solid rgba(255, 255, 255, 0.2)", 
  color: "#fff", 
  borderRadius: "4px", 
  fontSize: "0.9rem", 
  letterSpacing: "2px", 
  padding: "12px 24px", 
  cursor: "pointer" 
};
const resetFloatingBtn: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.03)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  color: "rgba(255, 255, 255, 0.8)",
  padding: "14px 35px", // ใหญ่ขึ้นนิดหน่อย
  borderRadius: "100px",
  fontSize: "0.75rem", // ขยับขนาดฟอนต์นิดนึง
  letterSpacing: "2px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  minWidth: "220px", // บังคับให้ปุ่มกว้างเท่ากัน ดูเป็นระเบียบในมือถือ
  textAlign: "center"
};
const cosmicMapOverlayStyle: React.CSSProperties = { 
  position: "absolute", 
  inset: 0, 
  zIndex: 30, 
  display: "flex", 
  flexDirection: "column", 
  padding: "2vh 2vw", 
  justifyContent: "flex-start", // เปลี่ยนจาก center เป็น start เพื่อให้ไถขึ้นได้
  overflowY: "auto" 
};
const cosmicMapGridStyle: React.CSSProperties = { 
  display: "flex", 
  flex: "none", // เปลี่ยนจาก 1 เป็น none เพื่อให้ความสูงเป็นไปตามเนื้อหา
  gap: "4vw", 
  alignItems: "center", 
  maxWidth: "1440px", 
  margin: "0 auto", 
  width: "100%", 
  zIndex: 40, 
  padding: "0 20px" 
};
const flexibleColumnStyle: React.CSSProperties = { 
  flex: 1, 
  display: "flex", 
  flexDirection: "column", 
  alignItems: "center", 
  padding: "40px 30px", 
  background: GLASS_BG, 
  backdropFilter: GLASS_BLUR, 
  borderRadius: "24px", 
  border: GLASS_BORDER, 
  width: "100%",  // ใช้ความกว้างเต็ม
  minHeight: "350px"
};
const logoPlaceholderRed: React.CSSProperties = { width: "80px", height: "80px", background: "rgba(239, 68, 68, 0.1)", borderRadius: "50%", border: "1px solid #ef4444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", color: "#ef4444", marginBottom: "20px" };
const columnTitle: React.CSSProperties = { fontSize: "1rem", color: "#7dd3fc", letterSpacing: "3px", marginBottom: "15px" };
const columnDesc: React.CSSProperties = { 
  fontSize: "1rem",  // เพิ่มจาก 0.85rem เป็น 1rem
  color: "rgba(255,255,255,0.7)",  // เพิ่มความสว่าง
  lineHeight: "1.8", 
  textAlign: "center" 
};
const mayaCirclePlaceholder: React.CSSProperties = { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1 };
const innerCircle: React.CSSProperties = { 
  width: "min(60vw, 360px)", // ย่อจาก 80vw, 480px เป็น 60vw, 360px
  height: "min(60vw, 360px)", 
  borderRadius: "50%", 
  border: "2px solid rgba(252, 211, 77, 0.05)", 
  display: "flex", 
  alignItems: "center", 
  justifyContent: "center", 
  position: "relative" 
};
const orbitSpinStyle: React.CSSProperties = { position: "absolute", inset: 0, borderRadius: "50%", border: "1px dashed rgba(252, 211, 252, 0.1)", animation: "spin 60s linear infinite" };

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
  padding: "10px 0",
  color: "#fff",
  fontSize: "2rem",
  textAlign: "center",
  outline: "none",
  fontFamily: "monospace",
  textShadow: "0 0 10px rgba(255, 255, 255, 0.3)"
};
const selectStyle: React.CSSProperties = { ...inputStyle, appearance: "none", cursor: "pointer" };

const headerWrapperStyle = (view: string): React.CSSProperties => ({ textAlign: "center", transition: "all 0.8s ease", opacity: view === 'result' ? 0 : 1, transform: view === 'result' ? "translateY(-50px)" : "translateY(0)", marginBottom: "30px", pointerEvents: view === 'result' ? 'none' : 'auto' });
const footerWrapperStyle = (view: string): React.CSSProperties => ({ display: "flex", gap: "30px", fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.5)", letterSpacing: "2px", textTransform: "uppercase", marginTop: "60px", transition: "opacity 0.8s", opacity: view === 'result' ? 0 : 1 });