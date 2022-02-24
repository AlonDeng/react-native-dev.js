import RNFS from 'react-native-fs';
import {Platform} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {getDvaStore, checkPermissInfo} from '@utils';
import {Toast, Progress} from '@ant-design/react-native';
const dispatch = (...arg) => {
  getDvaStore().dispatch(...arg);
};
/*
 * @Description:保存图片或者视频到相册
 * formUrl:下载的链接  必传
 * success: 成功回调
 * fail:失败回调
 * begin:开始下载
 * progress:下载的进度
 */
async function saveToAlbum({formUrl, success, fail, begin, progress}) {
  let flag = false;
  flag = await checkPermissInfo(['LIBRARY']);
  if (flag) {
    console.log('图片地址', formUrl);
    let canUrl = formUrl.split('?')[0];
    let suffixArr = canUrl.split('.');
    const suffixName = suffixArr[suffixArr.length - 1];
    dispatch({type: 'appModel/showLoading'});
    const timestamp = new Date().getTime(); //获取当前时间错
    const random = String((Math.random() * 1000000) | 0); //六位随机数
    let dirs =
      Platform.OS === 'ios'
        ? RNFS.LibraryDirectoryPath
        : RNFS.ExternalDirectoryPath;
    //外部文件，共享目录的绝对路径（仅限android）
    const downloadDest = `${dirs}/${timestamp + random}.${suffixName}`; //${suffixName}
    console.log('保存的路径', downloadDest);
    const options = {
      fromUrl: formUrl,
      toFile: downloadDest,
      background: true,
      begin: res => {
        // Toast.info('开始下载', 3);
        console.log('begin', res);
        console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
        begin && begin(res);
      },
      progress: res => {
        console.log(res);
        //下载进度
        let pro = res.bytesWritten / res.contentLength;
        //   console.log('pro==', res, Math.ceil(pro * 100) + '%');
        progress && progress(Math.ceil(pro * 100));
      },
    };
    try {
      const ret = RNFS.downloadFile(options);
      ret.promise.then(res => {
        console.log('下载成功', res, 'file://' + downloadDest);
        const promise = CameraRoll.saveToCameraRoll(downloadDest);
        promise
          .then(result => {
            progress && progress(100);
            console.log('保存成功！地址如下：\n' + result);
            Toast.info('保存成功', 3);
            success && success(result);
          })
          .catch(function (error) {
            Toast.info('保存失败', 3);
            console.error('保存失败！--error2', error);
            // alert('保存失败！\n' + error);
          });
        dispatch({type: 'appModel/hideLoading'});
      });
    } catch (e) {
      // console.log('下载失败',error);
      Toast.info('保存图片失败', 3);
      fail && fail();
      progress && progress(0);
      dispatch({type: 'appModel/hideLoading'});
    }
  }
}

export default saveToAlbum;
