<template>
  <a-list :bordered="false">
    <a-list-item
      v-for="item in renderList"
      :key="item.id"
      action-layout="vertical"
      :style="{
        opacity: item.read ? 0.5 : 1,
      }"
    >
      <template #extra>
        <a-tag v-if="item.type === 'notice'" color="green">通知</a-tag>
        <a-tag v-else-if="item.type === 'warning'" color="gray">警告</a-tag>
        <a-tag v-else-if="item.type === 'error'" color="red">错误</a-tag>
      </template>
      <div class="item-wrap" @click="onItemClick(item)">
        <a-list-item-meta>
          <template #title>
            <a-space :size="4">
              <span>{{ item.title }}</span>
            </a-space>
          </template>
          <template #description>
            <div>
              <a-typography-paragraph
                :ellipsis="{
                  rows: 1,
                }"
                >{{ item.content }}</a-typography-paragraph
              >
            </div>
          </template>
        </a-list-item-meta>
      </div>
    </a-list-item>
    <div
      v-if="renderList.length && renderList.length < 3"
      :style="{ height: (showMax - renderList.length) * 86 + 'px' }"
    ></div>
  </a-list>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import { MessageRecord, MessageListType } from '@/api/message';

  defineProps({
    renderList: {
      type: Array as PropType<MessageListType>,
      required: true,
    },
    unreadCount: {
      type: Number,
      default: 0,
    },
  });
  const emit = defineEmits(['itemClick']);

  const onItemClick = (item: MessageRecord) => {
    if (!item.read) {
      emit('itemClick', item);
    }
  };
  const showMax = 3;
</script>

<style scoped lang="less">
  :deep(.arco-list) {
    .arco-list-item {
      min-height: 86px;
      border-bottom: 1px solid rgb(var(--gray-3));
    }
    .arco-list-item-extra {
      position: absolute;
      right: 20px;
    }
    .arco-list-item-meta-content {
      flex: 1;
    }
    .item-wrap {
      cursor: pointer;
    }
    .time-text {
      font-size: 12px;
      color: rgb(var(--gray-6));
    }
    .arco-empty {
      display: none;
    }
    .arco-list-footer {
      padding: 0;
      height: 50px;
      line-height: 50px;
      border-top: none;
      .arco-space-item {
        width: 100%;
        border-right: 1px solid rgb(var(--gray-3));
        &:last-child {
          border-right: none;
        }
      }
      .add-border-top {
        border-top: 1px solid rgb(var(--gray-3));
      }
    }
    .footer-wrap {
      text-align: center;
    }
    .arco-typography {
      margin-bottom: 0;
    }
    .add-border {
      border-top: 1px solid rgb(var(--gray-3));
    }
  }
</style>
