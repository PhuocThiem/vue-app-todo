import { get } from 'lodash';
import { serializeError } from 'serialize-error';

import User from '../api/user';

import { POST_USER_INFO_REQUEST, POST_USER_INFO_SUCCESS, POST_USER_INFO_FAIL } from '../constant/muationPypes';

const userState = {
  user: {
    requesting: false,
    status: '',
    result: null,
    console: null
  }
};

const actions = {
  async postRegisterInfo({ commit }, { email, password }) {
    commit(POST_USER_INFO_REQUEST);
    try {
      const res = await User.register(email, password);
      const data = get(res, 'data');

      console.log('res', res);

      commit(POST_USER_INFO_SUCCESS, { data });
    } catch (error) {
      console.log(serializeError(error));
      commit(POST_USER_INFO_FAIL, { error: serializeError(error) });
    }
  }
};

const mutations = {
  [POST_USER_INFO_REQUEST](state) {
    state.user.requesting = true;
    state.user.status = '';
  },
  [POST_USER_INFO_SUCCESS](state, payload) {
    state.user.requesting = false;
    state.user.status = 'success';
    state.user.result = payload;
  },
  [POST_USER_INFO_FAIL](state, payload) {
    state.user.requesting = false;
    state.user.status = 'error';
    state.user.error = payload.error;
  }
};

const getters = {
  register: state => get(state, 'user.result', {})
};

export default {
  state: userState,
  actions,
  mutations,
  getters
};
