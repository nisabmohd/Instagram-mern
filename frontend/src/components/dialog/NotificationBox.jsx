import React, { useEffect, useState } from 'react'
import { url } from '../../baseUrl'
import { api } from '../../Interceptor/apiCall'
import { Notification } from '../notification/Notification'
import { Spinner } from '../../assets/Spinner'

export const NotificationBox = () => {
    const [noti, setNoti] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        api.get(`${url}/user/view/notifications`).then((res) => {
            setNoti(res.data)
        }).finally(() => {
            setLoading(false)
        })
    }, [])
    return (
        <div style={{ fontSize: '14px', fontFamily: 'Poppins', padding: '15px 0px', marginTop: '-5px' }}>
            {
                noti?.length === 0 && loading && <Spinner />
            }
            {
                noti?.length === 0 && !loading && <p style={{ fontSize: '14px', textAlign: 'center', marginTop: '39px' }}>Nothing to see here</p>
            }
            {
                noti.map(item =>
                    <Notification key={item._id} seen={item.seen} userId={item.user} content={item.content} postId={item.postId} NotificationType={item.NotificationType} followbtn={item.NotificationType === 3} time={item.time} />
                )
            }

        </div>
    )
}
