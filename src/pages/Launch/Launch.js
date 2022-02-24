/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-06 16:14:25
 * @LastEditTime: 2021-10-07 15:25:03
 * @LastEditors: alon
 */
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

const Launch = props => {
  const {navigation, route} = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type: 'launchModel/load', payload: {navigation, route}});
    return () => {
      dispatch({type: 'launchModel/unload'});
    };
  }, []);
  return <></>;
};

export default Launch;
