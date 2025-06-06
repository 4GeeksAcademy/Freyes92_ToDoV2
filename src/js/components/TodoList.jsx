import React, { useState, useEffect } from "react";
import "../../styles/index.css";

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const username = "francisco_todo";

    useEffect(() => {
        fetch(`https://playground.4geeks.com/todo/users/${username}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
        .then(res => {
            if (!res.ok) throw new Error("User may already exist");
            return res.json();
        })
        .then(data => console.log("User created:", data))
        .catch(err => console.log("Note:", err.message));
    }, []);

    useEffect(() => {
        fetch(`https://playground.4geeks.com/todo/users/${username}`)
            .then(res => res.json())
            .then(data => setTasks(data.todos))
            .catch(err => console.error("Error loading tasks:", err));
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            const newTask = { label: inputValue.trim(), done: false };

            fetch(`https://playground.4geeks.com/todo/todos/${username}`, {
                method: "POST",
                body: JSON.stringify(newTask),
                headers: { "Content-Type": "application/json" }
            })
            .then(() => fetch(`https://playground.4geeks.com/todo/users/${username}`))
            .then(res => res.json())
            .then(data => setTasks(data.todos))
            .catch(err => console.error("Error adding task:", err));

            setInputValue("");
        }
    };

    const handleDelete = (taskId) => {
        fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
            method: "DELETE"
        })
        .then(() => fetch(`https://playground.4geeks.com/todo/users/${username}`))
        .then(res => res.json())
        .then(data => setTasks(data.todos))
        .catch(err => console.error("Error deleting task:", err));
    };

    const handleClearAll = () => {
        fetch(`https://playground.4geeks.com/todo/users/${username}`, {
            method: "DELETE"
        })
        .then(() => setTasks([]))
        .catch(err => console.error("Error clearing tasks:", err));
    };

    return (
        <div className="todo-container">
            <h1>Todo List</h1>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="What needs to be done"
                className="todo-input"
            />
            <ul className="todo-list">
                {tasks.length === 0 ? (
                    <li className="no-tasks">No tasks, add a task</li>
                ) : (
                    tasks.map((task) => (
                        <li key={task.id} className="todo-item">
                            {task.label}
                            <button
                                className="delete-btn"
                                onClick={() => handleDelete(task.id)}
                            >
                                ❌
                            </button>
                        </li>
                    ))
                )}
            </ul>
            <p>{tasks.length} {tasks.length === 1 ? "item" : "items"} left</p>
            <button onClick={handleClearAll} className="btn btn-danger m-3">
                Clear All Tasks
            </button>
        </div>
    );
};

export default TodoList;