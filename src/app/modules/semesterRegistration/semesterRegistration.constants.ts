export const semesterRegistrationFilterableFields: string[] = [
  'searchTerm',
  'id',
  'academicSemisterId',
];

export const semesterRegistrationSearchableFields: string[] = [];

export const semesterRegistrationRelationalFields: string[] = [
  'academicSemisterId',
];
export const semesterRegistrationRelationalFieldsMapper: {
  [key: string]: string;
} = {
  academicSemisterId: 'academicSemister',
};
