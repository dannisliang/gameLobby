import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import router from 'umi/router';
import { Card, Row, Col } from 'antd';
import styles from './index.less';
class Test extends PureComponent {
    aaa = () => {
        router.push({
            pathname:'/bridge/gameList',
        })
    }
    getData=()=>{
        const dataSource=new Array(12).fill(7)
        return dataSource
    }
    render() {
        const dataSource =this.getData();
        return (
        
                <div className="gutter-example">
                    <Row gutter={16}>
                        {dataSource.map((item) => {
                            return (
                                <Col className={styles.gutterRow} xs={24} sm={24} md={4} lg={4} xl={4} onClick={this.aaa}>
                                    <Card title="Card title">赛事列表</Card>
                                </Col>
                            )
                        })

                        }
                    </Row>
                </div>

        )
    }
}

export default Test
