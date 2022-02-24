/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-06 17:46:20
 * @LastEditTime: 2021-10-29 14:17:08
 * @LastEditors: alon
 */
import React, {useState, useRef, useEffect, useMemo} from 'react';
import {StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {BlockCom, TextCom} from '@base';

const i18nPrefix = tag => `Reserve.${tag}`;

const Reserve = props => {
  const dispatch = useDispatch();
  return (
    <BlockCom bgColor="#F2FBE9" style={{position: 'relative'}}>
      <StatusBar backgroundColor={'transparent'} translucent={true} />
      <TextCom>Reserve</TextCom>
    </BlockCom>
  );
};

export default Reserve;
