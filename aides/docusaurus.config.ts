import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'AI-Aides - AI概念关系图谱',
  tagline: 'AI助手，让AI概念触手可及',
  favicon: 'img/favicon.ico',

  scripts: [
    '/x6.min.js',
  ],

  future: {
    v4: true,
  },

  url: 'https://aides.thend.cn',
  baseUrl: '/',

  organizationName: 'donghao8455',
  projectName: 'aidea',

  onBrokenLinks: 'throw',
  trailingSlash: false,

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],



  themeConfig: {
    image: 'img/social-card.png',
    metadata: [
      {name: 'keywords', content: 'AI概念,人工智能,机器学习,深度学习,大语言模型,LLM,RAG,Agent,提示词,AI学习'},
      {name: 'robots', content: 'index, follow'},
      {name: 'author', content: 'AI-Aides Team'},
      {property: 'og:type', content: 'website'},
      {property: 'og:site_name', content: 'AI-Aides'},
      {property: 'og:locale', content: 'zh_CN'},
      {name: 'twitter:card', content: 'summary_large_image'},
    ],
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'AI-Aides',
      logo: {
        alt: 'AI-Aides Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '文档',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '学习资源',
          items: [
            {label: 'AI概念图谱', to: '/'},
            {label: '概念详情', to: '/concept?id=llm'},
          ],
        },
        {
          title: '关于我们',
          items: [
            {label: '项目介绍', href: 'https://github.com/donghao8455/aidea'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} AI-Aides. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
