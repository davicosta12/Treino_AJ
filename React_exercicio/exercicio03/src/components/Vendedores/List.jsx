import React, { Component } from 'react'
import SellersService from '../../Services/SellersService'

import VendedoresForm from './Form/Form'
import Modal from '../../components/common/Modal/Modal'
import Tabela from '../../components/common/Table/Table'
import Fab from '../../components/common/Fab'
import Loading from '../common/Loading/Loading'
import checkValidation from '../../util/validacoes'
import ShowBar from '../common/Snackbar/Snackbar'


const INITIAL_STATE = {
  sellers: [],
  seller: {
    branchId: 1,
    idErp: "0",
    nome: "",
    cargo: "string",
    comissao: 0,
    documento: "string",
    idEcomm: "string",
    obs: "string",
    inativo: false
  },
  showBtnEdit: false,
  openModal: false,
  createMode: false,
  activeLoading: false,
  activeShowbar: false,
  severityShowbar: '',
  showbarMessage: '',
}

class VendedoresList extends Component {
  state = INITIAL_STATE
  sellersService = null;

  componentDidMount = () => {
    this.sellersService = new SellersService(localStorage.getItem('token'));
    this.setState({ activeLoading: true }, async () => {
      await this.getListSellers()
    });
  }

  getListSellers = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const sellers = await this.sellersService.getListSellers();
        this.setState({ sellers }, () => { resolve() });
      }
      catch (error) {
        this.errorHandler(error, 'error')
        reject(error);
      }
      finally {
        this.setState({ activeLoading: false })
      }
    })
  }

  handleCreateSeller = () => {
    if (this.isNotvalidSeller(this.state.seller.nome)) return;
    this.setState({ activeLoading: true, openModal: false }, async () => {
      try {
        const payload = { ...this.state.seller }
        const response = await this.sellersService.createSeller(payload)
        await this.getListSellers()
        this.successHandler(response.mensagem)
      }
      catch (error) {
        if (error.response?.data?.mensagem)
          this.errorHandler(error, 'error', error.response.data.mensagem)
        else
          this.errorHandler(error, 'error')
        console.log(error)
      }
      finally {
        this.setState({ activeLoading: false })
      }
    })
  }

  handleDeleteSeller = async data => {
    this.setState({ activeLoading: true }, async () => {
      try {
        await this.sellersService.deleteSeller(data.idVendedor)
        await this.getListSellers()
        this.successHandler(`${data.idVendedor} deletado com sucesso!`)
      }
      catch (error) {
        this.errorHandler(error, 'error')
        console.log(error)
      }
      finally {
        this.setState({ activeLoading: false, openModal: false })
      }
    })
  }

  handleChangeForm = ev => {
    const { name, value } = ev.target;
    this.setState({
      seller: {
        ...this.state.seller,
        [name]: value,
      }
    })
    console.log(this.state.seller)
  }

  handleEditBtn = data => {
    const { nome, status } = data;
    console.log(data)
    this.setState({
      seller: { ...this.state.seller, nome, inativo: status },
      createMode: false,
      openModal: true
    })
  }

  handleAddBtn = () => {
    this.setState({ createMode: true, openModal: true, seller: { ...INITIAL_STATE.seller } })
  }

  handleCloseModal = () => {
    this.setState({ openModal: false })
  }

  handleResetSnackbar = () => {
    this.setState({
      activeShowbar: false,
      showbarMessage: '',
      severityShowbar: '',
    })
  }

  successHandler = (message = null) => {
    const defaultMessage = 'Operação concluída com sucesso!';
    this.setState({
      activeShowbar: true,
      showbarMessage: `${message || defaultMessage}`,
      severityShowbar: 'success'
    })
  }

  errorHandler = (err, severity, message = null) => {
    console.error(err);
    const defaultMessage = 'Ocorreu um erro ao processar as informações';
    this.setState({
      activeShowbar: true,
      showbarMessage: `${message || defaultMessage}`,
      severityShowbar: `${severity}`
    })
  }

  isNotvalidSeller = seller => {
    const { notValid, message } = checkValidation([...seller])
    if (notValid) {
      this.setState({
        activeShowbar: true,
        showbarMessage: message,
        severityShowbar: 'warning',
      })
      return true;
    }
    return false;
  }

  render = () => {
    const { seller, sellers, createMode,
      openModal, activeLoading, activeShowbar, severityShowbar, showbarMessage, showBtnEdit } = this.state
    return <>
      <ShowBar
        activeShowbar={activeShowbar}
        severityShowbar={severityShowbar}
        showbarMessage={showbarMessage}
        onReset={this.handleResetSnackbar}
      />

      <Tabela
        items={sellers.map(seller => Object.assign({
          obj: { ...seller },
          label: {
            idVendedor: seller.idVendedor,
            nome: seller.nome,
            status: seller.status ? 'Ativo' : 'Inativo',
          }
        }))}
        columns={[
          { name: 'idVendedor', label: 'Código' },
          { name: 'nome', label: 'Nome' },
          { name: 'status', label: 'Ativo' }
        ]}
        showBtnEdit={showBtnEdit}
        onClickDelete={this.handleDeleteSeller}
        onClickEdit={this.handleEditBtn}
      />

      <Modal
        open={openModal}
        onClose={this.handleCloseModal}
        onConfirm={this.handleCreateSeller}
        title="Vendedor"
        createMode={createMode}
        confirmBtnTitle='Confirmar'
        confirmBtnLabel='edit'
      >
        <VendedoresForm
          seller={seller}
          createMode={createMode}
          onChange={this.handleChangeForm}
        />
      </Modal>

      <div className="btnAdd">
        <Fab
          onClick={this.handleAddBtn}
          title="Adicionar"
          variant="round"
          size="small"
          label="add"
          color="primary"
          iconAdd={true}
        />
      </div>

      <Loading activeLoading={activeLoading} />
    </>
  }
}

export default VendedoresList