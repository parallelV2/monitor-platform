<template>
  <a-modal
    :visible="visible"
    simple
    hide-cancel
    width="800px"
    title-align="start"
    @ok="$emit('update:visible', false)"
  >
    <template #title> 分析报告 </template>
    <div>
      <p>
        站点 <a-link :href="url" icon>{{ url }}</a-link> 的分析报告如下
      </p>

      <div class="content-title"> Puppeteer检测数据 </div>
      <div class="content">
        <div class="charts">
          <div class="charts-item">
            <v-chart ref="pieRef" class="chart" autoresize :option="pieData" />
          </div>
          <div class="charts-item">
            <v-chart ref="barRef" class="chart" autoresize :option="barData" />
          </div>
        </div>

        <a-grid :cols="3" :col-gap="12" :row-gap="16">
          <a-grid-item
            v-for="item in puppeteerData"
            :key="item.label"
            class="puppeteer-item"
          >
            <a-statistic
              :title="item.label"
              :value="item.value"
              show-group-separator
            >
              <template #suffix>ms</template>
            </a-statistic>
          </a-grid-item>
        </a-grid>
      </div>

      <div class="content-title"> Lighthouse测试数据 </div>
      <div class="content">
        <a-grid :cols="2" :col-gap="12" :row-gap="16">
          <a-grid-item v-for="item in lighthouseData" :key="item.title">
            <div class="lighthouse-item">
              <div class="lighthouse-item-title">{{ item.title }}</div>
              <div class="lighthouse-item-subtitle">{{ item.subTitle }}</div>
              <div class="lighthouse-item-value">{{ item.value }}</div>
            </div>
          </a-grid-item>
        </a-grid>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
  import { ref, watch, computed } from 'vue';
  import { getAnalyzeTaskDetail, type PATaskDetail } from '@/api/pa';
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { PieChart, BarChart } from 'echarts/charts';
  import { TooltipComponent } from 'echarts/components';
  import VChart from 'vue-echarts';

  use([CanvasRenderer, PieChart, BarChart, TooltipComponent]);

  const props = defineProps<{
    visible: boolean;
    id: string;
    url: string;
  }>();

  defineEmits<{
    (e: 'update:visible', value: boolean): void;
  }>();

  const content = ref<PATaskDetail>();
  const barRef = ref<typeof VChart>();
  const pieRef = ref<typeof VChart>();

  const getDetail = () => {
    getAnalyzeTaskDetail(props.id).then((res) => {
      content.value = res.data;
    });
  };

  const puppeteerData = computed(() =>
    Object.values(content.value?.puppeteer || {})
  );
  const lighthouseData = computed(() =>
    Object.values(content.value?.lighthouse || {}).map((item) => {
      const titleArr = item.title.split('(');
      return {
        ...item,
        title: titleArr[0],
        subTitle: titleArr[1].replace(')', ''),
      };
    })
  );

  const pieData = computed(() => {
    const data = puppeteerData.value.map((item) => ({
      name: item.label,
      value: item.value,
    }));

    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b} <br/>{c}ms',
      },
      series: [
        {
          type: 'pie',
          radius: '55%',
          data,
        },
      ],
    };
  });

  const barData = computed(() => {
    const data = puppeteerData.value.map((item) => item.value);
    const axisData = puppeteerData.value.map((item) => item.label);

    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b} <br/>耗时{c}ms',
      },
      xAxis: {
        type: 'category',
        data: axisData,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          type: 'bar',
          data,
        },
      ],
    };
  });

  watch(
    () => props.visible,
    (val) => {
      if (val) getDetail();
    }
  );
</script>

<style lang="less" scoped>
  .content {
    background-color: var(--color-neutral-2);
    color: var(--color-neutral-10);
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;

    &:last-of-type {
      margin-bottom: 0;
    }

    .charts {
      display: flex;
      justify-content: space-between;

      &-item {
        width: calc((100% - 16px) / 2);
        height: 300px;

        .chart {
          height: 300px;
          width: 100%;
        }
      }
    }
  }

  .content-title {
    margin-bottom: 8px;
    font-size: 16px;
  }

  .lighthouse-item {
    &-title {
      margin-bottom: 0px;
      font-size: 14px;
      color: var(--color-text-2);
    }
    &-subtitle {
      margin-bottom: 8px;
      font-size: 12px;
      color: var(--color-text-3);
    }
    &-value {
      font-size: 16px;
      font-weight: 500;
      color: var(--color-text-1);
    }
  }
</style>
