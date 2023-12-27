-- CreateEnum
CREATE TYPE "SemesterRegistrationStatus" AS ENUM ('UPCOMING', 'ONGOING', 'ENDED');

-- CreateTable
CREATE TABLE "semester_Registrations" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "SemesterRegistrationStatus",
    "minCradit" INTEGER NOT NULL DEFAULT 0,
    "maxCradit" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "academicSemisterId" TEXT NOT NULL,

    CONSTRAINT "semester_Registrations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "semester_Registrations" ADD CONSTRAINT "semester_Registrations_academicSemisterId_fkey" FOREIGN KEY ("academicSemisterId") REFERENCES "academic_semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
