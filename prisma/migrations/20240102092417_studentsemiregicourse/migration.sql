-- CreateTable
CREATE TABLE "student_semester_registration_course" (
    "semesterRegistrationId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "offeredCourseId" TEXT NOT NULL,
    "offeredCourseSection" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_semester_registration_course_pkey" PRIMARY KEY ("semesterRegistrationId","courseId","offeredCourseId")
);
