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
  Linking,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {BlockCom, ButtonCom, InputCom, TextCom} from '@base';
import AutoHeightWebView from 'react-native-autoheight-webview';
import {TitleBarCom} from '@business';
import _ from 'lodash';
import I18n from '@i18n';
import {
  getStatusBarHeight,
  ImageUtils,
  NavigationUtil,
  screenW,
  screenH,
  px,
  fontBase64,
} from '@utils';
import {useDispatch, useSelector} from 'react-redux';

const i18nPrefix = tag => `UserContract.${tag}`;

const UserContract = props => {
  // const userContract = {};
  const userContract = useSelector(store => store.loginModel?.userContract);
  // console.log('userContract', userContract);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userContract?.body) {
      dispatch({type: 'loginModel/getUserContract'});
    }
  }, [userContract]);
  const webviewRef = useRef();
  const renderWebView = useMemo(() => {
    const htmlInject = `<html><head><style>blockquote { margin: 0; padding: 0 15px; border-left: 3px solid darkorange; background: aliceblue; }</style><body>${_.get(
      userContract,
      'body',
      '',
    )}</body></html>`;
    return (
      <BlockCom
        paddingBottom={32}
        borderBottom={[1, '#C4C4C4']}
        margin={[0, 32, 0, 32]}
        flex={false}>
        {!!userContract?.title && (
          <TextCom margin={[0, 0, 0, 0]} size={40}>
            {_.get(userContract, 'title', '')}
          </TextCom>
        )}

        {!!userContract?.summary && _.get(userContract, 'summary', null) && (
          <BlockCom
            borderBottom={[1, '#C4C4C4']}
            padding={[0, 16, 24, 16]}
            margin={[16, 0, 0, 0]}
            row>
            <TextCom color="#4D6174" i18n={'BlogDetail.summary'} size={32}>
              <TextCom color="#B0B0B0" size={32}>
                {_.get(userContract, 'summary', '')}
              </TextCom>
            </TextCom>
          </BlockCom>
        )}
        <AutoHeightWebView
          style={{width: '100%', marginTop: px(32)}}
          javaScriptEnabled
          bounces={false}
          source={{html: htmlInject}}
          scrollEnabled={false}
          ref={webviewRef}
          onNavigationStateChange={event => {
            if (event?.url !== 'about:blank') {
              webviewRef.current?.stopLoading();
              Linking.openURL(event.url);
            }
          }}
          customStyle={`
            ${fontBase64()}
            body {
              font-size: 18.5px;
              word-wrap: break-word;
              font-family: Apercu Pro;
            }
            img {
              width: 100% !important;
              height: auto;
            }
            iframe {
              width: 100% !important;
              max-height: 500px;
            }
          `}
          scalesPageToFit={Platform.select({android: false})}
          mixedContentMode={'compatibility'}
          showsVerticalScrollIndicator={false}
          // injectedJavaScript={injectStyle}
        />
      </BlockCom>
    );
  }, [userContract]);
  return (
    <BlockCom
      flex={false}
      bgColor="white"
      style={{width: screenW, height: screenH + getStatusBarHeight()}}>
      <TitleBarCom isBottomLine title={i18nPrefix('title')} />
      <ScrollView scrollEventThrottle={16} style={{backgroundColor: 'white'}}>
        <BlockCom height={36} flex={false} />
        {renderWebView}
        <BlockCom height={200} flex={false} />
      </ScrollView>
    </BlockCom>
  );
};

export default UserContract;
