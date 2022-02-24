import React from 'react';
import {Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import I18n from '@i18n';
import {colors, fonts} from '@styles/theme';
import * as utils from '@utils';
import {useSelector} from 'react-redux';

const {px} = utils;
const _margin = utils.margin;
const _padding = utils.padding;

const TextCom = props => {
  // static propTypes = {
  //   style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  //   size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  //   bold: PropTypes.bool,
  //   ellipsis: PropTypes.bool,
  //   numberOfLines: PropTypes.number,
  //   left: PropTypes.bool,
  //   right: PropTypes.bool,
  //   middle: PropTypes.bool,
  //   center: PropTypes.bool,
  //   radius: PropTypes.number,
  //   i18n: PropTypes.string,
  //   underline: PropTypes.bool,
  //   lineThrough: PropTypes.bool,
  //   selectable: PropTypes.bool,
  //   margin: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
  //   marginTop: PropTypes.number,
  //   marginBottom: PropTypes.number,
  //   marginLeft: PropTypes.number,
  //   marginRight: PropTypes.number,
  //   padding: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
  //   paddingTop: PropTypes.number,
  //   paddingBottom: PropTypes.number,
  //   paddingLeft: PropTypes.number,
  //   paddingRight: PropTypes.number,
  // };
  // static defaultProps = {
  //   numberOfLines: 1,
  //   selectable: false,
  // };
  const language = useSelector(state => state.appModel.language);
  // console.log('language', language);

  const {
    size,
    style, // 自定义样式
    bold, // 是否加粗
    color, // 颜色
    left, // 左对齐
    center, // 居中
    right, // 右对齐
    ellipsis, // 超出显示省略号
    numberOfLines = 1, // 超出多少行显示省略号
    underline, // 下划线
    lineThrough, // 删除线
    selectable = false, // 长按选择
    children,
    i18n,
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
    ellipsizeMode,
    isTextShadow,
    lineH = true,
    allowFontScaling = false,
    // ...props
  } = props;

  const show = () => {
    this.textRef.setNativeProps({
      style: {
        position: 'relative',
        left: 0,
      },
    });
  };

  const hide = () => {
    this.textRef.setNativeProps({
      style: {
        position: 'absolute',
        left: 10000,
      },
    });
  };

  const disposeTextFamily = () => {
    if (language === 'zh-HK' || language === 'zh') {
      return styles?.textF;
    } else {
      return styles?.textF;
    }
  };

  const textStyles = [
    styles.text,
    size && (_.isNumber(size) ? {fontSize: px(size)} : styles[size]),
    lineH &&
      (_.isNumber(lineH)
        ? {lineHeight: px(lineH)}
        : _.isNumber(size)
        ? {lineHeight: px(size * 1.3)}
        : {}),
    //   (_.isNumber(lineH) ? {lineHeight: px(lineH)} : {lineHeight: lineH}),
    // size && (_.isNumber(size) ? {fontSize: size / 2} : styles[size]),
    bold && styles.bold,
    color && (styles[color] || {color}),
    left && styles.left,
    center && styles.center,
    right && styles.right,
    underline && styles.underline,
    lineThrough && styles.lineThrough,
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
    isTextShadow && styles.textShadow,
    disposeTextFamily(),
    style && style,
  ];

  // console.log('textStyles', textStyles);

  return (
    <Text
      allowFontScaling={allowFontScaling}
      ref={ref => (this.textRef = ref)}
      style={textStyles}
      numberOfLines={(ellipsis || ellipsizeMode) && numberOfLines}
      selectable={selectable}
      ellipsizeMode={ellipsis ? 'tail' : ellipsizeMode}
      {...props}>
      {i18n && I18n.t(i18n)}
      {children && children}
    </Text>
  );
};

const styles = StyleSheet.create({
  // 文字大小
  text: {
    fontSize: fonts.m,
    color: colors.darkGrey,
  },
  xs: {
    fontSize: fonts.xs, // 22
  },
  s: {
    fontSize: fonts.s, // 24
  },
  m: {
    fontSize: fonts.m, // 26
  },
  mx: {
    fontSize: fonts.mx, // 28
  },
  l: {
    fontSize: fonts.l, // 30
  },
  lx: {
    fontSize: fonts.lx, // 32
  },
  lxx: {
    fontSize: fonts.lxx, // 34
  },
  b: {
    fontSize: fonts.b, // 36
  },
  lb: {
    fontSize: fonts.lb, // 40
  },
  t: {
    fontSize: fonts.t, // 52
  },
  tl: {
    fontSize: fonts.tl, // 56
  },
  // 文字颜色
  primary: {
    color: colors.primary,
  },
  white: {
    color: colors.white, // 白色
  },
  polarGray: {
    color: colors.polarGray, // 极性灰色
  },
  darkGrey: {
    color: colors.darkGrey, // #333
  },
  grey: {
    color: colors.grey, // #666
  },
  lightGrey: {
    color: colors.lightGrey, // #999
  },
  drakBlue: {
    color: colors.drakBlue, // #49a3f6
  },
  lightBlue: {
    color: colors.lightBlue, // #e4f1fe
  },
  darkYellow: {
    color: colors.darkYellow, // #e2b500
  },
  lightYellow: {
    color: colors.lightYellow, // #fff4cf
  },
  orange: {
    color: colors.orange, //#ff6634
  },
  green: {
    color: colors.green, // 绿色
  },
  red: {
    color: colors.red, // 红色
  },
  black: {
    color: colors.black, // 黑色
  },
  // position
  tipsColor: {
    color: colors.tipsColor, //#909090
  },
  crimson: {
    color: colors.crimson, //#ff3d46
  },
  brickRed: {
    color: colors.brickRed, //#ff3d46
  },
  left: {textAlign: 'left'},
  center: {textAlign: 'center'},
  right: {textAlign: 'right'},

  // variations
  bold: {
    fontWeight: 'bold',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  lineThrough: {
    textDecorationLine: 'line-through',
  },
  textShadow: {
    textShadowOffset: {width: 0.5, hegith: 0.5},
    textShadowRadius: 1,
    textShadowColor: 'grey',
  },
  textF: {
    fontFamily: 'Apercu Pro',
    // lineHeight: 32,
  },
  textC: {
    fontFamily: 'Noto Sans CJK Regular',
    // lineHeight: 32,
  },
});

export default TextCom;
