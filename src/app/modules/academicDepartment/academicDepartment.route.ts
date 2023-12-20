import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(AcademicDepartmentValidation.create),
  AcademicDepartmentController.createDepartment
);
router.get('/', AcademicDepartmentController.getAllAcademicDepartment);
router.get('/:id', AcademicDepartmentController.getSingleDepartment);

export const AcademicDepartmentRoutes = router;
