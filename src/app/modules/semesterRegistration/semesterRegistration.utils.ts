const getAvailableCourses = (
  offeredCourses: any,
  studentCompletedCourse: any,
  studentCurrentlyTakenCourse: any
) => {
  //   console.log('availabe courses',
  //     offeredCourse,
  //     studentCompletedCourse,
  //     studentCurrentlyTakenCourse
  //   );

  const completedCoursesId = studentCompletedCourse.map(
    (course: any) => course.courseId
  );

  const availableCoursesList = offeredCourses
    .filter(
      (offeredCourse: any) =>
        !completedCoursesId.includes(offeredCourse.courseId)
    )
    .filter((course: any) => {
      const preRequisites = course.course.preRequisite;
      if (preRequisites === 0) {
        return true;
      } else {
        const preRequisiteIds = preRequisites.map(
          (preRequisite: any) => preRequisite.prerequisiteId
        );

        return preRequisiteIds.every((id: string) =>
          completedCoursesId.includes(id)
        );
      }
    })
    .map((course: any) => {
      const isAlreadyTakenCourse = studentCurrentlyTakenCourse.find(
        (c: any) => c.offeredCourseId === course.id
      );

      if (isAlreadyTakenCourse) {
        course.offeredCourseSections.map((section: any) => {
          if (section.id === isAlreadyTakenCourse.offeredCourseSectionId) {
            section.isTaken = true;
          } else {
            section.isTaken = true;
          }
        });

        return {
          ...course,
          isTaken: true,
        };
      } else {
        course.offeredCourseSections.map((section: any) => {
          section.isTaken = false;
        });

        return {
          ...course,
          isTaken: false,
        };
      }
    });
  return availableCoursesList;
};

export const SemesterRegistrationUtils = {
  getAvailableCourses,
};
