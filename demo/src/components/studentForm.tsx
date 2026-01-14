import { useEffect, useState } from "react";
import type{Student} from "../types/student";

interface Props {
  onAdd: (student: Student) => void;
  onUpdate: (student: Student) => void;
  editingStudent: Student | null;
}

export default function StudentForm({onAdd,onUpdate,editingStudent,}: Props) {
  const [name, setName] = useState("");
  const [dept, setDepartment] = useState("");

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setDepartment(editingStudent.dept);
    }
  }, [editingStudent]);

  const handleSubmit = () => {
    if (!name || !dept) return;

    if (editingStudent) {
      onUpdate({ ...editingStudent, name, dept });
    } else {
      onAdd({
        id: Date.now(),
        name,
        dept,
      });
    }

    setName("");
    setDepartment("");
  };

  return (
    <div className=" bg-blue-100 mb-4">
      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 mb-2"
      >
        {editingStudent ? "Update Student" : "Add New Student"}
      </button>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Student Name"
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Department"
          className="border p-5 w-full"
          value={dept}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </div>
    </div>
  );
}
