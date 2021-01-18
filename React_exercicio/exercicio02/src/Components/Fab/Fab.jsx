import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
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
            {iconAdd && <Fab
                onClick={onClickFunction}
                variant="extended"
                size="small"
                color="primary"
                aria-label="add"
                className={classes.margin}>
                <AddCircleOutlineIcon className={classes.extendedIcon} />
          Adicionar
        </Fab>}
            {iconAddModal && <Fab
                onClick={onClickFunction}
                variant="extended"
                size="small"
                color="secundary"
                aria-label="add"
                className={classes.margin}>
                <AddCircleOutlineIcon className={classes.extendedIcon} />
            Confirmar
            </Fab>}
            {iconDelet && <Fab
                onClick={onClickFunction}
                disabled={disabledDelet}
                variant="extended"
                size="small"
                color="secundary"
                aria-label="add"
                className={classes.margin}>
                <DeleteForeverIcon className={classes.extendedIcon} />
          Excluir
        </Fab>}
            {iconEdit && <Fab
                onClick={onClickFunction}
                disabled={disabledEdit}
                variant="extended"
                size="small"
                color="primary"
                aria-label="edit"
                className={classes.margin}>
                <CreateIcon className={classes.extendedIcon} />
            Editar
            </Fab>}
            {iconEditModal && <Fab
                onClick={onClickFunction}
                variant="extended"
                size="small"
                color="secundary"
                aria-label="edit"
                className={classes.margin}>
                <CreateIcon className={classes.extendedIcon} />
          Confirmar
        </Fab>}
            {iconClose && <Fab
                onClick={onClickFunction}
                variant="extended"
                size="small"
                color="secundary"
                aria-label="add"
                className={classes.margin}>
                <CloseIcon className={classes.extendedIcon} />
          Fechar
        </Fab>}
        </div>

    );
}

export default FloatingActionButtonSize;