import { FormEvent, useContext, useState } from "react";
import { quesBoxType, questionBankType } from "../helper";
import InputField from "../Components/InputField";
import { v4 } from "uuid";
import { TeacherOperations } from "../Context";
export default function QuestionBank() {
  const data = useContext(TeacherOperations)?.questionBank as questionBankType;
  const [_questionBank, setQuestionBank] = useState<questionBankType>(data);
  const [newQuestion, setNewQuestion] = useState<quesBoxType>({
    id: "",
    type: "normal",
    question: "",
    options: [],
  });
  type categoryType = keyof typeof _questionBank;
  const [questionCategory, setQuestionCategory] =
    useState<categoryType>("essays");
  const handleAddQuestion = (category: categoryType, question: quesBoxType) => {
    setQuestionBank((prev: questionBankType) => ({
      ...prev,
      [category]: [...prev[category], question],
    }));
  };
  const addOptionAt = (index: number, value: string) => {
    if (newQuestion.options == undefined) return null;
    newQuestion.options[index] = value;
    setNewQuestion({
      ...newQuestion,
      options: [...newQuestion.options.slice()],
    });
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    newQuestion.id = v4();
    console.log(newQuestion);
    handleAddQuestion(questionCategory, newQuestion);
    setNewQuestion({
      id: "",
      type: "normal",
      question: "",
      options: [],
    });
  };
  const renderQuestions = (category: categoryType) => {
    return _questionBank[category].map((question: quesBoxType) => (
      <div
        key={question.id}
        className="flex justify-between items-center bg-white px-4 pb-2 mb-4 "
      >
        <span className="text-lg">{question.question}</span>
        {question.type == "mcq" && (
          <span className=" text-sm rounded-md px-2 bg-blue-800 text-white">
            {question.type}
          </span>
        )}
      </div>
    ));
  };

  return (
    <div className=" flex">
      <div className="min-w-[700px] overflow-y-auto px-8 h-screen container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-12 text-blue-800">
          Question Bank
        </h1>

        {/* Quizzes Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-blue-700 pb-2 border-b-2 border-gray-100">
            Quizzes
          </h2>
          <div className=" bg-white overflow-y-auto max-h-[300px] shadow-sm rounded-lg hover:shadow-lg transition-shadow">
            {renderQuestions("quizzes")}
          </div>
        </div>

        {/* Essays Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-blue-700 pb-2 border-gray-100 border-b-2">
            Essays
          </h2>
          <div className=" bg-white overflow-y-auto max-h-[300px] shadow-sm rounded-lg hover:shadow-lg transition-shadow">
            {renderQuestions("essays")}
          </div>
        </div>

        {/* Surveys Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-blue-700 pb-2 border-gray-100 border-b-2">
            Surveys
          </h2>
          <div className=" bg-white overflow-y-auto max-h-[300px] shadow-sm rounded-lg hover:shadow-lg transition-shadow">
            {renderQuestions("surveys")}
          </div>
        </div>
      </div>

      <div className="w-[26rem] py-4 px-6">
        <form className="pt-4" onSubmit={(e) => handleSubmit(e)}>
          <label className="block mb-2 text-lg text-gray-700">
            Add new question
          </label>
          <textarea
            spellCheck={false}
            rows={2}
            className="block p-2.5 w-full text-sm text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            value={newQuestion.question}
            placeholder="Enter the question "
            onChange={(e) =>
              setNewQuestion({
                ...newQuestion,
                question: e.target.value,
              })
            }
            required
          ></textarea>
          <label className="block mb-2 text-lg text-gray-700">
            Select question type
          </label>
          <select
            className="block bg-white w-full p-2 border border-gray-300 rounded-md"
            value={questionCategory}
            required
            onChange={(e) =>
              setQuestionCategory(e.target.value as categoryType)
            }
          >
            <option value="quizzes">Quizzes</option>
            <option value="essays">Essays</option>
            <option value="surveys">Surveys</option>
          </select>
          <div className="py-2">
            <input
              type="radio"
              name={"questionType"}
              checked={newQuestion.type == "normal"}
              value={newQuestion.type}
              onChange={() =>
                setNewQuestion({
                  ...newQuestion,
                  type: "normal",
                })
              }
              className="w-[1.2rem] h-4 mr-2 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="mr-4">normal</span>
            <input
              type="radio"
              name={"questionType"}
              checked={newQuestion.type == "mcq"}
              value={newQuestion.type}
              onChange={() =>
                setNewQuestion({
                  ...newQuestion,
                  type: "mcq",
                })
              }
              className="w-[1.2rem] h-4 mr-2 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <span>mcq</span>
          </div>
          {newQuestion.type == "mcq" && (
            <>
              {[1, 2, 3, 4].map((ele) => (
                <InputField
                  type="text"
                  placeholder={"Option " + ele}
                  onchange={(e) => addOptionAt(ele - 1, e.target.value)}
                />
              ))}
            </>
          )}
          <input
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-sm w-full text-sm px-5 py-2.5 me-2 mb-2 "
            value="Add Question"
          />
        </form>
      </div>
    </div>
  );
}
