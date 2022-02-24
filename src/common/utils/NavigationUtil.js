/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-06 16:34:30
 * @LastEditTime: 2021-10-25 14:09:01
 * @LastEditors: alon
 */
import {StorageUtil} from '@utils';

import {version} from '../../../package.json';

export default class NavigationUtil {
  static navigation = null;
  static route = null;

  static setNavigation(nextNavigation, route) {
    if (nextNavigation) {
      this.navigation = nextNavigation;
    }
  }

  static navigate(routerName, params = {}) {
    if (this.navigation) {
      this.navigation.navigate(routerName, params);
    }
  }

  static goBack() {
    if (this.navigation) {
      this.navigation.goBack();
    }
  }

  static pop(params = 1) {
    if (this.navigation) {
      this.navigation.pop(params);
    }
  }

  static push(routerName, params = {}) {
    if (this.navigation) {
      this.navigation.push(routerName, params);
    }
  }

  /**
   * @description 检测需不需要进入新手指引页面（新用户安装、重装、更新app时候进入新手指引）
   * @static
   */
  static checkShowGuide = () => {
    // 判断版本大小（判断大版本是不是更新了）
    /**
     * @description 判断版本大小（判断大版本是不是更新了）
     * @reqV 需要判断的版本号
     * @curV 当前版本号
     * @static
     */
    const compare = (reqV, curV) => {
      let result = false;
      const arr1 = reqV.split('.');
      const arr2 = curV.split('.');
      const minLength = Math.min(arr1.length, arr2.length);
      let length = minLength > 2 ? 2 : minLength;
      for (let index = 0; index < length; index++) {
        if (arr1[index] > arr2[index]) {
          result = true;
          break;
        }
      }
      return result;
    };

    return StorageUtil.getItem('guide').then(result => {
      if (!result) {
        return true;
      }
      //   判断当前版本号是不是比新人指引页面存储的版本号大
      let guideVersion = JSON.parse(result.value);
      return compare(version, guideVersion.version);
    });
  };

  /**
   * @description 进入新人指引页面（需要判断进入新人指引页面）
   * @static
   */
  static toGuide = async () => {
    const isShowGuide = await this.checkShowGuide();
    if (isShowGuide) {
      this.navigate('Guide');
    } else {
      this.toMainNav();
    }
  };

  /**
   * @description 进入简版路由
   * @static
   */
  static toSimpleNav() {
    this.navigation.reset({
      index: 0,
      routes: [{name: 'SimpleNav'}],
    });
  }

  /**
   * @description 进入主路由
   * @static
   */
  static toBottomNav = () => {
    // this.navigate('MainNav');
    this.navigation.reset({
      index: 0,
      routes: [{name: 'BottomNav'}],
    });
  };

  static toDrawerNav = () => {
    this.navigation.openDrawer();
    // this.navigation.reset({
    //   index: 0,
    //   routes: [{name: 'DrawerNav'}],
    // });
  };

  /**
   * @description 进入登陆页面
   * @static
   */
  static toLogin = () => {
    // this.navigate('MainNav');
    this.navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  /**
   * @description: 進入註冊頁面
   */
  static toLoginIndex = () => {
    // this.navigate('MainNav');
    this.navigation.reset({
      index: 0,
      routes: [{name: 'LoginIndex'}],
    });
  };

  /**
   * @description 进入登陆页面
   * @static
   */
  static getNavRoute = () => {
    // this.navigate('MainNav');
    console.log('沃尔沃二而为他嘎达个', this.route);
  };
}
