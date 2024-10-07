"use client"
import { auth, fireStore } from "@/firebase/firebaseconfig"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState, CSSProperties } from "react"
import type { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import MoonLoader from "react-spinners/MoonLoader";

const override: CSSProperties = {
  position: "absolute",
  top: "48%",
  left: "50%",
};

export default function Home () {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true); 
  const router = useRouter()

  useEffect(() => {


  const unSubscribe = onAuthStateChanged(auth, async (user) => {
    if(user){

      if(user.emailVerified){
        const userDoc = await getDoc(doc(fireStore, "users", user.uid));

        if(!userDoc.exists){
            // retrive user data from local storage
          const registrationData = localStorage.getItem("RegistrationData")
          const {
            firstName = "",
            lastName = "",
            gender = "",
          } = registrationData ? JSON.parse(registrationData) : {};

          await setDoc(doc(fireStore, "users", user.uid), {
            firstName, lastName, gender, email: user.email
          });
            // clear registration data from local storage
          localStorage.removeItem("registraionData");
      }
      setUser(user);
      router.push("/dashboard")
    }
    else{
      setUser(null);
      router.push("/login");
    }
    
    }else{
      setUser(null);
      router.push("/login");
    }
    setLoading(true)
    
  });
  return () => unSubscribe();

  
}, [router]);//useeffect end
  
if(loading){
  return (
  
 <div className="loader h-screen w-full bg-black">
      <MoonLoader
        cssOverride={override}
        size={60} // size in pixels
        color={"#fff"} // hex code of color
        loading={true} // whether to show the loader or not
        speedMultiplier={1} // control speed of animation
      />
    </div>
)
}
  
  
  return (
    <>
    
    </>
  )
}