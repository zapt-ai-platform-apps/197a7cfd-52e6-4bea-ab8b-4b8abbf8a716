import React, { useState, useEffect } from 'react';
import CalendarGrid from './CalendarGrid';
import EventForm from './EventForm';

export default function Calendar({ onBack }) {
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventText, setEventText] = useState("");

  useEffect(() => {
    const storedEvents = localStorage.getItem('calendarEvents');
    if (storedEvents) {
      try {
        setEvents(JSON.parse(storedEvents));
      } catch (error) {
        console.error('Error parsing stored events:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = today.toLocaleString('default', { month: 'long', year: 'numeric' });

  const daysArray = [];
  for (let day = 1; day <= daysInMonth; day++) {
    daysArray.push(new Date(year, month, day));
  }

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const firstDayIndex = new Date(year, month, 1).getDay();
  const blanks = Array(firstDayIndex).fill(null);

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
      <h2 className="text-xl font-bold mb-4">{monthName}</h2>
      <CalendarGrid 
        daysOfWeek={daysOfWeek}
        blanks={blanks}
        daysArray={daysArray}
        events={events}
        onDayClick={handleDayClick}
      />
      {selectedDate && (
        <EventForm
          selectedDate={selectedDate}
          eventText={eventText}
          onEventTextChange={setEventText}
          onAddEvent={handleAddEvent}
        />
      )}
    </div>
  );
}