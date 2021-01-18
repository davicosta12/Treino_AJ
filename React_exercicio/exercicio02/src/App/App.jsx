import './App.css'
import React, { Component } from 'react';
import { getAllUsers, createUser, getUser, updateUser, deleteUser } from '../Services/UsersService';
import Modal from '../Components/Modal/modal'
import ShowAlert from '../Utils/ShowAlert'
import ErrorHnadler from '../Utils/ErrorHandler'
import isNotValid from '../Utils/validacoes'


const INITIAL_STATE = {
    id: '',
    name: '',
    email: '',
    obs: '',
}

class App extends Component {
    state = {
        users: [],
        user: {},
        activeBtnCreate: false,
        activeBtnUpdate: false,
        activeLoadingModal: false,
        activeAlertSucess: false,
        alertMessageSucess: '',
        activeAlertError: false,
        alertMessageError: '',
        activeAlertInfo: false,
        alertMessageInfo: '',
    }

    componentDidMount() {
        this.getAllUsers();
    }

    setShowBtn = (nameBtn, boolean) => {
        if (nameBtn === 'activeBtnCreate' && boolean === true) {
            this.setState({ activeBtnCreate: true })
        } else if (nameBtn === 'activeBtnCreate' && boolean === false) {
            this.setState({ activeBtnCreate: false })
        } else if (nameBtn === 'activeBtnUpdate' && boolean === true) {
            this.setState({ activeBtnUpdate: true })
        } else {
            this.setState({ activeBtnUpdate: false })
        }
    }

    isNotvalidUser = user => {
        const booleanAndMessage = isNotValid([user.id, user.name, user.email, user.obs]);
        const boolean = booleanAndMessage[0];
        const message = booleanAndMessage[1];
        if(boolean) {
            this.setState({
                activeAlertInfo: true,
                alertMessageInfo: message,
            })
            window.setTimeout(() => {
                this.setState({
                    activeAlertInfo: false,
                    alertMessageInfo: '',
                })
            }, 3000);
            return true;
        }
    }

    getAllUsers = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const users = await getAllUsers();
                this.setState({ users }, () => resolve());
            }
            catch (error) {
                this.setState({activeAlertError: true, alertMessageError: error})
                reject(error);
            }
            finally {
                this.setState({})
                window.setTimeout(() => {
                    this.setState({
                        activeAlertError: false,
                        alertMessageError: '',
                    })
                }, 3000);
            }
        })
    }

    handleGetUser = async (userId) => {
        return new Promise((resolve, reject) => {
            this.setState({
                user: {},
                activeLoadingModal: true,
            }, async () => {
                try {
                    const data = await getUser(userId);
                    this.setState({ user: { ...data } }, () => resolve());
                }
                catch (error) {
                    this.setState({activeAlertError: true, alertMessageError: error})
                    reject(error);
                }
                finally {
                    this.setState({ activeLoadingModal: false })
                    window.setTimeout(() => {
                        this.setState({
                            activeAlertError: false,
                            alertMessageError: '',
                        })
                    }, 3000);
                }
            })
        })
    }

    handleCreateUser = async (user, handleClose) => {
        if(this.isNotvalidUser(user)) return;   
        this.setState({ activeLoadingModal: true }, async () => {
            try {
                const payload = { ...user }
                await createUser(payload)
                await this.getAllUsers()
                this.setState({
                    activeAlertSucess: true,
                    alertMessageSucess: 'Usuário inserido',
                })
            }
            catch (error) {
                if (error.status === 404)
                    this.setState({activeAlertError: true, alertMessageError:'Código não localizado'})
                else if (error.response?.data?.message)
                    this.setState({activeAlertError: true, alertMessageError: error.response.data.message})
                else
                    this.setState({activeAlertError: true, alertMessageError: error})
            }
            finally {
                this.setState({ activeLoadingModal: false })
                window.setTimeout(() => {
                    this.setState({
                        activeAlertSucess: false,
                        activeAlertError: false,
                        alertMessageSucess: '',
                        alertMessageError: '',
                    })
                }, 3000);
                handleClose()
            }
        })
    }

    handleUpdateUser = (user, handleClose) => {
        if(this.isNotvalidUser(user)) return; 
        this.setState({ activeLoadingModal: true }, async () => {
            try {
                const payload = { ...user }
                const id = this.state.user.id
                const data = await updateUser(id, payload)
                await this.getAllUsers()
                this.setState({
                    activeAlertSucess: true,
                    alertMessageSucess: data.message,
                })
            }
            catch (error) {
                this.setState({activeAlertError: true, alertMessageError: error})
            }
            finally {
                this.setState({ activeLoadingModal: false })
                window.setTimeout(() => {
                    this.setState({
                        activeAlertSucess: false,
                        activeAlertError: false,
                        alertMessageSucess: '',
                        alertMessageError: '',
                    })
                }, 3000);
                handleClose()
            }
        })
    }

    handleDeleteUser = (id) => {
        this.setState({ activeLoadingModal: true }, async () => {
            try {
                await deleteUser(id)
                await this.getAllUsers()
                this.setState({
                    activeAlertSucess: true,
                    alertMessageSucess: "Usuário deletado com sucesso",
                })
            }
            catch (error) {
                this.setState({activeAlertError: true, alertMessageError: error})
            }
            finally {
                this.setState({ activeLoadingModal: false })
                window.setTimeout(() => {
                    this.setState({
                        activeAlertSucess: false,
                        activeAlertError: false,
                        alertMessageSucess: '',
                        alertMessageError: '',
                    })
                }, 3000);
            }
        })
    }

    handleClearForm = () => this.setState({ user: INITIAL_STATE });

    render() {
        const {
            user,
            users,
            activeLoadingModal,
            activeBtnCreate,
            activeBtnUpdate,
            activeAlertInfo,
            alertMessageInfo,
        } = this.state;

        return (
            <div>
                {this.state.activeAlertError && <ErrorHnadler 
                    alertMessage={this.state.alertMessageError}
                />}
                {this.state.activeAlertSucess && <ShowAlert
                    alertMessage={this.state.alertMessageSucess}
                />}
                <div className="div-Modal">
                    <Modal
                        users={users}
                        user={user}
                        onDeleteUser={this.handleDeleteUser}
                        onUpdateUser={this.handleUpdateUser}
                        activeBtnCreate={activeBtnCreate}
                        activeBtnUpdate={activeBtnUpdate}
                        onCreateUser={this.handleCreateUser}
                        onGetUser={this.handleGetUser}
                        setShowBtn={this.setShowBtn}
                        activeLoadingModal={activeLoadingModal}
                        onClearForm={this.handleClearForm}
                        activeAlertInfo={activeAlertInfo}
                        alertMessageInfo={alertMessageInfo}
                    />
                </div>
            </div>
        )
    }
}

export default App