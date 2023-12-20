import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    academicFacultyId: z.string({}),
  }),
});

export const AcademicDepartmentValidation = {
  create,
};
