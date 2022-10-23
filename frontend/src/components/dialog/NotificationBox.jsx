import React, { useEffect, useState } from 'react'
import { url } from '../../baseUrl'
import { api } from '../../Interceptor/apiCall'
import { Notification } from '../notification/Notification'

export const NotificationBox = () => {
    const [noti, setNoti] = useState([])
    useEffect(() => {
        api.get(`${url}/user/view/notifications`).then((res) => {
            setNoti(res.data)
        })
    }, [])
    return (
        <div style={{ fontSize: '14px', fontFamily: 'Questrial', padding: '15px 0px',marginTop:'-20px'}}>
            {
                noti?.length===0 && <p style={{fontSize:'16px',fontWeight:'bold',textAlign:'center',marginTop:'135px'}}>No notifications</p>
            }
            {
                noti.map(item =>
                    <Notification key={item._id} seen={item.seen} userId={item.user} content={item.content} postId={item.postId} NotificationType={item.NotificationType} followbtn={item.NotificationType === 3} time={item.time} />
                )
            }

        </div>
    )
}
