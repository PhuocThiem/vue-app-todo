import { get } from 'lodash'
import { serializeError } from 'serialize-error'

import Register from '../api/register'

import {
  POST_USER_INFO_REQUEST,
  POST_USER_INFO_SUCCESS,
  POST_USER_INFO_FAIL
} from '../constant/muationPypes'

const state = {
  user: {
    requesting: false,
    status: '',
    result: null,
    console: null
  }
}

const actions = {
  async postRegisterInfo ({ state, commit }, { username, password }) {
    commit(POST_USER_INFO_REQUEST)
    try {
      const res = await Register.registerUser(username, password)
      const data = get(res, 'data')

      commit(POST_USER_INFO_SUCCESS, { data: data })
    } catch (error) {
      commit(POST_USER_INFO_FAIL, { error: serializeError(error) })
    }
  }
}

const mutations = {
  [POST_USER_INFO_REQUEST] (state) {
    state.user.requesting = true
    state.user.status = ''
  },
  [POST_USER_INFO_SUCCESS] (state, payload) {
    state.user.requesting = false
    state.user.status = 'success'
    state.user.result = payload
  },
  [POST_USER_INFO_FAIL] (state, payload) {
    state.user.requesting = false
    state.user.status = 'error'
    state.user.result = payload
  }
}

const getters = {
  register: state => get(state, 'user.result', {})
}

export default {
  state,
  actions,
  mutations,
  getters
}
