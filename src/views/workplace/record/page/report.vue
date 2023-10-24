<template>
  <div>
    <a-collapse :default-active-key="['1']">
      <template v-for="report in reportData" :key="report.id">
        <report-collapse-item :report="report" />
      </template>
    </a-collapse>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import ReportCollapseItem from '../components/report-collapse-item.vue';

  const reportData = ref([
    {
      id: '100',
      title: '测试1',
      content: '测试',
    },
    {
      id: '101',
      title: '测试2',
      content: '测试',
    },
  ]);
</script>
