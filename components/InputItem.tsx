import React from 'react';

interface InputItemProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  hint: string;
  isMonth?: boolean;
}

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

export default function InputItem({ label, value, onChange, hint, isMonth = false }: InputItemProps) {
  return (
    <div style={{ flex: 1, minWidth: 0, textAlign: "center" }}>
      <label style={{ display: "block", fontSize: "1rem", color: "rgba(125, 211, 252, 0.5)", marginBottom: "10px", letterSpacing: "2px", fontWeight: "bold" }}>
        {label}
      </label>
      {isMonth ? (
        <select value={value} onChange={(e) => onChange(e.target.value)} style={{ ...selectStyle, color: value ? "#fff" : "rgba(255, 255, 255, 0.2)" }}>
          <option value="" disabled hidden>{hint}</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1} style={{ color: "#000" }}>
              {new Date(0, i).toLocaleString('en', { month: 'short' })}
            </option>
          ))}
        </select>
      ) : (
        <input 
          type="text" 
          maxLength={label === "YEAR" ? 4 : 2} 
          value={value} 
          onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))} 
          placeholder={hint} 
          style={inputStyle} 
        />
      )}
    </div>
  );
}
