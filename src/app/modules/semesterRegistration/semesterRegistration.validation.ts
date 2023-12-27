import { SemesterRegistrationStatus } from '@prisma/client';
import { z } from 'zod';

const create = z.object({
  body: z.object({
    startDate: z.string({
      required_error: 'start time is required',
    }),
    endDate: z.string({
      required_error: 'end time is required',
    }),
    minCradit: z.number({
      required_error: 'min Cradit is required',
    }),
    maxCradit: z.number({
      required_error: 'max Cradit is required',
    }),
    academicSemisterId: z.string({
      required_error: 'academicSemister Id is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    academicSemesterId: z.string().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
    status: z
      .enum(
        [...Object.values(SemesterRegistrationStatus)] as [string, ...string[]],
        {}
      )
      .optional(),
  }),
});

export const SemesterRegistrationValate = {
  create,
  update,
};
