import { combineReducers } from 'redux';
import posts from './posts';
import postsBySearch from './postsBySearch';

export default combineReducers({
  posts,
  postsBySearch,
});
