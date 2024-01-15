import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StudentEnrolledCourseMarkService } from './studentEnrolledCourseMark.service';

const updateStudentMark = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await StudentEnrolledCourseMarkService.updateStudentMark(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student update marks successfully!',
    data: data,
  });
  return result;
});

export const StudentEnrolledCourseMarkController = {
  updateStudentMark,
};
