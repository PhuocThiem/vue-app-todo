import http from '../service/http'

export default class Register {
  static registerUser (username, password) {
    return http.post(`/users`, { username, password })
  }
}
