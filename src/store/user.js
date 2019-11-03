import { get } from 'lodash';
import { serializeError } from 'serialize-error';

import User from '../api/user';

import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAIL,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
} from '../constant/muationPypes';

const userState = {
  user: {
    requesting: false,
    status: '',
    result: null,
    console: null,
  },
  status: '',
  token: localStorage.getItem('token') || '',
};

const actions = {
  async LogIn({ commit, dispatch }, { email, password }) {
    commit(AUTH_REQUEST);
    try {
      const res = await User.login(email, password);
      const token = get(res, 'headers.[x-auth]');
      localStorage.setItem('token', token);
      commit(AUTH_SUCCESS, token);
      dispatch(USER_REQUEST);
    } catch (error) {
      console.log(serializeError(error));
      commit(AUTH_FAIL, { error: serializeError(error) });
      localStorage.removeItem('token');
    }
  },
  // async LogIn({ commit }, { email, password }) {
  //   commit(USER_REQUEST);
  //   try {
  //     const res = await User.register(email, password);
  //     const data = get(res, 'data');
  //     const token = get(res, 'headers.[x-auth]');
  //     localStorage.setItem('token', token);
  //     console.log('res', res);
  //     console.log('token', token);
  //     commit(USER_SUCCESS, data, token);
  //   } catch (error) {
  //     console.log(serializeError(error));
  //     commit(USER_FAIL, { error: serializeError(error) });
  //     localStorage.removeItem('token');
  //   }
  // },
  Logout({ commit, dispatch }) {
    commit(AUTH_LOGOUT);
    localStorage.removeItem('token');
    dispatch(AUTH_LOGOUT);
  },
};

const mutations = {
  [USER_REQUEST](state) {
    state.user.requesting = true;
    state.user.status = '';
  },
  [USER_SUCCESS](state, payload, token) {
    state.user.requesting = false;
    state.user.status = 'success';
    state.user.result = payload;
    state.user.token = token;
  },
  [USER_FAIL](state, payload) {
    state.user.requesting = false;
    state.user.status = 'error';
    state.user.error = payload.error;
  },
  [AUTH_LOGOUT](state) {
    state.status = '';
    state.token = '';
  },
  [AUTH_REQUEST]: state => {
    state.status = 'loading';
  },
  [AUTH_SUCCESS]: (state, token) => {
    state.status = 'success';
    state.token = token;
  },
  [AUTH_FAIL]: state => {
    state.status = 'error';
  },
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
};

export default {
  state: userState,
  actions,
  mutations,
  getters,
};
