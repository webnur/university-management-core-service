import { z } from 'zod';

const create = z.object({
  body: z.object({
    studentId: z.string({
      required_error: 'student id is required',
    }),
    firstName: z.string({
      required_error: 'first name is required',
    }),
    lastName: z.string({
      required_error: 'last name is required',
    }),
    middleName: z.string().optional(),
    profileImage: z.string({
      required_error: 'profile image is required',
    }),
    email: z.string({
      required_error: 'email is required',
    }),
    contactNo: z.string({
      required_error: 'contact no is required',
    }),
    gender: z.string({
      required_error: 'gender is required',
    }),
    bloodGroup: z.string({
      required_error: 'blood group is required',
    }),
    academicSemesterId: z.string({
      required_error: 'academic semester id is required',
    }),
    academicDepartmentID: z.string({
      required_error: 'academic department id is required',
    }),
    academicFacultyId: z.string({
      required_error: 'academic faculty id is required',
    }),
  }),
});

export const StudentValidation = {
  create,
};
