<template>
  <a-card>
    <span class="title">参数调整</span>

    <a-form auto-label-width :model="form" style="margin: 16px 0">
      <a-form-item field="optReport" label="同步生成优化报告">
        <a-switch v-model="form.optReport" />
      </a-form-item>
      <a-form-item field="screenshotSpan" label="图像对比前后间隔">
        <a-input-number
          v-model="form.screenshotSpan"
          mode="button"
          placeholder="请输入图像对比前后间隔(s)"
          :default-value="5"
          :step="0.1"
          :precision="1"
        />
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script setup lang="ts">
  import { useVModel } from '@vueuse/core';

  import { ParamsSettingForm } from '@/components/params-setting/types';

  const props = defineProps<{
    modelValue: ParamsSettingForm;
  }>();
  const emit = defineEmits(['update:modelValue']);

  const form = useVModel(props, 'modelValue', emit);
</script>

<style scoped>
  .title {
    font-size: 24px;
  }
</style>
