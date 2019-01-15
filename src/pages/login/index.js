import React, { Component } from 'react';
import { Alert, Checkbox, Modal, Divider } from 'antd';
import { Link } from 'dva/router';
import styles from './index.css';
import Login from '@/components/Login';
import { connect } from 'dva';
import Odoo from '@/odoo'
import odoo from '../../odoo';
import router from 'umi/router';
// import logoPic from '../../../assets/BridgeLogo.png';
const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

console.log(Odoo);

class UserBlock extends Component {

    state = {
        notice: '',
        type: 'tab1',
        autoLogin: true,
        modalVisible: false,

        lAccount: '',
        pwd: ''
    }
    componentWillMount() {
        const sid = window.localStorage.getItem('sid');
        if (sid) {
            router.push('/home')
        }
    }
    // 账号密码错误弹窗
    showModal() {
        this.props.dispatch({
            type: 'login_m/showModal'
        });
    }
    handleOk(e) {
        this.props.dispatch({
            type: 'login_m/handleOk'
        });
    }
    handleCancel(e) {
        this.props.dispatch({
            type: 'login_m/handleCancel'
        });
    }
    //登录操作
    onSubmit = async (err, values) => {
        const { dispatch } = this.props
        const { account, password } = values;
        const sid = await odoo.login({ login: account, password: password });
        if (sid) {
            console.log(sid);
            dispatch({
                type: 'login/login',
                payload: {
                    sid: sid
                }
            })
            localStorage.setItem('userName', account);
            localStorage.setItem('pwd', password)
        } else {
            alert('登陆失败')
        }
    }
    onTabChange = (key) => {
        this.setState({
            type: key,
        });
    }
    changeAutoLogin = (e) => {
        this.setState({
            autoLogin: e.target.checked,
        });
        if (this.state.autoLogin === true) {
            localStorage.setItem('lAccount', this.state.lAccount);
            localStorage.setItem('pwd', this.state.pwd);
        } else {
            localStorage.removeItem('lAccount');
            localStorage.removeItem('pwd');
        }
    }
    render() {
        return (
            <div className={styles.loginBox} >
                <div className={styles.normal}>
                    <div style={{ textAlign: 'center' }}>
                        {/* <img src={logoPic} className={styles.logoPic}/> */}
                    </div>
                    <Login
                        defaultActiveKey={this.state.type}
                        onTabChange={this.onTabChange}
                        onSubmit={this.onSubmit}
                    >
                        <Tab key="tab1" tab="账号登录">
                            {
                                this.state.notice &&
                                <Alert
                                    style={{ marginBottom: 24 }}
                                    message={this.state.notice}
                                    type="error"
                                    showIcon
                                    closable
                                />
                            }
                            <UserName
                                name="account"
                                placeholder="账号"
                                rules={[{ required: true, message: '用户名不能为空!' }]}
                            />
                            <Password
                                name="password"
                                placeholder="密码"
                                rules={[{ required: true, message: '密码不能为空!' }]}
                            />
                        </Tab>
                        <Tab key="tab2" tab="验证码登录">
                            <Mobile
                                name="mobile"
                                placeholder="手机号"
                                rules={[{ required: true, message: '手机号不能为空!' }]}
                            />
                            <Captcha
                                onGetCaptcha={() => console.log('获取验证码......')}
                                name="captcha"
                                placeholder="验证码"
                                rules={[{ required: true, message: '验证码不能为空!' }]}
                            />
                        </Tab>
                        <div>
                            <Checkbox
                                checked={this.state.autoLogin}
                                onChange={this.changeAutoLogin}
                                className={styles.rememberPwd}
                            >
                                保持一直登录
                        </Checkbox>
                            <Link className={styles.forgetPwd} to="/user/forgetPWD">忘记密码</Link>
                        </div>
                        <Submit>登录</Submit>

                        <Divider></Divider>
                        {/* <Link className={styles.sponsorLogin} to="/user/loginSponsor">--- 主办方登录 ---</Link> */}
                    </Login>
                    <a className={styles.registerBtn} target="_blank" href='/imatch/user/register' >牌手注册</a>
                    {/* 错误弹窗 */}
                    {/* <div>
                    <Modal
                        title="提示"
                        centered
                        modalVisible={this.props.loginForm.modalVisible}
                        onOk={this.handleOk.bind(this)}
                        onCancel={this.handleCancel.bind(this)}
                        okText="确定"
                        cancelText="取消"
                    >
                        <p>账号或者密码错误，请重新输入...</p>
                    </Modal>
                </div>  */}
                </div>
            </div>
        );
    };
}


// export default UserBlock;

const mapStateToProps = ({ login }) => {


    return { login: login }
}


export default connect(mapStateToProps)(UserBlock);