const KEY_LOGIN = 'login-key';

export default class Storage {
  static setItem(value, key = KEY_LOGIN) {
    return localStorage.setItem(key, value);
  }

  static getItem(key = KEY_LOGIN) {
    return localStorage.getItem(key);
  }

  static removeItem(key = KEY_LOGIN) {
    return localStorage.removeItem(key);
  }
}
