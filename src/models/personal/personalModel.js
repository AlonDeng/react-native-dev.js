/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-08 18:24:30
 * @LastEditTime: 2021-11-04 11:27:42
 * @LastEditors: alon
 */
import {NavigationUtil, ImagePickerUtils} from '@utils';
import {ToastCom} from '@base';
import I18n from '@i18n';
// import models from './index';
import {} from '@apis/personal';
import _ from 'lodash';

const defaultState = {};

const delay = (ms = 1000) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });

const dispatch = (...arg) => {
  //   getDvaStore().dispatch(...arg);
};

export default {
  namespace: 'personalModel',

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
  },
};
