import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../Interceptor/apiCall'
import { url } from '../baseUrl'
import { useEffect } from 'react'
import { useContext } from 'react'
import { Spinner } from '../assets/Spinner'
import { AuthContext } from '../context/Auth'

export function Password() {
    const { token } = useParams()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [ok, setOk] = useState(false)
    const [loading, setLoading] = useState(true)
    const context = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        api.get(`${url}/user/checkreset/${token}`).then((res) => {
            if (res.data && res.data.success === true) {
                setOk(true)
            }
        }).catch(err => {
            setOk(false)
        }).finally(() => setLoading(false))
    }, [context, token])

    function handleNewPassword() {
        if (!password || !confirmPassword) return context.throwErr("All credentials required")
        if (password !== confirmPassword) return context.throwErr("New Password and Confirm new password doesn't match")
        api.post(`${url}/user/newpassword`, {
            token,
            password
        }).then(res => {
            if (res.data) {
                context.throwSuccess("Password Updated")
                navigate('/login')
            }
        }).catch(err => {
            context.throwErr(err.response.data.message)
        })
    }
    return (
        <>
            {
                loading ? <Spinner /> :
                    ok ?
                        <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center', height: '90vh' }}>
                            <div className="forgot-box border">
                                <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '16px', marginTop: '8vh' }}>Create A Strong Password</p>
                                <p style={{ textAlign: 'center', fontSize: '14px', color: 'gray', width: '85%', marginTop: '17px' }}>Your password must be atleast 6 characters and should include a combination of numbers, letters and special characters (!$@%)</p>
                                <input className='border' style={{ marginTop: '27px', width: '75%', height: '39px', fontSize: '13px', padding: '0 9px', outline: 'none', borderRadius: '5px', backgroundColor: '#fafafa ' }} value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='New Password' />
                                <input className='border' style={{ marginTop: '18px', width: '75%', height: '39px', fontSize: '13px', padding: '0 9px', outline: 'none', borderRadius: '5px', backgroundColor: '#fafafa ' }} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" placeholder='Confirm New Password' />
                                <button style={{ border: 'none', outline: 'none', background: 'blue', padding: '9px 9px', borderRadius: '5px', color: 'white', backgroundColor: '#2196f3', marginTop: '28px', fontSize: '13px', width: '80%', fontWeight: 'bold' }} onClick={() => handleNewPassword()}>Reset Password</button>
                            </div>
                        </div>
                        : <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '6vh', }}>

                            <p style={{ marginTop: '6vh', textAlign: 'center', fontWeight: 'bold', fontSize: '19px' }}>Link Expired or Invalid</p>
                            <a style={{ color: 'rgb(33, 150, 243)', fontSize: '14px', marginTop: '9px' }} href="/forgot">Back to Forgot Password</a>
                        </div>
            }
        </>
    )
}
