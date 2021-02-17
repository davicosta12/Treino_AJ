import BaseService from './BaseService';

class AuthService extends BaseService {

  // POST /GetToken
  getToken(payload) {
    return new Promise((resolve, reject) => {
      this.getApi().post('/Authentication', payload)
        .then(resp => resolve(resp.data.token)).catch(reject)
    })
  }

}

export default AuthService;
