import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTask, editTask, deleteTask } from '../store/taskSlice';

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);

  const handleToggle = () => {
    dispatch(toggleTask(task.id));
  };

  const handleEdit = () => {
    if (name.trim() && description.trim()) {
      dispatch(editTask({ ...task, name, description }));
      setIsEditing(false); // Exit edit mode
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(task.id));
    }
  };

  return (
    <div className="task-item">
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={handleToggle}
        className="task-checkbox"
      />
      {isEditing ? (
        <div className="task-edit">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="task-edit-input"
            placeholder="Task Name"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="task-edit-input"
            placeholder="Task Description"
          />
          <button onClick={handleEdit} className="task-btn task-btn-save">Save</button>
          <button onClick={() => setIsEditing(false)} className="task-btn task-btn-cancel">Cancel</button>
        </div>
      ) : (
        <div className={`task-text ${task.isDone ? 'task-text-completed' : ''}`}>
          <strong>{task.name}</strong>: {task.description}
          <button onClick={() => setIsEditing(true)} className="task-btn task-btn-edit">Edit</button>
          <button onClick={handleDelete} className="task-btn task-btn-delete">Delete</button>
        </div>
      )}
    </div>
  );
};

export default Task;