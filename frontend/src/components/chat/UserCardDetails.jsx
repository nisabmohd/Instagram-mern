import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import defaultImg from '../../assets/dafault.png'
import { url } from '../../baseUrl'
import { api } from '../../Interceptor/apiCall'


export default function UserCardDetails({ uid, showOnline = false }) {
    const [user, setUser] = useState()
    useEffect(() => {
        api.get(`${url}/user/get/${uid}`).then(res => setUser(res.data)).catch(err => console.log(err))
    }, [uid])
    return (
        <div className='notification' style={{ display: 'flex', flexDirection: 'row', margin: '3px 0px', alignItems: 'flex-start', padding: '10px 2px' }}>
            <div className="user-img">
                <Link to={`/${user?.username}`} >
                    <img src={user?.avatar ? user.avatar : defaultImg} style={{ minWidth: '44px', height: '44px', objectFit: 'cover', borderRadius: '50%', marginRight: '3px', position: 'relative' }} alt="" />{
                        showOnline && user?.online &&
                        <div style={{
                            backgroundColor: 'green', width: '12px', height: '12px', borderRadius: '50%', position: 'relative', top: '-21px', left: '34px', zIndex
                                : '99'
                        }}></div>
                    }
                </Link>
            </div>
            <div className="username" style={{ display: 'flex', flexDirection: 'column', marginLeft: '7px' }}>
                <Link to={`/${user?.username}`} style={{ fontSize: '14px', fontWeight: 'bold' }}>{user?.username}</Link>
                <p style={{ fontSize: '13px' }}>{user?.name}</p>
            </div>
        </div>
    )
}
