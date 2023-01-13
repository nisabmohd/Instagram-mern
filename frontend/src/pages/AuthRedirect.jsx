import React from 'react'
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { url } from '../baseUrl'
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/Auth'

export default function AuthRedirect() {
    const [err, setErr] = useState(undefined)
    const [query] = useSearchParams()
    const context = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {

        axios.get(`${url}/user/get/${query.get('uid')}`).then((res) => {
            if (!res.data.success) {
                console.log(res.data);
                setErr("Something unexpected happened")
                localStorage.clear()
            }
            localStorage.setItem('access_token', query.get('access_token'))
            localStorage.setItem('refresh_token', query.get('refresh_token'))
            localStorage.setItem('user', JSON.stringify(res.data))
            context.setAuth(res.data)
            navigate('/')
        }).catch(err => {
            console.log(err);
            setErr("Something unexpected happened")
            localStorage.clear()
        })
    }, [context, navigate, query])

    return (
        <div style={{ textAlign: 'center', marginTop: '6vh' }}>{err ? err : "Redirecting ..."}</div>
    )
}
