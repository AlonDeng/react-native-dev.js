/*
 * @Description: 
 * @Author: alon
 * @Date: 2021-10-07 17:23:26
 * @LastEditTime: 2021-10-07 17:23:27
 * @LastEditors: alon
 */
import {px, scaleHeight, screenW} from './ScreenUtil';

const _setMP = (arg, name) => {
  const _length = arg.length;
  const keys = {
    1: {
      [`${name}Top`]: px(arg[0]),
      [`${name}Right`]: px(arg[0]),
      [`${name}Bottom`]: px(arg[0]),
      [`${name}Left`]: px(arg[0]),
    },
    2: {
      [`${name}Vertical`]: px(arg[0]),
      [`${name}Horizontal`]: px(arg[1]),
    },
    3: {
      [`${name}Top`]: px(arg[0]),
      [`${name}Horizontal`]: px(arg[1]),
      [`${name}Bottom`]: px(arg[2]),
    },
    4: {
      [`${name === 'hitSlop' ? 'top' : name + 'Top'}`]: px(arg[0]),
      [`${name === 'hitSlop' ? 'right' : name + 'Right'}`]: px(arg[1]),
      [`${name === 'hitSlop' ? 'bottom' : name + 'Bottom'}`]: px(arg[2]),
      [`${name === 'hitSlop' ? 'left' : name + 'Left'}`]: px(arg[3]),
    },
  };
  return keys[_length];
};

export const padding = (...arg) => _setMP(arg, 'padding');
export const margin = (...arg) => _setMP(arg, 'margin');
export const hitSlop = (...arg) => _setMP(arg, 'hitSlop');
export const border = (...arg) => {
  const widthItem = `border${arg[0] ? arg[0] : ''}Width`;
  return {
    [widthItem]: px(arg[1] || 0),
    borderStyle: 'solid',
    borderColor: arg[2],
  };
};
