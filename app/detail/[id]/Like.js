'use client'

import { useEffect, useState } from "react";

export default function Like(props) {

    let [like, setLike] = useState(false)

    useEffect(()=>{
        fetch('/api/detail/status?id=' + props._id)
        .then(r=>r.json())
        .then((result)=>{
            setLike(result)
        })
    },[])

    return (
        <div>
            <span onClick={()=>{
                if (!like) {
                    fetch('/api/detail/like', {
                        method : 'POST',
                        body : props._id
                    })
                    .then((r)=>{
                        return r.json()
                    })
                    .then((r)=>{
                        setLike(currentLike=>!currentLike)
                        console.log(r)
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                } else {
                    fetch('/api/detail/unlike', {
                        method : 'DELETE',
                        body : props._id
                    })
                    .then((r)=>{
                        return r.json()
                    })
                    .then((r)=>{
                        setLike(currentLike=>!currentLike)
                        console.log(r)
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                }
            }}>{like ? '💖' : '🤍'}</span>
        </div>
    )
}