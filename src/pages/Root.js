/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-06 15:47:35
 * @LastEditTime: 2021-10-29 11:34:59
 * @LastEditors: alon
 */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Text, TouchableOpacity, TouchableHighlight} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {BlockCom, TextCom, ImageCom} from '@base';
import {LoadingCom} from '@business';
import Route from '@route';
// import Toast from 'react-native-toast-message';
import DrawerBarCom from '@route/components/DrawerBarCom';
import {Provider, Drawer} from '@ant-design/react-native';
import {screenW, ImageUtils} from '@utils';
import {themeAntd} from '@styles';

const Root = props => {
  const dispatch = useDispatch();
  // let drawerRef = useRef();
  // const isDrawer = useSelector(state => state.appModel?.isDrawer);
  const loading = useSelector(state => state.appModel.loading);

  // const onOpenChange = flag => {
  //   if (flag) {
  //     dispatch({type: 'appModel/showDrawer'});
  //   } else {
  //     dispatch({type: 'appModel/hideDrawer'});
  //   }
  // };

  // const showDrawer = () => {
  //   // drawerRef.current.openDrawer();
  //   console.log('onPress');
  // };

  useEffect(() => {
    dispatch({type: 'appModel/load'});
    return () => {
      dispatch({type: 'appModel/unload'});
    };
  }, []);

  // const toastConfig = {
  //   shekelToast: ({text1, props}) => (
  //     <BlockCom
  //       radius={24}
  //       bgColor="#D5EBE7"
  //       padding={[14, 24]}
  //       row
  //       width={screenW * 2 - 112}
  //       flex={false}>
  //       <ImageCom wh={50} source={ImageUtils.prayer_confirm_green} />
  //       <BlockCom>
  //         <TextCom margin={[10, 0, 0, 10]} size={28}>
  //           {text1}
  //         </TextCom>
  //       </BlockCom>
  //     </BlockCom>
  //   ),
  // };

  return (
    <BlockCom>
      <Provider theme={themeAntd}>
        {/* 側邊欄 */}
        {/* <Drawer
          position="left"
          open={isDrawer}
          sidebar={<DrawerBarCom selfRef={drawerRef.current} />}
          drawerRef={el => (drawerRef.current = el)}
          onOpenChange={onOpenChange}>
          <Route />
        </Drawer> */}
        {/* <DrawerBarCom /> */}
        <Route />
        {loading && <LoadingCom />}
        {/* <Toast config={toastConfig} /> */}
      </Provider>
    </BlockCom>
  );
};

export default Root;
