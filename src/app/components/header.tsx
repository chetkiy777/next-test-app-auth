'use client'
import { useRouter } from "next/navigation";
import Notiflix from "notiflix";
import { useEffect } from "react";

export interface HeaderProps {
    email: String
}

export default function Header({email}: HeaderProps) {

    const router = useRouter()

    useEffect(() => {
        
    },[])

    const logout = () => {
        localStorage.clear()
        Notiflix.Notify.success("Logout success!")
        router.push('/login')
    }


    return(
        <header className={"flex px-2 justify-between items-center h-10 w-full fixed top-0 left-0 bg-black text-white"}>
            <div>
                {email}
            </div>

            <button onClick={logout}>
                Logout
            </button>

        </header>
    )
}