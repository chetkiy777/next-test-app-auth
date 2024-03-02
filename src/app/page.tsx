'use client'
import Updateform from "@/app/components/forms/update-form"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./components/header";

export default function Home() {

  const [userEmail, setUserEmail] = useState("")

  const router = useRouter()

  useEffect(() => { 
    let data = localStorage.getItem("auth")
    
    if (!data) {
      router.push('/login')
    } else {
        let auth = JSON.parse(data)
        setUserEmail(auth.email)
    }
  })

  return ( 
    <main className="container relative">
      <Header email={userEmail} />
      <Updateform />
    </main>
  );
}
