import React, { useState } from 'react';

export default function Calendar({ onBack }) {
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventText, setEventText] = useState("");

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysArray = [];
  for (let day = 1; day <= daysInMonth; day++) {
    daysArray.push(new Date(year, month, day));
  }

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setEventText("");
    console.log('Selected date:', date.toDateString());
  };

  const handleAddEvent = () => {
    if (selectedDate && eventText.trim() !== "") {
      const dateKey = selectedDate.toDateString();
      setEvents({
        ...events,
        [dateKey]: eventText,
      });
      console.log('Event added for', dateKey, ':', eventText);
      setSelectedDate(null);
      setEventText("");
    }
  };

  return (
    <div className="p-4 h-full">
      <button
        onClick={onBack}
        className="cursor-pointer bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mb-4"
      >
        Back
      </button>
      <h2 className="text-xl font-bold mb-4">Calendar</h2>
      <div className="grid grid-cols-7 gap-2">
        {daysArray.map((date, idx) => (
          <div
            key={idx}
            onClick={() => handleDayClick(date)}
            className="cursor-pointer border p-2 text-center hover:bg-gray-200"
          >
            {date.getDate()}
            {events[date.toDateString()] && (
              <div className="text-xs text-blue-500">
                {events[date.toDateString()]}
              </div>
            )}
          </div>
        ))}
      </div>
      {selectedDate && (
        <div className="mt-4">
          <h3 className="font-bold">
            Add event for {selectedDate.toDateString()}
          </h3>
          <input
            type="text"
            value={eventText}
            onChange={(e) => setEventText(e.target.value)}
            className="w-full p-2 border rounded mb-2 text-black box-border"
            placeholder="Event details"
          />
          <button
            onClick={handleAddEvent}
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Add Event
          </button>
        </div>
      )}
    </div>
  );
}