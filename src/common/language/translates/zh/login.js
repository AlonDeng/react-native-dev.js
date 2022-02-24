/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-08 16:17:30
 * @LastEditTime: 2021-10-26 12:34:28
 * @LastEditors: alon
 */
const emailLogin = {
  title: '登录',
  sub: '已有约3000多弟兄姐妹和他们的牧者在h.land。在这属于我们自己的数码家园，我们自己耕耘，灌溉，收割。欢迎你注册登录，与肢体彼此相交，记录你与神同行的点滴。',
  emailLogin: '邮箱登录',
  password: '密码',
  login: '登录',
  email: '邮箱/账号',
  forgotPsw: '忘记密码？',
  newMember: '新来H.Land吗？',
  registerJoin: '注册加入吧',
};

const loginIndex = {
  title: '属于我们自己的数码家园',
  subT: '由我们自己耕耘，灌溉，收割',
  register: '注册',
  alreadyAccount: '已有账户? ',
  loginIn: '立即登录',
  desc: '我们重视你的隐私注册服务即表示你接受我们的',
  terms: '使用条例',
  and: '和',
  policy: '隐私政策',
};

const register = {
  welcome: '欢迎来到H.Land~',
  desc: 'H.land 是一个创建了由我们自己耕耘，灌溉，收割的社区。在这裡，您可以自由地进行祈祷、灵修、阅读圣经...',
  name: '名称',
  youremail: '电邮',
  register: '注册',
  password: '密码',
  confirm_password: '确认密码',
  code: '邮箱验证码',
  desc2: '我们重视你的隐私注册服务即表示你接受我们的',
  terms: '使用条例',
  and: '和',
  policy: '隐私政策',
  Null: '',
  verifyPsw: '密码请设置成8位及以上大小写字母、数字溷合而成',
  verifyEmail: '此电邮无效',
  occupiedEmail: '此电邮已被佔用',
  verifyName: '请勿使用符号',
  verifyNull: '请将信息填写完整',
  emailSendSuccess: '邮件发送成功，请检测你的邮箱',
  emailSendFail: '邮箱发送失败，请检测邮箱是否填写正确/重复使用',
  password_notMatch: '两次输入的密码不匹配',
  confirmCode_not: '请输入邮箱验证码',
  code_fail: '验证码错误',
};

const forgotPassword = {
  forgotPassword: '忘记密码了吗？',
  sub: '别着急，可以使用帐户邮箱重设密码喔～',
  youremail: '您的邮箱',
  emailVerity: '邮箱验证码',
  getCode: '获取',
  setNewPsw: '设置新密码',
  reset: '重置',
  check_email: '请留意您的邮箱信息',
};

const UserContract = {
  title: 'APP使用协议以及用户协议',
};

export default {
  emailLogin,
  loginIndex,
  register,
  forgotPassword,
  UserContract,
};
