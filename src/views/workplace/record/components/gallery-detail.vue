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
    <p>
      对比前URL: <a-link :href="beforeUrl" icon>{{ beforeUrl }}</a-link>
    </p>
    <p>
      对比后URL: <a-link :href="afterUrl" icon>{{ afterUrl }}</a-link>
    </p>
    <a-space direction="vertical" fill size="medium">
      <a-image
        width="100%"
        :src="imgs.diff"
        title="差异图"
        description="通过红框指示出差异部分"
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
  import { ref, watch } from 'vue';
  import { getCompareTaskDetail } from '@/api/webcompare';

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

  const getDetail = () => {
    getCompareTaskDetail(props.id).then((res) => {
      imgs.value = res.data;
    });
  };

  watch(
    () => props.visible,
    (val) => {
      if (val) getDetail();
    }
  );
</script>
