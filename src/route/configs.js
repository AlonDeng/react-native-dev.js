/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-06 16:10:44
 * @LastEditTime: 2021-11-04 14:57:17
 * @LastEditors: alon
 */
import Launch from '@pages/Launch/Launch';
import Test from '@pages/Test/Test';

// login and logout register
import Login from '@pages/Login/Login';
import EmailLogin from '@pages/Login/EmailLogin/EmailLogin';
// import LoginIndex from '/Login/LoginIndex/LoginIndex';
import LoginIndex from '@pages/Login/LoginIndex/LoginIndex';
import ForgotPassword from '@pages/Login/ForgotPassword/ForgotPassword';
import Register from '@pages/Login/Register/Register';
import UserContract from '@pages/Login/UserContract/UserContract';

// apps end //

// 根页面
const rootCom = 'Launch';

/** mainNav
 * 使用哪种路由导航栏
 * 通过修改该配置，改变路由导航栏模式
 * drawerNav 侧边导航栏
 * bottomNav 底部导航栏
 */
const mainNav = 'bottomNav';

/** drawerNavRootCom
 * 侧边导航栏下的默认页面
 */
const drawerNavRootCom = 'Home';

/** bottomNavRootCom
 * 底部导航栏下的默认页面
 */
const bottomNavRootCom = 'Home';

const configure = {
  Launch,
  Test,
  Login,
  LoginIndex,
  Register,
  ForgotPassword,
  UserContract,
  EmailLogin,
};

export default {
  configure,
  rootCom,
  mainNav,
  drawerNavRootCom,
  bottomNavRootCom,
};
