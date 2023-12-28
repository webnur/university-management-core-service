import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCoursesController } from './offeredCourses.controller';
import { OfferedCourseValidation } from './offeredCourses.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(OfferedCourseValidation.create),
  OfferedCoursesController.insertIntoBD
);

export const OfferedCoursesRoutes = router;
