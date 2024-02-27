import { NextRequest, NextResponse } from "next/server";
import { db } from "../../firebaseConfig";
import { addDoc, doc, collection, getDoc, getDocs, where, query } from "firebase/firestore";
import bcrypt from "bcrypt"

export async function GET(req: NextRequest, res: NextResponse) {

    return NextResponse.json({message: "hello"})
}


export async function POST(req: NextRequest, res: NextResponse) {

    const body = await req.json()
    const {email, password} = body
    const response: any = {}
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
        let docData = doc.data()

        if (docData.email === email) {
            response.status = "error"
            response.message = "This email is already exist"
        }
    });

    if (response && response.status) {
        return NextResponse.json(response)
    }

    const hashPass = await bcrypt.hashSync(password, 7)

    try {
        await addDoc(collection(db, "users"), {
            email,
            hashPass
        })
        return NextResponse.json({status: "success", message: "create success!"})
    } catch(e) {

        return NextResponse.json({status: "error", message: e})
    }
    

    // const usersRef = doc(db, "users", email)
    // const q = query(usersRef, where("email", "==", email));
    // const querySnapshots = await getDocs(q)

    // const docSnap = getDoc(usersRef)
    
    // if (querySnapshots) {
    //     return NextResponse.json({status: "error", message: "This email is already registered"})
    // }


    // querySnapshots.forEach(doc => {
    //     let docData = doc.data()
        
    //     if (docData.email === email) {
    //         return NextResponse.json({status: "error", message: "This email is already registered"})
    //     }
    // })

    // const hashPass = await bcrypt.hashSync(password, 7)

    // try {
    //     await addDoc(collection(db, "users"), {
    //         email,
    //         hashPass
    //     })
    //     return NextResponse.json({status: "success", message: "create success!"})
    // } catch(e) {

    //     return NextResponse.json({status: "error", message: e})
    // }


    
}