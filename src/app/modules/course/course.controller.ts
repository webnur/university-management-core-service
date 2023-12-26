import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CourseService } from './course.service';

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.createCourse(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course created successfully!',
    data: result,
  });
});

const getAllCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.getAllCourse();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all courses successfully!',
    data: result,
  });
});

const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseService.updateCourse(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully',
    data: result,
  });
});

const assignFaculties = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseService.assignFaculties(id, req.body.faculties);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'assign Course faculty successfully',
    data: result,
  });
});

const removeFaculties = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseService.removeFaculties(id, req.body.faculties);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'assign Course faculty successfully',
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourse,
  updateCourse,
  assignFaculties,
  removeFaculties,
};
