export const PERMISSIONS = {
  COURSE: {
    CREATE: 'course.create',
    UPDATE: 'course.update',
    DELETE: 'course.delete',
    PUBLISH: 'course.publish',
  },
  USER: {
    LIST: 'user.list',
    UPDATE: 'user.update',
    DELETE: 'user.delete',
  },
  QUIZ: {
    CREATE: 'quiz.create',
    UPDATE: 'quiz.update',
    DELETE: 'quiz.delete',
  },
  PAYMENT: {
    LIST: 'payment.list',
    REFUND: 'payment.refund',
  },
  ANALYTICS: {
    VIEW: 'analytics.view',
    EXPORT: 'analytics.export',
  },
} as const;

export type Permission =
  | typeof PERMISSIONS.COURSE[keyof typeof PERMISSIONS.COURSE]
  | typeof PERMISSIONS.USER[keyof typeof PERMISSIONS.USER]
  | typeof PERMISSIONS.QUIZ[keyof typeof PERMISSIONS.QUIZ]
  | typeof PERMISSIONS.PAYMENT[keyof typeof PERMISSIONS.PAYMENT]
  | typeof PERMISSIONS.ANALYTICS[keyof typeof PERMISSIONS.ANALYTICS];
