import { TONES } from "../tones";
import { SIGNS } from "../signs";

export function getTzolkinDate(dateString: string) {
  const date = new Date(dateString);
  const refDate = new Date("2012-12-21");
  const diffDays = Math.floor(
    (date.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  let toneIndex = (diffDays + 4) % 13;
  if (toneIndex <= 0) toneIndex += 13;

  let signIndex = (diffDays + 19) % 20;
  if (signIndex < 0) signIndex += 20;

  // Calculate Kin number (1-260)
  let kin = (diffDays % 260);
  if (kin <= 0) kin += 260;

  return {
    kin,
    toneNumber: toneIndex,
    tone: TONES[toneIndex as keyof typeof TONES],
    signNumber: signIndex + 1,
    sign: SIGNS[signIndex]
  };
}
