<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">{{ $t('login.form.title') }}</div>
    <div class="login-form-error-msg">{{ errorMessage }}</div>

    <a-button type="primary" long @click="redirectSSO">使用SSO登录</a-button>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { useI18n } from 'vue-i18n';
  import { useUserStore } from '@/store';
  import useLoading from '@/hooks/loading';
  import { ENV } from '@/config';

  const router = useRouter();
  const route = useRoute();
  const { t } = useI18n();
  const errorMessage = ref('');
  const { setLoading } = useLoading();
  const userStore = useUserStore();

  const redirectSSO = () => {
    window.location.href = `${ENV.SSO}/callback/${ENV.SSO_KEY}`;
  };

  onMounted(async () => {
    const { ticket } = route.query;
    if (ticket) {
      setLoading(true);
      try {
        await userStore.login(ticket as string);
        const { redirect, ...othersQuery } = router.currentRoute.value.query;
        delete othersQuery.ticket;
        router.push({
          name: (redirect as string) || 'Webcompare',
          query: {
            ...othersQuery,
          },
        });
        Message.success(t('login.form.login.success'));
      } catch (err) {
        errorMessage.value = (err as Error).message;
      } finally {
        setLoading(false);
      }
    }
  });
</script>

<style lang="less" scoped>
  .login-form {
    &-wrapper {
      width: 320px;
    }

    &-title {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
    }

    &-sub-title {
      color: var(--color-text-3);
      font-size: 16px;
      line-height: 24px;
    }

    &-error-msg {
      height: 32px;
      color: rgb(var(--red-6));
      line-height: 32px;
    }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }
  }
</style>
