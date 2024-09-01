import { ChangeEvent, useContext, useEffect, useState } from "react";
import { TeacherOperations } from "../Context";
import { assignmentType } from "../helper";

// .previousAssignments as assignmentType[];
const MyAssignments = () => {
  const data = useContext(TeacherOperations)?.assignments;
  const questions = data?.previousAssignments || [];
  const [assignments, setAssignments] = useState<assignmentType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    if (questions) setAssignments(questions);
  });
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAssignments;
