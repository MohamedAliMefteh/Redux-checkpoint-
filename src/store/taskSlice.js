import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// Function to load tasks from local storage
const loadTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

// Function to save tasks to local storage
const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: loadTasksFromLocalStorage(),
    filter: 'all', // 'all', 'done', 'not_done'
  },
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: uuidv4(),
        name: action.payload.name,
        description: action.payload.description,
        isDone: false,
      };
      state.tasks.push(newTask);
      saveTasksToLocalStorage(state.tasks); // Save to local storage
    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTasksToLocalStorage(state.tasks); // Save to local storage
      }
    },
    toggleTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload);
      if (index !== -1) {
        state.tasks[index].isDone = !state.tasks[index].isDone;
        saveTasksToLocalStorage(state.tasks); // Save to local storage
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasksToLocalStorage(state.tasks); // Save to local storage
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

// Exporting actions
export const { 
  addTask, 
  editTask, 
  toggleTask, 
  deleteTask, 
  setFilter 
} = taskSlice.actions;

export default taskSlice.reducer;