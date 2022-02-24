/*
 * @Description: 文件说明
 * @Author: alon
 * @Date: 2020-10-28 15:32:09
 * @LastEditTime: 2021-11-02 16:22:10
 * @LastEditors: alon
 */

/**  onFetch
 * @description 调用onFetch请求接口时，会传递一个param，需要在接口请求结束后调用
 * @param {Object} parms
 * {
 *  @param {String} type: 请求类型 first:第一次加载; pullRefresh: 头部下拉刷新; endReached: 底部刷新
 *  @param {function(endPage {boolen}: 最后一页数据)} success: 接口请求成功后调用
 *  @param {function} fail : 接口请求失败后调用
 * }
 *
 * onFetch({type,success,fail}); --> api.then(() => { success(end?) }).catch((err) => { fail() })
 */

import React, {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
  useMemo,
} from 'react';
import {View, FlatList, Platform} from 'react-native';
import {EmptyCom} from '@business';
import ListPullRefresh from './ListPullRefresh';
import ListSlideRefresh from './ListSlideRefresh';
import ListFirstLoading from './ListFirstLoading';
import {px} from '@utils';

const LOAD_MODE_STATE = {
  stanby: 0, //等待
  loading: 1, //加载接口中
  finally: 2, //最后一页，停止上滑加载操作
};

const ListBaseCom = (props, ref) => {
  const {
    initialNumToRender = 10,
    data = [],
    onFetch = () => {},
    separator,
    onEndReachedThreshold = 0.5,
    scrollEnabled = true,
    extraData,
    renderEmpty,
    isFirstFetch = true,
    noMoreComponent = () => {},
    emptyDataText,
    containerStyle = {},
  } = props;
  const listRef = useRef();
  const [isFirst, setFirst] = useState(isFirstFetch);
  const [isPull, setPull] = useState(false);
  const [loadMoreState, setLoadMore] = useState(0);

  const [listStyles, setListStyle] = useState({});

  useImperativeHandle(ref, () => ({
    refresh: function (config) {
      onRefresh(config);
    },
    manualRefresh: function (callback) {
      listRef?.current?.scrollToOffset({offset: 0});
      onManualRefresh();
      callback && callback();
    },
    scrollToEnd: () => {
      listRef?.current?.scrollToEnd(true);
    },
    isEmptyData: () => data.length <= 0,
    fetchSuccess: function (endPage = false) {
      setFirst(false);
      if (endPage) {
        setLoadMore(LOAD_MODE_STATE.finally);
      }
    },
  }));

  useEffect(() => {
    if (isFirstFetch) {
      onFetch({
        type: 'first',
        success: endPage => fetchCallBack('first', true, endPage),
        fail: fetchCallBack.bind(null, 'first', false),
      });
    }
    // if (!isFirstFetch) setFirst(false);
  }, []);

  const onScroll = event => {
    props.onScroll && props.onScroll(event);
  };

  const fetchCallBack = (type, requestSuccess, endPage = false) => {
    let loadMoreState = LOAD_MODE_STATE.stanby;
    if (type === 'first') {
      // console.log('-------- first');
      //   第一次加载列表，调用网络接口的回调
      setFirst(false);
    } else if (type === 'pullRefresh') {
      //   下拉刷新，调用网络接口的回调
      setPull(false);
    } else if (type === 'endReached') {
      setPull(false);
      //   底部刷新，调用网络接口的回调
      // if (requestSuccess === true) {
      // }
    }
    if (endPage) {
      //   到达最后一页
      loadMoreState = LOAD_MODE_STATE.finally;
    }
    setLoadMore(loadMoreState);
  };

  /**
   * @description 下拉刷新
   */
  const onRefresh = config => {
    if (isPull === false) {
      setPull(true);
      onFetch({
        type: 'pullRefresh',
        success: endPage => fetchCallBack('pullRefresh', true, endPage),
        fail: fetchCallBack.bind(null, 'pullRefresh', false),
        config,
      });
    }
  };
  /**
   * @description 手动刷新
   */
  const onManualRefresh = () => {
    setFirst(true);
    onFetch({
      type: 'first',
      success: endPage => fetchCallBack('first', true, endPage),
      fail: fetchCallBack.bind(null, 'first', false),
    });
  };

  /**
   * @description 底部触发
   */
  const onEndReached = () => {
    // console.log('onEndReached--------', loadMoreState);
    //   判断当前是不是刷新中和已经是最后一页
    if (
      loadMoreState === LOAD_MODE_STATE.stanby &&
      loadMoreState !== LOAD_MODE_STATE.finally
    ) {
      setLoadMore(LOAD_MODE_STATE.loading);
      onFetch({
        type: 'endReached',
        success: endPage => fetchCallBack('endReached', true, endPage),
        fail: fetchCallBack.bind(null, 'endReached', false),
      });
    }
  };

  /**
   * @description 初次加载时的loading
   */
  const renderFirstLoading = useMemo(() => <ListFirstLoading />, [isFirst]);

  /**
   * @description 上滑刷新的loading视图  没有更多
   */
  const renderListFooter = useMemo(
    () => (
      <>
        {loadMoreState == LOAD_MODE_STATE.finally && noMoreComponent()}
        <View>
          <ListSlideRefresh loadMoreState={loadMoreState} />
          {
            // android react-native-smartrefreshlayout组件会导致flat list高度变高，超出容器，导致缺失内容，底部增加空白元素将内容顶上去
            Platform.OS === 'android' && <View style={{height: px(120)}} />
          }
        </View>
      </>
    ),
    [loadMoreState],
  );

  /**
   * @description list下拉刷新视图
   */
  const renderRefreshControl = useMemo(
    () => (
      <ListPullRefresh
        containerStyle={containerStyle}
        refreshing={isPull}
        onRefresh={onRefresh}
      />
    ),
    [isPull],
  );

  /**
   * @description 列表为空时展示的视图
   */
  const _renderEmpty = useMemo(
    () => <EmptyCom height={listStyles.height} i18nTitle={emptyDataText} />,
    [listStyles, emptyDataText],
  );

  /**
   * @description 列表视图
   */
  const renderList = (
    <FlatList
      {...props}
      ref={listRef}
      data={data}
      // extraData={extraData}
      extraData={extraData}
      scrollEnabled={scrollEnabled}
      showsVerticalScrollIndicator={false}
      initialNumToRender={initialNumToRender}
      onEndReachedThreshold={onEndReachedThreshold}
      keyExtractor={(item, index) => `${item?.id}${index}`}
      onScroll={onScroll}
      onEndReached={onEndReached}
      ItemSeparatorComponent={separator}
      refreshControl={renderRefreshControl}
      ListFooterComponent={data.length <= 0 ? null : renderListFooter}
      ListEmptyComponent={renderEmpty ? renderEmpty : _renderEmpty}
      style={props.listStyle ? props.listStyle : {flex: 1}}
      onLayout={e => {
        setListStyle(e.nativeEvent.layout);
      }}
    />
  );

  return (
    <View style={{flex: 1, overflow: 'hidden'}}>
      {/* 第一次加载显示renderFirstLoading */}
      {isFirst ? renderFirstLoading : renderList}
      {/* {renderList} */}
    </View>
  );
};

export default forwardRef(ListBaseCom);
