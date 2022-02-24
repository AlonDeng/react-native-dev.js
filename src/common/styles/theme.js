/*
 * @Description: 
 * @Author: alon
 * @Date: 2021-10-06 17:58:21
 * @LastEditTime: 2021-10-26 15:09:01
 * @LastEditors: alon
 */

import {px} from '@utils';

const colors = {
  //背景色
  primary: '#FFFFFF', //主题色
  white: '#FFFFFF',
  lightGreyBG: '#EFEFEF',

  //底部导航栏
  bottomTag: '#FFFFFF',

  //按钮颜色
  primaryButton: '#5B87FF',
  secondButton: '#FFA700',

  //文字颜色
  primaryText: '#333333',
  blackText: '#000000',
  greyText: '#999999',
  lightGreyText: '#CCCCCC',
  shallowGreyText: '#EEEEEE',
  blueText: '#5B87FF',

  grey: '#666',
  darkGrey: '#333',
  polarGray: '#808080', // placeholder
  lightGrey: '#999',
  saturatedGrey: '#EDEDED', // 饱和的灰色
  drakBlue: '#49a3f6',
  black: '#000000',
  lightBlue: '#e4f1fe',
  orange: '#ff6633',
  darkYellow: '#e2b500',
  green: '#2eb678',
  lightYellow: '#fff4cf',
  red: '#ff0000',
  input: '#999', // 输入框线条
  bgColor: '#f3f3f3', //输入框、列表等背景色
  blockFocus: '#ffefea', //文本框被选中
  textFocus: '#ff6633', //文字被选中
  inputFocus: 'red', // 输入框被选中
  underlineColor: '#d2d2d2',
  imgBgColor: '#ffe9e2',
  tipsColor: '#909090',
  crimson: '#ff3d46',
  brickRed: '#ff3c23',
  orangeBg: '#feedd5',
};

const fonts = {
  xs: px(22),
  s: px(24),
  m: px(26),
  mx: px(28),
  l: px(30),
  lx: px(32),
  lxx: px(34),
  b: px(36),
  lb: px(40),
  t: px(52),
  tl: px(56),
};

export {colors, fonts};
