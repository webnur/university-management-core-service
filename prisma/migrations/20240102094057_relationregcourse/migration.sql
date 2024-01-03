/*
  Warnings:

  - You are about to drop the column `offeredCourseSection` on the `student_semester_registration_course` table. All the data in the column will be lost.
  - Added the required column `offeredCourseSectionId` to the `student_semester_registration_course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "student_semester_registration_course" DROP COLUMN "offeredCourseSection",
ADD COLUMN     "offeredCourseSectionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "student_semester_registration_course" ADD CONSTRAINT "student_semester_registration_course_semesterRegistrationI_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "semester_Registrations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_semester_registration_course" ADD CONSTRAINT "student_semester_registration_course_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_semester_registration_course" ADD CONSTRAINT "student_semester_registration_course_offeredCourseId_fkey" FOREIGN KEY ("offeredCourseId") REFERENCES "offered_courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_semester_registration_course" ADD CONSTRAINT "student_semester_registration_course_offeredCourseSectionI_fkey" FOREIGN KEY ("offeredCourseSectionId") REFERENCES "offered_course_sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
