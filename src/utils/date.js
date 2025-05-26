/**
 * Calculates the number of days since the given date until today.
 * @param {Date|string} date - The past date (Date object or ISO string).
 * @returns {number} Number of days since the given date (rounded down).
 */
export function daysSince(date) {
  const inputDate = new Date(date);
  const today = new Date();
  // Zero out time for accurate day difference
  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const diffMs = today - inputDate;
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}
