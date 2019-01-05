import React from 'react';
import { Layout } from 'antd';
import SideMenu from '@/components/sideMenu';
import HeaderUser from './header';
const {Content } = Layout;
export default class SiderDemo extends React.PureComponent {
	state = {
		collapsed: false,
	};

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	}

	render() {
		const minHeight=window.screen.availHeight 
		return (
			<Layout>
				{/* 侧边栏 */}
				<SideMenu collapsed={this.state.collapsed} />

				<Layout>
					{/* 用户工具栏 */}
					<HeaderUser collapsed={this.state.collapsed} toggle={this.toggle} />
					{/* 内容 */}
					<Content
						style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: minHeight*0.78, }}>
						Content
          			</Content>
				</Layout>

			</Layout>
		);
	}
}
