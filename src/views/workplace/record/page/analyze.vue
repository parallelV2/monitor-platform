<template>
  <div>
    <a-skeleton v-if="loading" animation :style="{ width: '100%' }">
      <a-space direction="vertical" size="large" :style="{ width: '100%' }">
        <a-skeleton-line :rows="3" />
      </a-space>
    </a-skeleton>
    <a-collapse v-else-if="taskList.length">
      <template v-for="report in taskList" :key="report.id">
        <analyze-collapse-item :report="report" />
      </template>
    </a-collapse>
    <template v-else>
      <a-result title="暂无内容"> </a-result>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { getAnalyzeTaskList, PATask } from '@/api/pa';
  import AnalyzeCollapseItem from '../components/analyze-collapse-item.vue';

  const taskList = ref<PATask[]>([]);
  const loading = ref(true);

  const fetchData = () => {
    getAnalyzeTaskList()
      .then((res) => {
        taskList.value = res.data.data as PATask[];
      })
      .finally(() => {
        loading.value = false;
      });
  };

  fetchData();
</script>
