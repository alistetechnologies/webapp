import { default as dayjs } from "dayjs";

export const formatDate = (date) => dayjs(date).format("D MMMM, YYYY");

export const formatDateTime = (date) =>
  dayjs(date).format("D/MM/YY hh:mm:ss A");

export function convertMilliseconds(totalMilliseconds) {
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds };
}

export function convertTimeStringTo12Hour(timeString) {
  const date = new Date(timeString);

  let hours = date.getHours();

  const minutes = "0" + date.getMinutes();

  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12;

  hours = hours ? hours : 12; // Midnight (0 hours)
  // return `${hours}:${minutes.slice(-2)} ${ampm}`
  return `${hours}:${minutes.slice(-2)}${ampm}`;
}

export function convertSecondsToTime(seconds) {
  // Calculate hours, minutes, and remaining seconds
  const hours = Math.floor(seconds / 3600); // 1 hour = 3600 seconds
  const minutes = Math.floor((seconds % 3600) / 60); // 1 minute = 60 seconds
  const remainingSeconds = seconds % 60; // Remaining seconds after extracting hours and minutes

  // Return the result in "hh:mm:ss" format
  return {
    hours: hours,
    minutes: minutes,
    seconds: remainingSeconds,
  };
}
