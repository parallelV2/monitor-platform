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

  const props = defineProps<{
    visible: boolean;
    id: string;
    url: string;
  }>();

  defineEmits<{
    (e: 'update:visible', value: boolean): void;
  }>();

  const content = ref<PATaskDetail>();

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
