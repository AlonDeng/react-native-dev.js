/*
 * @Descripttion:
 * @version:
 * @Author: alon
 * @Date: 2021-03-23 15:39:01
 * @LastEditors: alon
 * @LastEditTime: 2021-06-10 17:22:33
 */
import {Toast} from '@ant-design/react-native';

const success = (content, duration = 1, onClose, mask = false) =>
  Toast.success(content, duration, onClose, mask);
const fail = (content, duration = 1, onClose, mask = false) =>
  Toast.fail(content, duration, onClose, mask);
const info = (content, duration = 1, onClose, mask = false) =>
  Toast.info(content, duration, onClose, mask);
const loading = (content, duration = 1, onClose, mask = false) =>
  Toast.loading(content, duration, onClose, mask);
const offline = (content, duration = 1, onClose, mask = false) =>
  Toast.offline(content, duration, onClose, mask);

export default {
  success,
  fail,
  info,
  loading,
  offline,
};
