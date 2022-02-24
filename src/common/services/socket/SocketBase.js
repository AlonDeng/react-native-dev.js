
import {CHAT_HOST, WEBSOCKET_CODE} from './socketConfig';
import {connect} from 'react-redux';
import {EventEmitter, DeviceEventEmitter} from 'react-native';
import {AuthorizationUtil, getDvaStore} from '@utils';
import io from 'socket.io-client/dist/socket.io';
import {ToastCom} from '@base';

const getStore = () => {
  return getDvaStore().getState();
};

export default class SocketBase {
  static getInstance() {
    if (!this.instance) {
      this.instance = new SocketBase();
    }
    return this.instance;
  }

  constructor(props) {
    this.instance = null;
    this.Ws = null;
    this.Callback = null;
    this.token = null;
    //心跳定时器
    this.chkWsStatusInterval = null;
  }

  /**
   * @method: initWs 初始化
   * @describe:
   * @param {*} token
   * @param {*} callback
   * @return {*}
   */
  async initWs(callback) {
    let GatewayToken = await AuthorizationUtil.getAuthorization();
    // console.log('🚀 ~ 终极 CHAT_HOST', CHAT_HOST);

    if(!this.Callback){
        this.Callback = callback;
      }
      const connectionConfig = {
        jsonp: false,
        reconnection: true,
        reconnectionDelay: 100,
        reconnectionAttempts: 100000,
        transports: ['websocket'], 
        pingTimeout: 30000
       };
    this.Ws = io(CHAT_HOST);
    this.Ws?.connect();
    this.Ws.on("connect", () => {
      console.log('socket ------- 連接成功🔗');
      this.Callback && this.Callback();
    });
    this.Ws.on("disconnect", () => {
      console.log('socket ------- 斷開了 ERROR ❌🔗');
    });
    this.Ws.on("connect_error", (error) => {
      console.log('socket ------- 連接出現問題 ERROR ❌', error);
    });
    console.log('this.Ws;', this.Ws);
    return this.Ws;
    // if (GatewayToken) {
    //   // this.Ws = new io(CHAT_HOST, null, {
    //   //   headers: {GatewayToken: GatewayToken},
    //   // });
    //   this.Ws = io(CHAT_HOST, {});
    //   this.token = GatewayToken;
    //   this.Callback = callback;
    //   // if(!this.Callback){
    //   //   this.Callback = callback;
    //   // }
    //   //开启心跳定时c
    //   if (!this.chkWsStatusInterval) {
    //     this.chkWsStatusInterval = window.setInterval(
    //       this.checkWsStatues.bind(this),
    //       5000,
    //     );
    //   }

    //   this.Ws.onopen = () => {
    //     console.log('~~WS onopen~~');
    //   };
    //   this.Ws.onmessage = async (message) => {
    //     // console.log('~~WS onmessage~~', JSON.stringify(message));
    //     const result = JSON.parse(message.data);
    //     this.Callback(result);
    //     // EventEmitter.call();
    //     // dispatch({
    //     //   type: 'socketModel/onMessage',
    //     //   url,
    //     // })
    //   };
    //   this.Ws.onerror = (err) => {
    //     console.log('~~WS onerror~~', JSON.stringify(err));
    //     this.Callback(err);
    //   };
    //   this.Ws.onclose = () => {
    //     console.log('~~WS onclose~~');
    //   };
    // } else {
    //   console.log('socket init 拿不到token报错');
    // }
  }

  /**
   * @method: getWsState
   * @describe: 获取socket当前状态
   * @param {*}
   * @return {*}
   */
  getWsState() {
    return this.Ws?.connected;
  }

  /**
   * @method: closeSocket
   * @describe: 关闭socket
   * @param {*}
   * @return {*}
   */
  closeSocket() {
    //清除定时器
    // window.clearInterval(this.chkWsStatusInterval);
    // this.chkWsStatusInterval = null;
    this.Ws?.disconnect();
    return this.Ws?.disconnected;
  }

  /**
   * @method:sendMessage
   * @describe:发送消息
   * @param {*} message
   * @return {*}
   */
  sendMessage({title, data}) {
    // this.Ws.send(JSON.stringify(message));
    this.Ws?.emit(title, data);
  }

  /**
   * @method: updateOnlineStatus
   * @describe: 构建并发送个服务器的心跳数据
   * @param {*} ids
   * @param {*} memberIds
   * @return {*}
   */
  // updateOnlineStatus(ids, memberIds) {
  //   if (this.Ws && this.Ws.readyState === this.Ws.OPEN) {
  //     const timestamp = new Date().valueOf();
  //     let {roomId,isInRoom} = getStore().socketModel;


  //     const playload = {
  //       cmd: 10001,
  //       requestTime: timestamp,
  //       requestId: '',
  //       message: {isInRoom: isInRoom, roomId: roomId},
  //     };
  //     // console.log('发送心跳定时',playload);
  //     this.Ws.send(JSON.stringify(playload));
  //   }
  // }

  // /**
  //  * @method: checkWsStatues
  //  * @describe:  开启心跳检查方法
  //  * @param {*}
  //  * @return {*}
  //  */
  // checkWsStatues() {
  //   const {CLOSED} = WEBSOCKET_CODE;
  //   console.log('心跳定时');
  //   if (this.Ws?.readyState === CLOSED) {
  //     console.log('重新连接Socket', this.chkWsStatusInterval);
  //     // ToastCom.info('socket断线重连');
  //     //重连之前关闭socekt,避免出现重复的soceket去接收消息
  //     this.closeSocket();
  //     window.clearInterval(this.chkWsStatusInterval);
  //     this.chkWsStatusInterval = null;
  //     //socket断掉后,因为有可能有离线消息过来,需要重新在进入聊天详情的时候去向后台请求聊天历史记录
  //     //所以重置聊天记录里的存取标志,统一重新拉取.
  //     this.initWs(this.token, this.Callback);
  //   } else {
  //     this.updateOnlineStatus('1234', '5678');
  //   }
  // }
}

// const mapStateToProps = (state) => ({
//   currentChatData: state.chat.currentChatData,
//   myProfile: state.apps.myProfile,
//   chatMessage: state.apps.chatMessage,
// });

// const mapPopularDispatchToProps = (dispatch) => ({
//   onOpenChatSimple: ({no, chatMessage}) =>
//     dispatch(
//       actions.onOpenChatSimple({
//         no,
//         chatMessage,
//       }),
//     ),
// });
// export default connect(mapStateToProps)(SocketBase);

// var __Ws = null;//websockt对象
// let chkWsStatusInterval = null; //心跳检查定时器
// const socketBase = () => {
//   const sendMessage = (message) => {
//     console.log('0000000')
//     // __Ws.send(JSON.stringify(message));
//   };

//   return ({onopen, onmessage, onerror, onclose}) => {

//     /**
//      * @method: 创建socket连接(包含自动重连)
//      * @describe:
//      * @param {*} token
//      * @return {*}
//      */
//     const init = (token) => {
//       connectWs(token);
//       if (!chkWsStatusInterval) {
//         console.log('socket定时器重启', chkWsStatusInterval)
//         chkWsStatusInterval = window.setInterval(checkWsStatues, 15000);
//       }
//     };

//   /**
//    * 检查心脏问题
//    * @method checkWsStatues
//    * @param {String} index 当前联系人索引
//    * @return {any}
//    */
//    const checkWsStatues = async () => {

//     const { CLOSED } = WEBSOCKET_CODE;
//     if (readyState() === CLOSED) {
//       console.log("心跳重连")
//       //重连之前关闭socekt,避免出现重复的soceket去接收消息
//       closeSocket();
//       window.clearInterval(chkWsStatusInterval);
//       chkWsStatusInterval = null;

//       //socket断掉后,因为有可能有离线消息过来,需要重新在进入聊天详情的时候去向后台请求聊天历史记录,所以重置聊天记录里的存取标志,统一重新拉取.
//       //重连接口
//       // freshChatContentDataRecord();
//       initWs();

//     } else {
//       console.log("心跳发送")
//       //心跳发送
//       updateOnlineStatus('心跳id','心跳内容');
//     }
//   };

//     /**
//      * 连接sockect
//      * @method connectWs
//      * @param {String} token token
//      * @return {any}
//      */
//     const connectWs = (token) => {
//       console.log('CHAT_HOST', CHAT_HOST);
//       __Ws = new WebSocket(CHAT_HOST);
//       onopen ? (__Ws.onopen = onopen) : null;
//       onmessage ? (__Ws.onmessage = onmessage) : null;
//       onerror ? (__Ws.onerror = onerror) : null;
//       onclose ? (__Ws.onclose = onclose) : null;
//     };

//     /**
//      * 强心脏
//      * @method updateOnlineStatus
//      * @param {String} memberNo 男士Id
//      * @return {any}
//      */
//     const updateOnlineStatus = (ids, memberIds) => {
//       if (__Ws && __Ws.readyState === __Ws.OPEN) {
//         const timestamp = new Date().valueOf();
//         const playload = {
//           serial: timestamp,
//           senderId: memberIds,
//           targetId: memberIds,
//           sendTime: timestamp,
//           type: 'FEATURES',
//           content: {
//             type: 'ONLINE',
//             params: {
//               ids: ids,
//             },
//           },
//         };
//         console.log('playload-----', playload);
//         __Ws.send(JSON.stringify(playload));
//       }
//     };

//     const readyState = () => {
//       return __Ws.readyState;
//     };
//     const closeSocket = () => {
//       console.log('socket关闭');
//       return __Ws.close();
//     };
//     return {
//       connectWs,
//       updateOnlineStatus,
//       readyState,
//       sendMessage,
//       closeSocket,
//     };
//   };
// };
// export default socketBase;
