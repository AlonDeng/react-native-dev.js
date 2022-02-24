/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-27 17:05:15
 * @LastEditTime: 2021-10-29 11:33:41
 * @LastEditors: alon
 */
import Sound from 'react-native-sound';
import {ToastCom} from '@base';
import I18n from '@i18n';
import {getDvaStore} from '@utils';

let chatRefMap = new Map();

const dispatch = (...arg) => {
  getDvaStore().dispatch(...arg);
};

const getRefForMap = modelNamespace => {
  const musicRef = chatRefMap.get(modelNamespace);
  // console.log('name', musicRef, modelNamespace);
  return musicRef;
};

const setRefForMap = (modelNamespace, ref) => {
  const setmusicRef = chatRefMap.set(modelNamespace, ref);
  // console.log('name', setmusicRef);
  // return setmusicRef;
};

const resetSoundMap = () => {
  chatRefMap = new Map();
};

const initSound = () => {};

const playSound = ({url, fn, modelNamespace}) => {
  if (!url) {
    return;
  }
  // if (musicRef) {
  //   musicRef.release();
  //   musicRef = null;
  // }
  try {
    Sound.setCategory('Playback');
    ToastCom.info(I18n.t('soundInfo.soundLoading'), 1);
    let musicRef = new Sound(url, '', error => {
      if (error) {
        console.log('failed to load the sound', error);
        ToastCom.info(I18n.t('soundInfo.soundLoadFail'), 1);
        return;
      }
      if (!getRefForMap(modelNamespace)) {
        return;
      }
      ToastCom.info(I18n.t('soundInfo.soundLoadSuccess'), 1);
      fn && fn();
      musicRef.setNumberOfLoops(-1);
      musicRef.play(success => {
        if (success) {
          ToastCom.info(I18n.t('soundInfo.soundPlaySuccess'), 1);
        } else {
          ToastCom.info(I18n.t('soundInfo.soundPlayFail'), 1);
        }
      });
    });
    // console.log('modelNamespace', modelNamespace);
    setRefForMap(modelNamespace, musicRef);
    return musicRef;
  } catch (error) {
    console.log('sound ---- error');
    return null;
  }
};

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

export default {
  playSound,
  pauseSound,
  continueSound,
  closeSound,
  resetSoundMap,
};
