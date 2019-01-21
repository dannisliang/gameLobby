import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TableCard from '@/components/TableCard';
import router from 'umi/router';
import { Pagination, Spin } from 'antd';
import Odoo from '@/odoo'
import { connect } from 'dva';
import { PopData } from '@/utils';
import { async } from 'q';
class GameList extends PureComponent {
    state = {
        dataSource: [],
        loading: true,
        total: 0,
        doing_table_id: undefined,
    }
    componentDidMount() {
        const { location: { state } } = this.props;
        if (!state) {
            router.replace('/chesscard/bridge');
        } else if (this.props.login.sid) {
            this.getTotal()
            this.getData()
        }
    }
    getTotal = async () => {
        const { location: { state: { game_id } } } = this.props;
        const cls = Odoo.env('og.table');
        const domain = [['game_id', '=', game_id,]];
        const count = await cls.search_count(domain);
        await this.setState({ total: count })
    }
    getData = async (page = 1, pageSize = 8) => {
        const { location: { state: { game_id, doing_table_ids } } } = this.props;
        let trueData

        const ids = doing_table_ids.map((item) => item.game_id.id);
        console.log(ids);
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
        let offset, limit
        //将用户的桌子放在第一个页显示，所有的数据桌子都要向后推移，故作此判断。
        if (page === 1) {
            limit = pageSize - doing_table_ids.length;
        } else {
            offset = this.state.dataSource[this.state.dataSource.length - 1].id
            limit = pageSize;
        }
        let dataSource = await cls.search_read(domain, fields, { offset, limit, order: 'id' });
        if (doing_table_ids.length === 0) {
            const { location: { state: { game_id, doing_table_ids } } } = this.props;
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
                if (item.state !== 'done') {
                    const play = item.player_ids.map((item) => item.name);
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
            console.log(trueData);
            dataSource = [...trueData, ...dataSource]
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
        if (item.user && item.state !== 'done' && item.state !== 'cancel') {
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
        const { dataSource, loading, total, doing_table_id } = this.state;
        // const url="http://192.168.1.131:3000/search?"+'sid='+localStorage.getItem('sid')+'&uid='+localStorage.getItem('uid')
        const url = '/igame/#/game/' + Number(doing_table_id);
        // const url='https://www.baidu.com/'
        console.log(dataSource);
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