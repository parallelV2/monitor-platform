<template>
  <a-collapse-item :key="report.id">
    <a-descriptions :data="content" title="任务详情" :column="1" />
    <template #header>
      <div class="header">
        <status-tag class="icon" :status="report.status" />
        站点 {{ report.afterUrl }} 的图像对比报告
      </div>
    </template>
    <template #extra>
      <a-button
        v-if="report.status === 1"
        size="mini"
        type="text"
        @click.stop="detailVisible = true"
      >
        <template #icon>
          <icon-drive-file />
        </template>
        查看报告
      </a-button>
    </template>

    <gallery-detail
      :id="report.id"
      v-model:visible="detailVisible"
      :before-url="report.beforeUrl"
      :after-url="report.afterUrl"
    ></gallery-detail>
  </a-collapse-item>
</template>

<script lang="ts" setup>
  import { computed, toRefs, ref } from 'vue';
  import type { WebCompareTask } from '@/api/webcompare';
  import StatusTag from '@/components/status-tag/index.vue';
  import dayjs from 'dayjs';
  import GalleryDetail from './gallery-detail.vue';

  const props = defineProps<{
    report: WebCompareTask;
  }>();

  const { report } = toRefs(props);

  const detailVisible = ref(false);

  const content = computed(
    () =>
      [
        {
          label: '站点URL',
          value: `${report.value.beforeUrl} 对比 ${report.value.afterUrl}`,
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
        report.value.finished &&
          report.value.finished !== '0' && {
            label: '完成于',
            value: report.value.finished,
          },
        report.value.finished &&
          report.value.finished !== '0' && {
            label: '用时',
            value: `${dayjs(report.value.finished).diff(
              report.value.created,
              'minute'
            )}分钟`,
          },
      ] as { label: string; value: string }[]
  );
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
