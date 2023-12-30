/*
  Warnings:

  - You are about to drop the column `faultyId` on the `offered_course_class_schedules` table. All the data in the column will be lost.
  - Added the required column `facultyId` to the `offered_course_class_schedules` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "offered_course_class_schedules" DROP CONSTRAINT "offered_course_class_schedules_faultyId_fkey";

-- AlterTable
ALTER TABLE "offered_course_class_schedules" DROP COLUMN "faultyId",
ADD COLUMN     "facultyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "offered_course_class_schedules" ADD CONSTRAINT "offered_course_class_schedules_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "faculties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
