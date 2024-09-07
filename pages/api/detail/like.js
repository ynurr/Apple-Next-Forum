import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(요청, 응답) {
    
    let session = await getServerSession(요청, 응답, authOptions)

    if (session) {
        if (요청.method == 'POST') {
            try {
                let data = {
                    parent : new ObjectId(요청.body),
                    user : session.user.email
                }
                const db = (await connectDB).db("forum")
                await db.collection('like').insertOne(data)

                return 응답.status(200).json('성공')
            } catch (error) {
                return 응답.status(500).json('실패')
            }
        }
    }
}