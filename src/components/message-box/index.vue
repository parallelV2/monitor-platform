<template>
  <a-spin style="display: block" :loading="loading">
    <a-tabs v-model:activeKey="messageType" type="rounded" destroy-on-hide>
      <a-tab-pane v-for="item in tabList" :key="item.key">
        <template #title>
          <span> {{ item.title }}{{ formatUnreadLength(item.key) }} </span>
        </template>
        <a-result v-if="!renderList.length" status="404">
          <template #subtitle> {{ $t('messageBox.noContent') }} </template>
        </a-result>
        <List
          :render-list="renderList"
          :unread-count="unreadCount"
          @item-click="handleItemClick"
        />
      </a-tab-pane>
    </a-tabs>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, reactive, toRefs, computed } from 'vue';
  import {
    queryMessageList,
    setMessageStatus,
    MessageRecord,
  } from '@/api/message';
  import useLoading from '@/hooks/loading';
  import List from './list.vue';

  interface TabItem {
    key: string;
    title: string;
    avatar?: string;
  }
  const { loading, setLoading } = useLoading(true);
  const messageType = ref('notice');
  const messageData = reactive<{
    renderList: MessageRecord[];
    messageList: MessageRecord[];
  }>({
    renderList: [],
    messageList: [],
  });
  toRefs(messageData);
  const tabList: TabItem[] = [
    {
      key: 'notice',
      title: '消息',
    },
    {
      key: 'warning',
      title: '警告',
    },
    {
      key: 'error',
      title: '错误',
    },
  ];
  async function fetchSourceData() {
    setLoading(true);
    try {
      const { data } = await queryMessageList();
      if (!Array.isArray(data)) {
        messageData.messageList = [];
      } else {
        messageData.messageList = data;
      }
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  }
  async function readMessage(data: MessageRecord) {
    await setMessageStatus(data.id);
    fetchSourceData();
  }
  const renderList = computed(() => {
    return messageData.messageList.filter(
      (item) => messageType.value === item.type
    );
  });
  const unreadCount = computed(() => {
    return renderList.value.filter((item) => !item.read).length;
  });
  const getUnreadList = (type: string) => {
    const list = messageData.messageList.filter(
      (item) => item.type === type && !item.read
    );
    return list;
  };
  const formatUnreadLength = (type: string) => {
    const list = getUnreadList(type);
    return list.length ? `(${list.length})` : ``;
  };
  const handleItemClick = (item: MessageRecord) => {
    if (renderList.value.length) readMessage(item);
  };
  fetchSourceData();
</script>

<style scoped lang="less">
  :deep(.arco-popover-popup-content) {
    padding: 0;
  }

  :deep(.arco-list-item-meta) {
    align-items: flex-start;
  }
  :deep(.arco-tabs-nav) {
    padding: 14px 0 12px 16px;
    border-bottom: 1px solid var(--color-neutral-3);
  }
  :deep(.arco-tabs-content) {
    padding-top: 0;
    .arco-result-subtitle {
      color: rgb(var(--gray-6));
    }
  }
</style>
