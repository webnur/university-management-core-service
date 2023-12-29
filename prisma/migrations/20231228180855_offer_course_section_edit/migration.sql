/*
  Warnings:

  - Changed the type of `maxcapacity` on the `offered_course_sections` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "offered_course_sections" DROP COLUMN "maxcapacity",
ADD COLUMN     "maxcapacity" INTEGER NOT NULL;
