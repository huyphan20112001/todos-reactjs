import { useEffect, useState } from 'react';
import { deleteJob, updateJob, addJob, setJob, setJobs } from '../../actions/actions';
import { useStore } from '../../store/store';

function ToDoList() {
  const [state, dispatch] = useStore();
  const { job, jobs, filter, filters } = state;
  const [toggleAll, setToggleAll] = useState(jobs.every(filters.Completed));
  console.log('filters.Completed', jobs.every(filters.Completed));

  const handleToggleAll = () => {
    console.log('!toggleAll: ', !toggleAll);
    setToggleAll(!toggleAll);
    console.log('toggleAll ', toggleAll);
  };

  useEffect(() => {
    const handleSetJobs = () => {
      dispatch(setJobs(toggleAll));
    };
    handleSetJobs();
  }, [toggleAll]);

  useEffect(() => {
    if (jobs.every(filters.Completed)) {
      setToggleAll(!toggleAll);
    }
  }, [jobs]);
  const handleSetJob = (e, id) => {
    const date = {
      id,
      completed: e.target.completed,
    };
  };

  const handleToggleClass = (id) => {
    const label = document.querySelector(`.item-${id}`);
    if (label) {
      const labelParent = label.closest('li');
      const isEdit = document.querySelector('.editing');
      if (isEdit) {
        isEdit.classList.remove('editing');
      }
      labelParent.classList.toggle('editing');
      const inputEdit = document.querySelector('.edit');
      if (inputEdit) {
        inputEdit.focus();
      }
    }
  };

  const handleDeleteJob = (id) => {
    dispatch(deleteJob(id));
  };
  const handleBlur = (id) => {
    const label = document.querySelector(`.item-${id}`);

    if (label) {
      const isEdit = document.querySelector('.editing');
      if (isEdit) {
        isEdit.classList.remove('editing');
      }
      const labelParent = label.closest('li');
      labelParent.classList.remove('editing');
    }
  };

  const handleCompleted = (e, id) => {
    const checkCompleted = document.querySelector(`.item-${id}`);
    if (checkCompleted) {
      const parentCheck = checkCompleted.closest('li');
      parentCheck.classList.toggle('completed');
      const data = {
        id,
        completed: e.target.checked,
      };
      dispatch(setJob(data));
    }
    return checkCompleted;
  };

  return (
    <section className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        onChange={() => handleToggleAll()}
        value={toggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {jobs &&
          jobs.filter(filters[filter]).map((job) => (
            <li
              onDoubleClick={() => handleToggleClass(job.id, job.completed)}
              key={job.id}
              className={job.completed ? 'completed' : ''}
            >
              <div className="view">
                <input
                  className={`toggle item-${job.id}`}
                  type="checkbox"
                  onClick={(e) => {
                    handleCompleted(e, job.id);
                  }}
                  checked={job.completed}
                />
                <label>{job.name}</label>
                <button
                  className="destroy"
                  onClick={() => {
                    handleDeleteJob(job.id);
                  }}
                ></button>
              </div>
              <input
                // value={job.name}
                className="edit"
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    const data = {
                      id: job.id,
                      value: e.target.value,
                    };
                    dispatch(updateJob(data));
                    handleBlur(job.id);
                  }
                }}
                onBlur={() => handleBlur(job.id)}
              />
            </li>
          ))}
      </ul>
    </section>
  );
}

export default ToDoList;
