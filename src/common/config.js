/*
 * @Description: 
 * @Author: alon
 * @Date: 2021-10-06 15:37:55
 * @LastEditTime: 2021-10-13 14:53:41
 * @LastEditors: alon
 */
export const env = 'dev'; // dev：开发,test 测试, product：生产

const appConfigs = {
  dev: {
    // baseUrl: 'http://192.168.2.140:9023',
    baseUrl: 'https://h.land/api/',
    // websokectUrl: 'https://test-chat.pokalive.com/', //'',
    websokectUrl: 'https://h.land', //'',
    baseImageUrl: 'https://pokalive-dev.oss-cn-hongkong.aliyuncs.com/',
    acttvityUrl: 'https://m-test.whispark.com/h/static/pages/',
    appVersionUrl: 'http://codepush.whispark.com/production/update.json',
    appDownloadUrl: 'https://m-test.whispark.com/app/whispark.apk',
    rechargeUrl_android: 'https://pay-test.whispark.com/googlePay/success',
    rechargeUrl_ios: 'https://pay-test.whispark.com/applePay/success',
    aliyunOssUrl: 'oss-cn-hongkong.aliyuncs.com',
    aliyunOssBucket: 'pokalive-dev',
  },
  test: {
    baseUrl: 'https://test-api.pokalive.com/',
    websokectUrl: 'https://test-chat.pokalive.com/',
    baseImageUrl: 'https://pokalive-test.oss-cn-hongkong.aliyuncs.com/',
    acttvityUrl: 'https://m-test.whispark.com/h/static/pages/',
    appVersionUrl: 'http://codepush.whispark.com/production/update.json',
    appDownloadUrl: 'https://m-test.whispark.com/app/whispark.apk',
    rechargeUrl_android: 'https://pay-test.whispark.com/googlePay/success',
    rechargeUrl_ios: 'https://pay-test.whispark.com/applePay/success',
    aliyunOssUrl: 'oss-cn-hongkong.aliyuncs.com',
    aliyunOssBucket: 'pokalive-test',
  },
  product: {
    baseUrl: 'https://test-api.pokalive.com/',
    websokectUrl: 'https://test-chat.pokalive.com/',
    baseImageUrl: 'https://pokalive-pro.oss-cn-hongkong.aliyuncs.com/',
    acttvityUrl: 'https://m-test.whispark.com/h/static/pages/',
    appVersionUrl: 'http://codepush.whispark.com/production/update.json',
    appDownloadUrl: 'https://m-test.whispark.com/app/whispark.apk',
    rechargeUrl_android: 'https://pay-test.whispark.com/googlePay/success',
    rechargeUrl_ios: 'https://pay-test.whispark.com/applePay/success',
    aliyunOssUrl: 'oss-cn-hongkong.aliyuncs.com',
    aliyunOssBucket: 'pokalive-pro',
  },
};

//  websocket地址
export const WEBSOCKET_URL = appConfigs[env].websokectUrl;

// 图片地址
export const IMG_URL = appConfigs[env].baseImageUrl;

// 活动页地址
export const ACTIVITY_URL = appConfigs[env].acttvityUrl;

// 客服聊天
export const LIVE_SUPPORT_BASE_URL =
  'https://webchat.7moor.com/wapchat.html?accessId=235946d0-4f30-11eb-aae3-a531e030ec3a&fromUrl=m.whispark.com&urlTitle=whispark_app&language=EN';

// 获取app最新版本
export const APP_VERSION_URL = appConfigs[env].appVersionUrl;

// apk下载地址
export const APP_DOWNLOAD_URL = appConfigs[env].appDownloadUrl;

// paydollar
export const PAYDOLLER_URL = appConfigs[env].paydollarUrl;

//google支付地址
export const RECHARGE_URL_ANDROID = appConfigs[env].rechargeUrl_android;
//ios支付地址
export const RECHARGE_URL_IOS = appConfigs[env].rechargeUrl_ios;

export default appConfigs[env];
