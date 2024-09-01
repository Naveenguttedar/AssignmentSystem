import { ChangeEvent, useContext } from "react";
import { quesBoxType, FormDataType } from "../helper";
import BtnDelete from "./Btn-delete";
import { UserContext } from "../Context";

function CreteMcq({
  name,
  formState = {},
  handleChange,
  quesBox,
  deleteQuestion,
}: {
  quesBox: quesBoxType;
  deleteQuestion?: (id: string) => void;
  name: string;
  formState?: FormDataType;
  handleChange: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
}) {
  const data = useContext(UserContext);
  const UserRole = data?.userRole;
  if (quesBox.options == undefined) return;
  return (
    <div className="mb-5 group relative">
      {UserRole == "TEACHER" && (
        <BtnDelete quesId={quesBox.id} deleteQuestion={deleteQuestion} />
      )}
      <label
        htmlFor="large-input"
        className="block mb-2 text-lg text-gray-700 "
      >
        {quesBox.question}
      </label>
      <div className="flex flex-wrap  w-full">
        <div className="w-1/2 mb-2">
          <input
            type="radio"
            required
            name={name}
            value={quesBox.options[0]}
            checked={formState?.[name] == quesBox.options[0] || false}
            onChange={handleChange}
            className="w-[1.2rem] h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
          />
          <span className="pl-2">{quesBox.options[0]}</span>
        </div>
        <div className="w-1/2">
          <input
            type="radio"
            name={name}
            value={quesBox.options[1]}
            checked={formState?.[name] == quesBox.options[1] || false}
            className="w-[1.2rem] h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
            onChange={handleChange}
          />
          <span className="pl-2">{quesBox.options[1]}</span>
        </div>
        <div className=" w-1/2 ">
          <input
            type="radio"
            name={name}
            value={quesBox.options[2]}
            checked={formState?.[name] == quesBox.options[2] || false}
            className="w-[1.2rem] h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
            onChange={handleChange}
          />
          <span className="pl-2">{quesBox.options[2]}</span>
        </div>
        <div className="w-1/2">
          <input
            type="radio"
            name={name}
            value={quesBox.options[3]}
            checked={formState?.[name] == quesBox.options[3] || false}
            className="w-[1.2rem] h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
            onChange={handleChange}
          />
          <span className="pl-2">{quesBox.options[3]}</span>
        </div>
      </div>
    </div>
  );
}
export default function CreateQuestion({
  quesBox,
  deleteQuestion,
  name,
  formState = {},
  setFormState,
  disable,
}: {
  quesBox: quesBoxType;
  deleteQuestion?: (id: string | number) => void;
  name: string;
  formState?: FormDataType;
  setFormState?: (form: FormDataType) => void;
  disable?: boolean;
}) {
  const data = useContext(UserContext);
  const UserRole = data?.userRole;
  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    if (setFormState) {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };
  if (quesBox.type == "mcq") {
    return (
      <CreteMcq
        name={name}
        formState={formState}
        handleChange={handleChange}
        quesBox={quesBox}
        deleteQuestion={deleteQuestion}
      />
    );
  }
  return (
    <div className="mb-5 relative group ">
      {UserRole == "TEACHER" && (
        <BtnDelete quesId={quesBox.id} deleteQuestion={deleteQuestion} />
      )}
      <label
        htmlFor="large-input"
        className="block mb-2 text-lg text-gray-700 "
      >
        {quesBox.question}
      </label>
      <textarea
        id="message"
        spellCheck={false}
        disabled={disable}
        rows={4}
        name={name}
        value={formState?.[name] || ""}
        onChange={handleChange}
        required
        className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
        placeholder="Answer goes here..."
      ></textarea>
    </div>
  );
}
