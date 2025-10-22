// 轻量级国际化系统
export const translations = {
  en: {
    // 通用
    common: {
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      add: "Add",
      create: "Create",
      close: "Close",
      confirm: "Confirm",
      yes: "Yes",
      no: "No",
      ok: "OK",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      warning: "Warning",
      info: "Info",
      locale: "en-US",
      weekdays: {
        sun: "Sun",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat",
      },
    },
    
    // 主页面
    main: {
      prioSpace: "CorgiTodo",
      focusTrackAchieve: "Focus • Track • Achieve",
      timer: "Timer",
      habits: "Habits",
      addTask: "Add Task",
      settings: "Settings",
      noTasksYet: "No tasks yet. Add one to get started!",
      keyboardShortcuts: "Keyboard Shortcuts",
      ctrlA: "⌘/Ctrl + A → Add Task",
      ctrlC: "⌘/Ctrl + C → Timer", 
      ctrlH: "⌘/Ctrl + H → Habits",
      ctrlX: "⌘/Ctrl + X → Settings",
      esc: "Esc → Close Modal",
    },

    // 着陆页
    landing: {
      description: "A beautiful, modern productivity app that combines powerful task management with a Pomodoro timer, habit tracking, and task collaboration.",
      web: "Web",
      mac: "Mac",
      ios: "iOS",
      windows: "Windows",
      github: "Github",
      openSource: "Open Source & Free",
      openSourceDescription: "CorgiTodo is completely open source. Star the repository, contribute to the project, or fork it to make it your own.",
      starOnGithub: "Star on GitHub",
    },

    // 任务相关
    tasks: {
      tasks: "Tasks",
      habits: "Habits",
      completed: "completed",
      addSubtask: "Add subtask",
      markComplete: "Mark Complete",
      markIncomplete: "Mark Incomplete",
      deleteTask: "Delete Task",
      deleteSubtask: "Delete Subtask",
      transferToToday: "Transfer to Today",
      subtasks: "Subtasks",
      noSubtasksYet: "No subtasks yet",
      currentCategory: "Current Category",
      changeCategory: "Change Category",
      noCategory: "No category",
      createNewCategory: "Create New Category",
      categoryName: "Category name",
      chooseColor: "Choose Color",
      createCategory: "Create Category",
    },

    // 添加任务
    addTask: {
      createNew: "Create New",
      whatNeedsToBeDone: "What needs to be done?",
      date: "Date",
      today: "Today",
      tomorrow: "Tomorrow", 
      nextWeek: "Next Week",
      category: "Category",
      chooseCategory: "Choose a category (optional)",
      addTask: "Add Task",
    },

    // 设置
    settings: {
      settings: "Settings",
      theme: "Theme",
      chooseYourStyle: "Choose your style",
      darkMode: "Dark Mode",
      lightMode: "Light Mode",
      switchToLight: "Switch to light theme",
      switchToDark: "Switch to dark theme",
      syncTasks: "Sync Tasks (P2P)",
      syncDescription: "Sync your tasks from/with another device",
      exportData: "Export Data",
      backupTasks: "Backup your tasks and habits",
      importData: "Import Data",
      restoreFromBackup: "Restore from backup file",
      buyMeCoffee: "Buy Me a Coffee",
      codedWith: "Coded",
      by: "by",
      version: "V1.3.0",
    },

    // 主题
    themes: {
      default: "Default",
      nature: "Nature",
      neoBrutal: "Neo Brutal",
      modern: "Modern",
      pastelDream: "Pastel Dream",
      quantumRose: "Quantum Rose",
      twitter: "Twitter",
      amberMinimal: "Amber Minimal",
      classicWarmTones: "Classic warm tones",
      freshGreenVibes: "Fresh green vibes",
      boldAndStriking: "Bold and striking",
      cleanAndMinimal: "Clean and minimal",
      softLavenderPink: "Soft lavender & pink tones",
      vibrantPinkTeal: "Vibrant pink & teal fusion",
      bluesCleanContrast: "Blues & clean contrast",
      cleanAmberWhite: "Clean amber & white minimalism",
    },

    // Timer related
    timer: {
      breakTime: "Break Time",
      focusTime: "Focus Time",
      focusOnTask: "Focus on task",
      focusingOn: "Focusing on",
      selectTaskHabit: "Select a task or habit",
      youAreDone: "You are done for today!",
      greatJob: "Great job completing all your tasks and habits.",
      markComplete: "Mark Complete",
      overtimeMode: "⏰ Overtime Mode",
      breakTime: "🧘 Break Time",
      focusTime: "🎯 Focus Time",
      quickPresets: "Quick Presets",
      abandon: "Abandon",
      backToWork: "Back to Work",
      overtime: "Overtime",
    },

    // Habit Tracker related
    habitTracker: {
      habitTracker: "Habit Tracker",
      whatHabitToBuild: "What habit do you want to build?",
      createNewHabit: "Add New Habit",
      allHabitsOverview: "All Habits Overview",
      totalCompletions: "total completions",
      habits: "habits",
      past30Days: "Past 30 days",
      totalHabitCompletions: "total habit completions this month",
      individualHabitCompletion: "Individual habit completion",
      dailyHabitCompletions: "Daily habit completions (1-5+)",
      less: "Less",
      more: "More",
      noHabitsYet: "No habits yet",
      addOneToStart: "Add one to start tracking your progress!",
      deleteHabit: "Delete Habit",
      daysCompleted: "days completed",
      thisMonth: "this month",
    },

    // WebRTC sync related
    webrtc: {
      syncTasks: "Sync Tasks",
      serverUrl: "Server URL",
      enterSignalingServerUrl: "Enter your WebRTC signaling server URL",
      connectionTimeout: "Connection timeout. Server might be unavailable.",
      lostConnection: "Lost connection to signaling server",
      failedToConnect: "Failed to connect to signaling server",
      p2pFailed: "P2P connection failed",
      dataReceived: "Data Received!",
      importThisData: "Import This Data",
      hostRoom: "Host a Room",
      shareTasks: "Share your tasks with others",
      shareRoomId: "Share this Room ID with others",
      connectedUsers: "Connected Users",
      waitingForUsers: "Waiting for users to join...",
      joinRoom: "Join Room",
      enterRoomId: "Enter Room ID",
      connectionError: "Connection Error",
      user: "User",
      or: "OR",
      copied: "Copied!",
      copy: "Copy",
      close: "Close",
      startOver: "Start Over",
      tasks: "Tasks",
      customTags: "Custom Tags",
      habits: "Habits",
      theme: "Theme",
    },

    // 着陆页
    landing: {
      description: "A beautiful, modern productivity app that combines powerful task management with a Pomodoro timer, habit tracking, and task collaboration.",
      web: "Web",
      mac: "Mac",
      ios: "iOS",
      windows: "Windows",
      github: "Github",
      openSource: "Open Source & Free",
      openSourceDescription: "CorgiTodo is completely open source. Star the repository, contribute to the project, or fork it to make it your own.",
      starOnGithub: "Star on GitHub",
    },

    // 计时器
    timer: {
      focusTimer: "Focus Timer",
      focusTime: "Focus Time",
      breakTime: "Break Time",
      focusOnTask: "Focus on task",
      focusingOn: "Focusing on",
      selectTask: "Select a task or habit",
      selectTaskHabit: "Select a task or habit",
      youAreDone: "You are done for today!",
      greatJob: "Great job completing all your tasks and habits.",
      quickPresets: "Quick Presets",
      markComplete: "Mark Complete",
      overtime: "Overtime",
      breakTimeMode: "🧘 Break Time",
      focusTimeMode: "🎯 Focus Time",
      overtimeMode: "⏰ Overtime Mode",
    },

    // 习惯追踪
    habits: {
      habitTracker: "Habit Tracker",
      whatHabitToBuild: "What habit do you want to build?",
      addNewHabit: "Add New Habit",
      createNewHabit: "Add New Habit",
      addHabit: "Add Habit",
      allHabitsOverview: "All Habits Overview",
      totalCompletions: "total completions",
      habits: "habits",
      past30Days: "Past 30 days",
      totalHabitCompletions: "total habit completions this month",
      daysCompleted: "days completed this month",
      less: "Less",
      more: "More",
      dailyHabitCompletions: "Daily habit completions (1-5+)",
      individualHabitCompletion: "Individual habit completion",
      noHabitsYet: "No habits yet",
      addOneToStart: "Add one to start tracking your progress!",
      thisMonth: "this month",
    },

    // 任务选项
    taskOptions: {
      options: "Options",
      subtask: "Subtask",
      markComplete: "Mark Complete",
      markIncomplete: "Mark Incomplete",
      transferToToday: "Transfer to Today",
      deleteTask: "Delete Task",
      deleteSubtask: "Delete Subtask",
    },

    // 添加子任务
    addSubtask: {
      createSubtask: "Create Subtask",
      for: "for",
      whatNeedsToBeDone: "What needs to be done?",
      category: "Category",
      chooseCategory: "Choose a category (optional)",
      addSubtask: "Add Subtask",
    },

    // 介绍页面
    intro: {
      focusOnWhatMatters: "Focus on what matters.",
      everyDayNewBeginning: "Every day is a new beginning.",
      smallStepsBigResults: "Small steps, big results.",
      yourTimeMostValuable: "Your time is your most valuable asset.",
      achieveGoalsOneTask: "Achieve your goals, one task at a time.",
      makeTodayCount: "Make today count.",
      progressNotPerfection: "Progress, not perfection.",
      startWhereYouAre: "Start where you are. Use what you have. Do what you can.",
      bestWayPredictFuture: "The best way to predict the future is to create it.",
      disciplineChoosing: "Discipline is choosing between what you want now and what you want most.",
      journeyThousandMiles: "The journey of a thousand miles begins with a single step.",
      believeYouCan: "Believe you can and you're halfway there.",
      futureBelongsToThose: "The future belongs to those who believe in the beauty of their dreams.",
      successNotFinal: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      onlyWayGreatWork: "The only way to do great work is to love what you do.",
      wakeUp: "Wake UP!",
      makeItCount: "Make it COUNT!",
      youHaveNoTime: "You have no time to waste.",
    },

    // WebRTC 同步
    sync: {
      syncTasks: "Sync Tasks",
      serverUrl: "Server URL",
      enterServerUrl: "Enter your WebRTC signaling server URL",
      hostingRoom: "Hosting Room",
      connecting: "Connecting...",
      connected: "Connected!",
      todoShared: "Todo Shared!",
      connectionError: "Connection Error",
      hostRoom: "Host a Room",
      shareTasksWithOthers: "Share your tasks with others",
      or: "OR",
      joinRoom: "Join Room",
      enterRoomId: "Enter Room ID",
      shareThisRoomId: "Share this Room ID with others",
      connectedUsers: "Connected Users",
      user: "User",
      send: "Send",
      waitingForUsers: "Waiting for users to join...",
      dataReceived: "Data Received!",
      importThisData: "Import This Data",
      startOver: "Start Over",
      copied: "Copied!",
      copy: "Copy",
    },

    // 导入导出
    importExport: {
      dataImportedSuccessfully: "Data imported successfully!",
      errorImportingData: "Error importing data. Please check the file format.",
      syncCompleted: "Sync completed! No new items were found - all data was already in sync.",
      syncSuccessful: "Sync successful! Merged/Updated:",
      newTasks: "new task(s)",
      updatedTasks: "updated task(s)", 
      newSubtasks: "new subtask(s)",
      newTags: "new tag(s)",
      newHabits: "new habit(s)",
      updatedSettings: "updated",
      doYouWantToUpdate: "Do you want to update your",
      settingsToMatch: "settings to match the imported data?",
      errorProcessingSynced: "Error processing synced data. Please try again.",
    },

    // 时间相关
    time: {
      minutes: "min",
      hours: "h",
      seconds: "s",
      overtime: "Overtime",
    },
  },

  zh: {
    // 通用
    common: {
      cancel: "取消",
      save: "保存",
      delete: "删除",
      edit: "编辑",
      add: "添加",
      create: "创建",
      close: "关闭",
      confirm: "确认",
      yes: "是",
      no: "否",
      ok: "确定",
      loading: "加载中...",
      error: "错误",
      success: "成功",
      warning: "警告",
      info: "信息",
      locale: "zh-CN",
      weekdays: {
        sun: "日",
        mon: "一",
        tue: "二",
        wed: "三",
        thu: "四",
        fri: "五",
        sat: "六",
      },
    },
    
    // 主页面
    main: {
      prioSpace: "柯基待办",
      focusTrackAchieve: "专注 • 追踪 • 成就",
      timer: "计时器",
      habits: "习惯",
      addTask: "添加任务",
      settings: "设置",
      noTasksYet: "还没有任务。添加一个开始吧！",
      keyboardShortcuts: "键盘快捷键",
      ctrlA: "⌘/Ctrl + A → 添加任务",
      ctrlC: "⌘/Ctrl + C → 计时器", 
      ctrlH: "⌘/Ctrl + H → 习惯",
      ctrlX: "⌘/Ctrl + X → 设置",
      esc: "Esc → 关闭弹窗",
    },

    // 着陆页
    landing: {
      description: "一个美观现代的生产力应用，结合了强大的任务管理、番茄钟计时器、习惯追踪和任务协作功能。",
      web: "网页版",
      mac: "Mac",
      ios: "iOS",
      windows: "Windows",
      github: "Github",
      openSource: "开源免费",
      openSourceDescription: "CorgiTodo 完全开源。给仓库点星、贡献代码，或者 fork 来制作你自己的版本。",
      starOnGithub: "在 GitHub 上点星",
    },

    // 任务相关
    tasks: {
      tasks: "任务",
      habits: "习惯",
      completed: "已完成",
      addSubtask: "添加子任务",
      markComplete: "标记完成",
      markIncomplete: "标记未完成",
      deleteTask: "删除任务",
      deleteSubtask: "删除子任务",
      transferToToday: "转移到今天",
      subtasks: "子任务",
      noSubtasksYet: "还没有子任务",
      currentCategory: "当前分类",
      changeCategory: "更改分类",
      noCategory: "无分类",
      createNewCategory: "创建新分类",
      categoryName: "分类名称",
      chooseColor: "选择颜色",
      createCategory: "创建分类",
    },

    // 添加任务
    addTask: {
      createNew: "创建新任务",
      whatNeedsToBeDone: "需要做什么？",
      date: "日期",
      today: "今天",
      tomorrow: "明天", 
      nextWeek: "下周",
      category: "分类",
      chooseCategory: "选择一个分类（可选）",
      addTask: "添加任务",
    },

    // 设置
    settings: {
      settings: "设置",
      theme: "主题",
      chooseYourStyle: "选择你的风格",
      darkMode: "深色模式",
      lightMode: "浅色模式",
      switchToLight: "切换到浅色主题",
      switchToDark: "切换到深色主题",
      syncTasks: "同步任务 (P2P)",
      syncDescription: "与其他设备同步你的任务",
      exportData: "导出数据",
      backupTasks: "备份你的任务和习惯",
      importData: "导入数据",
      restoreFromBackup: "从备份文件恢复",
      buyMeCoffee: "请我喝咖啡",
      codedWith: "用",
      by: "制作",
      version: "V1.3.0",
    },

    // 主题
    themes: {
      default: "默认",
      nature: "自然",
      neoBrutal: "新野兽派",
      modern: "现代",
      pastelDream: "粉彩梦境",
      quantumRose: "量子玫瑰",
      twitter: "推特",
      amberMinimal: "琥珀极简",
      classicWarmTones: "经典暖色调",
      freshGreenVibes: "清新绿色氛围",
      boldAndStriking: "大胆醒目",
      cleanAndMinimal: "简洁极简",
      softLavenderPink: "柔和薰衣草粉色调",
      vibrantPinkTeal: "活力粉青融合",
      bluesCleanContrast: "蓝色清洁对比",
      cleanAmberWhite: "简洁琥珀白极简",
    },

    // 计时器相关
    timer: {
      breakTime: "休息时间",
      focusTime: "专注时间",
      focusOnTask: "专注任务",
      focusingOn: "正在专注",
      selectTaskHabit: "选择一个任务或习惯",
      youAreDone: "你今天完成了！",
      greatJob: "恭喜你完成了所有任务和习惯。",
      markComplete: "标记完成",
      overtimeMode: "⏰ 加班模式",
      breakTime: "🧘 休息时间",
      focusTime: "🎯 专注时间",
      quickPresets: "快速预设",
      abandon: "放弃",
      backToWork: "返回工作",
      overtime: "加班",
    },

    // 习惯追踪器相关
    habitTracker: {
      habitTracker: "习惯追踪器",
      whatHabitToBuild: "你想养成什么习惯？",
      createNewHabit: "添加新习惯",
      allHabitsOverview: "所有习惯概览",
      totalCompletions: "总完成数",
      habits: "习惯",
      past30Days: "过去30天",
      totalHabitCompletions: "本月总习惯完成数",
      individualHabitCompletion: "单个习惯完成情况",
      dailyHabitCompletions: "每日习惯完成数 (1-5+)",
      less: "更少",
      more: "更多",
      noHabitsYet: "暂无习惯",
      addOneToStart: "添加一个来开始追踪你的进度！",
      deleteHabit: "删除习惯",
      daysCompleted: "天完成",
      thisMonth: "本月",
    },

    // WebRTC同步相关
    webrtc: {
      syncTasks: "同步任务",
      serverUrl: "服务器URL",
      enterSignalingServerUrl: "输入你的WebRTC信令服务器URL",
      connectionTimeout: "连接超时。服务器可能不可用。",
      lostConnection: "与信令服务器的连接丢失",
      failedToConnect: "无法连接到信令服务器",
      p2pFailed: "P2P连接失败",
      dataReceived: "数据已接收!",
      importThisData: "导入此数据",
      hostRoom: "创建房间",
      shareTasks: "与他人分享你的任务",
      shareRoomId: "与他人分享此房间ID",
      connectedUsers: "已连接用户",
      waitingForUsers: "等待用户加入...",
      joinRoom: "加入房间",
      enterRoomId: "输入房间ID",
      connectionError: "连接错误",
      user: "用户",
      or: "或",
      copied: "已复制!",
      copy: "复制",
      close: "关闭",
      startOver: "重新开始",
      tasks: "任务",
      customTags: "自定义标签",
      habits: "习惯",
      theme: "主题",
    },

    // 着陆页
    landing: {
      description: "一个美观、现代的生产力应用，结合了强大的任务管理、番茄钟计时器、习惯追踪和任务协作功能。",
      web: "网页版",
      mac: "Mac",
      ios: "iOS",
      windows: "Windows",
      github: "Github",
      openSource: "开源免费",
      openSourceDescription: "CorgiTodo 完全开源。给仓库点星、为项目贡献代码，或者分叉它来制作你自己的版本。",
      starOnGithub: "在 GitHub 上点星",
    },

    // 计时器
    timer: {
      focusTimer: "专注计时器",
      focusTime: "专注时间",
      breakTime: "休息时间",
      focusOnTask: "专注任务",
      focusingOn: "正在专注",
      selectTask: "选择一个任务或习惯",
      selectTaskHabit: "选择一个任务或习惯",
      youAreDone: "你今天完成了！",
      greatJob: "太棒了，完成了所有任务和习惯。",
      quickPresets: "快速预设",
      markComplete: "标记完成",
      overtime: "超时",
      breakTimeMode: "🧘 休息时间",
      focusTimeMode: "🎯 专注时间",
      overtimeMode: "⏰ 超时模式",
    },

    // 习惯追踪
    habits: {
      habitTracker: "习惯追踪器",
      whatHabitToBuild: "你想建立什么习惯？",
      addNewHabit: "添加新习惯",
      createNewHabit: "添加新习惯",
      addHabit: "添加习惯",
      allHabitsOverview: "所有习惯概览",
      totalCompletions: "总完成次数",
      habits: "个习惯",
      past30Days: "过去30天",
      totalHabitCompletions: "本月总习惯完成次数",
      daysCompleted: "本月完成天数",
      less: "少",
      more: "多",
      dailyHabitCompletions: "每日习惯完成次数 (1-5+)",
      individualHabitCompletion: "个人习惯完成情况",
      noHabitsYet: "还没有习惯",
      addOneToStart: "添加一个开始追踪你的进步！",
      thisMonth: "本月",
    },

    // 任务选项
    taskOptions: {
      options: "选项",
      subtask: "子任务",
      markComplete: "标记完成",
      markIncomplete: "标记未完成",
      transferToToday: "转移到今天",
      deleteTask: "删除任务",
      deleteSubtask: "删除子任务",
    },

    // 添加子任务
    addSubtask: {
      createSubtask: "创建子任务",
      for: "为",
      whatNeedsToBeDone: "需要做什么？",
      category: "分类",
      chooseCategory: "选择一个分类（可选）",
      addSubtask: "添加子任务",
    },

    // 介绍页面
    intro: {
      focusOnWhatMatters: "专注于重要的事情。",
      everyDayNewBeginning: "每一天都是新的开始。",
      smallStepsBigResults: "小步骤，大成果。",
      yourTimeMostValuable: "你的时间是你最宝贵的资产。",
      achieveGoalsOneTask: "一次一个任务地实现你的目标。",
      makeTodayCount: "让今天有意义。",
      progressNotPerfection: "进步，而不是完美。",
      startWhereYouAre: "从你所在的地方开始。用你所拥有的。做你能做的。",
      bestWayPredictFuture: "预测未来的最好方法就是创造它。",
      disciplineChoosing: "自律就是在现在想要的和你最想要的之间做选择。",
      journeyThousandMiles: "千里之行，始于足下。",
      believeYouCan: "相信你能，你就已经成功了一半。",
      futureBelongsToThose: "未来属于那些相信梦想之美的人。",
      successNotFinal: "成功不是终点，失败不是致命的：重要的是继续前进的勇气。",
      onlyWayGreatWork: "做伟大工作的唯一方法就是热爱你所做的事情。",
      wakeUp: "醒醒！",
      makeItCount: "让它有意义！",
      youHaveNoTime: "你没有时间浪费。",
    },

    // WebRTC 同步
    sync: {
      syncTasks: "同步任务",
      serverUrl: "服务器地址",
      enterServerUrl: "输入你的 WebRTC 信令服务器地址",
      hostingRoom: "正在托管房间",
      connecting: "连接中...",
      connected: "已连接！",
      todoShared: "待办事项已分享！",
      connectionError: "连接错误",
      hostRoom: "托管房间",
      shareTasksWithOthers: "与他人分享你的任务",
      or: "或者",
      joinRoom: "加入房间",
      enterRoomId: "输入房间ID",
      shareThisRoomId: "与他人分享这个房间ID",
      connectedUsers: "已连接用户",
      user: "用户",
      send: "发送",
      waitingForUsers: "等待用户加入...",
      dataReceived: "数据已接收！",
      importThisData: "导入此数据",
      startOver: "重新开始",
      copied: "已复制！",
      copy: "复制",
    },

    // 导入导出
    importExport: {
      dataImportedSuccessfully: "数据导入成功！",
      errorImportingData: "导入数据时出错。请检查文件格式。",
      syncCompleted: "同步完成！没有找到新项目 - 所有数据已经同步。",
      syncSuccessful: "同步成功！合并/更新：",
      newTasks: "个新任务",
      updatedTasks: "个已更新任务", 
      newSubtasks: "个新子任务",
      newTags: "个新标签",
      newHabits: "个新习惯",
      updatedSettings: "已更新",
      doYouWantToUpdate: "你想更新你的",
      settingsToMatch: "设置以匹配导入的数据吗？",
      errorProcessingSynced: "处理同步数据时出错。请重试。",
    },

    // 时间相关
    time: {
      minutes: "分钟",
      hours: "小时",
      seconds: "秒",
      overtime: "超时",
    },
  },
};

// 当前语言状态
let currentLanguage = 'en';

// 获取当前语言
export const getCurrentLanguage = () => currentLanguage;

// 设置语言
export const setLanguage = (lang) => {
  if (translations[lang]) {
    currentLanguage = lang;
    // 保存到 localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('corgitodo-language', lang);
    }
    return true;
  }
  return false;
};

// 初始化语言（从 localStorage 读取）
export const initLanguage = () => {
  if (typeof window !== 'undefined') {
    const savedLang = localStorage.getItem('corgitodo-language');
    if (savedLang && translations[savedLang]) {
      currentLanguage = savedLang;
    } else {
      // 根据浏览器语言自动选择
      const browserLang = navigator.language.split('-')[0];
      if (translations[browserLang]) {
        currentLanguage = browserLang;
      }
    }
  }
  return currentLanguage;
};

// 翻译函数
export const t = (key, params = {}) => {
  const keys = key.split('.');
  let value = translations[currentLanguage];
  
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
};

// 获取支持的语言列表
export const getSupportedLanguages = () => {
  return Object.keys(translations).map(lang => ({
    code: lang,
    name: lang === 'en' ? 'English' : '中文',
    nativeName: lang === 'en' ? 'English' : '中文'
  }));
};
