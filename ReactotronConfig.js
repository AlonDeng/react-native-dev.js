/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-06 15:26:17
 * @LastEditTime: 2021-10-15 11:02:44
 * @LastEditors: alon
 */
import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';

import {Platform} from 'react-native';

// let remoteHost = '192.168.43.228'; // alon home
let remoteHost = '172.20.10.5'; // alon
// let remoteHost = '192.168.8.102'; // alon huawei
// let remoteHost = '192.168.0.125'; // connie

const defaultHost = Platform.select({
  // android: __DEV__ ? 'localhost' : remoteHost,
  android: remoteHost,
  ios: remoteHost,
});

const reactotron = (host = remoteHost) => {
  const log = console.log;
  global.console.log = (...res) => {
    log(...res);
    Reactotron.log(...res);
  };
  return Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
    .configure({host}) // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .connect(); // let's conn
};
export default reactotron;
