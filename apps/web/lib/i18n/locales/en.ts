import type { I18nDictionary } from "./zh-CN";

export const en: I18nDictionary = {
  app: {
    brand: "Piggy Days",
    tagline: "A tiny life app for two",
    activeSection: "Current page",
    kitchenLabel: "Kitchen lab",
    kitchenNote: "Kept as a prototype entry for now, outside primary navigation."
  },
  nav: {
    today: "Today",
    tasks: "Tasks",
    fund: "Fund",
    farm: "Piggy Home",
    settings: "Settings"
  },
  routes: {
    today: {
      title: "What should we do today?",
      eyebrow: "Daily home",
      description:
        "Today's tasks, Piggy Fund, leaderboard, and recent rewards now read from real tasks and CoinEvents.",
      status: "Real loop",
      nextStep: "Next, add checklist support.",
      preview: [
        "Quickly record one thing",
        "See today's tasks",
        "Watch the fund and leaderboard move"
      ]
    },
    tasks: {
      title: "Tasks",
      eyebrow: "Todo and checklists",
      description:
        "This becomes the main entry for real-life tasks: daily errands, cooking, dates, outings, and chores.",
      status: "Empty state",
      nextStep: "Start with simple task creation, then add checklists.",
      preview: [
        "Create a simple task",
        "Assign it to me, Piggy, or both",
        "Earn Piggy Coins when it is done"
      ]
    },
    taskDetail: {
      title: "Task detail",
      eyebrow: "Task detail",
      description:
        "This route will hold checklist progress, completion notes, places, costs, and a photo URL placeholder.",
      status: "Reserved route",
      nextStep: "Open the detail flow after the task list has real data.",
      preview: ["See checklist progress", "Complete one step", "Save a check-in note"]
    },
    fund: {
      title: "Piggy Fund",
      eyebrow: "Coins and ledger",
      description:
        "The fund page will explain where coins came from, the current balance, and who earned what this week.",
      status: "Empty state",
      nextStep: "Show real ledger rows after CoinEvent is wired in.",
      preview: [
        "See the current balance",
        "Read recent reward events",
        "See weekly and all-time leaderboards"
      ]
    }
  },
  today: {
    quickAction: "Start from tasks",
    openTasks: "Open tasks",
    realTasksTitle: "Open tasks today",
    realTasksEmpty: "No open tasks yet today.",
    realFundBody: "The balance comes from CoinEvents created by completed tasks.",
    realLeaderboardBody: "Only positive Piggy Coins earned this week count here.",
    realRewardsEmpty: "Complete a task and the reward event will appear here.",
    prototypeTitle: "Prototype entry",
    prototypeBody:
      "Piggy Kitchen is still a local prototype. It is useful for testing dinner decisions, but not ready for primary navigation.",
    openKitchen: "Open Kitchen prototype",
    cards: [
      {
        title: "Today's tasks",
        value: "0",
        body: "No real task data yet. Next, this will let us quickly add one thing for today."
      },
      {
        title: "Piggy Fund",
        value: "0 coins",
        body: "The balance will be derived from task completion events, not edited by hand."
      },
      {
        title: "Weekly leaderboard",
        value: "Not started",
        body: "Leaderboard totals count positive coins earned this week, not fund redemptions."
      },
      {
        title: "Recent rewards",
        value: "None yet",
        body: "Completed tasks, cooking checklists, and outing checklists will create explainable reward events."
      }
    ]
  },
  taskLabels: {
    categories: {
      daily: "Daily",
      shopping: "Shopping",
      cooking: "Cooking",
      explore: "Explore",
      chore: "Chore",
      date: "Date",
      other: "Other"
    },
    assignments: {
      me: "Me",
      wife: "Piggy",
      both: "Both of us"
    },
    statuses: {
      todo: "Todo",
      in_progress: "In progress",
      completed: "Completed"
    }
  },
  tasksPage: {
    eyebrow: "Real task loop",
    title: "Tasks",
    description:
      "Start with simple tasks: create one real-life action, complete it, and write a CoinEvent.",
    formTitle: "Create simple task",
    titleLabel: "Task title",
    titlePlaceholder: "For example: take out trash, water plants, clean kitchen",
    categoryLabel: "Category",
    assignedToLabel: "Assigned to",
    coinValueLabel: "Piggy Coins",
    descriptionLabel: "Description",
    descriptionPlaceholder: "Optional: add how or when this should happen",
    placeLabel: "Place",
    placePlaceholder: "Optional: Home, grocery store, park",
    plannedDateLabel: "Planned time",
    createButton: "Create task",
    creatingButton: "Creating...",
    listTitle: "Task list",
    emptyTitle: "No tasks yet",
    emptyBody:
      "Create a simple task first. This validates the CoinEvent, Fund, and leaderboard loop.",
    openDetail: "View / complete",
    currentUserPrefix: "Current user"
  },
  taskDetailPage: {
    backToTasks: "Back to tasks",
    loading: "Loading task...",
    missingTitle: "Task not found",
    createdBy: "Created by",
    assignedTo: "Assigned to",
    reward: "Reward",
    completedBy: "Completed by",
    completedAt: "Completed at",
    completionTitle: "Complete this task",
    completionBody:
      "Completion writes one immutable CoinEvent and updates the Fund and leaderboard.",
    noteLabel: "Completion note",
    notePlaceholder: "Optional: capture what really happened",
    placeLabel: "Place",
    placePlaceholder: "Optional: Home, kitchen, nearby park",
    costLabel: "Cost in cents",
    photoLabel: "Photo URL",
    photoPlaceholder: "Optional: URL placeholder now; S3 can come later",
    completeButton: "Complete task",
    completingButton: "Completing...",
    completedMessage: "This task is already completed.",
    coinEventMessage: "CoinEvent written"
  },
  fundPage: {
    eyebrow: "Derived from CoinEvents",
    title: "Piggy Fund",
    description:
      "The balance is not edited by hand. Balance, recent events, and leaderboards are derived from CoinEvents.",
    balance: "Current balance",
    earnedAllTime: "Earned all time",
    earnedThisWeek: "Earned this week",
    redeemedAllTime: "Redeemed all time",
    recentEvents: "Recent reward events",
    noEvents: "No CoinEvents yet. Complete a task first.",
    weeklyLeaderboard: "Weekly leaderboard",
    allTimeLeaderboard: "All-time leaderboard",
    noLeaderboard: "No score yet."
  },
  settings: {
    eyebrow: "Settings",
    title: "Settings",
    description:
      "A small home for household preferences: current user, language, and prototype links.",
    languageTitle: "Interface language",
    languageBody: "Your own task titles, notes, and memories will stay exactly as written.",
    currentUserTitle: "Current user",
    currentUserBody:
      "Stored locally for now. Later this will decide who creates tasks and earns coins.",
    prototypeTitle: "Experiments",
    prototypeBody:
      "Kitchen is still a prototype for testing whether the dinner decision loop is useful.",
    openKitchen: "Open Piggy Kitchen",
    users: {
      me: "Me",
      wife: "Piggy"
    },
    languages: {
      "zh-CN": "简体中文",
      en: "English"
    }
  },
  common: {
    routeOnly: "This page has a place now, but real data is not wired in yet.",
    comingSoon: "The real interaction comes in the next slice.",
    loading: "Loading...",
    error: "Could not load",
    coins: "coins"
  }
};
