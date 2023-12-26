import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CourseController } from './course.controller';
import { CourseValidation } from './course.validation';

const router = express.Router();

router.get('/', CourseController.getAllCourse);
router.get('/:id');
router.post('/create', CourseController.createCourse);
router.patch('/:id', CourseController.updateCourse);
router.delete('/:id');
router.post(
  '/:id/assign-faculty',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(CourseValidation.assignOrRemoveFaculties),
  CourseController.assignFaculties
);
router.delete(
  '/:id/remove-faculty',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(CourseValidation.assignOrRemoveFaculties),
  CourseController.removeFaculties
);

export const CourseRoutes = router;
