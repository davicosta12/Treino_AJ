import axios from 'axios';

class BaseService {

  _baseURL = 'http://127.0.0.1:5000';
  _headers = {};

  constructor(token = null) {
    this._headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }

  getApi() {
    return axios.create({
      headers: this._headers,
      baseURL: this._baseURL,
    })
  }

}

export default BaseService;