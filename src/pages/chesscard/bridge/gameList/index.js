import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TableCard from '@/components/TableCard';
import router from 'umi/router';
import { Pagination, Spin } from 'antd';
import Odoo from '@/odoo'
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
            console.log(state);
            this.getTotal()
            this.getData()
        }
    }
    getTotal = async () => {
        const { location: { state: { game_id } } } = this.props
        const cls = Odoo.env('og.table');
        const domain = [['game_id', '=', game_id,]]
        const count = await cls.search_count(domain)
        await this.setState({ total: count })
    }
    getData = async (page = 1, pageSize = 8) => {
        const { location: { state: { game_id } } } = this.props
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
        const dataSource = await cls.search_read(domain, fields, { offset, limit });
        console.log(dataSource);
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
                {total > 8 ?
                    <Pagination
                        pageSize={8}
                        onChange={this.getData}
                        total={total} />
                    : null
                }
            </Spin>
        )
    }
}

export default GameList