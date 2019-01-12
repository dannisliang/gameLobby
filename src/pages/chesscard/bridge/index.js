import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import router from 'umi/router';
import { Card, Row, Col, Spin } from 'antd';
import styles from './index.less';
import Odoo from '@/odoo';
import { async } from 'q';
class Bridge extends PureComponent {
    state = {
        dataSource: [],
        loading:true
    }
    aaa = (data) => {   
        console.log(data);    
        router.push({
            pathname: '/chesscard/bridge/gameList',
            state:{
                game_id:data.id
            }
        })
    }
    componentDidMount() {
        this.getData()
    }
    getData = async () => {
        console.log(Odoo._rpc.sid);
        const game = Odoo.env('og.game');
        const fields = {
            name: null
        }
        const damain = [['id', '>=', '0']]
        const dataSource = await game.search_read(damain, fields);
        console.log(dataSource);
        this.setState({ dataSource: dataSource,loading:false })
    }
    render() {
        const { dataSource ,loading} = this.state
        return (
            <Spin spinning={loading} >
                <div className="gutter-example" style={{width:'100%',height:'100%'}}>
                    <Row gutter={16}>
                        {dataSource.map((item, index) => {
                            console.log(item);
                            return (
                                <Col key={item.name} className={styles.gutterRow} xs={24} sm={24} md={4} lg={4} xl={4} onClick={this.aaa.bind(this,item)}>
                                    <Card title={item.id}>{item.name}</Card>
                                </Col>
                            )
                        })

                        }
                    </Row>
                </div>
            </Spin>
        )
    }
}

export default Bridge
