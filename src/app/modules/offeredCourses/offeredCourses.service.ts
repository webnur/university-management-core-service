import { OfferedCourses } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import { ICreateOfferCourse } from './offeredCourses.interface';

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

export const OfferedCourseService = {
  insertIntoDB,
};
