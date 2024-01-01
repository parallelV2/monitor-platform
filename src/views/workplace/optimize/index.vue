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
            <a-form
              ref="baseForm"
              :model="form"
              layout="vertical"
              class="create-form"
            >
              <a-form-item field="taskId" label="性能分析任务" required>
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
          <a-card>
            <span class="title">高级选项</span>
            <a-form
              ref="advForm"
              :model="advConfig"
              layout="vertical"
              class="create-form"
            >
              <a-form-item field="gptVersion" label="GPT版本">
                <a-radio-group v-model="advConfig.gptVersion" type="button">
                  <a-radio value="4.0">ChatGPT 4</a-radio>
                  <a-radio value="3.0">ChatGPT 3</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-form>
          </a-card>
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

  import { Message } from '@arco-design/web-vue';

  import { createOptimizeTask } from '@/api/optimize';
  import { getAnalyzeTaskList, PATask } from '@/api/pa';
  import OptimizeHelper from './components/optimize-helper.vue';

  const baseForm = ref();
  const advForm = ref();

  const form = reactive({
    taskId: '',
  });

  const advConfig = reactive({
    gptVersion: '4.0',
  });

  const tasks = ref<PATask[]>([]);

  const taskOptions = computed(() =>
    tasks.value.map((i) => ({
      label: `${i.url} (${i.created})`,
      value: i.id,
    }))
  );

  const handleSubmit = async () => {
    const validate = await Promise.all([
      baseForm.value.validate(),
      advForm.value.validate(),
    ]);

    if (validate.some((res) => !!res)) {
      Message.info('请检查表单');
      return;
    }

    await createOptimizeTask({
      ...form,
      ...advConfig,
    });

    Message.success('创建成功');
  };

  onMounted(() => {
    getAnalyzeTaskList().then((res) => {
      tasks.value = res.data.data;
    });
  });
</script>

<style scoped></style>
