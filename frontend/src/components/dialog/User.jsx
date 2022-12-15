import React, { useState } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import defaultImg from '../../assets/dafault.png'
import { url } from '../../baseUrl'
import { AuthContext } from '../../context/Auth'
import { api } from '../../Interceptor/apiCall'

export const User = ({ user, setShow = undefined, handleClose }) => {
    const context = useContext(AuthContext)
    const [iFollow, setIFollow] = useState(user.followers.includes(context.auth._id))

    async function handleFollow() {
        api.get(`${url}/user/handlefollow/${user._id}`).then((res) => {
            if (res.data?.success) {
                setIFollow(prev => !prev)
            }
        })
    }


    return (
        <div className='notification' onClick={() => { if (setShow) { setShow(false) } }} style={{ display: 'flex', flexDirection: 'row', margin: '3px 0px', alignItems: 'flex-start', padding: '10px 2px' }}>
            <div className="user-img">
                <Link onClick={() => handleClose()} to={`/${user?.username}`} ><img src={user?.avatar ? user.avatar : defaultImg} style={{ minWidth: '44px', height: '44px', objectFit: 'cover', borderRadius: '50%', marginRight: '3px' }} alt="" /></Link>
            </div>
            <div className="username" style={{ display: 'flex', flexDirection: 'column', marginLeft: '7px' }}>
                <Link onClick={() => handleClose()} to={`/${user?.username}`} style={{ fontSize: '14px', fontWeight: 'bold' }}>{user?.username}</Link>
                <p style={{ fontSize: '13px' }}>{user?.name}</p>
            </div>
            {
                user?._id !== context.auth._id ?
                    iFollow ?
                        <button onClick={() => handleFollow()} style={{ border: 'none', outline: 'none', padding: '1px 5px', borderRadius: '5px', color: '#4e4e4e', fontSize: '13px', width: '105px', fontWeight: 'bold', marginLeft: 'auto', height: '30px' }}>UnFollow</button>
                        :
                        <button onClick={() => handleFollow()} style={{ border: 'none', outline: 'none', background: 'blue', padding: '1px 5px', borderRadius: '5px', color: 'white', backgroundColor: '#2196f3', fontSize: '13px', width: '105px', fontWeight: 'bold', marginLeft: 'auto', height: '30px' }}>Follow</button> : <></>
            }

        </div>
    )
}
