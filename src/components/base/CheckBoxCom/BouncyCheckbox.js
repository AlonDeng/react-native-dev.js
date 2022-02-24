/*
 * @Description:
 * @Author: alon
 * @Date: 2021-06-23 10:40:19
 * @LastEditTime: 2021-06-29 16:56:48
 * @LastEditors: alon
 */
import {ViewStyle, TextStyle, ImageStyle, StyleSheet} from 'react-native';

export const _iconContainer = (
  size,
  checked,
  fillColor,
  unfillColor,
  onBorderColor,
  offBorderColor,
  isborder,
) => {
  return {
    width: isborder && checked ? size + isborder : size,
    height: isborder && checked ? size + isborder : size,
    borderWidth: isborder ? 1 : 0,
    borderColor: checked ? (isborder ? 0 : onBorderColor) : offBorderColor,
    borderRadius: size,
    marginTop: isborder && checked ? -isborder / 2 : 0,
    // marginLeft: isborder && checked ? -isborder / 2 : 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: checked ? fillColor : unfillColor,
  };
};

export const _textStyle = (checked) => {
  return {
    fontSize: 16,
    color: '#757575',
    textDecorationLine: checked ? 'line-through' : 'none',
  };
};

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconImageStyle: {
    width: 10,
    height: 10,
  },
  textContainer: {
    marginLeft: 16,
  },
  blackScreen: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
  },
});
