import React from 'react'
import { Link } from 'react-router-dom'
import defaultImg from '../../assets/dafault.png'

export const User = ({ user }) => {
    return (
        <div className='notification' style={{ display: 'flex', flexDirection: 'row', margin: '3px 0px', alignItems: 'flex-start', padding: '10px 2px' }}>
            <div className="user-img">
                <Link to={`/${user?.username}`} ><img src={user?.avatar ? user.avatar : defaultImg} style={{ minWidth: '44px', height: '44px', objectFit: 'cover', borderRadius: '50%', marginRight: '3px' }} alt="" /></Link>
            </div>
            <div className="username" style={{ display: 'flex', flexDirection: 'column', marginLeft: '7px' }}>
                <p style={{fontSize:'14px',fontWeight:'bold'}}>{user?.username}</p>
                <p style={{fontSize:'13px'}}>{user?.name}</p>
            </div>
            {
                <button style={{ border: 'none', outline: 'none', background: 'blue', padding: '1px 5px', borderRadius: '5px', color: 'white', backgroundColor: '#2196f3', fontSize: '13px', width: '105px', fontWeight: 'bold', marginLeft: 'auto', height: '30px' }}>Follow</button>
            }

        </div>
    )
}
