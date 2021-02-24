import BaseService from './BaseService';

class SellersService extends BaseService {

  // GET /api/Vendedor/{BranchId}
  getListSellers() {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/Vendedor/1`)
        .then(resp => resolve(resp.data)).catch(reject)
    })
  }

  // POST /api/Vendedor/
  createSeller(payload) {
    return new Promise((resolve, reject) => {
      this.getApi().post(`/Vendedor`, payload)
        .then(resp => resolve(resp.data)).catch(reject)
    })
  }

  // POST /api/Vendedor/
  updateSeller(payload) {
    return new Promise((resolve, reject) => {
      this.getApi().post(`/Vendedor`, payload)
        .then(resp => resolve(resp.data)).catch(reject)
    })
  }

  // DELETE /api/Vendedor/{BranchId}/{idVendedor}
  deleteSeller(id) {
    return new Promise((resolve, reject) => {
      this.getApi().delete(`/Vendedor/1/${id}`)
        .then(() => resolve("Usuário excluído com sucesso")).catch(reject)
    });
  }

}

export default SellersService;