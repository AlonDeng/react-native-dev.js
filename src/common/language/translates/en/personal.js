/*
 * @Description:
 * @Author: alon
 * @Date: 2021-10-21 17:44:13
 * @LastEditTime: 2021-11-04 17:30:47
 * @LastEditors: alon
 */
const personalIndex = {
  //edited
  article: 'Articles',
  album: 'Albums',
  prayer: 'Prayers',
  post: 'Posts',
  follow: 'Following',
  notFollow: 'Unfollow',
  fans: 'Followers',
  read: 'Read',
  newPostArticle: 'Latest Articles',
  merrits: 'Merrits',
  hShekels: 'h-Shekels',
  since: 'Member since ',
  notData: 'No Info yet',
  notDescData:
    '"Yet their voice goes out into all the earth, their words to the ends of the world. (Ps.19:4)"',
  editerInfo: 'Edit Profile',
  myPrayer: 'Prayers',
  myDevotion: 'Devotion',
  myBlog: 'My Blogs',
  myEland: 'My Eland',
  myPost: 'Posts',
  addGroup: 'New Group',
  myElandBtn: 'My E-land',
  otherElandBtn: 'Others E-land',
  myArticle: 'Articles',
  search: 'Search...',
  prayer_all: 'All',
  prayer_answer: 'Answered',
  prayer_noanswer: 'Unanswered',
  prayer_tab: 'Tags',
  article_all: 'All',
  article_album: 'Albums',
  friend: 'friend',
  notFriend: 'unfriend',
  friendNotice: 'Friend invitation sent successfully',
  hShekels_transfer: 'h-Shekels Transfer',
  otherBlog: 'Blog',
  otherCategory: 'Category',
  otherPost: 'Post',
};

const PersonalSetting = {
  //editable
  title: 'Edit Profile',
  idConfirm: 'Verification',
  notConfirm: 'Not verified',
  confirm: 'Verified',
  name: 'Name',
  hid: 'H-ID',
  sex: 'Gender',
  email: 'Email',
  phone: 'Phone',
  church: 'Church',
  baptizedDate: 'Baptism Date',
  introduction: 'Description',
  privacy: 'Privacy',
  qrCode: 'QR Code',
  cancel: 'Cancel',
  update: 'Update',
  editName: 'Name',
  nameRule:
    'Please set 2 to 24 characters, excluding invalid characters such @《 / ',
  editPhone: 'Phone',
  editEmail: 'Email',
  phoneRule: '',
  editChurch: 'Church',
  chooseChurch: 'Choose Church',
  chosenChurch: 'Church',
  isShowChurch: 'Show church in personal page',
  showChurch: 'Church',
  editArea: 'Region',
  chooseArea: 'Country or region',
  city: 'City',
  religion: 'Region',
  save: 'Save',
  male: 'Male',
  female: 'Female',
  notshow: 'Prefer Not to Say',
  editHid: 'H-ID',
  hidDesc: '👉 H-ID is a unique certificate for your account，',
  hidDesc2: 'It can only be changed once. ',
  hidRule: 'Only English (must), numbers and underscore',
  showFriend: 'Only Visible to Friends',
  showAll: 'Visable to All',
  myqrcode: 'QR Code',
  myqrcodeDesc: 'Scan QR Code ',
  hlandCode: 'H-ID : ',
  notData: 'Not set',
  takePhotos: 'Take Photo',
  albumSelectionPhoto: 'Select from Album',
  showQRCodeDesc:
    '/*『Be strong and take courage; do not be afraid or dismayed. For Jehovah your God...*/',
  progressText: 'Reward community experience for completing information',
  ConfirmInfo: 'Identity Verification',
  churchName: 'Baptized Church',
  pastorName: 'Baptized Pastor',
  churchPhone: 'Church Email',
  churchCity: 'Baptized City',
  chooseFile: 'Select File',
  contract:
    'Fill in the from representative I have read and agreed to the "User Service Agreement" and "H-LAND Personal Information Collection Statement". ',
  qconfirm: 'Confirm Now ',
  question: 'Any questions?',
  fileNot: 'Upload file',
  notIdentity: 'Lost baptism certificate',
  notChurch: 'My church is not on the list',
  waitConfirm: 'Re-upload after church permission  ',
};

const MySetting = {
  //editable
  title: 'Settings',
  countSetting: 'Account',
  inviteFriends: 'Invite Friends',
  notice: 'Notifications',
  languge: 'Languge',
  settingLanguage: 'Languge',
  invitefrd: 'Invite Friend',
  sharehland: 'Share h.land',
  inviteText: 'We, the people of God. This Land is For Us, By Us and Of Us.',
  inviteText2: 'Have you ever thought of having your own cyber place?',
  inviteText3:
    'Within the eGarden of your own, walk closely with our Father Lord God! Read bible, write prayers and devotions anytime...And you can also create groups, chat and support each other.',
  sendInvite: 'Send Invitation',
  copyYrLink: 'Or copy your link ',
  share: 'Share',
  copyLink: 'https://www.h.land/invite/s...',
  copy: 'Copy',
  cancel: 'Cancel',
  complete: 'Update',
  'zh-HK': '繁體中文',
  zh: '简体中文',
  en: 'English',
  japanese: '日本語',
  helpAndSupport: 'Help and Support',
  needHelp: 'Need Help?',
  needHelpText:
    'Greatings from our Lord God Father! You may clicking the following FAQ to see if they are helpful to you, or feel free to click the right-coner icon to contact us online. Blessings!',
  blogFunction:
    'Tailor-made blog spcial for you Uploading audio/video, inserting bible verse with editor',
  buildEland: 'How to create Personal/Group eLand ?',
  textEditior: 'Write my devotion, mark my eBible, sharing with others',
  dovotionFun: 'Write my Prayer, walking closely with God Lord everyday',
  newUser: 'Tutorial for new comers!',
  websiteNav: 'H.Land Web Navigation',
  conceal: 'Privacy Agreement',
  myData: 'Data Usage',
  devotionHland: 'Support H.Land',
  loggedIn: 'Current Account',
  version: 'Version',
  logOut: 'Log Out',
  editSermonnote: 'Write my Sermon Note',
  tech: 'Technical Support',
};

const MyFoucs = {
  title: 'Following',
  foucs: 'Following',
  mutualAttention: 'Friends',
  fans: 'Fans ',
  foucs2: 'Follow ',
  or: ' ｜ ',
};

const MyFans = {
  title: 'Followers',
  foucs: 'Follow',
  mutualAttention: 'Friends',
  fans: 'Fans ',
  foucs2: 'Follow ',
  or: ' ｜ ',
  foucs3: 'Following',
};

export default {
  personalIndex,
  PersonalSetting,
  MySetting,
  MyFoucs,
  MyFans,
};
