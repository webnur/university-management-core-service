import { z } from 'zod';

const create = z.object({
  body: z.object({
    facultyId: z.string({
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
    designation: z.string({
      required_error: 'designation is required',
    }),
    bloodGroup: z.string({
      required_error: 'blood group is required',
    }),
    academicDepartmentID: z.string({
      required_error: 'academic department id is required',
    }),
    academicFacultyId: z.string({
      required_error: 'academic faculty id is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    facultyId: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    middleName: z.string().optional(),
    profileImage: z.string().optional(),
    email: z.string().optional(),
    contactNo: z.string().optional(),
    gender: z.string().optional(),
    designation: z.string().optional(),
    bloodGroup: z.string().optional(),
    academicDepartmentID: z.string().optional(),
    academicFacultyId: z.string().optional(),
  }),
});

const assignOrRemoveCoruses = z.object({
  body: z.object({
    courses: z.array(z.string(), {
      required_error: 'Courses is required',
    }),
  }),
});

export const FacultyValidation = {
  create,
  update,
  assignOrRemoveCoruses,
};
