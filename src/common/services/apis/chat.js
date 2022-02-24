/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-13 17:34:59
 * @LastEditTime: 2021-10-15 11:31:15
 * @LastEditors: alon
 */
import request from '../request/index';

export const getChatList = data =>
  request.get({
    url: 'chatgroups/list',
    data,
  });

export const getChatRoomMessages = data =>
  request.post({
    url: 'chatmessages/getMessages',
    data,
  });

export const sendMessage = data =>
  request.post({
    url: 'chatmessages/sendMessage',
    data,
  });

export const getStickers = data =>
  request.get({
    url: 'chatStickers/list',
    data,
  });

export const getGroupMembers = data =>
  request.get({
    url: `chatgroups/getGroupMembers/${data?.id}`,
    data,
  });
export const inviteLink = data =>
  request.get({
    url: `chatgroups/inviteLink/${data?.id}`,
    data,
  });

export const getGroupInfo = data =>
  request.get({
    url: `chatgroups/getInfo/${data?.id}`,
    data,
  });

export const groupInfoEdit = data =>
  request.post({
    url: 'chatgroups/edit',
    data,
  });

export const addMember = data =>
  request.post({
    url: 'chatgroups/addMember',
    data,
  });

export const leaveChatGroup = data =>
  request.get({
    url: 'chatgroups/leave/' + data?.id,
    data,
  });

export const openChat = data =>
  request.get({
    url: 'chatgroups/openChat/' + data?.id,
    data,
  });

export const addChatGroup = data =>
  request.post({
    url: 'chatgroups/add',
    data,
  });

export const removeMembers = data =>
  request.post({
    url: 'chatGroups/removeMembers',
    data,
  });

export const getMyShekels = data =>
  request.post({
    url: 'shekels/getMyShekels',
    data,
  });
