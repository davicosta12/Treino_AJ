import BaseService from './BaseService';

class UsersService extends BaseService {

  // GET /api/Usuarios/{BranchId}
  getListUsers() {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/Usuarios/1`)
        .then(resp => resolve(resp.data)).catch(reject)
    })
  }

  // POST /api/Usuarios/{BranchId}
  createUser(payload) {
    return new Promise((resolve, reject) => {
      this.getApi().post(`/Usuarios/1`, payload)
        .then(resp => resolve(resp.data)).catch(reject)
    })
  }

  // POST /api/Usuarios/{BranchId}
  updateUser(payload) {
    return new Promise((resolve, reject) => {
      this.getApi().post(`/Usuarios/1`, payload)
        .then(resp => resolve(resp.data)).catch(reject)
    })
  }

  // DELETE /api/Usuarios/{BranchId}/:id
  deleteUser(id) {
    return new Promise((resolve, reject) => {
      this.getApi().delete(`/Usuarios/1/${id}`)
        .then(() => resolve("Usuário excluído com sucesso")).catch(reject)
    });
  }

}

export default UsersService;
