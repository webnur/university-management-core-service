import { Course, StudentEnrolledCourse } from '@prisma/client';

const getGradeFromMarks = (marks: number) => {
  let result = {
    grade: '',
    point: 0,
  };

  if (marks >= 0 && marks <= 39) {
    result = {
      grade: 'F',
      point: 0,
    };
  }

  if (marks >= 40 && marks <= 49) {
    result = {
      grade: 'D',
      point: 2.0,
    };
  }

  if (marks >= 50 && marks <= 59) {
    result = {
      grade: 'C',
      point: 2.5,
    };
  }
  if (marks >= 60 && marks <= 69) {
    result = {
      grade: 'B',
      point: 3.0,
    };
  }
  if (marks >= 70 && marks <= 79) {
    result = {
      grade: 'A',
      point: 3.5,
    };
  }
  if (marks >= 81 && marks <= 100) {
    result = {
      grade: 'A+',
      point: 4.0,
    };
  }

  return result;
};

const calculateCGPAndGrade = (
  payload: (StudentEnrolledCourse & { course: Course })[]
) => {
  // console.log(payload)

  if (payload.length === 0) {
    return {
      totalCompletedCradits: 0,
      cgpa: 0,
    };
  }

  let totalCredit = 0;
  let totalCGPA = 0;

  for (const grade of payload) {
    totalCGPA += grade.point || 0;
    totalCredit += grade.course.credits || 0;
  }

  const avgCGPA = Number((totalCGPA / payload.length).toFixed(2));

  return {
    totalCompletedCradits: totalCredit,
    cgpa: avgCGPA,
  };
};

export const StudentEnrolledCourseMarkUtils = {
  getGradeFromMarks,
  calculateCGPAndGrade,
};
