import request from '../request/index';

export const shekelsbackdoor = data =>
  request.get({
    url: 'shekels/backdoor',
    data,
  });

export const getMyShekels = data =>
  request.post({
    url: 'shekels/getMyShekels',
    data,
  });

export const shekelsTransfer = data =>
  request.post({
    url: 'shekels/transfer',
    data,
  });

export const shekelsGift = data =>
  request.post({
    url: 'shekels/gift',
    data,
  });

export const getMyMerrits = data =>
  request.post({
    url: 'merrits/getMyMerrits',
    data,
  });
