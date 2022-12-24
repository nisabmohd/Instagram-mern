import React, { useEffect, useState } from 'react'
import { url } from '../../baseUrl'
import { api } from '../../Interceptor/apiCall'
import ReactTimeAgo from 'react-time-ago'
import defaultImg from '../../assets/dafault.png'
import { Link } from 'react-router-dom'
import { io } from 'socket.io-client'

export const Notification = ({ content, time, followbtn, postId = null, userId, seen }) => {
    const [user, setUser] = useState()
    const [post, setPost] = useState()
    useEffect(() => {
        api.get(`${url}/user/get/${userId}`).then(res => {
            setUser(res.data)
        }).catch(err => {
            console.log(err);
        })
    }, [userId])

    useEffect(() => {
        if (!postId) return
        api.get(`${url}/post/${postId}`).then(res => {
            setPost(res.data)
        }).catch(err => {
            console.log(err);
        })
    }, [postId])
    return (
        <div className='notification' style={{ display: 'flex', flexDirection: 'row', margin: '3px 0px', alignItems: 'flex-start', padding: '10px 20px' }}>
            <div className="user-img">
                <Link to={`/${user?.username}`} ><img src={user?.avatar ? user.avatar : defaultImg} style={{ minWidth: '44px', height: '44px', objectFit: 'cover', borderRadius: '50%', marginRight: '3px' }} alt="" /></Link>
            </div>
            <div className="username" style={{ display: 'flex', flexDirection: 'row', marginLeft: '4px', alignItems: 'center', marginTop: '4px' }}>
                <p style={{ fontSize: '12.99px', marginLeft: '4.2px', color: 'black', width: '95%' }}><Link to={`/${user?.username}`} style={{ fontWeight: 'bold', marginRight: '5px' }}>{user?.username}</Link>{content && content}</p>
                <p style={{ fontSize: '12.15px', marginLeft: '5.2px', color: 'gray', width: '50px' }}>{<ReactTimeAgo date={Date.parse(time)} locale="en-US" timeStyle="twitter" />}</p>
            </div>
            {
                followbtn && <button style={{ border: 'none', outline: 'none', background: 'blue', padding: '1px 5px', borderRadius: '5px', color: 'white', backgroundColor: '#2196f3', fontSize: '13px', width: '65px', fontWeight: 'bold', marginLeft: 'auto', height: '30px' }}>Follow</button>
            }
            {
                post && postId && <img style={{ width: '45px', height: '45px', objectFit: 'cover', marginLeft: 'auto', }} src={post.files[0].link} alt="" />
            }

        </div>
    )
}
