import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TableCard from '@/components/TableCard';
import router from 'umi/router';
import { Pagination, Spin } from 'antd';
import Odoo from '@/odoo'
import { connect } from 'dva';
import { PopData, turnData, deleteArrayInArry } from '@/utils';
import { BridgeProps, doing_table_ids, _id } from '..';
//props,和state
interface DvaLocation extends Location {
    state: {
        game_id: number
        doing_table_ids: Array<doing_table_ids>
    },
}
interface GameListProps extends BridgeProps {
    location?: DvaLocation;
}
interface GameListState {
    dataSource: Array<doing_table_ids>,
    loading: boolean,
    totalIds: Array<number>,
    doing_table_id: doing_table_ids,
    round_id: _id,
    dataCache: {},
    domain: Array<any>
}


class GameList extends PureComponent<GameListProps, GameListState> {
    state: GameListState = {
        dataSource: [],
        loading: true,
        totalIds: [],
        doing_table_id: undefined,
        round_id: undefined,
        dataCache: {},
        domain: []
    }
    static getDerivedStateFromProps(props, state) {
        const { location: { state: { doing_table_ids, game_id } } } = props;
        if (doing_table_ids.length > 0) {
            return { ...state, round_id: doing_table_ids[0].round_id.id, domain: [['game_id', '=', game_id,]] }
        } else {
            return { ...state, domain: [['game_id', '=', game_id,]] }
        }

    }

    componentDidMount() {
        const { location: { state } } = this.props;
        if (!state) {
            router.replace('/chesscard/bridge');
        } else if (this.props.login.sid && localStorage.sid) {
            const result = this.getTotal()
            result.then(() => {
                this.getData()
            })

        }
    }

    getTotal = async () => {
        const { location: { state: { game_id, doing_table_ids } } } = this.props;
        const cls = Odoo.env('og.table');
        const domain = [['game_id', '=', game_id,]];
        const doing_ids = doing_table_ids.map((item) => item.id);
        const ids = await cls.search_read(domain, {}, { order: 'id' });
        await this.setState({ totalIds: deleteArrayInArry(turnData(ids), doing_ids, '') })
    }
    changeDomain = () => {

    }
    /**
     * 获取数据时的起始id
     */
    getIds = async (page = 1, pageSize = 8) => {
        const start = (page - 1) * pageSize
        const end = pageSize * page
        const { totalIds } = this.state
        console.log(totalIds);
        return totalIds.slice(start, end).filter((item) => item)
    }
    getDoing_table_ids = () => {
        const { location: { state: { game_id, doing_table_ids } } } = this.props;
        let trueData = []
        const ids = doing_table_ids.map((item) => item.id);

    }
    getData = async (page = 1, pageSize = 8) => {
        const { location: { state: { game_id, doing_table_ids } } } = this.props;
        let trueData = []
        const ids = doing_table_ids.map((item) => item.id);
        this.setState({ loading: true });
        const cls = Odoo.env('og.table');
        const fields = {
            number: null,
            match_id: null,
            room_type: null,
            round_id: null,
            date_from: null,
            date_thru: null,
            state: null,
        }
        const pageIds = await this.getIds(page, pageSize)
        console.log(pageIds)
        let dataSource = await cls.read(pageIds, fields);
        if (page === 1) {
            doing_table_ids.forEach(item => {
                item.user = true
            })
            dataSource = [...doing_table_ids, ...dataSource]
        }
        try {
            this.setState({
                dataSource: dataSource,
                loading: false,
            })
        } catch (err) {
            console.log('组件已卸载');
        }
    }
    test = async () => {
        const { location: { state: { game_id, doing_table_ids } } } = this.props;
        const fields = {
            number: null,
            match_id: null,
            room_type: null,
            round_id: null,
            date_from: null,
            date_thru: null,
            state: null,
            player_ids: {
                name: null
            }
        }
        const cls = Odoo.env('og.table');
        const domain = [['game_id', '=', game_id,],];
        const data = await cls.search_read(domain, fields) || [];
        console.log(data);
        const trueData = data.filter((item) => {
            if (item.state !== 'done') {
                const play = item.player_ids.map((item) => item.name);
                if (play.indexOf(localStorage.userName) > -1) {
                    return true
                }
            } else {
                return false
            }
        })
        console.log(trueData);
    }
    jump = (item, e) => {
        if (item.user && item.state !== 'done' && item.state !== 'cancel' && item.state !== 'close') {
            this.setState({
                doing_table_id: item.id
            })
            localStorage.setItem('doing_table_id', item.id)
        } else {
            alert('已经打过此桌')
            e.preventDefault()
        }
    }
    render() {
        const { dataSource, loading, totalIds, doing_table_id } = this.state;
        const total = totalIds.length
        // const url="http://192.168.1.131:3000/search?"+'sid='+localStorage.getItem('sid')+'&uid='+localStorage.getItem('uid')
        const url = '/igame/#/game/' + Number(doing_table_id);
        // const url='https://www.baidu.com/'
        console.log(this.state);
        return (
            <Spin spinning={loading}>
                <TableCard
                    dataSource={dataSource}
                    jump={this.jump}
                    size={30}
                    scale={0.1}
                    url={url}
                />
                {total > 4 ?
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

export default connect(({ login }) => ({ login }))(GameList)