<template>
  <div>
    <a-collapse :default-active-key="['1']">
      <template v-for="report in taskList" :key="report.id">
        <report-collapse-item :report="report" />
      </template>
    </a-collapse>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { getOptimizeTaskList, OptimizeTask } from '@/api/optimize';
  import ReportCollapseItem from '../components/report-collapse-item.vue';

  const taskList = ref<OptimizeTask[]>([]);

  const fetchData = () => {
    getOptimizeTaskList().then((res) => {
      taskList.value = res.data as OptimizeTask[];
    });
  };

  fetchData();
</script>
