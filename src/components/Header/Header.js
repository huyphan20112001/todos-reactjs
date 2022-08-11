import { useRef, useState } from 'react';
import React from 'react';
import ToDoList from '../ToDoList/ToDoList';
import { addJob } from '../../actions/actions';
import { useStore } from '../../store/store';

function Header() {
  const [state, dispatch] = useStore();

  const { job, jobs } = state;

  const [inputJob, setInputJob] = useState('');

  const inputRef = useRef();

  const handleSubmit = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      dispatch(addJob(inputJob));
      setInputJob('');
      inputRef.current.focus();
    }
  };

  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <input
          ref={inputRef}
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={inputJob}
          onChange={(e) => {
            setInputJob(e.target.value);
          }}
          onKeyUp={handleSubmit}
        />
      </header>
      <ToDoList />
    </>
  );
}

export default Header;
