"use client"
import { auth } from "@/firebase/firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { sendEmailVerification } from "firebase/auth/cordova";
import { FormEvent, useState } from "react"

export default function Register () {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [gender, setGender] = useState("");
    const [err, setErr] = useState<string | null>("");
    const [succReg, setSuccReg] = useState<string | null>("");


    const RegisterFormHandler = async (e: FormEvent) => {
        e.preventDefault()

        if(password !== confirmPass){
            setErr("Password Not Match.")
            return
        }
        try{
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCred.user;
        await sendEmailVerification(user)
        setSuccReg("Please Verify Your Email.")

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
            <form onSubmit={RegisterFormHandler} style={{border: "2px solid black", width: "50%", textAlign: "center", padding: "20px", margin: "0 auto"}}>
            <h2>Sign Up</h2>
            
                
                <label>First Name: <input type="text" 
                value={firstName}
                onChange={((e) => {setFirstName(e.target.value)})}
                /></label>
                
                <label style={{marginLeft: "20px"}}>Last Name: <input type="text" 
                value={lastName}
                onChange={((e) => {setLastName(e.target.value)})}
                /></label>
                <br />
                <br />

                <label>Email: <input type="email" 
                value={email}
                onChange={((e) => {setEmail(e.target.value)})}
                /></label>

                 <label style={{marginLeft: "20px"}}>Password: <input type="password" 
                value={password}
                onChange={((e) => {setPassword(e.target.value)})}
                /></label>
                <br />
                <br />

                <label>Confirm Password: <input type="password" 
                value={confirmPass}
                onChange={((e) => {setConfirmPass(e.target.value)})}
                /></label>

                <label style={{marginLeft: "20px"}}>
                    Gender: 
                 <select value={gender} onChange={((e) => {setGender(e.target.value)})}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                </select>
                 </label>
                <br />
                <br />

                <button type="submit">Sign Up</button>
                {err && <p style={{color: "red"}}>{err}</p>}
                {succReg && <p style={{color: "green"}}>{succReg}</p>}

            </form>
        </>
    )
}