import React from 'react'
import { ForgotCard } from '../components/login/ForgotCard'

export function Forgot() {
    return (
        <div className='home'>
            <ForgotCard />
            <span style={{position:'absolute',bottom:'15px',fontSize:'14px',color:'gray'}}>© 2022 Instagram</span>

        </div>
    )
}
