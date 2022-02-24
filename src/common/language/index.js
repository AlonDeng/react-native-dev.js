/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-08 09:46:15
 * @LastEditTime: 2021-10-13 10:43:05
 * @LastEditors: alon
 */

import translations from './translates/';

import i18n from 'react-native-i18n';
import {NativeModules, Platform} from 'react-native';

const defaultLanguage = 'zh-HK'; //'en';
i18n.defaultLocale = defaultLanguage;
i18n.fallbacks = true;

i18n.translations = translations;

const deviceLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
    : NativeModules.I18nManager.localeIdentifier;

i18n.locale = deviceLanguage;

const setLanguage = language => {
  // console.log('setLanguage', language);
  i18n.locale = language;
};
const getLanguage = () => {
  return i18n.locale;
};
export default {...i18n, setLanguage, getLanguage};
