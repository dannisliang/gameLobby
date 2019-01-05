import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Layout, Button, Icon } from 'antd';
import HeaderSearch from '@/components/GlobalSearch';
import styles from './user.less';
// 用户工具栏的右边，头像
function UserTop(props) {
    return (
        <div className={styles.user}>
            <HeaderSearch
                placeholder="站内搜索"
                dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
                onSearch={(value) => {
                    console.log('input', value); // eslint-disable-line
                }}
                onPressEnter={(value) => {
                    console.log('enter', value); // eslint-disable-line
                }} />
            <span>
                
            </span>
        </div>
    )
}
UserTop.propTypes={

}
export default UserTop
