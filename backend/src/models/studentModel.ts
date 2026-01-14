
import { SQL, InferModel,and, asc, eq, gte, lt } from "drizzle-orm";
import { studentinfo } from "../db/schema";
import { db } from "../db";

export async function getStudents(){
    return db 
    .select()
    .from(studentinfo);

}


export async function getStudentById(id : number) {
    const rows = await db
    .select()
    .from(studentinfo)
    .where(eq(studentinfo.id,id))
    .limit(1);
    return rows[0];
}

export async function getStudentByDept(dept : string ) {
    const rows = await db 
    .select()
    .from(studentinfo)
    .where(eq(studentinfo.dept,dept))
    return rows ;

}

export async function insertStudent(name : string, dept : string) {
    const rows = await db 
    .insert(studentinfo)
    .values({ name : name.trim(), dept : dept.trim()})
    .returning();
    return rows[0];
    
}

export async function updateStudent(id : number, name: string, dept: string) {
    const rows = await db
        .update(studentinfo)
        .set({
            name: name.trim(),
            dept: dept.trim(),
        })
        .where(eq(studentinfo.id, id))
        .returning();

    return rows[0];
}


export async function deleteStudent(id : number) {
    const rows = await db
    .delete(studentinfo)
    .where(eq(studentinfo.id, id)). returning();
    return rows[0];

    
}