/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-06 16:17:00
 * @LastEditTime: 2021-11-02 10:59:03
 * @LastEditors: alon
 */
import {BackHandler} from 'react-native';
import {StorageUtil, TimeUtil, BaseServicesUtils, NavigationUtil} from '@utils';
import I18n from '@i18n';
import {uploadCloudToken} from '@apis/app';
import models from './index';
import _ from 'lodash';

const defaultState = {
  loading: false,
  isDrawer: false,
  language: null,
};

const delay = (ms = 1000) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });

const dispatch = (...arg) => {
  //   getDvaStore().dispatch(...arg);
};

export default {
  namespace: 'appModel',

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
      return {...state, loading: false, loadInfo: null, isUpdata: false};
    },

    /**
     * @description 打开loading
     */
    showLoading(state, action) {
      return {
        ...state,
        loading: true,
        loadInfo: _.get(action, 'payload.loadInfo', '') || '',
        isUpdata: _.get(action, 'payload.isUpdata', false),
        progress: _.get(action, 'payload.progress', 0),
      };
    },
    hideDrawer(state, action) {
      return {...state, isDrawer: false};
    },
    showDrawer(state, action) {
      return {...state, isDrawer: true};
    },
  },

  effects: {
    /**
     * @description 加载
     */
    *load({}, {put, select}) {
      yield put({type: 'initLanguage'});
      // yield put({type: 'registerBackHandler'});
      // 雲推送服務接入，token上傳將在launchModel執行
      // BaseServicesUtils.mount();
      // BaseServicesUtils.addNotificationListener(event => {
      //   console.log(
      //     '🚀 ~ file: appModel.js ~ line 60 ~ BaseServicesUtils.addNotificationListener ~ event',
      //     event,
      //   );
      //   if (event[0]?.type === 'openedApp') {
      //     switch (event[0]?.content?.type) {
      //       case 'chat':
      //         NavigationUtil.toBottomNav();
      //         NavigationUtil.navigate('Chat');
      //         break;
      //       case 'prayer':
      //         NavigationUtil.toBottomNav();
      //         NavigationUtil.navigate('MyPrayerGroup', {
      //           groupId: event[0]?.content?.groupId,
      //         });
      //         break;
      //       default:
      //         break;
      //     }
      //   }
      // });
    },

    /**
     * @description 卸载
     */
    *unload({}, {put}) {
      yield put({type: 'unregisterBackHandler'});
      yield put({type: 'unAppState'});
    },

    /**
     * @description 注册后退按钮的监听
     */
    *registerBackHandler({}, {put, select}) {
      const state = yield select(store => store.appModel);
      if (state.onHardwareBackPress == null) {
        const onHardwareBackPress = () => {
          //   CertificationVideoPlayUtil.clearPreTime();
          console.log('🚀 ~ file: app.js ~ line 48.1 ~ onHardwareBackPress');
          return false;
        };
        BackHandler.addEventListener('hardwareBackPress', onHardwareBackPress);
        yield put({type: 'setState', payload: {onHardwareBackPress}});
      }
    },

    /* 上傳雲推送服務token */
    *uploadCloudToken({payload}, {put, call, select, take}) {
      try {
        const uploadCloudToken_info = yield call(uploadCloudToken, payload);
      } catch (error) {
        console.log('error------uploadCloudToken', error);
      }
    },

    // 是否展示app底部bar
    *changeIsBottomBar({payload}, {put, select}) {
      // const {flag = true} = payload;
      // try {
      //   yield put({type: 'setState', payload: {isBottomBar: flag}});
      // } catch (error) {}
    },

    /**
     * @description 注销后退按钮的监听
     */
    *unregisterBackHandler({}, {select}) {
      const state = yield select(store => store.appModel);
      if (state.onHardwareBackPress != null) {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          state.onHardwareBackPress,
        );
      }
    },
    /**
     * @description 重置redux
     */
    *resetRedux({payload}, {put, call, select, take}) {
      for (let index = 0; index < models.length; index++) {
        const namespace = models[index].namespace;
        if (namespace !== 'appModel') {
          yield put({type: `${namespace}/resetState`});
        }
      }
    },
    /**
     * @description 改变语言
     */
    *initLanguage({payload}, {put, call}) {
      try {
        let language = I18n.locale;
        language = language.split('_')[0];
        let storagelanguage = yield call(
          StorageUtil.getItem,
          'LANGUAGE_STORAGE',
        );
        if (storagelanguage && storagelanguage?.value) {
          language = storagelanguage?.value;
        }
        yield put({type: 'setLanguage', payload: language});
      } catch (error) {
        console.log(
          '🚀 ~ file: appModel.js ~ line 145 ~ *initLanguage ~ error',
          error,
        );
      }
    },
    /**
     * @description 改变语言
     */
    *setLanguage({payload}, {put}) {
      try {
        I18n.setLanguage(payload);
        StorageUtil.setItem('LANGUAGE_STORAGE', payload);
        TimeUtil.initMoment();
        yield put({type: 'setState', payload: {language: payload}});
        yield put({type: 'showLoading'});
        yield delay(1000);
        yield put({type: 'hideLoading'});
      } catch (error) {
        console.log(
          '🚀 ~ file: appModel.js ~ line 169 ~ *setLanguage ~ error',
          error,
        );
      }
    },
  },
};
