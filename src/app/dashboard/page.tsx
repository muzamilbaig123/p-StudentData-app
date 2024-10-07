import Link from "next/link";
// import { useState } from "react"
import style from "./dashboard.module.css"

export default function Dashborad () {
    // const [userName, setUserName] = useState("")
    // setUserName("Muz")
    return(
        <>
            <header className={style.header}>
                <nav className={style.nav}>
                    <div className={style.welcome}>
                        {/* <h1>Welcome {userName && userName}</h1> */}
                        <h1>Welcome</h1>
                    </div>
                    <ul className={style.ul}>
                        <li><Link href="#">Home</Link></li>
                        <li><Link href="#">About Us</Link></li>
                        <li><Link href="#">Blogs</Link></li>
                        <li><Link href="#">Projects</Link></li>
                        <li><Link href="#">Contact Us</Link></li>
                    </ul>
                    <div className="logout_changepassword">
                        <button className={style.changepass}>Forget Password</button>
                        <button className={style.logout}>Logout</button>
                    </div>
                </nav>            
            </header>
            <main className={style.main}>

            </main>
            <footer className={style.footer}>
                <h2>©2024 – Copyright Blue Shark All Right Reserved</h2>
            </footer>
        </>
    )
}