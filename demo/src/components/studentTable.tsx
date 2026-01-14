import type{ Student } from "../types/student";

interface Props {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
}

export default function StudentTable({students,onEdit,onDelete,}: Props) {
  return (
    <table className="w-full border mt-10">
      <thead >
        <tr>
          <th className="border p-2">ID</th>
          <th className="border p-2">Student Name</th>
          <th className="border p-2">Department</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.length === 0 ? (
          <tr>
            <td colSpan={4} className="text-center p-4">
              No students found
            </td>
          </tr>
        ) : (
          students.map((student) => (
            <tr key={student.id}>
              <td className="border p-2">{student.id}</td>
              <td className="border p-2">{student.name}</td>
              <td className="border p-2">{student.dept}</td>
              <td className="border p-2 flex gap-2 justify-center">
                <button
                  onClick={() => onEdit(student)}
                  className="bg-yellow-600 text-white px-2 py-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(student.id)}
                  className="bg-red-600 text-white px-2 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
