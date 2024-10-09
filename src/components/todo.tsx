"use client"

import {fireStore}  from "@/firebase/firebaseconfig";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react"

type AddTodoFirebaseType = {
    id? : string,
    title: string,
    details: string,
    dueDate: string,
}
async function addTodoFirebase ({title, details, dueDate}:AddTodoFirebaseType) {
    try{
        const coll = collection(fireStore, "Todos");
        const docRef = await addDoc(coll, {
        title: title,
        details: details,
        dueDate: dueDate,
        createdAt: serverTimestamp()
    })
    console.log("Todo Has Been Added Yes. =>", docRef.id)
    return true;
}
catch(e){
    console.error("Please Solve This Error Plz Muzmail Baig " + e);
    return false;
}

};

// fetch data in firestore database

async function fetchTodos () {
    const todoColl = collection(fireStore, "Todos");
    const querSnanShot = await getDocs(query(todoColl, orderBy("createdAt", "desc")));
    const todosArr: AddTodoFirebaseType[] = [];
    querSnanShot.forEach((doc)=>{
        const todoData = doc.data() as AddTodoFirebaseType;
        todosArr.push({id: doc.id, ...todoData});
    });
    return todosArr;
}

// delete todos

async function deleteTodos (todoId:string) {
    try{
         console.log("Attemting to delete todo with id => ", todoId)
         await deleteDoc(doc(fireStore, "Todos", todoId))

    }catch(e){
        
    }
}


export default function TodoApp () {
    const [todo, setTodo] = useState("");

    return (
        <>
              <h1 className="text-center text-3xl pt-10 pb-10 font-bold underline">Todos</h1>
        </>
    )
}