import React from 'react';
import {AppRegistry} from 'react-native';

import {name as appName} from '../app.json';
import ReactotronConfig from '../ReactotronConfig';

import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import Root from '@pages/Root';

import {createDva} from '@utils';
import models from '@models';

// 创建dva
const app = createDva({
  initialState: {},
  models, // 传入dva models
  onError(error) {
    console.log('🚀 ~ file: index.js ~ line 25 ~ onError ~ error', error);
    error.preventDefault();
  },
});

//Reactotron调试工具
ReactotronConfig();

// 启动根页面
const App = app.start(<Root />);
const getRootView = () => gestureHandlerRootHOC(App);

AppRegistry.registerComponent(appName, getRootView);
