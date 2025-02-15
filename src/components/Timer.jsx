import React, { useState, useEffect } from 'react';

export default function Timer({ onBack }) {
  const presets = [
    { label: '1 Minute', seconds: 60 },
    { label: '5 Minutes', seconds: 300 },
    { label: '10 Minutes', seconds: 600 },
    { label: '30 Minutes', seconds: 1800 },
    { label: '1 Hour', seconds: 3600 },
  ];

  const [selectedTime, setSelectedTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    let timerInterval;
    if (remainingTime > 0) {
      timerInterval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    if (remainingTime === 0 && selectedTime !== null) {
      clearInterval(timerInterval);
      alert("Time's up!");
    }
    return () => clearInterval(timerInterval);
  }, [remainingTime, selectedTime]);

  const handlePresetClick = (seconds) => {
    setSelectedTime(seconds);
    setRemainingTime(seconds);
    console.log('Timer started for', seconds, 'seconds');
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 h-full">
      <button
        onClick={onBack}
        className="cursor-pointer bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mb-4"
      >
        Back
      </button>
      {selectedTime === null ? (
        <div className="flex flex-wrap gap-4">
          {presets.map((preset) => (
            <button
              key={preset.seconds}
              onClick={() => handlePresetClick(preset.seconds)}
              className="cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
            >
              {preset.label}
            </button>
          ))}
        </div>
      ) : (
        <div className="text-4xl font-bold">
          {remainingTime !== null ? formatTime(remainingTime) : '00:00'}
        </div>
      )}
    </div>
  );
}