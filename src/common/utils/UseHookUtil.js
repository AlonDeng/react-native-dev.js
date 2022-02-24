/*
 * @Description:
 * @Author: alon
 * @Date: 2021-05-26 15:58:37
 * @LastEditTime: 2021-08-10 10:33:56
 * @LastEditors: alon
 */
import {useEffect, useRef} from 'react';
// 使用定时器
export const useInterval = (callback, delay) => {
  const savedCallback = useRef(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (delay !== null) {
      const interval = setInterval(() => savedCallback.current(), delay || 0);
      return () => clearInterval(interval);
    }

    return undefined;
  }, [delay]);
};
