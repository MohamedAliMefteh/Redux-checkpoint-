import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import AddTask from './components/addTask';
import ListTask from './components/ListTask';
import Filter from './components/Filter';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="app-container">
        <h1 className="app-title">Todo List</h1>
        <Filter />
        <AddTask />
        <ListTask />
      </div>
    </Provider>
  );
}

export default App;