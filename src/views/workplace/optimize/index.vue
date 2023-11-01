<template>
  <div class="container">
    <a-typography>
      <a-typography-title style="margin: 0 0 12px" :heading="2">
        性能优化
      </a-typography-title>
    </a-typography>

    <a-row :gutter="16">
      <a-col :span="14">
        <a-space direction="vertical" fill>
          <!-- 基本配置 -->
          <a-card>
            <span class="title">基本配置</span>
            <a-form :model="form" layout="vertical" style="margin: 16px 0">
              <a-form-item field="role" label="性能分析任务">
                <a-select placeholder="请选择性能分析任务">
                  <template v-for="option in rolesOptions" :key="option.id">
                    <a-option>{{ option.label }}</a-option>
                  </template>
                </a-select>
              </a-form-item>
            </a-form>
          </a-card>

          <!-- 参数调整 -->
          <params-setting v-model="paramsSettingForm" />
        </a-space>
      </a-col>

      <a-col :span="10">
        <a-space direction="vertical" fill>
          <optimize-helper />
          <a-button type="primary" long @click="handleSubmit">提交</a-button>
        </a-space>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';

  import { ParamsSettingForm } from '@/components/params-setting/types';

  import ParamsSetting from '@/components/params-setting/index.vue';
  import OptimizeHelper from './components/optimize-helper.vue';

  const form = reactive({
    role: '',
  });

  const paramsSettingForm = reactive<ParamsSettingForm>({
    isWechatNotify: true,
    wechatUrl: '',
    isReport: true,
    compareInterval: 30,
  });

  const rolesOptions = ref([
    {
      label: '测试任务1',
      id: 1,
    },
  ]);

  const handleSubmit = () => {
    alert(JSON.stringify({ form, paramsSettingForm }));
  };
</script>

<style scoped></style>
