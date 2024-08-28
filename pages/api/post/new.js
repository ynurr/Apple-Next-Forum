import { connectDB } from "@/util/database"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(요청, 응답) {

    let session = await getServerSession(요청, 응답, authOptions)
    console.log(session.user.email)

    if (session) {
        요청.body.author = session.user.email
    }

    if (요청.method == 'POST') {
        console.log(요청.body) // 요청.body = 유저가 보낸 데이터
        if (요청.body.title == '') {
            return 응답.status(500).json('제목 안 씀')
        }
        const db = (await connectDB).db("forum")
        let result = await db.collection('post').insertOne(요청.body)
        return 응답.status(200).redirect('/list')
    }
}