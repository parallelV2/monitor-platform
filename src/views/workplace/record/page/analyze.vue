<template>
  <div> 性能分析-没写 </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { getAnalyzeTaskList, PATask } from '@/api/pa';

  const taskList = ref<PATask[]>([]);

  const fetchData = () => {
    getAnalyzeTaskList().then((res) => {
      taskList.value = res.data as PATask[];
    });
  };

  fetchData();
</script>
