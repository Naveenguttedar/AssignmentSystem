import { Link } from "react-router-dom";
import { studentJpg, teacherJpg } from "../assets";
import { userRoleType } from "../helper";
import { doc, setDoc } from "firebase/firestore/lite";
import { db } from "../firebase";
import { useContext } from "react";
import { UserContext } from "../Context";
export default function UserLayout() {
  const userOperations = useContext(UserContext);
  async function handleClick(userRole: userRoleType) {
    const docRef = doc(db, "users", "userOne");
    userOperations?.setUserRole(userRole);
    await setDoc(docRef, { userRole: userRole });
  }
  return (
    <div className="h-screen w-full flex ">
      <div className="m-auto flex gap-8    ">
        <div className="w-[200px] p-4 shadow-xl hover:shadow-2xl  gap-4 flex flex-col place-items-center   ">
          <img
            className="w-full h-full rounded-full object-cover aspect-square"
            src={teacherJpg}
          />
          <Link to={"/teacher"}>
            <button
              className="px-4 py-2 w-full rounded-md bg-blue-800 hover:bg-blue-800/90"
              onClick={() => handleClick("TEACHER")}
            >
              Teacher
            </button>
          </Link>
        </div>
        <div className="w-[200px] p-4 shadow-xl hover:shadow-2xl gap-4 flex flex-col place-items-center">
          <img
            className="w-full h-full  rounded-full object-cover aspect-square"
            src={studentJpg}
          />
          <Link to={"/student"}>
            <button
              className="px-4 py-2 w-full rounded-md bg-blue-800 hover:bg-blue-800/90"
              onClick={() => handleClick("STUDENT")}
            >
              Student
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
