<template>
  <a-tag v-if="Number(status) === 0" color="arcoblue">
    <template #icon>
      <icon-sync class="loading" spin />
    </template>
    执行中
  </a-tag>
  <a-tag v-else-if="Number(status) === 1" color="green">
    <template #icon>
      <icon-check-circle class="success" />
    </template>
    成功
  </a-tag>
  <a-tag v-else color="red">
    <template #icon>
      <icon-close-circle class="error" />
    </template>
    错误
  </a-tag>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      status: 0 | 1 | 2;
    }>(),
    {
      status: 0,
    }
  );
</script>
