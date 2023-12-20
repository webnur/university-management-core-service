import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(StudentValidation.create),
  StudentController.createStudent
);
router.get('/', StudentController.getAllStudent);
router.get('/:id', StudentController.getSingleStudent);

export const StudentRouters = router;
