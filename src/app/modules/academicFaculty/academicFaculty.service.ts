import { AcademicFaculty } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createFaculty = async (
  data: AcademicFaculty
): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.create({ data });
  return result;
};

const getAllAcademicFaculty = async () => {
  const result = await prisma.academicFaculty.findMany();
  return result;
};

const getSingleFaculty = async (
  id: string
): Promise<AcademicFaculty | null> => {
  const result = await prisma.academicFaculty.findUnique({
    where: {
      id,
    },
  });
  return result;
};
export const AcademicFacultyService = {
  createFaculty,
  getSingleFaculty,
  getAllAcademicFaculty,
};
