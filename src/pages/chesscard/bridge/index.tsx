/**
 * title: 桥牌 - 智赛棋牌
 */
import React, { PureComponent } from 'react';
import PropTypes, { number } from 'prop-types';
import router from 'umi/router';
import { Card, Row, Col, Spin } from 'antd';
import styles from './index.less';
import Odoo from '@/odoo';
import { PopData } from '@/utils';
import { connect } from 'dva'
//组件props和state接口
interface login {
    sid: String
}
export interface DvaLocation extends Location {
    state: any,
}
export interface BridgeProps extends React.Props<any> {
    history?: History;
    location?: DvaLocation;
    login: login;
}
export interface BridgeState {
    dataSource: Array<userData>,
    doing_game_ids: Array<doing_table_ids>,
    loading: boolean,
}

//后台数据接口
export interface _id {
    id: number,
    name: string,
    user?: boolean,
}
export interface doing_table_ids extends _id {
    game_id: _id
    number?: number,
    match_id: _id,
    room_type: string,
    round_id: _id,
    date_from: string,
    date_thru: string,
    state: string,
}
export interface userData extends _id {
    team_player_ids: Array<number>,
    todo_table_ids: Array<number>,
    done_table_ids: Array<number>,
    doing_table_ids: doing_table_ids,
}

class Bridge extends PureComponent<BridgeProps, BridgeState> {
    state: BridgeState = {
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
                doing_table_ids: this.state.doing_game_ids.filter((item) => item.game_id.id === data.id),//只传递属于该game的doing_table_ids
            }
        })
    }
    componentDidMount() {
        if (this.props.login.sid && localStorage.sid) {
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
                state: null,
            },
        }
        const damain: Array<Array<string>> = [['id', '>=', '0']];

        const clss = await Odoo.user(userFields);
        let doing_game_ids, dataSource, userdata
        try {
            userdata = clss.look(userFields);
            console.log(userdata);
            doing_game_ids = userdata.doing_table_ids.map((item) => item.game_id.id);
            dataSource = await game.search_read(damain, fields);
            this.setState({
                dataSource: PopData(dataSource, doing_game_ids),
                doing_game_ids: userdata.doing_table_ids.filter((item) => item.state !== 'done'),
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
        };
        return (
            <Spin spinning={loading} >
                <div className="gutter-example" style={{ width: '100%', height: '100%' }}>
                    <Row gutter={16}>
                        {dataSource.map((item, index) => {
                            return (
                                <Col
                                    key={item.name}
                                    className={styles.gutterRow}
                                    xs={24} sm={24} md={4} lg={4} xl={4}
                                    onClick={this.aaa.bind(this, item)}
                                    style={item.user ? style : null}>
                                    <Card title={item.id}> {item.name} </Card>
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
