/*
 * @Description:
 * @Author: alon
 * @Date: 2021-01-30 18:09:00
 * @LastEditTime: 2021-10-25 14:58:52
 * @LastEditors: alon
 */

import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Shadow} from 'react-native-neomorph-shadows';
import BlockCom from '../BlockCom/BlockCom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import * as utils from '@utils';
import {colors} from '@styles';

const {px} = utils;
const _margin = utils.margin;
const _padding = utils.padding;
const _border = utils.border;

const defaultColor = colors.primaryButton || '#ff6633';

export default class ButtonCom extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.array]), // 按钮颜色(传递数组是渐变色，需要先设置plain为true)
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]), // 自定义样式
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 按钮宽度(不传默认跟随父级)
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 按钮高度(不传默认跟随父级)
    radius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 圆角
    plain: PropTypes.bool, // 是否使用自定义样式（true不使用默认样式，可以自定义样式）
    disabled: PropTypes.bool, // 禁止模式
    activeOpacity: PropTypes.number, // 触摸时的透明度
    // children: PropTypes.object, // 插槽
    line: PropTypes.bool, // 边框线
    margin: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
    padding: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
    border: PropTypes.oneOfType([PropTypes.func, PropTypes.array]), // 第一个参数是宽度(不传默认为1),第二个参数是线性，第三个参数是颜色
    borderBottom: PropTypes.oneOfType([PropTypes.func, PropTypes.array]), // 第一个参数是宽度(不传默认为1),第二个参数是线性，第三个参数是颜色
    linearGradientProps: PropTypes.object, // 渐变色属性
    useDebounce: PropTypes.bool, //是否开启防抖
  };

  static defaultProps = {
    plain: false,
    disabled: false,
    radius: 8,
    lineBorder: [1, defaultColor],
    linearGradientProps: {},
    useDebounce: false,
    isShadow: false,
  };

  render() {
    const {
      flex,
      bgColor: color,
      row, // 主轴方向为水平
      column, // 主轴方向为垂直
      middle, // 主轴方向为水平
      center, // 水平居中
      wrap, // 换行
      left, // 左对齐(主要看主轴方向)
      between, //两边对齐
      right, // 右对齐 (主要看主轴方向)
      top, // 顶部对齐 (主要看主轴方向)
      bottom, // 底部对齐 (主要看主轴方向)
      activeOpacity, // 按下的透明度 0~1
      plain,
      isShadow,
      style,
      width,
      height,
      radius,
      disabled,
      // border,
      // borderBottom,
      margin,
      marginTop,
      marginRight,
      marginBottom,
      marginLef,
      padding,
      paddingTop, // 元素上边距的宽度
      paddingBottom, // 元素下内边距的宽度
      paddingLeft, // 元素左内边距的宽度
      paddingRight, // 元素右内边距的宽度
      border, //边框线
      borderTop, // 元素上边距的宽度
      borderBottom, // 元素下内边距的宽度 例子：['width', 'color']
      borderLeft, // 元素左内边距的宽度
      borderRight, // 元素右内边距的宽度
      line,
      lineBorder,
      linearGradientProps,
      hitSlop,
      wh,
      children,
    } = this.props;

    // plain样式
    const plainStyle = [
      {
        backgroundColor: defaultColor,
      },
      _border(null, ...lineBorder),
    ];

    // 样式合并
    const _setStyleSheet = [
      !flex && flex === false ? {flex: 0} : flex ? {flex} : {flex: 1},
      row && styles.row,
      column && styles.column,
      middle && styles.middle,
      center && styles.center,
      between && styles.between,
      wrap && {flexWrap: 'wrap'},
      wh && flex === false
        ? {
            width: px(wh),
            height: px(wh),
          }
        : '',
      left && styles.left,
      right && styles.right,
      top && styles.top,
      bottom && styles.bottom,
      radius && {borderRadius: radius ? px(radius) : px(radius)},
      width && {width: _.isString(width) ? width : px(width)},
      height && {height: _.isString(height) ? height : px(height)},
      margin && _margin(...margin),
      marginTop && _margin(marginTop, 0, 0, 0),
      marginRight && _margin(0, marginRight, 0, 0),
      marginBottom && _margin(0, 0, marginBottom, 0),
      marginLef && _margin(0, 0, 0, marginLef),
      padding && _padding(...padding),
      paddingTop && _padding(paddingTop, 0, 0, 0),
      paddingRight && _padding(0, paddingRight, 0, 0),
      paddingBottom && _padding(0, 0, paddingBottom, 0),
      paddingLeft && _padding(0, 0, 0, paddingLeft),
      border && _border(null, ...border),
      borderTop && _border('Top', ...borderTop),
      borderRight && _border('Right', ...borderRight),
      borderBottom && _border('Bottom', ...borderBottom),
      borderLeft && _border('Left', ...borderLeft),
      line && _border(null, ...lineBorder),
      style && style,
      !plain && plainStyle, //如果plain为false，使用默认样式
      disabled && {opacity: 1},
    ];

    const _linearGradientProps = {
      start: {
        x: 0,
        y: 0,
      },
      end: {
        x: 1,
        y: 0,
      },
      ...linearGradientProps,
    };

    // 需要先使用自定义样式，color传递数组，才可以使用渐变色
    const isGradient = plain && _.isArray(color) && color.length >= 2;

    // console.log(isGradient);

    return (
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={activeOpacity}
        onPress={this._onPress.bind(this)}
        hitSlop={hitSlop}>
        {isGradient ? (
          <LinearGradient
            {..._linearGradientProps}
            colors={color}
            style={[_setStyleSheet]}>
            {children}
          </LinearGradient>
        ) : (
          <View style={[color && {backgroundColor: color}, _setStyleSheet]}>
            {children}
          </View>
        )}
      </TouchableOpacity>
    );
  }

  /**
   * 渲染按钮内元素
   * @method renderChildren
   * @return {Any}
   */
  renderChildren() {
    const {children} = this.props;
    return (
      <BlockCom flex={false} center middle>
        {children}
      </BlockCom>
    );
  }

  _onPress() {
    const {onPress = function () {}, useDebounce = false} = this.props;
    if (useDebounce) {
      if (this.debounce == null) {
        this.debounce = utils.debounce(onPress, 1000);
      }
      this.debounce();
    } else {
      onPress();
    }
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  center: {
    alignItems: 'center',
  },
  middle: {
    justifyContent: 'center',
  },
  left: {
    alignItems: 'flex-start',
  },
  between: {
    justifyContent: 'space-between',
  },
  right: {
    alignItems: 'flex-end',
  },
  top: {
    justifyContent: 'flex-start',
  },
  bottom: {
    justifyContent: 'flex-end',
  },
});
