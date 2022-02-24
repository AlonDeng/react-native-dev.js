/*
 * @Description:
 * @Author: alon
 * @Date: 2021-04-14 10:43:41
 * @LastEditTime: 2021-11-03 13:49:21
 * @LastEditors: alon
 */
import React from 'react';
import {TouchableOpacity, StyleSheet, Modal} from 'react-native';
import {BlockCom, TextCom, ModalCom} from '@base';
import {px, ImageUtils} from '@utils';
import {colors, fonts} from '@styles';
import PropTypes from 'prop-types';

const ModalSheetCom = props => {
  const {
    visible = false, // 是否开启modal
    options = [], // 需要渲染的数组,可传入自定义组件
    onPress = () => {}, // 数组（index数）回调方法
    onClose = () => {}, // 弹窗关闭回调
    maskClosable = false, // 是否点击蒙层关闭
    buttonStyle, // 按钮样式自定义
    SheetTextColor,
    cancelText, // 取消文字 若有传参则显示取消按钮
    cancelModalStyle = false, // 取消modal样式
    cancelPadding = false, // 取消padding样式
    conCancelStyle, // 取消按钮的内容的样式
  } = props;
  return (
    <ModalCom
      visible={visible}
      popup
      onClose={onClose}
      animationType="slide-up"
      maskClosable={maskClosable}
      style={{backgroundColor: 'transparent'}}>
      <>
        <BlockCom center style={[styles.body]}>
          {options.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                onPress(index);
              }}
              key={index}
              style={[
                styles.buttonStyle,
                buttonStyle && buttonStyle,
                {
                  borderBottomWidth:
                    index === options.length - 1 ? px(0) : px(2),
                },
                index === 0 && {
                  borderTopLeftRadius: px(30),
                  borderTopRightRadius: px(30),
                },
                index === options.length - 1 && {
                  borderBottomLeftRadius: px(30),
                  borderBottomRightRadius: px(30),
                },
              ]}>
              {React.isValidElement(item) ? (
                item
              ) : (
                <TextCom size={32} color={'#000000'}>
                  {item}
                </TextCom>
              )}
            </TouchableOpacity>
          ))}
        </BlockCom>
        {cancelText && (
          <TouchableOpacity
            style={[conCancelStyle ? conCancelStyle : styles.conCancelStyle]}
            onPress={onClose}>
            <TextCom size={32}>{cancelText}</TextCom>
          </TouchableOpacity>
        )}
      </>
    </ModalCom>
  );
};

const styles = StyleSheet.create({
  body: {
    marginLeft: px(30),
    borderRadius: px(30),
    marginRight: px(30),
    backgroundColor: 'white',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: px(100),
    width: '100%',
    borderColor: '#C4C4C4',
    marginTop: px(2),
  },
  conCancelStyle: {
    height: px(100),
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingTop: px(28),
    marginTop: px(20),
    marginLeft: px(30),
    marginRight: px(30),
    marginBottom: px(80),
    borderRadius: px(30),
  },
});

ModalSheetCom.propTypes = {
  visible: PropTypes.bool,
  options: PropTypes.any,
  onPress: PropTypes.func,
  onClose: PropTypes.func,
  maskClosable: PropTypes.bool,
  buttonStyle: PropTypes.object,
  cancelText: PropTypes.string,
  cancelModalStyle: PropTypes.bool,
  cancelPadding: PropTypes.bool,
  conCancelStyle: PropTypes.object,
};

export default ModalSheetCom;
