"use client"

import {fireStore}  from "@/firebase/firebaseconfig";
import { addDoc, collection, deleteDoc, doc, getDoc, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react"

type AddTodoFirebaseType = {
    title: string,
    details: string,
    dueDate: string
}
async function addTodoFirebase ({title, details, dueDate}:AddTodoFirebaseType) {
    try{
        const coll = collection(fireStore, "Todos");
        const docRef = await addDoc(coll, {
        title: title,
        details: details,
        dueDate: dueDate,
        // createdAt: serverTimestamp()
    })
    console.log("Todo Has Been Added =>", docRef.id)
}
catch(e){
    console.log("Please Solve This Error " + e);
}

}
addTodoFirebase

export default function TodoApp () {
    const [todo, setTodo] = useState("");

    return (
        <>
              <h1>Todo</h1>
        </>
    )
}