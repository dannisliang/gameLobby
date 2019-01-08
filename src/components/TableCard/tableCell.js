import React from 'react';
import Table from './table.js';
import Message from './message';
import index from './index.css';
import table from './table.css';
const TableCell = (props) => {
    const { user, size, scale, margin } = props
    return (
        <div className={index.flexColumn+' '+table.tableBorder+' ' +table.tableCard}>
            <Message />
            <div className={index.flexRow+' '+table.tableBorder}>
                <div className={table.tableSplit+' '+index.flexItemASpace} >
                    <Table user={user} key={user.name} size={size} scale={scale} margin={margin} type={"open"} />
                </div>
                <div style={{paddingLeft:"8PX"}} className={index.flexItemASpace}>
                    <Table user={user} key={user.name} size={size} scale={scale} margin={margin} type={"open"} />
                </div>
            </div>
        </div>
    )
}
export default React.memo(TableCell)