import { useContext, useState } from "react";
import { quesBoxType, questionBankType } from "../helper";
import { TeacherOperations } from "../Context";
const QuestionBankModal = ({
  assignmentQuestions,
  onClose,
  onSubmit,
}: {
  assignmentQuestions: quesBoxType[];
  onClose: () => void;
  onSubmit: (quesarray: quesBoxType[]) => void;
}) => {
  const data = useContext(TeacherOperations)?.questionBank as questionBankType;
  const [questionBank, setQuestionBank] = useState<quesBoxType[]>(data.essays);
  const [selectedQuestions, setSelectedQuestions] = useState<quesBoxType[]>([]);
  const [questionType, setQuestionType] = useState("essays");

  const handleSelect = (question: quesBoxType) => {
    setSelectedQuestions((prevSelected) => {
      if (prevSelected.includes(question)) {
        return prevSelected.filter((q) => q.id !== question.id);
      } else {
        return [...prevSelected, question];
      }
    });
  };

  const handleSubmit = () => {
    console.log(selectedQuestions);
    const arr = assignmentQuestions.concat(selectedQuestions);
    onSubmit(arr);
    onClose();
  };
  type categoryType = keyof typeof data;
  const handleQuestionCategory = (category: categoryType) => {
    setQuestionBank(data[category]);
    setQuestionType(category);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">
          Importing form question bank
        </h2>
        <p className="mb-4">Select the checkbox to add questions</p>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Select Question Type</label>
          <select
            className="block w-full p-2 border border-gray-300 rounded-md"
            value={questionType}
            onChange={(e) =>
              handleQuestionCategory(e.target.value as categoryType)
            }
          >
            <option value="quizzes">Quizzes</option>
            <option value="essays">Essays</option>
            <option value="surveys">Surveys</option>
          </select>
        </div>

        {/* Question List */}
        <ul className="mb-4 h-[200px] overflow-y-auto">
          {questionBank.map((question: quesBoxType) => (
            <li key={question.id} className=" flex  mb-2">
              <input
                type="checkbox"
                className="mt-1 mr-2"
                checked={selectedQuestions.includes(question)}
                onChange={() => handleSelect(question)}
              />
              <span className="pr-2 flex-1">{question.question}</span>
              {question.type == "mcq" && (
                <span className="  text-sm place-self-start rounded-md px-2 bg-blue-800 text-white">
                  {question.type}
                </span>
              )}
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Add to Assignment
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionBankModal;
