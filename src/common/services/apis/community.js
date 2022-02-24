/*
 * @Description:
 * @Author: alon
 * @Date: 2021-11-01 10:32:57
 * @LastEditTime: 2021-11-02 15:46:27
 * @LastEditors: alon
 */
import request from '../request/index';

export const getCommunityRecommendList = data =>
  request.get({
    url: 'fmPosts/getList',
    data,
  });

export const getCommunityItem = data =>
  request.get({
    url: 'fmBoards/getList',
    data,
  });

export const getForumList = data =>
  request.post({
    url: 'fmPosts/search',
    data,
  });

export const getCommunityItemInfo = data =>
  request.get({
    url: `fmBoards/getInfo/${data}`,
    data,
  });

export const getCommunityItemList = data => {
  // const params = data?.params;
  // delete data?.params;
  // let arr = [];
  // Object.keys(params).forEach(v => {
  //   arr.push(`${v}=${params[v]}`);
  // });
  // const url = arr.join('&');
  return request.post({
    url: 'fmPosts/search',
    data,
  });
};

export const addForumPost = data =>
  request.post({
    url: 'fmPosts/add',
    data,
  });

export const getForumInfo = data =>
  request.get({
    url: 'fmPosts/getInfo/' + data?.id,
    data,
  });

export const addComment = data =>
  request.post({
    url: 'fmComments/add',
    data,
  });

export const delectComment = data =>
  request.get({
    url: 'fmComments/del/' + data?.id,
    data,
  });

export const editComments = data =>
  request.post({
    url: 'fmComments/edit',
    data,
  });

export const delForumPost = data =>
  request.get({
    url: 'fmPosts/del/' + data?.id,
    data,
  });

export const getPostsByTag = data =>
  request.get({
    url: 'fmPostTags/getPostsByTag',
    data,
  });

export const reEditForumPost = data =>
  request.post({
    url: 'fmPosts/edit',
    data,
  });

export const handlePost = data =>
  request.post({
    url: 'fmPosts/handle',
    data,
  });

export const sendNotice = data =>
  request.post({
    url: 'messages/sendToEditor',
    data,
  });
