/*
 * @Description: 具体listCom 逻辑，请查看 base 里面的 ListCom
 * @Author: alon
 * @Date: 2021-04-22 16:43:36
 * @LastEditTime: 2021-11-02 11:59:21
 * @LastEditors: alon
 */
import React, {useRef, useImperativeHandle, forwardRef} from 'react';
import {useSelector} from 'react-redux';
import {NotNetworkCom} from '@business';
import {ListBaseCom, BlockCom} from '@base';

const ListCom = (props, ref) => {
  //   console.log('ListCom .........重新渲染了 ');
  const listRef = useRef();
  useImperativeHandle(ref, () => ({
    //return a mutable object 變量，current的属性被初始化為可以傳遞的參數initialValue，每次會返回相同的引用。
    refresh: listRef?.current?.refresh,
    manualRefresh: listRef?.current?.manualRefresh,
    scrollToEnd: listRef?.current?.scrollToEnd,
    isEmptyData: listRef?.current?.isEmptyData,
    fetchSuccess: listRef?.current?.fetchSuccess,
  }));

  const isNetworkConnect = useSelector(
    store => store.appModel.isNetworkConnect,
  );

  return (
    <>{true ? <ListBaseCom {...props} ref={listRef} /> : <NotNetworkCom />}</>
    // <BlockCom flex={false}>
    //   <NotNetworkCom />
    // </BlockCom>
  );
};

export default forwardRef(ListCom);
