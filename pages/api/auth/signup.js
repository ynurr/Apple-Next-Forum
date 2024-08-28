import { connectDB } from "@/util/database"
import bcrypt from "bcrypt"
 
export default async function handler(요청, 응답) {
    if (요청.method == 'POST') {
        let hash = await bcrypt.hash(요청.body.password, 10)
        요청.body.password = hash

        

        const db = (await connectDB).db("forum")
        await db.collection('user_cred').insertOne(요청.body)
        응답.status(200).json('가입 성공')
    }
}