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

/**
 * Calculates the number of days, hours, and minutes since the given timestamp until now.
 * @param {Date|string|number} timestamp - The past timestamp (Date object, ISO string, or ms since epoch).
 * @returns {{days: number, hours: number, minutes: number, string: string}} Object with days, hours, minutes and a string since the timestamp.
 */
export function timeSince(timestamp) {
  const past = new Date(timestamp);
  const now = new Date();
  let diffMs = now - past;

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  diffMs -= days * 1000 * 60 * 60 * 24;

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  diffMs -= hours * 1000 * 60 * 60;

  const minutes = Math.floor(diffMs / (1000 * 60));

  const timeStringParts = [];
  if (days > 0) timeStringParts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours > 0) timeStringParts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes > 0 && days === 0)
    timeStringParts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);

  const string = timeStringParts.join(", ");
  return { days, hours, minutes, string };
}
