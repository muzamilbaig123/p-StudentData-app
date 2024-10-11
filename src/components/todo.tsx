"use client";

import {fireStore}  from "@/firebase/firebaseconfig";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

type AddTodoFirebaseType = {
    id? : string,
    title: string,
    details: string,
    dueDate: string,
};

async function addTodoFirebase ({title, details, dueDate}: AddTodoFirebaseType) {
    try {
        const coll = collection(fireStore, "Todos");
        const docRef = await addDoc(coll, {
            title: title,
            details: details,
            dueDate: dueDate,
            createdAt: serverTimestamp(),
        });
        console.log("Todo Has Been Added Yes. =>", docRef.id);
        return true;
    } catch (e) {
        console.error("Please Solve This Error Plz Muzamil Baig " + e);
        return false;
    }
}

// fetch data in firestore database

async function fetchTodosFirebase() {
    const todoColl = collection(fireStore, "Todos");
    const querSnanShot = await getDocs(query(todoColl, orderBy("createdAt", "desc")));
    const todosArr: AddTodoFirebaseType[] = [];
    querSnanShot.forEach((doc) => {
        const todoData = doc.data() as AddTodoFirebaseType;
        todosArr.push({ id: doc.id, ...todoData });
    });
    return todosArr;
}

// delete todos

async function deleteTodos(todoId: string) {
    try {
        console.log("Attempting to delete todo with id => ", todoId);
        await deleteDoc(doc(fireStore, "Todos", todoId));
        return todoId;
    } catch (e) {
        console.log("Error Deleting todo", e);
        return null;
    }
}

export default function TodoApp() {
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [dueDate, setDueDate] = useState("");

    // state to hold the list of todos
    const [todos, setTodos] = useState<AddTodoFirebaseType[]>([]);

    // state the hold the selected todo for update
    const [selectedTodo, setSelectedTodo] = useState<AddTodoFirebaseType | null>(null);

    // state to track whether the form is in update mode
    const [isUpdateMode, setIsUpdateMode] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (isUpdateMode) {
            if (selectedTodo) {
                try {
                    const updatedTodo = {
                        title,
                        details,
                        dueDate,
                    };
                    const todoRef = doc(fireStore, "Todos", selectedTodo.id!);
                    await updateDoc(todoRef, updatedTodo);

                    // reset the form fields
                    setTitle("");
                    setDetails("");
                    setDueDate("");
                    setSelectedTodo(null);
                    setIsUpdateMode(false);

                    // update successfully
                    alert("Updated Successfully");
                } catch (e) {
                    console.error("Error Updating Todo: ", e);
                }
            }
        } else {
            const added = await addTodoFirebase({ title, details, dueDate });
            if (added) {
                setTitle("");
                setDetails("");
                setDueDate("");

                alert("Todo Added to Firestore successfully");
            }
        }
    };

    // fetch todo from firestore on component mount
    useEffect(() => {
        async function fetchingTodos () {
            const todos = await fetchTodosFirebase();
            setTodos(todos)
        }
        fetchingTodos();
    }, []);

    // function to handle " update button click ";

    const handleupdateClick = (todo:AddTodoFirebaseType) => {
        // set the selected todo's value to the form field 
        setTitle(todo.title || "");
        setDetails(todo.details || "");
        setDueDate(todo.dueDate || "");

        setSelectedTodo(todo);
        setIsUpdateMode(true);
    };

    // fetch todo from firestore on componenet mount
    useEffect(() => {
        async function fetchTodos() {
            const todos = await fetchTodosFirebase();
            setTodos(todos);
        };
        fetchTodos();
    }, [])

    return (
        <>
            <h1 className="text-center text-3xl pt-10 pb-10 font-bold underline">Todos</h1>
            <main>
            {/* left section */}
                <section>
                
                </section>
            </main>
        </>
    );
}
