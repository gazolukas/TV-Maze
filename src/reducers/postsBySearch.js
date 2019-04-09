import { INVALIDATE_POSTS, REQUEST_POSTS, RECEIVE_POSTS } from '../actions';

function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
  },
  action,
) {
  switch (action.type) {
    case INVALIDATE_POSTS:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        shows: [...action.posts],
      });
    default:
      return state;
  }
}

function postsBySearch(
  state = {
    isFetching: true,
    shows: [],
  },
  action,
) {
  switch (action.type) {
    case INVALIDATE_POSTS:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, posts(state[action.search], action));
    default:
      return state;
  }
}

export default postsBySearch;
