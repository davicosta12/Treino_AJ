import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(2),
    },
    extendedIcon: {
        marginLeft: theme.spacing(1),
    },
    root: {
        backgroundColor: 'red', 
        color: 'white',
    },
}));


const FloatingActionButtonSize = (props) => {
    const classes = useStyles()
    const {onClickFunction, disabledDelet, disabledEdit, iconAdd,
         iconAddModal, iconDelet, iconEdit, iconEditModal, iconClose} = props;

    return (
        <div>
            {iconAdd && 
            <Tooltip title="Adicionar" >
                <Fab
                    onClick={onClickFunction}
                    color="primary"
                    aria-label="add"
                    className={classes.margin}>
                        <AddIcon />
                </Fab>
            </Tooltip>}
        
            {iconAddModal && 
            <Tooltip title="Confirmar" >
                <Fab
                    onClick={onClickFunction}
                    size="medium"
                    color="secundary"
                    aria-label="add"
                    className={classes.margin}>
                    <AddIcon />
                    </Fab>
            </Tooltip>}
            {iconDelet && 
            <Tooltip title="Excluir" >
                <Fab
                    onClick={onClickFunction}
                    disabled={disabledDelet}
                    size="medium"
                    color="secundary"
                    aria-label="add"
                    className={classes.margin}>
                    <DeleteForeverIcon />
                    </Fab>
            </Tooltip>}
            {iconEdit && 
            <Tooltip title="Editar">
                <Fab
                    onClick={onClickFunction}
                    disabled={disabledEdit}
                    size="medium"
                    color="primary"
                    aria-label="edit"
                    className={classes.margin}>
                    <CreateIcon />
                    </Fab>
            </Tooltip>}
            {iconEditModal && 
            <Tooltip title="Confirmar" >
                <Fab
                    onClick={onClickFunction}
                    size="medium"
                    color="secundary"
                    aria-label="edit"
                    className={classes.margin}>
                    <CreateIcon />
                 </Fab>
            </Tooltip>}
            {iconClose && 
            <Tooltip title="Fechar" >
                <Fab
                    onClick={onClickFunction}
                    size="medium"
                    color="secundary"
                    aria-label="add"
                    className={classes.margin}>
                    <CloseIcon />
                </Fab>
            </Tooltip>}
        </div>

    );
}

export default FloatingActionButtonSize;