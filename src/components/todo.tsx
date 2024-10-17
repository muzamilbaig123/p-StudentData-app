"use client";

import {fireStore}  from "@/firebase/firebaseconfig";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { todo } from "node:test";
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
    const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);

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
        async function fetchingTodos() {
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
            <main className="flex flex-1 items-center justify-center flex-col md:flex-row min-h-screen">
            {/* left section */}
                <section className="flex flex-1 md:flex-col items-center md:justify-start mx-auto  ">
                    {/* logo */}
                    <div className="absolute top-4 left-4">
                    <Image 
                    src="/images/logo.jpg"
                    alt="muzamil logo"
                    width={40}
                    height={100}
                    style={{borderRadius: "46px"}}
                    />
                    </div>
                    {/* Todo Form */}
                    <div className="p-6 md:p-12 mt-10 rounded-lg shadow-xl w-full max-w-lg bg-white">
                        <h2 className="text-center text-2xl font-bold leading-9 text-gray-900"></h2>
                        {isUpdateMode ? "Update Your Todo " :  " Create A Todo"}
                        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-600">Title</label>
                                <div className="mt-2">
                                    <input type="text"
                                    id="title"
                                    name="title"
                                    autoComplete="off"
                                    required
                                    value={title}
                                    onChange={((e) => {setTitle(e.target.value)})}
                                    className="w-full rounded border py-2 pl-2 text-gray-900 shadow ring"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="details" className="block text-sm font-medium leading-6 text-gray-600">Details</label>
                                <div className="mt-2">
                                    <textarea 
                                    id="details"
                                    name="details"
                                    rows={4}
                                    autoComplete="off"
                                    required
                                    value={details}
                                    onChange={((e) => {setDetails(e.target.value)})}
                                    className="w-full rounded border py-2 pl-2 text-gray-900 shadow ring"
                                    ></textarea>

                                </div>
                            </div>


                            <div>
                                <label htmlFor="dueDate" className="block text-sm font-medium leading-6 text-gray-600">dueDate</label>
                                <div className="mt-2">
                                    <input type="date"
                                    id="dueDate"
                                    name="dueDate"
                                    autoComplete="off"
                                    required
                                    value={dueDate}
                                    onChange={((e) => {setDueDate(e.target.value)})}
                                    className="w-full rounded border py-2 pl-2 text-gray-900 shadow ring"
                                    />
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-800">
                                    {isUpdateMode ? "Update Todo" : "Create Todo"}
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
                {/* right section */}
                <section className="p-6 md:p-12 mt-10 rounded-lg shadow-xl w-full max-w-lg bg-white ">
                    <h2 className="text-center text-2xl font-bold leading-9 text-gray-900">Todo List</h2>

                    <div className="mt-6 space-y-6 ">
                        {
                            todos.map((todo) => (
                                <div key={todo.id} className="border p-4 rounded-md shadow-md ">
                                    <h3 className="text-lg font-semibold text-gray-900 break-words ">{todo.title}</h3>
                                        <p className="text-sm text-gray-500 ">
                                            Due Date: {todo.dueDate}
                                        </p>
                                        <p className="text-gray-700 multiline break-words ">
                                            {todo.details}
                                        </p>
                                        <div className="mt-4 space-x-6 ">
                                            <button type="button" className="text-sm font-semibold text-white bg-blue-500 hover:bg-blue-700 rounded" onClick={() => handleupdateClick(todo)}>   
                                            Update
                                            </button>
                                            <button type="button" onClick={async () => {
                                                const deleteTodoId = await deleteTodos(todo.id);
                                                if(deleteTodoId){
                                                    const updateTodos = todos.filter((t) => { t.id === deleteTodoId });
                                                    setTodos(updateTodos);
                                                }
                                            }}
                                            className="px-3 py-1"
                                            >

                                            </button>
                                        </div>
                                </div>
                            ))
                        }
                    </div>


                </section>

            </main>
        </>
    );
}