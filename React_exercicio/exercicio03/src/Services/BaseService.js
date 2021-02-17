import axios from 'axios';

class BaseService {

  _baseURL = 'https://oms.ajsy.com.br/api';
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