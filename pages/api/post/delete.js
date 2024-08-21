import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"

export default async function handler(요청, 응답) {
    if (요청.method == 'DELETE') {
        try {
            const db = (await connectDB).db("forum")
            let result = await db.collection('post').deleteOne({_id : new ObjectId(요청.body)})
            console.log(result)

            if (result.deletedCount > 0) {
                return 응답.status(200).json('삭제 완료')
            } else {
                return 응답.status(500).json('삭제 실패')
            }
        }
        catch (error) {
            응답.status(500).json('서버 오류')
        }
    }
}