<template>
  <a-collapse-item :key="report.id" :header="header">
    <div>{{ report.content }}</div>
  </a-collapse-item>
</template>

<script lang="ts" setup>
  import { computed, toRefs } from 'vue';

  interface Report {
    id: string;
    title: string;
    content: string;
  }

  const props = defineProps<{
    report: Report;
  }>();

  const { report } = toRefs(props);

  const header = computed(() => {
    return `${report.value.id}. ${report.value.title}`;
  });
</script>
