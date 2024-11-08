import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/taskSlice';

const AddTask = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleAddTask = (e) => {
    e.preventDefault();
    if (name.trim() && description.trim()) {
      dispatch(addTask({ name, description }));
      setName('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleAddTask} className="add-task-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Task Name"
        required
        className="add-task-input"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        required
        className="add-task-input"
      />
      <button type="submit" className="add-task-btn">
        Add Task
      </button>
    </form>
  );
};

export default AddTask;