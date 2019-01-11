import React from 'react';
import { Layout, Drawer } from 'antd';
import SideMenu from '@/components/sideMenu';
import HeaderUser from './header';
import { connect } from 'dva';
import Media from 'react-media';
import router from 'umi/router';
import BaseLayout from './BasicLayout';
import LoginLayout from './LoginLayout';
const { Content } = Layout;
class LayoutConfig extends React.PureComponent {
	constructor(props){
		super(props);
		const { location: { pathname } } = this.props;
		const sid=window.localStorage.getItem('sid')
		let layout
		if(pathname==='/'&&!sid||pathname==='/login'){
			layout='login'
		}else{
			layout='basic'
		}
		console.log(layout);
		this.state={
			layout:layout
		}
	}
	render() {
		console.log(this.props);
		const { isMobile, location: { pathname } } = this.props;
		const {layout}=this.state;
		const minHeight = window.screen.availHeight;
		const sid=window.localStorage.getItem('sid')
		if ( !sid||pathname==='/login') {
			// router.push('/login')
			return <LoginLayout {...this.props}>{this.props.children}</LoginLayout>
		} else {
			console.log(2);
			// router.push('/home')
			return <BaseLayout {...this.props}> {this.props.children}</BaseLayout>
		}
	}
}
export default connect()(props => (
	<Media query="(max-width: 599px)">
		{isMobile => <LayoutConfig {...props} isMobile={isMobile} />}
	</Media>
))