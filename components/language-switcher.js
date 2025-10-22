"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/useLanguage";
import { getSupportedLanguages } from "@/lib/i18n";

export function LanguageSwitcher({ onLanguageChange }) {
  const { currentLang, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const languages = getSupportedLanguages();

  const handleLanguageChange = (langCode) => {
    if (changeLanguage(langCode)) {
      setIsOpen(false);
      // 通知父组件语言已更改
      if (onLanguageChange) {
        onLanguageChange(langCode);
      }
      // 触发自定义事件通知其他组件语言已更改
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: langCode } }));
    }
  };

  const currentLanguage = languages.find(lang => lang.code === currentLang);

  return (
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl font-extrabold hover:bg-primary/10 dark:hover:bg-primary/20"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">
            {currentLanguage?.nativeName || 'EN'}
          </span>
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
          >
            {languages.map((language) => (
              <motion.button
                key={language.code}
                whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
                  currentLang === language.code
                    ? "bg-primary/10 text-primary dark:bg-primary/20"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-4 rounded-sm overflow-hidden border border-gray-200 dark:border-gray-600">
                    {language.code === 'en' ? (
                      <div className="w-full h-full bg-gradient-to-b from-blue-600 to-red-600 flex items-center justify-center text-white text-xs font-bold">
                        EN
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-b from-red-600 to-yellow-600 flex items-center justify-center text-white text-xs font-bold">
                        中
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-extrabold text-sm">
                      {language.nativeName}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {language.name}
                    </div>
                  </div>
                </div>
                {currentLang === language.code && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                  >
                    <Check className="h-3 w-3 text-white" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
