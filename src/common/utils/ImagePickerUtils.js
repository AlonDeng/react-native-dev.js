/*
 * @Description:
 * @Author: alon
 * @Date: 2021-11-03 14:23:09
 * @LastEditTime: 2021-11-03 14:26:33
 * @LastEditors: alon
 */
import {requestImagePermissions} from './PermissionsUtils';
import * as ImagePicker from 'react-native-image-picker';

const launchImageLibrary = (options = {}) => {
  return new Promise(async (resolve, reject) => {
    let imagePermissions = false;
    try {
      imagePermissions = await requestImagePermissions({
        type: 'LIBRARY',
      });
    } catch (error) {
      console.log(
        '🚀 ~ file: ImagePickerCom.js ~ line 33 ~ openImageSelector ~ error',
        error,
      );
    }
    if (imagePermissions === false) {
      reject({code: 401, message: 'unauthorized'});
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response) {
        const {errorCode, errorMessage, didCancel} = response;
        if (errorCode || errorMessage) {
          reject({code: errorCode, message: errorMessage});
        } else if (didCancel) {
          reject({code: 1, message: 'cancel'});
        } else {
          console.log('相册数据', response, response.fileSize);
          resolve(response);
        }
      } else {
        reject({code: 404, message: 'not found'});
      }
    });
  });
};

const launchCamera = (options = {}) => {
  // console.log(options);
  return new Promise(async (resolve, rej) => {
    let cameraPermissons = false;
    try {
      cameraPermissons = await requestImagePermissions({
        type: 'CAMERA',
      });
      console.log('12312312321', cameraPermissons);
    } catch (error) {
      console.log(
        '🚀 ~ file: ImagePickerCom.js ~ line 33 ~ openImageSelector ~ error',
        error,
      );
    }
    if (cameraPermissons === false) {
      rej({code: 401, message: 'unauthorized'});
    }
    ImagePicker.launchCamera(options, res => {
      if (res) {
        const {errorCode, errorMessage, didCancel} = res;
        if (errorCode || errorMessage) {
          rej({code: errorCode, message: errorMessage});
        } else if (didCancel) {
          rej({code: 1, message: 'cancel'});
        } else {
          console.log('相机数据', res, res.fileSize);
          resolve(res);
        }
      } else {
        rej({code: 404, message: 'not found'});
      }
    });
  });
};

export default {launchImageLibrary, launchCamera};
