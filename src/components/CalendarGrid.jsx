import React from 'react';

export default function CalendarGrid({ daysOfWeek, blanks, daysArray, events, onDayClick }) {
  return (
    <>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="text-center font-bold">
            {day.slice(0, 3)}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {blanks.map((_, idx) => (
          <div key={`blank-${idx}`}></div>
        ))}
        {daysArray.map((date, idx) => (
          <div
            key={idx}
            onClick={() => onDayClick(date)}
            className="cursor-pointer border p-2 text-center hover:bg-gray-200"
          >
            <div className="font-bold">{date.getDate()}</div>
            {events[date.toDateString()] && (
              <div className="text-xs text-blue-500">
                {events[date.toDateString()]}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}