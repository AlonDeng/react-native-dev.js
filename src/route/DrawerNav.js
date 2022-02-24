/*
 * @Description: 
 * @Author: alon
 * @Date: 2021-10-07 11:58:50
 * @LastEditTime: 2021-10-07 17:06:57
 * @LastEditors: alon
 */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ImageUtils, px} from '@utils';
import configs from './configs';
const {drawerNavRootCom} = configs;
import Home from '@pages/Home/Home';
// import HomeSimple from '@pages/Home/HomeSimple/HomeSimple';
import Chat from '@pages/Chat/Chat';
import Quick from '@pages/Quick/Quick';
import Personal from '@pages/Personal/Personal';
import Community from '@pages/Community/Community';
import DrawerBarCom from './components/DrawerBarCom_copy';
// import {SVGAModule} from 'react-native-svga';

const configure = {
  Home: Home,
  Community: Community,
  Quick: Quick,
  Chat: Chat,
  Personal: Personal,
};

const drawerNavData = {
  Home: {
    type: 'icon',
    icon: ImageUtils.tab_home,
    activateIcon: ImageUtils.tab_home_activate,
    // switchAnimation: SVGAModule.getAssets(require('@svga/bottomBar/home.svga')),
  },
  Community: {
    type: 'icon',
    icon: ImageUtils.tab_community,
    activateIcon: ImageUtils.tab_community_activate,
    // switchAnimation: SVGAModule.getAssets(
    //   require('@svga/bottomBar/community.svga'),
    // ),
  },
  Quick: {
    type: 'hump',
    icon: ImageUtils.tab_quick,
  },
  Chat: {
    type: 'icon',
    icon: ImageUtils.tab_chat,
    activateIcon: ImageUtils.tab_chat_activate,
    // switchAnimation: SVGAModule.getAssets(require('@svga/bottomBar/chat.svga')),
  },
  Personal: {
    type: 'icon',
    icon: ImageUtils.tab_personal,
    activateIcon: ImageUtils.tab_personal_activate,
    // switchAnimation: SVGAModule.getAssets(
    //   require('@svga/bottomBar/personal.svga'),
    // ),
  },
};

const Drawer = createDrawerNavigator();
/**
 * @description 生成页面路由
 */
const renderScreens = () =>
  Object.keys(configure).map((screenName) => {
    return (
      <Drawer.Screen
        key={screenName}
        name={screenName}
        component={configure[screenName]}
      />
    );
  });

const DrawerNav = () => {
  return (
    <Drawer.Navigator
    //   lazy={false}
      initialRouteName={drawerNavRootCom}
      drawerContent={(props) => <DrawerBarCom {...props} routeProps={drawerNavData} />}>
      {renderScreens()}
    </Drawer.Navigator>
  );
};

export default DrawerNav;
