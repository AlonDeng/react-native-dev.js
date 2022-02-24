/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-06 16:16:25
 * @LastEditTime: 2021-11-01 10:39:25
 * @LastEditors: alon
 */
import appModel from './appModel';
import launchModel from './launchModel';
import loginModel from './loginModel';

import personalModel from './personal/personalModel';
import homeModel from './home/homeModel';
import favoriteModel from './favorite/favoriteModel';
import reserveModel from './reserve/reserveModel';
import mailModela from './mail/mailModel';

const modules = [
  launchModel,
  appModel,
  loginModel,
  personalModel,
  homeModel,
  mailModela,
  reserveModel,
  favoriteModel,
];

export default modules;
