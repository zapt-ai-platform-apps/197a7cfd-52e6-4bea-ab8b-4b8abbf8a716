import React from 'react';

export default function TaskInput({ newTaskText, onNewTaskTextChange, handleAddTask }) {
  return (
    <form onSubmit={handleAddTask} className="w-full max-w-md mb-4">
      <input
        type="text"
        value={newTaskText}
        onChange={onNewTaskTextChange}
        className="w-full p-2 border rounded mb-2 text-black"
        placeholder="Enter new task"
      />
      <button
        type="submit"
        className="cursor-pointer w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}