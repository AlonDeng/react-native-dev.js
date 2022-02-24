
// import {NativeModules} from 'react-native';
// import BaseServicesUtils from '../../BaseServicesUtils';
// import {DeviceEventEmitter} from 'react-native';

// const Analytics = NativeModules.UMAnalyticsModule;
// const Push = NativeModules.UMPushModule;

// import {StorageUtil} from '@utils';
// const APP_NOTIFICATION_TOKEN_KEY = 'UMengNotificationTokenKey';

// class UmengServices {
//   static getInstance() {
//     if (!this.instance) {
//       this.instance = new UmengServices();
//     }
//     return this.instance;
//   }

//   constructor(props) {
//     this.instance = null;
//   }

//   /**
//    * @description 保存Notification token
//    * @param {*} token
//    */
//   saveNotificationToken = (token) => {
//     StorageUtil.setItem(APP_NOTIFICATION_TOKEN_KEY, token);
//   };

//   /**
//    * @description 读取Notification token
//    */
//   getNotificationToken = async () => {
//     let token = null;
//     try {
//       token = await StorageUtil.getItem(APP_NOTIFICATION_TOKEN_KEY).value;
//     } catch (error) {
//       console.log(
//         '🚀 ~ file: FirebaseServices.js ~ line 49 ~ FirebaseServices ~ getNotificationToken= ~ error',
//         error,
//       );
//     }
//     return token;
//   };

//   /**
//    * @description 转发Notification事件
//    * @param {*} arg
//    */
//   notificationEventEmit = (...arg) => {
//     DeviceEventEmitter.emit(BaseServicesUtils.getNotificationEventName(), arg);
//   };

//   /**
//    * @description 初始化
//    */
//   mount = () => {
//     this.initAnalytics();
//     this.initMessaging();
//     this.initCrashlytics();
//   };

//   /**
//    * @description 卸载
//    */
//   unmount = () => {};

//   /**
//    * @description 初始化崩溃捕获工具
//    */
//   initCrashlytics = (params) => {};

//   /**
//    * @description 初始化消息推送
//    */
//   initMessaging = async (params) => {};

//   /**
//    * @description 初始化分析工具
//    */
//   initAnalytics = (params) => {};

//   /**
//    * @description
//    * @param {*} params {
//    * {String} event: 埋点名
//    * {Object({key:value})} params: 参数
//    * }
//    */
//   logEvent = (params) => {
//     try {
//       Analytics.onEvent(params.event);
//     } catch (error) {
//       console.log(
//         '🚀 ~ file: UmengServices.js ~ line 92 ~ UmengServices ~ error',
//         error,
//       );
//     }
//   };
// }

// export default UmengServices;
