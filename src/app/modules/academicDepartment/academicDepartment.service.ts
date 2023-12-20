import { AcademicDepartment } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createDepartment = async (
  data: AcademicDepartment
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.create({ data });
  return result;
};
const getAllAcademicDepartment = async () => {
  const result = await prisma.academicDepartment.findMany();
  return result;
};

const getSingleDepartment = async (
  id: string
): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const AcademicDepartmentService = {
  createDepartment,
  getSingleDepartment,
  getAllAcademicDepartment,
};
