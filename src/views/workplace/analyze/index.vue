<template>
  <div class="container">
    <a-typography>
      <a-typography-title style="margin: 0 0 12px" :heading="2">
        性能分析
      </a-typography-title>
    </a-typography>

    <a-row :gutter="16">
      <a-col :span="14">
        <a-space direction="vertical" fill>
          <!-- 基本配置 -->
          <a-card>
            <span class="title">基本配置</span>
            <a-form :model="form" layout="vertical" style="margin: 16px 0">
              <a-form-item field="url" label="分析页面" required>
                <a-input v-model="form.url" placeholder="请输入分析页面" />
              </a-form-item>
              <a-form-item field="errorDetect" label="错误检测" required>
                <a-input
                  v-model="form.errorDetect"
                  placeholder="请输入错误检测"
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
          <analyze-helper />
          <a-button type="primary" long @click="handleSubmit">提交</a-button>
        </a-space>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';

  import { ParamsSettingForm } from '@/components/params-setting/types';

  import ParamsSetting from '@/components/params-setting/index.vue';
  import AnalyzeHelper from './components/analyze-helper.vue';

  const form = reactive({
    url: '',
    errorDetect: '',
  });

  const paramsSettingForm = reactive<ParamsSettingForm>({
    isWechatNotify: true,
    wechatUrl: '',
    isReport: true,
    compareInterval: 30,
  });

  const handleSubmit = () => {
    alert(JSON.stringify({ form, paramsSettingForm }));
  };
</script>

<style scoped></style>
