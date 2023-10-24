import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/workplace',
  name: 'Workplace',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.workplace',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'webcompare',
      name: 'Webcompare',
      component: () => import('@/views/workplace/webcompare/index.vue'),
      meta: {
        locale: 'menu.workplace.webcompare',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'analyze',
      name: 'Analyze',
      component: () => import('@/views/workplace/analyze/index.vue'),
      meta: {
        locale: 'menu.workplace.analyze',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'optimize',
      name: 'Optimize',
      component: () => import('@/views/workplace/optimize/index.vue'),
      meta: {
        locale: 'menu.workplace.optimize',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'record',
      name: 'Record',
      component: () => import('@/views/workplace/record/index.vue'),
      meta: {
        locale: 'menu.workplace.record',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default DASHBOARD;
