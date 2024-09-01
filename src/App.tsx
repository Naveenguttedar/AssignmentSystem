import { Route, Routes } from "react-router-dom";
import UserLayout from "./Components/Userlayout";
import TeacherPage from "./Pages/Teacher";
import StudentPage from "./Pages/Student";
import { UserProvider } from "./Context";
export default function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<UserLayout />} />
        <Route path="/teacher/*" element={<TeacherPage />} />
        <Route path="/student/*" element={<StudentPage />} />
      </Routes>
    </UserProvider>
  );
}
