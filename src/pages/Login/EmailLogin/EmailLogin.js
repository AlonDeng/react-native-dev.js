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
  KeyboardAvoidingView,
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

const i18nPrefix = tag => `EmailLogin.${tag}`;

const EmailLogin = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(null);

  const onChangeEmail = v => {
    setEmail(v);
  };
  return (
    <ImageBackground
      resizeMode="cover"
      style={{flex: 1}}
      source={ImageUtils?.login_banner}>
      <StatusBar backgroundColor={'transparent'} translucent={true} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <BlockCom between>
          <BlockCom center marginTop={180} flex={false}>
            <TextCom size={72} i18n={i18nPrefix('title')} />
            <TextCom color="#4D4D4D" size={36} i18n={i18nPrefix('title_2')} />
          </BlockCom>

          <BlockCom marginBottom={100} center flex={false}>
            <TextCom marginBottom={30} size={40} i18n={i18nPrefix('title_3')} />
            <BlockCom flex={false} padding={[0, 72]} width="100%" center>
              <BlockCom
                marginBottom={48}
                radius={36}
                height={88}
                border={[2, '#C4C4C4']}
                row
                flex={false}>
                <InputCom
                  fontSize={'lx'}
                  padding={[0, 30, 0]}
                  clear
                  value={email}
                  onChangeText={onChangeEmail}
                  inputType={'email'}
                  keyboardType={'email-address'}
                  placeholder={I18n.t(i18nPrefix('your_email'))}
                  placeholderTextColor={'#ccc'}
                />
              </BlockCom>
              <BlockCom
                marginBottom={48}
                radius={36}
                height={88}
                border={[2, '#C4C4C4']}
                row
                flex={false}>
                <InputCom
                  fontSize={'lx'}
                  padding={[0, 30, 0]}
                  clear
                  value={email}
                  onChangeText={onChangeEmail}
                  inputType={'password'}
                  passwordSecure
                  keyboardType={'email-address'}
                  placeholder={I18n.t(i18nPrefix('your_password'))}
                  placeholderTextColor={'#ccc'}
                />
              </BlockCom>

              <TouchableOpacity style={{width: '100%'}}>
                <BlockCom
                  marginBottom={48}
                  radius={36}
                  height={88}
                  center
                  width="100%"
                  middle
                  bgColor="#F89F08"
                  flex={false}>
                  <TextCom size={36} color="white" i18n={i18nPrefix('login')} />
                </BlockCom>
              </TouchableOpacity>
            </BlockCom>
            <BlockCom row flex={false}>
              <TextCom
                size={26}
                color="#757575"
                i18n={i18nPrefix('not_account')}
              />
              <TextCom
                size={26}
                color="#F89F08"
                i18n={i18nPrefix('register')}
              />
            </BlockCom>
          </BlockCom>
        </BlockCom>
      </KeyboardAvoidingView>
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

export default EmailLogin;
