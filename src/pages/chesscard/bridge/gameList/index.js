import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CardList from '@/components/CardList';
import TableCard from '@/components/TableCard';
import router from 'umi/router';
import { Card, Row, Col, Pagination, Spin } from 'antd';
import styles from './index.less';
import Odoo from '@/odoo'
import { async } from 'q';
class GameList extends PureComponent {
    state = {
        dataSource: [],
        loading: true,
        total: 0
    }
    componentDidMount() {
            this.getTotal()
            this.getData()
    }
    getTotal = async () => {
        const { location: { state: { game_id } } } = this.props
        const cls = Odoo.env('og.table');
        const domain = [['game_id', '=', game_id,]]
        const count = await cls.search_count(domain)

        const fields = {
            "team_player_ids": null,
            "todo_table_ids": null,
            "done_table_ids": null,
            "doing_table_ids": null,
        }
        const clss = await Odoo.user(fields);
        const ddd = clss.look(fields);
        console.log(ddd);
        await this.setState({ total: count })
    }
    getData = async (page = 1, pageSize = 8) => {
        this.setState({ loading: true })
        const { location: { state: { game_id } } } = this.props
        console.log(game_id);
        const cls = Odoo.env('og.table');
        const domain = [['game_id', '=', game_id,]]
        const fields = {
            number: null,
            match_id: null,
            room_type: null,
            round_id: null,
            date_from: null,
            date_thru: null,

        }
        const offset = (page - 1) * 8;
        const limit = pageSize;
        const dataSource = await cls.search_read(domain, fields, { offset, limit })
        this.setState({
            dataSource: dataSource,
            loading: false
        })
    }
    render() {
        const { dataSource, loading, total } = this.state;
        // const url="http://192.168.1.131:3000/search?"+'sid='+localStorage.getItem('sid')+'&uid='+localStorage.getItem('uid')
        const url='/igame/#/game/1'
        console.log(dataSource);
        return (
            <div className="gutter-example">
                <Spin spinning={loading}>
                    <Row gutter={16} type="flex" justify={"center"}>
                        {dataSource.map((item, index) => {
                            return (

                                <Col key={index} className={styles.gutterRow} xs={24} sm={12} md={8} xl={6} onClick={this.aaa}>
                                    <Card
                                        title={item.round_id.name + item.number}
                                        extra={<a target="_blank" href={url}>进入游戏</a>}>
                                        <TableCard table={item} size={30} scale={0.1} />
                                    </Card>
                                </Col>
                            )
                        })
                        }
                    </Row>
                    <Pagination
                        pageSize={8}
                        onChange={this.getData}
                        total={total} />
                </Spin>
            </div>
        )
    }
}

export default GameList