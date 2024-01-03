export type ISemesterRegistrationFilterRequest = {
  searchTerm?: string | undefined;
  academicSemisterId?: string | undefined;
};

export type IEnrollCoursePayload = {
  offeredCourseId: string;
  offeredCourseSectionId: string;
};
