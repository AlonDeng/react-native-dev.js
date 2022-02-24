/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-06 17:54:59
 * @LastEditTime: 2021-11-04 15:22:11
 * @LastEditors: alon
 */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {colors} from '@styles/theme';
import * as utils from '@utils';
import _ from 'lodash';

const {px, isIphoneX} = utils;
const _margin = utils.margin;
const _padding = utils.padding;
const _border = utils.border;

export default class BlockCom extends React.Component {
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    row: PropTypes.bool,
    column: PropTypes.bool,
    left: PropTypes.bool,
    right: PropTypes.bool,
    top: PropTypes.bool,
    bottom: PropTypes.bool,
    flex: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    middle: PropTypes.bool,
    center: PropTypes.bool,
    wrap: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    wh: PropTypes.number,
    radius: PropTypes.number,
    bgColor: PropTypes.string,
    margin: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
    marginTop: PropTypes.number,
    marginBottom: PropTypes.number,
    marginLeft: PropTypes.number,
    marginRight: PropTypes.number,
    padding: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
    paddingTop: PropTypes.number,
    paddingBottom: PropTypes.number,
    paddingLeft: PropTypes.number,
    paddingRight: PropTypes.number,
    between: PropTypes.bool,
    showBottomView: PropTypes.bool,
    border: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
    borderTop: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
    borderBottom: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
    borderLeft: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
    borderRight: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
  };

  render() {
    const {
      style, // 自定义样式
      flex, // 默认是1,可通过false关闭弹性效果
      row, // 主轴方向为水平
      column, // 主轴方向为垂直
      middle, // 主轴方向为水平
      center, // 水平居中
      wrap, // 换行
      children, // 内容
      left, // 左对齐(主要看主轴方向)
      between, //两边对齐
      right, // 右对齐 (主要看主轴方向)
      top, // 顶部对齐 (主要看主轴方向)
      bottom, // 底部对齐 (主要看主轴方向)
      width, // 宽度
      height, // 高度
      maxWidth, // 最大宽度
      minWidth, // 最小宽度
      maxHeight, // 最大高度
      minHeight, // 最小高度
      radius, // 圆角
      wh, // 宽高
      margin, // 外边距
      padding, // 内边距
      marginTop, // 元素上外边距的宽度
      marginBottom, // 元素下外边距的宽度
      marginLeft, // 元素左外边距的宽度
      marginRight, // 元素右外边距的宽度
      paddingTop, // 元素上边距的宽度
      paddingBottom, // 元素下内边距的宽度
      paddingLeft, // 元素左内边距的宽度
      paddingRight, // 元素右内边距的宽度
      bgColor, // 背景颜色
      color, // 背景颜色
      showBottomView, //是否是页面的根容器(适配iphoneX下面的空洞)
      bottomViewColor, //空洞的颜色
      border, //边框线
      borderTop, // 元素上边距的宽度
      borderBottom, // 元素下内边距的宽度 例子：['width', 'color']
      borderLeft, // 元素左内边距的宽度
      borderRight, // 元素右内边距的宽度
      ...props
    } = this.props;
    const _setStyleSheet = [
      !flex && flex === false ? {flex: 0} : flex ? {flex} : {flex: 1},
      row && styles.row,
      column && styles.column,
      middle && styles.middle,
      center && styles.center,
      between && styles.between,
      wrap && {flexWrap: 'wrap'},
      left && styles.left,
      right && styles.right,
      top && styles.top,
      bottom && styles.bottom,
      bgColor && (styles[bgColor] || {backgroundColor: bgColor}),
      color && (styles[color] || {backgroundColor: color}),
      radius && {borderRadius: px(radius)},
      width && flex === false
        ? {width: _.isString(width) ? width : px(width)}
        : '',
      maxWidth && flex === false
        ? {maxWidth: _.isString(maxWidth) ? maxWidth : px(maxWidth)}
        : '',
      minWidth && flex === false
        ? {minWidth: _.isString(minWidth) ? minWidth : px(minWidth)}
        : '',
      height && flex === false
        ? {height: _.isString(height) ? height : px(height)}
        : '',
      maxHeight && flex === false
        ? {maxHeight: _.isString(maxHeight) ? maxHeight : px(maxHeight)}
        : '',
      minHeight && flex === false
        ? {minHeight: _.isString(minHeight) ? minHeight : px(minHeight)}
        : '',
      wh && flex === false
        ? {
            width: px(wh),
            height: px(wh),
          }
        : '',
      margin && _margin(...margin),
      marginTop && _margin(marginTop, 0, 0, 0),
      marginRight && _margin(0, marginRight, 0, 0),
      marginBottom && _margin(0, 0, marginBottom, 0),
      marginLeft && _margin(0, 0, 0, marginLeft),
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
      style && style,
    ];

    return (
      <View ref={ref => (this.viewRef = ref)} style={_setStyleSheet} {...props}>
        {children}
        {this._genBottomView(showBottomView || false, bottomViewColor || '')}
      </View>
    );
  }

  _genBottomView(showBottomView, bottomViewColor) {
    if (isIphoneX() && showBottomView) {
      // console.log('isIphoneX() && showBottomView',isIphoneX(),isIphoneX() && showBottomView,bottomViewColor)
    }

    return isIphoneX() && showBottomView ? (
      <View style={[styles.bottomView, {backgroundColor: bottomViewColor}]} />
    ) : null;
  }

  setNativeProps(params) {
    return this.viewRef.setNativeProps(params);
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
  bottomView: {
    // iPhoneX的TabBar比普通机型的高出了底部的34
    height: 34,
    width: '100%',
  },
  // 背景颜色
  primary: {
    backgroundColor: colors.primary,
  },
  bgColor: {
    backgroundColor: colors.bgColor, // 背景色
  },
  white: {
    backgroundColor: colors.white, // 白色
  },
  orange: {
    backgroundColor: colors.orange, // 橙色
  },
  black: {
    backgroundColor: colors.black, // #000000
  },
  darkYellow: {
    backgroundColor: colors.darkYellow, // #e2b500
  },
  lightYellow: {
    backgroundColor: colors.lightYellow, // #fff4cf
  },
  lightGrey: {
    backgroundColor: colors.lightGrey, // #999
  },
  drakBlue: {
    backgroundColor: colors.drakBlue, // #49a3f6
  },
  lightBlue: {
    backgroundColor: colors.lightBlue, // #e4f1fe
  },
  saturatedGrey: {
    backgroundColor: colors.saturatedGrey, // #EDEDED
  },
  green: {
    backgroundColor: colors.green, // #2eb678
  },
  orangeBg: {
    backgroundColor: colors.orangeBg, // #eab55e
  },
  underlineColor: {
    backgroundColor: colors.underlineColor, // #D2D2D2
  },
  imgBgColor: {
    backgroundColor: colors.imgBgColor, //#ffe9e2
  },
  textFocus: {
    backgroundColor: colors.textFocus, //#ff6633
  },
});
