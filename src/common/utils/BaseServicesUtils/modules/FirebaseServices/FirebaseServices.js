import {DeviceEventEmitter} from 'react-native';
// import analytics from '@react-native-firebase/analytics';
import messaging from '@react-native-firebase/messaging';

import {StorageUtil} from '@utils';
import {ToastCom} from '@base';
import BaseServicesUtils from '../../BaseServicesUtils';

const APP_NOTIFICATION_TOKEN_KEY = 'FireBaseNotificationTokenKey';

class FirebaseServices {
  static getInstance() {
    if (!this.instance) {
      this.instance = new FirebaseServices();
    }
    return this.instance;
  }

  constructor(props) {
    this.instance = null;
    this.messagingUnsubscribes = [];
  }

  /**
   * @description 保存Notification token
   * @param {*} token
   */
  saveNotificationToken = token => {
    StorageUtil.setItem(APP_NOTIFICATION_TOKEN_KEY, token);
  };

  /**
   * @description 读取Notification token
   */
  getNotificationToken = async () => {
    let token = null;
    try {
      token = await StorageUtil.getItem(APP_NOTIFICATION_TOKEN_KEY).value;
    } catch (error) {
      console.log(
        '🚀 ~ file: FirebaseServices.js ~ line 49 ~ FirebaseServices ~ getNotificationToken= ~ error',
        error,
      );
    }
    return token;
  };

  /**
   * @description 转发Notification事件
   * @param {*} arg
   */
  notificationEventEmit = (...arg) => {
    DeviceEventEmitter.emit(BaseServicesUtils.getNotificationEventName(), arg);
  };

  /**
   * @description 初始化
   */
  mount = () => {
    this.initAnalytics();
    this.initMessaging();
    this.initCrashlytics();
  };

  /**
   * @description 卸载
   */
  unmount = () => {
    this.messagingUnsubscribes.map(unsubscribe => {
      unsubscribe();
    });
  };

  /**
   * @description 初始化崩溃捕获工具
   */
  initCrashlytics = params => {};

  getMessagingToken = async () => {
    return await this.getNotificationToken();
  };

  // 刷新通知token
  refreshMessagingToken = async () => {
    let result = null;
    // let zzz = await messaging().registerDeviceForRemoteMessages();
    console.log('123123123123------------');
    try {
      let token = await messaging().getToken();
      //   ToastCom.info(token);
      if (token) {
        console.log('refreshMessagingToken= ~ token', token);
        result = token;
        this.saveNotificationToken(token);
      }
    } catch (error) {
      console.log('🚀 ~ fi123123123123------------', error);
    }
    return result;
  };

  /**
   * @description 初始化消息推送
   */
  initMessaging = async params => {
    const requestUserPermission = async () => {
      let result = false;
      try {
        const authStatus = await messaging().requestPermission();
        result =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      } catch (error) {
        console.log(
          '🚀 ~ file: FirebaseServices.js ~ line 45 ~ FirebaseServices ~ requestUserPermission ~ error',
          error,
        );
      }
      return result;
    };

    let enabledPermission = await requestUserPermission();
    console.log('enabledPermission-----', enabledPermission);
    if (!enabledPermission) {
      return;
    }

    this.refreshMessagingToken();
    this.messagingUnsubscribes.push(
      messaging().onMessage(async remoteMessage => {
        console.log(
          '🚀 ~ file: FirebaseServices.js ~ line 84 ~ FirebaseServices ~ messaging ~ remoteMessage',
          remoteMessage,
        );
        this.notificationEventEmit({
          type: 'remote',
          content: remoteMessage?.data,
          title: remoteMessage?.messageId,
        });
      }),
    );

    this.messagingUnsubscribes.push(
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
        this.notificationEventEmit({
          type: 'backgroundMessage',
          content: remoteMessage?.data,
          title: remoteMessage?.messageId,
        });
      }),
    );

    this.messagingUnsubscribes.push(
      messaging().getInitialNotification(async remoteMessage => {
        console.log(
          '🚀 ~ file: FirebaseServices.js ~ line 98 ~ FirebaseServices ~ messaging ~ remoteMessage',
          remoteMessage,
        );
        this.notificationEventEmit({
          type: 'initialMessage',
          content: remoteMessage?.data,
          title: remoteMessage?.messageId,
        });
      }),
    );

    //后台消息(点击通知栏推送进入app后触发)
    this.messagingUnsubscribes.push(
      messaging().onNotificationOpenedApp(async remoteMessage => {
        console.log(
          '🚀 ~ file: FirebaseServices.js ~ line 103 ~ FirebaseServices ~ messaging ~ remoteMessage',
          remoteMessage,
        );
        this.notificationEventEmit({
          type: 'openedApp',
          content: remoteMessage?.data,
          title: remoteMessage?.messageId,
        });
      }),
    );
  };

  /**
   * @description 初始化分析工具
   */
  initAnalytics = params => {};

  /**
   * @description
   * @param {*} params {
   * {String} event: 埋点名
   * {Object({key:value})} params: 参数
   * }
   */
  logEvent = params => {
    try {
      // analytics().logEvent(params.event, params.params);
    } catch (error) {
      console.log(
        '🚀 ~ file: FirebaseServices.js ~ line 161 ~ FirebaseServices ~ error',
        error,
      );
    }
  };
}

export default FirebaseServices;
