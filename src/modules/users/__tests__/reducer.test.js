import reducer from '../reducer';
import types from '../types';

describe('users module reducer', () => {
  test('sets fetching to true on fetch attempt', () => {
    const action = { type: types.FETCH_USERS_ATTEMPT };
    expect(reducer(undefined, action).fetching).toBe(true);
  });

  test('sets fetching to false on fetch success', () => {
    const action = { type: types.FETCH_USERS_SUCCESS };
    expect(reducer(undefined, action).fetching).toBe(false);
  });

  test('sets fetching to false on fetch failure', () => {
    const action = { type: types.FETCH_USERS_FAILURE };
    expect(reducer(undefined, action).fetching).toBe(false);
  });

  test('sets list to payload on fetch success', () => {
    const users = [];
    const action = { type: types.FETCH_USERS_SUCCESS, payload: users };
    expect(reducer(undefined, action).list).toBe(users);
  });

  test('sets error to payload on fetch failure', () => {
    const err = new Error('error');
    const action = { type: types.FETCH_USERS_FAILURE, payload: err };
    expect(reducer(undefined, action).error).toBe(err);
  });

  test('sets saving to true on post attempt', () => {
    const action = { type: types.POST_USER_ATTEMPT };
    expect(reducer(undefined, action).saving).toBe(true);
  });

  test('sets saving to false on post success', () => {
    const action = { type: types.POST_USER_SUCCESS };
    expect(reducer(undefined, action).saving).toBe(false);
  });

  test('sets saving to false on post failure', () => {
    const action = { type: types.POST_USER_FAILURE };
    expect(reducer(undefined, action).saving).toBe(false);
  });

  test('sets payload to the end of the list on post success', () => {
    const user = {};
    const action = { type: types.POST_USER_SUCCESS, payload: user };
    const state = {
      saving: true,
      list: [],
      error: null,
    };
    const expectedState = {
      saving: false,
      list: [user],
      error: null,
    };
    expect(reducer(state, action)).toEqual(expectedState);
  });

  test('sets error to payload on post failure', () => {
    const err = new Error('error');
    const action = { type: types.POST_USER_FAILURE, payload: err };
    expect(reducer(undefined, action).error).toBe(err);
  });

  test('sets saving to true on alter attempt', () => {
    const action = { type: types.ALTER_USER_ATTEMPT };
    expect(reducer(undefined, action).saving).toBe(true);
  });

  test('sets saving to false on alter success', () => {
    const user = { id: '1' };
    const action = { type: types.ALTER_USER_SUCCESS, payload: user };
    expect(reducer(undefined, action).saving).toBe(false);
  });

  test('sets saving to false on alter failure', () => {
    const action = { type: types.ALTER_USER_FAILURE };
    expect(reducer(undefined, action).saving).toBe(false);
  });

  test('alters user under given id in list', () => {
    const list = [{ id: '1', name: 'John' }, { id: '2', name: 'Summer' }];
    const user = { id: '1', name: 'John Doe' };

    const action = {
      type: types.ALTER_USER_SUCCESS,
      payload: user,
    };

    const state = {
      saving: true,
      list,
    };

    const expectedState = {
      saving: false,
      list: [user, list[1]],
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });
});
