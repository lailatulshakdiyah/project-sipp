export function getLevelEnglish(rawLevel) {
  const level = rawLevel?.toString().trim().toLowerCase();
  if (level === "rendah") return "low";
  if (level === "sedang") return "medium";
  if (level === "tinggi") return "high";
  return level;
}