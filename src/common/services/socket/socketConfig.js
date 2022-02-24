/*
 * @Description: 
 * @Author: alon
 * @Date: 2021-10-13 10:43:43
 * @LastEditTime: 2021-10-13 10:44:18
 * @LastEditors: alon
 */


import { WEBSOCKET_URL } from '../../config';

export const CHAT_HOST = WEBSOCKET_URL; // sock连接地址
export const checkWsStateTime = 5000; // 心脏阶段发送的时间
export const CHAT_KEY = '__wp-app-chat__'; // 标记联系人缓存的前缀
export const CHAT_MAX_COUNT = 100; // 聊天窗口信息的最大上限
export const WEBSOCKET_CODE = {  // websocket状态码
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3
};
