import React, { useState, useEffect } from 'react';

const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    console.log('Loaded tasks from localStorage:', savedTasks);
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    console.log('Saving tasks to localStorage:', tasks);
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    const now = new Date();
    const selectedDate = new Date(dateTime);

    if (task && dateTime) {
      if (selectedDate < now) {
        setError('Please select a future date and time!!!.');
        return;
      }

      const newTask = { text: task, dateTime: selectedDate, notified: false };
      if (isEditing) {
        const updatedTasks = tasks.map((t, index) =>
          index === currentTaskIndex ? newTask : t
        );
        setTasks(updatedTasks);
        setIsEditing(false);
        setCurrentTaskIndex(null);
      } else {
        setTasks([...tasks, newTask]);
      }
      setTask('');
      setDateTime('');
      setError('');
    }
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    console.log('Tasks after deletion:', newTasks);
  };

  const editTask = (index) => {
    const taskToEdit = tasks[index];
    setTask(taskToEdit.text);
    setDateTime(new Date(taskToEdit.dateTime).toISOString().slice(0, 16));
    setIsEditing(true);
    setCurrentTaskIndex(index);
  };

  const notify = (task) => {
    if (Notification.permission === 'granted') {
      new Notification('Reminder', { body: task.text });
    }
  };

  const requestNotificationPermission = () => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          alert('Notifications have been successfully enabled!');
        } else {
          alert('Notifications are not enabled. Please enable them in your browser settings.');
        }
      });
    } else {
      alert('Notifications are already enabled.');
    }
  };

  const scheduleNotifications = () => {
    tasks.forEach((task, index) => {
      if (!task.notified) {
        const now = new Date();
        const timeUntilNotification = new Date(task.dateTime) - now;
        if (timeUntilNotification > 0) {
          setTimeout(() => {
            notify(task);
            const updatedTasks = [...tasks];
            updatedTasks[index].notified = true;
            setTasks(updatedTasks);
          }, timeUntilNotification);
        }
      }
    });
  };

  useEffect(() => {
    scheduleNotifications();
  }, [tasks]);

  return (
    <main>
    <div className="todo-container">
      <h1>To-Do List</h1>
      {error && <div className="error">{error}</div>}
      <div className='grid'>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task..."
      />
      <input className='mobile-phone'
        type="datetime-local"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
      />
       <button className='add-button' onClick={addTask} title='Click me to add task'>{isEditing ? 'Update Task' : 'Add Task'}</button>
      <input className='desktop'
        type="datetime-local"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
      />
     
     <button
        onClick={requestNotificationPermission}
        className="notification-button"
        title="Click me to enable notification"
      >
        Enable Notifications
        <i className="fas fa-bell"></i> 
      </button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.text} - {new Date(task.dateTime).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            <div className='li-button'>
            <button className='edit-button' onClick={() => editTask(index)}>Edit</button>
            <button className='delete-button' onClick={() => removeTask(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </main>
  );
};

export default ToDo;
