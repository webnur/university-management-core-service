import { Faculty } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createFaculty = async (data: Faculty): Promise<Faculty> => {
  const result = await prisma.faculty.create({ data });
  return result;
};

const getAllFaculty = async (): Promise<Faculty[]> => {
  const result = await prisma.faculty.findMany();
  return result;
};

const getSingleFaculty = async (id: string): Promise<Faculty | null> => {
  const result = await prisma.faculty.findUnique({
    where: {
      id,
    },
  });

  return result;
};

export const FacultyService = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
};
