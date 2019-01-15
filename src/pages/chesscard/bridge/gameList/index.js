import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CardList from '@/components/CardList';
import TableCard from '@/components/TableCard';
import router from 'umi/router';
import {Pagination, Spin } from 'antd';
// import styles from './index.less';
import Odoo from '@/odoo'
import { async } from 'q';
class GameList extends PureComponent {
    state = {
        dataSource: [],
        loading: true,
        total: 0
    }
    componentDidMount() {
        const { location: { state } } = this.props
        if (!state) {
            console.log(state);
            router.replace('/chesscard/bridge')
        } else {
            this.getTotal(state.game_id)
            this.getData(state.game_id)
        }
    }
    getTotal = async (game_id) => {
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
    getData = async (game_id,page = 1, pageSize = 8) => {
        this.setState({ loading: true })
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
        const url = '/igame/#/game/1'
        // const url='https://www.baidu.com/'
        console.log(dataSource);
        return (
            <Spin spinning={loading}>
                <TableCard
                    dataSource={dataSource}
                    size={30}
                    scale={0.1}
                    url={url}
                />
                <Pagination
                    pageSize={8}
                    onChange={this.getData}
                    total={total}
                    url={url} />
            </Spin>
        )
    }
}

export default GameList