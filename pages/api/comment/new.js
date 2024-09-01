import { connectDB } from "@/util/database"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import { ObjectId } from "mongodb"

export default async function handler(요청, 응답) {
    
    let session = await getServerSession(요청, 응답, authOptions)

    if (session) {
        if (요청.method == 'POST') {
            try {

                요청.body = JSON.parse(요청.body)
                
                let data = {
                    content : 요청.body.comment,
                    parent : new ObjectId(요청.body._id),
                    author : session.user.email,
                    name : session.user.name
                }
                
                const db = (await connectDB).db("forum")
                await db.collection('comment').insertOne(data)
                
                let result = await db.collection('comment').find({ parent : new ObjectId(요청.body._id) }).toArray()
                
                return 응답.status(200).json(result)
            }
            catch (error) {
                return 응답.status(200).json('서버 오류')
            }
        }
    } else {
        return 응답.status(500).json('로그인하세요.')
    }
}