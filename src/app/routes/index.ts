import express from 'express';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { BuildingRoutes } from '../modules/building/building.route';
import { CourseRoutes } from '../modules/course/course.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { OfferedCourseSectionRoutes } from '../modules/offeredCourseSection/offeredCourseSection.route';
import { OfferedCoursesRoutes } from '../modules/offeredCourses/offeredCourses.route';
import { RooRouters } from '../modules/room/room.route';
import { SemesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.route';
import { StudentRouters } from '../modules/student/student.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/students',
    route: StudentRouters,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/buildings',
    route: BuildingRoutes,
  },
  {
    path: '/rooms',
    route: RooRouters,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/semester-ragistration',
    route: SemesterRegistrationRoutes,
  },
  {
    path: '/offer-course',
    route: OfferedCoursesRoutes,
  },
  {
    path: '/Offeredcourse-section',
    route: OfferedCourseSectionRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
