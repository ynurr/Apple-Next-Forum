import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(요청, 응답) {
    if (요청.method == 'DELETE') {
        try {
            let session = await getServerSession(요청, 응답, authOptions)
            
            if (session !== null) {
                const db = (await connectDB).db("forum")
                let idCheck = await db.collection('post').findOne({_id : new ObjectId(요청.body)})
                let data = await db.collection('user_cred').findOne({email : idCheck.author})

                if (session.user.email == idCheck.author || session.user.role == 'admin') {
                    let result = await db.collection('post').deleteOne({_id : new ObjectId(요청.body)})
                    console.log(result)
        
                    if (result.deletedCount > 0) {
                        return 응답.status(200).json('삭제 완료')
                    } else {
                        return 응답.status(500).json('삭제 실패')
                    }
                } else {
                    return 응답.status(500).json('삭제 권한이 없습니다.')
                }
            } else {
                응답.status(500).json('로그인하세요.')
            }
        }
        catch (error) {
            응답.status(500).json('삭제 권한이 없습니다.')
        }
    }
}