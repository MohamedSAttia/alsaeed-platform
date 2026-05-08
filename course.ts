import { z } from 'zod';

export const createCourseSchema = z.object({
  titleAr: z.string().min(3).max(200),
  titleEn: z.string().min(3).max(200),
  descriptionAr: z.string().optional(),
  descriptionEn: z.string().optional(),
  categoryId: z.string().cuid(),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
  language: z.string().default('ar'),
  price: z.number().min(0),
  discountPrice: z.number().min(0).optional(),
});

export const updateCourseSchema = createCourseSchema.partial();

export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;
