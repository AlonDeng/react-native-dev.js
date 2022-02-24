/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-08 15:55:45
 * @LastEditTime: 2021-10-12 14:20:05
 * @LastEditors: alon
 */
import request from '../request/index';

export const login = data =>
  request.post({
    url: 'users/login',
    data,
    options: {
      authorization: false,
    },
  });

export const register = data =>
  request.post({
    url: 'users/register',
    data,
    options: {
      authorization: false,
    },
  });

export const sendForgotEmail = data =>
  request.post({
    url: 'users/reset',
    data,
    options: {
      authorization: false,
    },
  });

export const resetPassword = data =>
  request.post({
    url: 'users/reset',
    data,
    options: {
      authorization: false,
    },
  });

export const requestCode = data =>
  request.post({
    url: 'emailVerifies/requestCode',
    data,
    options: {
      authorization: false,
    },
  });
