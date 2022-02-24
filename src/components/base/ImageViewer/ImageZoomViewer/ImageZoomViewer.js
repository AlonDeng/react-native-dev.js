/*
 * @Description: 文件说明
 * @Author: alon
 * @Date: 2021-03-02 15:25:00
 * @LastEditTime: 2021-07-20 11:05:51
 * @LastEditors: alon
 */
import React from 'react';

import {
  Animated,
  I18nManager,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';
import {BlockCom, TextCom, ButtonCom, ModalSheetCom, ToastCom} from '@base';
import ImageZoom from 'react-native-image-pan-zoom';
import styles, {simpleStyle} from './styles';
import ImageCom from './Image';

export default class ImageViewer extends React.Component {
  static defaultProps = {
    /**
     * 图片数组
     */
    imageUrls: [],

    /**
     * 滑动到下一页的X阈值
     */
    flipThreshold: 80,

    /**
     * 当前页能滑到下一页X位置最大值
     */
    maxOverflow: 300,

    /**
     * 初始显示第几张图
     */
    index: 0,

    /**
     * 占位图
     */
    defaultSource: undefined,

    /**
     * 加载失败的图
     */
    failSource: undefined,

    /**
     * 背景颜色
     */
    backgroundColor: 'black',

    /**
     * 是否允许缩放图片
     */
    enableImageZoom: true,

    style: {},

    /**
     * Enable swipe down to close image viewer.
     * When swipe down, will trigger onCancel.
     */
    enableSwipeDown: false,

    /**
     * threshold for firing swipe down function
     */
    swipeDownThreshold: 300,

    doubleClickInterval: 500,

    /**
     * 是否预加载图片
     */
    enablePreload: false,

    /**
     * 翻页时的动画时间
     */
    pageAnimateTime: 200,

    /**
     * 是否开启useNativeDriver
     */
    useNativeDriver: false,

    /* 是否显示指示器 */

    disableIndicator: false,

    /**
     * 长按图片的回调
     */
    onLongPress: () => {
      //
    },

    /**
     * 单击回调
     */
    onClick: () => {
      //
    },

    /**
     * 双击回调
     */
    onDoubleClick: () => {
      //
    },

    onMove: () => {
      //
    },
    /**
     * 取消看图的回调
     */
    onCancel: () => {
      //
    },

    /**
     * function that fires when user swipes down
     */
    onSwipeDown: () => {
      //
    },
    /**
     * 当图片切换时触发
     */
    onChange: () => {
      //
    },
    /**
     * 自定义计时器
     */
    renderIndicator: (currentIndex, allSize) => {
      return React.createElement(
        View,
        {style: simpleStyle.count},
        React.createElement(
          Text,
          {style: simpleStyle.countText},
          currentIndex + '/' + allSize,
        ),
      );
    },

    /**
     * 自定义左翻页按钮
     */
    renderArrowLeft: () => {
      return null;
    },

    /**
     * 自定义右翻页按钮
     */
    renderArrowRight: () => {
      return null;
    },

    /**
     * 渲染loading元素
     */
    loadingRender: () => {
      return null;
    },
  };
  constructor(props) {
    super(props);
    // 背景透明度渐变动画
    this.fadeAnim = new Animated.Value(0);
    // 当前基准位置
    this.standardPositionX = 0;
    // 整体位移，用来切换图片用
    this.positionXNumber = 0;
    this.positionX = new Animated.Value(0);
    this.width = 0;
    this.height = 0;
    this.styles = styles(0, 0, 'transparent');
    // 是否执行过 layout. fix 安卓不断触发 onLayout 的 bug
    this.hasLayout = false;
    // 记录已加载的图片 index
    this.loadedIndex = new Map();
    /**
     * 图片长宽列表
     */
    this.imageSizes = [];
    this.state = {
      /**
       * 是否显示
       */
      show: false,
      /**
       * 当前显示第几个
       */
      currentShowIndex: props.index || 0,
      /**
       * Used to detect if parent component applied new index prop
       */
      prevIndexProp: props.index || 0,
    };
  }
  componentDidMount() {
    if (this.props.imageUrls.length === 0) {
      return;
    }
    // 给 imageSizes 塞入空数组
    this.imageSizes = [];
    this.props.imageUrls.forEach((imageUrl) => {
      this.imageSizes.push({
        width: imageUrl.width || 0,
        height: imageUrl.height || 0,
        status: 'loading',
      });
    });

    // 立刻预加载要看的图
    this.loadImage(this.props.index || 0);

    this.jumpToCurrentImage();

    // 显示动画
    Animated.timing(this.fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: this.props.useNativeDriver,
    }).start();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.index !== this.props.index) {
      // 立刻预加载要看的图
      this.loadImage(this.props.index || 0);

      this.jumpToCurrentImage();

      // 显示动画
      Animated.timing(this.fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: this.props.useNativeDriver,
      }).start();
    }
  }

  /**
   * 调到当前看图位置
   */
  jumpToCurrentImage() {
    // 跳到当前图的位置
    this.positionXNumber =
      this.width *
      (this.state.currentShowIndex || 0) *
      (I18nManager.isRTL ? 1 : -1);
    this.standardPositionX = this.positionXNumber;
    this.positionX.setValue(this.positionXNumber);
  }

  /**
   * 加载图片，主要是获取图片长与宽
   */
  loadImage(index) {
    // 图片不存在  或者  已存在已执行过加载的列表内
    if (!this.imageSizes[index] || this.loadedIndex.has(index)) {
      return;
    }
    this.loadedIndex.set(index, true);

    const image = this.props.imageUrls[index];

    // 如果已经有宽高了，直接设置为 success
    if (this.imageSizes[index].width > 0 && this.imageSizes[index].height > 0) {
      this.imageSizes[index].status = 'success';
      return;
    }

    // 图片是否加载完毕
    let imageLoaded = false;

    // Tagged success if url is started with file:, or not set yet(for custom source.uri).
    if (!image.url || image.url.startsWith('file:')) {
      imageLoaded = true;
    }

    // 已知源图片宽高
    if (image.width && image.height) {
      if (this.props.enablePreload && imageLoaded === false) {
        Image.prefetch(image.url);
      }
      this.imageSizes[index].width = image.width;
      this.imageSizes[index].height = image.height;
      this.imageSizes[index].status = 'success';
      return;
    }
    // 加载图片
    Image.getSize(
      image.url,
      (width, height) => {
        this.imageSizes[index].width = width;
        this.imageSizes[index].height = height;
        this.imageSizes[index].status = 'success';
        this.forceUpdate();
      },
      () => {
        this.imageSizes[index].status = 'fail';
        this.forceUpdate();
      },
    );
  }

  /**
   * 预加载图片
   */
  preloadImage = (index) => {
    if (index < this.imageSizes.length) {
      this.loadImage(index + 1);
    }
    if (index > 0) {
      this.loadImage(index - 1);
    }
  };
  /**
   * 触发溢出水平滚动
   */
  handleHorizontalOuterRangeOffset = (offsetX = 0) => {
    this.positionXNumber = this.standardPositionX + offsetX;
    this.positionX.setValue(this.positionXNumber);

    const offsetXRTL = !I18nManager.isRTL ? offsetX : -offsetX;

    if (offsetXRTL < 0) {
      if (this.state.currentShowIndex || this.props.imageUrls.length - 1 > 0) {
        this.loadImage((this.state.currentShowIndex || 0) + 1);
      }
    } else if (offsetXRTL > 0) {
      if (this.state.currentShowIndex || this.state.currentShowIndex > 0) {
        this.loadImage((this.state.currentShowIndex || 0) - 1);
      }
    }
  };

  /**
   * 手势结束，但是没有取消浏览大图
   */
  handleResponderRelease = (vx = 0) => {
    const vxRTL = I18nManager.isRTL ? -vx : vx;
    const isLeftMove = I18nManager.isRTL
      ? this.positionXNumber - this.standardPositionX <
        -(this.props.flipThreshold || 0)
      : this.positionXNumber - this.standardPositionX >
        (this.props.flipThreshold || 0);
    const isRightMove = I18nManager.isRTL
      ? this.positionXNumber - this.standardPositionX >
        (this.props.flipThreshold || 0)
      : this.positionXNumber - this.standardPositionX <
        -(this.props.flipThreshold || 0);

    if (vxRTL > 0.7) {
      // 上一张
      this.goBack();

      // 这里可能没有触发溢出滚动，为了防止图片不被加载，调用加载图片
      if (this.state.currentShowIndex || this.state.currentShowIndex > 0) {
        this.loadImage((this.state.currentShowIndex || 0) - 1);
      }
      return;
    } else if (vxRTL < -0.7) {
      // 下一张
      this.goNext();
      if (this.state.currentShowIndex || this.props.imageUrls.length - 1 > 0) {
        this.loadImage((this.state.currentShowIndex || 0) + 1);
      }
      return;
    }

    if (isLeftMove) {
      // 上一张
      this.goBack();
    } else if (isRightMove) {
      // 下一张
      this.goNext();
      return;
    } else {
      // 回到之前的位置
      this.resetPosition();
      return;
    }
  };

  /**
   * 到上一张
   */
  goBack = () => {
    if (this.state.currentShowIndex === 0) {
      // 回到之前的位置
      this.resetPosition();
      return;
    }

    this.positionXNumber = !I18nManager.isRTL
      ? this.standardPositionX + this.width
      : this.standardPositionX - this.width;
    this.standardPositionX = this.positionXNumber;
    Animated.timing(this.positionX, {
      toValue: this.positionXNumber,
      duration: this.props.pageAnimateTime,
      useNativeDriver: this.props.useNativeDriver,
    }).start();

    const nextIndex = (this.state.currentShowIndex || 0) - 1;
    this.loadImage(nextIndex);
    this.setState(
      {
        currentShowIndex: nextIndex,
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state.currentShowIndex);
        }
      },
    );
  };

  /**
   * 到下一张
   */
  goNext = () => {
    if (this.state.currentShowIndex === this.props.imageUrls.length - 1) {
      // 回到之前的位置
      this.resetPosition();
      return;
    }

    this.positionXNumber = !I18nManager.isRTL
      ? this.standardPositionX - this.width
      : this.standardPositionX + this.width;
    this.standardPositionX = this.positionXNumber;
    Animated.timing(this.positionX, {
      toValue: this.positionXNumber,
      duration: this.props.pageAnimateTime,
      useNativeDriver: this.props.useNativeDriver,
    }).start();

    const nextIndex = (this.state.currentShowIndex || 0) + 1;
    this.loadImage(nextIndex);
    this.setState(
      {
        currentShowIndex: nextIndex,
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state.currentShowIndex);
        }
      },
    );
  };

  /*
    跳转到特定位置
  */
  goIndex(newIndex) {
    this.loadImage(newIndex);
    this.setState(
      {
        currentShowIndex: newIndex,
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state.currentShowIndex);
        }
      },
    );
    // 立刻预加载要看的图
    this.loadImage(newIndex || 0);

    // 跳到当前图的位置
    this.positionXNumber =
      this.width * (newIndex || 0) * (I18nManager.isRTL ? 1 : -1);
    this.standardPositionX = this.positionXNumber;
    this.positionX.setValue(this.positionXNumber);
  }

  /**
   * 回到原位
   */
  resetPosition() {
    this.positionXNumber = this.standardPositionX;
    Animated.timing(this.positionX, {
      toValue: this.standardPositionX,
      duration: 150,
      useNativeDriver: this.props.useNativeDriver,
    }).start();
  }

  // 向下滑动回调
  handleSwipeDown = (index) => {
    if (this.props.onSwipeDown) {
      this.props.onSwipeDown();
    }
    this.handleCancel();
  };

  /**
   * 移动
   */
  handleMove = (index) => {
    this.props.onMove && this.props.onMove();
  };

  /**
   * 长按
   */
  handleLongPress = (index) => {};

  /**
   * 单击
   */
  handleClick = (index) => {
    this.props.onClick && this.props.onClick();
  };

  /**
   * 双击
   */
  handleDoubleClick = (index) => {
    this.props.onDoubleClick && this.props.onDoubleClick();
  };

  /**
   * 退出
   */
  handleCancel = () => {
    this.hasLayout = false;
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };

  /**
   * 完成布局
   */
  handleLayout = (event) => {
    if (event.nativeEvent.layout.width !== this.width) {
      this.hasLayout = true;

      this.width = event.nativeEvent.layout.width;
      this.height = event.nativeEvent.layout.height;
      this.styles = styles(
        this.width,
        this.height,
        this.props.backgroundColor || 'transparent',
      );
      // 强制刷新
      this.forceUpdate();
      this.jumpToCurrentImage();
    }
  };

  //   创建3个图片元素，能循环切换
  createImages() {
    // 获得屏幕宽高
    const screenWidth = this.width;
    const screenHeight = this.height;
    const isRenderElement = (index) => {
      const faultElement =
        !this.imageSizes[index] ||
        this.imageSizes[index].width == null ||
        this.imageSizes[index].height == null;
      const excessElement =
        this.state.currentShowIndex > index + 1 ||
        this.state.currentShowIndex < index - 1;
      return faultElement || excessElement;
    };

    const renderEmpty = (index) => (
      <View key={index} style={{width: screenWidth, height: screenHeight}} />
    );

    let result = this.props.imageUrls.map((image, index) => {
      if (isRenderElement(index)) {
        return renderEmpty(index);
      }
      const imageInfo = this.imageSizes[index] || {};
      let {width, height, status} = imageInfo;

      // 如果图片宽大于屏幕宽度,图片缩放到宽度是屏幕宽度
      if (width > screenWidth) {
        const widthPixel = screenWidth / width;
        width *= widthPixel;
        height *= widthPixel;
      }

      

      // 如果图片高度大于屏幕高度,图片缩放到高度是屏幕高度
      if (height > screenHeight) {
        const HeightPixel = screenHeight / height;
        width *= HeightPixel;
        height *= HeightPixel;
      }

      //如果图片宽小于屏幕宽度,图片放大到宽度是屏幕宽度
      if (width < screenWidth && width) {
        const amplifyRate = screenWidth / width;
        width *= amplifyRate;
        height *= amplifyRate;
      }

      // //如果图片宽小于屏幕宽度,图片放大到宽度是屏幕宽度
      // if (height < screenHeight && height) {
      //   const amplifyRate = screenHeight / height;
      //   width *= amplifyRate;
      //   height *= amplifyRate;
      // }



      let imageProps = {
        style: {},
        source: image,
        enableImageZoom: true,
        ontherProps: {},
        lodingStatus:imageInfo.status,
        lodingStatusArr:this.imageSizes
      };

      imageProps.style = {
        ...this.styles.imageStyle, // User config can override above.
        width,
        height,
      };

      imageProps.enableImageZoom = image.enableImageZoom;
      imageProps.ontherProps = image.ontherProps;
      if (typeof image !== 'number') {
        imageProps.source = {
          uri: image.url,
        };
      }
      if (this.props.enablePreload) {
        this.preloadImage(this.state.currentShowIndex || 0);
      }
      return (
        <ImageZoom
          key={index}
          cropWidth={screenWidth} //操作区域宽度
          cropHeight={screenHeight} //操作区域高度
          imageWidth={(status === 'success' && width) || screenWidth} //图片宽度
          imageHeight={(status === 'success' && height) || screenHeight} //图片高度
          maxOverflow={this.props.maxOverflow} //最大滑动阈值
          horizontalOuterRangeOffset={this.handleHorizontalOuterRangeOffset.bind(
            this,
          )} //横向超出的距离，父级做图片切换时，可以监听这个函数 当此函数触发时，可以做切换操作
          responderRelease={this.handleResponderRelease.bind(this)} //松手但是没有取消看图的回调
          onMove={this.handleMove.bind(this, index)} //每次移动时被调用
          onLongPress={this.handleLongPress.bind(this, index)} //长按的回调
          onClick={this.handleClick.bind(this, index)} //单击的回调
          onDoubleClick={this.handleDoubleClick.bind(this, index)} //双击的回调
          enableSwipeDown={this.props.enableSwipeDown} //向下滑动手势监听开启
          swipeDownThreshold={this.props.swipeDownThreshold} //向下滑动阈值
          onSwipeDown={this.handleSwipeDown.bind(this, index)} //向下滑动回调
          panToMove={true} //允许滑动图片
          // pinchToZoom={this.props.enableImageZoom && status === 'success'} //允许用两个手指缩放
          // enableDoubleClickZoom={
          //   this.props.enableImageZoom && status === 'success'
          // } //双击放大

          //是否对单张设置缩放，ImagesScaledSeparately默认为false 如果为true就是单独设置
          //如果没有设置ImagesScaledSeparately 那就是所有图片设置  enableImageZoom图片默认是true 可以缩放  如果设置为false就禁用缩放
          pinchToZoom={
            ((this.props.ImagesScaledSeparately && image.enableImageZoom) ||
              (!this.props.ImagesScaledSeparately &&
                this.props.enableImageZoom)) &&
            status === 'success'
          } //允许用两个手指缩放
          enableDoubleClickZoom={
            ((this.props.ImagesScaledSeparately && image.enableImageZoom) ||
              (!this.props.ImagesScaledSeparately &&
                this.props.enableImageZoom)) &&
            status === 'success'
          } //双击放大
          doubleClickInterval={this.props.doubleClickInterval} //双击计时器最大间隔
          minScale={this.props.minScale}
          maxScale={this.props.maxScale}
          useNativeDriver={true}>
          <View>
            {/* 可以自定义图片区域 */}
            {this.props.renderImage ? (
              this.props.renderImage(imageProps)
            ) : (
              <ImageCom {...imageProps} />
            )}
            {/* loading 页面 */}
            {this.props.loadingRender && status === 'loading' && (
              <View
                style={{
                  width: screenWidth,
                  height: screenHeight,
                  position: 'absolute',
                  zIndex: 2,
                }}>
                {this.props.loadingRender()}
              </View>
            )}
            {/* 图片未加载完成时的占位图 */}
            {this.props.defaultSource && status === 'loading' && (
              <View
                style={{
                  width: screenWidth,
                  height: screenHeight,
                  position: 'absolute',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={[this.props.defaultSource.style]}
                  source={this.props.defaultSource.source}
                />
              </View>
            )}
            {/* 图片加载失败 */}
            {this.props.failSource && status === 'fail' && (
              <View
                style={{
                  width: screenWidth,
                  height: screenHeight,
                  position: 'absolute',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={[this.props.failSource.style]}
                  source={this.props.failSource.source}
                />
              </View>
            )}
          </View>
        </ImageZoom>
      );
    });
    return result;
  }

  /**
   * 页面内容
   */
  getContent() {
    const ImageElements = this.createImages();
    return (
      <Animated.View style={{zIndex: 9}}>
        <Animated.View
          style={{...this.styles.container, opacity: this.fadeAnim}}>
          {/* 左 */}
          <View style={this.styles.arrowLeftContainer}>
            <TouchableWithoutFeedback onPress={this.goBack}>
              <View>{this.props.renderArrowLeft()}</View>
            </TouchableWithoutFeedback>
          </View>
          {/* 右 */}
          <View style={this.styles.arrowRightContainer}>
            <TouchableWithoutFeedback onPress={this.goNext}>
              <View>{this.props.renderArrowRight()}</View>
            </TouchableWithoutFeedback>
          </View>

          {/* 图片元素组 */}
          <Animated.View
            style={{
              ...this.styles.moveBox,
              transform: [{translateX: this.positionX}],
              width: this.width * this.props.imageUrls.length,
            }}>
            {ImageElements}
          </Animated.View>

          {/* 指示器 */}
          {!this.props.disableIndicator &&
            this.props.renderIndicator(
              (this.state.currentShowIndex || 0) + 1,
              this.props.imageUrls.length,
            )}
        </Animated.View>
      </Animated.View>
    );
  }

  render() {
    return (
      <View
        onLayout={this.handleLayout}
        style={{
          flex: 1,
          overflow: 'hidden',
          ...this.props.style,
        }}>
        {this.getContent()}
      </View>
    );
  }
}
