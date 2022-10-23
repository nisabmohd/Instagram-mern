import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { Disabled } from '../disabled/Disabled'
import axios from 'axios'
import { AuthContext } from '../../context/Auth'
import { url } from '../../baseUrl'

export const LoginCard = () => {
    const context = useContext(AuthContext)
    const [username, setUsername] = useState('')
    const [password, setPasword] = useState('')
    const login = async () => {
        try {
            const response = await axios.post(`${url}/auth/login`, {
                text: username,
                password
            })
            localStorage.setItem('user', JSON.stringify(response.data.user))
            localStorage.setItem("access_token", response.data.access_token)
            localStorage.setItem("refresh_token", response.data.refresh_token)
            context.setAuth(response.data.user)
            window.location.reload()
        } catch (err) {
            context.throwErr(err.response.data.message)
            console.log(err.response.data.message);
        }
    }
    return (
        <div className="right-login">
            <div className="login-box border">
                <img style={{ width: '60%', margin: '35px 0', marginBottom: '25px', }} src={logo} alt="" />
                <input value={username} onChange={(e) => setUsername(e.target.value)} className='border' style={{ marginTop: '10px', width: '75%', height: '37px', fontSize: '13px', padding: '0 9px', outline: 'none', borderRadius: '5px', backgroundColor: '#fafafa ' }} type="text" placeholder='Username or email  address' />
                <input value={password} onChange={(e) => setPasword(e.target.value)} className='border' style={{ marginTop: '15px', width: '75%', height: '37px', fontSize: '13px', backgroundColor: '#fafafa ', padding: '0 9px', outline: 'none', borderRadius: '5px' }} type="password" placeholder='Password' />
                {
                    username !== '' && password !== '' ? <button onClick={() => login()} style={{ border: 'none', outline: 'none', background: 'blue', padding: '7px 9px', borderRadius: '5px', color: 'white', backgroundColor: '#2196f3', marginTop: '18px', fontSize: '13px', width: '75%', fontWeight: 'bold' }}>Login</button> : <Disabled text={"Log in"}></Disabled>
                }
                <div className="line" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '38px' }}>
                    <div style={{ backgroundColor: '#cac7c7', height: '1px', width: '120px' }}></div>
                    <span style={{ margin: '0 8px', color: 'gray', fontSize: '11.5px', fontWeight: 'bold' }}>OR</span>
                    <div style={{ backgroundColor: '#cac7c7', height: '1px', width: '120px' }}></div>
                </div>
                <Link to="/forgot" style={{ marginTop: '45px', color: 'gray', fontSize: '13.15px', textDecoration: 'none' }}>Forgotten your password ?</Link>
            </div>
            <div className="signup-action-box border" style={{ textAlign: 'center' }}>
                <p style={{ color: 'gray', fontSize: '14px' }}>Don't have an account?<Link to="/signup" style={{ color: '#2196f3', fontWeight: 'bold', marginLeft: '6px', textDecoration: 'none', fontSize: '13.25px' }}>Sign up</Link></p>
            </div>
        </div>
    )
}
