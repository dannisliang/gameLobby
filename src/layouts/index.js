import React from 'react';
import { Layout, Drawer } from 'antd';
import { connect } from 'dva';
import Media from 'react-media';
import router from 'umi/router';
import BaseLayout from './BasicLayout';
import LoginLayout from './LoginLayout';
import odoo from '@/odoo'
class LayoutConfig extends React.PureComponent {
	state = {

	}
	static getDerivedStateFromProps(nextProps, prevState) {
		const { login: { sid }, location: { pathname } } = nextProps;
		if (!sid && pathname !== '/login') {
			router.replace('/login')
		}
		return { ...prevState }
	}
	componentDidMount() {
		const { login: { sid }, location: { pathname } } = this.props;
		if (pathname !== '/login') {
			this.props.dispatch({
				type: 'login/login',
				payload: {}
			})
		}
		window.addEventListener('storage',(e)=>{
			if(e.key==='sid'){
				this.props.dispatch({
					type: 'login/login',
					payload: {sid:e.newValue}
				})
			}
		})
	}
	componentWillUnmount(){
		window.removeEventListener('storage')
	}
	render() {
		console.log(this.props);
		const { sid } = this.props.login;
		if (!sid) {
			return <LoginLayout {...this.props}>{this.props.children}</LoginLayout>
		} else {
			return <BaseLayout {...this.props}> {this.props.children}</BaseLayout>
		}
	}
}
const mapStateToProps = ({ login }) => {
	return {
		login: login
	}
}
export default connect(mapStateToProps)(props => (
	<Media query="(max-width: 599px)">
		{isMobile => <LayoutConfig {...props} isMobile={isMobile} />}
	</Media>
))