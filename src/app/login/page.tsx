"use client"
import { auth, fireStore } from "@/firebase/firebaseconfig"
import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

export default function LogIn() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [err, setErr] = useState<string | null>(null);
    const router = useRouter();

    // Marking the formHandler as async
    const formHandler = async (ele: FormEvent) => {
        ele.preventDefault();
        setErr(null);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, pass);
            const user = userCredential.user;

            if (user.emailVerified) {
                // Check if user data exists in Firestore
                const userDoc = await getDoc(doc(fireStore, "users", user.uid));
                if (!userDoc.exists()) {
                    await setDoc(doc(fireStore, "users", user.uid), {
                        email: user.email,
                    });
                }

                // Redirect to dashboard
                router.push("/dashboard");
            } else {
                setErr("Please verify your email before logging in");
            }

        } catch (error) {
            if (error instanceof Error) {
                setErr(error.message);
            } else {
                setErr("An Unknown Error Occurred");
            }
        }
    };

    return (
        <div className="w-[30%] text-center absolute rounded top-2/4 left-2/4 transform translate-x-[-50%] translate-y-[-50%] d shadow-stone-700 shadow-2xl">
            <div className="p-5 rounded bg-gradient-to-b from-gray-600 to-black">

            <h2 className="text-4xl font-medium text-white mb-10 underline">Login</h2>
                {/* form start */}
                <form onSubmit={formHandler} className="text-center">
                        <div>
                         <input type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            className="p-2 rounded m-2 w-60"
                        />
                        </div>
                        <div>
                            <input type="password"
                            placeholder="Password"
                            value={pass}
                            onChange={(e) => { setPass(e.target.value) }}
                            className="p-2 rounded m-2 w-60"
                        />
                        </div>
                    
                    <button type="submit" className="border-red-50 border-2 pt-2 pb-2 pl-4 pr-4 mt-6 mb-6 text-white hover:bg-cyan-600 rounded">Login</button>
                    {err && <p className="text-red-700">{err}</p>}
                </form>

                <p className="text-sm font-medium text-gray-300 space-y-6 px-6 pb-4">
                    Don't Have An account?{" "}
                    <Link href="/register" className="text-blue-700 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}
