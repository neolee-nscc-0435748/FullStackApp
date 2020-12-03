import restService from "./restService";
import jwt_decode from "jwt-decode";

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

  getUserEmail() {
    if(this.isAuthenticated()){
      const decodedToken = jwt_decode(restService.getToken());
      console.log(decodedToken);

      return decodedToken.user_email;
    }

    return null;
  }
}

export default new AuthService()