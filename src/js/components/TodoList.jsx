import React, { useState } from "react";
import "../../styles/index.css";

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            setTasks([...tasks, inputValue.trim()]);
            setInputValue("");
        }
    };

    const handleDelete = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
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
                    tasks.map((task, index) => (
                        <li
                            key={index}
                            className="todo-item"
                        >
                            {task}
                            <button
                                className="delete-btn"
                                onClick={() => handleDelete(index)}
                            >
                                ❌
                            </button>
                        </li>
                    ))
                )}
            </ul>
            <p>{tasks.length} {tasks.length === 1 ? "item" : "items"} left</p>
        </div>
    );
};

export default TodoList;