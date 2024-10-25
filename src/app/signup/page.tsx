"use client";
import  {useRouter}  from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useState } from "react";
import { auth } from "@/firebase/firebaseconfig";


export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const signUpFormHandler = async (e: FormEvent) => {
        e.preventDefault();


    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    const user = userCredential.user;
        console.log(user)
        router.push("/login")
  })
  .catch((error) => {
    console.log("Sign Up Time Error", error)   
  });


    };  

    return (
        <div className="w-[100%] bg-blue-900 h-[100vh] flex items-center">
            <form
                className="bg-blue-400 ml-auto mr-auto p-2 w-[60%] rounded-xl pt-10 pb-10 text-center"
                style={{ boxShadow: "0px 2px 8px lightblue" }}
                onSubmit={signUpFormHandler}
            >
                <h1 className="text-center font-bold text-2xl text-white">Sign Up</h1>
                <div className="m-2 p-2">
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border rounded border-black p-1"
                            placeholder="Email"
                        />
                    </label>
                    <label className="ml-1">
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border rounded border-black p-1"
                            placeholder="Password"
                        />
                    </label>
                </div>
               
                <button className="bg-blue-800 text-white pt-2 pb-2 pl-4 pr-4 rounded-lg">
                    Submit
                </button>
            </form>
        </div>
    );
}
