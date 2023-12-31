export const studentFilterableFields: string[] = [
  'searchTerm',
  'studentId',
  'email',
  'contactNo',
  'gender',
  'bloodGroup',
  'gender',
  'academicFacultyId',
  'academicDepartmentID',
  'academicSemesterId',
];

export const studentSearchableFields: string[] = [
  'firstName',
  'lastName',
  'middleName',
  'email',
  'contactNo',
  'studentId',
];

export const studentRelationalFields: string[] = [
  'academicFacultyId',
  'academicDepartmentID',
  'academicSemesterId',
];
export const studentRelationalFieldsMapper: { [key: string]: string } = {
  academicFacultyId: 'academicFaculty',
  academicDepartmentID: 'academicDepartment',
  academicSemesterId: 'academicSemester',
};
