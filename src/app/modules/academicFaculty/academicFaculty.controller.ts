import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicFacultyFilterableFields } from './academicFaculty.constants';
import { AcademicFacultyService } from './academicFaculty.service';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicFacultyService.createFaculty(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'create academic Faculty successfully!',
    data: result,
  });
});

const getAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicFacultyFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    console.log('filters data', filters);
    console.log('options data', options);
    const result = await AcademicFacultyService.getAllAcademicFaculty(
      filters,
      options
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'get all academic Faculty successfully!',
      data: result,
    });
  }
);

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicFacultyService.getSingleFaculty(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get single academic Faculty successfully!',
    data: result,
  });
});

export const AcademicFacultyController = {
  createFaculty,
  getSingleFaculty,
  getAllAcademicFaculty,
};
