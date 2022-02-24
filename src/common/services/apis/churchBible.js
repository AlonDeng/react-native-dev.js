import request from '../request/index';

export const getBibleBooks = data =>
  request.get({
    url: 'books',
    data,
  });

export const getBiblesDetail = data =>
  request.get({
    url: `bibles/read${data?.params}`,
    data,
  });
export const changeHighlightStatus = data =>
  request.post({
    url: 'actions/toggle',
    data,
  });
