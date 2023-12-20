import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';
const router = express.Router();
router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.create),
  AcademicSemesterController.createSemister
);
router.get('/', AcademicSemesterController.getAllFromDb);
router.get('/:id', AcademicSemesterController.getSingleSemester);
export const AcademicSemesterRoutes = router;
