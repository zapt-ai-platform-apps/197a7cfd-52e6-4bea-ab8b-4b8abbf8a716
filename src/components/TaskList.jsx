import React from 'react';

export default function TaskList({ tasks, handleTouchStart, handleTouchEnd, swipeAnimations, handleAnimationEnd }) {
  return (
    <>
      {tasks.map((task) => (
        <div
          key={task.id}
          onTouchStart={(e) => handleTouchStart(e, task.id)}
          onTouchEnd={(e) => handleTouchEnd(e, task.id)}
          onTransitionEnd={() => handleAnimationEnd(task.id)}
          className={`cursor-pointer p-4 my-2 border rounded ${
            task.completed ? 'line-through bg-gray-300' : 'bg-gray-100'
          } ${swipeAnimations && swipeAnimations[task.id] ? swipeAnimations[task.id] : ''} text-black`}
        >
          {task.text}
        </div>
      ))}
    </>
  );
}