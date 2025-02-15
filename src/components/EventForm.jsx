import React from 'react';

export default function EventForm({ selectedDate, eventText, onEventTextChange, onAddEvent }) {
  return (
    <div className="mt-4 p-4 border">
      <h3 className="text-lg font-semibold mb-2">Add Event for {selectedDate.toDateString()}</h3>
      <input
        type="text"
        value={eventText}
        onChange={(e) => onEventTextChange(e.target.value)}
        className="border p-2 mr-2"
      />
      <button
        onClick={onAddEvent}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Event
      </button>
    </div>
  );
}