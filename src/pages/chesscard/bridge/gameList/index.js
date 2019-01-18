import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TableCard from '@/components/TableCard';
import router from 'umi/router';
import { Pagination, Spin } from 'antd';
import Odoo from '@/odoo'
import { PopData } from '@/utils';
class GameList extends PureComponent {
    state = {
        dataSource: [],
        loading: true,
        total: 0
    }
    componentDidMount() {
        const { location: { state } } = this.props;
        if (!state) {
            console.log(state);
            router.replace('/chesscard/bridge');
        } else {
            console.log(state);
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
        const ids = doing_table_ids.map((item) => item.game_id.id);
        console.log(ids);
        this.setState({ loading: true });
        const cls = Odoo.env('og.table');
        const domain = [['game_id', '=', game_id,],['id','not in',ids]];
        const fields = {
            number: null,
            match_id: null,
            room_type: null,
            round_id: null,
            date_from: null,
            date_thru: null,
        }
        let offset, limit
        //将用户的桌子放在第一个页显示，所有的数据桌子都要向后推移，故作此判断。
        if (page === 1) {
            limit = pageSize - doing_table_ids.length;
        } else {
            offset=this.state.dataSource[this.state.dataSource.length-1].id    
            limit = pageSize;
        }
        let dataSource = await cls.search_read(domain, fields, { offset, limit ,order:'id'});
        if(page===1){
            doing_table_ids.forEach(item => {
                item.user=true
            })
            dataSource=[...doing_table_ids,...dataSource]
        }
        this.setState({
            dataSource: dataSource,
            loading: false,
        })
    }
    render() {
        const { dataSource, loading, total } = this.state;
        // const url="http://192.168.1.131:3000/search?"+'sid='+localStorage.getItem('sid')+'&uid='+localStorage.getItem('uid')
        const url = '/igame/#/game/1';
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