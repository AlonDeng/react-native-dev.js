/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-08 16:45:11
 * @LastEditTime: 2021-10-26 12:40:53
 * @LastEditors: alon
 */
import {
  NavigationUtil,
  AxiosCancelUtil,
  AuthorizationUtil,
  StorageUtil,
} from '@utils';
// import models from './index';
import {
  register,
  sendForgotEmail,
  requestCode,
  login,
  resetPassword,
} from '@apis/login';
import {getBlogInfo} from '@apis/home';
import {ToastCom} from '@base';
import _ from 'lodash';
import I18n from '@i18n';

const defaultState = {
  loading: false,
  isDrawer: false,
  userContract: {},
};

const delay = (ms = 1000) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });

const dispatch = (...arg) => {
  //   getDvaStore().dispatch(...arg);
};

export default {
  namespace: 'loginModel',

  state: _.cloneDeep(defaultState),

  subscriptions: {},

  reducers: {
    resetState() {
      return _.cloneDeep(defaultState);
    },
    setState(state, action) {
      return {...state, ...action.payload};
    },

    /**
     * @description 关闭loading
     */
    hideLoading(state, action) {
      return {...state, loading: false, loadInfo: null};
    },

    /**
     * @description 打开loading
     */
    showLoading(state, action) {
      return {
        ...state,
        loading: true,
        loadInfo: action?.info === '' || !action?.info ? '' : action.info,
      };
    },
  },

  effects: {
    /**
     * @description 加载
     */
    *load({}, {put}) {},

    /**
     * @description 卸载
     */
    *unload({}, {put}) {},

    /**
     * @description: 前往註冊頁面
     */
    *toRegister({payload}, {put, call, select, take}) {
      console.log('toRegister');
      try {
        yield NavigationUtil.navigate('Register');
      } catch (error) {
        console.log('toRegister ---- error', error);
      }
    },
    // 獲取郵箱驗證碼
    *requestCode({payload}, {put, call, select, take}) {
      try {
        const {fn, email} = payload;
        yield put({type: 'appModel/showLoading'});
        const res = yield call(requestCode, {email});
        if (res) {
          ToastCom.info(I18n.t('register.emailSendSuccess'));
          yield put({type: 'appModel/hideLoading'});
          fn();
        } else {
          ToastCom.info(I18n.t('register.emailSendFail'));
          yield put({type: 'appModel/hideLoading'});
        }
        // yield put({type: 'appModel/hideLoading'});
      } catch (error) {
        yield put({type: 'appModel/hideLoading'});
      }
    },
    /**
     * @description: 前往忘記密碼頁面
     */
    *toForgotPassword({payload}, {put, call, select, take}) {
      try {
        yield NavigationUtil.navigate('ForgotPassword');
      } catch (error) {
        console.log('toForgotPassword ---- error', error);
      }
    },
    /**
     * @description: 登錄
     */
    *login({payload}, {put, call, select, take}) {
      try {
        yield put({type: 'appModel/showLoading'});
        const res = yield call(login, payload);
        if (!res) {
          ToastCom.info('登錄失敗，請檢查輸入信息', 1);
        } else {
          yield put({
            type: 'personalModel/setState',
            payload: {
              userInfo: res,
            },
          });
          NavigationUtil.toBottomNav();
        }
        yield put({type: 'appModel/hideLoading'});
      } catch (error) {
        console.log('login-----error', error);
        yield put({type: 'appModel/hideLoading'});
      }
    },
    /**
     * @description: 註冊
     */
    *Register({payload}, {put, call, select, take}) {
      let userInfo = yield select(store => store.personalModel.userInfo);
      try {
        yield put({type: 'appModel/showLoading'});
        const res = yield call(register, payload);
        if (res) {
          yield put({
            type: 'personalModel/setState',
            payload: {
              userInfo: {
                ...userInfo,
                ...res,
              },
            },
          });
          NavigationUtil.toBottomNav();
          yield put({type: 'appModel/hideLoading'});
        } else {
          // ToastCom.info(I18n.t('register.code_fail'), 2);
          yield put({type: 'appModel/hideLoading'});
        }
      } catch (error) {
        console.log('Register ---- error', error);
        yield put({type: 'appModel/hideLoading'});
      }
    },
    // 重設密碼
    *resetPassword({payload}, {put, call, select, take}) {
      try {
        yield put({type: 'appModel/showLoading'});
        const res = yield call(resetPassword, payload);
        NavigationUtil.goBack();
        yield put({type: 'appModel/hideLoading'});
        ToastCom.info(I18n.t('register.emailSendSuccess'), 2);
      } catch (error) {
        yield put({type: 'appModel/hideLoading'});
      }
    },
    /**
     * @description: 發送忘記密碼email
     */
    *sendForgotEmail({payload}, {put, call, select, take}) {
      try {
        yield put({type: 'appModel/showLoading'});
        const res = yield call(sendForgotEmail, payload);
        NavigationUtil.goBack();
        yield put({type: 'appModel/hideLoading'});
        ToastCom.info('發送成功，請前往郵箱查看！', 2);
      } catch (error) {
        console.log('sendForgotEmail ---- error', error);
        yield put({type: 'appModel/hideLoading'});
      }
    },
    // 退出登陸
    *logout({payload}, {put, call, select, take}) {
      try {
        AxiosCancelUtil.getInstance().cancelAllTask();
        yield call(AuthorizationUtil.setAuthorization, null);
        StorageUtil.removeItem('LANGUAGE_STORAGE');
        yield put({type: 'appModel/resetRedux'});
        NavigationUtil.toLogin();
      } catch (error) {
        console.log(
          '🚀 ~ file: loginModel.js ~ line 374 ~ *logout ~ error',
          error,
        );
      }
    },
    // 獲取用戶協議
    *getUserContract({payload}, {put, call, select, take}) {
      try {
        yield put({type: 'appModel/showLoading'});
        const userContract = yield call(getBlogInfo, {blogId: 1572});
        yield put({
          type: 'setState',
          payload: {userContract},
        });
        yield put({type: 'appModel/hideLoading'});
      } catch (error) {
        yield put({type: 'appModel/hideLoading'});
      }
    },
  },
};
