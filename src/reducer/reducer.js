import { SET_JOBS, SET_JOB, ADD_JOB, DELETE_JOB, UPDATE_JOB, CHECK_JOB, CLEAR_COMPLETED } from '../constants/constants';

export const initState = {
  job: '',
  jobs: [
    {
      id: 1,
      name: 'Go to bed',
      completed: false,
    },
    {
      id: 2,
      name: 'Kill him',
      completed: true,
    },
  ],
  filters: {
    All: () => true,
    Active: (todo) => !todo.completed,
    Completed: (todo) => todo.completed,
  },
};

const reducer = (state, action) => {
  console.log('Action: ', action);
  console.log('Prev State: ', state);

  let newState;

  switch (action.type) {
    case SET_JOBS:
      const newJobs = state.jobs;
      newJobs.map((job) => {
        return (job.completed = action.payload);
      });
      newState = {
        ...state,
        job: action.payload,
        jobs: newJobs,
      };
      break;
    case SET_JOB: {
      const newJobs = state.jobs;
      newJobs.map((job) => {
        if (job.id === action.payload.id) {
          return (job.completed = action.payload.completed);
        }
        return job;
      });
      newState = {
        ...state,
        jobs: newJobs,
      };
      break;
    }
    case ADD_JOB: {
      const newId = Math.max(...state.jobs.map((job) => job.id));
      const newJob = {
        id: newId + 1,
        name: action.payload,
        completed: false,
      };
      const newJobs = state.jobs;
      newJobs.push(newJob);
      newState = {
        ...state,
        jobs: newJobs,
      };
      break;
    }
    case DELETE_JOB: {
      newState = {
        ...state,
        jobs: state.jobs.filter((job) => {
          return job.id !== action.payload;
        }),
      };
      break;
    }
    case UPDATE_JOB:
      {
        const newJobs = state.jobs;
        newJobs.map((job) => {
          if (job.id === action.payload.id) {
            return (job.name = action.payload.value);
          }
          return job;
        });

        newState = {
          ...state,
          jobs: newJobs,
        };
      }
      break;
    case CLEAR_COMPLETED: {
      newState = {
        ...state,
        jobs: state.jobs.filter((job) => {
          return job.completed === false;
        }),
      };
      break;
    }
    default:
      throw new Error('Invalid action');
  }

  console.log('New State: ', newState);

  return newState;
};

export default reducer;
