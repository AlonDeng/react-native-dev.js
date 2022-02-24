/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-20 17:51:27
 * @LastEditTime: 2021-11-01 15:11:17
 * @LastEditors: alon
 */
import request from '../request/index';

export const getBannerList = data =>
  request.get({
    url: 'banners/search',
    data,
  });

export const getPublicWall = data =>
  request.post({
    url: 'actions/publicWall',
    data,
  });

export const getFollowPublicWall = data =>
  request.post({
    url: 'blogs/getMyFollowBlogs',
    data,
  });

export const getVideoPublicWall = data =>
  request.post({
    url: 'blogs/getVideoBlogs',
    data,
  });

export const getBlogInfo = data =>
  request.post({
    url: 'blogs/getInfo',
    data,
  });

export const getRelatedBlogs = data =>
  request.post({
    url: 'blogs/getRelatedBlogs',
    data,
  });

export const changeFoucsStatus = data =>
  request.post({
    url: 'relations/toggle',
    data,
  });

export const changeFriendStatus = data =>
  request.post({
    url: 'relations/makeFriend',
    data,
  });

export const unfriend = data =>
  request.post({
    url: 'relations/unfriend',
    data,
  });

export const changeToggleByType = data =>
  request.post({
    url: 'actions/toggle',
    data,
  });

export const checkFollow = data =>
  request.get({
    url: `relations/checkFollow/${data}`,
  });

// 獲取精選列表
export const getFeatureList = data =>
  request.get({
    url: 'actions/features',
  });

export const searchArticle = data => {
  const params = data?.params;
  delete data?.params;
  let arr = [];
  Object.keys(params).forEach(v => {
    arr.push(`${v}=${params[v]}`);
  });
  const url = arr.join('&');
  return request.post({
    url: `blogs/search?${url}`,
    data,
  });
};

export const addComments = data =>
  request.post({
    url: 'comments/add',
    data,
  });

export const saerchComments = data =>
  request.post({
    url: 'comments/search',
    data,
  });

export const editComments = data =>
  request.post({
    url: 'comments/edit',
    data,
  });

export const delectComment = data =>
  request.get({
    url: `comments/del/${data?.commentId}`,
    data,
  });

export const delectBlog = data =>
  request.delete({
    url: `blogs/${data?.blogId}`,
    data,
  });

export const pagingSearch = data =>
  request.post({
    url: 'actions/pagingSearch',
    data,
  });

export const getBlogsByTag = data =>
  request.get({
    url: 'tags/getBlogsByTag/' + data?.id,
    data,
  });

export const addCheckins = data =>
  request.post({
    url: 'checkins/add',
    data,
  });

export const getCheckinsList = data =>
  request.post({
    url: 'checkins/getMyList',
    data,
  });

export const searchCheckinsList = data =>
  request.post({
    url: 'checkins/search',
    data,
  });

export const bibleDetailToday = data =>
  request.get({
    url: 'bibleDailies/getToday',
    data,
  });

export const checkinsToday = data =>
  request.get({
    url: 'checkins/getToday',
    data,
  });

export const getMyLands = data =>
  request.get({
    url: 'lands/getMyLands',
    data,
  });

export const requestList = data =>
  request.post({
    url: 'landblogs/requestList',
    data,
  });

export const requestEland = data =>
  request.post({
    url: 'landblogs/request',
    data,
  });
