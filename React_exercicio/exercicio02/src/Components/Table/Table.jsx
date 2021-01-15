import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Totalizador from '../Totalizador/totalizador';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Tabela = props => {
  const [disableExcluir, setDisableExcluir] = useState([]);
  const { users, user, onUpdateUser, onGetUser, onDeleteUser, isActiveLoadingModal } = props;

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
    props.setShowBtn('desactiveBtnCreate', false)
    props.setShowBtn('desactiveBtnUpdate', true)
    props.onGetUser(id, props.activeLoadingModal)
    props.openModal()
  }

  const classes = useStyles();

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table" size="medium">
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell align="right">Nome</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell align="left"> {user.id} </TableCell>
                  <TableCell align="right"> {user.name} </TableCell>
                  <TableCell align="right"> {user.email} </TableCell>
                  <TableCell align="right">
                    <Button
                      color="primary"
                      variant="contained"
                      size="small"
                      onClick={() => { handleDeleteUser(user.id, index) }}
                      disabled={disableExcluir && disableExcluir[index]}
                      className="button-secondary"
                    >
                      Excluir
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      color="primary"
                      variant="contained"
                      size="small"
                      node="button"
                      onClick={() => { handleGetUser(user.id)}}
                      disabled={disableExcluir && disableExcluir[index]}
                      data-target="modal1"
                      className="modal-trigger"
                    > Editar
                    </Button>
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