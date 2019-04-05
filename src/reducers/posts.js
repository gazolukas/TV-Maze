import {
  INVALIDATE_POST,
  REQUEST_POST,
  RECEIVE_POST,
} from '../actions';

function post(
  state = {
    isFetching: false,
    didInvalidate: false,
  },
  action,
) {
  switch (action.type) {
    case INVALIDATE_POST:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case REQUEST_POST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case RECEIVE_POST:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        ...action.post,
      });
    default:
      return state;
  }
}

function posts(
  state = {
    isFetching: true,
  },
  action,
) {
  switch (action.type) {
    case INVALIDATE_POST:
    case RECEIVE_POST:
    case REQUEST_POST:
      return Object.assign({}, state, post(state[action.search], action));
    default:
      return state;
  }
}

export default posts;
