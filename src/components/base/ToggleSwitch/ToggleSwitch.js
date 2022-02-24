/*
 * @Description: 
 * @Author: alon
 * @Date: 2021-04-23 09:10:00
 * @LastEditTime: 2021-06-22 13:47:26
 * @LastEditors: alon
 */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  I18nManager,
} from 'react-native';
import {ImageUtils, px} from '@utils';
import {BlockCom, TextCom} from '@base';
import PropTypes from 'prop-types';

export default class ToggleSwitch extends React.Component {
  static calculateDimensions() {
    return {
      width: px(46),
      padding: px(10),
      circleWidth: px(18),
      circleHeight: px(18),
      translateX: px(-15),
    };
  }

  static propTypes = {
    isOn: PropTypes.bool.isRequired,
    label: PropTypes.string,
    onColor: PropTypes.string,
    offColor: PropTypes.string,
    size: PropTypes.string,
    labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    thumbOnStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    thumbOffStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    trackOnStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    trackOffStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    onToggle: PropTypes.func,
    icon: PropTypes.object,
    disabled: PropTypes.bool,
    animationSpeed: PropTypes.number,
    useNativeDriver: PropTypes.bool,
    circleColor: PropTypes.string,
  };

  static defaultProps = {
    isOn: false,
    onColor: '#4cd137',
    offColor: '#ecf0f1',
    labelStyle: {},
    thumbOnStyle: {},
    thumbOffStyle: {},
    trackOnStyle: {},
    trackOffStyle: {},
    icon: null,
    disabled: false,
    animationSpeed: 300,
    useNativeDriver: true,
    circleColor: 'white',
  };

  offsetX = new Animated.Value(0);
  dimensions = ToggleSwitch.calculateDimensions();

  createToggleSwitchStyle = () => [
    {
      width: this.dimensions.width,
      borderRadius: 20,
      padding: this.dimensions.padding,
      backgroundColor: this.props.isOn
        ? this.props.onColor
        : this.props.offColor,
      flexDirection: 'row',
    },
    this.props.isOn ? this.props.trackOnStyle : this.props.trackOffStyle,
  ];

  createInsideCircleStyle = () => [
    {
      alignItems: 'center',
      justifyContent: 'center',
      margin: 4,
      position: 'absolute',
      backgroundColor: this.props.circleColor,
      transform: [{translateX: this.offsetX}],
      width: this.dimensions.circleWidth,
      height: this.dimensions.circleHeight,
      borderRadius: this.dimensions.circleWidth / 2,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2.5,
      elevation: 1.5,
    },
    this.props.isOn ? this.props.thumbOnStyle : this.props.thumbOffStyle,
  ];

  render() {
    const {
      animationSpeed,
      useNativeDriver,
      isOn,
      onToggle,
      disabled,
      labelStyle,
      label,
      icon,
      thumbOffStyle,
      renderOffText,
      renderOnText,
      containerStyle,
    } = this.props;

    let toValue;
    if (!I18nManager.isRTL && isOn) {
      toValue = this.dimensions.width - this.dimensions.translateX;
    } else if (I18nManager.isRTL && isOn) {
      toValue = -this.dimensions.width + this.dimensions.translateX;
    } else {
      toValue = -1;
    }

    Animated.timing(this.offsetX, {
      toValue,
      duration: animationSpeed,
      useNativeDriver: useNativeDriver,
    }).start();

    return (
      <View style={[styles.container, containerStyle]} {...this.props}>
        {label ? (
          <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>
        ) : null}
        <TouchableOpacity
          style={this.createToggleSwitchStyle()}
          activeOpacity={0.8}
          onPress={() => (disabled ? null : onToggle(!isOn))}>
          <Animated.View style={this.createInsideCircleStyle()}>
            {icon}
          </Animated.View>
          {isOn ? (
            <BlockCom center middle flex={false}>
              {renderOnText && renderOnText()}
            </BlockCom>
          ) : (
            <BlockCom
              center
              middle
              marginLeft={thumbOffStyle ? thumbOffStyle.width : 0}
              flex={false}>
              {renderOffText && renderOffText()}
            </BlockCom>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelStyle: {
    marginHorizontal: 0,
  },
});
