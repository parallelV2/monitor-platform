<template>
  <div>
    <div class="selector">
      <a-select
        v-model="selectedTasks"
        placeholder="请选择性能分析任务"
        multiple
      >
        <template v-for="option in taskOptions" :key="option.id">
          <a-option :value="option">{{ option.label }}</a-option>
        </template>
      </a-select>
      <a-button type="primary" @click="handleQueryTasks">确定</a-button>
    </div>

    <div v-if="selectedDatas.length && !loading" class="charts">
      <div class="charts-title">线图趋势</div>
      <div class="charts-item">
        <v-chart class="chart" autoresize :option="lineChartData" />
      </div>

      <div class="charts-title">雷达对比</div>
      <div class="charts-item">
        <v-chart class="chart" autoresize :option="raderChartData" />
      </div>

      <div class="charts-title">堆叠对比</div>
      <div class="charts-item">
        <v-chart class="chart" autoresize :option="barChartData" />
      </div>
    </div>
    <div v-if="loading" class="loading">加载中</div>
    <div v-if="!loading && !selectedDatas.length" class="loading"
      >请选择任务并确定以开始分析</div
    >
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import dayjs from 'dayjs';
  import { sortBy, cloneDeep } from 'lodash';
  import {
    getAnalyzeTaskList,
    PATask,
    getAnalyzeTaskDetail,
    PATaskDetail,
  } from '@/api/pa';

  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { RadarChart, BarChart, LineChart } from 'echarts/charts';
  import { TooltipComponent, LegendComponent } from 'echarts/components';
  import VChart from 'vue-echarts';

  use([
    CanvasRenderer,
    RadarChart,
    BarChart,
    LineChart,
    TooltipComponent,
    LegendComponent,
  ]);

  const tasks = ref<PATask[]>([]);
  const loading = ref(false);
  const selectedTasks = ref<PATask[]>([]);
  const selectedDatas = ref<(PATaskDetail & { date: string })[]>([]);

  const taskOptions = computed(() =>
    tasks.value.map((i) => ({
      id: i.id,
      taskID: i.taskID,
      created: i.created,
      label: `${i.url} (${i.created})`,
      value: i.id,
    }))
  );

  const sortedTask = computed(() => {
    if (!selectedTasks.value.length) {
      return [];
    }
    return sortBy(cloneDeep(selectedTasks.value), (t) =>
      dayjs(t.created).toDate()
    );
  });

  const handleQueryTasks = () => {
    const promises = sortedTask.value.map((t) =>
      getAnalyzeTaskDetail(t.taskID)
    );

    loading.value = true;
    Promise.all(promises)
      .then((value) => {
        selectedDatas.value = value.map((v, i) => ({
          ...v.data.data,
          date: sortedTask.value[i].created,
        }));
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const dates = computed(() => selectedDatas.value.map((t) => t.date));
  const serieNames = computed(() => {
    if (!selectedDatas.value.length) {
      return [];
    }
    return Object.keys(selectedDatas.value[0].puppeteer);
  });

  const lineChartData = computed(() => {
    const series = serieNames.value.map((serie) => {
      return {
        type: 'line',
        data: selectedDatas.value.map((d) => d.puppeteer[serie]),
        smooth: true,
        name: serie,
      };
    });

    return {
      tooltip: {
        trigger: 'item',
        show: true,
      },
      legend: {
        type: 'scroll',
        bottom: 'bottom',
        data: serieNames.value,
      },
      xAxis: {
        type: 'category',
        data: dates.value,
      },
      yAxis: {
        type: 'value',
      },
      series,
    };
  });

  const raderChartData = computed(() => {
    const seriesData = selectedDatas.value.map((d) => {
      return {
        value: serieNames.value.map((sub) => d.puppeteer[sub].value),
        name: d.date,
      };
    });

    return {
      legend: {
        type: 'scroll',
        bottom: 'bottom',
        data: selectedDatas.value.map((d) => d.date),
      },
      tooltip: {
        trigger: 'item',
        show: true,
      },
      radar: {
        // shape: 'circle',
        indicator: serieNames.value.map((ind) => ({ name: ind })),
      },
      series: {
        type: 'radar',
        data: seriesData,
      },
    };
  });

  const barChartData = computed(() => {
    const series = serieNames.value.map((serie) => {
      return {
        type: 'bar',
        data: selectedDatas.value.map((d) => d.puppeteer[serie]),
        stack: true,
        name: serie,
      };
    });

    return {
      tooltip: {
        trigger: 'item',
        show: true,
      },
      legend: {
        type: 'scroll',
        bottom: 'bottom',
        data: serieNames.value,
      },
      xAxis: {
        type: 'category',
        data: dates.value,
      },
      yAxis: {
        type: 'value',
      },
      series,
    };
  });

  onMounted(() => {
    getAnalyzeTaskList().then((res) => {
      tasks.value = res.data.data;
    });
  });
</script>

<style lang="less" scoped>
  .selector {
    display: flex;
    column-gap: 16px;
    margin-bottom: 16px;
  }

  .charts {
    .charts-title {
      font-size: 16px;
      font-weight: 500;
    }

    .charts-item {
      height: 400px;
      width: 100%;
    }
  }

  .loading {
    font-size: 32px;
    font-weight: 200;
    opacity: 0.6;
    text-align: center;
    margin: 40px 0 10px;
  }
</style>
