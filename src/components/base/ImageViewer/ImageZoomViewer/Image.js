/*
 * @Description: 文件说明
 * @Author: alon
 * @Date: 2021-03-03 15:45:49
 * @LastEditTime: 2021-06-28 18:26:47
 * @LastEditors: alon
 */
/*
 * @Descripttion:
 * @version:
 * @Author: alon
 * @Date: 2020-05-14 15:49:23
 * @LastEditors: alon
 * @LastEditTime: 2021-03-03 15:36:47
 */

import React, {Component} from 'react';
import {Image} from 'react-native';
import {ImageUtils} from '@utils';

const isObject = obj =>
  obj && Object.prototype.toString.call(obj) === '[object Object]';
export default class ImageCom extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Image {...this.props} />;
  }
  componentWillUnmount() {
    const {source} = this.props;
    if (isObject(source)) {
      // ImageUtils.clearMemoryCache(source.uri);
    }
  }
}
