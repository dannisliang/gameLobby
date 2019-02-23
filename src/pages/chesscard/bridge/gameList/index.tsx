/**
 * title: 游戏桌位 - 智赛棋牌
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TableCard from '@/components/TableCard';
import router from 'umi/router';
import { Pagination, Spin } from 'antd';
import Odoo from '@/odoo'
import { connect } from 'dva';
import { PopData, turnData, ChangeIndexArrayInArry } from '@/utils';
import { BridgeProps, doing_table_ids, _id } from '..';
import Search from './search';
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
    dataCache: {},
    pageConfig: {
        page: number,
        pageSize: number
    },
    domain: Array<any>
}


class GameList extends PureComponent<GameListProps, GameListState> {
    state: GameListState = {
        dataSource: [],
        loading: true,
        totalIds: [],
        doing_table_id: undefined,
        dataCache: {},
        pageConfig: {
            page: 1,
            pageSize: 8
        },
        domain: []
    }
    static getDerivedStateFromProps(props, state) {
        if (props.location.state) {
            var { location: { state: { doing_table_ids, game_id } } } = props;
        } else {
            router.replace('/chesscard/bridge')
            return { ...state }
        }


        if (doing_table_ids.length > 0) {
            return { ...state, round_id: doing_table_ids[0].round_id.id, domain: [['game_id', '=', game_id]] }
        } else {
            return { ...state, }
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

    getTotal = async (domain = []) => {
        const { location: { state: { game_id, doing_table_ids } } } = this.props;
        const cls = Odoo.env('og.table');
        console.log(this.state)
        domain = [...domain, ...[['game_id', '=', game_id,]]]
        const doing_ids = doing_table_ids.map((item) => item.id);
        const ids = await cls.search_read(domain, {}, { order: 'id' });
        await this.setState({ totalIds: ChangeIndexArrayInArry(turnData(ids), doing_ids, '') })
    }
    changeData = (domain) => {
        console.log(domain)
        const { pageConfig: { page, pageSize } } = this.state
        this.setState({ loading: true })
        const result = this.getTotal(domain)
        result.then(() => {
            this.getData(page, pageSize)
        })
    }
    /**
     * 获取数据时的起始id
     */
    getIds = async (page = 1, pageSize = 8, ) => {
        const start = (page - 1) * pageSize
        const end = pageSize * page
        const { totalIds } = this.state
        console.log(totalIds);
        return totalIds.slice(start, end).filter((item) => item)
    }
    getData = async (page = 1, pageSize = 8) => {
        const { location: { state: { doing_table_ids } } } = this.props;
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
        // 添加一个可标记的属性user，以便渲染组件区分
        dataSource.forEach((item, index) => {
            if (doing_table_ids.map((item) => item.id).indexOf(item.id) > -1) {
                dataSource[index].user = true
            }
        })

        this.setState({
            dataSource: dataSource,
            loading: false,
            pageConfig: {
                page: page,
                pageSize: pageSize
            }
        })
    }
    test = async () => {
        const { location: { state: { game_id } } } = this.props;
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
        const domain = this.state.domain || [['game_id', '=', game_id,],];
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
        const { dataSource, loading, totalIds, doing_table_id, domain } = this.state;
        const { location: { state: { game_id } } } = this.props;
        const total = totalIds.length
        // const url="http://192.168.1.131:3000/search?"+'sid='+localStorage.getItem('sid')+'&uid='+localStorage.getItem('uid')
        const url = '/igame/#/game/' + Number(doing_table_id);
        // const url='https://www.baidu.com/'
        console.log(this.state);
        return (
            <>
                <Search
                    loading={loading}
                    domain={domain}
                    changeData={this.changeData}
                    game_id={game_id}
                />
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
            </>
        )
    }
}
export default connect(({ login }) => ({ login }))(GameList)