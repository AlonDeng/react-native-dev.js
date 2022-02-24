/*
 * @Description:
 * @Author: alon
 * @Date: 2021-11-03 13:59:45
 * @LastEditTime: 2021-11-03 14:00:56
 * @LastEditors: alon
 */
import React, {useState, useRef, useEffect} from 'react';
import {BlockCom, TextCom, CellCom, ModalSheetCom, ImageCom} from '@base';
import {Platform} from 'react-native';

import {
  check,
  checkMultiple,
  request,
  requestMultiple,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import i18n from '@i18n';
import Promise from 'bluebird';

const i18nPrefix = tag => `checkPermissInfo.${tag}`;

const checkResults = requestResult => {
  console.log(
    '🚀 ~ file: PermissionsUtils.js ~ line 22 ~ checkResults ~ requestResult',
    requestResult,
  );
  let result = false;
  //
  for (var key in requestResult) {
    switch (requestResult[key]) {
      case RESULTS.UNAVAILABLE:
        //不支持该功能
        result = false;
        break;
      case RESULTS.DENIED:
        //该权限被拒绝
        result = false;
        break;
      case RESULTS.GRANTED:
        //授予权限
        result = true;
        break;
      case RESULTS.BLOCKED:
        //该权限被拒绝
        result = false;
        break;
      case RESULTS.LIMITED:
        //该权限被限制(ios)
        result = true;
        break;
    }
    if (!result) {
      break;
    }
  }
  return result;
};

const permissionsEmun = {
  CAMERA: {
    android: [PERMISSIONS.ANDROID.CAMERA],
    ios: [PERMISSIONS.IOS.CAMERA],
  },
  LIBRARY: {
    android: [PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE],
    ios: [PERMISSIONS.IOS.PHOTO_LIBRARY],
  },
  MICROPHONE: {
    android: [PERMISSIONS.ANDROID.RECORD_AUDIO],
    ios: [PERMISSIONS.IOS.MICROPHONE],
  },
  STORAGE: {
    android: [PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE],
  },
  VIDEO: {
    android: [
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
    ],
    ios: [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE],
  },
};

export const requestImagePermissions = async ({type}) => {
  try {
    console.log('type-------------', type);
    let result = false;
    const permissions = Platform.select({
      android: permissionsEmun[type].android,
      ios: permissionsEmun[type].ios,
    });

    console.log('permissions', permissions);
    if (permissions) {
      let requestResult = await requestMultiple(permissions);
      result = checkResults(requestResult);
      console.log(
        '🚀 ~ file: PermissionsUtils.js ~ line 92 ~ requestImagePermissions ~ result',
        result,
      );
      return result;
    } else {
      return true;
    }
  } catch (error) {
    console.log('PermissionsUtils ----- error', error);
  }
};

const goSettingRender = arr => {
  const renderPermission = () => (
    <BlockCom flex={false} center middle padding={[20, 0, 20, 0]}>
      {arr.map(item => {
        if (item.flag) {
          return;
        }
        return (
          <TextCom
            key={item.key}
            size="lx"
            margin={[10, 0, 10, 0]}
            i18n={i18nPrefix(item.key)}
          />
        );
      })}
    </BlockCom>
  );
  const defaultConfig = {
    message: renderPermission,
    frimText: i18n.t(i18nPrefix('openSettings')),
    isNeedCancel: true,
    onFirmHandler: () => {
      openSettings();
    },
    onClose: () => {},
    isTitle: false,
  };
  global.$showGlobalAlert(defaultConfig);
};

//launchCamera
export const requestVideoPermission = () =>
  new Promise(async (resolve, reject) => {
    try {
      let permissionsMap = [];
      let cameraPermissions = await requestImagePermissions({
        type: 'CAMERA',
      });
      permissionsMap.push({
        key: 'CAMERA',
        flag: cameraPermissions,
      });
      let microPermissions = await requestImagePermissions({
        type: 'MICROPHONE',
      });
      permissionsMap.push({
        key: 'MICROPHONE',
        flag: microPermissions,
      });
      let storagePermissions = await requestImagePermissions({
        type: 'STORAGE',
      });
      permissionsMap.push({
        key: 'STORAGE',
        flag: storagePermissions,
      });
      if (cameraPermissions && microPermissions && storagePermissions) {
        return resolve(true);
      } else {
        goSettingRender(permissionsMap);
        return resolve(false);
      }
    } catch (error) {
      console.log('🚀 ~ requestVideoPermission ~ error', error);
    }
  });

export const checkPermissInfo = async (permissionArr = ['CAMERA']) => {
  const permissionsMap = [];
  let checkFlag = true;
  await Promise.map(permissionArr, async item => {
    const flag = await requestImagePermissions({type: item});
    if (!flag) {
      checkFlag = false;
    }
    const params = {
      key: item,
      flag,
    };

    permissionsMap.push(params);
  });
  if (!checkFlag) {
    goSettingRender(permissionsMap);
  }

  return checkFlag;
};

export const PermissionsUtils = {
  requestVideoPermission: requestVideoPermission,
  checkPermissInfo: checkPermissInfo,
  requestImagePermissions: requestImagePermissions,
};
