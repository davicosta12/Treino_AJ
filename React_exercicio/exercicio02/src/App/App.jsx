import React, { Component } from 'react';
import { getAllUsers, createUser, getUser, updateUser, deleteUser } from '../Services/UsersService';
import Modal from '../Components/Modal/modal'


class App extends Component {
    state = {
        users: [],
        user: {},
        desactiveBtnCreate: false,
        desactiveBtnUpdate: false,
        activeLoadingModal: false,
    }

    componentDidMount() {
        this.getAllUsers();
    }

    setShowBtn = (nameBtn, boolean) => {
        if (nameBtn === 'desactiveBtnCreate' && boolean === true) {
            this.setState({ desactiveBtnCreate: true })
        } else if (nameBtn === 'desactiveBtnCreate' && boolean === false) {
            this.setState({ desactiveBtnCreate: false })
        } else if (nameBtn === 'desactiveBtnUpdate' && boolean === true) {
            this.setState({ desactiveBtnUpdate: true })
        } else {
            this.setState({ desactiveBtnUpdate: false })
        }
    }

    getAllUsers = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const users = await getAllUsers();
                this.setState({ users }, () => resolve());
            }
            catch (error) {
                alert(error);
                reject(error);
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
                catch (err) {
                    alert(err);
                    reject(err);
                }
                finally {
                    this.setState({ activeLoadingModal: false })
                }
            })
        })
    }

    handleCreateUser = async (user, handleClose) => {
        this.setState({ activeLoadingModal: true }, async () => {
            try {
                const payload = { ...user }
                await createUser(payload)
                await this.getAllUsers()
                alert("Usuário inserido com sucesso!")
            }
            catch (error) {
                if (error.status === 404)
                    alert('Código não localizado')
                else if (error.response?.data?.message)
                    alert(error.response.data.message)
                else
                    alert(error)
            }
            finally {
                this.setState({ activeLoadingModal: false })
                handleClose()
            }
        })
    }

    handleUpdateUser = (user, handleClose) => {
        this.setState({ activeLoadingModal: true }, async () => {
            try {
                const payload = { ...user }
                const id = this.state.user.id
                const data = await updateUser(id, payload)
                await this.getAllUsers()
                alert(data.message)
            }
            catch (error) {
                alert(error)
            }
            finally {
                this.setState({ activeLoadingModal: false })
                handleClose()
            }
        })
    }

    handleDeleteUser = (id) => {
        this.setState({ activeLoadingExcluir: true }, async () => {
            try {
                await deleteUser(id)
                await this.getAllUsers()
                alert("Usuário deletado com sucesso")
            }
            catch (error) {
                alert(error)
            }
            finally {
                this.setState({ activeLoadingExcluir: false })
            }
        })
    }

    handleClearForm = () => this.setState({ user: {} });

    render() {
        const {
            user,
            users,
            activeLoadingModal,
            desactiveBtnCreate,
            desactiveBtnUpdate,
        } = this.state;

        return (
            <div>
                <Modal
                    users={users}
                    user={user}
                    onDeleteUser={this.handleDeleteUser}
                    onUpdateUser={this.handleUpdateUser}
                    desactiveBtnCreate={desactiveBtnCreate}
                    desactiveBtnUpdate={desactiveBtnUpdate}
                    onCreateUser={this.handleCreateUser}
                    onGetUser={this.handleGetUser}
                    setShowBtn={this.setShowBtn}
                    activeLoadingModal={activeLoadingModal}
                    onClearForm={this.handleClearForm}
                />
            </div>
        )
    }
}

export default App