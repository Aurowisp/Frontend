<template>
  <div class="forum-list-page">
    <!-- 顶部状态栏及导航 -->
    <header class="page-top-bar">
      <div class="top-title-row">
        <div>
          <h2 class="page-main-title">校园论坛</h2>
          <div class="forum-meta-badge">福大校友互助生活圈 · 交流探讨</div>
        </div>
        <button class="post-trigger-btn" @click="handleCreatePostTip">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="edit-icon">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>发帖</span>
        </button>
      </div>

      <!-- 分类筛选横向滑动栏 -->
      <div class="category-tabs-wrapper">
        <button
          v-for="cat in categories"
          :key="cat"
          type="button"
          class="cat-tab-pill"
          :class="{ 'is-active': activeCategory === cat }"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>
    </header>

    <!-- 帖子列表 -->
    <main class="posts-container">
      <div v-if="filteredPosts.length > 0" class="posts-list">
        <ForumPostCard
          v-for="post in filteredPosts"
          :key="post.id"
          :post="post"
          @click="handlePostClick"
        />
      </div>
      <div v-else class="empty-state">
        <div class="empty-icon">📝</div>
        <p>该板块暂无讨论内容，快来发布第一条帖子吧！</p>
        <button class="reset-btn" @click="activeCategory = '全部'">查看全部帖子</button>
      </div>
    </main>

    <!-- 原型状态提示 Toast -->
    <Teleport to="body">
      <Transition name="toast">
        <div v-if="toastMessage" class="prototype-toast">
          {{ toastMessage }}
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import ForumPostCard from '../components/forum/ForumPostCard.vue';
import { mockForumPosts } from '../mock';
import type { ForumPost } from '../types';

const router = useRouter();

const categories = ['全部', '备考', '新生', '宿舍', '学习', '生活'];
const activeCategory = ref('全部');
const toastMessage = ref('');

const allPosts = ref<ForumPost[]>(mockForumPosts);

const filteredPosts = computed(() => {
  if (activeCategory.value === '全部') {
    return allPosts.value;
  }
  return allPosts.value.filter(item => {
    return (
      item.tag.includes(activeCategory.value) ||
      item.title.includes(activeCategory.value) ||
      item.summary.includes(activeCategory.value)
    );
  });
});

const handlePostClick = (post: ForumPost) => {
  router.push(`/forum/${post.id}`);
};

const handleCreatePostTip = () => {
  toastMessage.value = '📌 论坛发帖为交互原型功能（论坛接口不在现有 Phase 1 规范中）';
  setTimeout(() => {
    toastMessage.value = '';
  }, 2400);
};
</script>

<style scoped>
.forum-list-page {
  width: 100%;
  padding-bottom: 76px;
  background-color: var(--color-bg-page);
  min-height: 100vh;
}

.page-top-bar {
  background-color: #FFFFFF;
  padding: 16px 16px 10px 16px;
  border-bottom: 1px solid #F1F5F9;
  position: sticky;
  top: 0;
  z-index: 10;
}

.top-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.page-main-title {
  font-size: 20px;
  font-weight: 800;
  color: #1E293B;
  letter-spacing: -0.3px;
}

.forum-meta-badge {
  font-size: 11px;
  color: #64748B;
  margin-top: 2px;
}

.post-trigger-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  background: var(--color-secondary-gradient);
  color: #FFFFFF;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12.5px;
  font-weight: 600;
  box-shadow: 0 3px 10px rgba(59, 130, 246, 0.25);
  transition: transform 0.15s ease;
}

.post-trigger-btn:active {
  transform: scale(0.94);
}

.edit-icon {
  width: 14px;
  height: 14px;
}

.category-tabs-wrapper {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 2px;
}

.category-tabs-wrapper::-webkit-scrollbar {
  display: none;
}

.cat-tab-pill {
  padding: 6px 14px;
  border-radius: 18px;
  background-color: #F8FAFC;
  color: #64748B;
  font-size: 12.5px;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.cat-tab-pill.is-active {
  background-color: #E6F3FD;
  color: #2563EB;
  border-color: rgba(37, 99, 235, 0.3);
  font-weight: 600;
}

.posts-container {
  padding: 14px 16px;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #94A3B8;
  font-size: 13px;
}

.empty-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.reset-btn {
  margin-top: 14px;
  padding: 6px 16px;
  background-color: #2563EB;
  color: #FFFFFF;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}

/* Toast 原型提示 */
.prototype-toast {
  position: fixed;
  bottom: 85px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(15, 23, 42, 0.9);
  color: #FFFFFF;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  z-index: 300;
  white-space: nowrap;
  backdrop-filter: blur(8px);
}

.toast-enter-active, .toast-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 15px);
}
</style>
