import React from 'react'
import logo from '../../assets/logo.png'


export const LoginCard = () => {
    return (
        <div className="right-login">
            <div className="login-box border">
                <img style={{ width: '60%', margin: '35px 0', marginBottom: '25px', }} src={logo} alt="" />
                <input className='border' style={{ marginTop: '0px', width: '75%', height: '37px', fontSize: '13px', backgroundColor: '', padding: '0 9px', outline: 'none' }} type="text" placeholder='Username or email  address' />
                <input className='border' style={{ marginTop: '15px', width: '75%', height: '37px', fontSize: '13px', backgroundColor: '', padding: '0 9px', outline: 'none' }} type="password" placeholder='Password' />
                <button style={{ border: 'none', outline: 'none', background: 'blue', padding: '5px 9px', borderRadius: '5px', color: 'white', backgroundColor: '#2196f3', marginTop: '18px', fontSize: '13px', width: '75%',fontWeight:'bold' }}>Login</button>
                <p style={{ marginTop: '85px', color: 'gray', fontSize: '13px' }}>Forgotten your password?</p>
            </div>
            <div className="signup-action-box border" style={{ textAlign: 'center' }}>
                <p style={{ color: 'gray', fontSize: '14px' }}>Have an account?<span style={{ color: '#2196f3', fontWeight: 'bold', marginLeft: '6px' }}>Sign up</span></p>
            </div>
        </div>
    )
}
