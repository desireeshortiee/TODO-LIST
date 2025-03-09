import React, { useState } from "react";
import "./App.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("All");
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const deleteCompletedTasks = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, text: editText } : task)));
    setEditingTask(null);
    setEditText("");
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "All") return true;
    return filter === "Done" ? task.completed : !task.completed;
  });

  return (
    <div className={`container ${darkMode ? "dark" : "light"}`}>
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <h2>TodoInput</h2>
      <input
        type="text"
        placeholder="New Todo"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="input-field"
      />
      <button onClick={addTask} className="add-button">Add new task</button>

      <h2>TodoList</h2>
      <div>
        <button onClick={() => setFilter("All")} className="filter-button">All</button>
        <button onClick={() => setFilter("Done")} className="filter-button">Done</button>
        <button onClick={() => setFilter("Pending")} className="filter-button">Pending</button>
      </div>

      <ul className="task-list">
        {filteredTasks.map(task => (
          <li key={task.id} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
              className="checkbox"
            />
            {editingTask === task.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="edit-input"
              />
            ) : (
              <span className={task.completed ? "completed-task" : "task-text"}>{task.text}</span>
            )}
            {editingTask === task.id ? (
              <button onClick={() => saveEdit(task.id)} className="save-button">💾</button>
            ) : (
              <button onClick={() => startEditing(task)} className="edit-button">✏️</button>
            )}
            <button onClick={() => deleteTask(task.id)} className="delete-button">🗑️</button>
          </li>
        ))}
      </ul>

      <button onClick={deleteCompletedTasks} className="delete-done-button">Delete done tasks</button>
      <button onClick={deleteAllTasks} className="delete-all-button">Delete all tasks</button>
    </div>
  );
};

export default TodoList;
