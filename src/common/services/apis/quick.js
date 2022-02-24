import request from '../request/index';

export const postBlog = data =>
  request.post({
    url: 'blogs/add',
    data,
  });

export const editBlog = data =>
  request.post({
    url: 'blogs/edit',
    data,
  });

export const reportBlog = data =>
  request.post({
    url: 'actions/add',
    data,
  });

export const getMyCategories = data =>
  request.post({
    url: 'categories/getMyCats',
    data,
  });

export const addCategory = data =>
  request.post({
    url: 'categories/add',
    data,
  });

export const searchTags = data =>
  request.post({
    url: 'tags/search',
    data,
  });

export const postDevotion = data =>
  request.post({
    url: 'devotions/add',
    data,
  });

export const editDevotion = data =>
  request.post({
    url: 'devotions/edit',
    data,
  });

export const searchComment = data =>
  request.post({
    url: 'comments/search',
    data,
  });

export const editDevotionComment = data =>
  request.post({
    url: 'comments/edit',
    data,
  });

export const delDevotionComment = data =>
  request.get({
    url: `comments/del/${data?.id}`,
    data,
  });

export const addDevotionComments = data =>
  request.post({
    url: `comments/add`,
    data,
  });

export const changeLikeStatus = data =>
  request.post({
    url: 'actions/toggle',
    data,
  });

export const changeStatus = data =>
  request.post({
    url: 'actions/toggle',
    data,
  });

export const delDevotion = data =>
  request.delete({
    url: `devotions/${data?.id}`,
    data,
  });

export const convertToBlog = data =>
  request.get({
    url: `devotions/convertToBlog/${data?.id}`,
    data,
  });

export const getSermonoteEditInfo = data =>
  request.get({
    url: `sermons/getInfo/${data?.id}`,
    data,
  });

export const addSermonote = data =>
  request.post({
    url: 'sermons/add',
    data,
  });
export const getOutlineList = data => {
  console.log('data', data);
  return request.post({
    url: 'sermons/listOutline',
    data,
  });
};
export const getMyNoteList = data =>
  request.post({
    url: 'sermons/listNote',
    data,
  });

export const reEdit = data =>
  request.post({
    url: 'sermons/write',
    data,
  });

export const delSermonote = data =>
  request.delete({
    url: `sermons/${data?.id}`,
    data,
  });

export const getDevotionList = data =>
  request.get({
    url: 'devotions/list',
    data,
  });

export const getMyDevotions = data => {
  //console.log('data132', data);
  return request.post({
    url: 'devotions/getMyDevotions',
    data,
  });
};

export const getAllNotes = data =>
  request.post({
    url: 'notes/getAllNotes',
    data,
  });

export const getMyNotes = data =>
  request.post({
    url: 'notes/getMyNotes',
    data,
  });

export const addNotes = data =>
  request.post({
    url: 'notes/add',
    data,
  });

export const lastRead = data =>
  request.get({
    url: 'actions/lastRead',
    data,
  });
