/*
  Warnings:

  - The primary key for the `student_semester_registration_course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `courseId` on the `student_semester_registration_course` table. All the data in the column will be lost.
  - Added the required column `studentId` to the `student_semester_registration_course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "student_semester_registration_course" DROP CONSTRAINT "student_semester_registration_course_courseId_fkey";

-- AlterTable
ALTER TABLE "student_semester_registration_course" DROP CONSTRAINT "student_semester_registration_course_pkey",
DROP COLUMN "courseId",
ADD COLUMN     "studentId" TEXT NOT NULL,
ADD CONSTRAINT "student_semester_registration_course_pkey" PRIMARY KEY ("semesterRegistrationId", "studentId", "offeredCourseId");

-- AddForeignKey
ALTER TABLE "student_semester_registration_course" ADD CONSTRAINT "student_semester_registration_course_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
