<template>
  <a-collapse-item :key="report.id">
    <a-descriptions :data="content" title="任务详情" :column="1" />
    <template #header>
      <div class="header">
        <status-tag class="icon" :status="report.status" />
        站点 {{ report.url }} 的性能优化报告
      </div>
    </template>
    <template #extra>
      <a-button size="mini" type="text">
        <template #icon>
          <icon-drive-file />
        </template>
        查看报告
      </a-button>
    </template>
  </a-collapse-item>
</template>

<script lang="ts" setup>
  import { computed, toRefs } from 'vue';
  import type { OptimizeTask } from '@/api/optimize';
  import StatusTag from '@/components/status-tag/index.vue';
  import dayjs from 'dayjs';

  const props = defineProps<{
    report: OptimizeTask;
  }>();

  const { report } = toRefs(props);

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
      label: '创建用户ID',
      value: `${report.value.user}`,
    },
    {
      label: '创建于',
      value: report.value.created,
    },
    {
      label: '完成于',
      value: report.value.finished,
    },
    {
      label: '用时',
      value: `${dayjs(report.value.finished).diff(
        report.value.created,
        'minute'
      )}分钟`,
    },
  ]);
</script>

<style lang="less">
  .header {
    display: flex;
    align-items: center;

    .icon {
      margin-right: 8px;
    }
  }
</style>
