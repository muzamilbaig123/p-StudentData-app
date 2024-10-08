import style from "./dashboard.module.css"
import Navbar from "@/components/nav";
import TodoApp from "@/components/todo";

export default async function Dashborad () {
    return(
        <>
            <header className={style.header}>
                <Navbar />           
            </header>
            <main className={style.main}>
              <TodoApp />
            </main>
            <footer className={style.footer}>
                <h2>©2024 – Copyright Muzamil Baig App All Right Reserved</h2>
            </footer>
        </>
    )
}