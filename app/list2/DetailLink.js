'use client'

import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"

export default function DetailLink() {
    let router = useRouter()
    let a = usePathname()
    let b = useSearchParams()
    let c = useParams()
    console.log('a:'+a)
    console.log('b:'+b)
    console.log('c:'+c)

    return (
        <button onClick={()=>{ router.push('/detail/1234') }}>버튼</button>
    )
}