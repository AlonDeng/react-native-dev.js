/*
 * @Description: 
 * @Author: alon
 * @Date: 2021-10-06 16:37:30
 * @LastEditTime: 2021-10-06 16:37:30
 * @LastEditors: alon
 */
import AsyncStorage from '@react-native-community/async-storage';

export default class StorageUtil {
  /**
   * 保存数据
   * @method setItem
   * @param {String} key 本地缓存的名称
   * @param {Object}  value 数据的键值对
   * @return {void}
   */
  static setItem(key, value) {
    AsyncStorage.setItem(key, JSON.stringify({value}));
  }

  /**
   * 获取数据
   * @method getItem
   * @param {String} key 本地缓存的名称
   * @param {Object}  value 数据的键值对
   * @return {Object}
   */
  static async getItem(key) {
    const res = await AsyncStorage.getItem(key);
    return JSON.parse(res);
  }

  /**
   * 清空指定的本地缓存
   * @method removeItem
   * @param {String} key 本地缓存的名称
   * @return
   */
  static async removeItem(key) {
    await AsyncStorage.removeItem(key);
  }
}
