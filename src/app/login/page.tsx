"use client"
import Link from "next/link";
import { FormEvent, useState } from "react"

export default function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginFormHandler = (e: FormEvent) => {
        e.preventDefault()
        setEmail("");
        setPassword("");

    }    


    return (
        <>
            <form onSubmit={loginFormHandler} style={{border: "2px solid black", width: "50%", textAlign: "center", padding: "20px", margin: "0 auto"}}>
            <h2>Login</h2>
                <label>Email: <input type="email" 
                value={email}
                onChange={((e) => {setEmail(e.target.value)})}
                /></label>
                <br />
                <br />
                 <label>Password: <input type="password" 
                value={password}
                onChange={((e) => {setPassword(e.target.value)})}
                /></label>
                <br />
                <br />
                <button type="submit">Login</button>

                <div>Do Have An Account ? <Link href="/register">Register Here</Link></div>

            </form>
        </>
    )
}