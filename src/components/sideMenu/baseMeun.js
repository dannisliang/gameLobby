import React, { PureComponent } from 'react';
import { Menu, Icon, Button, Layout, Input } from 'antd';
import PropTypes from 'prop-types';
import Link from 'umi/link'
import styles from './index.less';
const SubMenu = Menu.SubMenu;
// 侧边栏
class SideMenu extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);
		const { route: { routes }, location: { pathname }, } = props
		const config = {
			'/home': "首页",
			"/chesscard": "棋牌游戏",
			"/chesscard/bridge": "桥牌",
			"/roleplay": "角色扮演",
			"/competitive": "竞技游戏",
			"/console": "单机游戏",
			"/mobile": "手机游戏",
		}
		const menuData = this.getMenuData(routes, config);
		const selectkey = this.getselectkey(pathname);
		console.log(pathname);
		this.state = {
			selectKey: pathname,
			menuData: menuData,
		}
	}
	static propTypes = {
		collapsed: PropTypes.bool,
	}
	getselectkey = (pathname) => {

	}
	static getDerivedStateFromProps(props, state) {
		const { route: { routes }, location: { pathname }, } = props;
		if (pathname !== state.selectKey) {
			return { ...state, selectKey: pathname }
		} else {
			return { ...state }
		}
	}
	getMenuData(routes, config) {
		const path = routes.filter((item) => item.path !== '/' && item.path);
		path.forEach(item => {
			console.log(item);
			item.MenuName = config[item.path] || "无状态路由";
			// if (item.path.split('/').filter(item => item).length >= 2) {
			// 	path.forEach((minitem) => {
			// 		if (minitem.path === "/" + item.path.split('/').filter(item => item)[0]) {
			// 			if (minitem.children) {
			// 				minitem.children.push[item]
			// 			} else {
			// 				minitem.childre = [item]
			// 			}
			// 		}
			// 	})
			// }

		});
		return path
	}
	render() {
		const logo='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSIyMDBweCIgaGVpZ2h0PSIyMDBweCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+DQogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0Ny4xICg0NTQyMikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+DQogICAgPHRpdGxlPkdyb3VwIDI4IENvcHkgNTwvdGl0bGU+DQogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogICAgPGRlZnM+DQogICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0iNjIuMTAyMzI3MyUiIHkxPSIwJSIgeDI9IjEwOC4xOTcxOCUiIHkyPSIzNy44NjM1NzY0JSIgaWQ9ImxpbmVhckdyYWRpZW50LTEiPg0KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzQyODVFQiIgb2Zmc2V0PSIwJSI+PC9zdG9wPg0KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzJFQzdGRiIgb2Zmc2V0PSIxMDAlIj48L3N0b3A+DQogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+DQogICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0iNjkuNjQ0MTE2JSIgeTE9IjAlIiB4Mj0iNTQuMDQyODk3NSUiIHkyPSIxMDguNDU2NzE0JSIgaWQ9ImxpbmVhckdyYWRpZW50LTIiPg0KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzI5Q0RGRiIgb2Zmc2V0PSIwJSI+PC9zdG9wPg0KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzE0OEVGRiIgb2Zmc2V0PSIzNy44NjAwNjg3JSI+PC9zdG9wPg0KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzBBNjBGRiIgb2Zmc2V0PSIxMDAlIj48L3N0b3A+DQogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+DQogICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0iNjkuNjkwODE2NSUiIHkxPSItMTIuOTc0MzU4NyUiIHgyPSIxNi43MjI4OTgxJSIgeTI9IjExNy4zOTEyNDglIiBpZD0ibGluZWFyR3JhZGllbnQtMyI+DQogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjRkE4MTZFIiBvZmZzZXQ9IjAlIj48L3N0b3A+DQogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjRjc0QTVDIiBvZmZzZXQ9IjQxLjQ3MjYwNiUiPjwvc3RvcD4NCiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNGNTFEMkMiIG9mZnNldD0iMTAwJSI+PC9zdG9wPg0KICAgICAgICA8L2xpbmVhckdyYWRpZW50Pg0KICAgICAgICA8bGluZWFyR3JhZGllbnQgeDE9IjY4LjEyNzk4NzIlIiB5MT0iLTM1LjY5MDU3MzclIiB4Mj0iMzAuNDQwMDkxNCUiIHkyPSIxMTQuOTQyNjc5JSIgaWQ9ImxpbmVhckdyYWRpZW50LTQiPg0KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0ZBOEU3RCIgb2Zmc2V0PSIwJSI+PC9zdG9wPg0KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0Y3NEE1QyIgb2Zmc2V0PSI1MS4yNjM1MTkxJSI+PC9zdG9wPg0KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0Y1MUQyQyIgb2Zmc2V0PSIxMDAlIj48L3N0b3A+DQogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+DQogICAgPC9kZWZzPg0KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPg0KICAgICAgICA8ZyBpZD0ibG9nbyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwLjAwMDAwMCwgLTIwLjAwMDAwMCkiPg0KICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTI4LUNvcHktNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjAuMDAwMDAwLCAyMC4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMjctQ29weS0zIj4NCiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTI1IiBmaWxsLXJ1bGU9Im5vbnplcm8iPg0KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IjIiPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik05MS41ODgwODYzLDQuMTc2NTI4MjMgTDQuMTc5OTY1NDQsOTEuNTEyNzcyOCBDLTAuNTE5MjQwNjA1LDk2LjIwODExNDYgLTAuNTE5MjQwNjA1LDEwMy43OTE4ODUgNC4xNzk5NjU0NCwxMDguNDg3MjI3IEw5MS41ODgwODYzLDE5NS44MjM0NzIgQzk2LjI4NzI5MjMsMjAwLjUxODgxNCAxMDMuODc3MzA0LDIwMC41MTg4MTQgMTA4LjU3NjUxLDE5NS44MjM0NzIgTDE0NS4yMjU0ODcsMTU5LjIwNDYzMiBDMTQ5LjQzMzk2OSwxNTQuOTk5NjExIDE0OS40MzM5NjksMTQ4LjE4MTkyNCAxNDUuMjI1NDg3LDE0My45NzY5MDMgQzE0MS4wMTcwMDUsMTM5Ljc3MTg4MSAxMzQuMTkzNzA3LDEzOS43NzE4ODEgMTI5Ljk4NTIyNSwxNDMuOTc2OTAzIEwxMDIuMjAxOTMsMTcxLjczNzM1MiBDMTAxLjAzMjMwNSwxNzIuOTA2MDE1IDk5LjI1NzE2MDksMTcyLjkwNjAxNSA5OC4wODc1MzU5LDE3MS43MzczNTIgTDI4LjI4NTkwOCwxMDEuOTkzMTIyIEMyNy4xMTYyODMxLDEwMC44MjQ0NTkgMjcuMTE2MjgzMSw5OS4wNTA3NzUgMjguMjg1OTA4LDk3Ljg4MjExMTggTDk4LjA4NzUzNTksMjguMTM3ODgyMyBDOTkuMjU3MTYwOSwyNi45NjkyMTkxIDEwMS4wMzIzMDUsMjYuOTY5MjE5MSAxMDIuMjAxOTMsMjguMTM3ODgyMyBMMTI5Ljk4NTIyNSw1NS44OTgzMzE0IEMxMzQuMTkzNzA3LDYwLjEwMzM1MjggMTQxLjAxNzAwNSw2MC4xMDMzNTI4IDE0NS4yMjU0ODcsNTUuODk4MzMxNCBDMTQ5LjQzMzk2OSw1MS42OTMzMSAxNDkuNDMzOTY5LDQ0Ljg3NTYyMzIgMTQ1LjIyNTQ4Nyw0MC42NzA2MDE4IEwxMDguNTgwNTUsNC4wNTU3NDU5MiBDMTAzLjg2MjA0OSwtMC41Mzc5ODY4NDYgOTYuMjY5MjYxOCwtMC41MDA3OTc5MDYgOTEuNTg4MDg2Myw0LjE3NjUyODIzIFoiIGlkPSJTaGFwZSIgZmlsbD0idXJsKCNsaW5lYXJHcmFkaWVudC0xKSI+PC9wYXRoPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik05MS41ODgwODYzLDQuMTc2NTI4MjMgTDQuMTc5OTY1NDQsOTEuNTEyNzcyOCBDLTAuNTE5MjQwNjA1LDk2LjIwODExNDYgLTAuNTE5MjQwNjA1LDEwMy43OTE4ODUgNC4xNzk5NjU0NCwxMDguNDg3MjI3IEw5MS41ODgwODYzLDE5NS44MjM0NzIgQzk2LjI4NzI5MjMsMjAwLjUxODgxNCAxMDMuODc3MzA0LDIwMC41MTg4MTQgMTA4LjU3NjUxLDE5NS44MjM0NzIgTDE0NS4yMjU0ODcsMTU5LjIwNDYzMiBDMTQ5LjQzMzk2OSwxNTQuOTk5NjExIDE0OS40MzM5NjksMTQ4LjE4MTkyNCAxNDUuMjI1NDg3LDE0My45NzY5MDMgQzE0MS4wMTcwMDUsMTM5Ljc3MTg4MSAxMzQuMTkzNzA3LDEzOS43NzE4ODEgMTI5Ljk4NTIyNSwxNDMuOTc2OTAzIEwxMDIuMjAxOTMsMTcxLjczNzM1MiBDMTAxLjAzMjMwNSwxNzIuOTA2MDE1IDk5LjI1NzE2MDksMTcyLjkwNjAxNSA5OC4wODc1MzU5LDE3MS43MzczNTIgTDI4LjI4NTkwOCwxMDEuOTkzMTIyIEMyNy4xMTYyODMxLDEwMC44MjQ0NTkgMjcuMTE2MjgzMSw5OS4wNTA3NzUgMjguMjg1OTA4LDk3Ljg4MjExMTggTDk4LjA4NzUzNTksMjguMTM3ODgyMyBDMTAwLjk5OTg2NCwyNS42MjcxODM2IDEwNS43NTE2NDIsMjAuNTQxODI0IDExMi43Mjk2NTIsMTkuMzUyNDQ4NyBDMTE3LjkxNTU4NSwxOC40Njg1MjYxIDEyMy41ODUyMTksMjAuNDE0MDIzOSAxMjkuNzM4NTU0LDI1LjE4ODk0MjQgQzEyNS42MjQ2NjMsMjEuMDc4NDI5MiAxMTguNTcxOTk1LDE0LjAzNDAzMDQgMTA4LjU4MDU1LDQuMDU1NzQ1OTIgQzEwMy44NjIwNDksLTAuNTM3OTg2ODQ2IDk2LjI2OTI2MTgsLTAuNTAwNzk3OTA2IDkxLjU4ODA4NjMsNC4xNzY1MjgyMyBaIiBpZD0iU2hhcGUiIGZpbGw9InVybCgjbGluZWFyR3JhZGllbnQtMikiPjwvcGF0aD4NCiAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNTMuNjg1NjMzLDEzNS44NTQ1NzkgQzE1Ny44OTQxMTUsMTQwLjA1OTYgMTY0LjcxNzQxMiwxNDAuMDU5NiAxNjguOTI1ODk0LDEzNS44NTQ1NzkgTDE5NS45NTk5NzcsMTA4Ljg0MjcyNiBDMjAwLjY1OTE4MywxMDQuMTQ3Mzg0IDIwMC42NTkxODMsOTYuNTYzNjEzMyAxOTUuOTYwNTI3LDkxLjg2ODgxOTQgTDE2OC42OTA3NzcsNjQuNzE4MTE1OSBDMTY0LjQ3MjMzMiw2MC41MTgwODU4IDE1Ny42NDY4NjgsNjAuNTI0MTQyNSAxNTMuNDM1ODk1LDY0LjczMTY1MjYgQzE0OS4yMjc0MTMsNjguOTM2Njc0IDE0OS4yMjc0MTMsNzUuNzU0MzYwNyAxNTMuNDM1ODk1LDc5Ljk1OTM4MjEgTDE3MS44NTQwMzUsOTguMzYyMzc2NSBDMTczLjAyMzY2LDk5LjUzMTAzOTYgMTczLjAyMzY2LDEwMS4zMDQ3MjQgMTcxLjg1NDAzNSwxMDIuNDczMzg3IEwxNTMuNjg1NjMzLDEyMC42MjY4NDkgQzE0OS40NzcxNSwxMjQuODMxODcgMTQ5LjQ3NzE1LDEzMS42NDk1NTcgMTUzLjY4NTYzMywxMzUuODU0NTc5IFoiIGlkPSJTaGFwZSIgZmlsbD0idXJsKCNsaW5lYXJHcmFkaWVudC0zKSI+PC9wYXRoPg0KICAgICAgICAgICAgICAgICAgICA8L2c+DQogICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGlkPSJDb21iaW5lZC1TaGFwZSIgZmlsbD0idXJsKCNsaW5lYXJHcmFkaWVudC00KSIgY3g9IjEwMC41MTkzMzkiIGN5PSIxMDAuNDM2NjgxIiByeD0iMjMuNjAwMTkyNiIgcnk9IjIzLjU4MDc4NiI+PC9lbGxpcHNlPg0KICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgIDwvZz4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvc3ZnPg=='
		return (
			<Layout.Sider
				trigger={null}
				collapsible
				collapsed={this.props.collapsed}
			>
				<div className={styles.logo} id="logo">
					<Link to="/">
						<img src={logo} alt="logo" />
						<h1>Ant Design Pro</h1>
					</Link>
				</div>
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={[this.state.selectKey]}
					selectedKeys={[this.state.selectKey]}
				// defaultOpenKeys={['sub1']}
				>
					<Menu.Item key="/home">
						<Link to="/home" >
							<Icon type="home" />
							<span>首页</span>
						</Link>
					</Menu.Item>
					<SubMenu key="/chesscard" title={<><Icon type="mail" /><span>棋牌游戏</span></>}>
						<Menu.Item key="/chesscard/bridge">
							<Link to="/chesscard/bridge" >桥牌</Link>
						</Menu.Item>
						<Menu.Item key="6">斗地主</Menu.Item>
						<Menu.Item key="7">麻将</Menu.Item>
						<Menu.Item key="8">飞行棋</Menu.Item>
					</SubMenu>
					<SubMenu key="/roleplay" title={<><Icon type="appstore" /><span>角色扮演</span></>}>
						<Menu.Item key="9">剑灵</Menu.Item>
						<Menu.Item key="10">天涯明月刀</Menu.Item>
						<SubMenu key="sub3" title="Submenu">
							<Menu.Item key="111">Option 11</Menu.Item>
							<Menu.Item key="121">Option 12</Menu.Item>
						</SubMenu>
					</SubMenu>
					<SubMenu key="/competitive" title={<><Icon type="pie-chart" /><span>竞技游戏</span></>}>
						<Menu.Item key="12">守望先锋</Menu.Item>
						<Menu.Item key="13">英雄联盟</Menu.Item>
						<Menu.Item key="14">星际争霸</Menu.Item>
					</SubMenu>
					<Menu.Item key="/console">
						<Icon type="desktop" />
						<span>单机游戏</span>
					</Menu.Item>
					<Menu.Item key="/mobile">
						<Icon type="inbox" />
						<span>手机游戏</span>
					</Menu.Item>

				</Menu>
			</Layout.Sider>

		)
	}
}
export default SideMenu