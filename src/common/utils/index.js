/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-06 15:39:14
 * @LastEditTime: 2021-11-03 14:26:38
 * @LastEditors: alon
 */
import {createDva, getDvaStore, getDva} from './dvaUtil';
import {padding, margin, border, hitSlop} from './commonStyle';
import NavigationUtil from './NavigationUtil';
import StorageUtil from './StorageUtil';
import {useInterval} from './UseHookUtil';
import AuthorizationUtil from './AuthorizationUtil';
import BaseServicesUtils from './BaseServicesUtils/BaseServicesUtils';
import {
  checkPermissInfo,
  PermissionsUtils,
  requestImagePermissions,
  requestVideoPermission,
} from './PermissionsUtils';
import ImagePickerUtils from './ImagePickerUtils';
import AxiosCancelUtil from './AxiosCancelUtil';
import {
  px,
  scaleHeight,
  getStatusBarHeight,
  radius,
  isIphoneX,
  screenH,
  screenW,
  scaleH,
  screenAllH,
} from './ScreenUtil';
import ImageUtils from './ImageUtils';
import SoundUtil from './SoundUtil';
import DocumentPickerUtil from './DocumentPickerUtil';
import TimeUtil from './TimeUtil';
import ChatSoundUtils from './ChatSoundUtils';
import {deleteFile, htmlLinkify, fontBase64, delay, simplized, randomNumber} from './help';
import saveToAlbum from './saveToAlbum';

export {
  createDva,
  getDvaStore,
  getDva,
  NavigationUtil,
  StorageUtil,
  px,
  isIphoneX,
  ImageUtils,
  padding,
  margin,
  border,
  getStatusBarHeight,
  hitSlop,
  AuthorizationUtil,
  BaseServicesUtils,
  useInterval,
  screenH,
  screenW,
  SoundUtil,
  checkPermissInfo,
  PermissionsUtils,
  requestImagePermissions,
  requestVideoPermission,
  ImagePickerUtils,
  DocumentPickerUtil,
  AxiosCancelUtil,
  TimeUtil,
  ChatSoundUtils,
  deleteFile,
  saveToAlbum,
  htmlLinkify,
  fontBase64,
  delay,
  simplized,
  randomNumber,
};
