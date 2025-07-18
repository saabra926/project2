import User from "@/model/userModel"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"
import connection from "@/lib/mongoose"

export async function POST(req) {

    try {
        await connection();
        const { email, password } = await req.json()
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
        }

        const forvalidPassword = await bcrypt.compare(password, user.password);
        if (!forvalidPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 })
        }

        return NextResponse.json({ message: "Login Successfull", userId: user._id })

    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: "Something went wrong in login" }, { status: 500 })
    }
}
