import { TONES } from "../tones";
import { SIGNS } from "../signs";
import { Sign } from "@/types/mayan";

export function generateMayanNarrativeTh(
  toneNumber: number,
  sign: Sign
) {
  const tone = TONES[toneNumber as keyof typeof TONES];

  const toneNamesTh: Record<string, string> = {
    "Magnetic": "แม่เหล็ก",
    "Lunar": "จันทรา",
    "Electric": "ไฟฟ้า",
    "Self-Existing": "ดำรงอยู่",
    "Overtone": "โอเวอร์โทน",
    "Rhythmic": "จังหวะ",
    "Resonant": "สะท้อน",
    "Galactic": "กาแล็กซี",
    "Solar": "สุริยะ",
    "Planetary": "ดาวเคราะห์",
    "Spectral": "สเปกตรัม",
    "Crystal": "คริสตัล",
    "Cosmic": "จักรวาล"
  };

  const signNamesTh: Record<string, string> = {
    "Imix": "อิมิกซ์",
    "Ik": "อิก",
    "Akbal": "อักบาล",
    "Kan": "กัน",
    "Chicchan": "ชิคชาน",
    "Cimi": "ซิมิ",
    "Manik": "มานิก",
    "Lamat": "ลามัต",
    "Muluc": "มูลุก",
    "Oc": "อ็อก",
    "Chuen": "ชูเอน",
    "Eb": "เอ็บ",
    "Ben": "เบน",
    "Ix": "อิกซ์",
    "Men": "เมน",
    "Cib": "ซิบ",
    "Caban": "คาบัน",
    "Etznab": "เอทซ์นับ",
    "Cauac": "เคาอัค",
    "Ahau": "อาเฮา"
  };

  const archetypeTh: Record<string, string> = {
    "The Primordial Mother": "แม่ดั้งเดิม",
    "The Wind": "ลม",
    "The Night": "ราตรี",
    "The Seed": "เมล็ดพันธุ์",
    "The Serpent": "งู",
    "The Transformer": "ผู้เปลี่ยนแปลง",
    "The Healer": "ผู้รักษา",
    "The Star": "ดาว",
    "The Moon": "จันทร์",
    "The Companion": "เพื่อนคู่ใจ",
    "The Artist": "ศิลปิน",
    "The Path": "เส้นทาง",
    "The Reed": "ต้นอ้อ",
    "The Jaguar": "เสือจากัวร์",
    "The Eagle": "นกอินทรี",
    "The Ancestor": "บรรพบุรุษ",
    "The Earth": "โลก",
    "The Mirror": "กระจก",
    "The Storm": "พายุ",
    "The Sun": "ดวงอาทิตย์"
  };

  const essenceTh: Record<string, string> = {
    "You carry the energy of creation, birth, and emotional depth.": "คุณพกพาพลังงานแห่งการสร้างสรรค์ การเกิด และความลึกซึ้งทางอารมณ์",
    "Your words have the power to shape reality.": "คำพูดของคุณมีพลังในการสร้างความเป็นจริง",
    "You are a guardian of the subconscious and hidden truths.": "คุณคือผู้พิทักษ์จิตใต้สำนึกและความจริงที่ซ่อนอยู่",
    "Your power lies in realizing your inner potential.": "พลังของคุณอยู่ที่การตระหนักถึงศักยภาพภายใน",
    "You embody raw life energy and survival wisdom.": "คุณเป็นตัวแทนของพลังชีวิตดิบและภูมิปัญญาการอยู่รอด",
    "You guide others through endings and new beginnings.": "คุณนำทางผู้อื่นผ่านการสิ้นสุดและการเริ่มต้นใหม่",
    "Your hands carry the power to heal and support.": "มือของคุณพกพาพลังในการรักษาและสนับสนุน",
    "You radiate beauty and balance.": "คุณแผ่รังสีความงามและความสมดุล",
    "You purify and heal through emotional truth.": "คุณชำระล้างและรักษาผ่านความจริงทางอารมณ์",
    "You teach unconditional love.": "คุณสอนความรักที่ไม่มีเงื่อนไข",
    "You remind the world not to take life too seriously.": "คุณเตือนโลกให้อย่าจริงจังกับชีวิตมากเกินไป",
    "Your life is a path of service and learning.": "ชีวิตของคุณคือเส้นทางแห่งการรับใช้และการเรียนรู้",
    "You stand as a pillar of truth.": "คุณยืนหยัดเป็นเสาหลักแห่งความจริง",
    "You walk between worlds with silent power.": "คุณเดินระหว่างโลกด้วยพลังที่เงียบงัน",
    "You see far beyond the present moment.": "คุณมองเห็นไกลเกินกว่าปัจจุบัน",
    "You carry ancestral wisdom.": "คุณพกพาภูมิปัญญาของบรรพบุรุษ",
    "You move in harmony with the Earth.": "คุณเคลื่อนไหวอย่างกลมกลืนกับโลก",
    "You reveal truth without distortion.": "คุณเปิดเผยความจริงโดยไม่บิดเบือน",
    "You bring renewal through upheaval.": "คุณนำการฟื้นฟูมาผ่านความวุ่นวาย",
    "You illuminate consciousness.": "คุณส่องสว่างจิตสำนึก"
  };

  const strengthsTh: Record<string, string> = {
    "Strong intuition": "สัญชาตญาณที่แข็งแกร่ง",
    "Creative imagination": "จินตนาการสร้างสรรค์",
    "Protective and caring nature": "ธรรมชาติที่ปกป้องและเอาใจใส่",
    "Clear expression": "การแสดงออกที่ชัดเจน",
    "Intellectual agility": "ความคล่องแคล่วทางปัญญา",
    "Inspirational speaker": "ผู้พูดที่สร้างแรงบันดาลใจ",
    "Dream wisdom": "ภูมิปัญญาจากความฝัน",
    "Emotional resilience": "ความยืดหยุ่นทางอารมณ์",
    "Strong inner world": "โลกภายในที่แข็งแกร่ง",
    "Inner strength": "พลังภายใน",
    "Clear direction": "ทิศทางที่ชัดเจน",
    "Natural evolution": "วิวัฒนาการตามธรรมชาติ",
    "High vitality": "พลังชีวิตสูง",
    "Strong instincts": "สัญชาตญาณที่แข็งแกร่ง",
    "Physical awareness": "การตระหนักรู้ทางกาย",
    "Emotional steadiness": "ความมั่นคงทางอารมณ์",
    "Comfort with change": "สบายใจกับการเปลี่ยนแปลง",
    "Healing presence": "การปรากฏตัวที่เยียวยา",
    "Healing energy": "พลังงานการรักษา",
    "Responsibility": "ความรับผิดชอบ",
    "Strong ethics": "จริยธรรมที่แข็งแกร่ง",
    "Natural charm": "เสน่ห์ตามธรรมชาติ",
    "Artistic talent": "พรสวรรค์ทางศิลปะ",
    "Harmonizing presence": "การปรากฏตัวที่สร้างความกลมกลืน",
    "Empathy": "ความเห็นอกเห็นใจ",
    "Emotional honesty": "ความซื่อสัตย์ทางอารมณ์",
    "Intuitive flow": "การไหลตามสัญชาตญาณ",
    "Trustworthiness": "ความน่าเชื่อถือ",
    "Emotional warmth": "ความอบอุ่นทางอารมณ์",
    "Strong sense of belonging": "ความรู้สึกเป็นส่วนหนึ่งที่แข็งแกร่ง",
    "Humor": "อารมณ์ขัน",
    "Creative problem-solving": "การแก้ปัญหาอย่างสร้างสรรค์",
    "Mental flexibility": "ความยืดหยุ่นทางจิตใจ",
    "Guidance": "การนำทาง",
    "Wisdom through experience": "ภูมิปัญญาจากประสบการณ์",
    "Empathy for others": "ความเห็นอกเห็นใจผู้อื่น",
    "Leadership": "ความเป็นผู้นำ",
    "Clear boundaries": "ขอบเขตที่ชัดเจน",
    "Integrity": "ความซื่อสัตย์",
    "Spiritual awareness": "การตระหนักรู้ทางจิตวิญญาณ",
    "Grace under pressure": "ความสง่างามภายใต้แรงกดดัน",
    "Big-picture thinking": "การคิดภาพรวม",
    "Mental clarity": "ความชัดเจนทางจิตใจ",
    "Leadership vision": "วิสัยทัศน์ความเป็นผู้นำ",
    "Deep insight": "ความเข้าใจอย่างลึกซึ้ง",
    "Respect for history": "ความเคารพต่อประวัติศาสตร์",
    "Ethical awareness": "การตระหนักรู้ทางจริยธรรม",
    "Present-moment awareness": "การตระหนักรู้ในปัจจุบันขณะ",
    "Environmental sensitivity": "ความไวต่อสิ่งแวดล้อม",
    "Adaptability": "ความสามารถในการปรับตัว",
    "Clarity": "ความชัดเจน",
    "Direct communication": "การสื่อสารตรงไปตรงมา",
    "Analytical insight": "ความเข้าใจเชิงวิเคราะห์",
    "Emotional power": "พลังทางอารมณ์",
    "Resilience": "ความยืดหยุ่น",
    "Renewal energy": "พลังงานการฟื้นฟู",
    "Charisma": "เสน่ห์ส่วนตัว",
    "Clarity of purpose": "ความชัดเจนของจุดประสงค์",
    "Spiritual leadership": "ความเป็นผู้นำทางจิตวิญญาณ"
  };

  const challengesTh: Record<string, string> = {
    "Emotional overwhelm": "ความท่วมท้นทางอารมณ์",
    "Difficulty setting boundaries": "ความยากในการตั้งขอบเขต",
    "Restlessness": "ความกระสับกระส่าย",
    "Overthinking": "การคิดมากเกินไป",
    "Fear of the unknown": "ความกลัวสิ่งที่ไม่รู้",
    "Tendency toward isolation": "แนวโน้มที่จะแยกตัว",
    "Impatience": "ความใจร้อน",
    "Self-doubt during early stages": "ความสงสัยในตนเองในช่วงเริ่มต้น",
    "Impulsiveness": "ความหุนหันพลันแล่น",
    "Emotional intensity": "ความเข้มข้นทางอารมณ์",
    "Emotional detachment": "ความเหินห่างทางอารมณ์",
    "Fear of loss": "ความกลัวการสูญเสีย",
    "Self-sacrifice": "การเสียสละตนเอง",
    "Burnout": "ความหมดไฟ",
    "People-pleasing": "การเอาใจผู้อื่น",
    "Seeking validation": "การแสวงหาการยอมรับ",
    "Mood swings": "อารมณ์แปรปรวน",
    "Emotional vulnerability": "ความเปราะบางทางอารมณ์",
    "Attachment": "ความยึดติด",
    "Difficulty letting go": "ความยากในการปล่อยวาง",
    "Lack of focus": "ขาดสมาธิ",
    "Avoidance of responsibility": "การหลีกเลี่ยงความรับผิดชอบ",
    "Feeling burdened by responsibility": "รู้สึกเป็นภาระจากความรับผิดชอบ",
    "Self-judgment": "การตัดสินตนเอง",
    "Rigidity": "ความแข็งกระด้าง",
    "Authoritarian tendencies": "แนวโน้มเผด็จการ",
    "Withdrawal": "การถอนตัว",
    "Trust issues": "ปัญหาความไว้วางใจ",
    "Detachment": "ความเหินห่าง",
    "Impatience with details": "ความใจร้อนกับรายละเอียด",
    "Over-identification with the past": "การยึดติดกับอดีตมากเกินไป",
    "Rigidity of belief": "ความแข็งกระด้างของความเชื่อ",
    "Overstimulation": "การถูกกระตุ้นมากเกินไป",
    "Harsh honesty": "ความซื่อสัตย์ที่รุนแรง",
    "Conflict-prone": "มีแนวโน้มที่จะขัดแย้ง",
    "Emotional volatility": "ความผันผวนทางอารมณ์",
    "Ego inflation": "อัตตาที่พองตัว",
    "Pressure to always shine": "แรงกดดันที่ต้องเปล่งประกายตลอดเวลา"
  };

  const toneDescriptionsTh: Record<number, {
  action: string;
  core: string;
  strength: string;
  shadow: string;
}> = {
  1: {
    action: "ดึงดูดและตั้งเจตนา",
    core: "การเริ่มต้น เส้นทางชีวิต และเป้าหมายที่ชัดเจน",
    strength: "พลังผู้นำตามธรรมชาติและวิสัยทัศน์ที่ชัดเจน",
    shadow: "ความยึดมั่นในความคิดของตนเองหรือไม่เปิดรับผู้อื่น"
  },
  2: {
    action: "สะท้อนและรับรู้ความต่าง",
    core: "ความสัมพันธ์ ความรู้สึกภายใน และสองด้านของชีวิต",
    strength: "ความอ่อนไหวทางอารมณ์และความเข้าใจผู้อื่นอย่างลึกซึ้ง",
    shadow: "ความลังเล ความไม่มั่นใจ หรืออารมณ์ขึ้นลงง่าย"
  },
  3: {
    action: "ขับเคลื่อนและจุดประกาย",
    core: "การลงมือทำ พลังชีวิต และการเริ่มเคลื่อนไหว",
    strength: "ความกระตือรือร้นและความสามารถในการทำให้สิ่งต่าง ๆ เกิดขึ้นจริง",
    shadow: "ใจร้อน ทำหลายอย่างพร้อมกันจนพลังกระจัดกระจาย"
  },
  4: {
    action: "วางโครงสร้าง",
    core: "ความมั่นคง กรอบชีวิต และรากฐานที่ชัดเจน",
    strength: "ความรับผิดชอบและความน่าเชื่อถือ",
    shadow: "ความยึดติดกับรูปแบบเดิมหรือไม่ยอมเปลี่ยนแปลง"
  },
  5: {
    action: "เสริมพลังและขยายอิทธิพล",
    core: "พลังภายใน ความเชื่อมั่น และการส่งต่อแรงบันดาลใจ",
    strength: "ความสามารถในการนำทางและปลุกพลังผู้อื่น",
    shadow: "การควบคุมผู้อื่นมากเกินไปหรือใช้พลังเกินขอบเขต"
  },
  6: {
    action: "ปรับจังหวะให้สมดุล",
    core: "ความกลมกลืน ความพอดี และการไหลของชีวิต",
    strength: "การปรับตัวเก่งและรักษาสมดุลในสถานการณ์ต่าง ๆ",
    shadow: "หลีกเลี่ยงความรับผิดชอบหรือขาดทิศทาง"
  },
  7: {
    action: "เชื่อมต่อและรับฟังพลัง",
    core: "การรับรู้ภายใน การสั่นพ้อง และจิตวิญญาณ",
    strength: "ความสามารถในการเชื่อมโยงผู้คนและพลังรอบตัว",
    shadow: "รับพลังรอบข้างมากเกินไปจนหลงลืมตัวตน"
  },
  8: {
    action: "กลมกลืนและจัดระเบียบพลัง",
    core: "ความสมบูรณ์ ความเป็นหนึ่งเดียว และความสมดุลสูงสุด",
    strength: "มองภาพรวมเก่งและสร้างความสมบูรณ์ให้สิ่งต่าง ๆ",
    shadow: "คาดหวังความสมบูรณ์แบบกับตนเองและผู้อื่นมากเกินไป"
  },
  9: {
    action: "สรุปบทเรียนและปล่อยวาง",
    core: "การจบวงจร การเปลี่ยนผ่าน และการเติบโต",
    strength: "การยอมรับการเปลี่ยนแปลงและเปิดรับบทใหม่ของชีวิต",
    shadow: "ยึดติดกับอดีตหรือกลัวการสูญเสีย"
  },
  10: {
    action: "แสดงผลและทำให้เป็นรูปธรรม",
    core: "การแสดงตัวตนและผลลัพธ์ที่จับต้องได้",
    strength: "ทำความคิดให้กลายเป็นความจริงได้อย่างเป็นรูปธรรม",
    shadow: "แบกรับภาระมากเกินไปจนเสียสมดุลชีวิต"
  },
  11: {
    action: "ปลดปล่อยและชำระพลัง",
    core: "การล้างสิ่งเก่าและการเปลี่ยนแปลงเชิงลึก",
    strength: "ความกล้าปล่อยสิ่งที่ไม่จำเป็นออกจากชีวิต",
    shadow: "ความผันผวน วุ่นวาย หรือชีวิตไม่มั่นคงช่วงหนึ่ง"
  },
  12: {
    action: "หลอมรวมและแบ่งปัน",
    core: "การทำงานร่วมกัน ความเข้าใจ และการตกผลึกความคิด",
    strength: "การสื่อสารและประสานผู้คนได้อย่างมีพลัง",
    shadow: "คิดซับซ้อนเกินไปหรือสับสนในทิศทาง"
  },
  13: {
    action: "ก้าวข้ามและปิดวงจร",
    core: "การบรรลุ การเชื่อมต่อกับสิ่งที่สูงกว่า",
    strength: "พลังแห่งปัญญาและการมองไกลเกินกรอบเดิม",
    shadow: "รู้สึกแยกตัว โดดเดี่ยว หรือเหนือผู้อื่น"
  }
};

  const toneNameTh = toneNamesTh[tone.name] || tone.name;
  const signNameTh = signNamesTh[sign.name] || sign.name;
  const archetypeNameTh = archetypeTh[sign.archetype] || sign.archetype;
  const essenceTextTh = essenceTh[sign.personality.essence] || sign.personality.essence;
  const toneDesc = toneDescriptionsTh[toneNumber];

  const strengthsTranslated = sign.personality.strengths.map(s => strengthsTh[s] || s).join(", ");
  const challengesTranslated = sign.personality.challenges.map(c => challengesTh[c] || c).join(", ");

  return {
    tone: `โทนกาแล็กซีที่ ${toneNumber} เรียกว่า ${toneNameTh} แทนหลักการของ${toneDesc.action} โทนนี้มีอิทธิพลต่อวิธีที่คุณดำเนินชีวิต แสดงคุณสมบัติเช่น ${toneDesc.core} ในการแสดงออกสูงสุด โทนนี้มอบ${toneDesc.strength} ในขณะที่ด้านมืดอาจปรากฏเป็น${toneDesc.shadow}`,
    
    sign: `สัญลักษณ์ประจำวันของคุณคือ ${signNameTh} (${archetypeNameTh}) ${essenceTextTh} สัญลักษณ์นี้มอบจุดแข็งให้คุณคือ ${strengthsTranslated} แต่ก็ท้าทายคุณผ่าน${challengesTranslated}`
  };
}
