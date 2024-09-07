import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(요청, 응답) {
    
    let session = await getServerSession(요청, 응답, authOptions)

    if (session) {
        if (요청.method == 'DELETE') {
            try {
                const db = (await connectDB).db("forum")
                await db.collection('like').deleteOne({parent : new ObjectId(요청.body), user: session.user.email})

                return 응답.status(200).json('삭제 성공')
            } catch (error) {
                return 응답.status(500).json('삭제 실패:'+error)
            }
        }
    }
}