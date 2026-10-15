<template>
  <div class="profile-page">
    <!-- 顶部个人信息卡片 -->
    <header class="profile-header">
      <div class="user-card">
        <img :src="user.avatar" :alt="user.username" class="user-avatar" />
        <div class="user-info">
          <div class="user-name-line">
            <h2 class="user-name">{{ user.username }}</h2>
          </div>
          <div class="user-meta">{{ user.bio }}</div>
        </div>
      </div>

      <!-- 数据统计栏 -->
      <div class="stats-row">
        <div class="stat-item" @click="handleActionTip('我发布的闲置')">
          <span class="stat-num">{{ user.published_count }}</span>
          <span class="stat-label">我发布的</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item" @click="handleActionTip('我的收藏')">
          <span class="stat-num">{{ user.favorites_count }}</span>
          <span class="stat-label">我的收藏</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item" @click="handleActionTip('我参与的论坛讨论')">
          <span class="stat-num">8</span>
          <span class="stat-label">论坛互动</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item" @click="handleActionTip('已完成交易')">
          <span class="stat-num">{{ user.order_count }}</span>
          <span class="stat-label">历史交易</span>
        </div>
      </div>
    </header>

    <!-- 功能快捷菜单 -->
    <main class="menu-container">
      <div class="menu-group">
        <div class="group-title">交易与互助管理</div>
        <div class="menu-item" @click="handleActionTip('发布新宝贝')">
          <div class="menu-left">
            <div class="menu-icon-box icon-green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="menu-icon">
                <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <span class="menu-title">发布闲置宝贝</span>
          </div>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" class="arrow-right">
            <path d="M6 3.5L10.5 8L6 12.5" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <div class="menu-item" @click="handleActionTip('我卖出的物品')">
          <div class="menu-left">
            <div class="menu-icon-box icon-orange">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="menu-icon">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke-width="2"/>
                <line x1="3" y1="6" x2="21" y2="6" stroke-width="2"/>
                <path d="M16 10a4 4 0 0 1-8 0" stroke-width="2"/>
              </svg>
            </div>
            <span class="menu-title">我的闲置订单</span>
          </div>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" class="arrow-right">
            <path d="M6 3.5L10.5 8L6 12.5" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>

      <div class="menu-group">
        <div class="group-title">校园服务与设置</div>
        <div class="menu-item" @click="handleActionTip('常用面交地点设置')">
          <div class="menu-left">
            <div class="menu-icon-box icon-purple">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="menu-icon">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke-width="2"/>
                <circle cx="12" cy="10" r="3" stroke-width="2"/>
              </svg>
            </div>
            <span class="menu-title">常选面交地点</span>
          </div>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" class="arrow-right">
            <path d="M6 3.5L10.5 8L6 12.5" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <div class="menu-item" @click="handleActionTip('关于福帮帮')">
          <div class="menu-left">
            <div class="menu-icon-box icon-teal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="menu-icon">
                <circle cx="12" cy="12" r="10" stroke-width="2"/>
                <line x1="12" y1="16" x2="12" y2="12" stroke-width="2"/>
                <line x1="12" y1="8" x2="12.01" y2="8" stroke-width="2"/>
              </svg>
            </div>
            <span class="menu-title">关于福帮帮 (CampusLink)</span>
          </div>
          <span class="version-tag">v1.0 Phase 1</span>
        </div>
      </div>
    </main>

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
import { ref } from 'vue';
import { mockCurrentUser } from '../mock';

const user = ref(mockCurrentUser);
const toastMessage = ref('');

const handleActionTip = (name: string) => {
  toastMessage.value = `💡 【${name}】为交互原型功能`;
  setTimeout(() => {
    toastMessage.value = '';
  }, 2200);
};
</script>

<style scoped>
.profile-page {
  width: 100%;
  padding-bottom: 76px;
  background-color: var(--color-bg-page);
  min-height: 100vh;
}

.profile-header {
  background: linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 100%);
  padding: 24px 16px 16px 16px;
  border-bottom: 1px solid #F1F5F9;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}

.user-avatar {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  border: 2px solid #FFFFFF;
  box-shadow: 0 4px 12px rgba(16, 185, 88, 0.15);
  object-fit: cover;
}

.user-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.user-name-line {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-name {
  font-size: 18px;
  font-weight: 800;
  color: #1E293B;
}

.user-meta {
  font-size: 12px;
  color: #64748B;
}

.stats-row {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #FFFFFF;
  border-radius: 14px;
  padding: 12px 6px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  border: 1px solid #F1F5F9;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  cursor: pointer;
  padding: 2px 8px;
}

.stat-item:active {
  opacity: 0.8;
}

.stat-num {
  font-size: 16px;
  font-weight: 800;
  color: #1E293B;
}

.stat-label {
  font-size: 11px;
  color: #64748B;
}

.stat-divider {
  width: 1px;
  height: 22px;
  background-color: #F1F5F9;
}

.menu-container {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.menu-group {
  background-color: #FFFFFF;
  border-radius: 16px;
  padding: 6px 14px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
  border: 1px solid #F1F5F9;
}

.group-title {
  font-size: 11px;
  font-weight: 600;
  color: #94A3B8;
  padding: 8px 4px 4px 4px;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 4px;
  cursor: pointer;
  border-bottom: 1px solid #F8FAFC;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:active {
  opacity: 0.7;
}

.menu-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.menu-icon-box {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-green {
  background-color: #EDFBEB;
  color: var(--color-primary);
}

.icon-orange {
  background-color: #FFF7ED;
  color: #EA580C;
}

.icon-purple {
  background-color: #FAF5FF;
  color: #9333EA;
}

.icon-teal {
  background-color: #F0FDFA;
  color: #0D9488;
}

.menu-icon {
  width: 16px;
  height: 16px;
}

.menu-title {
  font-size: 13.5px;
  font-weight: 500;
  color: #1E293B;
}

.arrow-right {
  width: 14px;
  height: 14px;
  color: #94A3B8;
}

.version-tag {
  font-size: 11px;
  color: #94A3B8;
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
