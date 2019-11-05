import { get } from 'lodash';
import { serializeError } from 'serialize-error';

import axios from 'axios';

import User from '../api/user';
import Storage from '../service/storage';
import router from '../router';

import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SET_TOKEN_TO_HEADERS,
  // SIGN_OUT,
} from '../constant/muationPypes';

const initialState = {
  signIn: {
    requesting: false,
    status: '',
    result: null,
    console: null,
  },
  signUp: {
    requesting: false,
    status: '',
    result: null,
    console: null,
  },
};

const actions = {
  async signIn({ commit }, { email, password }) {
    commit(SIGN_IN_REQUEST);
    try {
      const res = await User.login(email, password);
      const data = get(res, 'data');
      const token = get(res, 'headers.[x-auth]');
      Storage.setItem(token);
      const redirectPath = get(router, 'currentRoute.query.redirect');
      router.push(redirectPath);
      commit(SIGN_IN_SUCCESS, { token, ...data });
      commit(SET_TOKEN_TO_HEADERS, token);
    } catch (error) {
      console.log(serializeError(error));
      commit(SIGN_IN_FAIL, { error: serializeError(error) });
    }
  },

  async signUp({ commit }, { email, password }) {
    commit(SIGN_IN_REQUEST);
    try {
      const res = await User.register(email, password);
      const data = get(res, 'data');
      const token = get(res, 'headers.[x-auth]');
      Storage.setItem(token);
      const redirectPath = get(router, 'currentRoute.query.redirect');
      router.push(redirectPath);
      commit(SIGN_UP_SUCCESS, { token, ...data });
      commit(SET_TOKEN_TO_HEADERS, token);
    } catch (error) {
      console.log(serializeError(error));
      commit(SIGN_UP_FAIL, { error: serializeError(error) });
    }
  },
};

const mutations = {
  [SIGN_IN_REQUEST](state) {
    state.signIn.requesting = true;
    state.signIn.status = '';
  },
  [SIGN_IN_SUCCESS](state, payload) {
    state.signIn.requesting = false;
    state.signIn.status = 'success';
    state.signIn.result = payload;
  },
  [SIGN_IN_FAIL](state, payload) {
    state.signIn.requesting = false;
    state.signIn.status = 'error';
    state.signIn.error = payload.error;
  },
  [SIGN_UP_REQUEST](state) {
    state.signUp.requesting = true;
    state.signUp.status = '';
  },
  [SIGN_UP_SUCCESS](state, payload) {
    state.signUp.requesting = false;
    state.signUp.status = 'success';
    state.signUp.result = payload;
  },
  [SIGN_UP_FAIL](state, payload) {
    state.signUp.requesting = false;
    state.signUp.status = 'error';
    state.signUp.error = payload.error;
  },
  [SET_TOKEN_TO_HEADERS](state, payload) {
    axios.defaults.headers.common['X-Auth'] = payload;
  }
};

const getters = {};

export default {
  state: initialState,
  actions,
  mutations,
  getters,
};
