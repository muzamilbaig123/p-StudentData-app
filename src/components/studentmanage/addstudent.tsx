import { realDb } from "@/firebase/firebaseconfig";
import { ref, set } from "firebase/database";
import { FormEvent, useState } from "react"



export default function AddStudent () {
    const [studentName, setStudentName] = useState("");
    const [phoneNum, setPhoneNum] = useState<number | string>("");
    const [rollNum, setRollNum] = useState<number | string>("");
    const [submitStu, setSubmitStu] = useState("")


    const studentDataHandler = (e:FormEvent) => {
        e.preventDefault();
        const addStuDataFirebase = () => {
            try{
                const nodeName = ref(realDb, "studentData/" + rollNum);
                set(nodeName, {
                    studName: studentName,
                    phoNum: phoneNum,
                    rollNum: rollNum
                });
                setSubmitStu("Student Has Been Added!");
                setStudentName("");
                setPhoneNum("");
                setRollNum("");
            }catch(e){
                console.log("Add Time Error", e)
            }
        };
        addStuDataFirebase();
    }
    return (
        <>
            <form onSubmit={studentDataHandler} style={{width: "60%", border: "2px solid black", textAlign: "center", padding: "90px 60px", margin: "0 auto", alignContent: "center", borderRadius: "8px",
                boxShadow: "2px 2px 10px 2px #222"
            }}>
                <h1 className="text-center text-3xl underline font-serif text-blue-900 mb-4 ">Enroll student</h1>
                <label style={{color: "#222", fontWeight: "normal", display: "block", margin: "10px", cursor: "pointer"}}>
                    Student Name
                    <input type="text"
                    style={{border: "1px solid gray", borderRadius: "4px", padding: "4px"}}
                    value={studentName}
                    placeholder="Student Name"
                    onChange={(e) => {setStudentName(e.target.value)}}
                    />
                </label>
                <label style={{color: "#222", fontWeight: "normal", display: "block", margin: "10px",cursor: "pointer"}}>
                    Phone Number
                    <input type="number"
                    style={{border: "1px solid gray", borderRadius: "4px", padding: "4px"}}
                    value={phoneNum}
                    placeholder="Phone Number"
                    onChange={(e) => {setPhoneNum(e.target.value)}}
                    />
                </label>
                <label style={{color: "#222", fontWeight: "normal", display: "block", margin: "10px",cursor: "pointer"}}>
                    Roll Number
                    <input type="number"
                    style={{border: "1px solid gray", borderRadius: "4px", padding: "4px"}}
                    value={rollNum}
                    placeholder="Roll Number"
                    onChange={(e) => {setRollNum(e.target.value)}}
                    />
                </label>
                <button type="submit" className="bg-blue-900 text-white pt-1 pb-1 pl-4 pr-4 rounded hover:bg-blue-600 mt-4">Submit</button>
                <div className="relative top-4 ">
                {submitStu && submitStu}
                </div>
            </form>
        </>
    )
}