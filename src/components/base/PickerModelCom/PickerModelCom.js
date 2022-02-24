/*
 * @Author: your name
 * @Date: 2021-04-25 10:26:17
 * @LastEditTime: 2021-11-03 18:15:10
 * @LastEditors: alon
 * @Description: In User Settings Edit
 * @FilePath: /pokaliveapp/src/components/base/DatePickerCom/DatePickerCom.js
 */

import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {
  ModalCom,
  BlockCom,
  TextCom,
  DatePickerViewCom,
  PickerViewCom,
} from '@base';
import PropTypes from 'prop-types';
import i18n from '@i18n';
import {px} from '@utils';
import {colors} from '@styles';
import moment from 'moment';
import _ from 'lodash';

const i18nPrefix = tag => `commonInfo.${tag}`;

function PickerModelCom(props) {
  const {
    visible, //是否显示
    pickerType, //选择器类型 date picker
    firmText,
    cancelText,
    onFirm,
    onCancel,
    value, //绑定的值
    onChange, //选择器改变事件
    data, //数据源
    cascade, //是否联级
    defaultDate,
    minDate,
    maxDate,
    format,
    initValue,
    ...otherProps
  } = props;
  const disposeInitValue = ({type, _value, _data}) => {
    if (type !== 'date' && !_value) {
      return _data[0];
    }
    return _value;
  };
  const [pickerValue, setPickerValue] = useState(
    disposeInitValue({type: pickerType, _value: initValue, _data: data}),
  );
  const onClose = () => {
    onCancel && onCancel();
  };

  const onSure = () => {
    onFirm &&
      onFirm(
        pickerType !== 'date' && _.isObject(pickerValue)
          ? pickerValue.value
          : pickerValue,
      );
  };

  const changeValue = val => {
    if (pickerType !== 'date') {
      setPickerValue(val[0]);
    } else {
      setPickerValue(val);
    }
  };

  return (
    <ModalCom visible={visible} closable popup animationType="slide-up">
      <BlockCom
        flex={false}
        style={styles.modalCon}
        height={576}
        bgColor={colors.white}
        >
        {/* 取消确认按钮 */}
        <BlockCom
          center
          between
          width={750}
          height={96}
          row
          style={styles.modalCon}
          padding={[0, 32, 0, 32]}
          flex={false}
          borderBottom={[2, colors.lightGreyBG]}
          bgColor={colors.white}>
          <TouchableOpacity>
            <TextCom
              i18n={i18nPrefix('cancel')}
              size="lx"
              color={colors.greyText}
              onPress={onClose}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirm}>
            <TextCom
              i18n={i18nPrefix('confirm')}
              size="lx"
              color="white"
              onPress={onSure}
            />
          </TouchableOpacity>
        </BlockCom>
        {/* 时间 */}
        {/* 普通选择器 */}
        <BlockCom center middle>
          {pickerType === 'date' ? (
            <DatePickerViewCom
              style={{width: '100%'}}
              value={new Date(String(pickerValue))}
              mode="date"
              defaultDate={defaultDate}
              minDate={minDate}
              maxDate={maxDate}
              onChange={changeValue}
              format={format}
              {...otherProps}
            />
          ) : (
            <PickerViewCom
              onChange={changeValue}
              value={[String(pickerValue)]}
              data={data}
              cascade={cascade}
              {...otherProps}
            />
          )}
        </BlockCom>
      </BlockCom>
    </ModalCom>
  );
}

const styles = StyleSheet.create({
  modalCon: {
    zIndex: 100,
  },
  confirm: {
    backgroundColor: '#FB8B8E',
    paddingBottom: px(5),
    paddingTop: px(5),
    paddingLeft: px(25),
    paddingRight: px(25),
    borderRadius: px(20),
  },
});

PickerModelCom.propTypes = {
  visible: PropTypes.bool,
  pickerType: PropTypes.string,
  format: PropTypes.string,
  firm: PropTypes.func,
  cancel: PropTypes.func,
  firmText: PropTypes.string,
  cancelText: PropTypes.string,
};
export default PickerModelCom;
