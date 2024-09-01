import { doc, getDoc } from "firebase/firestore/lite";
import { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { sumbitAssignmentType } from "../helper";
import { TeacherOperations } from "../Context";
import { useNavigate } from "react-router-dom";

export default function GradeAssignments() {
  const navigate = useNavigate();
  const data = useContext(TeacherOperations)?.assignments;
  const assignments = data?.previousAssignments || [];
  const [submittedData, setsubmittedData] =
    useState<sumbitAssignmentType | null>();
  useEffect(() => {
    const fetchSubmissions = async () => {
      const docRef = doc(db, "Teacher", "Submission");
      const docSnap = await getDoc(docRef);
      const data = docSnap.data() as sumbitAssignmentType;
      setsubmittedData(data);
    };
    fetchSubmissions();
  }, []);
  if (!submittedData?.students.length) {
    return (
      <div className="w-full h-screen flex ">
        <div className="m-auto ">
          <h1 className="text-5xl text-gray-300">No Submissions</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">My Assignments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {submittedData.students.map((student, i) => {
          const assignment = assignments.find(
            (assign) => assign.id === submittedData.students[i].assignmentId,
          );
          return (
            <div key={student.id} className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-1">{student.name}</h2>
              <h3 className="text-sm font-semibold mb-2">
                {student.assignmentTitle}
              </h3>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
                onClick={() =>
                  navigate("/student/viewAssignment", {
                    state: { assignment, submittedData },
                  })
                }
              >
                View
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
