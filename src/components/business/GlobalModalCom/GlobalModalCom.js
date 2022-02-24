import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {BlockCom, TextCom, ModalCom} from '@base';
import {px, ImageUtils} from '@utils';
import i18n from '@i18n';
const i18nPrefix = 'commonInfo';
const GlobalModalCom = props => {
  const {
    visible = false, // 是否开启modal
    isTitle = true, // 是否需要title
    title = i18n.t(`${i18nPrefix}.tips`), //'提示', //提示文案
    titleStyle, //title字体的样式
    message, //message  可以直接是文字或者是reder函数
    messageBoxStyle = {}, //messagebox的样式
    messageTextStyle = {}, //messagetext的样式
    isNeedCancel = true, //是否需要取消按钮
    containerStyles = {},
    cancelText = i18n.t(`${i18nPrefix}.cancel`), //取消, //取消按钮文案
    frimText = i18n.t(`${i18nPrefix}.firm`), //'确定, //确认按钮文案
    cancelStyle, //取消按钮的样式
    frimStyle, //确认按钮的样式
    cancelTextStyle, //取消文字的样式
    frimTextStyle, //确认文字的样式
    footerButtons, //自定义底部按钮 函数类型
    onFirmHandler = () => {}, //确认操作之后的回调
    onClose = () => {}, // 弹窗关闭回调
    maskClosable = false, // 是否点击蒙层关闭
  } = props;

  const _rederMessage = () => {
    return (
      <BlockCom
        flex={false}
        style={[
          styles.message,
          messageBoxStyle,
          !isTitle && {marginBottom: px(40)},
        ]}>
        <TextCom
          color={'#333333'}
          center
          size={28}
          style={[{lineHeight: px(48)}, messageTextStyle]}>
          {message}
        </TextCom>
      </BlockCom>
    );
  };
  //传入的message类型判断
  let messageType = null;
  if (message) {
    messageType = typeof message;
  }

  return (
    <Modal animationType={'none'} transparent={true} visible={visible}>
      <BlockCom bgColor="rgba(0, 0, 0, 0.6)" center middle>
        <KeyboardAvoidingView
          // behavior={'position'}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.KeyboardAvoidingView}>
          <BlockCom flex={false} style={{...styles.main, ...containerStyles}}>
            {/* 标题 */}
            {isTitle && (
              <>
                {React.isValidElement(title) ? (
                  title
                ) : (
                  <BlockCom center flex={false}>
                    <TextCom size={36} center color={'#999999'}>
                      {title}
                    </TextCom>
                  </BlockCom>
                )}
              </>
            )}

            {/* 内容 */}
            <>{React.isValidElement(message) ? message : _rederMessage()}</>
            {/* {messageType && messageType === 'function'
          ? message()
          : _rederMessage()} */}

            {/* 底部的按钮 */}
            {footerButtons ? (
              footerButtons()
            ) : (
              <BlockCom
                between={cancelStyle?.width}
                flex={false}
                center
                row
                style={styles.footerButtons}>
                {isNeedCancel && (
                  <TouchableOpacity
                    style={[
                      {...styles.cancel, ...cancelStyle},
                      cancelStyle?.width ? {} : styles.flex,
                    ]}
                    onPress={onClose}>
                    <TextCom
                      style={[styles.footerButtonsText, cancelTextStyle]}>
                      {cancelText}
                    </TextCom>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={[
                    {...styles.firm, ...frimStyle},
                    frimStyle?.width ? {} : styles.flex,
                  ]}
                  onPress={onFirmHandler}>
                  <TextCom style={[styles.footerButtonsText, frimTextStyle]}>
                    {frimText}
                  </TextCom>
                </TouchableOpacity>
              </BlockCom>
            )}
          </BlockCom>
        </KeyboardAvoidingView>
      </BlockCom>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  main: {
    width: px(622),
    backgroundColor: '#fff',
    paddingTop: px(40),
    borderRadius: px(10),
    overflow: 'hidden',
  },
  message: {
    padding: (px(46), px(36)),
    // paddingVertical: px(46),
    // paddingHorizontal:px(36),
  },
  footerButtons: {
    height: px(112),
    width: '100%',
    display: 'flex',
  },

  cancel: {
    backgroundColor: '#D6D6D6',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  firm: {
    backgroundColor: '#FD8C8D',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerButtonsText: {
    color: '#fff',
    fontSize: px(36),
  },
  flex: {
    flex: 1,
  },
});

export default GlobalModalCom;
