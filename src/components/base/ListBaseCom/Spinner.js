/*
 * @Descripttion: 
 * @version: 
 * @Author: alon
 * @Date: 2020-05-14 15:49:23
 * @LastEditors: alon
 * @LastEditTime: 2021-03-09 11:46:11
 */
import React from 'react';
import {Image} from 'react-native';
import {ImageUtils, px} from '@utils';

const Spinner = () => {
  return (
    <Image
      source={ImageUtils.loading}
      style={{width: px(40), height: px(40)}}
    />
  );
};
export default Spinner;
