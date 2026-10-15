<template>
  <div class="app-layout" :class="{ 'is-desktop-preview': isDesktop && previewMode === 'mobile' }">
    <!-- 桌面端右上角快速预览切换浮动控制台 -->
    <div v-if="isDesktop" class="desktop-preview-toolbar">
      <div class="preview-mode-switch">
        <button
          type="button"
          class="switch-btn"
          :class="{ active: previewMode === 'mobile' }"
          @click="previewMode = 'mobile'"
        >
          📱 iPhone (390px)
        </button>
        <button
          type="button"
          class="switch-btn"
          :class="{ active: previewMode === 'full' }"
          @click="previewMode = 'full'"
        >
          🖥️ 自适应宽度
        </button>
      </div>
    </div>

    <!-- 移动端视口主容器 -->
    <div
      class="mobile-container"
      :class="{ 'fixed-mobile-frame': isDesktop && previewMode === 'mobile' }"
    >
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>

      <!-- 底部全局导航栏（根据路由 meta 决定是否展示） -->
      <BottomNavigation v-if="shouldShowNav" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import BottomNavigation from './components/common/BottomNavigation.vue';

const route = useRoute();

const isDesktop = ref(false);
const previewMode = ref<'mobile' | 'full'>('mobile');

const shouldShowNav = computed(() => {
  return route.meta?.showNav !== false;
});

const checkDevice = () => {
  isDesktop.value = window.innerWidth >= 768;
};

onMounted(() => {
  checkDevice();
  window.addEventListener('resize', checkDevice);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkDevice);
});
</script>

<style scoped>
.app-layout {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #EEF2F6;
  position: relative;
}

/* 桌面预览控制条 */
.desktop-preview-toolbar {
  position: fixed;
  top: 14px;
  right: 18px;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(10px);
  padding: 4px;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.preview-mode-switch {
  display: flex;
  gap: 4px;
}

.switch-btn {
  padding: 5px 12px;
  border-radius: 14px;
  font-size: 11.5px;
  font-weight: 500;
  color: #64748B;
  transition: all 0.2s ease;
}

.switch-btn.active {
  background-color: var(--color-primary);
  color: #FFFFFF;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(16, 185, 88, 0.3);
}

/* 移动端外壳容器 */
.mobile-container {
  width: 100%;
  min-height: 100vh;
  background-color: var(--color-bg-page);
  position: relative;
  display: flex;
  flex-direction: column;
  transition: max-width 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
}

/* 在桌面环境下固定为 390px 经典手机屏幕比例 */
.mobile-container.fixed-mobile-frame {
  max-width: 390px;
  margin: 20px 0;
  border-radius: 36px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04);
  border: 4px solid #1E293B;
}

/* 页面切换淡入淡出动效 */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.18s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}
</style>
