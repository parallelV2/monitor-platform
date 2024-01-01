<template>
  <a-collapse-item :key="report.id">
    <a-descriptions :data="content" title="任务详情" :column="1" />
    <template #header>
      <div class="header"> 站点 {{ report.url }} 的性能优化报告 </div>
    </template>
    <template #extra>
      <a-button size="mini" type="text" @click.stop="detailVisible = true">
        <template #icon>
          <icon-drive-file />
        </template>
        查看报告
      </a-button>
    </template>

    <report-detail
      v-model:visible="detailVisible"
      :gpt-version="report.gptVersion"
      :task-id="report.taskId"
      :url="report.url"
    ></report-detail>
  </a-collapse-item>
</template>

<script lang="ts" setup>
  import { computed, toRefs, ref } from 'vue';
  import type { OptimizeTask } from '@/api/optimize';
  import ReportDetail from './report-detail.vue';

  const props = defineProps<{
    report: OptimizeTask;
  }>();

  const { report } = toRefs(props);

  const detailVisible = ref(false);

  const content = computed(() => [
    {
      label: '站点URL',
      value: report.value.url,
    },
    {
      label: '任务ID',
      value: report.value.id,
    },
    {
      label: 'ChatGPT版本',
      value: report.value.gptVersion,
    },
    {
      label: '创建用户ID',
      value: `${report.value.user}`,
    },
  ]);
</script>

<style lang="less" scoped>
  .header {
    display: flex;
    align-items: center;

    .icon {
      margin-right: 8px;
    }
  }
</style>
