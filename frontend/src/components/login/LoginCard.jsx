import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'


export const LoginCard = () => {
    return (
        <div className="right-login">
            <div className="login-box border">
                <img style={{ width: '60%', margin: '35px 0', marginBottom: '25px', }} src={logo} alt="" />
                <input className='border' style={{ marginTop: '10px', width: '75%', height: '37px', fontSize: '13px', padding: '0 9px', outline: 'none',borderRadius:'5px',backgroundColor: '#fafafa '}} type="text" placeholder='Username or email  address' />
                <input className='border' style={{ marginTop: '15px', width: '75%', height: '37px', fontSize: '13px', backgroundColor: '#fafafa ', padding: '0 9px', outline: 'none',borderRadius:'5px' }} type="password" placeholder='Password' />
                <button style={{ border: 'none', outline: 'none', background: 'blue', padding: '7px 9px', borderRadius: '5px', color: 'white', backgroundColor: '#2196f3', marginTop: '18px', fontSize: '13px', width: '75%',fontWeight:'bold' }}>Login</button>
                <p style={{ marginTop: '85px', color: 'gray', fontSize: '13.85px' }}>Forgotten your password ?</p>
            </div>
            <div className="signup-action-box border" style={{ textAlign: 'center' }}>
                <p style={{ color: 'gray', fontSize: '14px' }}>Don't have an account?<Link to="/signup" style={{ color: '#2196f3', fontWeight: 'bold', marginLeft: '6px',textDecoration:'none',fontSize:'13.25px'  }}>Sign up</Link></p>
            </div>
        </div>
    )
}
