/**
 * Dynamic Progressive Seat Scarcity Illusion Engine:
 * Starts at 45% on September 4, 2026
 * Gradually and automatically increases to 95% by September 30, 2026
 */
export function getScarcityData() {
  const startDate = new Date("2026-09-04T00:00:00+05:30").getTime();
  const endDate = new Date("2026-09-30T23:59:59+05:30").getTime();
  const now = Date.now();

  const progressRatio = Math.min(1, Math.max(0, (now - startDate) / (endDate - startDate)));
  
  // Floating-point percentage for smooth CSS width transitions (45.0% - 95.0%)
  const exactPercent = 45 + progressRatio * 50;
  
  // Clamped integer percentage for text display
  const percent = Math.min(95, Math.max(45, Math.round(exactPercent)));
  
  // Clamped booked seats (225 -> 475 out of 500)
  const booked = Math.min(475, Math.max(225, Math.round((500 * exactPercent) / 100)));
  
  // Clamped remaining seats (275 -> 25)
  const remaining = Math.max(25, 500 - booked);

  return {
    exactPercent: Math.min(95, Math.max(45, exactPercent)),
    percent,
    booked,
    remaining,
    total: 500,
  };
}
