import { useLocation } from "react-router-dom";
import CreateQuestion from "../Components/Questions";
import { FormDataType, quesBoxType } from "../helper";
import { FormEvent, useEffect, useState } from "react";
import { db } from "../firebase";
import { setDoc, doc } from "firebase/firestore/lite";
import { v4 } from "uuid";
import RightSideBar from "../Components/RightSideBar";

export default function ViewAssignment() {
  const location = useLocation();
  const [formState, setFormState] = useState<FormDataType>();
  const assignment = location.state?.assignment;
  console.log("this is as ", assignment);
  const submittedData = location.state?.submittedData;
  const [inputDisable, setInputDisable] = useState(false);
  const [marksState, setMarksState] = useState({
    totalMarks: "-1",
    scoredMarks: "-1",
    feedBack: "",
  });
  const addMarks = async (e: FormEvent) => {
    e.preventDefault();
    if (!submittedData) return;
    submittedData.students[0].totalMarks = marksState.totalMarks;
    submittedData.students[0].scored = marksState.scoredMarks;
    submittedData.students[0].feedBack = marksState.feedBack;
    const docRef = doc(db, "Teacher", "Submission");
    await setDoc(docRef, { ...submittedData });
    confirm("Added marks successfully !");
  };
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (inputDisable) {
      alert("Already Submitted");
      return;
    }
    const docRef = doc(db, "Teacher", "Submission");
    await setDoc(docRef, {
      students: [
        {
          name: "Student 1",
          id: v4(),
          assignmentTitle: assignment.title,
          assignmentId: assignment.id,
          answers: { ...formState },
          totalMarks: -1,
          scored: -1,
          feedBack: "",
        },
      ],
    });
    confirm("Your assignment is submitted");
  };

  useEffect(() => {
    if (submittedData?.students.length < 1) return;
    const { answers, totalMarks, scored, feedBack } = submittedData.students[0];

    if (answers) {
      setInputDisable(true);
      setFormState({ ...answers });
      console.log(totalMarks, scored);
      setMarksState({ totalMarks, scoredMarks: scored, feedBack });
    }
  }, []);
  return (
    <div className="flex ">
      <div className="overflow-y-auto h-screen">
        <div className=" relative w-[794px] min-h-[1123px] bg-white shadow-lg border border-gray-300 p-8 mx-auto my-4  ">
          <form onSubmit={onSubmit}>
            <h1 className=" text-3xl mb-4 text-gray-800">{assignment.title}</h1>
            {assignment.questions.map((quesBox: quesBoxType, i: number) => (
              <CreateQuestion
                name={"question" + i}
                formState={formState}
                setFormState={setFormState}
                key={quesBox.id}
                quesBox={quesBox}
                disable={inputDisable}
              />
            ))}
            <input
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              value={inputDisable ? "Submitted" : "Submit"}
            />
          </form>
        </div>
      </div>

      <RightSideBar
        addMarks={addMarks}
        marksState={marksState}
        setMarksState={setMarksState}
      />
    </div>
  );
}
