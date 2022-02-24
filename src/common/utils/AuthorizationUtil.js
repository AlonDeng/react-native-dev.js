/*
 * @Description: 
 * @Author: alon
 * @Date: 2021-10-08 18:39:22
 * @LastEditTime: 2021-10-13 10:41:16
 * @LastEditors: alon
 */


import {StorageUtil} from '@utils';

const AUTHORIZATION_STORAGE_KEY = 'gatewayToken_STORAGE';

/**
 * @description 获取token
 */
const getAuthorization = async () => {
  let result = null;
  try {
    let authorization = await StorageUtil.getItem(AUTHORIZATION_STORAGE_KEY);
    if (authorization && authorization.value) {
      result = authorization.value;
    }
  } catch (error) {
    console.log("🚀 ~ file: authorizationUtil.js ~ line 21 ~ getAuthorization ~ error", error)  
  }
  return result;
};

/**
 * @description 保存token
 * @authorization {string} token
 */
const setAuthorization = async (authorization = '') => {
  await StorageUtil.setItem(AUTHORIZATION_STORAGE_KEY, authorization);
};

/**
 * @description 删除token
 */
const delAuthorization = async () => {
  await StorageUtil.removeItem(AUTHORIZATION_STORAGE_KEY);
};

export default {getAuthorization, setAuthorization, delAuthorization};
