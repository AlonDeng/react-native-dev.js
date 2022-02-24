/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-20 11:44:33
 * @LastEditTime: 2021-11-03 10:10:03
 * @LastEditors: alon
 */
import React from 'react';
import {BlockCom, ImageCom, ButtonCom} from '@base';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {ImageUtils, NavigationUtil} from '@utils';
import i18n from '@i18n';
import {useSelector} from 'react-redux';
const i18nPrefix = tag => i18n.t(`avatarCom.${tag}`);

const AVATAR_TYPE = {
  USER: 0,
  GROUP: 1,
};

const AvatarCom = ({
  wh = 100,
  onPress,
  onPressInsert,
  uri,
  isBtn = true,
  radius,
  margin = [0, 0, 0, 0],
  hid,
  gender = 1,
  style = {},
  type = AVATAR_TYPE.USER,
}) => {
  const MyHid = useSelector(store => store.personalModel?.userInfo?.hid);
  const _onPress = () => {
    onPress && onPress();
    if (isBtn && hid && hid !== MyHid) {
      onPressInsert && onPressInsert();
      NavigationUtil.navigate('OtherPersonal', {hid});
    }
  };

  const disposeImg = () => {
    if (uri) {
      return {uri};
    } else {
      if (type === AVATAR_TYPE.GROUP) {
        return ImageUtils.Prayer_bg_img;
      }
      switch (
        gender // 1 男 2 女
      ) {
        case 1:
          return ImageUtils?.maleIcon;
        case 2:
          return ImageUtils?.femaleIcon;
        case 3:
          return ImageUtils?.devotion_item_bg;
        default:
          return ImageUtils?.maleIcon;
      }
    }
  };

  return (
    <ButtonCom
      radius={radius ? radius : wh}
      plain
      activeOpacity={isBtn ? 0.5 : 1}
      flex={false}
      margin={margin}
      style={style}
      wh={wh}
      onPress={_onPress}>
      <ImageCom
        wh={wh}
        radius={radius ? radius : wh}
        resizeMode="cover"
        source={disposeImg()}
        defaultSource={
          type === AVATAR_TYPE.GROUP
            ? ImageUtils.Prayer_bg_img
            : ImageUtils?.maleIcon
        }
      />
    </ButtonCom>
  );
};

const styles = StyleSheet.create({
  avatarBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default AvatarCom;
