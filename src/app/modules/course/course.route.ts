import express from 'express';
import { CourseController } from './course.controller';

const router = express.Router();

router.get('/', CourseController.getAllCourse);
router.get('/:id');
router.post('/create', CourseController.createCourse);
router.patch('/:id', CourseController.updateCourse);
router.delete('/:id');

export const CourseRoutes = router;
