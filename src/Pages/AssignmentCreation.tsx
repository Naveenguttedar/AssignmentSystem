import { FormEvent, useContext, useState } from "react";
import CreateQuestion from "../Components/Questions";
import { quesBoxType } from "../helper";
import { v4 as uqid, v4 } from "uuid";
import QuestionBankModal from "../Components/QuestionBankModel";
import InputField from "../Components/InputField";
import { TeacherOperations } from "../Context";

export default function AssignmentCreation() {
  const [showModel, setShowModel] = useState<boolean>(false);
  const [questions, setQuestions] = useState<quesBoxType[]>([]);
  const publishAssignment = useContext(TeacherOperations)?.publishAssignment;
  const handlePublish = () => {
    if (title == "") {
      alert("Add Title");
      return;
    }
    if (questions.length == 0) {
      alert("Add questions");
      return;
    }
    if (publishAssignment)
      publishAssignment({
        id: v4(),
        title: title,
        questions: questions,
      });
    confirm("Your assignment is published ");
  };
  const [title, setTitle] = useState("");
  const [newQuestion, setNewQuestion] = useState<quesBoxType>({
    id: "",
    type: "normal",
    question: "",
    options: [],
  });
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    newQuestion.id = uqid();
    console.log(newQuestion.id);
    console.log(newQuestion);
    questions.push(newQuestion);
    setQuestions(questions.slice());
    setNewQuestion({
      ...newQuestion,
      type: "normal",
      question: "",
      options: [],
    });
  };
  const handleDeleteQ = (quesId: string | number) => {
    setQuestions(questions.filter((ques) => ques.id != quesId));
    console.log(quesId);
  };
  const addOptionAt = (index: number, value: string) => {
    if (newQuestion.options == undefined) return null;
    newQuestion.options[index] = value;
    setNewQuestion({
      ...newQuestion,
      options: [...newQuestion.options.slice()],
    });
  };
  return (
    <div className="flex h-screen">
      <div className="overflow-y-auto">
        <div className=" relative w-[794px] min-h-[1123px] bg-white shadow-lg border border-gray-300 p-8 mx-auto my-4  ">
          <form>
            <h1 className=" text-3xl mb-4 text-gray-800"> {title}</h1>
            {questions.map((quesBox, i) => (
              <CreateQuestion
                name={"question" + i}
                key={quesBox.id}
                deleteQuestion={handleDeleteQ}
                quesBox={quesBox}
              />
            ))}
          </form>
        </div>
      </div>
      <div className="max-w-[20rem] p-4 ">
        <div>
          <label className="block mb-2 text-lg text-gray-700">
            Give a name to your assingment
          </label>
          <InputField
            type="text"
            placeholder="Add title..."
            onchange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
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
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 w-full cursor-pointer focus:outline-none dark:focus:ring-blue-800"
            value="Add Question"
          />
        </form>

        <label className="block mt-4 mb-2 text-lg text-gray-700">
          Import from question bank
        </label>
        <button
          onClick={() => setShowModel(true)}
          className="text-white bg-green-500 w-full hover:bg-green-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2 "
        >
          Import
        </button>
        <label className="block  mb-2 text-lg text-gray-700">
          Publish the assignment
        </label>
        <button
          className="text-white bg-red-500 w-full hover:bg-red-600  font-medium rounded-sm text-sm px-5 py-2.5  mb-2 "
          onClick={handlePublish}
        >
          Publish
        </button>
      </div>
      {showModel && (
        <div className="bg-black bg-opacity-30 w-full h-screen absolute">
          <QuestionBankModal
            assignmentQuestions={questions}
            onClose={() => setShowModel(false)}
            onSubmit={setQuestions}
          />
        </div>
      )}
    </div>
  );
}
