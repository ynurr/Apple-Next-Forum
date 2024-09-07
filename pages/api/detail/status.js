import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(요청, 응답) {

    let session = await getServerSession(요청, 응답, authOptions)

    if (session) {
        try {
            const db = (await connectDB).db("forum")
            let result = await db.collection('like').findOne({parent : new ObjectId(요청.query.id), user: session.user.email})

            const isLiked = !!result

            응답.status(200).json(isLiked)
        } catch (error) {
            return 응답.status(500).json({ error: `조회 실패: ${error.message}` })
        }
    }
}