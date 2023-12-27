import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationValate } from './semesterRegistration.validation';

const router = express.Router();

router.get('/', SemesterRegistrationController.getAllFromDb);

router.get('/:id', SemesterRegistrationController.getSingleFromDB);
router.post(
  '/create',
  validateRequest(SemesterRegistrationValate.create),
  SemesterRegistrationController.insertIntoDb
);
router.patch(
  '/:id',
  validateRequest(SemesterRegistrationValate.update),
  SemesterRegistrationController.updateOneInDB
);

router.delete('/:id', SemesterRegistrationController.deleteOneFromDB);
export const SemesterRegistrationRoutes = router;
