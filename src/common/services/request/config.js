/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-08 14:19:53
 * @LastEditTime: 2021-10-08 14:25:07
 * @LastEditors: alon
 */

import env from '../../config';

export const BASE_URL = env.baseUrl;
export const REQUEST_TIME_OUT = 10000;

export const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};
