import express from 'express';
import { StudentEnrolledCourseMarkController } from './studentEnrolledCourseMark.controller';

const routes = express.Router();

routes.patch(
  '/update-marks',
  StudentEnrolledCourseMarkController.updateStudentMark
);
routes.patch(
  '/update-final-marks',
  StudentEnrolledCourseMarkController.updateFinalMark
);

export const StudentEnrolledCourseMarkRoutes = routes;
