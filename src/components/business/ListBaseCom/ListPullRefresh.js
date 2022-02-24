/*
 * @Descripttion:
 * @version:
 * @Author: alon
 * @Date: 2021-02-26 17:10:46
 * @LastEditors: alon
 * @LastEditTime: 2021-10-19 17:11:03
 */
import React, {useRef, forwardRef, memo, useEffect} from 'react';
import {StyleSheet, Platform, Text} from 'react-native';
import {px} from '@utils';
import {SmartRefreshControl, AnyHeader} from 'react-native-smartrefreshlayout';
// import {
//   RefreshAnimateHeader,
//   RefreshNormalHeader,
// } from 'react-native-smart-refresh';
import LottieView from 'lottie-react-native';
// import {ISvgaProps, SVGAView, SVGAModule} from 'react-native-svga';
const {OS} = Platform;

const refeshJson = require('@assets/lottie/loading.json');
// const source = SVGAModule.getAssets(require('@svga/videoLoading.svga'));
const downRefreshHeight = 120;
const downRefreshIconSize = 80;

let ListPullRefresh = (props, ref) => {
  const {refreshing, onRefresh, children} = props;

  const refreshRef = useRef();

  useEffect(() => {
    if (!refreshing) {
        refreshRef.current &&
        refreshRef.current.finishRefresh &&
        refreshRef.current.finishRefresh();
    }
  }, [refreshing]);
  return OS === 'android' ? (
    <SmartRefreshControl
      ref={refreshRef}
      refreshing={refreshing}
      headerHeight={px(downRefreshHeight)}
      renderHeader={
        <AnyHeader style={styles.androidContainer}>
          {/* <SVGAView
            source={source}
            loops={0}
            style={ {width: px(46), height: px(46)}}
            // onFinished={() => {
            //   console.log('finish');
            //   // setIsShowGiftDynamic(false);
            //   hideGiftDynamic();
            // }}
          /> */}
          <LottieView style={styles.icon} source={refeshJson} autoPlay loop />
        </AnyHeader>
      }
      onRefresh={onRefresh}
      children={children}
    />
    // <Text>android</Text>
  ) : (
    // <RefreshNormalHeader
    //   style={styles.icon}
    //   refreshRef={refreshRef}
    //   refreshing={refreshing}
    //   onRefresh={onRefresh}></RefreshNormalHeader>
    // <RefreshAnimateHeader
    //   style={styles.icon}
    //   refreshRef={refreshRef}
    //   refreshing={refreshing}
    //   onRefresh={onRefresh}
    //   source={source}
    // />
    <Text>asd</Text>
  );
};

const styles = StyleSheet.create({
  androidContainer: {
    height: px(downRefreshHeight),
    // height: px(0),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: px(downRefreshIconSize),
  },
});

ListPullRefresh = forwardRef(ListPullRefresh);
export default memo(ListPullRefresh);
