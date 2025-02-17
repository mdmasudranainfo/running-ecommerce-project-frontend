import React, { useEffect, useState } from "react";

const Clock = ({ deadline }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const leading0 = (num) => {
    return num < 10 ? "0" + num : num;
  };

  const getTimeUntil = (deadline) => {
    const time = Date.parse(deadline) - Date.parse(new Date());
    if (time < 0) {
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    } else {
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    }
  };

  useEffect(() => {
    setInterval(() => getTimeUntil(deadline), 1000);

    return () => getTimeUntil(deadline);
  }, [deadline]);

  return (
    <div className="grid  grid-cols-4 gap-1 text-center ">
      {/* Days */}
      <div className="Clock-days bg-primary text-white">{leading0(days)}</div>
      {/* Hours */}
      <div className="Clock-hours bg-primary text-white">{leading0(hours)}</div>
      {/* Minutes */}
      <div className="Clock-minutes bg-primary text-white">
        {leading0(minutes)}
      </div>
      {/* Seconds */}
      <div className="Clock-seconds bg-primary text-white">
        {leading0(seconds)}
      </div>
    </div>
  );
};

export default Clock;
