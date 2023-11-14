<template>
  <div>图像-没写</div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { getCompareTaskList, WebCompareTask } from '@/api/webcompare';

  const taskList = ref<WebCompareTask[]>([]);

  const fetchData = () => {
    getCompareTaskList().then((res) => {
      taskList.value = res.data as WebCompareTask[];
    });
  };

  fetchData();
</script>
