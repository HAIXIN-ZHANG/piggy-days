import type { TaskAssignment, TaskCategory, TaskStatus } from "@piggy-days/core";

export type Locale = "zh-CN" | "en";

export type NavKey = "today" | "tasks" | "fund" | "farm" | "settings";

export type RouteKey = "today" | "tasks" | "taskDetail" | "fund";

type RouteCopy = {
  title: string;
  eyebrow: string;
  description: string;
  status: string;
  nextStep: string;
  preview: string[];
};

type DashboardCard = {
  title: string;
  value: string;
  body: string;
};

export type I18nDictionary = {
  app: {
    brand: string;
    tagline: string;
    activeSection: string;
    kitchenLabel: string;
    kitchenNote: string;
  };
  nav: Record<NavKey, string>;
  routes: Record<RouteKey, RouteCopy>;
  today: {
    cards: DashboardCard[];
    quickAction: string;
    openTasks: string;
    realTasksTitle: string;
    realTasksEmpty: string;
    realFundBody: string;
    realLeaderboardBody: string;
    realRewardsEmpty: string;
    prototypeTitle: string;
    prototypeBody: string;
    openKitchen: string;
  };
  taskLabels: {
    categories: Record<TaskCategory, string>;
    assignments: Record<TaskAssignment, string>;
    statuses: Record<TaskStatus, string>;
  };
  tasksPage: {
    eyebrow: string;
    title: string;
    description: string;
    formTitle: string;
    titleLabel: string;
    titlePlaceholder: string;
    categoryLabel: string;
    assignedToLabel: string;
    coinValueLabel: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    placeLabel: string;
    placePlaceholder: string;
    plannedDateLabel: string;
    createButton: string;
    creatingButton: string;
    listTitle: string;
    emptyTitle: string;
    emptyBody: string;
    openDetail: string;
    currentUserPrefix: string;
  };
  taskDetailPage: {
    backToTasks: string;
    loading: string;
    missingTitle: string;
    createdBy: string;
    assignedTo: string;
    reward: string;
    completedBy: string;
    completedAt: string;
    completionTitle: string;
    completionBody: string;
    noteLabel: string;
    notePlaceholder: string;
    placeLabel: string;
    placePlaceholder: string;
    costLabel: string;
    photoLabel: string;
    photoPlaceholder: string;
    completeButton: string;
    completingButton: string;
    completedMessage: string;
    coinEventMessage: string;
  };
  fundPage: {
    eyebrow: string;
    title: string;
    description: string;
    balance: string;
    earnedAllTime: string;
    earnedThisWeek: string;
    redeemedAllTime: string;
    recentEvents: string;
    noEvents: string;
    weeklyLeaderboard: string;
    allTimeLeaderboard: string;
    noLeaderboard: string;
  };
  settings: {
    eyebrow: string;
    title: string;
    description: string;
    languageTitle: string;
    languageBody: string;
    currentUserTitle: string;
    currentUserBody: string;
    prototypeTitle: string;
    prototypeBody: string;
    openKitchen: string;
    users: {
      me: string;
      wife: string;
    };
    languages: Record<Locale, string>;
  };
  common: {
    routeOnly: string;
    comingSoon: string;
    loading: string;
    error: string;
    coins: string;
  };
};

export const zhCN: I18nDictionary = {
  app: {
    brand: "Piggy Days",
    tagline: "两个人的小日常",
    activeSection: "当前页面",
    kitchenLabel: "厨房实验",
    kitchenNote: "先作为原型入口，不放进主导航。"
  },
  nav: {
    today: "今天",
    tasks: "任务",
    fund: "基金",
    farm: "小猪窝",
    settings: "设置"
  },
  routes: {
    today: {
      title: "今天要做什么？",
      eyebrow: "今日首页",
      description: "今天的任务、Piggy Fund、排行榜和最近奖励都从真实任务与 CoinEvent 里读取。",
      status: "真实闭环",
      nextStep: "下一步会加入 checklist。",
      preview: ["快速记录一件事", "查看今天的待办", "看到基金和排行榜变化"]
    },
    tasks: {
      title: "任务",
      eyebrow: "任务与清单",
      description: "这里会成为真实生活任务的主入口：日常、做饭、约会、出门和家务都先从这里开始。",
      status: "空状态",
      nextStep: "先做简单任务创建，再做 checklist。",
      preview: ["创建简单任务", "分配给我、小猪或我们俩", "完成后获得 Piggy Coins"]
    },
    taskDetail: {
      title: "任务详情",
      eyebrow: "任务详情",
      description: "之后这里会承载 checklist、完成记录、地点、花费和照片链接占位。",
      status: "路由已预留",
      nextStep: "等任务列表接入真实数据后，再打开详情流。",
      preview: ["查看 checklist 进度", "完成某一步", "保存 check-in 笔记"]
    },
    fund: {
      title: "Piggy Fund",
      eyebrow: "金币与流水",
      description: "基金页会解释金币从哪里来、当前余额是多少，以及本周谁贡献了哪些真实行动。",
      status: "空状态",
      nextStep: "等 CoinEvent 数据模型接入后显示真实流水。",
      preview: ["查看当前余额", "查看最近奖励事件", "查看本周和全部排行榜"]
    }
  },
  today: {
    quickAction: "先去任务页",
    openTasks: "打开任务",
    realTasksTitle: "今日待办",
    realTasksEmpty: "今天还没有未完成任务。",
    realFundBody: "余额来自已完成任务生成的 CoinEvent。",
    realLeaderboardBody: "只统计本周正向获得的 Piggy Coins。",
    realRewardsEmpty: "完成一个任务后，这里会出现奖励流水。",
    prototypeTitle: "实验入口",
    prototypeBody: "Piggy Kitchen 现在还是本地原型，适合继续测试晚饭决策，但先不放进主导航。",
    openKitchen: "打开厨房原型",
    cards: [
      {
        title: "今日任务",
        value: "0",
        body: "还没有接入真实任务。下一步会从这里快速添加一件今天要做的事。"
      },
      {
        title: "Piggy Fund",
        value: "0 coins",
        body: "余额会从完成任务产生的 CoinEvent 推导，不直接手改。"
      },
      {
        title: "本周排行榜",
        value: "待开始",
        body: "排行榜按本周获得的正向金币统计，不受兑换扣减影响。"
      },
      {
        title: "最近奖励",
        value: "暂无",
        body: "完成任务、厨房 checklist 或出门 checklist 后，这里会出现解释性的奖励记录。"
      }
    ]
  },
  taskLabels: {
    categories: {
      daily: "日常",
      shopping: "购物",
      cooking: "做饭",
      explore: "出门",
      chore: "家务",
      date: "约会",
      other: "其他"
    },
    assignments: {
      me: "我",
      wife: "小猪",
      both: "我们俩"
    },
    statuses: {
      todo: "待办",
      in_progress: "进行中",
      completed: "已完成"
    }
  },
  tasksPage: {
    eyebrow: "真实任务闭环",
    title: "任务",
    description: "先从 simple task 开始：创建一件真实生活里的小事，完成后写入 CoinEvent。",
    formTitle: "创建 simple task",
    titleLabel: "任务名称",
    titlePlaceholder: "例如：倒垃圾、浇花、收拾厨房",
    categoryLabel: "分类",
    assignedToLabel: "分配给",
    coinValueLabel: "Piggy Coins",
    descriptionLabel: "说明",
    descriptionPlaceholder: "可选：补充怎么做、什么时候做",
    placeLabel: "地点",
    placePlaceholder: "可选：Home、超市、公园",
    plannedDateLabel: "计划时间",
    createButton: "创建任务",
    creatingButton: "创建中...",
    listTitle: "任务列表",
    emptyTitle: "还没有任务",
    emptyBody: "先创建一个 simple task，用它验证 CoinEvent、Fund 和 leaderboard 闭环。",
    openDetail: "查看 / 完成",
    currentUserPrefix: "当前使用者"
  },
  taskDetailPage: {
    backToTasks: "返回任务",
    loading: "正在读取任务...",
    missingTitle: "没有找到这个任务",
    createdBy: "创建者",
    assignedTo: "分配给",
    reward: "奖励",
    completedBy: "完成者",
    completedAt: "完成时间",
    completionTitle: "完成这个任务",
    completionBody: "完成后会写入一条不可变 CoinEvent，并更新 Fund 与排行榜。",
    noteLabel: "完成备注",
    notePlaceholder: "可选：记录一下真实完成情况",
    placeLabel: "地点",
    placePlaceholder: "可选：Home、厨房、附近公园",
    costLabel: "花费 cents",
    photoLabel: "照片 URL",
    photoPlaceholder: "可选：先放 URL 占位，S3 以后再做",
    completeButton: "完成任务",
    completingButton: "完成中...",
    completedMessage: "这个任务已经完成。",
    coinEventMessage: "已写入 CoinEvent"
  },
  fundPage: {
    eyebrow: "CoinEvent 派生",
    title: "Piggy Fund",
    description: "这里不手动维护余额。余额、最近流水和排行榜都从 CoinEvent 计算出来。",
    balance: "当前余额",
    earnedAllTime: "累计获得",
    earnedThisWeek: "本周获得",
    redeemedAllTime: "累计兑换",
    recentEvents: "最近奖励流水",
    noEvents: "还没有 CoinEvent。先去完成一个任务。",
    weeklyLeaderboard: "本周排行榜",
    allTimeLeaderboard: "总排行榜",
    noLeaderboard: "还没有得分。"
  },
  settings: {
    eyebrow: "家庭设置",
    title: "设置",
    description: "先放最小可用的家庭设置：当前使用者、语言切换和实验入口。",
    languageTitle: "界面语言",
    languageBody: "用户自己写的任务、备注和回忆不会被自动翻译。",
    currentUserTitle: "当前使用者",
    currentUserBody: "这个选择先保存在本地，之后会用于创建任务和获得金币。",
    prototypeTitle: "实验功能",
    prototypeBody: "Kitchen 仍然是 prototype，用来验证晚饭决策是否真的有用。",
    openKitchen: "打开 Piggy Kitchen",
    users: {
      me: "我",
      wife: "小猪"
    },
    languages: {
      "zh-CN": "简体中文",
      en: "English"
    }
  },
  common: {
    routeOnly: "这个页面已经有位置了，但真实数据还没有接入。",
    comingSoon: "下一轮再做真实交互。",
    loading: "加载中...",
    error: "加载失败",
    coins: "coins"
  }
};
