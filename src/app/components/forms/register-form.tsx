'use client'
import { useState } from "react";
import Button from "../button";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Notiflix from "notiflix";

export default function RegisterForm() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const cleanInputs = () => {
        setEmail("")
        setPassword("")
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        try {   

            const result = await axios.post("http://localhost:3000/api/register", {
                email,
                password
            })

            if (result.data.status === "success") {
                Notiflix.Notify.success(result.data.message)
                cleanInputs()
                router.push('/login')
            } else {
                Notiflix.Notify.failure(result.data.message)
            }

        } catch(err) {
            console.error(err)
        }

    }


    return(
        <form onSubmit={handleSubmit} className="flex flex-col p-3 gap-5 items-center mt-5">

            <p className={'font-bold text-4xl'}>Registration</p>

            <div>
                <p>Enter email</p>
                <input className={"px-4 py-2 shadow-gray-950 shadow-md focus:outline-none focus:shadow-gray-950 focus:shadow-lg"} type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div>
                <p>Enter password</p>
                <input className={"px-4 py-2 shadow-gray-950 shadow-md focus:outline-none focus:shadow-gray-950 focus:shadow-lg"} type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
                
            <Button>Register</Button>

            <div>
                <span className={"mr-1 opacity-70"}>go to</span>
                <Link className={"font-bold underline"} href="/login">Login</Link>   
            </div>

        </form>
    )
}