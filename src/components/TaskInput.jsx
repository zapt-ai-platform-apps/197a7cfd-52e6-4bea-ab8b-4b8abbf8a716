import React from 'react';

export default function TaskInput({ newTaskText, onNewTaskTextChange, handleAddTask }) {
  return (
    <form onSubmit={handleAddTask} className="mb-4">
      <input
        type="text"
        value={newTaskText}
        onChange={onNewTaskTextChange}
        onKeyDown={(e) => e.key === 'Enter' && handleAddTask(e)}
        className="box-border bg-white text-black p-2 rounded"
        autoFocus
      />
    </form>
  );
}