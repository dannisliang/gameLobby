import React, { PureComponent } from 'react';
import { Menu, Icon, Button, Layout } from 'antd';
import PropTypes from 'prop-types';
const SubMenu = Menu.SubMenu;
// 侧边栏
class SideMenu extends PureComponent {
	constructor(props){
		super(props);
		console.log(props);
		const {route:{routes},location:{pathname},}=props
		const menuData=this.getMenuData(routes);
		const selectkey=this.getselectkey(pathname);
		this.state={
			selectKey:selectkey,
			menuData:menuData,
		}
	}
	static propTypes = {
		collapsed: PropTypes.bool,
	}
	getselectkey=(pathname)=>{

	}
	getMenuData(routes){
		
	}
	render() {
		return (
			<Layout.Sider
				trigger={null}
				collapsible
				collapsed={this.props.collapsed}
			>
				<div></div>
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={['112']}
				// defaultOpenKeys={['sub1']}
				>
					<Menu.Item key="112">
						<Icon type="home" />
						<span>首页</span>
					</Menu.Item>
					<SubMenu key="sub1" title={<><Icon type="mail" /><span>棋牌游戏</span></>}>
						<Menu.Item key="1">桥牌</Menu.Item>
						<Menu.Item key="6">斗地主</Menu.Item>
						<Menu.Item key="7">麻将</Menu.Item>
						<Menu.Item key="8">飞行棋</Menu.Item>
					</SubMenu>
					<SubMenu key="sub2" title={<><Icon type="appstore" /><span>角色扮演</span></>}>
						<Menu.Item key="9">剑灵</Menu.Item>
						<Menu.Item key="10">天涯明月刀</Menu.Item>
						<SubMenu key="sub3" title="Submenu">
							<Menu.Item key="111">Option 11</Menu.Item>
							<Menu.Item key="121">Option 12</Menu.Item>
						</SubMenu>
					</SubMenu>
					<SubMenu key="sub4" title={<><Icon type="pie-chart" /><span>竞技游戏</span></>}>
						<Menu.Item key="12">守望先锋</Menu.Item>
						<Menu.Item key="13">英雄联盟</Menu.Item>
						<Menu.Item key="14">星际争霸</Menu.Item>
					</SubMenu>
					<Menu.Item key="2">
						<Icon type="desktop" />
						<span>单机游戏</span>
					</Menu.Item>
					<Menu.Item key="3">
						<Icon type="inbox" />
						<span>手机游戏</span>
					</Menu.Item>

				</Menu>
			</Layout.Sider>

		)
	}
}
export default SideMenu