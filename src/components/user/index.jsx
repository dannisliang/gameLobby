import React, { PureComponent } from 'react';
import { Layout, Button, Icon } from 'antd';
const { Header } = Layout;
export default function UserTop(props) {
    return (
        <>
            <div>
                <Button type="primary" onClick={props.toggle} style={{ marginBottom: 16 }}>
                    <Icon type={props.collapsed ? 'menu-unfold' : 'menu-fold'} />
                </Button>
            </div>
        </>
    )
}

