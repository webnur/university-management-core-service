import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.get('/', StudentController.getAllStudent);
router.get('/:id', StudentController.getSingleStudent);
router.post(
  '/create',
  validateRequest(StudentValidation.create),
  StudentController.createStudent
);
router.patch(
  '/:id',
  validateRequest(StudentValidation.update),
  StudentController.updateStudent
);
router.delete('/:id', StudentController.deleteStudent);

export const StudentRouters = router;
