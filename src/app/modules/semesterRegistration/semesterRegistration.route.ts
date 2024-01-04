import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationValate } from './semesterRegistration.validation';

const router = express.Router();
router.post(
  '/start-registration',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.startMyRegistration
);

router.get('/', SemesterRegistrationController.getAllFromDb);

router.get('/:id', SemesterRegistrationController.getSingleFromDB);
router.post(
  '/create',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(SemesterRegistrationValate.create),
  SemesterRegistrationController.insertIntoDb
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(SemesterRegistrationValate.update),
  SemesterRegistrationController.updateOneInDB
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SemesterRegistrationController.deleteOneFromDB
);

router.post(
  '/enroll-course',
  validateRequest(SemesterRegistrationValate.enrollOrWithdrawCourse),
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.enrolledIntoCourse
);
router.post(
  '/withdraw-course',
  auth(ENUM_USER_ROLE.STUDENT),
  validateRequest(SemesterRegistrationValate.enrollOrWithdrawCourse),
  SemesterRegistrationController.withdrawFromCourse
);

export const SemesterRegistrationRoutes = router;
