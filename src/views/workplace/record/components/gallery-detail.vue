<template>
  <a-modal
    :visible="visible"
    simple
    hide-cancel
    width="800px"
    title-align="start"
    @ok="$emit('update:visible', false)"
  >
    <template #title> 图像对比报告 </template>
    <a-space direction="vertical" fill size="medium">
      <a-descriptions :data="des" layout="inline-vertical" size="large" />
      <a-image
        width="100%"
        :src="imgs.diff"
        title="差异图"
        description="直接展示差异部分"
      />
      <a-image
        width="100%"
        :src="imgs.indicate"
        title="框选差异图"
        description="通过红框指示出差异部分"
      />
      <a-image
        width="100%"
        :src="imgs.shift"
        title="偏移差异图"
        description="通过红线指示出偏移部分"
      />
    </a-space>
  </a-modal>
</template>

<script setup lang="ts">
  import { ref, watch, computed, h } from 'vue';
  import { getCompareTaskDetail } from '@/api/webcompare';
  import { Tag as ATag } from '@arco-design/web-vue';

  const props = defineProps<{
    visible: boolean;
    id: string;
    beforeUrl: string;
    afterUrl: string;
  }>();

  defineEmits<{
    (e: 'update:visible', value: boolean): void;
  }>();

  const imgs = ref({
    diff: '',
    indicate: '',
    shift: '',
  });

  const pass = ref({
    diff: true,
    shift: true,
  });

  const des = computed(() => [
    {
      label: '对比前URL',
      value: props.beforeUrl,
    },
    {
      label: '对比后URL',
      value: props.afterUrl,
    },
    {
      label: '差异通过情况',
      value: pass.value.diff
        ? () => h(ATag, { color: 'green' }, '通过')
        : () => h(ATag, { color: 'red' }, '不通过'),
    },
    {
      label: '偏移通过情况',
      value: pass.value.shift
        ? () => h(ATag, { color: 'green' }, '通过')
        : () => h(ATag, { color: 'red' }, '不通过'),
    },
  ]);

  const getDetail = () => {
    getCompareTaskDetail(props.id).then((res) => {
      imgs.value = res.data.imgs;
      pass.value = res.data.pass;
    });
  };

  watch(
    () => props.visible,
    (val) => {
      if (val) getDetail();
    }
  );
</script>
