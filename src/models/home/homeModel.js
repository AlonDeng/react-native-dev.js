/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-20 17:50:15
 * @LastEditTime: 2021-11-02 10:17:08
 * @LastEditors: alon
 */
import {NavigationUtil} from '@utils';
import SplashScreen from 'react-native-splash-screen';
// import models from './index';
import {} from '@apis/home';
import _ from 'lodash';

const defaultState = {
};

const delay = (ms = 1000) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });

const dispatch = (...arg) => {
  //   getDvaStore().dispatch(...arg);
};

export default {
  namespace: 'homeModel',

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
      try {
        yield put({type: 'appModel/showLoading'});
        yield put({type: 'appModel/hideLoading'});
        // SplashScreen.hide();
      } catch (error) {
        yield put({type: 'appModel/hideLoading'});
        // SplashScreen.hide();
      }
    },

    /**
     * @description 卸载
     */
    *unload({}, {put}) {},
  },
};
