/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-06 17:41:18
 * @LastEditTime: 2021-11-02 17:28:03
 * @LastEditors: alon
 */
import React, {useState, useRef, useEffect, useMemo} from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import I18n from '@i18n';
import {BlockCom, TextCom} from '@base';
import {useDispatch, useSelector} from 'react-redux';

const i18nPrefix = tag => `Home.${tag}`;

const Home = props => {
  const dispatch = useDispatch();
  return (
    <BlockCom>
      <StatusBar backgroundColor={'transparent'} translucent={true} />
      <TextCom>Home</TextCom>
    </BlockCom>
  );
};

const styles = StyleSheet.create({
  topBar: {
    position: 'absolute',
    zIndex: 1,
  },
  shadow: {
    elevation: 20, // 适配android的
    shadowOffset: {width: 0, height: 2}, // 以下4项适配ios
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
});

export default Home;
