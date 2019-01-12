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
        console.log(count);
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
        console.log(dataSource);
        return (
            <div className="gutter-example">
                <Spin spinning={loading}>
                    <Row gutter={16} type="flex" justify={"center"}>
                        {dataSource.map((item, index) => {
                            return (

                                <Col key={index} className={styles.gutterRow} xs={24} sm={12} md={8} xl={6} onClick={this.aaa}>
                                    <Card title={item.round_id.name + item.number}>
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