import React from 'react';

export default function CalendarGrid({ daysOfWeek, blanks, daysArray, events, onDayClick }) {
  const cells = [...blanks, ...daysArray];
  const rows = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        {daysOfWeek.map((day, index) => (
          <div key={index} style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>
            {day}
          </div>
        ))}
      </div>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((cell, cellIndex) => (
            <div key={cellIndex} style={{ flex: 1, border: '1px solid #ccc', padding: '10px', minHeight: '60px' }}>
              {cell ? (
                <button onClick={() => onDayClick(cell)} style={{ width: '100%', background: 'none', border: 'none' }}>
                  <div>{cell.getDate()}</div>
                  {events[cell.toDateString()] && (
                    <div style={{ fontSize: '0.8em', color: 'blue' }}>
                      {events[cell.toDateString()]}
                    </div>
                  )}
                </button>
              ) : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}