<template>
  <a-modal :visible="visible" simple hide-cancel width="800px" @ok="handleOk">
    <template #title> 分析报告 </template>
    <div>
      <p>
        根据性能分析任务<a-tag>#{{ taskId.slice(0, 8) }}</a-tag> ，针对站点
        <a-link :href="url" icon>{{ url }}</a-link>
        ，ChatGPT给出了以下优化建议
      </p>

      <div class="content"> {{ content }} </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { getOptimizeTaskDetail } from '@/api/optimize';

  const props = defineProps<{
    visible: boolean;
    taskId: string;
    id: string;
    url: string;
  }>();

  const emit = defineEmits<{
    (e: 'update:visible', value: boolean): void;
  }>();

  const content = ref('');

  const handleOk = () => {
    emit('update:visible', false);
  };

  const getDetail = () => {
    getOptimizeTaskDetail(props.id).then((res) => {
      content.value = res.data.content;
    });
  };

  watch(
    () => props.visible,
    (val) => {
      if (val) getDetail();
    }
  );
</script>

<style lang="less" scoped>
  .content {
    background-color: var(--color-neutral-2);
    color: var(--color-neutral-10);
    padding: 16px;
    border-radius: 8px;
  }
</style>
