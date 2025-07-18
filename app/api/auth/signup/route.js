import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"
import connection from "@/lib/mongoose";
import User from "@/model/userModel"


export async function POST(req) {

    try {
        await connection(req);
        const { name, email, password } = await req.json();


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exist" }, { status: 400 })
        }


        const hashedPwd = await bcrypt.hash(password, 10)


        const newUser = await User.create({
            name,
            email,
            password: hashedPwd,
        })

        return NextResponse.json({ message: "User created successfuly", userId: newUser._id }, { status: 201 })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: "something went wrong in signup" }, { status: 500 })
    }
}