import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { semesterRegistrationFilterableFields } from './semesterRegistration.constants';
import { SemesterRegistrationService } from './semesterRegistration.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await SemesterRegistrationService.insertIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'create semester Registration successfully',
    data: result,
  });
});

const getAllFromDb = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, semesterRegistrationFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await SemesterRegistrationService.getAllFromDb(
    filters,
    options
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all semester Registration successfully',
    data: result,
  });
});

const getSingleFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SemesterRegistrationService.getSingleFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get one semester Registration successfully',
    data: result,
  });
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SemesterRegistrationService.updateOneInDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update semester Registration successfully',
    data: result,
  });
});

const deleteOneFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SemesterRegistrationService.deleteOneFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete semester Registration successfully',
    data: result,
  });
});

const startMyRegistration = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await SemesterRegistrationService.startMyRegistration(
    user.userId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student SemesterRegistration started successfully',
    data: result,
  });
});

const enrolledIntoCourse = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  // console.log('student', user);
  const result = await SemesterRegistrationService.enrolledIntoCourse(
    user.userId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student enrolled course  successfully',
    data: result,
  });
});

const withdrawFromCourse = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  // console.log('student', user);
  const result = await SemesterRegistrationService.withdrawFromCourse(
    user.userId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student withdraw from  successfully',
    data: result,
  });
});

export const SemesterRegistrationController = {
  insertIntoDb,
  updateOneInDB,
  getAllFromDb,
  getSingleFromDB,
  deleteOneFromDB,
  startMyRegistration,
  enrolledIntoCourse,
  withdrawFromCourse,
};
