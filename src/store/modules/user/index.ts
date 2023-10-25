import { defineStore } from 'pinia';
import {
  login as userLogin,
  logout as userLogout,
  getUserInfo,
} from '@/api/user';
import {
  setToken,
  clearToken,
  setLocalID,
  getLocalID,
  clearLocalID,
} from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { UserState } from './types';
import useAppStore from '../app';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    nickname: undefined,
    avatar: undefined,
    email: undefined,
    id: 0,
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      if (!this.id) {
        this.id = getLocalID();
      }
      const res = await getUserInfo(this.id);

      this.setInfo(res.data);
    },

    // Login
    async login(token: string) {
      try {
        const res = await userLogin(token);
        this.id = res.data.id;
        setToken(token);
        setLocalID(this.id);
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    logoutCallBack() {
      const appStore = useAppStore();
      this.resetInfo();
      clearToken();
      clearLocalID();
      removeRouteListener();
      appStore.clearServerMenu();
    },
    // Logout
    async logout() {
      try {
        await userLogout();
      } finally {
        this.logoutCallBack();
      }
    },
  },
});

export default useUserStore;
