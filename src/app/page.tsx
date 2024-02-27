'use client'
import Updateform from "@/app/components/forms/update-form"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "./components/header";

export default function Home() {

  const router = useRouter()

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuth")
    if (!isAuth) {
      router.push('/login')
    }
  })

  return ( 
    <main className="container relative">
      <Header />
      <Updateform />
    </main>
  );
}
