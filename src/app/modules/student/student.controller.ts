import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StudentService } from './student.service';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.createStudent(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'create student successfully!',
    data: result,
  });
});

const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.getAllStudent();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all student successfully!',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.getSingleStudent(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all student successfully!',
    data: result,
  });
});

export const StudentController = {
  createStudent,
  getAllStudent,
  getSingleStudent,
};
