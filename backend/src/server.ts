import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { insertStudent, getStudents, updateStudent, deleteStudent } from "./models/studentModel";

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());

type Student = {
  id: number;
  name: string;
  dept: string;
};

let studentInfo: Student[] = [];
//i think here

app.get("/student", async (req: Request, res: Response) => {
    const student =  await getStudents()
    res.status(200).json(student);
});

app.put("/student/:id" , async (req: Request, res: Response) => {
const id = Number(req.params.id);
const {name,dept} = req.body;

// const student = studentInfo.find((student) => student.id === id);
// if(!student)
// {
//     return res.status(404).json({message : "Student not found"});
// }

// student.name = name;
// student.dept = dept;

// if (name != undefined)
// {
//     student.name = name;
// }
// if (dept != undefined)
// {
//     student.dept = dept;
// }
 const student = await updateStudent(id,name, dept);
res.status(200).json({message : "Student info updated successfully", student : student});
});


app.post("/student" ,  async (req: Request, res: Response) => {
    const {name,dept} = req.body;

    if(!name || !dept)
    {
        return res.status(400).json({message : "name and dept are mandatory"});
    }
  
let newId = 1;
if(studentInfo.length > 0)
{
    newId = studentInfo[studentInfo.length - 1].id + 1;
}
const newStudent = { id: newId, name, dept};
studentInfo.push(newStudent);
const student = await insertStudent(name, dept);

res.status(201).json({message : "student created successsfully", student : student});

});

app.delete("/student/:id" , async (req: Request, res: Response) => {
    const id = Number(req.params.id);
// const student = studentInfo.find((student) => student.id === id);
// if(!student)
// {
//     return res.status(404).json({message : "Student not found"});
// }

// studentInfo = studentInfo.filter((student) => student.id !== id);
const students = await deleteStudent(id);
res.status(201).json({message : "student deleted successfully"});
});





app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});



