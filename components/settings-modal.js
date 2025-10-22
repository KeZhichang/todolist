"use client";

import { motion } from "framer-motion";
import {
  X,
  Download,
  Upload,
  Sun,
  Moon,
  Settings,
  Heart,
  ExternalLink,
  Palette,
  Check,
  Share,
  Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/useLanguage";

export function SettingsModal({
  onClose,
  darkMode,
  onToggleDarkMode,
  onExportData,
  onImportData,
  theme,
  onThemeChange,
  onOpenWebRTCShare, // New prop for opening WebRTC share
}) {
  const { t } = useLanguage();
  const themes = [
    {
      id: "default",
      name: t('themes.default'),
      description: t('themes.classicWarmTones'),
      preview: {
        primary: "#8B4B3C",
        secondary: "#B8906B",
        background: "#F5F1EB",
      },
    },
    {
      id: "nature",
      name: t('themes.nature'),
      description: t('themes.freshGreenVibes'),
      preview: {
        primary: "#2D5A1B",
        secondary: "#6BA341",
        background: "#F7FAF5",
      },
    },
    {
      id: "neo-brutal",
      name: t('themes.neoBrutal'),
      description: t('themes.boldAndStriking'),
      preview: {
        primary: "#FF0000",
        secondary: "#FFFF00",
        background: "#FFFFFF",
      },
    },
    {
      id: "modern",
      name: t('themes.modern'),
      description: t('themes.cleanAndMinimal'),
      preview: {
        primary: "#171717",
        secondary: "#F5F5F5",
        background: "#FFFFFF",
      },
    },
    {
      id: "pastel-dream",
      name: t('themes.pastelDream'),
      description: t('themes.softLavenderPink'),
      preview: {
        primary: "#D67AD2",
        secondary: "#A2DCEF",
        background: "#F8F4FF",
      },
    },
    {
      id: "quantum-rose",
      name: t('themes.quantumRose'),
      description: t('themes.vibrantPinkTeal'),
      preview: {
        primary: "#D93A7D",
        secondary: "#2DD8C6",
        background: "#FFF5FA",
      },
    },
    {
      id: "twitter",
      name: t('themes.twitter'),
      description: t('themes.bluesCleanContrast'),
      preview: {
        primary: "#1DA1F2",
        secondary: "#F7F9F9",
        background: "#F5F8FA",
      },
    },
    {
      id: "amber-minimal",
      name: t('themes.amberMinimal'),
      description: t('themes.cleanAmberWhite'),
      preview: {
        primary: "#F59E0B",
        secondary: "#E0E7FF",
        background: "#FFFFFF",
      },
    },
  ];

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.15 },
    },
  };

  const modalVariants = {
    hidden: {
      y: "100%",
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.4,
      },
    },
    exit: {
      y: "100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const handleBuyMeCoffee = () => {
    window.open("https://coff.ee/anoy", "_blank");
  };

  const handleTwitterClick = () => {
    window.open("https://x.com/Anoyroyc", "_blank");
  };

  const handleWebRTCShare = () => {
    onClose(); // Close settings first
    onOpenWebRTCShare(); // Open WebRTC share modal
  };

  const ThemePreview = ({ themeData, isSelected, onClick }) => (
    <motion.button
      onClick={onClick}
      className={`relative w-full p-4 rounded-xl border-2 transition-all duration-200 ${
        isSelected
          ? "border-primary bg-primary/5"
          : "border-gray-200 dark:border-gray-700 hover:border-primary/50"
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3">
        {/* Theme Preview */}
        <div className="flex gap-1">
          <div
            className="w-4 h-8 rounded-sm"
            style={{ backgroundColor: themeData.preview.primary }}
          />
          <div
            className="w-4 h-8 rounded-sm"
            style={{ backgroundColor: themeData.preview.secondary }}
          />
          <div
            className="w-4 h-8 rounded-sm border border-gray-300"
            style={{ backgroundColor: themeData.preview.background }}
          />
        </div>

        {/* Theme Info */}
        <div className="flex-1 text-left">
          <div className="font-extrabold text-gray-900 dark:text-gray-100">
            {themeData.name}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {themeData.description}
          </div>
        </div>

        {/* Selected Indicator */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-6 h-6 bg-primary rounded-full flex items-center justify-center"
          >
            <Check className="h-4 w-4 text-primary-foreground" />
          </motion.div>
        )}
      </div>
    </motion.button>
  );

  return (
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        variants={modalVariants}
        className="bg-white dark:bg-gray-900 rounded-t-3xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl border-t border-gray-200 dark:border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag Handle */}
        <motion.div
          className="flex justify-center pt-4 pb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div
            className="w-12 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full cursor-pointer"
            onClick={onClose}
          />
        </motion.div>

        <div className="px-6 pb-6 overflow-y-auto max-h-[calc(90vh-70px)]">
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between mb-6"
          >
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                  delay: 0.25,
                  type: "spring",
                  stiffness: 300,
                }}
                className="p-2.5 bg-primary/10 rounded-xl"
              >
                <Settings className="h-5 w-5 text-primary" />
              </motion.div>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 tracking-wide">
                {t('settings.settings')}
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl p-2 dark:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </motion.div>

          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {/* Theme Selection */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
                <div className="flex items-center gap-3">
                  <Palette className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-extrabold text-gray-900 dark:text-gray-100">
                      {t('settings.theme')}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {t('settings.chooseYourStyle')}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {themes.map((themeData) => (
                    <motion.button
                      key={themeData.id}
                      onClick={() => onThemeChange(themeData.id)}
                      className={`relative rounded-lg border-2 p-1 transition-all duration-200 ${
                        theme === themeData.id
                          ? "border-primary scale-110"
                          : "border-gray-300 dark:border-gray-600 hover:border-primary/50"
                      }`}
                      whileHover={{
                        scale: theme === themeData.id ? 1.1 : 1.05,
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex gap-0.5">
                        <div
                          className="w-2 h-6 rounded-sm"
                          style={{ backgroundColor: themeData.preview.primary }}
                        />
                        <div
                          className="w-2 h-6 rounded-sm"
                          style={{
                            backgroundColor: themeData.preview.secondary,
                          }}
                        />
                        <div
                          className="w-2 h-6 rounded-sm border border-gray-300"
                          style={{
                            backgroundColor: themeData.preview.background,
                          }}
                        />
                      </div>
                      {theme === themeData.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center"
                        >
                          <Check className="h-2.5 w-2.5 text-primary-foreground" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Dark Mode Toggle */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: darkMode ? 0 : 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {darkMode ? (
                      <Moon className="h-5 w-5 text-primary" />
                    ) : (
                      <Sun className="h-5 w-5 text-primary" />
                    )}
                  </motion.div>
                  <div>
                    <div className="font-extrabold text-gray-900 dark:text-gray-100">
                      {darkMode ? t('settings.darkMode') : t('settings.lightMode')}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {darkMode
                        ? t('settings.switchToLight')
                        : t('settings.switchToDark')}
                    </div>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={onToggleDarkMode}
                    variant="outline"
                    size="sm"
                    className="border-2 border-gray-300 dark:border-gray-600 hover:border-primary/70 dark:hover:border-primary/80 rounded-xl font-extrabold w-12 h-12 p-0"
                  >
                    {darkMode ? (
                      <Sun className="h-4 w-4" />
                    ) : (
                      <Moon className="h-4 w-4" />
                    )}
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* WebRTC Share */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between p-4 rounded-xl border-2 border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-800/20">
                <div className="flex items-center gap-3">
                  <Wifi className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <div className="font-extrabold text-blue-700 dark:text-blue-300">
                      {t('settings.syncTasks')}
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      {t('settings.syncDescription')}
                    </div>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleWebRTCShare}
                    className="bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-xl font-extrabold w-12 h-12 p-0"
                  >
                    <Share className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Export Data */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
                <div className="flex items-center gap-3">
                  <Download className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-extrabold text-gray-900 dark:text-gray-100">
                      {t('settings.exportData')}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {t('settings.backupTasks')}
                    </div>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={onExportData}
                    variant="outline"
                    size="sm"
                    className="border-2 border-gray-300 dark:border-gray-600 hover:border-primary/70 dark:hover:border-primary/80 rounded-xl font-extrabold w-12 h-12 p-0"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Import Data */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
                <div className="flex items-center gap-3">
                  <Upload className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-extrabold text-gray-900 dark:text-gray-100">
                      {t('settings.importData')}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {t('settings.restoreBackup')}
                    </div>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={onImportData}
                    variant="outline"
                    size="sm"
                    className="border-2 border-gray-300 dark:border-gray-600 hover:border-primary/70 dark:hover:border-primary/80 rounded-xl font-extrabold w-12 h-12 p-0"
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Buy Me a Coffee */}
            {/* <motion.div variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button
                  onClick={handleBuyMeCoffee}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-extrabold py-4 rounded-xl shadow-lg border-0"
                >
                  <Heart className="h-5 w-5 mr-2 fill-current" />
                  {t('settings.buyMeCoffee')}
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </motion.div>
            </motion.div> */}

            {/* App Info */}
            <motion.div
              variants={itemVariants}
              className="pt-4 border-t-2 border-gray-200 dark:border-gray-700"
            >
              <div className="text-center space-y-3">
                {/* <div className="text-lg font-extrabold text-primary">
                  {t('settings.appVersion')}
                </div>
                <div className="text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  {t('settings.tagline')}
                </div> */}

                {/* vibecoded section */}
                {/* <div className="pt-3">
                  <div className="text-sm text-gray-600 dark:text-gray-300 font-medium -mt-1">
                    <span className="text-lg font-extrabold text-primary">
                      {t('settings.codedWithLove')}
                    </span>{" "}
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                      className="text-red-500 inline-block"
                    >
                      ❤️
                    </motion.span>
                  </div>
                </div> */}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
