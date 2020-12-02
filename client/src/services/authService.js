import restService from "./restService";

class AuthService {
  login(credentials, cb) {
    restService.login(credentials, (result) => {
      cb(result);
    })
  }

  logout(cb) {
      restService.removeToken();
    cb();
  }

  isAuthenticated() {
    return restService.getToken() !== null;
  }

  register(data, cb) {
    restService.createUser(data, (result) => {
      cb(result);
    });
  }
}

export default new AuthService()