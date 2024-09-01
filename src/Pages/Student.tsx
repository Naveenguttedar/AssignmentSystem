import { Navigate, Route, Routes } from "react-router-dom";
import SideBar from "../Components/SideBar";
import StudentAssignments from "./studentAssignments";
import { StudentProvider } from "../Context";
import ViewAssignment from "./ViewAssignment";

export default function StudentPage() {
  return (
    <div className="flex ">
      <SideBar />
      <StudentProvider>
        <div className="w-full h-full">
          <Routes>
            <Route index element={<Navigate to={"myAssignments"} />} />
            <Route path="myAssignments" element={<StudentAssignments />} />
            <Route path="viewAssignment" element={<ViewAssignment />} />
          </Routes>
        </div>
      </StudentProvider>
    </div>
  );
}
