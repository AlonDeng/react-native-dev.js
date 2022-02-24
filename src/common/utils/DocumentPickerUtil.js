import DocumentPicker from 'react-native-document-picker';
import {ToastCom} from '@base';
import I18n from '@i18n';

const getSystemPDF = async () => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
    });
    return res;
  } catch (error) {
    if (DocumentPicker.isCancel(error)) {
      ToastCom.info(I18n.t('commonInfo.updateError'));
    } else {
      throw error;
    }
  }
};

const getSystemAudio = async () => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.audio],
    });
    return res;
  } catch (error) {
    if (DocumentPicker.isCancel(error)) {
      ToastCom.info(I18n.t('commonInfo.updateError'));
    } else {
      throw error;
    }
  }
};

const getSystemVideo = async () => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.video],
    });
    return res;
  } catch (error) {
    if (DocumentPicker.isCancel(error)) {
      ToastCom.info(I18n.t('commonInfo.updateError'));
    } else {
      throw error;
    }
  }
};

export default {getSystemPDF, getSystemAudio, getSystemVideo};
