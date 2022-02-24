import React, {Component} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Text,
} from 'react-native';
import {actions} from './const';
// import FontSizeIcon from './FontSizeIcon';
import {BlockCom, ButtonCom, TextCom} from '@base';
import {px, ImageUtils} from '@utils';

export const defaultActions = [
  actions.keyboard,
  actions.setBold,
  actions.setItalic,
  actions.setUnderline,
  actions.removeFormat,
  actions.insertBulletsList,
  actions.indent,
  actions.outdent,
  actions.insertLink,
];

const fontSizeList = [
  {key: '2', val: '13pt'},
  {key: '3', val: '16pt'},
  {key: '4', val: '18pt'},
  {key: '5', val: '24pt'},
  {key: '6', val: '32pt'},
];

const fontColorList = [
  {key: 'black', val: 'rgb(0, 0, 51)'},
  {key: 'gray', val: 'rgb(128,128,128)'},
  {key: 'red', val: 'rgb(221,49,56)'},
  {key: 'yellow', val: 'rgb(254,138,0)'},
  {key: 'green', val: 'rgb(56,180,75)'},
  {key: 'blue', val: 'rgb(22,126,250)'},
  {key: 'purple', val: 'rgb(176,78,186)'},
];

const selColor = '#2095F2';

function getDefaultIcon() {
  const texts = {};
  // new icon styles of experiment
  texts[actions.insertImage] = require('./img/image.png');
  texts[actions.keyboard] = require('./img/keyboard.png');
  texts[actions.setBold] = require('./img/bold.png');
  texts[actions.setItalic] = require('./img/italic.png');
  texts[actions.setSubscript] = require('./img/subscript.png');
  texts[actions.setSuperscript] = require('./img/superscript.png');
  texts[actions.insertBulletsList] = require('./img/ul.png');
  texts[actions.insertOrderedList] = require('./img/ol.png');
  texts[actions.insertLink] = require('./img/link.png');
  texts[actions.setStrikethrough] = require('./img/strikethrough.png');
  texts[actions.setUnderline] = require('./img/underline.png');
  texts[actions.insertVideo] = require('./img/video.png');
  texts[actions.removeFormat] = require('./img/remove_format.png');
  texts[actions.undo] = require('./img/undo.png');
  texts[actions.redo] = require('./img/redo.png');
  texts[actions.checkboxList] = require('./img/checkbox.png');
  texts[actions.table] = require('./img/table.png');
  texts[actions.code] = require('./img/code.png');
  texts[actions.outdent] = require('./img/outdent.png');
  texts[actions.indent] = require('./img/indent.png');
  texts[actions.alignLeft] = require('./img/justify_left.png');
  texts[actions.alignCenter] = require('./img/justify_center.png');
  texts[actions.alignRight] = require('./img/justify_right.png');
  texts[actions.alignFull] = require('./img/justify_full.png');
  texts[actions.blockquote] = require('./img/blockquote.png');
  texts[actions.line] = require('./img/line.png');
  texts[actions.fontSize] = require('./img/fontSize.png');
  return texts;
}

// noinspection FallThroughInSwitchStatementJS
export default class RichToolbar extends Component {
  // static propTypes = {
  //   getEditor?: PropTypes.func.isRequired,
  //   editor?: PropTypes.object,
  //   actions: PropTypes.array,
  //   onPressAddImage: PropTypes.func,
  //   onInsertLink: PropTypes.func,
  //   selectedButtonStyle: PropTypes.object,
  //   itemStyle: PropTypes.object,
  //   iconTint: PropTypes.any,
  //   selectedIconTint: PropTypes.any,
  //   unselectedButtonStyle: PropTypes.object,
  //   disabledButtonStyle: PropTypes.object,
  //   disabledIconTint: PropTypes.any,
  //   renderAction: PropTypes.func,
  //   iconMap: PropTypes.object,
  //   disabled: PropTypes.bool,
  //   renderRight: Fn // 渲染右部
  // };

  static defaultProps = {
    actions: defaultActions,
    disabled: false,
    iconTint: '#71787F',
    iconSize: 20,
    iconGap: 16,
  };

  constructor(props) {
    super(props);
    this.editor = null;
    this.state = {
      items: [],
      isFontShow: false,
      isFCShow: false,
      fontSizeSate: '4',
      foreColorState: 'rgb(0, 0, 51)',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    let that = this;
    return (
      nextState.items !== that.state.items ||
      nextState.actions !== that.state.actions ||
      nextState.data !== that.state.data ||
      nextProps.style !== that.props.style
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {actions} = nextProps;
    if (actions !== prevState.actions) {
      let {items = []} = prevState;
      return {
        actions,
        data: actions.map(action => ({
          action,
          selected: items.includes(action),
        })),
      };
    }
    return null;
  }

  componentDidMount() {
    setTimeout(this._mount);
  }

  _mount = () => {
    const {editor: {current: editor} = {current: this.props.getEditor?.()}} =
      this.props;
    if (!editor) {
      throw new Error('Toolbar has no editor!');
    } else {
      editor.registerToolbar(selectedItems =>
        this.setSelectedItems(selectedItems),
      );
      this.editor = editor;
    }
  };

  setSelectedItems(items) {
    const {items: selectedItems} = this.state;
    const disposeExtraData = ac => {
      let str = '';
      switch (ac) {
        case 'fontSize':
          selectedItems.forEach(item => {
            if (item.indexOf('fontSize') !== -1) {
              str = item.split('-')[1];
            }
          });
          return str;
        case 'foreColor':
          selectedItems.forEach(item => {
            if (item.indexOf('foreColor') !== -1) {
              str = item.split('-')[1];
            }
          });
          return str;
        default:
          return str;
      }
      // if (ac === 'fontSize') {
      //   let str = '';
      //   selectedItems.forEach((item) => {
      //     if (item.indexOf("fontSize") !== -1) {
      //       str = item.split('-')[1];
      //     }
      //   });
      //   return str;
      // }
      // return '';
    };
    if (this.editor && items !== selectedItems) {
      this.setState({
        items: items,
        data: this.state.actions.map(action => ({
          action,
          selected: items.includes(action),
          extraData: disposeExtraData(action),
        })),
      });
    }
  }

  _getButtonSelectedStyle() {
    return this.props.selectedButtonStyle && this.props.selectedButtonStyle;
  }

  _getButtonUnselectedStyle() {
    return this.props.unselectedButtonStyle && this.props.unselectedButtonStyle;
  }

  _getButtonDisabledStyle() {
    return this.props.disabledButtonStyle && this.props.disabledButtonStyle;
  }

  _getButtonIcon(action) {
    const {iconMap} = this.props;
    if (iconMap && iconMap[action]) {
      return iconMap[action];
    } else {
      return getDefaultIcon()[action];
    }
  }

  handleKeyboard() {
    const editor = this.editor;
    if (!editor) {
      return;
    }
    if (editor.isKeyboardOpen) {
      editor.dismissKeyboard();
    } else {
      editor.focusContentEditor();
    }
  }

  _onPress(action, selected) {
    const {onPressAddImage, onInsertLink, insertVideo} = this.props;
    const editor = this.editor;
    if (!editor) {
      return;
    }

    switch (action) {
      case actions.insertLink:
        if (onInsertLink) {
          return onInsertLink();
        }
      case actions.setBold:
      case actions.setItalic:
      case actions.undo:
      case actions.redo:
      case actions.insertBulletsList:
      case actions.insertOrderedList:
      case actions.checkboxList:
      case actions.setUnderline:
      case actions.heading1:
      case actions.heading2:
      case actions.heading3:
      case actions.heading4:
      case actions.heading5:
      case actions.heading6:
      case actions.code:
      case actions.line:
      case actions.setParagraph:
      case actions.removeFormat:
      case actions.alignLeft:
      case actions.alignCenter:
      case actions.alignRight:
      case actions.alignFull:
      case actions.setSubscript:
      case actions.setSuperscript:
      case actions.setStrikethrough:
      case actions.setHR:
      case actions.indent:
      case actions.outdent:
        console.log('------aaa----', action);
        editor.showAndroidKeyboard();
        editor.sendAction(action, 'result');
        break;
      case actions.blockquote:
        editor.showAndroidKeyboard();
        // // console.log('action----setParagraph', action, selected);
        //   if (selected) {
        // console.log('action----setParagraph', action, selected);
        //     editor.sendAction('setParagraph', 'result');
        //   } else {
        //     editor.sendAction(action, 'result');
        //   }
        editor.sendAction(action, 'result');
        break;
      case actions.insertImage:
        onPressAddImage && onPressAddImage();
        break;
      case actions.insertVideo:
        insertVideo && insertVideo();
        break;
      case actions.keyboard:
        this.handleKeyboard();
        break;
      default:
        this.props[action] && this.props[action]();
        break;
    }
  }

  setFontSizeShow = val => {
    this.editor?.setFontSize(val);
    this.editor?.focusContentEditor();
    if (val && !this.state.isFCShow) {
      this.setState({
        fontSizeSate: val,
      });
    }
    this.setState({
      isFontShow: !this.state.isFontShow,
    });
  };

  setFontColorShow = val => {
    // console.log('val', val);
    this.editor?.setForeColor('rgb(0, 0, 51)');
    this.editor?.focusContentEditor();
    if (val && !this.state.isFontShow) {
      this.editor?.setForeColor(val);
      this.setState({
        foreColorState: val,
      });
      this.setState({
        isFCShow: !this.state.isFCShow,
      });
    }
  };

  setFontColor = val => {
    // this.editor?.focusContentEditor();
    if (val) {
      this.editor?.setForeColor(val);
      this.setState({
        foreColorState: val,
      });
    }
  };

  setFontSizeFn = val => {
    this.editor?.setFontSize(val);
    this.setState({
      fontSizeSate: val,
    });
  };

  _renderFontSizeBar() {
    let that = this;
    return (
      <BlockCom
        // style={styles.fontCon}
        row
        height={80}
        center
        // padding={[10, 10, 10, 10]}
        flex={false}>
        {fontSizeList.map(item => (
          <ButtonCom
            // bgColor={item.key === that.state.fontSizeSate ? selColor : '#C4C4C4'}
            onPress={this.setFontSizeFn.bind(null, item.key)}
            plain
            margin={[0, 0, 0, 28]}
            key={item.key}
            radius={20}
            flex={false}>
            <TextCom
              color={item.key === that.state.fontSizeSate ? '#FEA3A4' : 'black'}
              size={28}>
              {item?.val}
            </TextCom>
          </ButtonCom>
        ))}
      </BlockCom>
    );
  }

  _renderFontColorBar() {
    let that = this;
    return (
      <BlockCom
        // style={styles.fontCon}
        row
        height={80}
        center
        padding={[10, 10, 10, 10]}
        flex={false}>
        {fontColorList.map(item => (
          <ButtonCom
            bgColor={item?.val}
            wh={42}
            onPress={this.setFontColor.bind(null, item.val)}
            plain
            center
            margin={[0, 0, 0, 28]}
            middle
            key={item.key}
            radius={55}
            flex={false}>
            <Image
              style={styles.white_ture}
              source={
                this.state.foreColorState === item.val
                  ? ImageUtils.white_ture
                  : ''
              }
            />
          </ButtonCom>
        ))}
      </BlockCom>
    );
  }

  _defaultRenderAction(action, selected, extraData) {
    let that = this;
    // console.log('extraData------,',  action, selected);
    const icon = that._getButtonIcon(action);
    const {iconSize, iconGap, disabled, itemStyle} = that.props;
    const style = selected
      ? that._getButtonSelectedStyle()
      : that._getButtonUnselectedStyle();
    const tintColor = disabled
      ? that.props.disabledIconTint
      : selected
      ? that.props.selectedIconTint
      : that.props.iconTint;
    const disposeItems = action => {
      switch (action) {
        case 'fontSize':
          return (
            <TouchableOpacity onPress={() => that.setFontSizeShow(extraData)}>
              <Image
                style={styles.fontSize}
                source={
                  this.state.isFontShow
                    ? ImageUtils.fontSize_sel
                    : ImageUtils.fontSize
                }
              />
            </TouchableOpacity>
          );
        case 'foreColor':
          return (
            // <TouchableOpacity onPress={() => that.setFontColorShow(extraData)} style={styles.FC}>
            //   <TextCom color={that.state.isFCShow ? that.props.selectedIconTint : 'black'} bold size={34}>FC</TextCom>
            // </TouchableOpacity>
            <TouchableOpacity onPress={() => that.setFontColorShow(extraData)}>
              <Image
                style={styles.fontColor}
                source={
                  this.state.isFCShow
                    ? ImageUtils.fontColor_sel
                    : ImageUtils.fontColor
                }
              />
            </TouchableOpacity>
          );
        default:
          return (
            <TouchableOpacity
              key={action}
              disabled={disabled}
              style={[
                {width: iconGap + iconSize},
                styles.item,
                itemStyle,
                style,
              ]}
              onPress={() => that._onPress(action, selected)}>
              {icon ? (
                typeof icon === 'function' ? (
                  icon({
                    selected,
                    disabled,
                    tintColor,
                    iconSize,
                    iconGap,
                    extraData,
                  })
                ) : (
                  <Image
                    source={icon}
                    style={{
                      tintColor,
                      height: iconSize,
                      width: iconSize,
                    }}
                  />
                )
              ) : null}
            </TouchableOpacity>
          );
      }
    };
    return disposeItems(action);
  }

  _renderAction(action, selected, extraData) {
    return this.props.renderAction
      ? this.props.renderAction(action, selected, extraData)
      : this._defaultRenderAction(action, selected, extraData);
  }

  hideKeyboard = () => {
    this.editor.dismissKeyboard();
  };

  _renderTopRight() {
    return (
      <BlockCom row padding={[0, 10, 0, 0]} bottom center flex={false}>
        {this?.props?.renderTopRight && this.props.renderTopRight()}
        <ButtonCom
          onPress={this.hideKeyboard}
          plain
          marginLeft={20}
          center
          middle
          wh={60}
          flex={false}>
          <Image
            style={styles?.hide_keyboard}
            source={ImageUtils?.hide_keyboard}
          />
        </ButtonCom>
      </BlockCom>
    );
  }

  render() {
    const {style, disabled, children, flatContainerStyle} = this.props;
    const vStyle = [
      styles.barContainer,
      style,
      disabled && this._getButtonDisabledStyle(),
    ];
    // console.log(this.state.data, 'this.state.data');
    return (
      <View style={vStyle}>
        <BlockCom height={80} bottom row flex={false} center>
          {this.state.isFontShow
            ? this._renderFontSizeBar()
            : this.state.isFCShow
            ? this._renderFontColorBar()
            : null}
          {this._renderTopRight()}
        </BlockCom>
        <View style={[styles.listCon]}>
          <FlatList
            horizontal
            keyboardShouldPersistTaps={'always'}
            keyExtractor={(item, index) => item.action + '-' + index}
            data={this.state.data}
            alwaysBounceHorizontal={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) =>
              this._renderAction(item.action, item.selected, item?.extraData)
            }
            contentContainerStyle={flatContainerStyle}
          />
          {this.props.renderRight && renderRight()}
        </View>
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  barContainer: {
    height: 44 * 2,
    backgroundColor: 'white',
    // alignItems: 'center',
    justifyContent: 'flex-end',
  },

  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listCon: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    // justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
  fontSize: {
    width: px(43),
    height: px(43),
    marginLeft: px(10),
    marginTop: px(3),
  },
  fontColor: {
    width: px(43),
    height: px(43),
    marginLeft: px(20),
    marginRight: px(4),
    marginTop: px(2),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  headIcon: {
    width: px(45),
    height: px(45),
    marginLeft: px(20),
    marginRight: px(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  hide_keyboard: {
    width: px(48),
    height: px(48),
  },
  white_ture: {
    width: px(30),
    height: px(30),
  },
});
