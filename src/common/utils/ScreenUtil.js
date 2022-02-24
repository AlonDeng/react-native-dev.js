/*
 * @Description: 
 * @Author: alon
 * @Date: 2021-10-06 17:50:57
 * @LastEditTime: 2021-10-06 17:52:39
 * @LastEditors: alon
 */
import {
  PixelRatio,
  Dimensions,
  Platform,
  StatusBar,
  DeviceInfo,
} from 'react-native';
export const screenW = Dimensions.get('window').width;
export const screenH = Dimensions.get('window').height;
const fontScale = PixelRatio.getFontScale();
export const pixelRatio = PixelRatio.get();
export const statusBarHeight = getStatusBarHeight();
export const screenAllH =
  Platform.OS === 'ios'
    ? Dimensions.get('screen').height
    : screenH + statusBarHeight;
// export const screenAllH = screenH; //+statusBarHeight
// 像素密度
export const DEFAULT_DENSITY = 2;
// px转换成dp
// 以iphone6为基准,如果以其他尺寸为基准的话,请修改下面的defaultWidth和defaultHeight为对应尺寸即可. 以下为1倍图时
const defaultWidth = 750;

// const defaultHeight = 1334;
const defaultHeight = 1624;
// const w2 = defaultWidth / DEFAULT_DENSITY;
// // px转换成dp
const dph = defaultHeight / DEFAULT_DENSITY;
export const scaleH = screenH / 896;

// 缩放比例
const _scaleWidth = screenW / defaultWidth;
const _scaleHeight = screenH / defaultHeight;

/**
 * 屏幕适配，根据宽度适配
 * @param {dp} size 设计图的尺寸
 */
export function setDp(size) {
  const sw = screenW / defaultWidth;
  const scale = sw;
  const sizeTemp = Math.round(size * scale);
  return sizeTemp;
}

/**
 * 屏幕适配,缩放size , 默认根据宽度适配，纵向也可以使用此方法
 * 横向的尺寸直接使用此方法
 * 如：width ,paddingHorizontal ,paddingLeft ,paddingRight ,marginHorizontal ,marginLeft ,marginRight
 * @param size 设计图的尺寸
 * @returns {number}
 */
export function px(size) {
  return size * _scaleWidth;
}

/**
 * @method: radius
 * @describe: 返回原型样式
 * @param {*} wh
 * @return {*}
 */
export function radius(wh) {
  return {
    // width: dp(wh),
    // height: dp(wh),
    // borderRadius: dp(wh),
  };
}

/**
 * 屏幕适配 , 纵向的尺寸使用此方法应该会更趋近于设计稿
 * 如：height ,paddingVertical ,paddingTop ,paddingBottom ,marginVertical ,marginTop ,marginBottom
 * @param size 设计图的尺寸
 * @returns {number}
 */
export function scaleHeight(size) {
  return size * _scaleHeight;
}

/**
 * 设置字体的size（单位px）
 * @param size 传入设计稿上的px , allowFontScaling 是否根据设备文字缩放比例调整，默认不会
 * @returns {Number} 返回实际sp
 */
export function setSpText(size, allowFontScaling = true) {
  const scale = Math.min(_scaleWidth, _scaleHeight);
  const fontSize = allowFontScaling ? 1 : fontScale;
  return (size * scale) / fontSize;
}
// export function setSpText(size) {
//   const sw = screenW / w2;
//   const sh = screenH / h2;
//   const scale = Math.min(sw, sh);
//   size = Math.round(size * scale + 0.5);
//   return (size / DEFAULT_DENSITY) * fontScale;
// }

/**
 * 判断是否为iphoneX
 * @returns {boolean}
 */
export function isIphoneX() {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (screenH === 780 ||
      screenW === 780 ||
      screenH === 812 ||
      screenW === 812 ||
      screenH === 844 ||
      screenW === 844 ||
      screenH === 896 ||
      screenW === 896 ||
      screenH === 926 ||
      screenW === 926)
  );
}

// 状态栏的高度
export function getStatusBarHeight() {
  if (Platform.OS === 'android') {
    return StatusBar.currentHeight;
  } else if (isIphoneX()) {
    return 44;
  }
  return 20;
}
