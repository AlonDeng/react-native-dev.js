/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-13 16:11:59
 * @LastEditTime: 2021-11-04 11:20:56
 * @LastEditors: alon
 */
import request from '../request/index';

export const getInfo = data =>
  request.post({
    url: 'users/getInfo',
    data,
  });

export const postInfo = data =>
  request.post({
    url: 'users/updateInfo',
    data,
  });

export const uploadOss = data =>
  request.post({
    url: 'files/upload',
    data,
    options: {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  });

export const uploadVideo = data => {
  const configs = data?.configs;
  delete data?.configs;
  return request.post({
    url: 'files/uploadVideo',
    data: data?.bodyFormData,
    options: {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
    configs: configs,
  });
};

export const uploadAsync = data => {
  const configs = data?.configs;
  delete data?.configs;
  return request.post({
    url: 'files/uploadAsync',
    data: data?.bodyFormData,
    options: {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
    configs: configs,
  });
};

export const searchChurches = data =>
  request.post({
    url: 'churches/search?page=1',
    data,
  });

export const getMyPrayers = data =>
  request.post({
    url: 'prayers/getMyPrayers',
    data,
  });

export const getMyBlogs = data =>
  request.post({
    url: 'blogs/getMyBlogs',
    data,
  });

export const userVerifies = data =>
  request.post({
    url: 'userVerifies/add',
    data,
  });

export const changeFansStatus = data =>
  request.post({
    url: 'relations/toggle',
    data,
  });

export const getFans = data =>
  request.post({
    url: 'users/getFans',
    data,
  });

export const getFriends = data =>
  request.post({
    url: 'users/getFriends',
    data,
  });

export const getFollows = data =>
  request.post({
    url: 'users/getFollows',
    data,
  });

export const getMyTags = data =>
  request.post({
    url: 'tags/getMyTags',
    data,
  });
