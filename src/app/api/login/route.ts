import { NextRequest, NextResponse } from "next/server";
import { db } from "../../firebaseConfig";
import { addDoc, collection, getDocs, getDoc, where, query, doc, getDocFromCache } from "firebase/firestore";
import bcrypt from "bcrypt"

export interface IResponse {
    status: String,
    message: String,
}

export async function POST(req: NextRequest, res: NextResponse) {

    const body = await req.json()
    const {email, password} = body

    const usersRef = collection(db, "users")
    const q = query(usersRef, where("email", "==", email.toString()));
    const querySnapshots = await getDocs(q)


    let savedPass = ""

    if (querySnapshots) {
        querySnapshots.forEach((doc) =>  {
            const data = doc.data()

            if (data.hashPass) {
                savedPass = data.hashPass
            }
          });
    }

    let hashResult = await bcrypt.compare(password, savedPass)

    const response: IResponse = {
        status: "",
        message: ""
    }

    if (hashResult) {
        response.status = "success";
        response.message = "Welcome. You login!"

    } else {
        response.status = "error";
        response.message = "Incorrect password! Try agin"
    }
     
    return NextResponse.json(response)
    
}