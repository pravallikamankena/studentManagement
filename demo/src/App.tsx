import { useState } from "react";
import { useEffect } from "react";
import type{ Student } from "./types/student";
import StudentForm from "./components/studentForm";
import StudentTable from "./components/studentTable";
import {getStudents,addStudent,updateStudent,deleteStudent,} from "./api/studentApi";

export default function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchName, setSearchName] = useState("");
  const [searchDept, setSearchDept] = useState("");
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const filteredStudents = students.filter((s) =>
      s.name.toLowerCase().includes(searchName.toLowerCase()) &&
      s.dept.toLowerCase().includes(searchDept.toLowerCase())
  );

  useEffect(() => {
  const fetchStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  fetchStudents();
}, []);


  // const addStudent = (student: Student) => {
  //   setStudents([...students, student]);
  // };

  const handleAdd = async (student: Omit<Student, "id">) => {

    const res = await addStudent(student);
    console.log(res.data);
    setStudents([...students, res.data.student]);
    
  };

  // const updateStudent = (updated: Student) => {
  //   setStudents(
  //     students.map((s) => (s.id === updated.id ? updated : s))
  //   );
  //   setEditingStudent(null);
  // };

   const handleUpdate = async (updated: Student) => {
    const res = await updateStudent(updated);
    setStudents(
      students.map((s) => (s.id === updated.id ? res.data.student : s))
    );
    setEditingStudent(null);
  };

  // const deleteStudent = (id: number) => {
  //   setStudents(students.filter((s) => s.id !== id));
  // };
   const handleDelete = async (id: number) => {
    await deleteStudent(id);
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <div className=" min-h-screen bg-gray-100 p-8">
      
        <h1 className="bg-blue-100 text-2xl ">Student Management System</h1>

        <div className=" bg-blue-100 flex gap-10 ">
          <input
            type="text"
            placeholder="Search by student name"
            className="border p-2 w-full"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by department"
            className="border p-2 w-full"
            value={searchDept}
            onChange={(e) => setSearchDept(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4">
            Search
          </button>
        </div>

        <StudentForm
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          editingStudent={editingStudent}
        />

        <StudentTable
          students={filteredStudents}
          onEdit={setEditingStudent}
          onDelete={handleDelete}
        />
      </div>
    
  );
}

