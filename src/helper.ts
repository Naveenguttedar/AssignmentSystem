export type userRoleType = "TEACHER" | "STUDENT" | null;
export type quesBoxType = {
  id: string;
  type: string;
  question: string;
  options?: string[];
};
export type questionBankType = {
  quizzes: quesBoxType[];
  essays: quesBoxType[];
  surveys: quesBoxType[];
};
export type assignmentType = {
  id: string;
  title: string;
  questions: quesBoxType[];
};
export type assignmentsType = {
  currentAssignment: assignmentType;
  previousAssignments: assignmentType[];
};
export interface FormDataType {
  [key: string]: string; // Allows dynamic form data, including radio buttons
}
export interface sumbitAssignmentType {
  students: [
    {
      name: string;
      id: string;
      assignmentTitle: string;
      assignmentId: string;
      answers: FormDataType;
      totalMarks: number;
      scored: number;
    },
  ];
}
