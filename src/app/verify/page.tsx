import { getFirestore } from "firebase/firestore"
import { collection, getDocs } from "firebase/firestore"; 
import style from "./verify.module.css"

export default function Verify () {
    return(
        <>
            <div className={style.verify_container}>
                <h1>Please Verify Your Email In Gmail.</h1>
            </div>
        </>
    )
}