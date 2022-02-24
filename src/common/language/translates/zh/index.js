/*
 * @Description: 
 * @Author: alon
 * @Date: 2021-04-17 10:19:47
 * @LastEditTime: 2021-10-29 16:15:59
 * @LastEditors: alon
 */

import common from './common';
import login from './login';
import bottomBar from './bottomBar';
import home from './home';
import personal from './personal';
import community from './community';
import quick from './quick';
import church from './church';
import business from './business';
import chat from './chat';
import merritsAndShekels from './merritsAndShekels';

export default {
  ...common,
  ...login,
  ...bottomBar,
  ...home,
  ...personal,
  ...community,
  ...quick,
  ...church,
  ...business,
  ...chat,
  ...merritsAndShekels,
};
