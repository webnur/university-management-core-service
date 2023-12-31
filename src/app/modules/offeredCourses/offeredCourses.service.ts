import { OfferedCourses, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import {
  ICreateOfferCourse,
  IOfferedCourseFilterRequest,
} from './offeredCourses.interface';
import {
  offeredCourseRelationalFields,
  offeredCourseRelationalFieldsMapper,
  offeredCourseSearchableFields,
} from './offferedCourses.constants';

const insertIntoDB = async (
  data: ICreateOfferCourse
): Promise<OfferedCourses[]> => {
  const { academicDepartmentId, semesterRegistrationId, courseIds } = data;
  const result: OfferedCourses[] = [];

  await asyncForEach(courseIds, async (courseId: string) => {
    const alreadyExist = await prisma.offeredCourses.findFirst({
      where: {
        academicDepartmentId,
        semesterRegistrationId,
        courseId,
      },
    });

    if (!alreadyExist) {
      const insertOfferedCourse = await prisma.offeredCourses.create({
        data: {
          academicDepartmentId,
          semesterRegistrationId,
          courseId,
        },
        include: {
          academicDepartment: true,
          semesterRegistration: true,
          course: true,
        },
      });

      result.push(insertOfferedCourse);
    }
  });

  return result;
};

const getAllFromDB = async (
  filters: IOfferedCourseFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<OfferedCourses[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: offeredCourseSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (offeredCourseRelationalFields.includes(key)) {
          return {
            [offeredCourseRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.OfferedCoursesWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.offeredCourses.findMany({
    include: {
      semesterRegistration: true,
      course: true,
      academicDepartment: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.offeredCourses.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleIdDB = async (id: string): Promise<OfferedCourses | null> => {
  const result = await prisma.offeredCourses.findUnique({
    where: {
      id,
    },
    include: {
      semesterRegistration: true,
      course: true,
      academicDepartment: true,
    },
  });
  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<OfferedCourses>
): Promise<OfferedCourses> => {
  const result = await prisma.offeredCourses.update({
    where: {
      id,
    },
    data: payload,
    include: {
      semesterRegistration: true,
      course: true,
      academicDepartment: true,
    },
  });
  return result;
};

const deleteByIdFromDB = async (id: string): Promise<OfferedCourses> => {
  const result = await prisma.offeredCourses.delete({
    where: {
      id,
    },
    include: {
      semesterRegistration: true,
      course: true,
      academicDepartment: true,
    },
  });
  return result;
};

export const OfferedCourseService = {
  insertIntoDB,
  getAllFromDB,
  getSingleIdDB,
  updateOneInDB,
  deleteByIdFromDB,
};
