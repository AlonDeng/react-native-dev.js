/*
 * @Descripttion: 
 * @version: 
 * @Author: alon
 * @Date: 2021-02-25 14:35:45
 * @LastEditors: alon
 * @LastEditTime: 2021-03-09 10:07:40
 */


// Tabs#
// 属性	说明	类型	默认值	必选
// tabs	tab数据	Models.TabData[]		true
// tabBarPosition	TabBar位置	'top' | 'bottom'	top	false
// renderTabBar	替换TabBar	((props: TabBarPropsType) => React.ReactNode) | false		false
// initialPage	初始化Tab, index or key	number | string		false
// page	当前Tab, index or key	number | string		false
// swipeable	是否可以滑动内容切换	boolean	true	false
// useOnPan	使用跟手滚动	boolean	true	false
// prerenderingSiblingsNumber	预加载两侧Tab数量	number	1	false
// animated	是否开启切换动画	boolean	true	false
// onChange	tab变化时触发	(tab: Models.TabData, index: number) => void		false
// onTabClick	tab 被点击的回调	(tab: Models.TabData, index: number) => void		false
// destroyInactiveTab	销毁超出范围Tab	boolean	false	false
// distanceToChangeTab	滑动切换阈值(宽度比例)	number	0.3	false
// usePaged	是否启用分页模式	boolean	true	false
// tabBarUnderlineStyle	tabBar下划线样式	React.CSSProperties | any		false
// tabBarBackgroundColor	tabBar背景色	string		false
// tabBarActiveTextColor	tabBar激活Tab文字颜色	string		false
// tabBarInactiveTextColor	tabBar非激活Tab文字颜色	string		false
// tabBarTextStyle	tabBar文字样式	React.CSSProperties | any		false
// renderTab	替换TabBar的Tab	(tab: Models.TabData) => React.ReactNode		false
// renderUnderline	renderUnderline	(style: any) => React.ReactNode		false


// tips : swipeable 和 usePaged同时为false时，页面禁止滑动

import React from 'react';
import {Tabs} from '@ant-design/react-native';

export default Tabs;
