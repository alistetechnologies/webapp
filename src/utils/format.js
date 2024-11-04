import { default as dayjs } from 'dayjs';

export const formatDate = (date) => dayjs(date).format('D MMMM, YYYY');

export const formatDateTime = (date) =>
  dayjs(date).format('D/MM/YY hh:mm:ss A');

export function convertMilliseconds(totalMilliseconds) {
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds };
}
