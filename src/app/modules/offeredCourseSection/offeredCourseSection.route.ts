import express from 'express';
import { OfferedCourseSectionController } from './offeredCourseSection.controller';

const router = express.Router();
router.post('/create', OfferedCourseSectionController.insertIntoDB);
router.get('/', OfferedCourseSectionController.getAllFromDB);

export const OfferedCourseSectionRoutes = router;
