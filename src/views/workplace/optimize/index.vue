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
              <a-form-item field="taskId" label="性能分析任务">
                <a-select
                  v-model="form.taskId"
                  placeholder="请选择性能分析任务"
                >
                  <template v-for="option in taskOptions" :key="option.id">
                    <a-option :value="option.value">{{
                      option.label
                    }}</a-option>
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
  import { reactive, ref, onMounted, computed } from 'vue';

  import { ParamsSettingForm } from '@/components/params-setting/types';

  import ParamsSetting from '@/components/params-setting/index.vue';
  import { getLocalID } from '@/utils/auth';
  import { Message } from '@arco-design/web-vue';

  import { createOptimizeTask } from '@/api/optimize';
  import { getAnalyzeTaskList, PATask } from '@/api/pa';
  import OptimizeHelper from './components/optimize-helper.vue';

  const form = reactive({
    taskId: '',
    user: getLocalID(),
  });

  const tasks = ref<PATask[]>([]);

  const taskOptions = computed(() =>
    tasks.value.map((i) => ({
      label: `${i.url} (${i.created})`,
      value: i.id,
    }))
  );

  const paramsSettingForm = reactive<ParamsSettingForm>({
    isWechatNotify: true,
    wechatUrl: '',
    optReport: true,
    screenshotSpan: 30,
  });

  const handleSubmit = async () => {
    await createOptimizeTask({
      ...form,
      ...paramsSettingForm,
    });

    Message.success('创建成功');
  };

  onMounted(() => {
    getAnalyzeTaskList().then((res) => {
      tasks.value = res.data;
    });
  });
</script>

<style scoped></style>
