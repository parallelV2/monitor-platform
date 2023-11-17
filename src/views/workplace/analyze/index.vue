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
            <a-form ref="baseForm" :model="form" layout="vertical" class="form">
              <a-form-item field="url" label="分析页面" required>
                <a-input v-model="form.url" placeholder="请输入分析页面" />
              </a-form-item>
              <a-form-item field="errorDetect" label="错误检测">
                <a-switch v-model="form.errorDetect" />
              </a-form-item>
              <a-form-item field="timeout" label="超时时间(ms)" required>
                <a-input-number
                  v-model="form.timeout"
                  :step="1000"
                  placeholder="超时时间"
                  mode="button"
                />
              </a-form-item>
            </a-form>
          </a-card>

          <a-card>
            <span class="title">高级选项</span>
            <a-form
              ref="advForm"
              :model="advConfig"
              layout="vertical"
              class="form"
            >
              <a-form-item field="optReport" label="同步生成优化报告">
                <a-switch v-model="advConfig.optReport" />
              </a-form-item>
            </a-form>
          </a-card>
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
  import { reactive, ref } from 'vue';

  import { Message } from '@arco-design/web-vue';

  import { createAnalyzeTask } from '@/api/pa';
  import AnalyzeHelper from './components/analyze-helper.vue';

  const baseForm = ref();
  const advForm = ref();

  const form = reactive({
    url: '',
    errorDetect: false,
    timeout: 30000,
  });

  const advConfig = reactive({
    optReport: false,
  });

  const handleSubmit = async () => {
    const validate = await Promise.all([
      baseForm.value.validate(),
      advForm.value.validate(),
    ]);

    if (validate.some((res) => !!res)) {
      Message.info('请检查表单');
      return;
    }

    await createAnalyzeTask({
      ...form,
      ...advConfig,
    });

    Message.success('创建成功');
  };
</script>

<style scoped lang="less">
  .form {
    margin: 16px 0 -16px;
  }
</style>
