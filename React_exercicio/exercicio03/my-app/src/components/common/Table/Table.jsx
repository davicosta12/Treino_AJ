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
import Fab from '../Fab/Fab'


const useStyles = makeStyles({
  table: {
    minWidth: 1050,
  },
});

const Tabela = props => {
  const {handleOpenModal, columns} = props
  const classes = useStyles();

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {columns.map((col, i) => <TableCell key={i}> {col} </TableCell>)}
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell> 2 </TableCell>
              <TableCell> Davi </TableCell>
              <TableCell> Sim </TableCell>
              <TableCell>
                <Fab
                  variant="round"
                  title="Excluir"
                  size="small"
                  color="secondary"
                  iconDelet={true}
                />
              </TableCell>
              <TableCell>
                <Fab
                  onClick={handleOpenModal}
                  variant="round"
                  title="Editar"
                  size="small"
                  color="primary"
                  iconEdit={true}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  )

}

export default Tabela