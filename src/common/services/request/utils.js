/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-26 12:10:08
 * @LastEditTime: 2021-10-26 12:22:04
 * @LastEditors: alon
 */
import {ToastCom} from '@base';
import I18n from '@i18n';

export const switchCode = code => {
  switch (code) {
    case 1002: //The email exists, please use another one
      ToastCom.info(I18n.t('register.occupiedEmail'));
      break;
    case 3000: //It is already converted into blog
      return {
        id: 1,
      };
    default:
      break;
  }
};
