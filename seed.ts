import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ---------- Permissions ----------
  const permissions = [
    'course.create', 'course.update', 'course.delete', 'course.publish',
    'user.list', 'user.update', 'user.delete',
    'quiz.create', 'quiz.update', 'quiz.delete',
    'payment.list', 'payment.refund',
    'analytics.view', 'analytics.export',
  ];

  for (const key of permissions) {
    await prisma.permission.upsert({
      where: { key },
      update: {},
      create: { key, description: key.replace('.', ' ') },
    });
  }

  // ---------- Super Admin ----------
  const adminPasswordHash = await bcrypt.hash('ChangeMe123!', 12);
  await prisma.user.upsert({
    where: { email: 'admin@alsaeed-etc.com' },
    update: {},
    create: {
      email: 'admin@alsaeed-etc.com',
      passwordHash: adminPasswordHash,
      firstName: 'Super',
      lastName: 'Admin',
      role: UserRole.SUPER_ADMIN,
      emailVerified: true,
    },
  });

  // ---------- Categories ----------
  const categories = [
    { slug: 'project-management', nameAr: 'إدارة المشاريع', nameEn: 'Project Management' },
    { slug: 'risk-management', nameAr: 'إدارة المخاطر', nameEn: 'Risk Management' },
    { slug: 'grc', nameAr: 'الحوكمة والامتثال', nameEn: 'Governance & Compliance' },
    { slug: 'hr', nameAr: 'الموارد البشرية', nameEn: 'Human Resources' },
    { slug: 'safety', nameAr: 'السلامة المهنية', nameEn: 'Occupational Safety' },
    { slug: 'ai-learning', nameAr: 'تعلم الذكاء الاصطناعي', nameEn: 'AI Learning' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  // ---------- Plans ----------
  const plans = [
    {
      slug: 'free', nameAr: 'مجاني', nameEn: 'Free',
      price: 0, interval: 'MONTHLY' as const,
      features: ['library_basic', 'free_courses'],
      maxUsers: 1, sortOrder: 1,
    },
    {
      slug: 'pro-monthly', nameAr: 'احترافي شهري', nameEn: 'Pro Monthly',
      price: 49, interval: 'MONTHLY' as const,
      features: ['all_courses', 'ai_tutor', 'certificates', 'simulations'],
      maxUsers: 1, isPopular: true, sortOrder: 2,
    },
    {
      slug: 'corporate', nameAr: 'الشركات', nameEn: 'Corporate',
      price: 499, interval: 'MONTHLY' as const,
      features: ['all_courses', 'ai_tutor', 'certificates', 'simulations', 'analytics', 'team_management'],
      maxUsers: 25, sortOrder: 3,
    },
  ];

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { slug: plan.slug },
      update: {},
      create: plan,
    });
  }

  console.log('✅ Seed complete.');
  console.log('👤 Admin login → admin@alsaeed-etc.com / ChangeMe123!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
