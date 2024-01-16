import { WeekDays } from '@prisma/client';

export type IOfferedCourseSectionFilterRequest = {
  searchTerm?: string | undefined;
  offeredCourseId?: string | undefined;
};

export type IClassSchedules = {
  startTime: string;
  endTime: string;
  dayOfWeek: WeekDays;
  roomId: string;
  facultyId: string;
};

export type IOfferCourseSectionCreate = {
  title: string;
  maxcapacity: number;
  offeredCourseId: string;
  classSchedules: IClassSchedules[];
};
