import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';


const loadTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};


const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: loadTasksFromLocalStorage(),
    filter: 'all', 
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
      saveTasksToLocalStorage(state.tasks); 
    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTasksToLocalStorage(state.tasks); 
      }
    },
    toggleTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload);
      if (index !== -1) {
        state.tasks[index].isDone = !state.tasks[index].isDone;
        saveTasksToLocalStorage(state.tasks); 
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasksToLocalStorage(state.tasks); 
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});


export const { 
  addTask, 
  editTask, 
  toggleTask, 
  deleteTask, 
  setFilter 
} = taskSlice.actions;

export default taskSlice.reducer;