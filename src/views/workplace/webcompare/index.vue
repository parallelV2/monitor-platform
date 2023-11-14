<template>
  <div class="container">
    <a-typography>
      <a-typography-title style="margin: 0 0 12px" :heading="2">
        图像对比
      </a-typography-title>
    </a-typography>

    <a-row :gutter="16">
      <a-col :span="14">
        <a-space direction="vertical" fill>
          <!-- 基本配置 -->
          <a-card>
            <span class="title">基本配置</span>
            <a-form
              ref="baseFormRef"
              :model="form"
              layout="vertical"
              style="margin: 16px 0"
            >
              <a-form-item
                field="beforeUrl"
                label="分析页面（开发前）"
                required
              >
                <a-input
                  v-model="form.beforeUrl"
                  placeholder="请输入分析页面（开发前）"
                />
              </a-form-item>
              <a-form-item field="afterUrl" label="分析页面（开发后）" required>
                <a-input
                  v-model="form.afterUrl"
                  placeholder="请输入分析页面（开发后）"
                  required
                />
              </a-form-item>
            </a-form>
          </a-card>

          <!-- 参数调整 -->
          <params-setting v-model="paramsSettingForm" />
        </a-space>
      </a-col>

      <a-col :span="10">
        <a-space direction="vertical" fill>
          <compare-helper />
          <a-button type="primary" long @click="handleSubmit">提交</a-button>
        </a-space>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';

  import { ParamsSettingForm } from '@/components/params-setting/types';
  import { Message } from '@arco-design/web-vue';

  import ParamsSetting from '@/components/params-setting/index.vue';
  import { createCompareTask } from '@/api/webcompare';
  import CompareHelper from './components/compare-helper.vue';

  const baseFormRef = ref();

  const form = reactive({
    beforeUrl: '',
    afterUrl: '',
  });

  const paramsSettingForm = reactive<ParamsSettingForm>({
    isWechatNotify: true,
    wechatUrl: '',
    optReport: true,
    screenshotSpan: 30,
  });

  const handleSubmit = async () => {
    await createCompareTask({
      ...form,
      ...paramsSettingForm,
    });

    Message.success('创建成功');
  };
</script>

<style scoped></style>
