import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicDepartmentService } from './academicDepartment.service';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicDepartmentService.createDepartment(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'create Academic Department successfully!',
    data: result,
  });
});

const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicDepartmentService.getAllAcademicDepartment();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'get all academic Faculty successfully!',
      data: result,
    });
  }
);

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicDepartmentService.getSingleDepartment(
    req.params.id
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get single academic Faculty successfully!',
    data: result,
  });
});
export const AcademicDepartmentController = {
  createDepartment,
  getSingleDepartment,
  getAllAcademicDepartment,
};
