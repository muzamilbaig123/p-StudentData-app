// "use client";

// import {fireStore}  from "@/firebase/firebaseconfig";
// import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
// import Image from "next/image";
// import { FormEvent, useEffect, useState } from "react";

// type AddTodoFirebaseType = {
//     id? : string,
//     title: string,
//     details: string,
//     dueDate: string,
// };

// async function addTodoFirebase ({title, details, dueDate}: AddTodoFirebaseType) {
//     try {
//         const coll = collection(fireStore, "Todos");
//         const docRef = await addDoc(coll, {
//             title: title,
//             details: details,
//             dueDate: dueDate,
//             createdAt: serverTimestamp(),
//         });
//         console.log("Todo Has Been Added Yes. =>", docRef.id);
//         return true;
//     } catch (e) {
//         console.error("Please Solve This Error Plz Muzamil Baig " + e);
//         return false;
//     }
// }

// // fetch data in firestore database

// async function fetchTodosFirebase() {
//     const todoColl = collection(fireStore, "Todos");
//     const querSnanShot = await getDocs(query(todoColl, orderBy("createdAt", "desc")));
//     const todosArr: AddTodoFirebaseType[] = [];
//     querSnanShot.forEach((doc) => {
//         const todoData = doc.data() as AddTodoFirebaseType;
//         todosArr.push({ id: doc.id, ...todoData });
//     });
//     return todosArr;
// }

// // delete todos

// async function deleteTodos(todoId: string) {
//     try {
//         console.log("Attempting to delete todo with id => ", todoId);
//         await deleteDoc(doc(fireStore, "Todos", todoId));
//         return todoId;
//     } catch (e) {
//         console.log("Error Deleting todo", e);
//         return null;
//     }
// }

// export default function TodoApp() {
//     const [title, setTitle] = useState("");
//     const [details, setDetails] = useState("");
//     const [dueDate, setDueDate] = useState("");

//     // state to hold the list of todos
//     const [todos, setTodos] = useState<AddTodoFirebaseType[]>([]);

//     // state the hold the selected todo for update
//     const [selectedTodo, setSelectedTodo] = useState<AddTodoFirebaseType | null>(null);

//     // state to track whether the form is in update mode
//     const [isUpdateMode, setIsUpdateMode] = useState(false);

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();

//         if (isUpdateMode) {
//             if (selectedTodo) {
//                 try {
//                     const updatedTodo = {
//                         title,
//                         details,
//                         dueDate,
//                     };
//                     const todoRef = doc(fireStore, "Todos", selectedTodo.id!);
//                     await updateDoc(todoRef, updatedTodo);

//                     // reset the form fields
//                     setTitle("");
//                     setDetails("");
//                     setDueDate("");
//                     setSelectedTodo(null);
//                     setIsUpdateMode(false);

//                     // update successfully
//                     alert("Updated Successfully");
//                 } catch (e) {
//                     console.error("Error Updating Todo: ", e);
//                 }
//             }
//         } else {
//             const added = await addTodoFirebase({ title, details, dueDate });
//             if (added) {
//                 setTitle("");
//                 setDetails("");
//                 setDueDate("");

//                 alert("Todo Added to Firestore successfully");
//             }
//         }
//     };

//     // fetch todo from firestore on component mount
//     useEffect(() => {
//         async function fetchingTodos () {
//             const todos = await fetchTodosFirebase();
//             setTodos(todos)
//         }
//         fetchingTodos();
//     }, []);

//     // function to handle " update button click ";

//     const handleupdateClick = (todo:AddTodoFirebaseType) => {
//         // set the selected todo's value to the form field 
//         setTitle(todo.title || "");
//         setDetails(todo.details || "");
//         setDueDate(todo.dueDate || "");

//         setSelectedTodo(todo);
//         setIsUpdateMode(true);
//     };

//     // fetch todo from firestore on componenet mount
//     useEffect(() => {
//         async function fetchTodos() {
//             const todos = await fetchTodosFirebase();
//             setTodos(todos);
//         };
//         fetchTodos();
//     }, [])

//     return (
//         <>
//             <h1 className="text-center text-3xl pt-10 pb-10 font-bold underline">Todos</h1>
//             <main>
//             {/* left section */}
//                 <section>

//                 </section>
//             </main>
//         </>
//     );
// }






// Start Todo Muzmail
"use client";

import { fireStore } from "@/firebase/firebaseconfig";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { FormEvent, useState, useEffect } from "react";

type todoDataType = {
    id: string;
    todoOwners: string;
    todo: string;
    date: string;
};

export default function MuzamilTodo() {
    const [todo, setTodo] = useState(""); // For adding/updating todo text
    const [storeTodos, setStoreTodos] = useState<todoDataType[]>([]); // For storing todos
    const [isEditing, setIsEditing] = useState<boolean>(false); // To track edit mode
    const [editTodoId, setEditTodoId] = useState<string | null>(null); // To track which todo is being edited

    // Handler to add a todo
    const todoFormHandler = async (e: FormEvent) => {
        e.preventDefault();

        if (isEditing && editTodoId) {
            await updateTodoFirestore(editTodoId, todo);
        } else {
            // Else, add a new todo
            try {
                const folderName = collection(fireStore, "Todos");
                await addDoc(folderName, {
                    todoOwners: "Muzamil Baig",
                    todo: todo,
                    date: new Date().toLocaleString(),
                });
                console.log("Succesfully Added Todo");
            } catch (e) {
                console.error("This is a Firestore Error ===> " + e);
            }
        }

        setTodo(""); // Reset input
        setIsEditing(false); // Exit edit mode
        fetchTodosFirebase(); // Refresh todos
    };

    // Function to fetch todos from Firebase
    const fetchTodosFirebase = async () => {
        try {
            const querySnapShot = await getDocs(collection(fireStore, "Todos"));
            const fetchedTodos = querySnapShot.docs.map((doc) => ({
                id: doc.id,
                todoOwners: doc.data().todoOwners,
                todo: doc.data().todo,
                date: doc.data().date,
            }));

            setStoreTodos(fetchedTodos); // Set todos to state
        } catch (e) {
            console.error("Error fetching todos ===> " + e);
        }
    };

    // Function to delete a todo
    const deleteTodoFirestore = async (id: string) => {
        try {
            const refDoc = doc(fireStore, "Todos", id);
            await deleteDoc(refDoc);
            console.log("Todo Deleted Successfully");
            fetchTodosFirebase(); // Refresh todos after deletion
        } catch (e) {
            console.log("Error Deleting Todo => !", e);
        }
    };

    // Function to update a todo
    const updateTodoFirestore = async (id: string, updatedTodo: string) => {
        try {
            const todoRef = doc(fireStore, "Todos", id);
            await updateDoc(todoRef, {
                todo: updatedTodo,
                date: new Date().toLocaleString(), // Optionally update date
            });
            console.log("Todo Updated Successfully");
            fetchTodosFirebase(); // Refresh todos after updating
        } catch (e) {
            console.error("Error updating todo ===> ", e);
        }
    };

    // Handle the edit button click
    const handleEdit = (id: string, currentTodo: string) => {
        setIsEditing(true); // Enable edit mode
        setEditTodoId(id); // Set the todo being edited
        setTodo(currentTodo); // Set the current todo in input field
    };

    // useEffect to fetch todos when component mounts
    useEffect(() => {
        fetchTodosFirebase(); // This will only run once when the component mounts
    }, []);

    return (
        <>
            <h1 className="text-center font-bold text-2xl pt-10 pb-10">Todo With Muzmail Baig!</h1>

            <form onSubmit={todoFormHandler} className="text-center">
                <input
                    type="text"
                    placeholder="Enter Todo"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    className="w-[40%] p-4 rounded-md bg-black text-white"
                />
                <button
                    type="submit"
                    className="btn-primary bg-black rounded ml-4 mr-4 pt-4 pb-4 pl-8 pr-8 hover:bg-blue-600"
                >
                    {isEditing ? "Save" : "Add"} {/* Change button text based on mode */}
                </button>
            </form>

            <div className="max-w-[60%] ml-auto mr-auto mt-6 border-black border rounded-lg p-10">
                {storeTodos.map((itemTodo, index) => (
                    <ul key={index} className="text-center">
                        <li className="p-4">
                            <strong>{itemTodo.todoOwners}:</strong>{" "}
                            <span className="underline">{itemTodo.todo}</span>
                            <button
                                className="btn-primary bg-black rounded p-1 ml-4 mr-4"
                                onClick={() => handleEdit(itemTodo.id, itemTodo.todo)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn-primary bg-black rounded p-1"
                                onClick={() => deleteTodoFirestore(itemTodo.id)}
                            >
                                Delete
                            </button>
                        </li>
                    </ul>
                ))}
            </div>
        </>
    );
}

