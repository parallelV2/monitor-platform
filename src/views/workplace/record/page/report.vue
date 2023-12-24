<template>
  <div>
    <a-skeleton v-if="loading" animation :style="{ width: '100%' }">
      <a-space direction="vertical" size="large" :style="{ width: '100%' }">
        <a-skeleton-line :rows="3" />
      </a-space>
    </a-skeleton>
    <a-collapse v-else-if="taskList.length">
      <template v-for="report in taskList" :key="report.id">
        <report-collapse-item :report="report" />
      </template>
    </a-collapse>
    <template v-else>
      <a-result title="暂无内容"> </a-result>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { getOptimizeTaskList, OptimizeTask } from '@/api/optimize';
  import ReportCollapseItem from '../components/report-collapse-item.vue';

  const taskList = ref<OptimizeTask[]>([]);
  const loading = ref(true);

  const fetchData = () => {
    getOptimizeTaskList()
      .then((res) => {
        taskList.value = res.data as OptimizeTask[];
      })
      .finally(() => {
        loading.value = false;
      });
  };

  fetchData();
</script>
