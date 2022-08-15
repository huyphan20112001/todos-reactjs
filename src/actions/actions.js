import {
  SET_JOB,
  ADD_JOB,
  DELETE_JOB,
  UPDATE_JOB,
  CLEAR_COMPLETED,
  SET_FILTER,
  SET_JOBS,
} from '../constants/constants';

export const setJob = (payload) => {
  return {
    type: SET_JOB,
    payload,
  };
};
export const setJobs = (payload) => {
  return {
    type: SET_JOBS,
    payload,
  };
};

export const addJob = (payload) => {
  return {
    type: ADD_JOB,
    payload,
  };
};

export const deleteJob = (payload) => {
  return {
    type: DELETE_JOB,
    payload,
  };
};

export const updateJob = (payload) => {
  return {
    type: UPDATE_JOB,
    payload,
  };
};

export const clearCompleted = (payload) => {
  return {
    type: CLEAR_COMPLETED,
    payload,
  };
};

export const setFilter = (payload) => {
  return {
    type: SET_FILTER,
    payload,
  };
};
