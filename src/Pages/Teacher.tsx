import { Navigate, Route, Routes } from "react-router-dom";
import SideBar from "../Components/SideBar";
import AssignmentCreation from "./AssignmentCreation";
import GradeAssignments from "./GradeAssignment";
import QuestionBank from "./QuestionBank";
import MyAssignments from "./MyAssignments";
import { TeacherProvider } from "../Context";

export default function TeacherPage() {
  return (
    <div className="flex ">
      <TeacherProvider>
        <SideBar />
        <div className="w-full h-full">
          <Routes>
            <Route index element={<Navigate to={"myAssignments"} />} />
            <Route path="myAssignments" element={<MyAssignments />} />
            <Route path="addAssignment" element={<AssignmentCreation />} />
            <Route path="questionBank" element={<QuestionBank />} />
            <Route path="gradeAssignments" element={<GradeAssignments />} />
          </Routes>
        </div>
      </TeacherProvider>
    </div>
  );
}
