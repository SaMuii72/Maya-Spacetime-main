"use client";

import { useState } from "react";
import SpaceBackground from "../components/SpaceBackground";


// 🎯 Cosmic Design Constants
const GLASS_BG = "rgba(255, 255, 255, 0.05)";
const GLASS_BLUR = "blur(25px)";
const GLASS_BORDER = "1px solid rgba(255, 255, 255, 0.1)";

export default function Page() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  const [view, setView] = useState<'input' | 'result' | 'prediction' | 'dashboard'>('input');
  const [isExiting, setIsExiting] = useState(false);

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
    if (validateDate()) setView('result');
  };

  const handleToPrediction = () => {
    setIsExiting(true);
    setTimeout(() => { setView('prediction'); setIsExiting(false); }, 800);
  };

  const handleToDashboard = () => {
    setIsExiting(true);
    setTimeout(() => { setView('dashboard'); setIsExiting(false); }, 800);
  };

  const handleReset = () => {
    setView('input');
    setDay(""); setMonth(""); setYear(""); setError("");
  };

  return (
    <div id="main-layout" style={{ position: "relative", height: "100vh", overflowY: "auto", color: "#fff", fontFamily: "serif" }}>
      <SpaceBackground />

      {/* --- PHASE 1 & 2: INPUT & RESULT CARD --- */}
      {(view === 'input' || view === 'result') && (
        <div style={fullCenterStyle} className={isExiting ? "kin-card-exit" : "kin-card-entry"}>
          <header style={headerWrapperStyle(view)}>
            <span style={labelStyle}>Sacred Timekeeper</span>
            <h1 style={titleStyle}>
              <span style={{ textShadow: "0 0 15px rgba(255, 255, 255, 0.4)" }}>Maya</span>{" "}
              <span style={{ fontWeight: "600", color: "#fcd34d", textShadow: "0 0 20px rgba(252, 211, 77, 0.6)" }}>Cosmos</span>
            </h1>
            <p style={descStyle}>"Your birth is a celestial coordinate. Trace your origin through the ancient Maya spacetime to reveal the sacred Kin that defines your existence in the weave of eternity."</p>
            <div style={{ height: "1px", width: "40px", background: "rgba(252, 211, 77, 0.3)", margin: "0 auto" }} />
          </header>

          <div className={`card-container ${view === 'result' ? "flipped" : ""}`} style={cardContainerStyle(view)}>
            {/* FRONT CARD (INPUT) */}
            <div style={cardFaceStyle}>
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
            <div style={{ ...cardFaceStyle, transform: "rotateY(180deg)" }}>
              <div style={{ textAlign: "center" }}>
                <span style={labelStyle}>Cosmic Identity</span>
                <h2 style={{
                  fontSize: "1.8rem",
                  color: "#fcd34d",
                  margin: "10px 0",
                  // 🎯 เพิ่มแสงฟุ้งเน้นๆ ให้ชื่อ Kin
                  textShadow: "0 0 25px rgba(252, 211, 77, 0.7), 0 0 10px rgba(252, 211, 77, 0.4)",
                  fontFamily: "'Cinzel', 'Georgia', serif"
                }}>Blue Electric Eagle</h2>
                <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "25px" }}>Kin 235 | Tone 3 | Sign: Eagle</p>
                <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
                  <button onClick={handleReset} style={subButtonStyle}>New Date</button>
                  <button
                    onClick={handleToPrediction}
                    style={{
                      ...subButtonStyle,
                      borderColor: "#fcd34d",
                      color: "#fcd34d",
                      boxShadow: "0 0 15px rgba(252, 211, 77, 0.2)", // เพิ่มเงาเรืองแสงเบาๆ
                      transition: "all 0.3s ease"
                    }}
                    className="predict-btn"
                  >
                    Predictions →
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

      {/* --- PHASE 2.5: PREDICTIONS (พร้อม Split Transition) --- */}
      {view === 'prediction' && (
        <div 
          className={isExiting ? "prediction-view-exit" : "prediction-view-entry"}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
            overflowY: "auto",      // 💡 เปิดให้หน้านี้ไถขึ้นลงได้อิสระ
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "60px 20px 100px 20px" // 💡 เว้นขอบล่าง 100px ให้เลื่อนพ้นปุ่ม ไม่จมขอบจอ
          }}
        >
          {/* 💡 ลบ height: 550px ออก และใช้ flexWrap ให้การ์ดต่อคิวกันเองเมื่อจอแคบ */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", maxWidth: "1200px", width: "100%", justifyContent: "center" }}>
            
            <div className="card-love" style={{ flex: "1 1 340px", minHeight: "500px", display: "flex" }}>
              <PredictionCard icon="❤️" title="LOVE DESTINY" color="#fca5a5">
                ความรักของ Blue Electric Eagle คือการมองหาความสัมพันธ์ที่ส่งเสริม "วิสัยทัศน์"
                คุณต้องการคู่ชีวิตที่เปรียบเสมือนปีกที่ช่วยให้คุณโบยบินไปสู่เป้าหมายที่สูงขึ้น...
              </PredictionCard>
            </div>

            <div className="card-career" style={{ flex: "1 1 340px", minHeight: "500px", display: "flex" }}>
              <PredictionCard icon="💼" title="CAREER PATH" color="#7dd3fc">
                ในด้านการงาน คุณคือผู้วางกลยุทธ์จากมุมสูง Eagle มอบพลังในการมองเห็นภาพรวม
                และการวิเคราะห์ที่แม่นยำ คุณเหมาะกับการเป็นผู้นำทางความคิดหรือนักออกแบบอนาคต...ในด้านการงาน คุณคือผู้วางกลยุทธ์จากมุมสูง Eagle มอบพลังในการมองเห็นภาพรวม
                และการวิเคราะห์ที่แม่นยำ คุณเหมาะกับการเป็นผู้นำทางความคิดหรือนักออกแบบอนาคต...ในด้านการงาน คุณคือผู้วางกลยุทธ์จากมุมสูง Eagle มอบพลังในการมองเห็นภาพรวม
                และการวิเคราะห์ที่แม่นยำ คุณเหมาะกับการเป็นผู้นำทางความคิดหรือนักออกแบบอนาคต...ในด้านการงาน คุณคือผู้วางกลยุทธ์จากมุมสูง Eagle มอบพลังในการมองเห็นภาพรวม
                และการวิเคราะห์ที่แม่นยำ คุณเหมาะกับการเป็นผู้นำทางความคิดหรือนักออกแบบอนาคต...ในด้านการงาน คุณคือผู้วางกลยุทธ์จากมุมสูง Eagle มอบพลังในการมองเห็นภาพรวม
                และการวิเคราะห์ที่แม่นยำ คุณเหมาะกับการเป็นผู้นำทางความคิดหรือนักออกแบบอนาคต...ในด้านการงาน คุณคือผู้วางกลยุทธ์จากมุมสูง Eagle มอบพลังในการมองเห็นภาพรวม
                และการวิเคราะห์ที่แม่นยำ คุณเหมาะกับการเป็นผู้นำทางความคิดหรือนักออกแบบอนาคต...
              </PredictionCard>
            </div>

          </div>

          {/* 💡 ปุ่มกดจะถูกดันลงมาล่างสุดเสมอ และถ้าจอแคบ ปุ่มจะซ้อนกันเป็นแนวตั้งให้เอง */}
          <footer style={{ marginTop: "60px", display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", width: "100%" }}>
            <button onClick={() => setView('result')} style={{ ...resetFloatingBtn, minWidth: "220px", padding: "16px 20px" }}>← BACK TO KIN</button>
            <button onClick={handleToDashboard} style={{ ...resetFloatingBtn, borderColor: "#fcd34d", color: "#fcd34d", minWidth: "220px", padding: "16px 20px" }}>GO TO DASHBOARD →</button>
          </footer>
        </div>
      )}

      {/* --- PHASE 3: DASHBOARD VIEW --- */}
      {view === 'dashboard' && (
        <main style={dashboardOverlayStyle} className="dashboard-entry">
          <header style={{ textAlign: "center", marginBottom: "30px", zIndex: 40 }}>
            <span style={labelStyle}>MAYA SPACETIME DATE</span>
            <h2 style={{
              fontSize: "2.8rem",
              color: "#fcd34d",
              margin: "10px 0",
              textShadow: "0 0 25px rgba(252, 211, 77, 0.7)",
              fontFamily: "'Cinzel', 'Georgia', serif"
            }}>4 Eb' | 13 Galactic Tone</h2>
          </header>

          <div style={dashboardGridStyle} className="dashboard-grid-mobile">
            {/* การ์ดด้านซ้าย: Galaxy Tone */}
            <DashboardColumn
              title="GALAXY TONE"
              icon="🌀"
              color="#7dd3fc"
              desc="พลังงานลำดับที่ 13 บอกวิธีขับเคลื่อนชีวิตของคุณในจักรวาล พลังแห่งการแผ่ขยายและการบรรลุจุดสูงสุดของรอบเวลา..."
            />

            {/* 🎯 ส่วนตรงกลาง: เว้นไว้ให้เพื่อนทำต่อ (โครงสร้างเดิม) */}
            <section style={{ flex: 1.8, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={mayaCirclePlaceholder}>
                <div style={innerCircle} className="maya-circle-mobile">
                  <div style={orbitSpinStyle} />
                </div>
                <div style={{ marginTop: "30px", textAlign: "center" }}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "10px" }}>
                    <span style={{ fontSize: "0.8rem", color: "#7dd3fc", letterSpacing: "3px" }}>KIN</span>
                    <h1 style={{ fontSize: "4rem", color: "#fff", margin: "0", lineHeight: "1", textShadow: "0 0 20px rgba(255, 255, 255, 0.6)" }}>235</h1>
                  </div>
                  <h3 style={{ color: "#fcd34d", fontSize: "1.8rem", margin: "5px 0", letterSpacing: "2px", fontFamily: "'Cinzel', serif" }}>
                    BLUE ELECTRIC EAGLE
                  </h3>
                </div>
              </div>
            </section>

            {/* การ์ดด้านขวา: Nawal */}
            <DashboardColumn
              title="NAWAL SIGN"
              icon="🦅"
              color="#fcd34d"
              desc="สัญลักษณ์ประจำวัน 20 นาวาล คือจิตวิญญาณดั้งเดิมที่บอกถึงตัวตนของคุณ Eagle คือผู้มองเห็นวิสัยทัศน์จากมุมสูง..."
            />
          </div>

          {/* ปรับ Footer หน้า Dashboard ให้ดูโปรและปุ่มไม่แย่งซีนกัน */}
          <footer style={{ 
            padding: "40px 0 80px 0", /* เพิ่มที่ว่างด้านล่าง 80px ไม่ให้ปุ่มจมขอบจอ */
            textAlign: "center", 
            zIndex: 40, 
            display: "flex", 
            flexDirection: "column", /* บังคับให้ปุ่มเรียงบนลงล่าง */
            gap: "20px", 
            alignItems: "center",
            width: "100%"
          }}>
            {/* ปุ่มหลัก: กว้างและเด่น */}
            <button onClick={() => setView('prediction')} style={{ ...resetFloatingBtn, minWidth: "260px", padding: "16px 20px" }}>
              ← BACK TO PREDICTIONS
            </button>
            
            {/* ปุ่มรอง: เปลี่ยนเป็นแค่ตัวหนังสือเรียบๆ (Text Link) */}
            <button 
              onClick={handleReset} 
              style={{ 
                background: "transparent", 
                border: "none", 
                color: "rgba(255, 255, 255, 0.4)", /* สีเทาจางๆ */
                fontSize: "0.75rem", 
                letterSpacing: "3px", 
                cursor: "pointer",
                textDecoration: "underline", /* ขีดเส้นใต้ให้รู้ว่ากดได้ */
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
.dashboard-card-fix {
  max-height: 500px;
  height: 100%;
  justify-content: flex-start !important; /* จัดให้ไอคอนอยู่ด้านบน */
  transition: all 0.5s ease;
}

.dashboard-card-fix:hover {
  transform: translateY(-15px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0,0,0,0.6);
  border-color: rgba(252, 211, 77, 0.3) !important;
}

/* ทำให้ Scrollbar ในหน้า Dashboard สวยขึ้น */
.dashboard-card-fix .custom-scroll::-webkit-scrollbar {
  width: 2px;
}
  /* 1. การตั้งค่าพื้นฐานสำหรับหน้า Prediction */
  .prediction-card-hover {
    position: relative;
    overflow: hidden; /* กักแสงให้อยู่ในกรอบ */
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: 1;
  }

  /* 2. แสงวิ่งรอบการ์ด (The Cosmic Aura) */
  .prediction-card-hover::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    /* ปรับสีให้สว่างขึ้นเพื่อให้เห็นชัดบนจอ */
    background: conic-gradient(
      transparent, 
      rgba(252, 211, 77, 0.2), 
      transparent 15%,
      rgba(125, 211, 252, 0.2),
      transparent 30%
    );
    animation: rotateGlow 8s linear infinite;
    pointer-events: none;
    z-index: -1; /* ต้องอยู่หลัง Content */
  }

  @keyframes rotateGlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* 3. เอฟเฟกต์เวลาเอาเมาส์ไปวาง */
  .card-love:hover, .card-career:hover {
    transform: translateY(-12px) scale(1.03) !important;
    filter: brightness(1.2);
    box-shadow: 0 15px 40px rgba(252, 211, 77, 0.15);
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

  .dashboard-entry { animation: dashboardFadeIn 1s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
  @keyframes dashboardFadeIn { from { opacity: 0; transform: scale(1.1); } to { opacity: 1; transform: scale(1); } }


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

  /* --- ส่วนนี้สำหรับหน้า Dashboard (Phase 3) ไม่ให้ล้น --- */
  .dashboard-grid-mobile {
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

  .dashboard-card-fix {
    width: 100% !important;
    max-width: 100% !important;
    height: auto !important;
  }
}










`}</style>
    </div>
  );
}

// --- Sub-Components ---
function InputItem({ label, value, onChange, hint, isMonth = false }: any) {
  return (
    <div style={{ flex: 1, minWidth: 0, textAlign: "center" }}>
      <label style={{ display: "block", fontSize: "0.6rem", color: "rgba(125, 211, 252, 0.5)", marginBottom: "10px", letterSpacing: "2px", fontWeight: "bold" }}>{label}</label>
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
    <div style={predictionCardStyle} className="prediction-card-hover">
      {/* 1. Watermark Icon (สัญลักษณ์จางๆ วางไว้เลเยอร์หลังสุด) */}
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

      {/* 2. Main Content (วางไว้บน zIndex: 1 เพื่อไม่ให้แสงวิ่งบัง) */}
      <div style={{
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        width: "100%"
      }}>

        {/* Icon ด้านบน */}
        <div style={predictionIconStyle}>{icon}</div>

        {/* หัวข้อ พร้อมแสงฟุ้งตามสีที่ส่งมา */}
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

        {/* ส่วนเนื้อหาพร้อม Scrollbar แบบ Custom */}
        <div className="custom-scroll" style={scrollContentStyle}>
          <p style={{
            ...predictionTextStyle,
            padding: "0 10px",
            animation: "floatUp 1.2s ease-out forwards" // บังคับใช้ animation ตรงนี้อีกที
          }}>
            {children}
          </p>
        </div>
      </div>
    </div>
  );
}

function DashboardColumn({ title, icon, desc, color = "#7dd3fc" }: any) {
  return (
    <section style={flexibleColumnStyle} className="prediction-card-hover dashboard-card-fix">
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
        <p style={{ ...columnDesc, textAlign: "center", padding: "0 10px" }}>{desc}</p>
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

const cardFaceStyle: React.CSSProperties = { 
  position: "absolute", // ต้องเป็น absolute เพื่อให้หน้าหน้า-หลังซ้อนกันได้
  inset: 0, 
  width: "100%", 
  height: "100%", 
  background: GLASS_BG, 
  backdropFilter: GLASS_BLUR, 
  borderRadius: "30px 2px", 
  padding: "30px 40px", 
  border: GLASS_BORDER, 
  backfaceVisibility: "hidden", // สำคัญมาก: เพื่อไม่ให้เห็นหน้าหลังตอนมันพลิก
  display: "flex", 
  flexDirection: "column", 
  justifyContent: "center", 
  boxSizing: "border-box",
  WebkitBackfaceVisibility: "hidden" // เผื่อสำหรับ Safari ใน iPhone
};

const cardContainerStyle = (view: string): React.CSSProperties => ({
  position: "relative",
  width: "90%",
  maxWidth: "350px",
  height: "320px", // เพิ่มความสูงอีกนิดเพื่อความสมดุล
  transformStyle: "preserve-3d",
  transition: "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1), top 1.2s ease",
  // เมื่อเป็นหน้า result ให้เลื่อนขึ้นมาแทนที่ตำแหน่ง Header ที่หายไป
  top: view === 'result' ? "-100px" : "0px", 
  margin: "0 auto",
});

const predictionCardStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  // 🎯 เปลี่ยนเป็น Gradient เพื่อให้เห็น Layer ของแสง
  background: "linear-gradient(165deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)",
  backdropFilter: "blur(30px)", // เพิ่ม Blur อีกนิด
  borderRadius: "24px",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  padding: "40px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)", // เพิ่มเงาด้านล่างให้ดูเหมือนลอย
  transition: "all 0.4s ease",
  position: "relative",
  overflow: "hidden"
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
const subButtonStyle: React.CSSProperties = { background: "transparent", border: "1px solid rgba(255, 255, 255, 0.2)", color: "#fff", borderRadius: "4px", fontSize: "0.75rem", letterSpacing: "2px", padding: "10px 20px", cursor: "pointer" };
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
const dashboardOverlayStyle: React.CSSProperties = { 
  position: "absolute", 
  inset: 0, 
  zIndex: 30, 
  display: "flex", 
  flexDirection: "column", 
  padding: "2vh 2vw", 
  justifyContent: "flex-start", // เปลี่ยนจาก center เป็น start เพื่อให้ไถขึ้นได้
  overflowY: "auto" 
};
const dashboardGridStyle: React.CSSProperties = { 
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
const flexibleColumnStyle: React.CSSProperties = { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 30px", background: GLASS_BG, backdropFilter: GLASS_BLUR, borderRadius: "24px", border: GLASS_BORDER, maxWidth: "340px" };
const logoPlaceholderRed: React.CSSProperties = { width: "80px", height: "80px", background: "rgba(239, 68, 68, 0.1)", borderRadius: "50%", border: "1px solid #ef4444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", color: "#ef4444", marginBottom: "20px" };
const columnTitle: React.CSSProperties = { fontSize: "1rem", color: "#7dd3fc", letterSpacing: "3px", marginBottom: "15px" };
const columnDesc: React.CSSProperties = { fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", lineHeight: "1.7", textAlign: "center" };
const mayaCirclePlaceholder: React.CSSProperties = { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1 };
const innerCircle: React.CSSProperties = { 
  width: "min(80vw, 480px)", // ใช้ 80vw เพื่อให้เล็กลงในมือถือ
  height: "min(80vw, 480px)", 
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
  fontSize: "1.2rem",
  textAlign: "center",
  outline: "none",
  fontFamily: "monospace",
  // 🎯 เพิ่มบรรทัดนี้เข้าไปครับ
  textShadow: "0 0 10px rgba(255, 255, 255, 0.3)"
};
const selectStyle: React.CSSProperties = { ...inputStyle, appearance: "none", cursor: "pointer" };

const headerWrapperStyle = (view: string): React.CSSProperties => ({ textAlign: "center", transition: "all 0.8s ease", opacity: view === 'result' ? 0 : 1, transform: view === 'result' ? "translateY(-50px)" : "translateY(0)", marginBottom: "30px", pointerEvents: view === 'result' ? 'none' : 'auto' });
const footerWrapperStyle = (view: string): React.CSSProperties => ({ display: "flex", gap: "30px", fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.5)", letterSpacing: "2px", textTransform: "uppercase", marginTop: "60px", transition: "opacity 0.8s", opacity: view === 'result' ? 0 : 1 });