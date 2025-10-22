// SEO配置文件 - 柯基待办应用
export const seoConfig = {
  // 基础SEO信息
  siteName: "CorgiTodo - 柯基待办",
  siteUrl: "https://todolist-rimywo7fu-pikarios-projects.vercel.app",
  
  // 主要关键词 (中英文)
  keywords: [
    // 中文关键词
    "待办清单", "任务管理", "习惯养成", "时间管理", "效率工具", 
    "番茄钟", "专注时间", "日程安排", "目标追踪", "生产力工具",
    "柯基待办", "待办事项", "任务规划", "习惯追踪", "时间追踪",
    "个人管理", "工作规划", "学习计划", "生活管理", "效率提升",
    
    // 英文关键词
    "todo list", "task management", "habit tracker", "time management", 
    "productivity tool", "pomodoro timer", "focus timer", "schedule planner",
    "goal tracking", "personal organizer", "task planner", "habit building",
    "time tracker", "daily planner", "productivity app", "task organizer",
    "habit formation", "time blocking", "focus management", "goal setting",
    "corgi todo", "task list app", "habit app", "productivity tracker"
  ],
  
  // 页面特定SEO配置
  pages: {
    home: {
      title: "CorgiTodo - 智能待办清单与习惯养成工具 | 提升效率的可爱助手",
      description: "CorgiTodo是一款可爱的待办清单和习惯养成应用，帮助您管理日常任务、建立良好习惯、提升工作效率。支持番茄钟、时间追踪、多主题等强大功能。",
      keywords: [
        "待办清单", "习惯养成", "时间管理", "番茄钟", "效率工具",
        "todo list", "habit tracker", "time management", "pomodoro timer", "productivity"
      ]
    }
  },
  
  // 社交媒体配置
  social: {
    twitter: {
      card: "summary_large_image",
      site: "@corgitodo",
      creator: "@corgitodo"
    },
    openGraph: {
      type: "website",
      locale: "zh_CN",
      alternateLocale: "en_US",
      siteName: "CorgiTodo - 柯基待办"
    }
  },
  
  // 结构化数据
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CorgiTodo - 柯基待办",
    "description": "智能待办清单与习惯养成工具，帮助用户提升工作效率和生活质量",
    "url": "https://todolist-rimywo7fu-pikarios-projects.vercel.app",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "待办清单管理",
      "习惯养成追踪", 
      "番茄钟计时器",
      "时间统计",
      "多主题支持",
      "数据导入导出",
      "多语言支持"
    ],
    "screenshot": "https://todolist-rimywo7fu-pikarios-projects.vercel.app/logo.png",
    "author": {
      "@type": "Organization",
      "name": "CorgiTodo Team"
    }
  }
};

// 生成页面SEO元数据的辅助函数
export function generatePageSEO(page = 'home', customData = {}) {
  const pageConfig = seoConfig.pages[page] || seoConfig.pages.home;
  
  return {
    title: customData.title || pageConfig.title,
    description: customData.description || pageConfig.description,
    keywords: customData.keywords || pageConfig.keywords,
    openGraph: {
      title: customData.title || pageConfig.title,
      description: customData.description || pageConfig.description,
      url: seoConfig.siteUrl,
      siteName: seoConfig.siteName,
      images: [
        {
          url: `${seoConfig.siteUrl}/logo.png`,
          width: 1200,
          height: 630,
          alt: 'CorgiTodo - 柯基待办应用截图'
        }
      ],
      locale: 'zh_CN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: customData.title || pageConfig.title,
      description: customData.description || pageConfig.description,
      images: [`${seoConfig.siteUrl}/logo.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: seoConfig.siteUrl,
      languages: {
        'zh-CN': seoConfig.siteUrl,
        'en-US': seoConfig.siteUrl,
      },
    },
  };
}

// 生成结构化数据的辅助函数
export function generateStructuredData(page = 'home', customData = {}) {
  const baseData = seoConfig.structuredData;
  
  if (page === 'home') {
    return {
      ...baseData,
      ...customData
    };
  }
  
  return baseData;
}
