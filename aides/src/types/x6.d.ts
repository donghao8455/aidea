/**
 * AntV X6 类型声明
 *
 * X6 v3 的 ESM 包与 Docusaurus webpack 5 不兼容，
 * 因此通过全局脚本 /x6.min.js 加载。
 * 本文件为 window.X6 提供类型声明，弥补类型安全。
 */

declare global {
  interface Window {
    X6: {
      Graph: typeof import('@antv/x6').Graph;
    };
  }
}

export {};
