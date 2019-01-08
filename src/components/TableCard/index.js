import React from 'react';
import TableCell from './tableCell.js';
import index from './index.css'
const Tables = (props) => {
    const { tableList, size = 200, scale = 0.1, margin = 10 } = props;//接口设置的数据结构应该适时改变。
    return (
        <div className={index.tableBack}>
                <TableCell user={tableList}  size={size} scale={scale} margin={margin} type={"open"}></TableCell>
            {/* {<TableMask />} */}
        </div>
    )
}
export default React.memo(Tables)