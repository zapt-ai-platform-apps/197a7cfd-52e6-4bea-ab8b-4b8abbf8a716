import React, { useState, useRef } from 'react';
import TaskList from './components/TaskList';
import TaskInput from './components/TaskInput';
import Timer from './components/Timer';
import Calendar from './components/Calendar';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [inputVisible, setInputVisible] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [swipeAnimations, setSwipeAnimations] = useState({});
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isCalendarActive, setIsCalendarActive] = useState(false);
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
      setSwipeAnimations((prev) => ({ ...prev, [id]: 'animate-swipe-right' }));
      console.log('Triggered swipe right animation for task:', id);
    } else if (deltaX < -50) {
      setSwipeAnimations((prev) => ({ ...prev, [id]: 'animate-swipe-left' }));
      console.log('Triggered swipe left animation for task:', id);
    }
  };

  const handleAnimationEnd = (id) => {
    if (swipeAnimations[id] === 'animate-swipe-right') {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed: true } : task
        )
      );
      console.log('Task marked complete after animation:', id);
    } else if (swipeAnimations[id] === 'animate-swipe-left') {
      setTasks((prev) => prev.filter((task) => task.id !== id));
      console.log('Task deleted after animation:', id);
    }
    setSwipeAnimations((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const toggleDarkMode = () => {
    setIsDark((prevMode) => !prevMode);
    console.log('Dark mode toggled:', !isDark);
  };

  const containerClass = isDark
    ? 'min-h-screen bg-black text-white'
    : 'min-h-screen bg-white text-black';

  const currentDate = new Date().toLocaleDateString();

  if (isTimerActive) {
    return (
      <div className={`${containerClass} flex flex-col h-full`}>
        <Timer onBack={() => setIsTimerActive(false)} />
        <footer className="p-4 text-center">
          <a
            href="https://www.zapt.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer underline"
          >
            Made on ZAPT
          </a>
        </footer>
      </div>
    );
  }

  if (isCalendarActive) {
    return (
      <div className={`${containerClass} flex flex-col h-full`}>
        <Calendar onBack={() => setIsCalendarActive(false)} />
        <footer className="p-4 text-center">
          <a
            href="https://www.zapt.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer underline"
          >
            Made on ZAPT
          </a>
        </footer>
      </div>
    );
  }

  return (
    <div className={`${containerClass} flex flex-col h-full`}>
      <header className="p-4 flex justify-between">
        <button onClick={toggleDarkMode} className="cursor-pointer p-2 border rounded">
          {isDark ? 'light mode' : 'dark mode'}
        </button>
        <div className="text-sm">{currentDate}</div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-center text-2xl font-bold mb-4">SnapTasks</h1>
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setIsCalendarActive(true)}
            className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full shadow-lg"
          >
            Calendar
          </button>
          <button
            onClick={() => setInputVisible(true)}
            className="cursor-pointer bg-lime-500 hover:bg-lime-600 text-white font-bold py-4 px-8 rounded-full shadow-lg"
          >
            Add Task
          </button>
          <button
            onClick={() => setIsTimerActive(true)}
            className="cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-full shadow-lg"
          >
            Set Timer
          </button>
        </div>
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
            swipeAnimations={swipeAnimations}
            handleAnimationEnd={handleAnimationEnd}
          />
        </div>
      </main>
      <footer className="p-4 text-center">
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer underline"
        >
          Made on ZAPT
        </a>
      </footer>
    </div>
  );
}