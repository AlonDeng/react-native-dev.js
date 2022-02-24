/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-07 15:18:54
 * @LastEditTime: 2021-10-11 10:56:42
 * @LastEditors: alon
 */
import React, {useState, useRef, useEffect, useMemo} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  TouchableWithoutFeedback,
  StatusBar,
  PanResponder,
  Image,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import openMap, {createOpenLink} from 'react-native-open-maps';
// import ViewShot from 'react-native-view-shot';
import {useNavigationState} from '@react-navigation/native';
import {NavigationUtil} from '@utils';
import {ButtonCom, BlockCom, TextCom, InputCom} from '@base';
import Video from 'react-native-video';

const Test = props => {
  const videoRef = useRef();
  return (
    <BlockCom bgColor="green">
      <Video
        source={{
          uri: 'https://media.h.land/prod/211224-043743-178.mp4',
        }} // Can be a URL or a local file.
        ref={videoRef}
        resizeMode="center"
        onBuffer={_e => {
          console.log('onBuffer.....', _e);
        }} // Callback when remote video is buffering
        onError={async _e => {
          console.log('onError........', _e);
        }} // Callback when video cannot be loaded
        onLoadStart={_e => {
          console.log('onLoadStart.......', _e);
        }}
        onLoad={({duration}) => {
          console.log('onLoad......', duration);
        }} // 视频加载完时回调
        controls={true}
        disableFocus={true}
        style={styles.backgroundVideo}
      />
      {/* <VideoPlayer
        source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
        // navigator={this.props.navigator}
      /> */}
    </BlockCom>
  );
};

var styles = StyleSheet.create({
  backgroundVideo: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    width: '100%',
    height: 200,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Test;
