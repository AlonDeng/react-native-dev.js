/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-18 17:50:52
 * @LastEditTime: 2021-10-21 18:39:31
 * @LastEditors: alon
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {px} from '@utils';
import {StyleSheet, View} from 'react-native';
import BlockCom from '../BlockCom/BlockCom';
import TextCom from '../TextCom/TextCom';

/**
 * 徽章，无数字可不传
 */

class BadgeCountCom extends Component {
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]), //自定义样式
    count: PropTypes.number, //角标数
    color: PropTypes.string, //数字颜色
    bgColor: PropTypes.string, //背景颜色
    width: PropTypes.number, //宽度
    height: PropTypes.number, //高度
    size: PropTypes.number, //文字大小
    dot: PropTypes.bool, //显示红点
    dotSize: PropTypes.number, //显示红点大小
    size_99: PropTypes.number,
    size_9: PropTypes.number,
    size_19: PropTypes.number,
  };

  static defaultProps = {
    bgColor: '#FF4747',
    color: 'white',
    size: 16,
    dotSize: 16,
    top: 0,
    right: 0,
    size_99: 48,
    size_19: 40,
    size_9: 32,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let {
      size_99 = 48,
      size_19 = 40,
      size_9 = 32,
      count,
      bgColor,
      color,
      size,
      dot,
      dotSize,
      top,
      right,
      style,
    } = this.props;
    if (!dot && (!count || count <= 0)) {
      return null;
    }
    let width = count > 99 ? size_99 : count > 9 ? size_19 : size_9;
    let height = count > 99 ? size_99 : count > 9 ? size_19 : size_9;
    return count ? (
      <BlockCom
        flex={false}
        width={width}
        height={height}
        center
        style={{...styles?.float, top, right, ...style}}
        middle
        radius={width}
        bgColor={bgColor}>
        <TextCom color={color} size={size} center>
          {count > 99 ? '99+' : count}
        </TextCom>
      </BlockCom>
    ) : (
      <BlockCom
        style={{...styles?.float, top, right, ...style}}
        wh={dotSize}
        bgColor={bgColor}
        flex={false}
        radius={dotSize}
      />
    );
  }
}

const styles = StyleSheet.create({
  float: {
    position: 'absolute',
    // position: 'relative',
  },
});

export default BadgeCountCom;
