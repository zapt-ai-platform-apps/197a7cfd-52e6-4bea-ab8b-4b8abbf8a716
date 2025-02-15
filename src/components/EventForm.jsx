import React from 'react';

export default function EventForm({ selectedDate, eventText, onEventTextChange, onAddEvent }) {
  return (
    <div className="mt-4">
      <h3 className="font-bold">
        Add event for {selectedDate.toDateString()}
      </h3>
      <input
        type="text"
        value={eventText}
        onChange={(e) => onEventTextChange(e.target.value)}
        className="w-full p-2 border rounded mb-2 text-black box-border"
        placeholder="Event details"
      />
      <button
        onClick={onAddEvent}
        className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Add Event
      </button>
    </div>
  );
}