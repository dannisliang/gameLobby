import React from 'react'
import PropTypes from 'prop-types'
import TableCell from './tableCell.js';
import { Card, Row, Col } from 'antd';
import styles from './index.css'
const TableCard = (props) => {
    const { dataSource, size = 200, scale = 0.1, margin = 10,url} = props;//接口设置的数据结构应该适时改变。
    return (
        <div className="gutter-example">
            
                <Row gutter={16} type="flex" justify={"center"}>
                    {dataSource.map((item, index) => {
                        return (
                            <Col key={index} className={styles.gutterRow} xs={24} sm={12} md={8} xl={6}>
                                <Card
                                    title={item.round_id.name + item.number}
                                    extra={<a target="_blank" href={url}>进入游戏</a>}>
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