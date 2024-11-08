import React from 'react';
import { useSelector } from 'react-redux';
import Task from './Task';
import AddTask from './addTask';

const ListTask = () => {
  const { tasks, filter } = useSelector((state) => state.tasks);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'done') return task.isDone;
    if (filter === 'not_done') return !task.isDone;
    return true; // 'all'
  });

  return (
    <div className="task-list">
      {filteredTasks.length === 0 ? (
        <p className="no-tasks">No tasks available.</p>
      ) : (
        filteredTasks.map((task) => <Task key={task.id} task={task} />)
      )}
      
    </div>
  );
};

export default ListTask;