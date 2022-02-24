import React from 'react';
import {BlockCom, TextCom} from '@base';
import {Image, StyleSheet} from 'react-native';
import {ImageUtils, px} from '@utils';
import i18n from '@i18n';
const i18nPrefix = (tag) => i18n.t(`emptyCom.${tag}`);

const EmptyCom = ({
  emptyHeight,
  emptyTip,
  ImageSources = ImageUtils.letter_blank_page,
  top,
  height,
  i18nTitle,
  readerBlock = () => {},
}) => {
  return (
    <BlockCom center flex={false} padding={[304, 0, 0, 0]}>
      <Image style={[styles.notDataImg]} source={ImageUtils.notData} />
      <TextCom color={'#62616A'} size="b" margin={[48, 0, 0, 0]}>
        {i18nTitle || i18nPrefix('notData')}
      </TextCom>

      {readerBlock && readerBlock()}
    </BlockCom>
  );
};

const styles = StyleSheet.create({
  notDataImg: {
    width: px(306),
    height: px(200),
  },
});
export default EmptyCom;
