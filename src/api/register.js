import http from '../service/http'

export default class Register {
  static registerUser (username, password) {
    console.log('username: ', password)
    return http.post(``, { username, password })
  }
}
