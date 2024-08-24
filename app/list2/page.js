import { connectDB } from "@/util/database"
import Link from "next/link"
import ListItem from "./ListItem"

export const revalidate = 60;

export default async function List() {
    
    const db = (await connectDB).db("forum")
    let result = await db.collection('post').find().toArray()
    console.log(result)

    return (
        <div className="list-bg">
            <ListItem result={result} />
        </div>
    )
} 