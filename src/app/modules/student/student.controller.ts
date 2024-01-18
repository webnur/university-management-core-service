import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentFilterableFields } from './student.constants';
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
  const filters = pick(req.query, studentFilterableFields);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
  const result = await StudentService.getAllStudent(filters, options);
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

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await StudentService.updateStudent(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'updated student successfully!',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentService.deleteStudent(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'delete student successfully!',
    data: result,
  });
});

const myCourses = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const filter = pick(req.query, ['courseId', 'academicSemesterId']);
  const result = await StudentService.myCourses(user.userId, filter);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get student  course data  successfully!',
    data: result,
  });
});

const getMyCourseSchedule = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const filter = pick(req.query, ['courseId', 'academicSemesterId']);
  const result = await StudentService.getMyCourseSchedule(user.userId, filter);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course Schedule data  successfully!',
    data: result,
  });
});

const MyAcademicInfo = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await StudentService.MyAcademicInfo(user.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'my academic info  data fatched successfully!',
    data: result,
  });
});

export const StudentController = {
  createStudent,
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
  myCourses,
  getMyCourseSchedule,
  MyAcademicInfo,
};
