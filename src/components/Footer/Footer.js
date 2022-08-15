import React, { useState } from 'react';
import { clearCompleted, setFilter } from '../../actions/actions';
import { useStore } from '../../store/store';

function Footer() {
  const [state, dispatch] = useStore();
  const { job, jobs, filters, filter } = state;

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{Object.keys(jobs.filter(filters[filter])).length}</strong> item left
      </span>
      <ul className="filters">
        {Object.keys(filters).map((type) => (
          <li key={type}>
            <a
              className="selected"
              href={`#/${type}`}
              onClick={() => {
                dispatch(setFilter(type));
              }}
            >
              {type}
            </a>
          </li>
        ))}
      </ul>
      <button
        className="clear-completed"
        onClick={() => {
          dispatch(clearCompleted(jobs));
          console.log(123);
        }}
      >
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
