import { connectDB } from "@/util/database"
import Link from "next/link"
import ListItem from "./ListItem"

export const dynamic = 'force-dynamic'

export default async function List() {
    
    const db = (await connectDB).db("forum")
    let result = await db.collection('post').find().toArray()

    // MongoDB의 ObjectId 객체가 클라이언트 컴포넌트로 전달될 때 직렬화가 불가능해 발생하는 문제 방지
    result = result.map((a,i)=>{
        return {
            ...a,
            _id : a._id.toString()
        }
    })
    
    console.log(result)

    return (
        <div className="list-bg">
            <ListItem result={result} />
        </div>
    )
} 