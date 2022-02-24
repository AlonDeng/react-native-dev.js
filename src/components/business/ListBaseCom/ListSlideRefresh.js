/*
 * @Descripttion:
 * @version:
 * @Author: alon
 * @Date: 2020-05-14 15:49:23
 * @LastEditors: alon
 * @LastEditTime: 2021-10-21 14:27:04
 */
/**
 * Created by Webstorm
 * User: King
 * Date: 2020-03-22
 * Time: 18:03
 */

import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Spinner from './Spinner';
import {px} from '@utils';
import LottieView from 'lottie-react-native';


const LOAD_MODE_STATE = {
  stanby: 0, //等待
  loading: 1, //加载接口中
  finally: 2, //最后一页，停止上滑加载操作
};

const slideRefreshHeight = 60;
const refeshJson = require('@assets/lottie/loadingMore.json');
const ListSlideRefresh = ({loadMoreState}) => {
  return (
    <View style={styles.container}>
      {loadMoreState === LOAD_MODE_STATE.loading ? (
        <View style={styles.container}>
          {/* <Spinner />
          <Text style={styles.loadText}>{'Loading'}</Text> */}
          <LottieView style={styles.icon} source={refeshJson} autoPlay loop />
        </View>
      ) : loadMoreState === LOAD_MODE_STATE.finally ? (
        <Text>{'No more info'}</Text>
        // <Text>{''}</Text>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: px(slideRefreshHeight),
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadText: {
    marginLeft: px(20),
  },
  icon: {
    height: px(160),
  },
});
export default ListSlideRefresh;
