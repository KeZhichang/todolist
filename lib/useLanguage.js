"use client";

import { useState, useEffect, useCallback } from "react";
import { initLanguage, getCurrentLanguage, setLanguage, t, translations } from "./i18n";

export function useLanguage() {
  const [currentLang, setCurrentLang] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // 初始化语言
    const lang = initLanguage();
    setCurrentLang(lang);
    setIsInitialized(true);
  }, []);

  // 监听语言变化
  useEffect(() => {
    const handleLanguageChange = (e) => {
      const newLang = e.detail?.language || 'en';
      if (translations[newLang]) {
        setCurrentLang(newLang);
      }
    };

    const handleStorageChange = (e) => {
      if (e.key === 'priospace-language') {
        const newLang = e.newValue || 'en';
        if (translations[newLang]) {
          setCurrentLang(newLang);
        }
      }
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const changeLanguage = useCallback((langCode) => {
    if (setLanguage(langCode)) {
      setCurrentLang(langCode);
      return true;
    }
    return false;
  }, []);

  const translate = useCallback((key, params = {}) => {
    const keys = key.split('.');
    let value = translations[currentLang];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        // 如果找不到翻译，回退到英文
        value = translations.en;
        for (const k of keys) {
          if (value && typeof value === 'object') {
            value = value[k];
          } else {
            return key; // 如果英文也没有，返回键名
          }
        }
        break;
      }
    }
    
    if (typeof value === 'string') {
      // 简单的参数替换
      return value.replace(/\{(\w+)\}/g, (match, param) => {
        return params[param] || match;
      });
    }
    
    return key;
  }, [currentLang]);

  return {
    currentLang,
    isInitialized,
    changeLanguage,
    t: translate,
  };
}
