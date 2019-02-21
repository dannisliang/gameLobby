import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TableCard from '@/components/TableCard';
import router from 'umi/router';
import { Pagination, Spin } from 'antd';
import Odoo from '@/odoo'
import { connect } from 'dva';
import { PopData, turnData } from '@/utils';
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
            this.getTotal()
            this.getData()
        }
    }
    
    getTotal = async () => {
        const { location: { state: { game_id } } } = this.props;
        const cls = Odoo.env('og.table');
        const domain = [['game_id', '=', game_id,]];
        const ids = await cls.search_read(domain, {}, { order: 'id' });
        await this.setState({ totalIds: turnData(ids) })
    }
    changeDomain=()=>{
        
    }
    /**
     * 获取数据时的起始id
     */
    getKwargs = (page, pageSize) => {
        let offset: number, limit: number;
        const { location: { state: { doing_table_ids } } } = this.props;
        const doingLength: number = doing_table_ids.length
        const { dataSource } = this.state
        if (page === 1) {
            limit = pageSize - doingLength;
        } else {
            offset = dataSource[dataSource.length - 1].id - 1
            limit = pageSize;
        }
        return { offset, limit }
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
        const domain = [['game_id', '=', game_id,], ['id', 'not in', ids]];
        const fields = {
            number: null,
            match_id: null,
            room_type: null,
            round_id: null,
            date_from: null,
            date_thru: null,
            state: null,
        }
        //将用户的桌子放在第一个页显示，所有的数据桌子都要向后推移，故作此判断。
        const { offset, limit } = this.getKwargs(page, pageSize)
        console.log(page, offset, limit);
        let dataSource = await cls.search_read(domain, fields, { offset, limit, order: 'id' });
        if (doing_table_ids.length === 0) {
            const fields1 = {
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
            const data = await cls.search_read(domain, fields1) || [];
            trueData = data.filter((item) => {
                if (item.state !== 'done' && item.state !== 'cancel' && item.state !== 'close') {
                    const play: Array<string> = item.player_ids.map((item) => item.name);
                    if (play.indexOf(localStorage.userName) > -1) {
                        return true
                    }
                } else {
                    return false
                }
            })
        }
        if (page === 1) {
            doing_table_ids.forEach(item => {
                item.user = true
            })
            trueData.forEach(item => {
                item.user = true
            })
            console.log(trueData, doing_table_ids);
            if (doing_table_ids.length === 0) {
                dataSource = [...trueData, ...dataSource]
            } else {
                dataSource = [...doing_table_ids, ...dataSource]
            }

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