/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-25 14:04:28
 * @LastEditTime: 2021-10-26 10:17:12
 * @LastEditors: alon
 */
import React, {useState, useRef, useEffect, useMemo} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  TouchableWithoutFeedback,
  StatusBar,
  PanResponder,
  ImageBackground,
} from 'react-native';
import {BlockCom, ButtonCom, InputCom, TextCom} from '@base';
import {TitleBarCom} from '@business';
import {
  NavigationUtil,
  getStatusBarHeight,
  ImageUtils,
  screenH,
  screenW,
} from '@utils';
import {useDispatch} from 'react-redux';

const i18nPrefix = tag => `loginIndex.${tag}`;

const LoginIndex = props => {
  const onRegister = () => {
    NavigationUtil.navigate('Register');
  };
  const onLogin = () => {
    NavigationUtil.navigate('Login');
  };

  const onTerms = () => {};

  const onPolicy = () => {};

  return (
    <ImageBackground
      style={{width: screenW, height: screenH + getStatusBarHeight()}}
      resizeMode="cover"
      source={ImageUtils?.loginBG}>
      <StatusBar backgroundColor={'transparent'} translucent={true} />
      <BlockCom center marginTop={390 * 2} flex={false}>
        <TextCom bold size={44} i18n={i18nPrefix('title')} />
        <TextCom
          color="#2E2E2E"
          margin={[20, 0, 0, 0]}
          size={33}
          i18n={i18nPrefix('subT')}
        />
        <ButtonCom
          radius={100}
          onPress={onRegister}
          padding={[25, 250, 25, 250]}
          bgColor="#FB8B8E"
          margin={[80, 0, 26, 0]}
          flex={false}
          plain>
          <TextCom color="white" size={36} i18n={i18nPrefix('register')} />
        </ButtonCom>
        <BlockCom flex={false} row>
          <TextCom
            color="#757575"
            size={26}
            i18n={i18nPrefix('alreadyAccount')}
          />
          <ButtonCom onPress={onLogin} flex={false} plain>
            <TextCom color="#FB8B8E" i18n={i18nPrefix('loginIn')} />
          </ButtonCom>
        </BlockCom>
      </BlockCom>

      <BlockCom
        padding={[0, 100, 0, 100]}
        flex={false}
        center
        middle
        style={{bottom: 60, position: 'absolute'}}>
        <TextCom center color="#757575" i18n={i18nPrefix('desc')}>
          <TextCom
            underline
            center
            color="#757575"
            i18n={i18nPrefix('terms')}
            onPress={onTerms}
          />
          <TextCom center color="#757575" i18n={i18nPrefix('and')} />
          <TextCom
            underline
            center
            color="#757575"
            onPress={onPolicy}
            i18n={i18nPrefix('policy')}
          />
        </TextCom>
      </BlockCom>
    </ImageBackground>
    // <TouchableOpacity onPress={onLogin}>
    //     <ButtonCom
    //       radius={100}
    //       onPress={onLogin}
    //       padding={[25, 250, 25, 250]}
    //       bgColor="#FB8B8E"
    //       margin={[80, 0, 26, 0]}
    //       flex={false}
    //       plain>
    //       <TextCom color="white" size={36} i18n={i18nPrefix('register')} />
    //     </ButtonCom>
    // </TouchableOpacity>
  );
};

export default LoginIndex;
