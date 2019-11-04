import http from '../service/http';

export default class User {
  static register(email, password) {
    return http.post('/users', { email, password });
  }

  static login(email, password) {
    console.log('email:', email);
    return http.post('/users/login', { email, password });
  }
}
