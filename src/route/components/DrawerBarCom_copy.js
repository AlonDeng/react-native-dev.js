/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-07 14:32:34
 * @LastEditTime: 2021-11-04 11:47:16
 * @LastEditors: alon
 */
import _ from 'lodash';
import React, {useState, useEffect, useRef} from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {px} from '@utils';
import {BlockCom, BadgeCom} from '@base';
import {colors} from '@styles';
// import {SVGAView} from 'react-native-svga';

function IconCom({
  icon,
  activateIcon,
  badgeCount,
  dot,
  focused,
  type,
  navigation,
  routeName,
  switchAnimation,
}) {
  const dispatch = useDispatch();
  const isBadgeCountMax = badgeCount > 99;
  const isShowDot = badgeCount <= 0 && dot;
  const svgaViewRef = useRef(null);
  useEffect(() => {
    if (focused == true) {
      svgaViewRef?.current?.startAnimation();
    } else {
      svgaViewRef?.current?.stepToFrame(0);
    }
  }, [focused]);

  const onClick = () => {
    if (routeName === 'Personal') {
      dispatch({type: 'personalModel/getBaseInfo'});
    }
    if (type === 'hump') {
      dispatch({type: 'socketModel/jumpToVideoMatchting'});
      // navigation.navigate('VideoChatView_new');
    } else {
      navigation.navigate(routeName);
    }
    navigation.emit({type: 'tabPress', target: routeName});
  };

  const renderIcon = (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onClick}
      disabled={focused}
      style={{
        width: px(96),
        height: px(64),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/* <SVGAView
        ref={svgaViewRef}
        source={switchAnimation}
        loops={1}
        clearsAfterStop={false}
        style={[
          {
            width: px(50),
            height: px(48),
          },
        ]}
        onPercentage={(value) => {
          if (focused == false) {
            svgaViewRef?.current?.stepToFrame(0);
          }
        }}
        onFinished={(e) => {}}
      /> */}
      <Image
        source={focused ? activateIcon : icon}
        style={[
          {
            width: px(50),
            height: px(48),
          },
        ]}
      />
      {/* <View
        style={{
          position: 'absolute',
          right: isShowDot ? px(14) : isBadgeCountMax ? px(-8) : px(0),
          top: isShowDot ? px(0) : px(-6),
          padding: px(4),
          borderRadius:
            badgeCount > 99 ? px(48) : badgeCount > 9 ? px(40) : px(32),
          backgroundColor: colors.bottomTag,
        }}>
        <BadgeCom count={badgeCount} dot={isShowDot} />
      </View> */}
    </TouchableOpacity>
  );
  const renderHump = (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onClick}
      disabled={focused}
      style={{
        position: 'absolute',
        top: px(-(98 / 2)),
      }}>
      <Image
        source={icon}
        style={[
          {
            width: px(116),
            height: px(116),
          },
        ]}
      />
    </TouchableOpacity>
  );
  return type === 'hump' ? renderHump : renderIcon;
}

function DrawerBarCom({state, descriptors, navigation, routeProps}) {
  return (
    <BlockCom flex={false}>
      <Text>asdasd</Text>
    </BlockCom>
  );
}

export default DrawerBarCom;
