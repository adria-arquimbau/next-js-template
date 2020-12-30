import {useEffect, useState} from 'react'
import {onAuthStateChange} from "../firebase/client";
import {route} from "next/dist/next-server/server/router";
import {useRouter} from "next/router";

export const USER_STATES = {
    NOT_LOGGED: null,
    NOT_KNOW: undefined
}

export default function useUser(){

    const [user, setUser] = useState(USER_STATES.NOT_KNOW)
    const router = useRouter()

    useEffect(() => {
        onAuthStateChange(user => setUser(user))
    }, [])

    useEffect(() => {
        user=== USER_STATES.NOT_LOGGED && router.push('/')
    },[user])

    return user
}