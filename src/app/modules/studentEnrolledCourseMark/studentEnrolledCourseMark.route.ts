import express from 'express';
import { StudentEnrolledCourseMarkController } from './studentEnrolledCourseMark.controller';

const routes = express.Router();

routes.patch(
  '/update-marks',
  StudentEnrolledCourseMarkController.updateStudentMark
);

export const StudentEnrolledCourseMarkRoutes = routes;
