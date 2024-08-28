import { connectDB } from "@/util/database"
import bcrypt from "bcrypt"
import { ObjectId } from "mongodb"
 
export default async function handler(요청, 응답) {
    if (요청.method == 'POST') {

        if (!요청.body.name) {
            return 응답.status(500).json('이름을 입력해주세요.')
        } else if (!요청.body.email) {
            return 응답.status(500).json('이메일을 입력해주세요.')
        } else if (!요청.body.password) {
            return 응답.status(500).json('비밀번호를 입력해주세요.')
        }
        
        const db = (await connectDB).db("forum")
        let existingEmail = await db.collection('user_cred').findOne({email : 요청.body.email})

        if (existingEmail) {
            return 응답.status(500).json('이미 존재하는 이메일입니다.')
        }

        let hash = await bcrypt.hash(요청.body.password, 10)
        요청.body.password = hash
        await db.collection('user_cred').insertOne(요청.body)
        응답.status(200).json('가입 성공')
    }
}