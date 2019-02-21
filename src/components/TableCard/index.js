import React from 'react'
import PropTypes from 'prop-types'
import TableCell from './tableCell.js';
import { Card, Row, Col, Tag } from 'antd';
import styles from './index.css'
const TableCard = (props) => {
    const { dataSource, size = 200, scale = 0.1, margin = 10, url, jump } = props;
    const style = {
        border: "2px solid red",
    }
    const minHeight = window.screen.availWidth
    const width = {
        width: minHeight / 4 <= 270 ? 270 : minHeight / 4
    }
    const title = (item) => (
        <span>{item.round_id.name + item.number}
            <span style={{ marginLeft: '5PX', fontSize: "12px" }}>
                <Tag color={item.room_type === 'open' ? "#108ee9" : 'red'}>{item.room_type}</Tag>
            </span>
        </span>
    )
    const extra = (item) => (
        <a
            target="_blank"
            rel="noopener norefferrer"
            onClick={jump.bind(this, item)}
            href={url}
        >
            {item.user ? '进入游戏' : ''}
        </a>
    )
    return (
        <div className={styles.gutterExample}>

            <Row
                gutter={16}
                type="flex"
                justify={"center"}
            >
                {dataSource.map((item, index) => {
                    return (
                        <Col
                            key={index}
                            className={styles.gutterRow}
                            xs={24} sm={12} md={8} xl={6}
                            style={item.user === true ? style : null}
                            // style={width}
                        >
                            <Card
                                title={title(item)}
                                headStyle={{ fontSize: '19px' }}
                                extra={extra(item)}
                            >
                                <div className={index.tableBack}>
                                    <TableCell
                                        tableData={item}
                                        size={size}
                                        scale={scale}
                                        margin={margin}
                                        type={"open"}>
                                    </TableCell>
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
TableCard.PropTypes = {
    dataSource: PropTypes.array,
    size: PropTypes.number,
    scale: PropTypes.number,
    margin: PropTypes.number,
    url: PropTypes.string
}
TableCard.defaultProps = {
    dataSource: [],
    size: 30,
    scale: 0.1,
    margin: 10,
    url: '/igame/#/game/',
}
export default React.memo(TableCard)