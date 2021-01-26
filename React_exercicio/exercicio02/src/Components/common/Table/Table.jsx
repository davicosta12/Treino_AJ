import './Totalizador/totalizador.css'
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Totalizador from './Totalizador/totalizador'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '../Fab/Fab'
import { TableFooter } from '@material-ui/core';


const useStyles = makeStyles({
  table: {
    minWidth: 1050,
  },
});

const Tabela = props => {
  const [disableExcluir, setDisableExcluir] = useState([]);
  const { onGetUser, onDeleteUser, activeLoadingModal, setShowBtn, openModal, TableheadItens, TableBodyItens } = props;

  useEffect(() => {
    setDisableExcluir(Array(TableBodyItens.length).fill(false))
  }, [TableBodyItens.length])

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
              {TableheadItens.map((item, index) => <TableCell key={index}>{item}</TableCell>)}
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              TableBodyItens.map((user, index) => (
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
          <TableFooter><Totalizador TableBodyItens={TableBodyItens}></Totalizador></TableFooter>
        </Table>
      </TableContainer>
    </React.Fragment>
  )

}

export default Tabela