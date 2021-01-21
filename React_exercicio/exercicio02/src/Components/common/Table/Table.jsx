import '../../Totalizador/totalizador.css'
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '../Fab/Fab'


const useStyles = makeStyles({
  table: {
    minWidth: 1050,
  },
});

const Tabela = props => {
  const [disableExcluir, setDisableExcluir] = useState([]);
  const { users, onGetUser, onDeleteUser, activeLoadingModal, setShowBtn, openModal } = props;

  useEffect(() => {
    setDisableExcluir(Array(users.length).fill(false))
  }, [users.length])

  const handleDisableExcluir = (index, value) => {
    const _disableExcluir = [...disableExcluir];
    _disableExcluir[index] = value;
    setDisableExcluir(_disableExcluir);
  }

  const handleDeleteUser = (id, index) => {
    setDisableExcluir(() => handleDisableExcluir(index, true));
    onDeleteUser(id)
  }

  const handleGetUser = (id) => {
    setShowBtn('activeBtnCreate', false)
    setShowBtn('activeBtnUpdate', true)
    onGetUser(id, activeLoadingModal)
    openModal()
  }

  const classes = useStyles();

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell> {user.id} </TableCell>
                  <TableCell> {user.name} </TableCell>
                  <TableCell> {user.email} </TableCell>
                  <TableCell>
                    <Fab
                      onClickFunction={() => handleDeleteUser(user.id, index)}
                      variant="round"
                      title="Excluir"
                      size="small"
                      color="secondary"
                      disabled={disableExcluir && disableExcluir[index]}
                      iconDelet={true}
                    />
                  </TableCell>
                  <TableCell>
                    <Fab
                      onClickFunction={() => { handleGetUser(user.id) }}
                      variant="round"
                      title="Editar"
                      size="small"
                      color="primary"
                      disabled={disableExcluir && disableExcluir[index]}
                      iconEdit={true}
                    />
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  )

}

export default Tabela