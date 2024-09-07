import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import Comment from "./Comment"
import { notFound } from "next/navigation"
import Like from "./Like"

export default async function Detail(props) {

    const db = (await connectDB).db("forum")
    let result = await db.collection('post').findOne({ _id : new ObjectId(props.params.id) })
    console.log(props)

    if (result === null) {
      return notFound()
    }
  
    return (
      <div className="p-20">
        <h4>상세페이지</h4>
        <h4>{result.title}</h4>
        <p>{result.content}</p>
        <Like _id={result._id.toString()}  />
        <Comment _id={result._id.toString()} />
      </div>
    )
  }