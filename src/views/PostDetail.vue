<template>
  <div class="post-detail-page">
    <!-- 顶部导航条 -->
    <header class="detail-header">
      <button class="header-action-btn" @click="handleBack" aria-label="返回">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="action-icon">
          <path d="M15 19l-7-7 7-7" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <span class="header-title">帖子详情</span>
      <button class="header-action-btn" @click="handleShareTip">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="action-icon">
          <circle cx="18" cy="5" r="3" stroke-width="2"/>
          <circle cx="6" cy="12" r="3" stroke-width="2"/>
          <circle cx="18" cy="19" r="3" stroke-width="2"/>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke-width="2"/>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke-width="2"/>
        </svg>
      </button>
    </header>

    <!-- 帖子主体内容 -->
    <main class="post-main-container">
      <div class="post-badge-row">
        <span class="post-tag" :class="[`tag-${post.tagType || 'blue'}`]">{{ post.tag }}</span>
        <span class="post-date">{{ post.created_date }} · 校园论坛交流</span>
      </div>

      <h1 class="post-full-title">{{ post.title }}</h1>

      <!-- 作者信息 -->
      <div class="author-bar">
        <img :src="post.author.avatar" :alt="post.author.name" class="author-img" />
        <div class="author-text">
          <div class="name-line">
            <span class="author-name">{{ post.author.name }}</span>
            <span class="fzu-student-pill">福大学子</span>
          </div>
          <span class="author-bio">分享真实福大校园攻略与生活体验</span>
        </div>
        <button class="follow-btn" :class="{ 'is-following': isFollowing }" @click="toggleFollow">
          {{ isFollowing ? '已关注' : '+ 关注' }}
        </button>
      </div>

      <!-- 配图 -->
      <div class="post-featured-image-box">
        <img :src="post.image_url" :alt="post.title" class="featured-img" />
      </div>

      <!-- 正文内容 -->
      <div class="post-body">
        <p v-for="(paragraph, idx) in paragraphs" :key="idx" class="body-p">
          {{ paragraph }}
        </p>
      </div>

      <!-- 评论互动区原型 -->
      <div class="comments-section">
        <div class="comments-header">
          <h3 class="comments-title">讨论区 ({{ commentsList.length }})</h3>
          <span class="comments-subtip">文明发言 · 互助交流</span>
        </div>

        <div class="comments-list">
          <div v-for="c in commentsList" :key="c.id" class="comment-item">
            <img :src="c.avatar" :alt="c.name" class="comment-avatar" />
            <div class="comment-content">
              <div class="comment-user-row">
                <span class="comment-user">{{ c.name }}</span>
                <span class="comment-time">{{ c.time }}</span>
              </div>
              <p class="comment-text">{{ c.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 底部评论输入与点赞栏 -->
    <footer class="interaction-footer">
      <div class="comment-input-box" @click="handleInputFocus">
        <input
          v-model="newCommentText"
          type="text"
          placeholder="写下你的校园经验或想法..."
          class="comment-input"
          @keydown.enter="submitComment"
        />
        <button
          v-if="newCommentText"
          class="send-comment-btn"
          @click="submitComment"
        >
          发送
        </button>
      </div>
      <button class="icon-interaction-btn" :class="{ 'is-liked': isLiked }" @click="toggleLike">
        <svg viewBox="0 0 24 24" :fill="isLiked ? '#FF2442' : 'none'" :stroke="isLiked ? '#FF2442' : 'currentColor'" class="footer-icon">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke-width="2"/>
        </svg>
        <span class="count-text">{{ likeCount }}</span>
      </button>
    </footer>

    <!-- Toast 原型提示 -->
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
import { useRoute, useRouter } from 'vue-router';
import { mockForumPosts } from '../mock';

const route = useRoute();
const router = useRouter();

const postId = computed(() => Number(route.params.id) || 1);
const post = computed(() => {
  return mockForumPosts.find(p => p.id === postId.value) || mockForumPosts[0];
});

const isLiked = ref(false);
const likeCount = ref(post.value.likes_count || 32);
const isFollowing = ref(false);
const newCommentText = ref('');
const toastMessage = ref('');

const paragraphs = computed(() => {
  const content = post.value.content || post.value.summary;
  return content.split('\n\n').filter(Boolean);
});

const commentsList = ref([
  {
    id: 1,
    name: '青柠',
    avatar: '/assets/avatars/avatar_lime.png',
    time: '2小时前',
    text: '太实用了！学弟学妹们一定要提前把自习室座位预约软件下好，期末真的手慢无~'
  },
  {
    id: 2,
    name: '数学小佬',
    avatar: '/assets/avatars/avatar_math.png',
    time: '5小时前',
    text: '顶一下！福大旗山校区环境超级好，欢迎大家来到福州大学！'
  }
]);

const showToast = (msg: string) => {
  toastMessage.value = msg;
  setTimeout(() => {
    toastMessage.value = '';
  }, 2200);
};

const handleBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push('/forum');
  }
};

const handleShareTip = () => {
  showToast('🔗 论坛帖子链接已复制原型');
};

const toggleLike = () => {
  isLiked.value = !isLiked.value;
  likeCount.value += isLiked.value ? 1 : -1;
  showToast(isLiked.value ? '👍 点赞成功（交互原型功能）' : '已取消点赞');
};

const toggleFollow = () => {
  isFollowing.value = !isFollowing.value;
  showToast(isFollowing.value ? '已关注楼主原型' : '已取消关注');
};

const handleInputFocus = () => {};

const submitComment = () => {
  if (!newCommentText.value.trim()) return;
  commentsList.value.unshift({
    id: Date.now(),
    name: '福大学子',
    avatar: '/assets/avatars/avatar_cat.png',
    time: '刚刚',
    text: newCommentText.value.trim()
  });
  newCommentText.value = '';
  showToast('💬 评论已发布（交互原型功能）');
};
</script>

<style scoped>
.post-detail-page {
  width: 100%;
  min-height: 100vh;
  padding-bottom: 74px;
  background-color: #FFFFFF;
}

.detail-header {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  background-color: #FFFFFF;
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid #F1F5F9;
}

.header-action-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1E293B;
  border-radius: 50%;
}

.header-action-btn:active {
  background-color: #F1F5F9;
}

.action-icon {
  width: 20px;
  height: 20px;
}

.header-title {
  font-size: 15px;
  font-weight: 700;
  color: #1E293B;
}

.post-main-container {
  padding: 16px;
}

.post-badge-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.post-tag {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
}

.tag-blue {
  background-color: #E8F4FD;
  color: #2563EB;
}

.tag-green {
  background-color: #EAF9EC;
  color: #16A34A;
}

.tag-orange {
  background-color: #FEF3C7;
  color: #D97706;
}

.post-date {
  font-size: 11px;
  color: #94A3B8;
}

.post-full-title {
  font-size: 19px;
  font-weight: 800;
  color: #1E293B;
  line-height: 1.4;
  margin-bottom: 14px;
}

.author-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background-color: #F8FAFC;
  border-radius: 12px;
  margin-bottom: 16px;
}

.author-img {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
}

.author-text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.name-line {
  display: flex;
  align-items: center;
  gap: 6px;
}

.author-name {
  font-size: 13.5px;
  font-weight: 700;
  color: #1E293B;
}

.fzu-student-pill {
  font-size: 10px;
  background-color: #E6F3FD;
  color: #2563EB;
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: 500;
}

.author-bio {
  font-size: 11px;
  color: #64748B;
}

.follow-btn {
  padding: 5px 12px;
  border-radius: 16px;
  background-color: var(--color-primary);
  color: #FFFFFF;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.follow-btn.is-following {
  background-color: #E2E8F0;
  color: #64748B;
}

.post-featured-image-box {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
  aspect-ratio: 1.5 / 1;
}

.featured-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-body {
  font-size: 14.5px;
  color: #334155;
  line-height: 1.7;
  margin-bottom: 24px;
}

.body-p {
  margin-bottom: 12px;
  white-space: pre-line;
}

.comments-section {
  padding-top: 18px;
  border-top: 1px solid #F1F5F9;
}

.comments-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.comments-title {
  font-size: 15px;
  font-weight: 700;
  color: #1E293B;
}

.comments-subtip {
  font-size: 11px;
  color: #94A3B8;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.comment-item {
  display: flex;
  gap: 10px;
}

.comment-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.comment-content {
  flex: 1;
  background-color: #F8FAFC;
  padding: 10px 12px;
  border-radius: 10px;
}

.comment-user-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.comment-user {
  font-size: 12px;
  font-weight: 600;
  color: #1E293B;
}

.comment-time {
  font-size: 10.5px;
  color: #94A3B8;
}

.comment-text {
  font-size: 12.5px;
  color: #475569;
  line-height: 1.45;
}

.interaction-footer {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: var(--viewport-max-width);
  height: 56px;
  background-color: #FFFFFF;
  border-top: 1px solid #E2E8F0;
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 12px;
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.04);
  z-index: 100;
}

.comment-input-box {
  flex: 1;
  height: 38px;
  background-color: #F1F5F9;
  border-radius: 19px;
  display: flex;
  align-items: center;
  padding: 0 12px;
}

.comment-input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 12.5px;
  color: #1E293B;
}

.send-comment-btn {
  color: var(--color-primary);
  font-size: 12.5px;
  font-weight: 600;
}

.icon-interaction-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #64748B;
  font-size: 12px;
}

.footer-icon {
  width: 20px;
  height: 20px;
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
