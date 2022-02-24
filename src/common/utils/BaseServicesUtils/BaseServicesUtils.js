//基础服务工具类，包含埋点上报、消息推送、错误捕获
import firebase from './modules/FirebaseServices/FirebaseServices';
// import jpush from './modules/JpushServices/JpushServices';
// import umeng from './modules/UmengServices/UmengServices';

import {StorageUtil} from '@utils';
import {DeviceEventEmitter} from 'react-native';
import _ from 'lodash';

const includeModules = [firebase];
const APP_NOTIFICATION_TOKEN_KEY = 'FireBaseNotificationTokenKey';

const NOTIFICATION_EVENT_NAME = 'remote_messaging';

class BaseServicesUtils {
  getNotificationEventName = () => {
    return NOTIFICATION_EVENT_NAME;
  };

  static getInstance() {
    if (!this.instance) {
      this.instance = new BaseServicesUtils();
    }
    return this.instance;
  }

  constructor(props) {
    this.instance = null;
    this.services = [];
    this.notificationListeners = [];
  }

  /**
   * @description 执行model内的操作
   * @param {*} handle  方法名
   * @param {*} params  参数
   */
  execute = (handle, params) => {
    return this.services.map(instance => {
      let result = null;
      try {
        result = instance[handle](params);
      } catch (error) {
        console.log(
          '🚀 ~ file: BaseServicesUtils.js ~ line 39 ~ BaseServicesUtils ~ returnthis.services.map ~ error',
          handle,
          error,
        );
      }
      return result;
    });
  };

  /**
   * @description 初始化服务
   */
  mount = () => {
    includeModules.map(model => {
      let instance = model.getInstance();
      this.services.push(instance);
    });
    this.execute('mount');
  };

  /**
   * @description 关闭服务
   */
  unmount = () => {
    this.execute('unmount');
    this.removeNotificationListeners();
  };

  /**
   * @description 埋点上报
   */
  logEvent = params => {
    return this.execute('logEvent', params);
  };

  /**
   * @description 订阅推送消息
   * @params cb function(event:{type:String 类型,content:String 内容,title:String 标题}){}
   */
  addNotificationListener = cb => {
    if (_.isFunction(cb)) {
      DeviceEventEmitter.addListener(NOTIFICATION_EVENT_NAME, cb);
      this.notificationListeners.push(cb);
    }
  };

  /**
   * @description 移除所有消息推送监听
   */
  removeNotificationListeners = () => {
    DeviceEventEmitter.removeAllListeners(NOTIFICATION_EVENT_NAME);
  };

  /* 读取Notification token */
  getNotificationToken = async () => {
    let token = null;
    try {
      token = await StorageUtil.getItem(APP_NOTIFICATION_TOKEN_KEY);
    } catch (error) {
      console.log(
        '🚀 ~ file: FirebaseServices.js ~ line 49 ~ FirebaseServices ~ getNotificationToken= ~ error',
        error,
      );
    }
    console.log('BaseServicesUtils--------', token);
    return token;
  };
}

const mBaseServicesUtils = BaseServicesUtils.getInstance();

export default mBaseServicesUtils;
