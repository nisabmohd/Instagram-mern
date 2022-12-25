import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import img from '../../assets/lock.png'
import { api } from '../../Interceptor/apiCall'
import { url } from '../../baseUrl'
import { useContext } from 'react'
import { AuthContext } from '../../context/Auth'

export const ForgotCard = () => {
    const [text, setText] = useState('')
    const context = useContext(AuthContext)
    async function handleSendResetLink() {
        api.post(`${url}/user/reset`, { text }).then((res) => {
            if (res.data) {
                context.throwSuccess(res.data.message)
            }
        }).catch(err => {
            context.throwErr(err.response.data.message)
        })
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center', height: '90vh' }}>
            <div className="forgot-box border">
                <img src={img} style={{ marginBottom: '20px' }} alt="" />
                <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '16px' }}>Trouble with logging in?</p>
                <p style={{ textAlign: 'center', fontSize: '14px', color: 'gray', width: '77%', marginTop: '17px' }}>Enter your email address, phone number or username, and we'll send you a link to get back into your account.</p>
                <input value={text} onChange={e => setText(e.target.value)} className='border' style={{ marginTop: '10px', width: '75%', height: '39px', fontSize: '13px', padding: '0 9px', outline: 'none', borderRadius: '5px', backgroundColor: '#fafafa ' }} type="text" placeholder='Username or email  address' />
                <button onClick={() => handleSendResetLink()} style={{ border: 'none', outline: 'none', background: 'blue', padding: '7px 9px', borderRadius: '5px', color: 'white', backgroundColor: '#2196f3', marginTop: '18px', fontSize: '13px', width: '75%', fontWeight: 'bold' }}>Send Login Link</button>
                <div className="line" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '38px' }}>
                    <div style={{ backgroundColor: '#cac7c7', height: '1px', width: '120px' }}></div>
                    <span style={{ margin: '0 8px', color: 'gray', fontSize: '11.5px', fontWeight: 'bold' }}>OR</span>
                    <div style={{ backgroundColor: '#cac7c7', height: '1px', width: '120px' }}></div>
                </div>
                <Link to="/signup" style={{ marginTop: '20px', color: '#4a4747', fontSize: '14px', textDecoration: 'none', fontWeight: 'bold' }}>Create New Account</Link>
                <Link to="/login" className="separate" style={{ width: '100%', backgroundColor: 'rgb(246 246 246)', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                    <p style={{ textAlign: 'center', fontSize: '14px', fontWeight: 'bold', color: '#4a4747' }}>Back To Login</p>
                </Link>
            </div>
        </div>
    )
}
