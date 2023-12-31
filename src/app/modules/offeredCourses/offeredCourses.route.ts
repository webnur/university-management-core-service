import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCoursesController } from './offeredCourses.controller';
import { OfferedCourseValidation } from './offeredCourses.validation';

const router = express.Router();
router.get('/', OfferedCoursesController.getAllFromDB);
router.get('/:id', OfferedCoursesController.getSingleIdDB);
router.post(
  '/create',
  validateRequest(OfferedCourseValidation.create),
  OfferedCoursesController.insertIntoBD
);

router.patch(
  '/:id',
  validateRequest(OfferedCourseValidation.update),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OfferedCoursesController.updateOneInDB
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OfferedCoursesController.deleteByIdFromDB
);
export const OfferedCoursesRoutes = router;
