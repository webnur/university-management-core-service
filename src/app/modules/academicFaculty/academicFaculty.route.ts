import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(AcademicFacultyValidation.create),
  AcademicFacultyController.createFaculty
);
router.get('/', AcademicFacultyController.getAllAcademicFaculty);
router.get('/:id', AcademicFacultyController.getSingleFaculty);

export const AcademicFacultyRoutes = router;
