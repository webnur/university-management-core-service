import { z } from 'zod';

const assignOrRemoveFaculties = z.object({
  body: z.object({
    faculties: z.array(z.string(), {
      required_error: 'faculties is required',
    }),
  }),
});

export const CourseValidation = {
  assignOrRemoveFaculties,
};
