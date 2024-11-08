import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../store/taskSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.tasks.filter);

  const filterButtons = [
    { label: 'All', value: 'all' },
    { label: 'Done', value: 'done' },
    { label: 'Not Done', value: 'not_done' }
  ];

  return (
    <div className="filter-container">
      {filterButtons.map((btn) => (
        <button 
          key={btn.value}
          className={`filter-btn ${currentFilter === btn.value ? 'filter-btn-active' : ''}`}
          onClick={() => dispatch(setFilter(btn.value))}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
};

export default Filter;