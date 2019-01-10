import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CardList from '@/components/CardList';
import TableCard from '@/components/TableCard';
import router from 'umi/router';
import { Card, Row, Col } from 'antd';
import styles from './index.less';
class GameList extends PureComponent {
    getData = () => {
        const dataSource = new Array(12).fill(7)
        return dataSource
    }
    render() {
        const dataSource = this.getData();
        var tableList = {
            name: "张三",
            face: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1285622578,302277335&fm=27&gp=0.jpg",
            rank: "大师",
            status: "ok"
        }
        return (

            <div className="gutter-example">
                <Row gutter={16} type="flex" justify={"center"}>
                    {dataSource.map((item,index) => {
                        return (
                            <Col key={index} className={styles.gutterRow} xs={24} sm={12} md={8} xl={6} onClick={this.aaa}>
                                <Card title="Card title">
                                    <TableCard tableList={tableList} size={45} scale={0.07} />
                                </Card>
                            </Col>
                        )
                    })

                    }
                </Row>
            </div>

        )
    }
}

export default GameList