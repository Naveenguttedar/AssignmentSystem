import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore/lite";
import { createContext, ReactNode, useEffect, useState } from "react";
import { db } from "./firebase";
import {
  assignmentsType,
  assignmentType,
  questionBankType,
  userRoleType,
} from "./helper";

async function fetchDoc(document: string) {
  try {
    const docRef = doc(db, "Teacher", document);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching document:", error);
  }
}

async function fetchUser() {
  const docRef = doc(db, "users", "userOne");
  const docSnap = await getDoc(docRef);
  const userRole = docSnap.data()?.userRole as userRoleType;
  return userRole;
}

interface UserContextType {
  userRole: userRoleType;
  setUserRole: (val: userRoleType) => void;
}

interface TeacherOperationsContextType {
  questionBank: questionBankType | null;
  assignments: assignmentsType | null;
  publishAssignment: (assignment: assignmentType) => void;
}

interface StudentOperationsContextType {
  Assignments: assignmentsType | null;
}

export const TeacherOperations =
  createContext<TeacherOperationsContextType | null>(null);
export const StudentOperations =
  createContext<StudentOperationsContextType | null>(null);
export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<userRoleType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const role = await fetchUser();
      setUserRole(role);
    };
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const TeacherProvider = ({ children }: { children: ReactNode }) => {
  const [questionBank, setQuestionBank] = useState<questionBankType | null>(
    null,
  );
  const [assignments, setAssignments] = useState<assignmentsType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const qb = (await fetchDoc("QuestionBank")) as questionBankType;
      const assignments = (await fetchDoc("Assignments")) as assignmentsType;
      setQuestionBank(qb);
      setAssignments(assignments);
    };
    fetchData();
  }, []);

  const publishAssignment = async (assignment: assignmentType) => {
    const assignmentDocRef = doc(db, "Teacher", "Assignments");
    await updateDoc(assignmentDocRef, {
      previousAssignments: arrayUnion(assignment),
    });
    const updatedAssignments = (await fetchDoc(
      "Assignments",
    )) as assignmentsType;
    setAssignments(updatedAssignments);
  };

  return (
    <TeacherOperations.Provider
      value={{
        questionBank,
        assignments,
        publishAssignment,
      }}
    >
      {children}
    </TeacherOperations.Provider>
  );
};

export const StudentProvider = ({ children }: { children: ReactNode }) => {
  const [assignments, setAssignments] = useState<assignmentsType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const assignments = (await fetchDoc("Assignments")) as assignmentsType;
      setAssignments(assignments);
    };
    fetchData();
  }, []);

  return (
    <StudentOperations.Provider value={{ Assignments: assignments }}>
      {children}
    </StudentOperations.Provider>
  );
};
