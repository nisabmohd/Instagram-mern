import React from 'react'
import phone from '../assets/phome.png'
import {LoginCard} from '../components/login/LoginCard'

export function Login() {
    return (
        <div className='home lg-sg'>
            <div className="login-left">
                <div className="phone">
                    <img className='' style={{ width: '453px',marginTop:'-19px' }} src={phone} alt="" />
                </div>
            </div>
            <LoginCard/>
            
            <span style={{position:'absolute',bottom:'15px',fontSize:'14px'}}>© 2022 Instagram</span>
        </div>
    )
}
