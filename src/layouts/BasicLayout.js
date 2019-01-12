import React from 'react';
import { Layout } from 'antd';
import SideMenu from '@/components/sideMenu';
import HeaderUser from './header';
import router from 'umi/router';
const { Content } = Layout;
class BaseLayout extends React.PureComponent {
    state = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        const { isMobile, location: { pathname } } = this.props
        const minHeight = window.screen.availHeight
        return (
            <Layout>
                {/* 侧边栏 */}
                <SideMenu collapsed={this.state.collapsed} toggle={this.toggle} isMobile={isMobile} {...this.props} />
                <Layout>
                    {/* 用户工具栏 */}
                    <HeaderUser collapsed={this.state.collapsed} toggle={this.toggle} {...this.props} />
                    {/* 内容 */}
                    <Content
                        style={{ margin: '24px 16px', padding: 24, minHeight: minHeight * 0.78, }}>
                        {this.props.children}
                    </Content>
                </Layout>

            </Layout>
        );
    }
}
export default BaseLayout