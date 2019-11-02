import http from '../service/http';

export default class User {
  static register (email, password) {
    return http.post('/users', { email, password });
  }
}
