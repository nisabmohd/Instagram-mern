import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import ReactTimeAgo from 'react-time-ago'
import { commentMore } from '../../assets/svgIcons'
import { url } from '../../baseUrl';
import { AuthContext } from '../../context/Auth';
import { api } from '../../Interceptor/apiCall';
import defaultImg from '../../assets/dafault.png'
export default function Comment({ text, time, userId }) {
    const context = useContext(AuthContext)
    const [user, setUser] = useState()
    const [show, setShow] = useState(false)
    useEffect(() => {
        api.get(`${url}/user/get/${userId}`).then(res => {
            console.log(res.data);
            setUser(res.data)
        })
    }, [userId])

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '23px' }}>
            <div className="comment-left">
                <Link to={`/${user?.username}`}><img src={user?.avatar?user.avatar:defaultImg} style={{ minWidth: '35px', height: '35px', objectFit: 'cover', borderRadius: '50%', }} alt="" /></Link>
            </div>
            <div className="right-comment" onMouseOver={() => setShow(true)} onMouseLeave={() => setShow(false)} style={{ display: 'flex', flexDirection: 'column', marginLeft: '9px' }}>
                <p style={{ fontSize: '13px' }} className="username-comment"><Link to={`/${user?.username}`} style={{ fontWeight: 'bold' }}>{`${user?.username}`}</Link> {text}</p>
                <div className="comment-labels">
                    <div className="same-line" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <p className='timestamp' style={{ fontSize: '11.5px' }} >
                            <ReactTimeAgo date={Date.parse(time)} locale="en-US" timeStyle="twitter" />
                        </p>
                        {
                            user?._id === context.auth._id &&
                            <button className='no-style' style={{ marginLeft: '6px', fontSize: '12px', cursor: 'pointer',height:'10px',marginTop:'-12px' }}>
                                {
                                  show &&   commentMore
                                }
                            </button>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
