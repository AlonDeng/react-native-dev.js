import request from '../request/index';

// 上傳雲推送服務token
export const uploadCloudToken = data =>
  request.post({
    url: 'pushTokens/add',
    data,
  });
