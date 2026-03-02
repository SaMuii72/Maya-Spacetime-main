// Maya Tone and Sign translations
export const toneTranslations: Record<string, { th: string }> = {
  "Magnetic": { th: "แม่เหล็ก" },
  "Lunar": { th: "จันทรา" },
  "Electric": { th: "ไฟฟ้า" },
  "Self-Existing": { th: "ดำรงอยู่" },
  "Overtone": { th: "โอเวอร์โทน" },
  "Rhythmic": { th: "จังหวะ" },
  "Resonant": { th: "สะท้อน" },
  "Galactic": { th: "กาแล็กซี" },
  "Solar": { th: "สุริยะ" },
  "Planetary": { th: "ดาวเคราะห์" },
  "Spectral": { th: "สเปกตรัม" },
  "Crystal": { th: "คริสตัล" },
  "Cosmic": { th: "จักรวาล" }
};

export const signTranslations: Record<string, { th: string }> = {
  "Imix": { th: "อิมิกซ์" },
  "Ik": { th: "อิก" },
  "Akbal": { th: "อักบาล" },
  "Kan": { th: "กัน" },
  "Chicchan": { th: "ชิคชาน" },
  "Cimi": { th: "ซิมิ" },
  "Manik": { th: "มานิก" },
  "Lamat": { th: "ลามัต" },
  "Muluc": { th: "มูลุก" },
  "Oc": { th: "อ็อก" },
  "Chuen": { th: "ชูเอน" },
  "Eb": { th: "เอ็บ" },
  "Ben": { th: "เบน" },
  "Ix": { th: "อิกซ์" },
  "Men": { th: "เมน" },
  "Cib": { th: "ซิบ" },
  "Caban": { th: "คาบัน" },
  "Etznab": { th: "เอทซ์นับ" },
  "Cauac": { th: "เคาอัค" },
  "Ahau": { th: "อาเฮา" }
};

export function getTranslatedTone(toneNameOrObj: any, language: 'en' | 'th'): string {
  const toneName = typeof toneNameOrObj === 'string' ? toneNameOrObj : toneNameOrObj?.name || toneNameOrObj;
  console.log('Translating tone:', toneName, 'to', language);
  if (language === 'th' && toneTranslations[toneName]) {
    console.log('Found translation:', toneTranslations[toneName].th);
    return toneTranslations[toneName].th;
  }
  return toneName;
}

export function getTranslatedSign(signNameOrObj: any, language: 'en' | 'th'): string {
  const signName = typeof signNameOrObj === 'string' ? signNameOrObj : signNameOrObj?.name || signNameOrObj;
  console.log('Translating sign:', signName, 'to', language);
  if (language === 'th' && signTranslations[signName]) {
    console.log('Found translation:', signTranslations[signName].th);
    return signTranslations[signName].th;
  }
  return signName;
}
