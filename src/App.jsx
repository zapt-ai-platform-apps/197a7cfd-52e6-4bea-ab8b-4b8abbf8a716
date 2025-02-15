import React, { useState, useRef } from 'react';
import TaskList from './components/TaskList';
import TaskInput from './components/TaskInput';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [inputVisible, setInputVisible] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const touchData = useRef({ taskId: null, startX: 0 });

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskText.trim() === '') return;
    const newTask = {
      id: Date.now(),
      text: newTaskText.trim(),
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    console.log('Task added:', newTask);
    setNewTaskText('');
    setInputVisible(false);
  };

  const handleTouchStart = (e, id) => {
    touchData.current = { taskId: id, startX: e.touches[0].clientX };
  };

  const handleTouchEnd = (e, id) => {
    if (touchData.current.taskId !== id) return;
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - touchData.current.startX;
    console.log(`Swipe detected for task ${id}: deltaX =`, deltaX);
    if (deltaX > 50) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: true } : task
        )
      );
      console.log('Task marked complete:', id);
    } else if (deltaX < -50) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      console.log('Task deleted:', id);
    }
  };

  const toggleDarkMode = () => {
    setIsDark((prevMode) => !prevMode);
    console.log('Dark mode toggled:', !isDark);
  };

  const containerClass = isDark
    ? 'min-h-screen bg-black text-white'
    : 'min-h-screen bg-white text-black';

  return (
    <div className={`${containerClass} flex flex-col h-full`}>
      <div className="p-4 flex justify-between">
        <button
          onClick={toggleDarkMode}
          className="cursor-pointer p-2 border rounded"
        >
          {isDark ? 'light mode' : 'dark mode'}
        </button>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center">
        <button
          onClick={() => setInputVisible(true)}
          className="cursor-pointer bg-lime-500 hover:bg-lime-600 text-white font-bold py-4 px-8 rounded-full shadow-lg mb-4"
        >
          Add Task
        </button>
        {inputVisible && (
          <TaskInput
            newTaskText={newTaskText}
            onNewTaskTextChange={(e) => setNewTaskText(e.target.value)}
            handleAddTask={handleAddTask}
          />
        )}
        <div className="w-full max-w-md overflow-y-auto" style={{ maxHeight: '50vh' }}>
          <TaskList
            tasks={tasks}
            handleTouchStart={handleTouchStart}
            handleTouchEnd={handleTouchEnd}
          />
        </div>
      </div>
      <div className="p-4 text-center">
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer underline"
        >
          Made on ZAPT
        </a>
      </div>
    </div>
  );
}