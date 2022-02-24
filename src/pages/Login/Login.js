/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-08 16:00:18
 * @LastEditTime: 2021-11-01 09:39:23
 * @LastEditors: alon
 */
import React, {useState, useRef, useEffect, useMemo} from 'react';
import {
  StatusBar,
  ScrollView,
  ImageBackground,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {BlockCom, ButtonCom, InputCom, TextCom, ImageCom} from '@base';
import I18n from '@i18n';
import {
  getStatusBarHeight,
  ImageUtils,
  NavigationUtil,
  screenW,
  screenH,
  px,
  isIphoneX,
} from '@utils';
import {useDispatch, useSelector} from 'react-redux';

const i18nPrefix = tag => `Login.${tag}`;

const Login = props => {
  const loginBtn = [
    {
      icon: ImageUtils.login_ios,
      key: 'signUp_ios',
      bgColor: 'black',
      textColor: 'white',
    },
    {
      icon: ImageUtils.login_google,
      key: 'signUp_google',
      textColor: 'black',
      bgColor: 'white',
    },
    {
      icon: ImageUtils.login_email,
      textColor: 'black',
      key: 'signUp_email',
      bgColor: 'white',
      fn: () => {
        NavigationUtil.navigate('EmailLogin');
      },
    },
  ];

  const toRegister = () => {
    NavigationUtil.navigate('Register');
  };

  return (
    <ImageBackground
      resizeMode="cover"
      style={{flex: 1}}
      source={ImageUtils?.login_banner}>
      <StatusBar backgroundColor={'transparent'} translucent={true} />
      <BlockCom between>
        <BlockCom center marginTop={180} flex={false}>
          <TextCom size={72} i18n={i18nPrefix('title')} />
          <TextCom color="#4D4D4D" size={36} i18n={i18nPrefix('title_2')} />
        </BlockCom>

        <BlockCom marginBottom={100} center flex={false}>
          <TextCom marginBottom={30} size={40} i18n={i18nPrefix('title_3')} />
          <BlockCom flex={false} padding={[0, 72]} width="100%" center>
            {loginBtn?.map(item => (
              <TouchableOpacity
                key={item?.key}
                onPress={item?.fn}
                activeOpacity={1}
                style={{width: '100%'}}>
                <BlockCom
                  style={styles.shadow}
                  padding={[14, 0]}
                  radius={32}
                  marginBottom={30}
                  center
                  middle
                  bgColor={item?.bgColor}
                  row
                  flex={false}>
                  <ImageCom wh={60} source={item?.icon} />
                  <TextCom
                    size={30}
                    color={item?.textColor}
                    i18n={i18nPrefix(item?.key)}
                  />
                </BlockCom>
              </TouchableOpacity>
            ))}
          </BlockCom>
          <BlockCom row flex={false}>
            <TextCom
              size={26}
              color="#757575"
              i18n={i18nPrefix('not_account')}
            />
            <TouchableOpacity onPress={toRegister}>
            <TextCom size={26} color="#F89F08" i18n={i18nPrefix('register')} />
            </TouchableOpacity>
          </BlockCom>
        </BlockCom>
      </BlockCom>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  topBar: {
    position: 'absolute',
    zIndex: 1,
  },
  shadow: {
    elevation: 6, // 适配android的
    shadowOffset: {width: 0, height: 2}, // 以下4项适配ios
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
});

export default Login;
