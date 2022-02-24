import React, {Component} from 'react';
import {
  TouchableWithoutFeedback,
  Modal,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {BlockCom, TextCom} from '@base';
import PropTypes from 'prop-types';
import {dp, screenW} from '@utils/ScreenUtil';
import ImageZoomViewer from './ImageZoomViewer/ImageZoomViewer';
import ImageUtils from '@utils/ImageUtils';

/**
 * 图片查看大图组件
 *
 * 宽高参数可选。知道图片大小设置宽高可优化性能。也可做统一图片大小使用
 * 网络图片
 * images = [{
 *      url: 'https://image1.test.whispark.com/201612/L2581923/icon/a7d9ff8bc61b4c888861899c0d64b2c1.jpg',
 *      width: px2dp(375),
 *      height: px2dp(503)
 *  }]
 *
 * 本地文件
 * images = [{
 *      url: '',
 *      props: {
 *          source: require('../../...')
 *      }
 * }]
 *
 */
export default class ImageViewer extends Component {
  static propTypes = {
    imageUrls: PropTypes.array, //imgs
    footerContainerStyle: PropTypes.object,
    onClick: PropTypes.func, //单次点击事件
    additionalView: PropTypes.func,
    children: PropTypes.func, //额外视图
    showRenderArrow: PropTypes.bool, //是否显示左右箭头
  };
  static defaultProps = {
    // footerContainerStyle: {}
    width: 375,
    height: 503,
    isPage: false, //true:不作为弹窗 false:作为弹窗显示
    showRenderArrow: true, //是否显示左右箭头
  };

  constructor(props) {
    super(props);
    this.state = {
      index: props.index,
      modalStatus: false,
      position: props.index + 1, //当前位置
    };
  }

  //这里是写的一个loading
  _renderLoading() {
    return (
      <BlockCom center middle>
        <ActivityIndicator />
      </BlockCom>
    );
  }

  render() {
    let {
      imageUrls,
      footerContainerStyle,
      onClick,
      saveToLocalByLongPress = false,
      children,
      isPage,
      width,
      height,
    } = this.props;
    const {index, modalStatus, position} = this.state;
    const length = imageUrls.length || 0;
    if (isPage) {
      return (
        <BlockCom center>
          <BlockCom flex={false}>
            <ImageZoomViewer
              // renderHeader={this._renderHeader}
              // backgroundColor={'white'}
              ref={ref => (this.imageViewerRef = ref)}
              style={{
                width: px2dp(width),
                height: px2dp(height),
                flex: 1,
              }}
              imageUrls={imageUrls}
              onCancel={() => this.closeView()}
              index={index}
              renderIndicator={() => <BlockCom />}
              saveToLocalByLongPress={saveToLocalByLongPress}
              onClick={onClick}
              onChange={this._onChange}
              enablePreload={true}
                // loadingRender={this._renderLoading}
              defaultSource={{
                source: ImageUtils.photo_jia_zai,
                style: {
                  width: px2dp(150),
                  height: px2dp(150),
                },
              }}
              failSource={{
                source: ImageUtils.photo_none_img,
                style: {
                  width: px2dp(150),
                  height: px2dp(150),
                },
              }}
              renderArrowLeft={
                length && length > 1
                  ? this._renderArrowLeft
                  : () => {
                      return <BlockCom />;
                    }
              }
              renderArrowRight={
                length && length > 1
                  ? this._renderArrowRight
                  : () => {
                      return <BlockCom />;
                    }
              }
              // footerContainerStyle={footerContainerStyle}
            />
          </BlockCom>
          {/* <BlockCom flex={false} style={{ position: 'absolute', top: 200 }} width={400} height={300} bgColor={'textFocus'} ></BlockCom> */}
          {children && children()}
        </BlockCom>
      );
    }
    return (
      <Modal
        visible={modalStatus}
        hardwareAccelerated={true}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {
          this.setState({
            modalStatus: false,
          });
        }}>
        <TouchableWithoutFeedback
          onPress={() =>
            this.setState({
              modalStatus: false,
            })
          }>
          <BlockCom
            style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
            row
            middle
            center>
            <TouchableWithoutFeedback onPress={() => {}}>
              <BlockCom radius={8} flex={false} width={width} height={height}>
                <TouchableWithoutFeedback onPress={() => this.closeView()}>
                  <BlockCom
                    width={30}
                    height={30}
                    flex={false}
                    style={{
                      position: 'absolute',
                      zIndex: 99999,
                      right: 10,
                      top: 10,
                    }}>
                    <Image
                      source={ImageUtils.icon_close}
                      style={{
                        width: px2dp(30),
                        height: px2dp(30),
                        resizeMode: 'contain',
                      }}
                    />
                  </BlockCom>
                </TouchableWithoutFeedback>
                <ImageZoomViewer
                  saveToLocalByLongPress={saveToLocalByLongPress}
                  imageUrls={imageUrls}
                  backgroundColor={'white'}
                  ref={ref => (this.imageViewerRef = ref)}
                  onCancel={() => this.closeView()}
                  onChange={this._onChange}
                  index={index}
                  enablePreload={true}
                  renderIndicator={() => <BlockCom />}
                  onClick={onClick}
                  renderArrowLeft={
                    length && length > 1
                      ? this._renderArrowLeft
                      : () => {
                          return <BlockCom />;
                        }
                  }
                  renderArrowRight={
                    length && length > 1
                      ? this._renderArrowRight
                      : () => {
                          return <BlockCom />;
                        }
                  }
                />
              </BlockCom>
            </TouchableWithoutFeedback>
          </BlockCom>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  //延时load上一张图片，否则点击上一张时不显示
  componentDidMount() {}

  //图片改变时的回调
  _onChange = index => {
    this.setState({
      position: index + 1,
    });
    this.props.onChange && this.props.onChange(index);
  };

  //header
  _renderHeader = index => {
    return (
      <BlockCom flex={false} width={200} height={30} bgColor="darkYellow">
        <TextCom>{index}</TextCom>
      </BlockCom>
    );
  };

  //自定义左箭头
  _renderArrowLeft = () => {
    let {showRenderArrow} = this.props;
    let {position} = this.state;
    if (!showRenderArrow || position === 1) {
      return null;
    }
    return (
      <BlockCom
        flex={false}
        width={40}
        height={40}
        radius={8}
        margin={[0, 0, 0, 15]}
        center
        middle
        style={styles.page_btn_bg}>
        <Image
          style={styles.page_img_style}
          source={ImageUtils.common_page_left}
        />
      </BlockCom>
    );
  };

  //自定义右箭头
  _renderArrowRight = () => {
    let {imageUrls, showRenderArrow} = this.props;
    let {position} = this.state;
    if (!showRenderArrow || position === imageUrls.length) {
      return null;
    }
    return (
      <BlockCom
        flex={false}
        width={40}
        height={40}
        radius={8}
        margin={[0, 15, 0, 0]}
        center
        middle
        style={styles.page_btn_bg}>
        <Image
          style={styles.page_img_style}
          source={ImageUtils.common_page_right}
        />
      </BlockCom>
    );
  };

  showView(index = 0) {
    this.setState({
      index,
      position: index + 1,
      modalStatus: true,
    });
    this.props.showView && this.props.showView();
  }

  closeView() {
    this.setState({
      modalStatus: false,
    });
    this.props.close && this.props.closeView();
  }
}

const styles = StyleSheet.create({
  page_btn_bg: {
    backgroundColor: 'rgba(51,51,51,0.35)',
  },
  page_img_style: {
    width: px2dp(17),
    height: px2dp(30),
    resizeMode: 'contain',
  },
});
