import { deleteJob, updateJob, addJob, setJob } from '../../actions/actions';
import { useStore } from '../../store/store';

function ToDoList() {
  const [state, dispatch] = useStore();
  const { job, jobs } = state;

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

  const handleToggleAll = () => {};

  return (
    <section className="main">
      <input id="toggle-all" className="toggle-all" type="checkbox" onChange={() => handleToggleAll} />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {jobs &&
          jobs.map((job) => (
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
