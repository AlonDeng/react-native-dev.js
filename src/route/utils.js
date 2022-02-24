/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-06 16:40:26
 * @LastEditTime: 2021-10-07 11:23:22
 * @LastEditors: alon
 */
/** @type {Object}
 * @description 默认页面参数
 */
const DEFAULT_OPTIONS = {
  header: () => null,
  // headerShown:false,
  gestureEnabled: false,
};

/**
 * @description 配置页面参数工具
 * @param {*} screen 页面
 * @param {*} [options={}] 页面参数
 */
const mergeNavigator = (screen, options = {}) => ({
  screen,
  navigationOptions: navigator => ({
    ...DEFAULT_OPTIONS,
    ...options,
  }),
});

export {DEFAULT_OPTIONS, mergeNavigator};
