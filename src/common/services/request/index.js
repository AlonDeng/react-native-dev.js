/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-08 14:22:37
 * @LastEditTime: 2021-11-02 16:37:20
 * @LastEditors: alon
 */
import axios from 'axios';
import {BASE_URL, REQUEST_TIME_OUT, HTTP_STATUS} from './config';
import {ToastCom} from '@base';
import {AuthorizationUtil, AxiosCancelUtil} from '@utils';
import {switchCode} from './utils';
import Toast from 'react-native-toast-message';

const request = async ({
  method = 'get',
  url = '',
  data,
  options = {},
  configs = {},
}) => {
  const {
    requireStringify = true, //默认对data请求进行json字符串转换
    authorization = true, //是否需要校验登录
    baseUrl = null,
    headers = {},
  } = options;
  const {contentType = 'application/json'} = headers;

  if (method === 'get' || method === 'delete') {
    configs.params = data;
  } else {
    configs.data = data;
  }
  let GatewayToken;
  if (authorization) {
    GatewayToken = await AuthorizationUtil.getAuthorization();
  }
  const instance = axios.create({
    baseURL: (baseUrl || BASE_URL) + url,
    timeout: REQUEST_TIME_OUT,
    headers: {
      ...options?.headers,
      'Content-Type': contentType,
      'X-Access-Token': GatewayToken ? GatewayToken : '',
    },
    // transformRequest: [(data) => {
    //     let res;
    //     if(requireStringify && contentType === 'application/json') {
    //         res = QS.stringify(data)
    //     }
    //     return res;
    // }],
  });

  // 請求攔截器
  instance.interceptors.request.use(
    async config => {
      //添加axios请求取消事件管理
      AxiosCancelUtil.getInstance().createCancel(config);
      // try {
      //   if (authorization) {
      //     let GatewayToken = await AuthorizationUtil.getAuthorization();
      //     // config = {
      //     //   ...config,
      //     //   header: {
      //     //     ...config?.header,
      //     //     'X-Access-Token': GatewayToken
      //     //   },`
      //     // };
      //     config.headers.GatewayToken = GatewayToken;
      //     console.log('authorization', config);
      //   }
      // } catch (error) {
      //   console.log('instance.interceptors.request----error', error);
      // }
      // console.log('請求攔截器', config);
      return config;
    },
    error => {
      return error;
    },
  );

  // // 響應攔截器
  instance.interceptors.response.use(res => {
    //移除axios请求取消事件管理
    AxiosCancelUtil.getInstance().removeCancel(res?.config);
    // 處理token
    if (res?.data?.accessToken?.id) {
      AuthorizationUtil.setAuthorization(res?.data?.accessToken?.id);
    }
    // 處理shekels
    // if () {}
    // Toast.show({
    //   type: 'shekelToast',
    //   text1: 'Hello',
    //   text2: 'This is some something 👋'
    // });
    // 處理狀態數據
    if (res?.status === HTTP_STATUS.SUCCESS) {
      // 攔截錯誤code, 進行處理
      switchCode(res?.data?.status);
      //It is already converted into blog
      if (res?.data?.message !== 'ok') {
        ToastCom.info(res?.data?.message, 2);
      }
      if (res?.data?.status === 3000) {
        return {
          id: 1,
        };
      }
      if (res?.data?.total) {
        return {
          list: res?.data?.result,
          total: res?.data?.total,
        };
      }
      return res?.data?.result;
    } else {
      return '请求失败';
    }
  });

  configs.method = method;

  // console.log(configs, 'config');

  return await instance(configs);
};

export default {
  get: ({url, data, options, configs}) =>
    request({method: 'get', url, data, options, configs}),
  post: ({url, data, options, configs}) =>
    request({method: 'post', url, data, options, configs}),
  patch: ({url, data, options, configs}) =>
    request({method: 'patch', url, data, options, configs}),
  delete: ({url, data, options, configs}) =>
    request({method: 'delete', url, data, options, configs}),
  put: ({url, data, options, configs}) =>
    request({method: 'put', url, data, options, configs}),
};
