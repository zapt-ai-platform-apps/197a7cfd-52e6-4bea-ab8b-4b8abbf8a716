import React from 'react';

export default function TaskList({ tasks, handleTouchStart, handleTouchEnd, swipeAnimations, handleAnimationEnd }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`task-item ${swipeAnimations[task.id] || ''} ${task.completed ? 'completed' : ''}`}
          onTouchStart={(e) => handleTouchStart(e, task.id)}
          onTouchEnd={(e) => handleTouchEnd(e, task.id)}
          onAnimationEnd={() => handleAnimationEnd(task.id)}
        >
          {task.text}
        </li>
      ))}
    </ul>
  );
}