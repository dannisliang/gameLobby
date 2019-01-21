import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import router from 'umi/router';
import { Card, Row, Col, Spin } from 'antd';
import styles from './index.less';
import Odoo from '@/odoo';
import { PopData } from '@/utils';
import { connect } from 'dva'
class Bridge extends PureComponent {
    state = {
        dataSource: [],
        doing_game_ids: [],
        loading: true,
    }
    aaa = (data) => {
        console.log(data);
        router.push({
            pathname: '/chesscard/bridge/gameList',
            state: {
                game_id: data.id,
                doing_table_ids: this.state.doing_game_ids,
            }
        })
    }
    componentDidMount() {
        if (this.props.login.sid) {
            this.getGameData()
        }
    }
    getGameData = async () => {
        const game = Odoo.env('og.game');
        const fields = {
            name: null
        }
        const userFields = {
            "team_player_ids": null,
            "todo_table_ids": null,
            "done_table_ids": null,
            "doing_table_ids": {
                game_id: null,
                number: null,
                match_id: null,
                room_type: null,
                round_id: null,
                date_from: null,
                date_thru: null,
                state:null,
            },
        }
        const damain = [['id', '>=', '0']];

        const clss = await Odoo.user(userFields);
        let doing_game_ids, dataSource, userdata
        try {
            userdata = clss.look(userFields);
            console.log(userdata);
            doing_game_ids = userdata.doing_table_ids.map((item) => item.game_id.id);
            dataSource = await game.search_read(damain, fields);
            this.setState({
                dataSource: PopData(dataSource, doing_game_ids),
                doing_game_ids: userdata.doing_table_ids.filter((item)=>item.state!=='done'),
                loading: false,
            });
        } catch (err) {
            alert('sid超期')
            // router.push('/login')
        }

    }
    render() {
        const { dataSource, loading } = this.state;
        console.log(dataSource);
        const style = {
            border: "2px solid red"
        }
        return (
            <Spin spinning={loading} >
                <div className="gutter-example" style={{ width: '100%', height: '100%' }}>
                    <Row gutter={16}>
                        {dataSource.map((item, index) => {
                            console.log(item);
                            return (
                                <Col
                                    key={item.name}
                                    className={styles.gutterRow}
                                    xs={24} sm={24} md={4} lg={4} xl={4}
                                    onClick={this.aaa.bind(this, item)}
                                    style={item.user ? style : null}
                                >
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

export default connect(({ login }) => ({ login }))(Bridge)
