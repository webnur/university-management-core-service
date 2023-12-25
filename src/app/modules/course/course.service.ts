import { Course } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import {
  ICourseCreateData,
  IPrerequisiteCourseRequest,
} from './course.interface';

const createCourse = async (data: ICourseCreateData): Promise<any> => {
  const { preRequisiteCourses, ...courseData } = data;
  console.log(preRequisiteCourses);
  console.log(courseData);

  const newCourse = prisma.$transaction(async transactionClinet => {
    const result = await transactionClinet.course.create({
      data: courseData,
    });

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'unable to create course');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      //   for (let index = 0; index < preRequisiteCourses.length; index++) {
      //     const createPreRequisite =
      //       await transactionClinet.courseToPrerequisite.create({
      //         data: {
      //           courseId: result.id,
      //           prerequisiteId: preRequisiteCourses[index].courseId,
      //         },
      //       });
      //     console.log(createPreRequisite);
      //   }
      await asyncForEach(
        preRequisiteCourses,
        async (preRequisiteCourse: IPrerequisiteCourseRequest) => {
          const createPrerequisite =
            await transactionClinet.courseToPrerequisite.create({
              data: {
                courseId: result.id,
                prerequisiteId: preRequisiteCourse.courseId,
              },
            });
          console.log(createPrerequisite);
        }
      );
    }
    return result;
  });

  if (newCourse) {
    const responseData = await prisma.course.findUnique({
      where: {
        id: (await newCourse).id,
      },
      include: {
        preRequisite: {
          include: {
            preRequisite: true,
          },
        },
        prerequisiteFor: {
          include: {
            course: true,
          },
        },
      },
    });
    return responseData;
  }
  throw new ApiError(httpStatus.BAD_REQUEST, 'unable to create course');
};

const getAllCourse = async () => {
  const result = await prisma.course.findMany();
  return result;
};

const updateCourse = async (
  id: string,
  payload: ICourseCreateData
): Promise<Course | null> => {
  const { preRequisiteCourses, ...courseData } = payload;

  await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.course.update({
      where: {
        id,
      },
      data: courseData,
    });

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'unable to update course');
    }
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletePrerequisite = preRequisiteCourses.filter(
        coursePrerequisite =>
          coursePrerequisite.courseId && coursePrerequisite.isDeleted
      );
      const newPrerequisite = preRequisiteCourses.filter(
        coursePrerequisite =>
          coursePrerequisite.courseId && !coursePrerequisite.isDeleted
      );

      await asyncForEach(
        deletePrerequisite,
        async (deletePreCourse: IPrerequisiteCourseRequest) => {
          await transactionClient.courseToPrerequisite.deleteMany({
            where: {
              AND: [
                {
                  courseId: id,
                },
                {
                  prerequisiteId: deletePreCourse.courseId,
                },
              ],
            },
          });
        }
      );

      //   for (let index = 0; index < deletePrerequisite.length; index++) {
      //     await transactionClient.courseToPrerequisite.deleteMany({
      //       where: {
      //         AND: [
      //           {
      //             courseId: id,
      //           },
      //           {
      //             prerequisiteId: deletePrerequisite[index].courseId,
      //           },
      //         ],
      //       },
      //     });
      //   }

      await asyncForEach(
        newPrerequisite,
        async (insertPrerequisite: IPrerequisiteCourseRequest) => {
          await transactionClient.courseToPrerequisite.create({
            data: {
              courseId: id,
              prerequisiteId: insertPrerequisite.courseId,
            },
          });
        }
      );

      //   for (let index = 0; index < newPrerequisite.length; index++) {
      //     await transactionClient.courseToPrerequisite.create({
      //       data: {
      //         courseId: id,
      //         prerequisiteId: newPrerequisite[index].courseId,
      //       },
      //     });
      //   }
    }

    return result;
  });

  const responseData = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      preRequisite: {
        include: {
          preRequisite: true,
        },
      },
      prerequisiteFor: {
        include: {
          course: true,
        },
      },
    },
  });
  return responseData;
};

export const CourseService = {
  createCourse,
  getAllCourse,
  updateCourse,
};
