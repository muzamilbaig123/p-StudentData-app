"use client"
import { auth } from "@/firebase/firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { sendEmailVerification } from "firebase/auth/cordova";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react"
import style from "./register.module.css"


export default function Register () {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [gender, setGender] = useState("");
    const [err, setErr] = useState<string | null>("");
    const [succReg, setSuccReg] = useState<string | null>("");
    const router = useRouter();


    const RegisterFormHandler = async (e: FormEvent) => {
        e.preventDefault()

        if(password !== confirmPass){
            setErr("Password Not Match")
            return ;
        }
        
        try{
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCred.user;
        await sendEmailVerification(user)
        // setSuccReg("Please Verify Your Email.")
        router.push("/verify")

        } catch(e){
            if(e instanceof Error){
                setErr(e.message)
            }
            else{
                setErr("An Unknown error Occured")
            }
        } 




        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPass("");
        setGender("")

    }    



    return (
        <>
            <form onSubmit={RegisterFormHandler} className="bg-gradient-to-b from-gray-600 to-black p-10 text-center rounded shadow-stone-700 shadow-2xl" style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
            <h2 className="text-white text-4xl mt-20 mb-10 underline">Register</h2>
            
            <div className={style.inpDiv}>
                <input type="text" 
                value={firstName}
                onChange={((e) => {setFirstName(e.target.value)})}
                placeholder="First Name"
                className="p-2 rounded m-2 w-56"
                />
                
                <input type="text" 
                value={lastName}
                onChange={((e) => {setLastName(e.target.value)})}
                placeholder="Last Name"
                className="p-2 rounded m-2 w-56"
                />
            </div>
            <div className={style.inpDiv}>
                <input type="email" 
                value={email}
                onChange={((e) => {setEmail(e.target.value)})}
                placeholder="Email"
                className="p-2 rounded m-2 w-56"
                />

                <input type="password" 
                value={password}
                onChange={((e) => {setPassword(e.target.value)})}
                placeholder="Password"
                className="p-2 rounded m-2 w-56"
                />
            </div>
            <div className={style.inpDiv}>
                <input type="password" 
                value={confirmPass}
                onChange={((e) => {setConfirmPass(e.target.value)})}
                placeholder="Confirm Password"
                className="p-2 rounded m-2 w-56"
                />

                 <select className="p-3 w-56 rounded m-2" value={gender} onChange={((e) => {setGender(e.target.value)})}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                </select>
            </div>
                <button type="submit" className="border-red-50 border-2 p-2 mt-10 mb-20 text-white hover:bg-cyan-600 rounded">Sign Up</button>
                {err && <p style={{color: "red"}}>{err}</p>}
                {succReg && <p style={{color: "green"}}>{succReg}</p>}

            </form>
        </>
    )
}