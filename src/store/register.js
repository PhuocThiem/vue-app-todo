import { get } from 'lodash'
import { serializeError } from 'serialize-error'

import Register from '../api/register'

import {
  POST_USER_INFO_REQUEST,
  POST_USER_INFO_SUCCESS,
  POST_USER_INFO_FAIL
} from '../constant/muationPypes'

const state = {
  register: {
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
    state.register.requesting = true
    state.register.status = ''
  },
  [POST_USER_INFO_SUCCESS] (state, payload) {
    state.register.requesting = false
    state.register.status = 'success'
    state.register.result = payload
  },
  [POST_USER_INFO_FAIL] (state, payload) {
    state.register.requesting = false
    state.register.status = 'error'
    state.register.result = payload
  }
}

const getters = {
  register: state => get(state, 'register.result', {})
}

export default {
  state,
  actions,
  mutations,
  getters
}
