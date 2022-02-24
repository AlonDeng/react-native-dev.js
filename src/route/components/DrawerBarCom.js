/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-07 17:07:03
 * @LastEditTime: 2021-10-07 17:34:02
 * @LastEditors: alon
 */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Linking, Modal, TouchableOpacity, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {screenH, getStatusBarHeight, ImageUtils, NavigationUtil} from '@utils';
import {BlockCom, TextCom, ModalCom, ImageCom} from '@base';
const i18nPrefix = tag => `leftMenu.${tag}`;

const DrawerBarCom = props => {
  const [showKey, setshowKey] = useState(null);
  const dispatch = useDispatch();
  const isDrawer = useSelector(state => state.appModel?.isDrawer);
  const onClose = () => {
    dispatch({type: 'appModel/hideDrawer'});
  };

  const buttonList = [
    {
      key: 'our_community',
      upDown: true,
      icon: true,
      upIcon: ImageUtils.prayer_answer_up,
      downIcon: ImageUtils.prayer_answer_down,
      children: [
        {
          key: 'bible_hymns',
          fn: () => {
            onClose();
            NavigationUtil.navigate('NewChurchBible');
          },
        },
        {
          key: 'churches_org',
          fn: () => {
            onClose();
            Linking.openURL('https://h.land/church/search');
          },
        },
        {
          key: 'resource_collection',
          fn: onClose,
        },
        {
          key: 'news_featured',
          fn: () => {
            onClose();
            NavigationUtil.navigate('OtherPersonal', {hid: '29'});
          },
        },
      ],
    },
    {
      key: 'my_garden',
      upDown: true,
      icon: true,
      upIcon: ImageUtils.prayer_answer_up,
      downIcon: ImageUtils.prayer_answer_down,
      children: [
        {
          key: 'chats',
          fn: () => {
            onClose();
            NavigationUtil.navigate('Chat');
          },
        },
        {
          key: 'blogs',
        },
        {
          key: 'prayers',
          fn: () => {
            onClose();
            NavigationUtil.navigate('Prayer');
          },
        },
        {
          key: 'devotions',
          fn: () => {
            onClose();
            NavigationUtil.navigate('Devotion');
          },
        },
        {
          key: 'sermon_note',
          fn: () => {
            onClose();
            NavigationUtil.navigate('Sermonote');
          },
        },
        {
          key: 'images',
          fn: () => {
            onClose();
            Linking.openURL('https://h.land/images');
          },
        },
        {
          key: 'collections',
        },
      ],
    },
    {
      key: 'eland',
      icon: ImageUtils.personal_eland,
      rightIcon: ImageUtils.arrow_right_purple,
      fn: () => {
        onClose();
        Linking.openURL('https://h.land/elands');
      },
    },
    {
      key: 'h_forum',
    },
    {
      key: 'navigation',
      fn: () => {
        onClose();
        Linking.openURL('https://h.land/navigation');
      },
    },
    {
      key: 'build_up_joureny',
      fn: () => {
        onClose();
        NavigationUtil.navigate('BlogDetail', {blogId: 1244});
      },
    },
    {
      key: 'tutorial',
      fn: () => {
        onClose();
        NavigationUtil.navigate('BlogDetail', {blogId: 2277});
      },
    },
    {
      key: 'help',
      fn: () => {
        onClose();
        NavigationUtil.navigate('Support');
      },
    },
    {
      key: 'about_us',
      fn: () => {
        onClose();
        NavigationUtil.navigate('BlogDetail', {blogId: 1572});
      },
    },
    {
      key: 'languageSetting',
      fn: () => {
        onClose();
        NavigationUtil.navigate('Language');
      },
    },
    {
      key: 'shareFriend',
      fn: () => {
        onClose();
        NavigationUtil.navigate('InviteFriends');
      },
    },
    {
      key: 'Offering',
      icon: ImageUtils.gift_drawer,
      iconSize: 48,
      fn: () => {
        onClose();
        NavigationUtil.navigate('BlogDetail', {blogId: 1869});
      },
    },
  ];
  return (
    <ModalCom
      // closable
      onClose={onClose}
      maskClosable
      style={{backgroundColor: 'transparent'}}
      visible={isDrawer}>
      <BlockCom row>
        <BlockCom
          flex={false}
          width="70%"
          style={{height: screenH + 200}}
          bgColor="white">
          <BlockCom
            bgColor="#FB8386"
            flex={false}
            style={{height: getStatusBarHeight()}}
          />
          <BlockCom bgColor="#FB8386" flex={false} padding={[12, 0, 12, 48]}>
            <ImageCom width={200} height={70} source={ImageUtils?.hland_logo} />
          </BlockCom>
          <ScrollView>
            <BlockCom flex={false} padding={[40, 0, 0, 0]}>
              {buttonList.map((item, index) => (
                <>
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      if (item.upDown) {
                        if (item.key === showKey) {
                          setshowKey(null);
                        } else {
                          setshowKey(item.key);
                        }
                      } else {
                        setshowKey(null);
                      }
                      item?.fn && item?.fn();
                    }}>
                    <BlockCom
                      borderBottom={[1, '#C4C4C4']}
                      row
                      center
                      bgColor={showKey === item.key ? '#FB8386' : 'white'}
                      padding={[20, 32, 20, 32]}
                      margin={[2, 32, 0, 0]}
                      flex={false}>
                      {item?.upDown ? (
                        <ImageCom
                          margin={[0, 32, 0, 0]}
                          wh={48}
                          source={
                            item.key === showKey ? item.upIcon : item.downIcon
                          }
                        />
                      ) : (
                        <ImageCom
                          margin={[0, 32, 0, 0]}
                          wh={48}
                          source={item.icon || null}
                        />
                      )}
                      <TextCom
                        color={showKey === item.key ? 'white' : 'black'}
                        size={36}
                        i18n={i18nPrefix(item.key)}
                      />
                      {item.rightIcon && (
                        <ImageCom
                          margin={[0, 32, 0, 48]}
                          wh={48}
                          source={item.rightIcon || null}
                        />
                      )}
                    </BlockCom>
                  </TouchableOpacity>
                  {item?.key === showKey &&
                    item?.children &&
                    item.children?.map((_item, i2) => (
                      <TouchableOpacity
                        key={_item?.key}
                        onPress={() => {
                          setshowKey(item.key);
                          _item?.fn && _item.fn();
                        }}>
                        <BlockCom
                          borderBottom={[1, '#C4C4C4']}
                          row
                          padding={[20, 32, 20, 32]}
                          marginRight={32}
                          flex={false}>
                          {_item?.upDown ? (
                            <ImageCom
                              margin={[0, 32, 0, 0]}
                              wh={48}
                              source={_item.downIcon}
                            />
                          ) : (
                            <ImageCom
                              margin={[0, 32, 0, 0]}
                              wh={48}
                              source={_item.icon || null}
                            />
                          )}
                          <TextCom size={36} i18n={i18nPrefix(_item.key)} />
                        </BlockCom>
                      </TouchableOpacity>
                    ))}
                </>
              ))}
            </BlockCom>
          </ScrollView>
        </BlockCom>
        <TouchableOpacity
          onPress={onClose}
          style={{height: screenH, width: '30%'}}
        />
      </BlockCom>
    </ModalCom>
  );
};

export default DrawerBarCom;
