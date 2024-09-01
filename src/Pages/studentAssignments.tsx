import { ChangeEvent, useContext, useEffect, useState } from "react";
import { sumbitAssignmentType } from "../helper";
import { StudentOperations } from "../Context";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore/lite";
import { db } from "../firebase";

export default function StudentAssignments() {
  const navigate = useNavigate();
  const data = useContext(StudentOperations)?.Assignments;
  const assignments = data?.previousAssignments || [];
  console.log(assignments);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
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
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">My Assignments</h1>
      <div className="mb-4">
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Search assignments"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssignments.map((assignment) => (
          <div
            key={assignment.id}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <h2 className="text-lg font-semibold mb-2">{assignment.title}</h2>
            <button
              className="bg-blue-500 text-sm text-white px-4 py-2 rounded-lg mt-2"
              onClick={() => {
                navigate("/student/viewAssignment", {
                  state: { assignment, submittedData },
                });
              }}
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
