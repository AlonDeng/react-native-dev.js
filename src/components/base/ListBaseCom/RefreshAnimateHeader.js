import React, {useRef, useCallback, useMemo, useState} from 'react';
import {
  StyleSheet,
  Animated,
  Platform,
  RefreshControl,
  requireNativeComponent,
  View,
} from 'react-native';
import LottieView from 'lottie-react-native';
// import {SmartRefresh,SmartRefreshHeader} from "../index";
import PropTypes from 'prop-types';
const RNSmartRefresh = requireNativeComponent('RNSmartRefreshView');
const RNSmartRefreshHeader = requireNativeComponent('RNRefreshHeader');

class SmartRefresh extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    style: PropTypes.object,
    onRefresh: PropTypes.func,
    onChangeState: PropTypes.func,
    onChangeOffset: PropTypes.func,
    refreshing: PropTypes.bool,
  };
  static defaultProps = {
    style:
      Platform.OS === 'android'
        ? {flex: 1}
        : {position: 'absolute', left: 0, top: 0, right: 0},
    onRefresh: () => {},
    onChangeOffset: () => {},
    refreshing: false,
  };
  render() {
    const {children} = this.props;
    if (Platform.OS == 'android') {
      return (
        <View style={{flex: 1, overflow: 'hidden'}}>
          <RNSmartRefresh {...this.props}>{children}</RNSmartRefresh>
        </View>
      );
    }
    return <RNSmartRefresh {...this.props}>{children}</RNSmartRefresh>;
  }
}
class SmartRefreshHeader extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const {children, style} = this.props;
    return (
      <RNSmartRefreshHeader>
        <View style={StyleSheet.compose({height: 100}, style)}>{children}</View>
      </RNSmartRefreshHeader>
    );
  }
}

function RefreshAnimateHeader(props) {
  const {
    refreshing,
    onRefresh = () => {},
    source = '',
    containerStyle = {},
  } = props;

  const lottieRef = useRef(React.createRef());
  let offsetValue = new Animated.Value(0);
  let [currentState, setCurrentState] = useState(0);
  const onRefreshCallBack = useCallback(
    state => {
      // lottieRef.current?.startAnimation()
      lottieRef.current?.play();
      onRefresh(state);
    },
    [onRefresh],
  );

  const onIdleRefreshCallBack = useCallback(state => {
    lottieRef.current?.reset();
  }, []);
  const onChangeStateCallBack = useCallback(event => {
    const {state} = event.nativeEvent;
    setCurrentState(state);
    switch (state) {
      case 0:
        onIdleRefreshCallBack();
        break;
      case 2:
        onRefreshCallBack();
        break;
      default:
    }
  }, []);
  const onChangeOffsetCallBack = useCallback(event => {
    const {offset} = event.nativeEvent;

    if (currentState == 0 || currentState == 1) {
      offsetValue.setValue(offset);
    }
  });
  return (
    <SmartRefresh
      refreshing={refreshing}
      onChangeState={onChangeStateCallBack}
      onChangeOffset={onChangeOffsetCallBack}>
      <SmartRefreshHeader style={{...styles.container, ...containerStyle}}>
        <LottieView
          ref={lottieRef}
          style={styles.lottery}
          resizeMode={'cover'}
          loop={true}
          autoSize={false}
          autoPlay={false}
          speed={2}
          source={source}
          hardwareAccelerationAndroid={true}
          cacheStrategy={'strong'}
          progress={offsetValue.interpolate({
            inputRange: [0, 300],
            outputRange: [0, 1],
          })}
        />
      </SmartRefreshHeader>
      {props.children}
    </SmartRefresh>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottery: {
    height: 40,
  },
});

export default React.memo(RefreshAnimateHeader);
