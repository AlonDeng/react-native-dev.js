/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-07 16:24:43
 * @LastEditTime: 2021-10-07 16:26:51
 * @LastEditors: alon
 */
import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  TouchableWithoutFeedback,
  StatusBar,
  PanResponder,
} from 'react-native';
import {BlockCom} from '@base';
import {NavigationUtil} from '@utils';

const DrawerCom = props => {
  return (
    <BlockCom flex={false}>
      <Text>DrawerCom</Text>
    </BlockCom>
  );
};

export default DrawerCom;
