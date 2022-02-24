/*
 * @Description: 文件说明
 * @Author: alon
 * @Date: 2021-01-26 16:44:56
 * @LastEditTime: 2021-07-20 10:54:50
 * @LastEditors: alon
 */
import React from 'react';
import {View, ActivityIndicator, Modal} from 'react-native';
import {useSelector} from 'react-redux';
import * as Progress from 'react-native-progress';
import {BlockCom, TextCom, ImageCom, AlertCom, ToastCom} from '@base';
const LoadingCom = () => {
  const loadInfo = useSelector(state => state.appModel.loadInfo);
  const isUpdata = useSelector(state => state.appModel.isUpdata);
  const progress = useSelector(state => state.appModel.progress);
  return (
    <Modal animationType={'none'} transparent={true} visible={true}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            borderRadius: 10,
            backgroundColor: 'rgba(0,0,0,0.5)',
            width: 100,
            height: 100,
            padding: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {isUpdata ? (
            <BlockCom flex={false}>
              <Progress.Pie color="white" progress={progress} size={30} />
            </BlockCom>
          ) : (
            <ActivityIndicator
              animating={true}
              color="white"
              // style={{
              //   // marginTop: 20,
              //   // width: 60,
              //   // height: 60,
              // }}
              size="large"
            />
          )}

          {loadInfo ? (
            <TextCom marginTop={20} center color="white">
              {loadInfo}
            </TextCom>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

export default LoadingCom;
