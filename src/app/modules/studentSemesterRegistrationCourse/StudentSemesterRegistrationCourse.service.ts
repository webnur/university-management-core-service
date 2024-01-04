import { SemesterRegistrationStatus } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IEnrollCoursePayload } from '../semesterRegistration/semesterRegistration.interface';

const enrolledIntoCourse = async (
  authUserId: string,
  payload: IEnrollCoursePayload
): Promise<{
  message: string;
}> => {
  // console.log(authUserId);
  const studentInfo = await prisma.student.findFirst({
    where: {
      studentId: authUserId,
    },
  });
  if (!studentInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'student not found');
  }

  const semesterRegistrationInfo = await prisma.semesterRegistration.findFirst({
    where: {
      status: SemesterRegistrationStatus.ONGOING,
    },
  });
  if (!semesterRegistrationInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'semester register not found');
  }

  const offeredCourse = await prisma.offeredCourses.findFirst({
    where: {
      id: payload.offeredCourseId,
    },
    include: {
      course: true,
    },
  });
  if (!offeredCourse) {
    throw new ApiError(httpStatus.NOT_FOUND, 'offered course not found');
  }

  const offeredCourseSection = await prisma.offeredCourseSection.findFirst({
    where: {
      id: payload.offeredCourseSectionId,
    },
  });
  if (!offeredCourseSection) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'offered course section not found'
    );
  }

  if (
    offeredCourseSection.maxcapacity &&
    offeredCourseSection.currentEnrolledStudent &&
    offeredCourseSection.currentEnrolledStudent >=
      offeredCourseSection.maxcapacity
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'students capacity is full!');
  }

  await prisma.$transaction(async transationClinet => {
    await transationClinet.studentSemesterRegistrationCourse.create({
      data: {
        studentId: studentInfo?.id,
        semesterRegistrationId: semesterRegistrationInfo?.id,
        offeredCourseId: payload.offeredCourseId,
        offeredCourseSectionId: payload.offeredCourseSectionId,
      },
    });

    await transationClinet.offeredCourseSection.update({
      where: {
        id: payload.offeredCourseSectionId,
      },
      data: {
        currentEnrolledStudent: {
          increment: 1,
        },
      },
    });

    await transationClinet.studentSemesterRegistration.updateMany({
      where: {
        student: {
          id: studentInfo.id,
        },
        semesterRegistration: {
          id: semesterRegistrationInfo.id,
        },
      },
      data: {
        totalCreditsTaken: {
          increment: offeredCourse.course.credits,
        },
      },
    });
  });
  return {
    message: 'successfully enrolled into course',
  };
};

const withdrawFromCourse = async (
  authUserId: string,
  payload: IEnrollCoursePayload
): Promise<{
  message: string;
}> => {
  // console.log(authUserId);
  const studentInfo = await prisma.student.findFirst({
    where: {
      studentId: authUserId,
    },
  });
  if (!studentInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'student not found');
  }

  const semesterRegistrationInfo = await prisma.semesterRegistration.findFirst({
    where: {
      status: SemesterRegistrationStatus.ONGOING,
    },
  });
  if (!semesterRegistrationInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'semester register not found');
  }

  const offeredCourse = await prisma.offeredCourses.findFirst({
    where: {
      id: payload.offeredCourseId,
    },
    include: {
      course: true,
    },
  });
  if (!offeredCourse) {
    throw new ApiError(httpStatus.NOT_FOUND, 'offered course not found');
  }

  await prisma.$transaction(async transationClinet => {
    await transationClinet.studentSemesterRegistrationCourse.delete({
      where: {
        semesterRegistrationId_studentId_offeredCourseId: {
          studentId: studentInfo?.id,
          semesterRegistrationId: semesterRegistrationInfo?.id,
          offeredCourseId: payload.offeredCourseId,
        },
      },
    });

    await transationClinet.offeredCourseSection.update({
      where: {
        id: payload.offeredCourseSectionId,
      },
      data: {
        currentEnrolledStudent: {
          decrement: 1,
        },
      },
    });

    await transationClinet.studentSemesterRegistration.updateMany({
      where: {
        student: {
          id: studentInfo.id,
        },
        semesterRegistration: {
          id: semesterRegistrationInfo.id,
        },
      },
      data: {
        totalCreditsTaken: {
          decrement: offeredCourse.course.credits,
        },
      },
    });
  });
  return {
    message: 'successfully withdraw from  course',
  };
};

export const StudentSemesterRegistrationCourseService = {
  enrolledIntoCourse,
  withdrawFromCourse,
};
