"use client"
import Link from "next/link"
import  style from "../app/dashboard/dashboard.module.css"
export default function Navbar () {
    return (
        <>
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
        </>
    )
}