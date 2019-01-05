import UserTop from '@/components/user';
import { Layout, Icon } from 'antd';
import styles from'./header.less';
export default function HeaderUser(props) {
    return (
        <Layout.Header style={{ background: '#fff', padding: 0 }}>
            <Icon
                className={styles.trigger}
                type={props.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={props.toggle}
            />
        </Layout.Header>
    )
}