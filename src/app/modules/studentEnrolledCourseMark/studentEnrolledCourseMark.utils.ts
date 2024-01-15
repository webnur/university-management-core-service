const getGradeFromMarks = (marks: number) => {
  let result = {
    grade: '',
  };

  if (marks >= 0 && marks <= 39) {
    result = {
      grade: 'F',
    };
  }

  if (marks >= 40 && marks <= 49) {
    result = {
      grade: 'D',
    };
  }

  if (marks >= 50 && marks <= 59) {
    result = {
      grade: 'C',
    };
  }
  if (marks >= 60 && marks <= 69) {
    result = {
      grade: 'B',
    };
  }
  if (marks >= 70 && marks <= 79) {
    result = {
      grade: 'A',
    };
  }
  if (marks >= 81 && marks <= 100) {
    result = {
      grade: 'A+',
    };
  }

  return result;
};

export const StudentEnrolledCourseMarkUtils = {
  getGradeFromMarks,
};
