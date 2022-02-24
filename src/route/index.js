/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-06 15:58:30
 * @LastEditTime: 2021-10-07 16:15:02
 * @LastEditors: alon
 */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {Text} from 'react-native';

import configs from './configs';
import {mergeNavigator} from './utils';
import BottomNav from './BottomNav';
// import DrawerNav from './DrawerNav';

const {configure, rootCom, mainNav} = configs;

const Stack = createStackNavigator();

/**
 * @method getMainNav
 * @description 获取configs内，配置使用的路由导航栏模式。(有两种导航栏)
 * drawerNav 侧边导航栏
 * bottomNav 底部导航栏
 */
const getMainNav = () => {
  return mainNav;
};

/**
 * @method isDrawerNav
 * @description 判断当前是否使用侧边导航栏
 */
export const isDrawerNav = () => {
  return getMainNav() === 'drawerNav';
};

/**
 * @method: getRouteConfigMap
 * @describe:  提供一个手动设置方法,来回到之前路由序列
 * @param {*}
 * @return {*}result 返回路由对象
 */
const getRouteConfigMap = () => {
  //   1、引入默认路由表configure
  let routeMap = {
    ...configure,
  };
  //   2、判断是不是配置了侧边导航栏
//   if (isDrawerNav()) {
//     //   使用侧边导航栏，主导航栏标签MainNav指向DrawerNav
//   } else {
//     //   使用底部导航栏，主导航栏标签MainNav指向BottomNav
//   }
  routeMap.BottomNav = BottomNav;
  // routeMap.DrawerNav = DrawerNav;
  return routeMap;
};

/**
 * @description 生成页面路由
 */
const renderScreens = () => {
  const routeMap = getRouteConfigMap();
  // console.log(routeMap, 'routeMap');
  return Object.keys(routeMap).map(screenName => {
    return (
      <Stack.Screen
        key={screenName}
        name={screenName}
        component={mergeNavigator(routeMap[screenName]).screen}
        options={mergeNavigator(routeMap[screenName]).navigationOptions}
      />
    );
  });
};

function App(props) {
  // 为了改变语言的时候刷新导航栏
  //   const app = useSelector((store) => store.appModel);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={rootCom} //根页面
        screenOptions={() => ({
          ...TransitionPresets.SlideFromRightIOS, //跳转动画
        })}>
        {renderScreens()}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
