/*
 * @Descripttion:
 * @version:
 * @Author: alon
 * @Date: 2020-05-14 15:49:23
 * @LastEditors: alon
 * @LastEditTime: 2021-10-26 15:39:27
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {px} from '@utils';
//  import { ISvgaProps, SVGAView, SVGAModule } from 'react-native-svga';
import LottieView from 'lottie-react-native';

const refeshJson = require('@assets/lottie/loading.json');
//  const source = SVGAModule.getAssets(require('@svga/videoLoading.svga'));
const ListFirstLoading = () => {
  return (
    <View style={styles.container}>
      <LottieView style={styles.icon} source={refeshJson} autoPlay loop />
      {/* <SVGAView
             source={source}
             loops={0}
             style={[styles.giftDynamic, { width: px(36), height: px(36) }]}
           /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    height: px(80),
  },
});
export default ListFirstLoading;
