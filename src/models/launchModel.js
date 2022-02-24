/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-06 16:25:23
 * @LastEditTime: 2021-11-02 17:11:17
 * @LastEditors: alon
 */
import {
  NavigationUtil,
  AuthorizationUtil,
  getDvaStore,
  BaseServicesUtils,
} from '@utils';
import _ from 'lodash';
import {Platform} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import SplashScreen from 'react-native-splash-screen';

const dispatch = (...arg) => {
  getDvaStore().dispatch(...arg);
};

const defaultState = {};

export default {
  namespace: 'launchModel',

  state: _.cloneDeep(defaultState),

  subscriptions: {},

  reducers: {
    resetState() {
      return _.cloneDeep(defaultState);
    },
    setState(state, action) {
      return {...state, ...action.payload};
    },
  },

  effects: {
    /**
     * @description 加载
     */
    *load({payload}, {put, call, select, take}) {
      if (_.isObject(payload)) {
        payload.navigation &&
          NavigationUtil.setNavigation(payload.navigation, payload?.route);
      }
      // ---------
      // let token = yield call(AuthorizationUtil.getAuthorization);
      // // console.log('token', token);
      // if (token == null) {
      //   NavigationUtil.toLogin();
      //   SplashScreen.hide();
      // } else {
      //   // 跳转到主页
      //   yield put({type: 'loadAppBusiness'});
      // }
      //-------
      // NavigationUtil.toLogin();
      // NavigationUtil.toLoginIndex();
      NavigationUtil.toBottomNav();
      // NavigationUtil.navigate('Login');
      // NavigationUtil.navigate('CommunityItem');
      // NavigationUtil.navigate('UserLabel');
      // NavigationUtil.navigate('Test'); // alon test -> don't move
      // SplashScreen.hide();
    },
    /**
     * @description 卸载
     */
    *unload({}, {put}) {
      // BackgroundTimer.stopBackgroundTimer();
    },

    /**
     * @description 加载app业务
     */
    *loadAppBusiness({payload}, {put, call, select, take}) {
      // yield put({type: 'personalModel/getInfo'});
      // yield take('personalModel/getInfo/@@end'); //等待获取baseinfo结束
      // SplashScreen.hide();
      // const userInfo = yield select(store => store.personalModel?.userInfo);
      // const data = yield BaseServicesUtils.getNotificationToken();
      // let tokenData = null;
      // if (data?.value) {
      //   if (Platform.OS === 'android') {
      //     tokenData = {
      //       android: data?.value,
      //       userId: userInfo?.id,
      //     };
      //   } else {
      //     tokenData = {
      //       ios: data?.value,
      //       userId: userInfo?.id,
      //     };
      //   }
      //   yield put({type: 'appModel/uploadCloudToken', payload: tokenData});
      // }
      // NavigationUtil.toBottomNav();
      // BackgroundTimer.runBackgroundTimer(() => {
      //   dispatch({type: 'chatModel/getChatList'});
      // }, 30000);
      // dispatch({type: 'signModel/checkSignInStatus'});
      // BackgroundTimer.runBackgroundTimer(() => {
      //   dispatch({type: 'signModel/checkSignInStatus'});
      // }, 3600000);
      // let baseinfo = yield select((store) => store.personalModel);
      // 初始化IM服务
      //   yield put({type: 'chatModel/init'});
      //   //socket实例化
      //   yield put({type: 'socketModel/initSocket'});
    },
  },
};
