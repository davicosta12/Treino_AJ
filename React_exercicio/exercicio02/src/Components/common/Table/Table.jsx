import './table.css';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableFooter } from '@material-ui/core';
import Fab from '../Fab/Fab'


const useStyles = makeStyles({
  table: {
    minWidth: 1050,
  },
});

const Tabela = props => {
  const [disableExcluir, setDisableExcluir] = useState([]);
  const { onClickEditBtn, onClickDeleteBtn, columns, items } = props;

  useEffect(() => {
    setDisableExcluir(Array(items.length).fill(false))
  }, [items.length])

  const handleDisableExcluir = (index, value) => {
    const _disableExcluir = [...disableExcluir];
    _disableExcluir[index] = value;
    setDisableExcluir(_disableExcluir);
  }

  const handleBtnDelete = (id, index) => {
    setDisableExcluir(() => handleDisableExcluir(index, true));
    onClickDeleteBtn(id)
  }

  const handleBtnEdit = (id) => {
    onClickEditBtn(id)
  }

  const classes = useStyles();

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              { columns.map((col, i) => <TableCell key={i}> {col.label} </TableCell>) }
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              items.map((item, index) => (
                <TableRow key={index}>
                  { columns.map((col, i) => <TableCell key={i}> {item[col.name]} </TableCell>) }
                  <TableCell>
                    <Fab
                      onClick={() => handleBtnDelete(item.id, index)}
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
                      onClick={() => { handleBtnEdit(item.id) }}
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
          <TableFooter>
            { 
              /* TableRow e TableCell adicionados p/ remover o warning do console: 
                <div> cannot appear as a child of <tfoot> 
              */
            }
            <TableRow>
              <TableCell className='totalizador'>
                <p>Total: <span>{ items.length }</span></p>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </React.Fragment>
  )

}

export default Tabela