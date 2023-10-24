import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeLogin from '@/views/login/locale/zh-CN';

import localeSettings from './zh-CN/settings';

export default {
  'menu.workplace': '工作间',
  'menu.workplace.webcompare': '图像对比',
  'menu.workplace.analyze': '性能分析',
  'menu.workplace.optimize': '性能优化',
  'menu.workplace.record': '分析记录',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
};
