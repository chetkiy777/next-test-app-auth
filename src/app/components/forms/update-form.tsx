'use client'
import { useState } from "react";
import Button from "../button";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Notiflix from "notiflix";


export default function Updateform() {

    const [email, setEmail] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const router = useRouter()
    
    const cleanInputs = () => {
        setEmail("")
        setNewEmail("")
        setNewPassword("")
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        try {   

            const response = await axios.put("http://localhost:3000/api/update", {
                email,
                newEmail,
                newPassword
            })

            
            if (response.data.status === "success") {
                Notiflix.Notify.success(response.data.message)
                cleanInputs()
            } else {
                Notiflix.Notify.failure(response.data.message)
            }

            
        } catch(err) {
            console.error(err)
        }

    }


    return(
        <form onSubmit={handleSubmit} className="flex flex-col p-3 gap-5 items-center mt-16">


            <p className={'font-bold text-4xl'}>Update data</p>
            <div>
                <p>Enter email</p>
                <input className={"px-4 py-2 shadow-gray-950 shadow-md focus:outline-none focus:shadow-gray-950 focus:shadow-lg"} type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div>
                <p>Enter new email</p>
                <input className={"px-4 py-2 shadow-gray-950 shadow-md focus:outline-none focus:shadow-gray-950 focus:shadow-lg"} type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)}/>
            </div>

            <div>
                <p>Enter new password</p>
                <input className={"px-4 py-2 shadow-gray-950 shadow-md focus:outline-none focus:shadow-gray-950 focus:shadow-lg"} type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
            </div>
                
            <Button>Update</Button>

        </form>
    )
}