import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'academic faculty title is required!',
    }),
  }),
});

const updae = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

export const AcademicFacultyValidation = {
  create,
  updae,
};
