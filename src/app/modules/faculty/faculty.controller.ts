import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { FacultyService } from './faculty.service';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await FacultyService.createFaculty(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'create faculty successfully!',
    data: result,
  });
});

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await FacultyService.getAllFaculty();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all faculty successfully!',
    data: result,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await FacultyService.getSingleFaculty(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get single faculty successfully!',
    data: result,
  });
});

export const FacultyController = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
};
