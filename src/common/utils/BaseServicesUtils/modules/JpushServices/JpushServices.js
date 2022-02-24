
// import {DeviceEventEmitter} from 'react-native';
// import JPush from 'jpush-react-native';
// import JAnalytics from 'janalytics-react-native';

// import {StorageUtil} from '@utils';

// import BaseServicesUtils from '../../BaseServicesUtils';

// const APP_NOTIFICATION_TOKEN_KEY = 'JPushNotificationTokenKey';

// class JpushServices {
//   static getInstance() {
//     if (!this.instance) {
//       this.instance = new JpushServices();
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
//     DeviceEventEmitter.emit(
//       BaseServicesUtils.getNotificationEventName(),
//       ...arg,
//     );
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
//   unmount = () => {
//     JPush.removeListener();
//   };

//   /**
//    * @description 初始化崩溃捕获工具
//    */
//   initCrashlytics = (params) => {
//     try {
//       JAnalytics.crashLogON();
//       // 开启js错误错误日志采集上报(目前只支持ios)
//       JAnalytics.rnCrashLogON();
//     } catch (error) {
//       console.log(
//         '🚀 ~ file: JpushServices.js ~ line 75 ~ JpushServices ~ error',
//         error,
//       );
//     }
//   };

//   /**
//    * @description 初始化消息推送
//    */
//   initMessaging = async (params) => {
//     JPush.init();

//     //通知回调
//     this.notificationListener = (result) => {
//       console.log('notificationListener:' + JSON.stringify(result));
//       this.notificationEventEmit({
//         type: 'remote',
//         content: result.content,
//         title: result.title,
//       });
//     };
//     JPush.addNotificationListener(this.notificationListener);

//     //本地通知回调
//     this.localNotificationListener = (result) => {
//       console.log('localNotificationListener:' + JSON.stringify(result));
//       this.notificationEventEmit({
//         type: 'local',
//         content: result.content,
//         title: result.title,
//       });
//     };
//     JPush.addLocalNotificationListener(this.localNotificationListener);

//     //自定义消息回调
//     this.customMessageListener = (result) => {
//       console.log('customMessageListener:' + JSON.stringify(result));
//       this.notificationEventEmit({
//         type: 'custom',
//         content: result.content,
//         title: result.title,
//       });
//     };
//     JPush.addCustomMessageListener(this.customMessageListener);

//     //tag alias事件回调
//     this.tagAliasListener = (result) => {
//       console.log('tagAliasListener:' + JSON.stringify(result));
//       this.notificationEventEmit({
//         type: 'tag',
//         content: result.content,
//         title: result.title,
//       });
//     };
//     JPush.addTagAliasListener(this.tagAliasListener);
//   };

//   /**
//    * @description 初始化分析工具
//    */
//   initAnalytics = (params) => {
//     try {
//       JAnalytics.init();
//     } catch (error) {
//       console.log(
//         '🚀 ~ file: JpushServices.js ~ line 122 ~ JpushServices ~ error',
//         error,
//       );
//     }
//   };

//   /**
//    * @description
//    * @param {*} params {
//    * {String} event: 埋点名
//    * {Object({key:value})} params: 参数
//    * }
//    */
//   logEvent = (params) => {
//     try {
//       JAnalytics.postEvent({
//         type: 'browse',
//         id: params.event,
//         extra: params.params, // 附加键值对，格式 {params.event: String}
//         name: params.event,
//         contentType: 'String',
//         duration: 1,
//       });
//     } catch (error) {
//       console.log(
//         '🚀 ~ file: JpushServices.js ~ line 156 ~ JpushServices ~ error',
//         error,
//       );
//     }
//   };
// }

// export default JpushServices;
