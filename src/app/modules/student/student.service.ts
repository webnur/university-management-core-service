import { Student } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createStudent = async (data: Student): Promise<Student> => {
  const result = await prisma.student.create({ data });
  return result;
};

const getAllStudent = async (): Promise<Student[]> => {
  const result = await prisma.student.findMany();
  return result;
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
