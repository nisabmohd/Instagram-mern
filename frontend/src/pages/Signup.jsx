import React from 'react'
import phone from '../assets/gifphone.gif'
import { SignupCard } from '../components/login/SignupCard'

export function Signup() {
  return (
    <div>
        <div className='home lg-sg'>
            <div className="login-left">
                <div className="phone">
                    <img className='' style={{ width: '453px'}} src={phone} alt="" />
                </div>
            </div>
            <SignupCard/>
            
            <span style={{position:'absolute',bottom:'15px',fontSize:'14px',color:'gray'}}>© 2022 Instagram</span>
        </div>
    </div>
  )
}
