/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-08 16:26:26
 * @LastEditTime: 2021-10-26 10:42:16
 * @LastEditors: alon
 */
import React, {useState, useRef, useEffect, useMemo} from 'react';
import {
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import I18n from '@i18n';
import {
  BlockCom,
  ButtonCom,
  InputCom,
  TextCom,
  ToastCom,
  ImageCom,
} from '@base';
import {TitleBarCom} from '@business';
import {
  NavigationUtil,
  ImageUtils,
  getStatusBarHeight,
  screenW,
  screenH,
  px,
} from '@utils';
import {useDispatch} from 'react-redux';
const i18nPrefix = tag => `register.${tag}`;

const Register = props => {
  const [username, setUsername] = useState('');
  const [usersurname, setUsersurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(null);
  const [countDown, setCountDown] = useState(60);
  const [confirmCode, setconfirmCode] = useState(null);
  const [matchPassword, setMatchPassword] = useState(null);
  const [isResen, setIsResen] = useState(true);
  const dispatch = useDispatch();

  const goBack = () => {
    NavigationUtil.goBack();
  };
  const onTerms = () => {
    NavigationUtil.navigate('UserContract');
  };
  const onPolicy = () => {
    NavigationUtil.navigate('UserContract');
  };

  const changeUsername = value => {
    setUsername(value);
  };

  //倒计时
  const countDownFun = () => {
    let count = countDown;
    let countDownTimer = null;
    if (!countDownTimer) {
      countDownTimer = window.setInterval(() => {
        count--;
        if (count == 0) {
          setIsResen(true);
          setCountDown(60);
          window.clearInterval(countDownTimer);
          countDownTimer = null;
        } else {
          setCountDown(count);
          setIsResen(false);
        }
      }, 1000);
    }
    // dispatch({type:'loginModel/countDownFun'})
  };

  const getCode = () => {
    if (!email || email === '') {
      ToastCom.info(I18n.t(i18nPrefix('verifyEmail')));
      return;
    }
    dispatch({
      type: 'loginModel/requestCode', //requestCode
      payload: {fn: countDownFun, email},
    });
    // countDownFun();
  };

  const changeUsersurname = value => {
    setUsersurname(value);
  };

  const changeEmail = value => {
    setEmail(value);
  };

  const changePassword = value => {
    setPassword(value);
  };

  const changeMatchPassword = value => {
    setMatchPassword(value);
  };

  const toLogin = () => {};

  const onRegister = () => {
    const reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
    const pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}');
    if (!username || !email || !password) {
      ToastCom.info(I18n.t(i18nPrefix('verifyNull')));
      return;
    }
    if (String(matchPassword) !== String(password)) {
      ToastCom.info(I18n.t(i18nPrefix('password_notMatch')));
      return;
    }
    if (!reg.test(email)) {
      ToastCom.info(I18n.t(i18nPrefix('verifyEmail')));
      return;
    }
    // if (!pwdRegex.test(password)) {
    //   ToastCom.info(I18n.t(i18nPrefix('verifyPsw')));
    //   return;
    // }
    if (!confirmCode) {
      ToastCom.info(I18n.t(i18nPrefix('confirmCode_not')));
      return;
    }
    dispatch({
      type: 'loginModel/Register',
      payload: {
        username,
        email,
        password,
        code: confirmCode,
      },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView
        style={{
          backgroundColor: 'white',
          height: screenH + getStatusBarHeight(),
        }}>
        <TouchableOpacity
          hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
          onPress={goBack}
          style={{
            position: 'absolute',
            zIndex: 9999,
            left: px(50),
            top: getStatusBarHeight() + px(30),
          }}>
          <Image
            style={{
              width: px(20),
              height: px(36),
            }}
            source={ImageUtils.goBack_black}
          />
        </TouchableOpacity>
        <ImageCom
          width="100%"
          height={140 * 2}
          resizeMode="cover"
          source={ImageUtils.register_topbar}
        />
        <BlockCom
          marginTop={-40}
          bgColor="white"
          radius={40}
          padding={[50, 50, 0, 50]}
          flex={false}>
          <BlockCom flex={false}>
            <TextCom size={48} i18n={i18nPrefix('title')} />
          </BlockCom>
          <BlockCom
            margin={[48, 0]}
            radius={32}
            height={88}
            border={[2, '#C4C4C4']}
            row
            flex={false}>
            <InputCom
              fontSize={'lx'}
              padding={[0, 30, 0]}
              clear
              onChangeText={changeUsername}
              value={username}
              placeholder={I18n.t(i18nPrefix('your_name'))}
              placeholderTextColor={'#ccc'}
            />
          </BlockCom>

          <BlockCom
            marginBottom={48}
            radius={32}
            height={88}
            border={[2, '#C4C4C4']}
            row
            flex={false}>
            {/* <TextCom>確認密碼:</TextCom> */}
            <InputCom
              fontSize={'lx'}
              padding={[0, 30, 0]}
              clear
              inputType={'password'}
              value={matchPassword}
              passwordSecure
              onChangeText={changeMatchPassword}
              placeholder={I18n.t(i18nPrefix('phone'))}
              placeholderTextColor={'#ccc'}
            />
          </BlockCom>

          {/* <BlockCom height={40} center row flex={false}>
          <ImageCom
            margin={[0, 15, 0, 0]}
            source={ImageUtils?.error_icon}
            wh={40}
          />
          <TextCom color="#FD8C8D" i18n={i18nPrefix('verifyPsw')} />
        </BlockCom> */}

          <BlockCom
            marginBottom={48}
            radius={32}
            height={88}
            border={[2, '#C4C4C4']}
            row
            flex={false}>
            <InputCom
              fontSize={'lx'}
              padding={[0, 30, 0]}
              value={email}
              clear
              inputType={'email'}
              keyboardType={'email-address'}
              placeholder={I18n.t(i18nPrefix('email'))}
              onChangeText={changeEmail}
              placeholderTextColor={'#ccc'}
            />
          </BlockCom>

          <BlockCom
            marginBottom={48}
            radius={32}
            height={88}
            border={[2, '#C4C4C4']}
            row
            flex={false}>
            <InputCom
              fontSize={'lx'}
              padding={[0, 30, 0]}
              clear
              inputType={'password'}
              onChangeText={changePassword}
              value={password}
              passwordSecure
              placeholder={I18n.t(i18nPrefix('password'))}
              placeholderTextColor={'#ccc'}
            />
          </BlockCom>

          {/* <BlockCom
            marginBottom={48}
            radius={32}
            height={88}
            border={[2, '#C4C4C4']}
            row
            flex={false}>
            <InputCom
              fontSize={'lx'}
              padding={[0, 30, 0]}
              value={confirmCode}
              clear
              // inputType={'email'}
              // keyboardType={'email-address'}
              onChangeText={setconfirmCode}
              placeholder={I18n.t('forgotPassword.emailVerity')}
              placeholderTextColor={'#ccc'}
            />
            <ButtonCom
              onPress={getCode}
              disabled={!isResen}
              marginRight={20}
              center
              middle
              // flex={false}
              plain>
              <BlockCom flex={false}>
                <TextCom size={32} color="#C4C4C4">
                  {!isResen
                    ? `${countDown}S`
                    : I18n.t('forgotPassword.getCode')}
                </TextCom>
              </BlockCom>
            </ButtonCom>
          </BlockCom> */}

          <ButtonCom
            radius={100}
            onPress={onRegister}
            padding={[22, 200, 22, 200]}
            bgColor="#F89F08"
            center
            middle
            margin={[0, 0, 26, 0]}
            flex={false}
            plain>
            <TextCom color="white" size={36} i18n={i18nPrefix('register')} />
          </ButtonCom>

          <BlockCom center middle row flex={false}>
            <TextCom
              size={26}
              color="#757575"
              i18n={i18nPrefix('have_account')}
            />
            <TouchableOpacity onPress={toLogin}>
              <TextCom
                size={26}
                color="#F89F08"
                i18n={i18nPrefix('to_login')}
              />
            </TouchableOpacity>
          </BlockCom>

          {/* <BlockCom center middle row flex={false} marginTop={100}>
          <ButtonCom
            onPress={onRegister}
            plain
            middle
            center
            width={200}
            height={200}
            color="green">
            <TextCom>註冊</TextCom>
          </ButtonCom>
        </BlockCom> */}
        </BlockCom>
        <BlockCom
          marginTop={150}
          padding={[0, 100, 0, 100]}
          flex={false}
          center
          middle>
          <TextCom center color="#757575" i18n={i18nPrefix('contract1')}>
            <TextCom
              underline
              center
              color="#757575"
              i18n={i18nPrefix('contract2')}
              onPress={onTerms}
            />
            <TextCom center color="#757575" i18n={i18nPrefix('contract3')} />
            <TextCom
              underline
              center
              color="#757575"
              onPress={onPolicy}
              i18n={i18nPrefix('contract4')}
            />
          </TextCom>
        </BlockCom>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
