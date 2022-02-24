import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useRef,
} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  Platform,
  Modal,
  View,
} from 'react-native';
import I18n from '@i18n';
import {BlockCom, ButtonCom, InputCom, ModalCom, TextCom} from '@base';
import {NavigationUtil, px, ImageUtils, screenH} from '@utils';
import {useDispatch} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
const isIOS = Platform.OS === 'ios';
const i18nPrefix = tag => `BlogDetail.${tag}`;

const SEND_TYPE = {
  PARENT: 0,
  CHILDREN: 1,
  EDIT: 2,
};

const CommentInputModal = (props, ref) => {
  const {
    // model名
    namespace,
    commentId,
    body = '',
    itemId,
    // listinfo 名字
    infoTypeName,
  } = props;
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  // -------设置初始值》》》》》
  const [inputText, setInputText] = useState(body);
  useEffect(() => {
    setInputText(body);
  }, [body]);
  // --------------《《《《
  const [parentId, setparentId] = useState(null);
  // const [commentId, setcommentId] = useState(null);
  const keyboardHeight = useRef();
  const [_keyboardHeight, setkeyboardHeight] = useState();
  const [sendType, setsendType] = useState(SEND_TYPE.PARENT); // 設置發送類型
  // const keyboardHandel = _isShow => {
  //   // handleExtends(isShow ? 'keyboardShow' : 'keyboardHide');
  // };
  useEffect(() => {
    // console.log('event.endCoordinates');
    let keyboardShowListener = null;
    let keyboardHideListener = null;
    if (Platform.OS === 'ios') {
      keyboardShowListener = Keyboard.addListener(
        isIOS ? 'keyboardWillShow' : 'keyboardDidShow',
        event => {
          // console.log('event.endCoordinates.height');
          // if (keyboardHeight.current <= 0) {
          keyboardHeight.current = event?.endCoordinates?.height;
          // }
          setkeyboardHeight(event?.startCoordinates?.height);
        },
      );
      keyboardHideListener = Keyboard.addListener(
        isIOS ? 'keyboardWillHide' : 'keyboardDidHide',
        event => {
          onClose();
        },
      );
    }
    return () => {
      keyboardShowListener && keyboardShowListener.remove();
      keyboardHideListener && keyboardHideListener.remove();
    };
  }, []);

  useImperativeHandle(ref, () => ({
    controlModal: (flag, type, _parentId) => {
      setIsShow(flag);
      setsendType(type);
      _parentId && setparentId(_parentId);
      // _commentId && setcommentId(_commentId);
      // _body && setInputText(_body);
    },
  }));

  const onClose = () => {
    setIsShow(false);
  };
  const onSendMsg = () => {
    addComments();
  };

  const addComments = () => {
    // console.log('commentId', 'commentsList_' + id);
    switch (sendType) {
      case SEND_TYPE.CHILDREN: // 在評論裡評論
        dispatch({
          type: `${namespace}/addComments`,
          payload: {
            id: commentId,
            body: inputText,
            itemId: itemId,
            infoTypeName: infoTypeName,
            namespace: namespace,
          },
        });
        break;
      case SEND_TYPE.PARENT: // 直接評論
        dispatch({
          type: `${namespace}/addComments`,
          payload: {
            id: commentId,
            body: inputText,
            itemId: itemId,
            infoTypeName: infoTypeName,
            namespace: namespace,
          },
        });
        // setparentId(null);
        break;
      case SEND_TYPE.EDIT:
        dispatch({
          type: `${namespace}/editComment`,
          payload: {
            id: commentId,
            body: inputText,
            itemId: itemId,
            infoTypeName: infoTypeName,
            namespace: namespace,
          },
        });
        break;
      default:
        break;
    }
    sendType !== SEND_TYPE.PARENT && setsendType(SEND_TYPE.PARENT); // 每次發送完後，將type設置回 parent模式;
    inputText && setInputText(null);
    setIsShow(false);
  };

  return Platform.OS === 'android' ? (
    <ModalCom
      visible={isShow}
      popup
      maskClosable
      onClose={onClose}
      // style={{backgroundColor: 'transparent'}}
      animationType="slide-up">
      <KeyboardAvoidingView
        // behavior={'position'}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.KeyboardAvoidingView}>
        <BlockCom
          padding={[20, 20, 20, 20]}
          radius={20}
          height={200}
          bgColor="#F1F2F6"
          flex={false}>
          <InputCom
            height={165}
            autoFocus
            onClear={setInputText.bind(null, '')}
            value={inputText}
            textAlignVertical="top"
            onChangeText={setInputText}
            onSubmitEditing={onSendMsg}
            multiline
            placeholder={I18n.t(i18nPrefix('hopeYourShare'))}
            fontSize={15}
            returnKeyType={'send'}
          />
        </BlockCom>
        <BlockCom marginTop={20} row flex={false}>
          <BlockCom />
          <ButtonCom
            onPress={addComments}
            padding={[5, 15, 5, 15]}
            bgColor="#FD8C8D"
            flex={false}
            plain>
            <TextCom size={26} color="white" i18n={i18nPrefix('send')} />
          </ButtonCom>
        </BlockCom>
      </KeyboardAvoidingView>
    </ModalCom>
  ) : (
    <Modal
      // onRequestClose={onClose}
      animationType={'none'}
      // visible
      transparent={true}
      visible={isShow}>
      <BlockCom bottom>
        <TouchableOpacity
          onPress={onClose}
          style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)'}}
        />
        <BlockCom bgColor="white" padding={[20, 20, 20, 20]} flex={false}>
          <BlockCom
            padding={[20, 20, 20, 20]}
            radius={20}
            height={200}
            bgColor="#F1F2F6"
            flex={false}>
            <InputCom
              height={165}
              autoFocus
              onClear={setInputText.bind(null, '')}
              value={inputText}
              textAlignVertical="top"
              onChangeText={setInputText}
              onSubmitEditing={onSendMsg}
              multiline
              placeholder={I18n.t(i18nPrefix('hopeYourShare'))}
              fontSize={15}
              returnKeyType={'send'}
            />
          </BlockCom>
          <BlockCom marginTop={20} row flex={false}>
            <BlockCom />
            <ButtonCom
              onPress={addComments}
              padding={[5, 15, 5, 15]}
              bgColor="#FD8C8D"
              flex={false}
              plain>
              <TextCom size={26} color="white" i18n={i18nPrefix('send')} />
            </ButtonCom>
          </BlockCom>
        </BlockCom>
        <View style={{height: keyboardHeight.current}} />
      </BlockCom>
    </Modal>
  );
};

const styles = StyleSheet.create({
  KeyboardAvoidingView: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingTop: px(24),
    paddingBottom: px(24),
    paddingRight: px(32),
    paddingLeft: px(32),
    borderTopRightRadius: px(20),
    borderTopLeftRadius: px(20),
  },
});

export default forwardRef(CommentInputModal);
