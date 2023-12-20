import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';
const router = express.Router();

router.post(
  '/create',
  validateRequest(FacultyValidation.create),
  FacultyController.createFaculty
);
router.get('/', FacultyController.getAllFaculty);
router.get('/:id', FacultyController.getSingleFaculty);
export const FacultyRoutes = router;
