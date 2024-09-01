import { FormEvent, useContext } from "react";
import InputField from "./InputField";
import { UserContext } from "../Context";

export default function RightSideBar({
  addMarks,
  marksState,
  setMarksState,
}: {
  addMarks: (e: FormEvent) => void;
  marksState: { totalMarks: string; scoredMarks: string; feedBack: string };
  setMarksState: (val: {
    totalMarks: string;
    scoredMarks: string;
    feedBack: string;
  }) => void;
}) {
  const isUserTeacher = useContext(UserContext)?.userRole === "TEACHER";
  if (parseInt(marksState.scoredMarks) < 0 && !isUserTeacher) return;
  return (
    <div className="w-[20rem] p-4  text-gray-700">
      <form onSubmit={addMarks}>
        <label className="block mb-2 text-lg">
          {isUserTeacher ? "Add Marks" : "Your marks"}
        </label>
        <div className="flex justify-between items-center">
          <span className=" text-sm">Scored marks</span>
          <InputField
            type="number"
            placeholder="0"
            className="w-[80px]"
            onchange={(e) =>
              setMarksState({
                ...marksState,
                scoredMarks: e.target.value,
              })
            }
            disable={!isUserTeacher}
            value={marksState.scoredMarks}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className=" text-sm">Total marks</span>
          <InputField
            type="number"
            placeholder="0"
            className="w-[80px]"
            onchange={(e) =>
              setMarksState({ ...marksState, totalMarks: e.target.value })
            }
            disable={!isUserTeacher}
            value={marksState.totalMarks}
          />
        </div>
        <label className="block mb-2 text-lg text-gray-700">
          {isUserTeacher ? "Add feedback" : " feedback"}
        </label>
        <textarea
          spellCheck={false}
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          value={marksState.feedBack}
          disabled={!isUserTeacher}
          onChange={(e) =>
            setMarksState({ ...marksState, feedBack: e.target.value })
          }
          placeholder="Add feedback to student.."
        ></textarea>
        {isUserTeacher && (
          <input
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-800  font-medium rounded-sm text-sm px-5 py-2.5 mt-2 mb-2  w-full cursor-pointer "
            value="Approve"
          />
        )}
      </form>
    </div>
  );
}
