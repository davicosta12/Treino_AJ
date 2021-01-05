import './Table.css';
import React from 'react';

import Totalizador from '../totalizador/totalizador'

const Table = props => {
    return (
        <div className="Tabela">
            <table className="table table-dark table-hover">
                    <thead className="table-head">
                        <tr className="trow-head">
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="table-body">

                </tbody>  
            </table> 
            <Totalizador />
        </div>
    )
}
    
export default Table