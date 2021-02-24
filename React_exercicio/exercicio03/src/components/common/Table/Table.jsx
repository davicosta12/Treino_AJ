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
import Fab from '../Fab'


const useStyles = makeStyles({
  table: {
    minWidth: 1050,
  },
});

const Tabela = props => {
  const [disableExcluir, setDisableExcluir] = useState([]);
  const { onClickDelete, onClickEdit, columns, items, showBtnEdit } = props
  const classes = useStyles();

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
    onClickDelete(id)
  }


  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {columns.map((col, i) => <TableCell key={i}> {col.label} </TableCell>)}
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              items.map((item, index) => (
                <TableRow key={index}>
                  {columns.map((col, i) => <TableCell key={i}> {item.label[col.name]}</TableCell>)}
                  <TableCell>
                    <Fab
                      onClick={() => { handleBtnDelete(item.obj, index) }}
                      variant="round"
                      title="Excluir"
                      size="small"
                      color="secondary"
                      iconDelet={true}
                      disabled={disableExcluir && disableExcluir[index]}
                    />
                  </TableCell>
                  { showBtnEdit && <TableCell>
                    <Fab
                      onClick={() => { onClickEdit(item.obj) }}
                      variant="round"
                      title="Editar"
                      size="small"
                      color="primary"
                      iconEdit={true}
                      disabled={disableExcluir && disableExcluir[index]}
                    />
                  </TableCell>}
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