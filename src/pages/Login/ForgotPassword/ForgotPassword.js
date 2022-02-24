/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-08 16:25:04
 * @LastEditTime: 2021-10-26 10:14:05
 * @LastEditors: alon
 */
import React, {useState, useRef, useEffect, useMemo} from 'react';
import {
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import I18n from '@i18n';
import {BlockCom, ButtonCom, InputCom, TextCom, ToastCom} from '@base';
import {TitleBarCom} from '@business';
import {
  NavigationUtil,
  getStatusBarHeight,
  px,
  ImageUtils,
  screenW,
} from '@utils';
import {useDispatch} from 'react-redux';

const i18nPrefix = tag => `forgotPassword.${tag}`;

const ForgotPassword = props => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const [countDown, setCountDown] = useState(60);
  const [isResen, setIsResen] = useState(true);

  const changeEmail = value => {
    setEmail(value);
  };

  const onTerms = () => {
    NavigationUtil.navigate('UserContract');
  };
  const onPolicy = () => {
    NavigationUtil.navigate('UserContract');
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

  //获取验证码
  const getCode = () => {
    // dispatch({
    //   type: 'loginModel/getCode',
    //   payload: countDownFun,
    // });
    countDownFun();
  };

  const sendEmail = () => {
    if (!email) {
      ToastCom.info('請輸入完整信息');
      return;
    }
    dispatch({type: 'loginModel/resetPassword', payload: {email}});
  };

  const goBack = () => {
    NavigationUtil.goBack();
  };

  const renderTopBG = () => (
    <>
      <StatusBar backgroundColor={'transparent'} translucent={true} />
      <BlockCom flex={false} width="100%" height={getStatusBarHeight() * 2} />
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
      <ImageBackground
        style={{width: screenW, height: px(440)}}
        resizeMode="cover"
        source={ImageUtils?.register_top_bg}>
        <TextCom
          size={34}
          margin={[126 * 2, 0, 0, 50]}
          i18n={i18nPrefix('forgotPassword')}
        />
        <TextCom
          ellipsis
          numberOfLines={2}
          color="#636363"
          size={26}
          margin={[16, 50, 0, 50]}
          i18n={i18nPrefix('sub')}
        />
      </ImageBackground>
    </>
  );

  return (
    <BlockCom bgColor="white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView>
          {renderTopBG()}

          <BlockCom padding={[0, 50, 0, 50]} marginTop={50} flex={false}>
            <BlockCom
              marginBottom={30}
              radius={10}
              border={[2, '#C4C4C4']}
              row
              height={100}
              flex={false}>
              <InputCom
                fontSize={'lx'}
                padding={[0, 30, 0]}
                value={email}
                clear
                inputType={'email'}
                keyboardType={'email-address'}
                onChangeText={changeEmail}
                placeholder={I18n.t(i18nPrefix('youremail'))}
                placeholderTextColor={'#ccc'}
              />
            </BlockCom>

            {/* <BlockCom
              marginBottom={30}
              radius={10}
              height={100}
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
                onChangeText={changeEmail}
                placeholder={I18n.t(i18nPrefix('emailVerity'))}
                placeholderTextColor={'#ccc'}
              />
              <ButtonCom
                onPress={getCode}
                disabled={!isResen}
                marginRight={20}
                height="100%"
                center
                middle
                flex={false}
                plain>
                <TextCom size={32} color="#C4C4C4">
                  {!isResen ? `${countDown}S` : I18n.t(i18nPrefix('getCode'))}
                </TextCom>
              </ButtonCom>
            </BlockCom> */}

            {/* <BlockCom
              marginBottom={30}
              radius={10}
              border={[2, '#C4C4C4']}
              row
              height={100}
              flex={false}>
              <InputCom
                fontSize={'lx'}
                padding={[0, 30, 0]}
                value={email}
                clear
                inputType={'email'}
                keyboardType={'email-address'}
                onChangeText={changeEmail}
                placeholder={I18n.t(i18nPrefix('setNewPsw'))}
                placeholderTextColor={'#ccc'}
              />
            </BlockCom> */}

            <ButtonCom
              radius={100}
              onPress={sendEmail}
              padding={[25, 230, 25, 230]}
              bgColor="#FB8B8E"
              center
              middle
              margin={[60, 30, 26, 30]}
              flex={false}
              plain>
              <TextCom color="white" size={36} i18n={i18nPrefix('reset')} />
            </ButtonCom>

            <TextCom
              color="#FB8B8E"
              center
              size={32}
              i18n={i18nPrefix('check_email')}
            />
          </BlockCom>
        </ScrollView>
      </KeyboardAvoidingView>
      <BlockCom
        padding={[0, 100, 0, 100]}
        flex={false}
        center
        middle
        style={{bottom: 60, position: 'absolute'}}>
        <TextCom center color="#757575" i18n={'loginIndex.desc'}>
          <TextCom
            underline
            center
            color="#757575"
            i18n={'loginIndex.terms'}
            onPress={onTerms}
          />
          <TextCom center color="#757575" i18n={'loginIndex.and'} />
          <TextCom
            underline
            center
            color="#757575"
            onPress={onPolicy}
            i18n={'loginIndex.policy'}
          />
        </TextCom>
      </BlockCom>
    </BlockCom>
  );
};

export default ForgotPassword;
