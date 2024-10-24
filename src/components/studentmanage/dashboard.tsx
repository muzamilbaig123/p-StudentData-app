"use client"

import StudentList from "./studentlist"
import AddStudent from "./addstudent"
import { useState } from "react"

export default function Dashboard() {
    const [acticeComponent, setActiceComponent] = useState<string | null>(null);
    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                <div style={{ height: "100vh", backgroundColor: "blue", alignContent: "center", width: "20%", textAlign: "center" }}>
                    <button onClick={() => setActiceComponent("StudentList")} style={{ border: "2px solid white", color: "white",  margin: "8px", padding: "4px 8px", borderRadius: "8px"}}>Student List</button>
                    <button onClick={() => setActiceComponent("AddStudent")} style={{ border: "2px solid white", color: "white", margin: "8px", padding: "4px 8px", borderRadius: "8px" }}>Add student</button>
            </div>
            <div style={{ height: "100vh", backgroundColor: "lightblue", width: "100%", alignContent: "center", padding: "10px"}}>
                    {acticeComponent === "StudentList" && <StudentList />}
                    {acticeComponent === "AddStudent" && <AddStudent />}
            </div>

            </div>
        </>
    )
}