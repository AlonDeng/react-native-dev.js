/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-13 17:34:59
 * @LastEditTime: 2021-10-15 11:31:15
 * @LastEditors: alon
 */
import request from '../request/index';

//********************************************祷告**************************************************** */
export const delPrayer = data =>
  request.delete({
    url: 'prayers/' + data?.id,
  });

export const postPrayer = data =>
  request.post({
    url: 'prayers/add',
    data,
  });

export const editPrayer = data =>
  request.post({
    url: 'prayers/edit',
    data,
  });

//获取群组的祷告 {page, limit, order, groupId}
export const getGroupPrayers = data =>
  request.post({
    url: 'prayers/getGroupPrayers',
    data,
  });

//获取我的祷告 {page, limit, order}
export const getMyPrayers = data =>
  request.post({
    url: 'prayers/getMyPrayers',
    data,
  });

export const tickPrayer = data =>
  request.get({
    url: 'prayers/tick/' + data?.id,
  });

/*********************************祷告群组 pgroup*******************************/
export const addPrayerGroup = data =>
  request.post({
    url: 'pgroups/add',
    data,
  });
export const editPrayerGroup = data =>
  request.post({
    url: 'pgroups/edit',
    data,
  });

export const getGroupMembers = id =>
  request.get({
    url: 'pgroups/getGroupMembers/' + id,
  });

export const getGroupInfo = ({id}) =>
  request.get({
    url: 'pgroups/getInfo/' + id,
  });

//join
export const joinGroup = pmember =>
  request.post({
    url: 'pgroups/join',
    data: pmember,
  });
//leave
export const leaveGroup = pmember =>
  request.post({
    url: 'pgroups/leave',
    data: pmember,
  });
//list
export const listGroup = data =>
  request.post({
    url: 'pgroups/list',
    data,
  });
//removeMembers
export const removeMembers = data =>
  request.post({
    url: 'pgroups/removeMembers',
    data: data,
  });
//pgroups/invite
export const inviteMembers = ({groupId, users}) =>
  request.post({
    url: 'pgroups/inviteMembers',
    data: {groupId, users},
  });

/*********************************祷告圈 prayer circle*******************************/
// 添加祷告圈
export const addPrayerCircle = ({prayerId, groupId}) =>
  request.get({
    url: `prayerCircles/add/${prayerId}/${groupId}`,
  });
//移除祷告圈
export const delPrayerCircle = ({prayerId, groupId}) =>
  request.get({
    url: `prayerCircles/del/${prayerId}/${groupId}`,
  });
//所在的祷告圈
export const getPrayerGroups = ({prayerId}) =>
  request.get({
    url: 'prayerCircles/getPrayerGroups',
    data: {prayerId},
  });

// 獲取成員列表
export const getMyUsers = data =>
  request.post({
    url: 'users/getMyUsers',
    data: data,
  });
