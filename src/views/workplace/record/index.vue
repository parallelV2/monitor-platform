<template>
  <div class="container">
    <a-typography>
      <a-typography-title style="margin: 0 0 12px" :heading="2">
        分析记录
      </a-typography-title>
    </a-typography>

    <a-tabs :default-active-key="tabOptions?.[0].id" lazy-load size="large">
      <template v-for="tab in tabOptions" :key="tab.id">
        <a-tab-pane :title="tab.label">
          <a-card>
            <component :is="tab.component" />
          </a-card>
        </a-tab-pane>
      </template>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
  import { defineAsyncComponent } from 'vue';

  const Gallery = defineAsyncComponent(() => import('./page/gallery.vue'));
  const Analyze = defineAsyncComponent(() => import('./page/analyze.vue'));
  const Report = defineAsyncComponent(() => import('./page/report.vue'));
  const Trend = defineAsyncComponent(() => import('./page/trend.vue'));

  const tabOptions = [
    { id: 1001, label: '图像', component: Gallery },
    {
      id: 1002,
      label: '性能分析',
      component: Analyze,
    },
    { id: 1003, label: '优化报告', component: Report },
    { id: 1004, label: '性能趋势', component: Trend },
  ];
</script>

<style scoped></style>
