"use client"
import { realDb } from "@/firebase/firebaseconfig"
import { onValue, ref } from "firebase/database"
import { useState, useEffect } from "react";

// Define the StudentType interface
type StudentType = {
  studName: string,
  phoNum: number,
  rollNum: number
}

export default function StudentList() {
  // Set state to store the array of students
  const [students, setStudents] = useState<StudentType[]>([]);

  // Function to read data from Firebase
  const ReadRealTimeDataBase = () => {
    const studentRef = ref(realDb, "studentData/");
    onValue(studentRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Type cast the data to an array of StudentType
        const studentArr: StudentType[] = Object.values(data);
        setStudents(studentArr);
      }
    });
  };

  // Call ReadRealTimeDataBase only once when the component mounts
  useEffect(() => {
    ReadRealTimeDataBase();
  }, []);

  return (
    <div style={{
      width: "72%",
      border: "2px solid black",
      textAlign: "center",
      padding: "90px 60px",
      margin: "0 auto",
      alignContent: "center",
      borderRadius: "8px",
      boxShadow: "2px 2px 10px 2px #222"
    }}>
      <h1 className="text-center text-3xl underline font-serif text-blue-900 mb-4 ">STUDENTS LISTS</h1>
      <ul>
        {/* Render the list of students */}
        {students.length > 0 ? (
          students.map((student, index) => (
            <li key={index} style={{ padding: "10px", listStyleType: "none" }}>
              <strong className="text-2xl uppercase">{student.studName}</strong> - Roll No: {student.rollNum}, Phone: {student.phoNum}
            </li>
          ))
        ) : (
          <p>No students found.</p>
        )}
      </ul>
    </div>
  );
}
