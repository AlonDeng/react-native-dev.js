/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-27 17:05:15
 * @LastEditTime: 2021-10-29 11:33:41
 * @LastEditors: alon
 */
import Sound from 'react-native-sound';
import {Platform} from 'react-native';
import {ToastCom} from '@base';
import I18n from '@i18n';
import {getDvaStore} from '@utils';

let musicRefMap = new Map();

const dispatch = (...arg) => {
  getDvaStore().dispatch(...arg);
};
// 獲取音頻ref
const getRefForMap = modelNamespace => {
  const musicRef = musicRefMap.get(modelNamespace);
  // console.log('name', musicRef, modelNamespace);
  return musicRef;
};
// 設置音頻map
const setRefForMap = (modelNamespace, ref) => {
  const setmusicRef = musicRefMap.set(modelNamespace, ref);
};
// 重設音頻map
const resetSoundMap = () => {
  musicRefMap = new Map();
};

const mainBundle =
  Platform.OS === 'ios'
    ? encodeURIComponent(Sound.MAIN_BUNDLE)
    : Sound.MAIN_BUNDLE;
// 初始化音頻
const initSound = ({url, fn, modelNamespace}) => {
  if (!url) {
    return;
  }
  try {
    // ToastCom.info(I18n.t('soundInfo.soundLoading'), 1);
    let musicRef = new Sound(url, null, error => {
      console.log('failed to load the sound', error, url);
      if (error) {
        console.log('failed to load the sound', error);
        ToastCom.info(I18n.t('soundInfo.soundLoadFail'), 1);
        return;
      }
      if (!getRefForMap(modelNamespace)) {
        return;
      }
      ToastCom.info(I18n.t('soundInfo.soundLoadSuccess'), 1);
      fn && fn(musicRef?.getDuration());
      musicRef.setNumberOfLoops(-1);
      // musicRef.getCurrentTime(seconds => console.log('at ' + seconds));
    });
    Sound.setCategory('Playback');
    setRefForMap(modelNamespace, musicRef);
    return musicRef;
  } catch (error) {
    console.log('sound ---- error', error);
    return null;
  }
};
// 播放音頻
const playSound = ({url, fn, modelNamespace}) => {
  try {
    const musicRef = getRefForMap(modelNamespace);
    musicRef.play(success => {
      if (success) {
        ToastCom.info(I18n.t('soundInfo.soundPlaySuccess'), 1);
      } else {
        ToastCom.info(I18n.t('soundInfo.soundPlayFail'), 1);
      }
    });
    return musicRef;
  } catch (error) {
    console.log('sound ---- error');
    return null;
  }
};
// 暫停音頻
const pauseSound = (musicRef_, modelNamespace) => {
  try {
    const musicRef = getRefForMap(modelNamespace);
    if (!musicRef) {
      return;
    }
    musicRef.pause();
  } catch (error) {
    console.log('sound ---- error');
  }
};
// 繼續音頻
const continueSound = (musicRef_, modelNamespace) => {
  try {
    const musicRef = getRefForMap(modelNamespace);
    if (!musicRef) {
      return;
    }
    musicRef.play();
  } catch (error) {
    console.log('sound ---- error');
  }
};
// 卸載音頻
const closeSound = (musicRef_, modelNamespace) => {
  try {
    // console.log('closeSound-----', modelNamespace);
    const musicRef = getRefForMap(modelNamespace);
    if (!musicRef) {
      return;
    }
    musicRef.stop();
    musicRef.release();
    setRefForMap(modelNamespace, null);
  } catch (error) {
    console.log('sound ---- error', error);
  }
};

// 獲取音頻時長
const getDuration = modelNamespace => {
  const musicRef = getRefForMap(modelNamespace);
  return musicRef?.getDuration();
};
// 設置音頻播放時段
const setCurrentTime = (modelNamespace, time) => {
  const musicRef = getRefForMap(modelNamespace);
  musicRef.setCurrentTime(time);
};

// 獲取當前播放時間
const getCurrentTime = (modelNamespace, fn) => {
  const musicRef = getRefForMap(modelNamespace);
  musicRef && musicRef.getCurrentTime(fn);
};

// 獲取音頻加載狀態
const isLoaded = modelNamespace => {
  const musicRef = getRefForMap(modelNamespace);
  return musicRef.isLoaded();
};
export default {
  playSound,
  pauseSound,
  continueSound,
  closeSound,
  resetSoundMap,
  initSound,
  getDuration,
  setCurrentTime,
  getCurrentTime,
  isLoaded,
};
