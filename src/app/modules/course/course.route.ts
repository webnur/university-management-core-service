import express from 'express';
import { CourseController } from './course.controller';

const router = express.Router();

router.get('/', CourseController.getAllCourse);
router.get('/:id');
router.post('/create', CourseController.createCourse);
router.patch('/:id', CourseController.updateCourse);
router.delete('/:id');
router.post('/:id/assign-faculty', CourseController.assignFaculties);
router.delete('/:id/remove-faculty', CourseController.removeFaculties);

export const CourseRoutes = router;
