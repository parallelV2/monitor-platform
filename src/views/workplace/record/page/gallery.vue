<template>
  <a-skeleton v-if="loading" animation :style="{ width: '100%' }">
    <a-space direction="vertical" size="large" :style="{ width: '100%' }">
      <a-skeleton-line :rows="3" />
    </a-space>
  </a-skeleton>
  <a-collapse v-else-if="taskList.length">
    <template v-for="report in taskList" :key="report.id">
      <gallery-collapse-item :report="report" />
    </template>
  </a-collapse>
  <template v-else>
    <a-result title="暂无内容"> </a-result>
  </template>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { getCompareTaskList, WebCompareTask } from '@/api/webcompare';
  import GalleryCollapseItem from '../components/gallery-collapse-item.vue';

  const taskList = ref<WebCompareTask[]>([]);

  const loading = ref(true);

  const fetchData = () => {
    getCompareTaskList()
      .then((res) => {
        taskList.value = res.data as WebCompareTask[];
      })
      .finally(() => {
        loading.value = false;
      });
  };

  fetchData();
</script>
