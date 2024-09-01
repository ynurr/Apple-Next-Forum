'use client'

import { useEffect, useState } from "react"

export default function Comment(props) {

    let [comment, setComment] = useState('')
    let [data, setData] = useState([])

    useEffect(()=>{
        fetch('/api/comment/list?id=' + props._id)
        .then(r=>r.json())
        .then((result)=>{
            setData(result)
        })
    },[])

    
    return (
        <div>
            <hr></hr>
            <div><b>댓글</b></div>
            {
                data.length > 0 ?
                data.map((a,i)=>{
                    return (
                        <div className="comment-box" key={i}>
                            <b>{a.name}</b>
                            <div className="comment-box-content">
                                <p>{a.content}</p>
                                <div className="comment-actions">
                                    <button className="comment-delete-btn" onClick={()=>{
                                        fetch('/api/comment/delete', {
                                            method : 'DELETE',
                                            body : JSON.stringify({_id : a._id, parent : a.parent})
                                        })
                                        .then((r)=>{
                                            return r.json()
                                        })
                                        .then((r)=>{
                                            setData(r)
                                        })
                                    }}>삭제</button>
                                </div>
                            </div>
                        </div>
                    )
                })
                : '댓글 없음'
            }
            <input value={comment} onChange={(e)=>{ setComment(e.target.value) }}/>
            <button onClick={()=>{
                fetch('/api/comment/new', {
                    method : 'POST', 
                    body : JSON.stringify({comment : comment, _id : props._id})
                })
                .then((r)=>{
                    return r.json()
                })
                .then((r)=>{
                    setData(r)
                    setComment('') 
                })
            }}>댓글등록</button>
        </div>
    )
}