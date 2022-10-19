import React from 'react'
import phone from '../assets/phome.png'
import { SignupCard } from '../components/login/SignupCard'

export function Signup() {
  return (
    <div>
        <div className='home lg-sg'>
            <div className="login-left">
                <div className="phone">
                    <img className='' style={{ width: '453px',marginTop:'-19px' }} src={phone} alt="" />
                </div>
            </div>
            <SignupCard/>
            
            <span style={{position:'absolute',bottom:'15px',fontSize:'14px'}}>© 2022 Instagram</span>
        </div>
    </div>
  )
}
