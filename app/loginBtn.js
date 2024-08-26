'use client'

import { signIn } from 'next-auth/react'

export default function LoginBtn({className}) {
    return (
        <button className={className} onClick={()=>{ signIn() }}>로그인</button>
    )
}