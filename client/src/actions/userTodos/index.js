import {
  GET_USER_TODOS,
  GET_USER_TODOS_ERROR,
  GET_USER_TODO_BY_ID,
  GET_USER_TODO_BY_ID_ERROR,
} from '../types';

import axios from 'axios';


export const getUserTodos = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/user/todos', { 'headers': { 'authorization': localStorage.getItem('token')}});
    dispatch({ type: GET_USER_TODOS, payload: data });
  } catch (e) {
    dispatch({ type: GET_USER_TODOS_ERROR, error: 'Something went wrong with the request. Try refreshing the page' });
  }
}