/*
 * @Description: 
 * @Author: alon
 * @Date: 2021-10-06 16:42:32
 * @LastEditTime: 2021-10-21 14:11:55
 * @LastEditors: alon
 */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ImageUtils, px} from '@utils';
import configs from './configs';
const {bottomNavRootCom} = configs;
import Home from '@pages/Home/Home';
import Favorite from '@pages/Favorite/Favorite';
import Reserve from '@pages/Reserve/Reserve';
import Mail from '@pages/Mail/Mail';
import Personal from '@pages/Personal/Personal';
import TabBarCom from './components/TabBarCom';
// import {SVGAModule} from 'react-native-svga';

const i18nPrefix = (tag) => `bottomBar.${tag}`;

const configure = {
  Home: Home,
  Favorite: Favorite,
  Reserve: Reserve,
  Mail: Mail,
  Personal: Personal,
};

const bottomNavData = {
  Home: {
    type: 'icon',
    text: i18nPrefix('home'),
    icon: ImageUtils.tab_home,
    activateIcon: ImageUtils.tab_home_activate,
    // switchAnimation: SVGAModule.getAssets(require('@svga/bottomBar/home.svga')),
  },
  Favorite: {
    type: 'icon',
    text: i18nPrefix('favorite'),
    icon: ImageUtils.tab_favorite,
    activateIcon: ImageUtils.tab_favorite_active,
    // switchAnimation: SVGAModule.getAssets(
    //   require('@svga/bottomBar/community.svga'),
    // ),
  },
  Reserve: {
    type: 'icon',
    text: i18nPrefix('reserve'),
    icon: ImageUtils.tab_reserve,
    activateIcon: ImageUtils.tab_reserve_active,
  },
  Mail: {
    type: 'icon',
    text: i18nPrefix('mail'),
    icon: ImageUtils.tab_mail,
    activateIcon: ImageUtils.tab_mail_active,
    // switchAnimation: SVGAModule.getAssets(require('@svga/bottomBar/chat.svga')),
  },
  Personal: {
    type: 'icon',
    text: i18nPrefix('personal'),
    icon: ImageUtils.tab_personal,
    activateIcon: ImageUtils.tab_personal_active,
    // switchAnimation: SVGAModule.getAssets(
    //   require('@svga/bottomBar/personal.svga'),
    // ),
  },
};

const Tab = createBottomTabNavigator();
/**
 * @description 生成页面路由
 */
const renderScreens = () =>
  Object.keys(configure).map((screenName) => {
    return (
      <Tab.Screen
        key={screenName}
        name={screenName}
        component={configure[screenName]}
      />
    );
  });

const BottomNav = () => {
  return (
    <Tab.Navigator
      lazy={false}
      initialRouteName={bottomNavRootCom}
      tabBar={(props) => <TabBarCom {...props} routeProps={bottomNavData} />}>
      {renderScreens()}
    </Tab.Navigator>
  );
};

export default BottomNav;
