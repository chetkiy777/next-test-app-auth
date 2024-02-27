import { NextRequest, NextResponse } from "next/server";
import { db } from "../../firebaseConfig";
import { updateDoc, collection, getDocs, where, query, doc, getDoc } from "firebase/firestore";
import bcrypt from "bcrypt"

export interface IResponse {
    status: String,
    message: String,
}

export async function PUT(req: NextRequest, res: NextResponse) {

    const body = await req.json()
    const {email, newEmail, newPassword} = body


    const usersRef = collection(db, "users")
    const q = query(usersRef, where("email", "==", email.toString()));
    const querySnapshots = await getDocs(q)

    
    if (!querySnapshots) {
        return NextResponse.json({status: "error", message: "No users with this email"})
    }

    let docId = ""

    if (querySnapshots) {
        querySnapshots.forEach((doc) =>  {
            docId = doc.id
        });
    }


    if (docId) {

        let data: any = {}

        if (newPassword) {
            const hashedPass = await bcrypt.hashSync(newPassword, 7)
            data.hashPass = hashedPass;
        }

        if (newEmail) {
            data.email = newEmail
        }

        const docRef = doc(db, "users", docId)
        
        let result = await updateDoc(docRef, data)
        console.log(result)

        return NextResponse.json({status: "success", message: "user updated successfuly"})
    }
     
    
    
}