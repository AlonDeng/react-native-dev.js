import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useMemo,
  useRef,
} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import I18n from '@i18n';
import {
  BlockCom,
  ButtonCom,
  TextCom,
  ImageCom,
  ModalSheetCom,
  ModalCom,
} from '@base';
import {AvatarCom} from '@business';
import {px, ImageUtils, screenH} from '@utils';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import CommentInputModal from './CommentInputModal';

const i18nPrefix = tag => `BlogDetail.${tag}`;

const CommentModalCom = (props, ref) => {
  const {
    // 是否可以回覆
    isReply = true,
    // 傳入的hid
    hid,
    // 需要處理的list item id
    id,
    //infoTypeName 對model獲取數據進行區分
    modelName,
    infoTypeName,
  } = props;
  // 獲取到的外層list 的 info
  const listInfo = useSelector(store => store[modelName][infoTypeName]);
  // 獲取回覆的列表
  const getComments = _listInfo => {
    const list = _listInfo?.list;
    const itemInfo = list?.filter(item => item?.id === id)[0];
    return itemInfo?.comments;
  };
  const commentList = getComments(listInfo);

  const dispatch = useDispatch();
  const [isActionCommentSheetModal, setisActionCommentSheetModal] =
    useState(false); //是否展示actionsheet弹窗
  //   输入文字
  const [isShow, setIsShow] = useState(false);
  const [commentId, setcommentId] = useState(null);
  const [commentBody, setcommentBody] = useState(null);
  const commentInputModalRef = useRef();

  const onPressInsert = () => {
    setIsShow(false);
  };

  useImperativeHandle(ref, () => ({
    controlModal: (flag, fn) => {
      if (flag) {
        fn && fn();
      }
      setIsShow(flag);
    },
  }));

  const onClose = () => {
    // scrollToOffset();
    setIsShow(false);
  };

  const onCommentModal = (type = 0, parentId = null) => {
    commentInputModalRef.current.controlModal(true, type, parentId);
  };

  const disposeComments = arr => {
    let _comments;
    const parentArr = arr?.filter(item => !item?.parentId);
    _comments = parentArr?.map(item => {
      let children = [];
      arr?.forEach(data => {
        if (item?.id === data?.parentId) {
          children.push(data);
        }
      });
      return {
        ...item,
        children,
      };
    });
    return _comments?.reverse();
  };

  const renderCommentModal = useMemo(
    () => (
      <CommentInputModal
        ref={commentInputModalRef}
        commentId={commentId}
        body={commentBody}
        itemId={id}
        infoTypeName={infoTypeName}
        namespace={modelName}
      />
    ),
    [commentBody, commentId, id, modelName, infoTypeName],
  );

  const delectComment = () => {
    dispatch({
      type: `${modelName}/delComment`, // 後綴名稱要統一
      payload: {
        itemId: id,
        id: commentId,
        modelName: modelName,
        infoTypeName: infoTypeName,
        namespace: modelName,
      },
    });
  };

  const actionCommentsSheetFn = async index => {
    setisActionCommentSheetModal(false);
    switch (index) {
      case 0:
        //type = 0, 設置發送類型 parentId = null
        onCommentModal(2, null);
        break;
      case 1:
        delectComment();
        break;
      default:
        break;
    }
  };

  const renderCommentsModalSheet = useMemo(
    () => (
      <ModalSheetCom
        onPress={index => {
          actionCommentsSheetFn(index);
        }}
        onClose={() => {
          setisActionCommentSheetModal(!isActionCommentSheetModal);
        }}
        maskClosable
        visible={isActionCommentSheetModal}
        options={[
          I18n.t(i18nPrefix('commentEdit')),
          I18n.t(i18nPrefix('commentRemove')),
        ]}
        cancelText={I18n.t('commonInfo.cancel')}
      />
    ),
    [isActionCommentSheetModal, commentId],
  );

  const opensActionCommentSheetModal = (_commentId, _commentBody) => {
    setcommentId(_commentId);
    setcommentBody(_commentBody);
    setisActionCommentSheetModal(true);
  };

  return (
    <>
      <ModalCom
        visible={isShow}
        popup
        onClose={onClose}
        style={{backgroundColor: 'transparent'}}
        animationType="slide-up"
        maskClosable>
        <BlockCom style={styles.whiteCon} flex={false}>
          <BlockCom
            padding={[20, 20, 20, 20]}
            borderBottom={[1, '#ccc']}
            flex={false}
            center
            middle>
            <TextCom size={36} i18n={i18nPrefix('comment')} />
          </BlockCom>
          <ScrollView style={{flex: 1, margin: px(32)}}>
            {disposeComments(commentList)?.map(item => {
              return (
                <BlockCom
                  // paddingBottom={16}
                  marginBottom={32}
                  borderBottom={
                    !isReply
                      ? [1, '#C4C4C4']
                      : _.get(item, 'children', [])?.length > 0
                      ? [1, '#C4C4C4']
                      : null
                  }
                  key={_.get(item, 'id', null)}
                  flex={false}>
                  <BlockCom between row flex={false}>
                    <BlockCom row flex={false}>
                      <AvatarCom
                        uri={_.get(item, 'user.picture', '')}
                        isBtn={!(item?.user?.hid === hid)}
                        hid={item?.user?.hid}
                        onPressInsert={onPressInsert}
                        wh={60}
                      />
                      <BlockCom row marginLeft={16} flex={false}>
                        <TextCom color="#757575" size={28}>
                          {_.get(item, 'user.username', '')}
                        </TextCom>
                        <TextCom marginLeft={16} color="#757575" size={28}>
                          {moment(_.get(item, 'updated', '')).format(
                            'YYYY-MM-DD',
                          )}
                        </TextCom>
                      </BlockCom>
                    </BlockCom>

                    {item?.user?.hid === hid && (
                      <ImageCom
                        onPress={opensActionCommentSheetModal.bind(
                          null,
                          _.get(item, 'id', null),
                          _.get(item, 'body', ''),
                        )}
                        wh={60}
                        source={ImageUtils.personal_top_moreIcon_black}
                      />
                    )}
                  </BlockCom>

                  <BlockCom
                    paddingBottom={0}
                    margin={[0, 26, 0, 38 * 2]}
                    flex={false}>
                    <TextCom margin={[0, 0, 0, 0]} size={30}>
                      {_.get(item, 'body', '')?.trim()}
                    </TextCom>
                    {isReply && (
                      <ButtonCom
                        onPress={onCommentModal.bind(
                          null,
                          1,
                          _.get(item, 'id', null),
                        )}
                        flex={false}
                        plain>
                        <TextCom
                          color="#FD8C8D"
                          size={28}
                          i18n={i18nPrefix('recomment')}
                        />
                      </ButtonCom>
                    )}
                  </BlockCom>

                  <BlockCom flex={false} marginBottom={16}>
                    {_.get(item, 'children', []) &&
                      _.get(item, 'children', []).map(oneChildren => (
                        <BlockCom
                          radius={8}
                          bgColor="#F7F7F7"
                          padding={[12, 0, 0, 38 * 2]}
                          key={_.get(oneChildren, 'id', null)}
                          flex={false}>
                          <BlockCom center between row flex={false}>
                            <BlockCom row flex={false}>
                              <AvatarCom
                                uri={_.get(item, 'user.picture', '')}
                                // isBtn={!(myemail === blogemail)}
                                hid={item?.user?.hid}
                                onPressInsert={onPressInsert}
                                wh={60}
                              />
                              <BlockCom row marginLeft={16} middle flex={false}>
                                <TextCom color="#757575" size={28}>
                                  {_.get(oneChildren, 'user.username', '')}
                                </TextCom>
                                <TextCom
                                  marginLeft={16}
                                  color="#757575"
                                  size={28}>
                                  {moment(
                                    _.get(oneChildren, 'updated', ''),
                                  ).format('YYYY-MM-DD')}
                                </TextCom>
                              </BlockCom>
                            </BlockCom>
                          </BlockCom>
                          <BlockCom margin={[0, 26, 0, 38 * 2]} flex={false}>
                            <TextCom margin={[0, 0, 18, 0]} size={30}>
                              {_.get(oneChildren, 'body', '')}
                            </TextCom>
                          </BlockCom>
                        </BlockCom>
                      ))}
                  </BlockCom>
                </BlockCom>
              );
            })}
          </ScrollView>
        </BlockCom>
        <BlockCom
          showBottomView
          borderTop={[0.5, '#F1F2F6']}
          padding={[16, 32, 16, 32]}
          bgColor="white"
          flex={false}>
          <ButtonCom
            onPress={onCommentModal}
            radius={60}
            padding={[12, 24, 12, 24]}
            bgColor="#F1F2F6"
            flex={false}
            plain>
            <TextCom
              size={32}
              color="#939498"
              i18n={i18nPrefix('hopeYourShare')}
            />
          </ButtonCom>
        </BlockCom>
        {renderCommentModal}
      </ModalCom>
      {renderCommentsModalSheet}
    </>
  );
};

const styles = StyleSheet.create({
  modelCon: {
    position: 'absolute',
    zIndex: 99,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  whiteCon: {
    backgroundColor: 'white',
    borderTopLeftRadius: px(35),
    borderTopRightRadius: px(35),
    maxheight: screenH - px(500),
    minHeight: px(300),
    width: '100%',
    bottom: 0,
  },
  tabCon: {
    borderTopLeftRadius: px(35),
    borderTopRightRadius: px(35),
  },
});

export default forwardRef(CommentModalCom);
