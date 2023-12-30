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
        根据性能分析任务<a-tag>#{{ taskId.slice(0, 8) }}</a-tag> ，针对站点
        <a-link :href="url" icon>{{ url }}</a-link>
        ，ChatGPT给出了以下优化建议
      </p>

      <a-spin :loading="loading" style="width: 100%">
        <div class="content"> {{ content }} </div>
      </a-spin>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { getAnalyzeTaskDetail } from '@/api/pa';
  import { getGPTAnser } from '@/api/gpt';

  const props = defineProps<{
    visible: boolean;
    taskId: string;
    gptVersion: string;
    url: string;
  }>();

  defineEmits<{
    (e: 'update:visible', value: boolean): void;
  }>();

  const content = ref('');
  const loading = ref(false);

  const getDetail = () => {
    getAnalyzeTaskDetail(props.taskId)
      .then((res) => {
        const puppeteerData = Object.values(res.data.puppeteer || {});
        const lighthouseData = Object.values(res.data.lighthouse || {}).map(
          (item) => {
            const titleArr = item.title.split('(');
            return {
              ...item,
              title: titleArr[0],
              subTitle: titleArr[1].replace(')', ''),
            };
          }
        );

        let text = '网站的测试报告如下：';
        puppeteerData.forEach((item) => {
          text += `${item.label}为${item.value}ms，`;
        });
        lighthouseData.forEach((item) => {
          text += `${item.title}为${item.value}，`;
        });

        const gptMap = {
          '3.0': 'gpt-3.5-turbo-1106',
          '4.0': 'gpt-4-0613',
        };
        loading.value = true;
        return getGPTAnser(
          `${text}你有什么优化建议？`,
          gptMap[props.gptVersion as '3.0' | '4.0']
        );
      })
      .then((res: any) => {
        if (res.choices?.[0].message.content) {
          content.value = res.choices?.[0].message.content;
        } else {
          content.value = '加载失败';
        }
      })
      .finally(() => {
        loading.value = false;
      });
  };

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
  }
</style>
