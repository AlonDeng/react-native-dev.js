/*
 * @Descripttion:
 * @version:
 * @Author: alon
 * @Date: 2020-05-14 15:49:23
 * @LastEditors: alon
 * @LastEditTime: 2021-10-22 11:45:55
 */

import React, {Component} from 'react';
import {Image, TouchableOpacity, StyleSheet, View} from 'react-native';
import {BlockCom} from '@base';
import Spinner from 'react-native-spinkit';
import PropTypes from 'prop-types';
import _ from 'lodash';

import * as utils from '@utils';

const {px} = utils;
const _margin = utils.margin;
const _padding = utils.padding;
const _border = utils.border;

const ImageStatus = {
  INIT: 0,
  LOADING: 1,
  SUCCESS: 2,
  FAIL: 3,
};

export default class ImageCom extends Component {
  static propTypes = {
    wh: PropTypes.number, //高宽
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), //宽
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), //高
    maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), //最大宽
    radius: PropTypes.number, //圆角
    margin: PropTypes.oneOfType([PropTypes.func, PropTypes.array]), // 外边距
    padding: PropTypes.oneOfType([PropTypes.func, PropTypes.array]), // 内边距
    border: PropTypes.oneOfType([PropTypes.func, PropTypes.array]), //边框线
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]), // 自定义样式
    resizeMode: PropTypes.string, //图片模式
    source: PropTypes.oneOfType([PropTypes.object, PropTypes.number]), //图片源
    defaultSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]), //占位图源
    defaultStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]), //占位图自定义样式
    failSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]), //加载失败图
    failStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]), // 加载失败图自定义样式
    loadingRender: PropTypes.oneOfType([PropTypes.element, PropTypes.func]), //自定义loading
    onPress: PropTypes.func, // 点击
    onLongPress: PropTypes.func, //长按
    memoryRecovery: PropTypes.bool, // 内存回收,组件销毁后，自动清空内存里的图片缓存
  };
  static defaultProps = {
    resizeMode: 'contain',
    memoryRecovery: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      imgStatus: ImageStatus.INIT,
    };
  }

  render() {
    let {
      wh,
      width,
      height,
      maxWidth,
      radius,
      margin,
      padding,
      border,
      style,
      resizeMode,
      source,
      defaultSource,
      defaultStyle,
      failSource,
      bgColor,
      failStyle,
      loadingRender = this._renderlodingImage,
      onPress,
      onLongPress,
      hitSlop = {},
    } = this.props;
    const styleSheet = [
      radius && {borderRadius: px(radius)},
      bgColor && {backgroundColor: bgColor},
      width && {width: _.isString(width) ? width : px(width)},
      maxWidth && {maxWidth: _.isString(maxWidth) ? maxWidth : px(maxWidth)},
      height && {height: _.isString(height) ? height : px(height)},
      wh && {
        width: px(wh),
        height: px(wh),
      },
      margin && _margin(...margin),
      padding && _padding(...padding),
      border && _border(null, ...border),
      style && style,
    ];

    return (
      <TouchableOpacity
        disabled={!onPress && !onLongPress}
        onPress={onPress && onPress}
        hitSlop={hitSlop}
        onLongPress={onLongPress && onLongPress}>
        <View>
          <Image
            style={[{resizeMode}, styleSheet]}
            resizeMethod={'resize'}
            source={source}
            onLoadStart={this.onLoadStart}
            onLoad={this.onLoad}
            onLoadEnd={this.onLoadEnd}
            onError={this.onError}
          />
          {this.isShowDefaultImage() && (
            <View style={[styles.absolute, styles.center, {zIndex: 1}]}>
              <Image
                source={defaultSource}
                style={[styleSheet, defaultStyle]}
              />
            </View>
          )}
          {this.isShowFailImage() && (
            <View style={[styles.absolute, styles.center, {zIndex: 2}]}>
              <Image source={failSource} style={[styleSheet, failStyle]} />
            </View>
          )}
          {this.isShowLoading() && (
            <View style={[styles.absolute, {flex: 1, zIndex: 3}]}>
              {loadingRender()}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }
  componentWillUnmount() {
    //从内存内清空图片缓存
    // const {source, memoryRecovery} = this.props;
    // if (memoryRecovery && _.isObject(source)) {
    //   ImageUtils.clearMemoryCache(source.uri);
    // }
  }

  isShowDefaultImage() {
    const {defaultSource, failSource} = this.props;
    const {imgStatus} = this.state;
    return (
      defaultSource &&
      (imgStatus === ImageStatus.LOADING ||
        (!failSource && imgStatus === ImageStatus.FAIL))
    );
  }

  _renderlodingImage() {
    return (
      <BlockCom flex={false} wh={160} bgColor="white" center middle>
        <Spinner isVisible size={30} type="FadingCircle" color="#FD8C8D" />
      </BlockCom>
    );
  }

  isShowFailImage() {
    const {failSource} = this.props;
    const {imgStatus} = this.state;
    return failSource && imgStatus === ImageStatus.FAIL;
  }

  isShowLoading() {
    const {loadingRender} = this.props;
    const {imgStatus} = this.state;
    return loadingRender && imgStatus === ImageStatus.LOADING;
  }

  imageStatusChange(nextStatus) {
    this.setState({imgStatus: nextStatus});
  }

  //开始加载图片
  onLoadStart = () => {
    const {onLoadStart} = this.props;
    this.imageStatusChange(ImageStatus.LOADING);
    onLoadStart && onLoadStart();
  };

  //图片加载成功
  onLoad = () => {
    const {onLoad} = this.props;
    this.imageStatusChange(ImageStatus.SUCCESS);
    onLoad && onLoad();
  };

  //图片加载动作完成，无论成功失败
  onLoadEnd = () => {
    const {onLoadEnd} = this.props;
    onLoadEnd && onLoadEnd();
  };

  //图片加载失败
  onError = () => {
    const {onError} = this.props;
    this.imageStatusChange(ImageStatus.FAIL);
    onError && onError();
  };

  /**
   * 图片预加载
   * @method preload
   * @param {Array<String>} images 图片数组
   * @return {void}
   */
  static preload(images) {
    let result;
    const formatUri = arr => {
      let res = [];
      if (_.isArray(arr)) {
        arr.forEach(element => {
          if (_.isObject(element) && element.url) {
            res.push(element.url);
          }
        });
      }
      return res;
    };
    let links = formatUri(images);
    if (links.length > 0) {
      setTimeout(() => {
        links.forEach(uri => {
          Image.prefetch(uri);
        });
      }, 300);
    }
    result = [].concat(images);
    return result;
  }
}

const styles = StyleSheet.create({
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  blackBackground: {
    backgroundColor: 'black',
  },
});
