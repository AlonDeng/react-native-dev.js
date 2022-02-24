import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {ImageUtils, getStatusBarHeight, px, NavigationUtil} from '@utils';
import {connect} from 'react-redux';
import {TextCom} from '@base';
import I18n from '@i18n';
import {colors, fonts} from '@styles';

const statusBarHeight = getStatusBarHeight(); //系统状态栏高度

const navContentHeight = px(74); //标题栏高度
const navTitleFontSize = px(36); //标题大小

const navH = navContentHeight + statusBarHeight; // 导航栏高度

class TitleBarCom extends Component {
  static propTypes = {
    title: PropTypes.string,
    isTitle: PropTypes.bool,
    navigation: PropTypes.object,
    statusBarBgColor: PropTypes.string,
    barStyle: PropTypes.string,
    canBack: PropTypes.bool,
    renderHeaderLeft: PropTypes.func, // 头部导航栏左侧自定义 renderHeaderMiddle
    clickHeaderLeft: PropTypes.func, // 头部导航栏左侧点击回调
    renderHeaderRight: PropTypes.func, // 头部导航栏右侧自定义
    clickHeaderRight: PropTypes.func, // 头部导航栏右侧点击回调
    clickTitle: PropTypes.func, // 点击标题回调
    disableI18n: PropTypes.bool, //禁用i18n,默认false
    disableLeftBtn: PropTypes.bool, //禁用左侧按钮，默认false
    backgroundColor: PropTypes.string, //背景色
    visible: PropTypes.bool, // 是否隐藏(高度存在)
    transparent: PropTypes.bool, // 是否透明(高度不存在)
    disableMoreBtn: PropTypes.bool, //禁用右侧更多按钮，默认true 是否不顯示more
    onMore: PropTypes.func, // 右侧更多选项按钮点击回调
    disableRightBtn: PropTypes.bool, //禁用右侧按钮，默认false
    isGetBaseInfo: PropTypes.bool, // 是否请求用户基本信息
  };
  static defaultProps = {
    hasSeperatorLine: true, // 内容区域底部是否有分隔线，默认是true
    canBack: true, // 是否出现返回图标.自定义的时候必须改为false
    statusBarBgColor: 'transparent', // 状态栏背景颜色
    barStyle: 'dark-content',
    disableI18n: false,
    disableLeftBtn: false,
    backgroundColor: colors.primary,
    titleColor: 'black',
    disableRightBtn: false,
    visible: false,
    transparent: false,
    disableMoreBtn: true,
    isGetBaseInfo: false,
    isBottomLine: false,
    isRight: true,
  };

  render() {
    const {
      statusBarBgColor,
      barStyle,
      backgroundColor,
      children,
      customizeView,
      visible,
      transparent,
      isBottomLine,
      absolute = false,
      isRight = true,
      height = navH,
      navContentHeight: _navContentHeight = navContentHeight,
    } = this.props;
    const _renderLeft = this._renderLeft();
    const _renderMiddle = this._renderMiddle();
    const _renderRight = this._renderRight();
    return (
      <View
        ref={ref => (this.barBgRef = ref)}
        style={[
          {height: height, width: '100%'},
          styles.titleBar,
          isBottomLine ? styles.titleBarBottomLine : {},
          {
            backgroundColor:
              visible || transparent ? 'transparent' : backgroundColor,
          },
          (transparent || absolute) && {position: 'absolute'},
        ]}>
        <StatusBar
          backgroundColor={statusBarBgColor}
          barStyle={barStyle}
          translucent={true}
        />
        {visible === false && (
          <View style={[{flex: 1}]}>
            <View style={{flex: 1}}>{children && children}</View>
            {customizeView && customizeView}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                ...styles.titleBarContent,
                marginTop: statusBarHeight,
                height: _navContentHeight,
              }}>
              {customizeView ? (
                customizeView()
              ) : (
                <>
                  {/* 左侧描绘 */}
                  {_renderLeft}
                  {/* 中间标题描绘 */}
                  {_renderMiddle}
                  {/* y右侧描绘 */}
                  {_renderRight}
                </>
              )}
            </View>
          </View>
        )}
      </View>
    );
  }

  /**
   * _renderLeft 左侧描绘
   * */
  _renderLeft() {
    const {
      renderHeaderLeft,
      clickHeaderLeft,
      disableLeftBtn,
      goBackImg = ImageUtils.icon_goback_black,
    } = this.props;
    if (disableLeftBtn) {
      return;
    }
    return (
      <View style={styles.navLeft}>
        {renderHeaderLeft ? (
          <TouchableOpacity
            style={styles.navIconSzie}
            onPress={() => clickHeaderLeft && clickHeaderLeft()}>
            {renderHeaderLeft()}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.navIconSzie}
            onPress={() => this.goBack()}>
            <Image
              style={{
                width: px(60),
                height: px(60),
                // marginHorizontal: px(12),
              }}
              source={goBackImg}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  /**
   * _renderMiddle 标题
   * */
  _renderMiddle() {
    const {
      title,
      isTitle = true,
      clickTitle,
      disableI18n,
      titleColor,
      middelStyle,
      isTextShadow = false,
      renderHeaderMiddle,
      clickHeaderMiddle,
    } = this.props;
    if (!isTitle) {
      return null;
    }
    return (
      <TouchableOpacity
        onPress={() => clickHeaderMiddle && clickHeaderMiddle()}
        activeOpacity={1}
        style={middelStyle ? middelStyle : styles.renderMiddle}>
        {renderHeaderMiddle ? (
          renderHeaderMiddle()
        ) : (
          <TextCom
            ellipsis
            style={
              isTextShadow
                ? {
                    color: titleColor,
                    fontSize: navTitleFontSize,
                    ...styles.textShadow,
                  }
                : {
                    color: titleColor,
                    fontSize: navTitleFontSize,
                  }
            }
            onPress={() => clickTitle && clickTitle()}>
            {disableI18n ? title : I18n.t(title)}
          </TextCom>
        )}
      </TouchableOpacity>
    );
  }

  /**
   * _renderRight 右侧描绘
   * */
  _renderRight() {
    const {
      renderHeaderRight,
      clickHeaderRight,
      disableRightBtn,
      disableMoreBtn,
      onMore,
      moreImg = ImageUtils.row_dot,
    } = this.props;
    if (disableMoreBtn && renderHeaderRight == null) {
      return;
    }
    return (
      <View style={styles.navRight}>
        {renderHeaderRight ? (
          <TouchableOpacity
            activeOpacity={1}
            disabled={disableRightBtn}
            style={styles.navIconSzie}
            onPress={() => clickHeaderRight && clickHeaderRight()}>
            {renderHeaderRight()}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled={disableRightBtn}
            style={styles.navIconSzie}
            onPress={() => onMore && onMore()}>
            <Image
              style={{
                width: px(48),
                height: px(48),
                marginHorizontal: px(12),
              }}
              source={moreImg}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  setBgOpacity = opacity => {
    this.barBgRef.setNativeProps({
      style: {backgroundColor: `rgba(255,102,51,${opacity})`},
    });
  };

  goBack() {
    const {
      navigation,
      clickHeaderLeft,
      dispatch,
      isGetBaseInfo = false, // 是否请求用户数据
    } = this.props;
    if (isGetBaseInfo) {
      // 是否请求用户数据
      dispatch({type: 'personalModel/getInfo'});
    }
    if (clickHeaderLeft) {
      clickHeaderLeft();
      return;
    }
    NavigationUtil.goBack();
  }
}

const styles = StyleSheet.create({
  titleBar: {
    position: 'relative',
    zIndex: 9,
  },
  titleBarBottomLine: {
    borderBottomWidth: px(1),
    borderColor: '#C4C4C4',
  },
  navLeft: {
    position: 'absolute',
    left: px(8),
    zIndex: 9,
  },
  navRight: {
    position: 'absolute',
    right: px(20),
    zIndex: 9,
  },
  navIconSzie: {
    minWidth: px(100),
    height: navContentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleBarContent: {
    height: navContentHeight,
    position: 'relative',
  },
  renderMiddle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
  },
  textShadow: {
    textShadowOffset: {width: 0.5, hegith: 0.5},
    textShadowRadius: 1,
    textShadowColor: 'grey',
  },
});

// export default connect(null, null)(TitleBarCom);
export default TitleBarCom;
