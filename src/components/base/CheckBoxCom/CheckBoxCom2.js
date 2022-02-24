/*
 * @Description: https://github.com/crazycodeboy/react-native-check-box
 * @Author: alon
 * @Date: 2021-02-02 18:01:34
 * @LastEditTime: 2021-07-05 17:20:54
 * @LastEditors: alon
 */
import * as React from 'react';
import {
  Text,
  View,
  Image,
  Easing,
  Animated,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  TextStyle,
} from 'react-native';
import {BlockCom, CheckBoxCom2, TextCom, ImageCom} from '@base';
import styles, {_textStyle, _iconContainer} from './BouncyCheckbox';

const defaultCheckImage = require('./check.png');

class CheckboxCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      // checked: this.props.isVisable,
      springValue: new Animated.Value(1),
    };
  }

  componentDidMount() {
    this.setState({checked: this.props.isChecked || false});
  }

  onPress = () => {
    const {
      disableBuiltInState = false,
      useNativeDriver = true,
      bounceEffect = 1,
      bounceFriction = 3,
    } = this.props;
    const {checked, springValue} = this.state;
    if (!disableBuiltInState) {
      this.setState({checked: !checked}, () => {
        springValue.setValue(0.7);
        Animated.spring(springValue, {
          toValue: bounceEffect,
          friction: bounceFriction,
          useNativeDriver,
        }).start();
        this.props.onPress && this.props.onPress(this.state.checked);
      });
    } else {
      springValue.setValue(0.7);
      Animated.spring(springValue, {
        toValue: bounceEffect,
        friction: bounceFriction,
        useNativeDriver,
      }).start();
      this.props.onPress && this.props.onPress();
    }
  };

  renderCheckIcon = () => {
    const {checked, springValue} = this.state;
    const {
      size = 25,
      iconStyle,
      iconComponent,
      iconImageStyle,
      fillColor = '#ffc484',
      ImageComponent = Image,
      unfillColor = 'transparent',
      checkIconImageSource = defaultCheckImage,
      onBorderColor = 'white',
      offBorderColor = 'white',
      isborder = false, // 去除border, 并且需要时可传入border大小
      isBlackScreen, // 全屏黑幕
    } = this.props;

    const checkStatus = checked;
    return (
      <>
        <Animated.View
          style={[
            {transform: [{scale: springValue}]},
            _iconContainer(
              size,
              checkStatus,
              fillColor,
              unfillColor,
              onBorderColor,
              offBorderColor,
              isborder,
            ),
            iconStyle,
          ]}>
          {iconComponent ||
            (checkStatus && (
              <ImageComponent
                source={checkIconImageSource}
                style={[styles.iconImageStyle, iconImageStyle]}
              />
            ))}
        </Animated.View>
      </>
    );
  };

  renderCheckboxText = () => {
    const {
      text,
      isChecked,
      textStyle,
      textContainerStyle,
      disableBuiltInState,
      disableText = false,
    } = this.props;
    const {checked} = this.state;
    return (
      !disableText && (
        <View style={[styles.textContainer, textContainerStyle]}>
          <Text style={[_textStyle(checked), textStyle]}>{text}</Text>
        </View>
      )
    );
  };

  render() {
    const {style, isBlackScreen = false} = this.props;
    const {checked} = this.state;
    return (
      <>
        <TouchableOpacity
          {...this.props}
          style={[styles.container, style]}
          onPress={this.onPress.bind(this, Easing.bounce)}>
          {this.renderCheckIcon()}
          {this.renderCheckboxText()}
        </TouchableOpacity>
        {isBlackScreen && checked && (
          <BlockCom flex={false} style={styles.blackScreen} />
        )}
      </>
    );
  }
}

export default CheckboxCom;
