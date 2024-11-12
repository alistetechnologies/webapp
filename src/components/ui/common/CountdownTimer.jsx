import React, { useEffect, useState } from 'react';

export default function CountdownTimer({ initialTime = 10, setFinished }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft === 0) {
      setFinished(true);
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, '0');
  const remainingSeconds = Math.floor(timeLeft % 60)
    .toString()
    .padStart(2, '0');

  return (
    <span className='text-[#2050FF] hover:underline font-bold'>
      {' '}
      {minutes}:{remainingSeconds}
    </span>
  );
}
