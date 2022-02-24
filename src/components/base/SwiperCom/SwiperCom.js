/*
 * @Description: 文件说明
 * @Author: alon
 * @Date: 2021-03-05 14:33:13
 * @LastEditTime: 2021-03-05 14:43:50
 * @LastEditors: alon
 */

/*
Carousel Props

name   dosc   type   default

selectedIndex	手动设置当前显示的索引	number	0
dots	是否显示面板指示点	Boolean	true
vertical	垂直显示	Boolean	false
autoplay	是否自动切换	Boolean	false
autoplayInterval	自动切换的时间间隔	Number	3000
infinite	是否循环播放	Boolean	false
afterChange	切换面板后的回调函数	(current: number): void	无
dotStyle	指示点样式	Object	无
dotActiveStyle	当前激活的指示点样式	Object	无
onScrollBeginDrag	见 react-native scrollView onScrollBeginDrag	(): void	无
bounces	见 react-native scrollView bounces	Boolean	true
pagination	自定义 pagination	(props) => React.ReactNode
*/

import {Carousel} from '@ant-design/react-native';

export default Carousel;
