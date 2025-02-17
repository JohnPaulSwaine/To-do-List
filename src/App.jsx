import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Adds a new task to the To-Do list
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, status: 'To-Do' }]);
      setNewTask('');
    }
  };

  // Moves a task to the next status
  const moveTask = (taskId) => {
    setTasks(tasks.map((task) => 
      task.id === taskId ? { ...task, status: nextStatus(task.status) } : task
    ));
  };

  // Determines the next status of a task, preventing cycling from Completed to To-Do
  const nextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'To-Do': return 'Undertaking';
      case 'Undertaking': return 'Completed';
      case 'Completed': return 'Completed'; // Stay in Completed state
      default: return 'To-Do';
    }
  };

  // Deletes a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Renders tasks by status
  const renderTasksByStatus = (status) => {
    return tasks
      .filter(task => task.status === status)
      .map((task) => (
        <li key={task.id}>
          <span className="task-text">{task.text}</span>
          {status !== 'Completed' && (
            <button onClick={() => moveTask(task.id)}>Move to Next</button>
          )}
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ));
  };

  // Handles the Enter key event to add tasks
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="App">
      <img src="./assets/background2.jpg" />
      <h1>To-Do List</h1>
      <div className="task-input">
        <input 
          type="text" 
          placeholder="Add a new task" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={addTask}>Add/Enter</button>
      </div>
      <div className="task-section">
        <h2>To-Do</h2>
        <ul>{renderTasksByStatus('To-Do')}</ul>
      </div>
      <div className="task-section">
        <h2>Undertaking</h2>
        <ul>{renderTasksByStatus('Undertaking')}</ul>
      </div>
      <div className="task-section">
        <h2>Completed</h2>
        <ul>{renderTasksByStatus('Completed')}</ul>
      </div>
    </div>
  );
}

export default App;
