import { Prisma, Student } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  studentRelationalFields,
  studentRelationalFieldsMapper,
  studentSearchableFields,
} from './student.constants';
import { IStudentFilterRequest } from './student.interface';

const createStudent = async (data: Student): Promise<Student> => {
  const result = await prisma.student.create({ data });
  return result;
};

const getAllStudent = async (
  filters: IStudentFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Student[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: studentSearchableFields.map(field => ({
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
        if (studentRelationalFields.includes(key)) {
          return {
            [studentRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.StudentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.student.findMany({
    include: {
      academicFaculty: true,
      academicDepartment: true,
      academicSemester: true,
    },
    where: whereConditions,
    skip,
    take: limit,
  });

  const total = await prisma.student.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleStudent = async (id: string): Promise<Student | null> => {
  const result = await prisma.student.findUnique({
    where: {
      id,
    },
  });

  return result;
};

export const StudentService = {
  createStudent,
  getAllStudent,
  getSingleStudent,
};
