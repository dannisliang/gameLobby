import React from 'react'
import PropTypes from 'prop-types'
import TableCell from './tableCell.js';
import { Card, Row, Col } from 'antd';
import styles from './index.css'
const jump=(item)=>{
    if(item.user){
        localStorage.setItem('doing_table_id',item.id)
    }
}
const TableCard = (props) => {
    const { dataSource, size = 200, scale = 0.1, margin = 10,url} = props;
    const style = {
        border: "2px solid red"
    }
    return (
        <div className="gutter-example">
            
                <Row gutter={16} type="flex" justify={"center"}>
                    {dataSource.map((item, index) => {
                        return (
                            <Col 
                            key={index} 
                            className={styles.gutterRow} 
                            xs={24} sm={12} md={8} xl={6}
                            style={item.user===true?style:null}>
                                <Card
                                    title={item.round_id.name + item.number}
                                    extra={<a target="_blank" rel="noopener norefferrer" onClick={jump.bind(this,item)} href={url}>{item.user?'进入游戏':''}</a>}>
                                    <div className={index.tableBack}>
                                        <TableCell tableData={item} size={size} scale={scale} margin={margin} type={"open"}></TableCell>
                                        {/* {<TableMask />} */}
                                    </div>
                                </Card>
                            </Col>
                        )
                    })
                    }
                </Row>
              
        </div>

    )
}
TableCard.PropTypes={
    dataSource:PropTypes.array,
    size:PropTypes.number,
    scale:PropTypes.number,
    margin:PropTypes.number,
    url:PropTypes.string
}
TableCard.defaultProps={
    dataSource:[],
    size:30,
    scale:0.1,
    margin:10,
    url:'/igame/#/game/',
}
export default React.memo(TableCard)