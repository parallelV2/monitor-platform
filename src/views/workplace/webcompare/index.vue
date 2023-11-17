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
              class="create-form"
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
          <a-card>
            <span class="title">高级选项</span>
            <a-form
              ref="advForm"
              :model="advConfig"
              layout="vertical"
              class="create-form"
            >
              <a-form-item field="optReport" label="同步生成优化报告">
                <a-switch v-model="advConfig.optReport" />
              </a-form-item>
              <a-form-item field="screenshotSpan" label="截图间隔">
                <a-input-number
                  v-model="advConfig.screenshotSpan"
                  placeholder="截图间隔"
                  mode="button"
                />
              </a-form-item>
            </a-form>
          </a-card>
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

  import { Message } from '@arco-design/web-vue';

  import { createCompareTask } from '@/api/webcompare';
  import CompareHelper from './components/compare-helper.vue';

  const baseFormRef = ref();
  const advForm = ref();

  const form = reactive({
    beforeUrl: '',
    afterUrl: '',
  });

  const advConfig = reactive({
    optReport: false,
    screenshotSpan: 3,
  });

  const handleSubmit = async () => {
    const validate = await Promise.all([
      baseFormRef.value.validate(),
      advForm.value.validate(),
    ]);

    if (validate.some((res) => !!res)) {
      Message.info('请检查表单');
      return;
    }

    await createCompareTask({
      ...form,
      ...advConfig,
    });

    Message.success('创建成功');
  };
</script>

<style scoped></style>
