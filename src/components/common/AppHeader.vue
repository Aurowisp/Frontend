<template>
  <header class="app-header">
    <!-- 模拟移动端顶部系统状态栏（9:41 / 信号 / WiFi / 电池） -->
    <div class="status-bar" v-if="showStatusBar">
      <span class="status-time">9:41</span>
      <div class="status-icons">
        <!-- 信号格 -->
        <svg class="status-icon" viewBox="0 0 17 11" fill="currentColor">
          <rect x="0" y="8" width="3" height="3" rx="0.5" />
          <rect x="4.5" y="5.5" width="3" height="5.5" rx="0.5" />
          <rect x="9" y="3" width="3" height="8" rx="0.5" />
          <rect x="13.5" y="0" width="3" height="11" rx="0.5" />
        </svg>
        <!-- WiFi -->
        <svg class="status-icon" viewBox="0 0 16 12" fill="currentColor">
          <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM2.8 5.6a7.4 7.4 0 0 1 10.4 0 .8.8 0 0 1-.03 1.13l-.57.57a.8.8 0 0 1-1.13 0 5.4 5.4 0 0 0-7.07 0 .8.8 0 0 1-1.13 0l-.57-.57a.8.8 0 0 1-.03-1.13zm-2.4-2.4a10.8 10.8 0 0 1 15.2 0 .8.8 0 0 1-.03 1.13l-.57.57a.8.8 0 0 1-1.13 0 8.8 8.8 0 0 0-11.87 0 .8.8 0 0 1-1.13 0l-.57-.57a.8.8 0 0 1-.03-1.13z"/>
        </svg>
        <!-- 电池 -->
        <div class="battery-wrapper">
          <span class="battery-percent">100%</span>
          <div class="battery-pill">
            <div class="battery-level"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 顶部校园实景插画背景（右上角自然淡出融合） -->
    <div class="campus-bg-wrapper">
      <img
        :src="campusBg"
        alt="福州大学校园风景"
        class="campus-bg-img"
      />
      <div class="campus-bg-gradient-mask"></div>
    </div>

    <!-- 左侧 Logo 与标语核心内容区 -->
    <div class="brand-content">
      <div class="logo-row">
        <!-- 优先渲染透明切图以百分百还原原稿中“福帮帮”的毛笔动感飞溅笔画 -->
        <img
          v-if="useImageLogo"
          :src="logoSrc"
          alt="福帮帮 Logo"
          class="logo-brand-img"
        />
        <!-- 亦支持纯文本/代码动态替换 -->
        <div v-else class="logo-text-group">
          <div class="brand-title">
            <span class="text-green">{{ title }}</span>
            <span class="brand-sparkle">
              <span class="sparkle-leaf leaf-1"></span>
              <span class="sparkle-leaf leaf-2"></span>
            </span>
          </div>
          <div class="brand-subtitle">{{ subTitle }}</div>
          <div class="brand-slogan">
            <span>{{ slogan }}</span>
            <svg class="slogan-curve" viewBox="0 0 180 18" fill="none">
              <path d="M 5,12 Q 90,2 175,12" stroke="#10B958" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.85" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  subTitle?: string;
  slogan?: string;
  campusBg?: string;
  logoSrc?: string;
  useImageLogo?: boolean;
  showStatusBar?: boolean;
}

withDefaults(defineProps<Props>(), {
  title: '福帮帮',
  subTitle: '福州大学校园互助平台',
  slogan: '在福大，遇见更好的校园生活',
  campusBg: '/assets/images/fzu_campus_bg.png',
  logoSrc: '/assets/images/logo_brand_transparent.png',
  useImageLogo: true,
  showStatusBar: true
});
</script>

<style scoped>
.app-header {
  position: relative;
  width: 100%;
  padding-top: env(safe-area-inset-top, 8px);
  padding-bottom: 8px;
  overflow: hidden;
  background: linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 65%, #F7F9FA 100%);
}

/* 顶部系统状态栏 */
.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px 4px 22px;
  font-size: 13.5px;
  font-weight: 700;
  color: #0F172A;
  z-index: 10;
  position: relative;
  letter-spacing: -0.2px;
}

.status-time {
  letter-spacing: -0.3px;
  font-size: 14px;
}

.status-icons {
  display: flex;
  align-items: center;
  gap: 5px;
}

.status-icon {
  width: 16px;
  height: 11.5px;
}

.battery-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 1px;
}

.battery-percent {
  font-size: 11px;
  font-weight: 600;
  color: #0F172A;
}

.battery-pill {
  width: 22px;
  height: 11.5px;
  border: 1.5px solid #0F172A;
  border-radius: 3.5px;
  padding: 1px;
  display: flex;
  align-items: center;
  position: relative;
}

.battery-pill::after {
  content: '';
  position: absolute;
  right: -3.5px;
  top: 2.8px;
  width: 1.8px;
  height: 4.2px;
  background-color: #0F172A;
  border-radius: 0 1px 1px 0;
}

.battery-level {
  width: 100%;
  height: 100%;
  background-color: #0F172A;
  border-radius: 1px;
}

/* 校园风景背景 */
.campus-bg-wrapper {
  position: absolute;
  top: 20px;
  right: 0;
  width: 72%;
  height: 175px;
  pointer-events: none;
  z-index: 1;
}

.campus-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top right;
  opacity: 0.98;
}

/* 自然过渡渐变遮罩 */
.campus-bg-gradient-mask {
  position: absolute;
  inset: 0;
  background: 
    linear-gradient(to right, #F0FDF4 0%, rgba(240, 253, 244, 0.6) 20%, transparent 60%),
    linear-gradient(to bottom, transparent 40%, rgba(255, 255, 255, 0.9) 82%, #F7F9FA 100%);
}

/* 品牌内容 */
.brand-content {
  position: relative;
  z-index: 3;
  padding: 4px 18px 2px 18px;
}

.logo-row {
  display: flex;
  flex-direction: column;
}

.logo-brand-img {
  width: 146px;
  height: auto;
  object-fit: contain;
  margin-top: 2px;
}

.logo-text-group {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.brand-title {
  display: inline-flex;
  align-items: center;
  font-size: 26px;
  font-weight: 800;
  color: var(--color-primary);
  letter-spacing: 0.5px;
  position: relative;
}

.brand-subtitle {
  font-size: 11px;
  color: var(--color-text-secondary);
  font-weight: 500;
  letter-spacing: 0.2px;
}

.brand-slogan {
  margin-top: 4px;
  font-size: 12px;
  color: var(--color-text-main);
  font-weight: 500;
  display: flex;
  flex-direction: column;
  position: relative;
  width: fit-content;
}

.slogan-curve {
  width: 100%;
  height: 10px;
  margin-top: -2px;
}
</style>
