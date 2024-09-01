import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"

export default async function handler(요청, 응답) {
    if (요청.method == 'DELETE') {
        try {
            요청.body = JSON.parse(요청.body)

            const db = (await connectDB).db("forum")
            await db.collection('comment').deleteOne({_id : new ObjectId(요청.body._id)})
            
            let result = await db.collection('comment').find({ parent : new ObjectId(요청.body.parent) }).toArray()
                
            return 응답.status(200).json(result)
        } catch (error) {
            return 응답.status(500).json('삭제 실패!')
        }
    }
}