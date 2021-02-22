import './table.css';
import React from 'react';
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
  const { onClickDelete, onClickEdit, columns, items } = props
  const classes = useStyles();


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
                  {columns.map((col, i) => <TableCell key={i}> {item[col.name]}</TableCell>)}
                  <TableCell>
                    <Fab
                      onClick={() => {onClickDelete(item.usuario)}}
                      variant="round"
                      title="Excluir"
                      size="small"
                      color="secondary"
                      iconDelet={true}
                    />
                  </TableCell>
                  <TableCell>
                    <Fab
                      onClick={() => {onClickEdit(item.usuario, item.status, item.isAdmin)}}
                      variant="round"
                      title="Editar"
                      size="small"
                      color="primary"
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