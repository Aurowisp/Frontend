<template>
  <div class="idle-market-page">
    <!-- 顶部状态栏及导航 -->
    <header class="page-top-bar">
      <div class="top-title-row">
        <h2 class="page-main-title">二手闲置</h2>
        <span class="sub-location">福州大学 · 旗山校区</span>
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

      <!-- 排序过滤条 -->
      <div class="filter-bar">
        <span class="result-count">共 {{ filteredList.length }} 件闲置宝贝</span>
        <div class="sort-options">
          <button
            class="sort-btn"
            :class="{ 'is-active': sortBy === 'latest' }"
            @click="sortBy = 'latest'"
          >
            最新
          </button>
          <span class="sort-divider">|</span>
          <button
            class="sort-btn"
            :class="{ 'is-active': sortBy === 'price-asc' }"
            @click="sortBy = 'price-asc'"
          >
            价格最低
          </button>
        </div>
      </div>
    </header>

    <!-- 商品双列网格 -->
    <main class="products-grid-container">
      <div v-if="filteredList.length > 0" class="products-grid">
        <ProductCard
          v-for="item in filteredList"
          :key="item.id"
          :product="item"
          layout-mode="grid"
          @click="handleProductClick"
        />
      </div>
      <div v-else class="empty-state">
        <div class="empty-icon">📦</div>
        <p>暂无该分类下的闲置商品</p>
        <button class="reset-btn" @click="activeCategory = '全部'">查看全部闲置</button>
      </div>
    </main>

    <!-- 浮动快速发布闲置原型按钮 -->
    <button class="fab-publish-btn" @click="handlePublishTip">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="fab-icon">
        <line x1="12" y1="5" x2="12" y2="19" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="5" y1="12" x2="19" y2="12" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
      <span>发布</span>
    </button>

    <!-- 原型提示 Toast -->
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
import ProductCard from '../components/product/ProductCard.vue';
import { mockProducts } from '../mock';
import type { Product } from '../types';

const router = useRouter();

const categories = ['全部', '教材', '数码', '生活用品', '求购'];
const activeCategory = ref('全部');
const sortBy = ref<'latest' | 'price-asc'>('latest');
const toastMessage = ref('');

const allProducts = ref<Product[]>(mockProducts);

const filteredList = computed(() => {
  let list = [...allProducts.value];
  if (activeCategory.value !== '全部') {
    list = list.filter(item => item.category === activeCategory.value);
  }

  if (sortBy.value === 'price-asc') {
    list.sort((a, b) => a.price - b.price);
  } else {
    list.sort((a, b) => b.id - a.id);
  }

  return list;
});

const handleProductClick = (product: Product) => {
  router.push(`/product/${product.id}`);
};

const handlePublishTip = () => {
  toastMessage.value = '💡 发布闲置原型：Phase 1 规范中支持对接 POST /api/products 接口';
  setTimeout(() => {
    toastMessage.value = '';
  }, 2200);
};
</script>

<style scoped>
.idle-market-page {
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
  align-items: baseline;
  margin-bottom: 12px;
}

.page-main-title {
  font-size: 20px;
  font-weight: 800;
  color: #1E293B;
  letter-spacing: -0.3px;
}

.sub-location {
  font-size: 11px;
  color: #64748B;
  background-color: #F8FAFC;
  padding: 3px 8px;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
}

.category-tabs-wrapper {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 4px;
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
  background-color: #EDFBEB;
  color: var(--color-primary);
  border-color: rgba(16, 185, 88, 0.3);
  font-weight: 600;
}

.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  font-size: 11.5px;
  color: #94A3B8;
}

.sort-options {
  display: flex;
  align-items: center;
  gap: 6px;
}

.sort-btn {
  color: #94A3B8;
  font-size: 11.5px;
  transition: color 0.15s ease;
}

.sort-btn.is-active {
  color: var(--color-primary);
  font-weight: 600;
}

.sort-divider {
  color: #E2E8F0;
  font-size: 10px;
}

.products-grid-container {
  padding: 14px 16px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
  background-color: var(--color-primary);
  color: #FFFFFF;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}

/* 浮动发布按钮 */
.fab-publish-btn {
  position: fixed;
  right: calc(50% - 190px);
  bottom: 80px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: var(--color-primary-gradient);
  color: #FFFFFF;
  padding: 10px 18px;
  border-radius: 24px;
  box-shadow: 0 4px 16px rgba(16, 185, 88, 0.35);
  font-size: 13.5px;
  font-weight: 600;
  z-index: 90;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

@media (max-width: 420px) {
  .fab-publish-btn {
    right: 20px;
  }
}

.fab-publish-btn:active {
  transform: scale(0.94);
}

.fab-icon {
  width: 16px;
  height: 16px;
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
