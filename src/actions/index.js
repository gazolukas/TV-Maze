import fetch from 'cross-fetch';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const INVALIDATE_POSTS = 'INVALIDATE_POSTS';

export const REQUEST_POST = 'REQUEST_POST';
export const RECEIVE_POST = 'RECEIVE_POST';
export const INVALIDATE_POST = 'INVALIDATE_POST';

function requestPosts(search) {
  return {
    type: REQUEST_POSTS,
    search,
  };
}

function receivePosts(search, json) {
  return {
    type: RECEIVE_POSTS,
    search,
    posts: json,
  };
}

export function fetchPosts(search) {
  return (dispatch) => {
    dispatch(requestPosts(search));
    return fetch('//api.tvmaze.com/search/shows?q=' + search)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(search, json)));
  };
}

function requestPost(search) {
  return {
    type: REQUEST_POST,
    search,
  };
}

function receivePost(search, json) {
  return {
    type: RECEIVE_POST,
    search,
    post: json,
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    dispatch(requestPost(id));
    return fetch('//api.tvmaze.com/shows/' + id)
      .then(response => response.json())
      .then(json => dispatch(receivePost(id, json)));
  };
}
