/**
 * Dynamic Progressive Seat Scarcity Illusion Engine:
 * Total Seats: 1,000
 * Gradually and automatically increases booked seats to 991 by October 31, 2026
 */
export function getScarcityData() {
  const startDate = new Date("2026-10-02T00:00:00+05:30").getTime();
  const endDate = new Date("2026-10-31T23:59:59+05:30").getTime();
  const now = Date.now();

  const total = 1000;
  const startBooked = 562;
  const targetEndBooked = 991;

  const progressRatio = Math.min(1, Math.max(0, (now - startDate) / (endDate - startDate)));
  
  // Floating-point booked calculation for smooth progression
  const exactBooked = startBooked + progressRatio * (targetEndBooked - startBooked);
  
  // Clamped integer booked seats (562 -> 991 out of 1000)
  const booked = Math.min(targetEndBooked, Math.max(startBooked, Math.round(exactBooked)));
  
  // Clamped remaining seats (438 -> 9)
  const remaining = Math.max(total - targetEndBooked, total - booked);

  // Floating-point percentage for smooth CSS width transitions
  const exactPercent = (exactBooked / total) * 100;
  
  // Clamped percentage for text display (1 decimal place)
  const percent = Math.min(99.1, Math.max(56.2, Number(((booked / total) * 100).toFixed(1))));

  return {
    exactPercent,
    percent,
    booked,
    remaining,
    total,
  };
}
