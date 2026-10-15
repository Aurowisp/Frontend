import { request } from './request';
import { mockProducts } from '../mock';
import type { Product } from '../types';

export interface ProductQueryParams {
  keyword?: string;
  category?: string;
  status?: string;
  page?: number;
}

/**
 * 获取商品列表 (GET /products)
 */
export async function getProductList(params?: ProductQueryParams): Promise<Product[]> {
  try {
    const query = new URLSearchParams(params as any).toString();
    const res = await request<Product[]>(`/products${query ? `?${query}` : ''}`);
    return res.data;
  } catch {
    // 降级使用 Mock 数据
    let list = [...mockProducts];
    if (params?.category && params.category !== '全部') {
      list = list.filter(p => p.category === params.category);
    }
    if (params?.keyword) {
      list = list.filter(p => p.title.includes(params.keyword!));
    }
    return list;
  }
}

/**
 * 获取商品详情 (GET /products/{id})
 */
export async function getProductDetail(id: number): Promise<Product> {
  try {
    const res = await request<Product>(`/products/${id}`);
    return res.data;
  } catch {
    const item = mockProducts.find(p => p.id === id);
    if (item) return item;
    return mockProducts[0];
  }
}

/**
 * 发布商品 (POST /products)
 */
export async function createProduct(payload: Partial<Product>) {
  return await request('/products', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

/**
 * 修改商品信息 (PUT /products/{id})
 */
export async function updateProduct(id: number, payload: Partial<Product>) {
  return await request(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
}

/**
 * 删除商品 (DELETE /products/{id})
 */
export async function deleteProduct(id: number) {
  return await request(`/products/${id}`, {
    method: 'DELETE'
  });
}
