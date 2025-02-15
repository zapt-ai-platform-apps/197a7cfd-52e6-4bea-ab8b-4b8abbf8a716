import React from 'react';

export default function TaskList({ tasks, handleTouchStart, handleTouchEnd }) {
  return (
    <>
      {tasks.map((task) => (
        <div
          key={task.id}
          onTouchStart={(e) => handleTouchStart(e, task.id)}
          onTouchEnd={(e) => handleTouchEnd(e, task.id)}
          className={`cursor-pointer p-4 my-2 border rounded ${
            task.completed ? 'line-through bg-gray-300' : 'bg-gray-100'
          }`}
        >
          {task.text}
        </div>
      ))}
    </>
  );
}