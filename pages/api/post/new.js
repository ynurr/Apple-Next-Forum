import { connectDB } from "@/util/database"

export default async function handler(요청, 응답) {
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