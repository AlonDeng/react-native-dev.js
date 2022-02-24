import React from 'react';
import {
  StyleSheet,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {px, scaleHeight} from '@utils';
import BlockCom from '../BlockCom/BlockCom';
import TextCom from '../TextCom/TextCom';
import {colors, fonts} from '@styles/theme';
import PropTypes from 'prop-types';
// import {ToastUtil} from '@service/Toast';
import {ImageUtils} from '@utils';

export default class InputCom extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    bgColor: PropTypes.string,
    autoFocus: PropTypes.bool,
    showLimit: PropTypes.bool,
    rightIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    rightIconSize: PropTypes.number,
    height: PropTypes.number,
    multiline: PropTypes.bool,
    placeholder: PropTypes.string,
    isDebounce: PropTypes.bool,
    inputErrTips: PropTypes.string,
    keyboardType: PropTypes.string,
    clear: PropTypes.bool,
    onClear: PropTypes.func, //清除输入框的回调
    rightIconStyle: PropTypes.object,
    isSecure: PropTypes.bool,
    minHeight: PropTypes.number, // 最小高度
    cheatMaxLength: PropTypes.number, // 虚假的长度
    passwordSecure: PropTypes.bool, //查看/隐藏 密码图标
    keyHideIsBlur: PropTypes.bool, //键盘缩起时是否需要失去焦点  暂时用这种方法，后期考虑是否把失去焦点的方法单独暴露出去使用
  };

  static defaultProps = {
    multiline: false, // 是否可以换行
    textAlignVertical: 'center', // 'top center bottom
    autoFocus: false,
    showLimit: false, // 显示上限数
    rightIcon: '', //右侧图标地址
    height: 80, // 高度
    placeholder: '', // 默认提示
    inputType: 'normal', //输入格式，用来限制输入类型，不合格的输入会被清除      {email:邮件格式,password:密码格式,number:数字,alp:字母}
    keyboardType: 'default', //键盘格式  {default、number-pad、decimal-pad、numeric、email-address、phone-pad}
    inputErrTips: '',
    extraLength: 0,
    isDebounce: false,
    rightIconSize: 32,
    rightIconStyle: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      inputFocused: false,
      passwdSecure: true,
    };
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }
  componentWillUnmount() {
    //当组件移除时，取消监听
    this.keyboardDidHideListener.remove();
  }
  _keyboardDidHide = () => {
    //键盘收起
    if (this.props.keyHideIsBlur) {
      this.inputRef.current.blur(); //使输入框失去焦点
    }
  };
  focus = () => {
    this.inputRef.current.focus();
  };

  // 右侧
  renderRight() {
    const {rightIcon, rightIconSize, rightIconStyle} = this.props;
    return rightIcon ? (
      <BlockCom padding={[0, 6, 0, 6]} flex={false} middle>
        <TouchableWithoutFeedback onPress={this._onRight.bind(this)}>
          <Image
            resizeMode="contain"
            source={rightIcon}
            style={[
              rightIconStyle,
              {
                width: px(rightIconSize),
                height: px(rightIconSize),
              },
            ]}
          />
        </TouchableWithoutFeedback>
      </BlockCom>
    ) : null;
  }

  _onRight() {
    this.props.onRight && this.props.onRight();
  }

  renderPasswdSecure = () => {
    const {passwordSecure} = this.props;
    const {value, inputFocused, passwdSecure} = this.state;
    let isShowClear = inputFocused && passwordSecure && value && value !== '';
    return isShowClear ? (
      <TouchableWithoutFeedback onPress={this._onPasswdSecure.bind(this)}>
        <BlockCom padding={[0, 6, 0, 6]} flex={false} middle>
          <Image
            source={
              passwdSecure
                ? ImageUtils.login_hide_passwd
                : ImageUtils.login_show_passwd
            }
            style={[
              {
                width: px(32),
                height: px(32),
                resizeMode: 'contain',
              },
            ]}
          />
        </BlockCom>
      </TouchableWithoutFeedback>
    ) : null;
  };

  renderClear = () => {
    const {
      height,
      clear,
      closeImg = ImageUtils.gray_close,
      closeImgSize = 32,
      minHeight,
    } = this.props;
    const {value, inputFocused} = this.state;
    let isShowClear = inputFocused && clear && value && value !== '';
    return isShowClear ? (
      <TouchableWithoutFeedback onPress={this._onClear.bind(this)}>
        <BlockCom
          style={[
            {width: px(height), height: px(height)},
            minHeight ? {minHeight: px(minHeight)} : null,
          ]}
          flex={false}
          center
          middle>
          <Image
            source={closeImg}
            style={[
              {
                width: px(closeImgSize),
                height: px(closeImgSize),
                resizeMode: 'contain',
              },
            ]}
          />
        </BlockCom>
      </TouchableWithoutFeedback>
    ) : null;
  };

  render() {
    const {
      style,
      height,
      defaultValue,
      placeholder,
      maxLength,
      isSecure,
      color,
      line,
      fontSize,
      multiline,
      textAlignVertical,
      inputStyle,
      autoFocus,
      showLimit,
      inputType,
      keyboardType,
      padding,
      margin,
      border,
      extraLength,
      passwordSecure,
      bgColor,
      returnKeyType,
      placeholderTextColor,
      cheatMaxLength,
      ...props
    } = this.props;
    let {value, passwdSecure} = this.state;
    const disposeLimitTextColor = _value => {
      if (cheatMaxLength && _value.length > cheatMaxLength) {
        return '#FF0300';
      } else {
        if (!_value || _value.length === 0) {
          return '#ff6634';
        } else {
          return '#CCCCCC';
        }
      }
    };
    return (
      <BlockCom
        color={bgColor}
        // flex={false}
        row
        center
        style={style}
        padding={padding}
        margin={margin}
        border={border}>
        <BlockCom row center borderBottom={line && [1, '#999']}>
          {showLimit && (
            <BlockCom
              flex={false}
              style={{
                position: 'absolute',
                zIndex: 1,
                right: 10,
                bottom: 0,
              }}
              row>
              <TextCom style={{color: disposeLimitTextColor(value)}}>
                {value ? value.length : 0}
              </TextCom>
              <TextCom color={'#CCCCCC'}>
                /{cheatMaxLength ? cheatMaxLength : maxLength}
              </TextCom>
            </BlockCom>
          )}
          <TextInput
            ref={this.inputRef}
            value={value}
            defaultValue={defaultValue}
            maxLength={extraLength ? maxLength + extraLength : maxLength}
            multiline={multiline}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            secureTextEntry={
              isSecure != null
                ? isSecure
                : passwordSecure
                ? passwdSecure
                : false
            }
            autoFocus={autoFocus}
            keyboardType={keyboardType}
            textAlignVertical={textAlignVertical}
            onChangeText={value => this._onChangeText(value, inputType)}
            onFocus={this._onFocus.bind(this)}
            onBlur={this._onBlur.bind(this)}
            onSubmitEditing={this._onSubmitEditing.bind(this)}
            returnKeyType={returnKeyType}
            underlineColorAndroid="transparent"
            style={[
              {
                padding: 0,
                flex: 1,
                color,
                height: px(height),
              },
              styles[fontSize] || {fontSize},
              inputStyle && inputStyle,
            ]}
            {...props}
          />
          {this.renderClear()}
          {this.renderPasswdSecure()}
          {this.renderRight()}
        </BlockCom>
      </BlockCom>
    );
  }

  _onClear = () => {
    this._onChangeText('');
    this.props.onClear && this.props.onClear();
  };

  _onPasswdSecure = () => {
    this.setState({passwdSecure: !this.state.passwdSecure});
  };

  _onFocus() {
    this.focusedTimer && clearTimeout(this.focusedTimer);
    this.focusedTimer = null;
    this.setState({inputFocused: true});
    this.props.onFocus && this.props.onFocus();
  }
  _onBlur() {
    if (this.focusedTimer == null) {
      this.focusedTimer = setTimeout(() => {
        this.setState({inputFocused: false});
        this.focusedTimer = null;
      }, 1500);
    }
    this.props.onBlur && this.props.onBlur();
  }
  _onSubmitEditing(event) {
    this.props.onSubmitEditing && this.props.onSubmitEditing(event);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const {value} = nextProps;
    this.setState({value});
  }

  _onChangeText(value, inputType) {
    const {onChangeText, inputErrTips} = this.props;
    const inputHundle = {
      // 'email': value.replace(/[^a-zA-Z0-9u4e00-u9fa5@._]/g, ''),
      email: value.replace(/[^a-zA-Z0-9@._]/g, ''),
      password: value.replace(/[^a-zA-Z0-9]/g, ''),
      number: value.replace(/[^0-9]/g, ''),
      phone: value.replace(/[^0-9]/g, ''),
      alp: value.replace(/[^a-zA-Z]/g, ''),
      normal: value,
    };
    const _value = inputHundle[inputType]
      ? inputHundle[inputType]
      : inputHundle.normal;
    if (inputErrTips !== '' && _value !== value) {
      //   ToastUtil.show(inputErrTips);
    }
    this.setState({
      value: _value,
    });
    onChangeText && onChangeText(_value);
  }
}

const styles = StyleSheet.create({
  // 文字大小
  text: {
    fontSize: fonts.m,
    color: colors.darkGrey,
  },
  s: {
    fontSize: fonts.s,
  },
  m: {
    fontSize: fonts.m,
  },
  mx: {
    fontSize: fonts.mx,
  },
  l: {
    fontSize: fonts.l,
  },
  lx: {
    fontSize: fonts.lx,
  },
  lxx: {
    fontSize: fonts.lxx,
  },
  b: {
    fontSize: fonts.b,
  },
});
