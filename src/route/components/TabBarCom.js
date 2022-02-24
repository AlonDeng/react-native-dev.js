/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-06 17:49:03
 * @LastEditTime: 2021-11-02 17:14:07
 * @LastEditors: alon
 */

import _ from 'lodash';
import React, {useState, useEffect, useRef, useMemo} from 'react';
import {Image, View, TouchableOpacity, Modal} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {px, SoundUtil, NavigationUtil, screenW, isIphoneX} from '@utils';
import {BlockCom, ModalCom, TextCom, ButtonCom, BadgeCom} from '@base';
import {AvatarCom} from '@business';
import {colors} from '@styles';
// import {SVGAView} from 'react-native-svga';
const i18nPrefix = tag => `homeIndex.${tag}`;

function IconCom({
  icon,
  activateIcon,
  badgeCount,
  dot,
  focused,
  type,
  navigation,
  routeName,
  avatar,
  text,
  switchAnimation,
}) {
  const dispatch = useDispatch();
  const isBadgeCountMax = badgeCount > 99;
  const isShowDot = badgeCount <= 0 && dot;
  const svgaViewRef = useRef(null);
  const [isPost, setIstPost] = useState(false);
  const leavesList = [
    {
      name: i18nPrefix('myPrayers'),
      fn: () => {
        NavigationUtil.navigate('Prayer');
        setIstPost(!isPost);
      },
    },
    {
      name: i18nPrefix('myDevotions'),
      fn: () => {
        NavigationUtil.navigate('Devotion');
        setIstPost(!isPost);
      },
    },
    {
      name: i18nPrefix('myBlogs'),
      fn: () => {
        NavigationUtil.navigate('MyBlog');
        setIstPost(!isPost);
      },
    },
    {
      name: i18nPrefix('sermonNotes'),
      fn: () => {
        NavigationUtil.navigate('Sermonote');
        setIstPost(!isPost);
      },
    },
    {
      name: i18nPrefix('myPosts'),
      fn: () => {
        NavigationUtil.navigate('MyPost');
        setIstPost(!isPost);
      },
    },
  ];

  useEffect(() => {
    if (focused === true) {
      svgaViewRef?.current?.startAnimation();
    } else {
      svgaViewRef?.current?.stepToFrame(0);
    }
  }, [focused]);

  const onClick = () => {
    // console.log('2222', focused);
    // if (routeName !== 'Home') {
    //   SoundUtil.resetSoundMap(); // 重設blog音頻Map數據
    // }
    // switch (routeName) {
    //   case 'Community':
    //     dispatch({type: 'appModel/setState', payload: {isCommunity: true}});
    //     break;
    //   case 'Personal':
    //     dispatch({type: 'appModel/setState', payload: {isPersonal: true}});
    //     dispatch({type: 'personalModel/getBaseInfo'});
    //     break;
    //   default:
    //     break;
    // }
    if (type === 'hump') {
      setIstPost(!isPost);
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
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
      }}>
      <Image
        source={focused ? activateIcon : icon}
        style={[
          {
            width: px(30 * 2),
            height: px(30 * 2),
          },
        ]}
      />
      {routeName === 'Chat' && (
        <BadgeCom bgColor="#00AC8C" count={badgeCount} />
      )}
      <TextCom color={focused ? '#F89F08' : '#8F8F8F'} size={20} i18n={text} />
    </TouchableOpacity>
  );
  const renderHump = (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClick}
        disabled={focused}
        style={{
          position: 'absolute',
          top: px(-(30 / 2)),
          borderRadius: px(55 * 2),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          elevation: 7,
        }}>
        <Image
          source={icon}
          style={[
            {
              width: px(50 * 2),
              height: px(50 * 2),
            },
          ]}
        />
      </TouchableOpacity>
    </>
  );

  const renderAvatar = (
    <AvatarCom
      onPress={focused ? () => {} : onClick}
      uri={avatar}
      wh={36 * 2}
    />
  );

  const renderPost = useMemo(
    () => (
      <>
        <Modal animationType={'none'} transparent={true} visible={isPost}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setIstPost(false);
            }}
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: isIphoneX() ? 34 + px(66 * 2) : px(66 * 2),
              }}>
              <BlockCom />
              <BlockCom
                style={{
                  elevation: 20, // 适配android的
                  shadowOffset: {width: 0, height: 2}, // 以下4项适配ios
                  shadowColor: 'black',
                  shadowOpacity: 0.15,
                  shadowRadius: 5,
                }}
                center
                radius={20}
                bgColor="white"
                flex={false}>
                {leavesList.map(item => (
                  <TouchableOpacity key={item.name} onPress={item?.fn}>
                    <BlockCom
                      margin={[25, 0, 25, 0]}
                      padding={[0, 40, 0, 40]}
                      flex={false}
                      center
                      key={item?.name}>
                      <TextCom size={30} i18n={item?.name} />
                    </BlockCom>
                  </TouchableOpacity>
                ))}
              </BlockCom>
              <BlockCom />
            </View>
          </TouchableOpacity>
        </Modal>
      </>
    ),
    [isPost],
  );

  const disposeRender = type => {
    switch (type) {
      case 'hump':
        return renderHump;
      case 'avatar':
        return renderAvatar;
      default:
        return renderIcon;
    }
  };
  return (
    <>
      {disposeRender(type)}
      {renderPost}
    </>
  );
}

function TabBarCom({state, descriptors, navigation, routeProps}) {
  // const totleUnread = useSelector(store => store.chatModel.totleUnread);
  const avatar = useSelector(store => store.personalModel.userInfo?.picture);
  // const isBottomBar = useSelector(store => store.appModel.isBottomBar);
  return (
    <BlockCom
      showBottomView={true}
      bottomViewColor={colors.bottomTag}
      flex={false}
      width="100%"
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        elevation: 20, // 适配android的
        shadowOffset: {width: 0, height: 2}, // 以下4项适配ios
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowRadius: 5,
        // zIndex: -1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          height: px(70 * 2),
        }}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          return (
            <View
              key={index}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <IconCom
                // badgeCount={totleUnread}
                // dot={dot[route.name]}
                icon={
                  _.isObject(routeProps[route.name]) &&
                  routeProps[route.name].icon
                }
                text={
                  _.isObject(routeProps[route.name]) &&
                  routeProps[route.name].text
                }
                activateIcon={
                  _.isObject(routeProps[route.name]) &&
                  routeProps[route.name].activateIcon
                }
                type={
                  _.isObject(routeProps[route.name]) &&
                  routeProps[route.name].type
                }
                switchAnimation={
                  _.isObject(routeProps[route.name]) &&
                  routeProps[route.name].switchAnimation
                }
                focused={isFocused}
                routeName={route.name}
                navigation={navigation}
                avatar={avatar}
              />
            </View>
          );
        })}
      </View>
    </BlockCom>
  );
}

export default TabBarCom;
