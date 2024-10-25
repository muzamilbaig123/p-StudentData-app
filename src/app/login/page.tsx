"use client"
import { auth } from "@/firebase/firebaseconfig";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const route = useRouter();
    const provider = new GoogleAuthProvider();


    const LoginFormHandler = async (e: FormEvent) => {
        e.preventDefault();
        setEmail("");
        setPassword("");

        try{
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Login Is Succefully");
            route.push("/dashboard")
        }catch(e){
            console.log("Login Time Error", e)
        };
    };

    const signInGoogleHandler = async () => {
        try{
        const userCed = await signInWithPopup(auth, provider);
        console.log(userCed)

    }catch(e){
        console.log("Sign In With Goole Time Error", e);
    }
        
    }

    return (
        <>
            <div className="w-[100%] bg-blue-900 h-[100vh] flex items-center">
                <form className="bg-blue-400 ml-auto mr-auto p-2 w-[40%] rounded-xl pt-16 pb-16 text-center" style={{ boxShadow: "0px 2px 8px lightblue" }} onSubmit={LoginFormHandler}>
                    <h1 className="text-center font-bold text-2xl text-white">LogIn</h1>

                    <div className="m-2 p-2">
                        <label>
                            Email : <input type="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                className="border rounded border-black p-1"
                                placeholder="Email"

                            />
                        </label>
                    </div>
                    <div>
                        <label className="ml-1">
                            Password : <input type="password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                className="border rounded border-black p-1"
                                placeholder="Password"

                            />
                        </label>
                    </div>
                    <button className="bg-blue-800 text-white pt-2 pb-2 pl-4 pr-4 rounded-lg relative top-4">Login</button>

                </form>

            </div>
                    <button className="bg-blue-800 text-white pt-2 pb-2 pl-4 pr-4 rounded-lg absolute top-4 " onClick={signInGoogleHandler} style={{border: "2px solid white"}}>Login With Google</button>
        </>
    )
}