import React from 'react'

export const Notification = ({ avatar, username, content, time }) => {
    return (
        <div className='notification' style={{ display: 'flex', flexDirection: 'row' }}>
            <div className="user-img">
                <img src={avatar && avatar} style={{ width: '35px', borderRadius: '50%', }} alt="" />
            </div>
            <div className="username" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <p style={{ fontSize: '13px', marginLeft: '9px', fontWeight: 'bold', marginTop: '-1px' }}>{username && username}</p>
                <p style={{ fontSize: '12.15px', marginLeft: '4.2px', color: 'black' }}>{content && content}</p>
                <p style={{ fontSize: '12.15px', marginLeft: '4.2px', color: 'gray' }}>{time && time}</p>
            </div>
        </div>
    )
}
