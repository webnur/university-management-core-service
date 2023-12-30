import express from 'express';
import { offeredCourseClassScheduleController } from './offeredCourseClassSchedule.controller';

const router = express.Router();

router.post('/create', offeredCourseClassScheduleController.insertIntoDB);
router.get('/', offeredCourseClassScheduleController.getAllFromDB);

export const OfferedCourseClassScheduleRoutes = router;
