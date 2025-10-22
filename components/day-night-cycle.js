"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, useSpring } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useLanguage } from "@/lib/useLanguage";

function AnimatedWeekday({ dayIndex, fontSize, textColor }) {
  const { t } = useLanguage();
  
  const weekdays = [
    {
      day: t('common.weekdays.sun'),
      width: fontSize * 1.8,
    },
    {
      day: t('common.weekdays.mon'),
      width: fontSize * 2,
    },
    {
      day: t('common.weekdays.tue'),
      width: fontSize * 1.65,
    },
    {
      day: t('common.weekdays.wed'),
      width: fontSize * 2.2,
    },
    {
      day: t('common.weekdays.thu'),
      width: fontSize * 1.8,
    },
    {
      day: t('common.weekdays.fri'),
      width: fontSize * 1.2,
    },
    {
      day: t('common.weekdays.sat'),
      width: fontSize * 1.6,
    },
  ];
  const height = fontSize * 1.2;

  const animatedIndex = useSpring(dayIndex, { stiffness: 300, damping: 30 });

  useEffect(() => {
    animatedIndex.set(dayIndex);
  }, [animatedIndex, dayIndex]);

  return (
    <div
      className="relative overflow-hidden inline-block"
      style={{
        height: height,
        width: weekdays[dayIndex].width,
        fontSize: fontSize,
        color: textColor,
        fontWeight: "800",
      }}
    >
      {weekdays.map((day, index) => (
        <motion.div
          key={day.day}
          className="absolute flex items-center justify-start font-extrabold"
          style={{
            y: useSpring((index - dayIndex) * height, {
              stiffness: 300,
              damping: 30,
            }),
          }}
          animate={{
            y: (index - dayIndex) * height,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {day.day}
        </motion.div>
      ))}
    </div>
  );
}

function AnimatedDigit({ value, fontSize, textColor }) {
  const animatedValue = useSpring(value, { stiffness: 300, damping: 30 });

  useEffect(() => {
    animatedValue.set(value);
  }, [animatedValue, value]);

  return (
    <div
      className="relative overflow-hidden inline-block"
      style={{
        height: fontSize * 1.2,
        width: fontSize * 0.55,
        fontSize: fontSize,
        color: textColor,
        fontWeight: "800",
      }}
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
        <motion.div
          key={digit}
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            y: (digit - (value % 10)) * fontSize * 1.2,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {digit}
        </motion.div>
      ))}
    </div>
  );
}

export function AnimatedNumber({ value, fontSize, textColor }) {
  const formattedValue = value.toString().padStart(2, "0");
  const digits = formattedValue.split("").map(Number);

  return (
    <div className="flex">
      {digits.map((digit, index) => (
        <AnimatedDigit
          key={`${digits.length}-${index}`}
          value={digit}
          fontSize={fontSize}
          textColor={textColor}
        />
      ))}
    </div>
  );
}

export function DayNightCycle({ selectedDate }) {
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsDay(hour >= 6 && hour < 18);
  }, []);

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Get the day index (0 for Sunday, 1 for Monday, etc.) from the date
  const dayIndex = selectedDate.getDay();

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <div className="text-4xl font-extrabold flex items-center">
          <AnimatedWeekday dayIndex={dayIndex} fontSize={32} />
        </div>
        {isToday(selectedDate) && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {isDay ? (
                <Sun className="h-7 w-7 text-yellow-500" />
              ) : (
                <Moon className="h-7 w-7 text-blue-500" />
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
