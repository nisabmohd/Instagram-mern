import React from 'react'

export const Notification = ({ avatar, username, content, time, followbtn,img }) => {
    return (
        <div className='notification' style={{ display: 'flex', flexDirection: 'row' }}>
            <div className="user-img">
                <img src={avatar && avatar} style={{ width: '44px', borderRadius: '50%', }} alt="" />
            </div>
            <div className="username" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <p style={{ fontSize: '13.67px', marginLeft: '9px', fontWeight: 'bold', marginTop: '-1px' }}>{username && username}</p>
                <p style={{ fontSize: '12.99px', marginLeft: '4.2px', color: 'black' }}>{content && content}</p>
                <p style={{ fontSize: '12.45px', marginLeft: '4.2px', color: 'gray' }}>{time && time}</p>
            </div>
            {
                followbtn && <button style={{ border: 'none', outline: 'none', background: 'blue', padding: '1px 5px', borderRadius: '5px', color: 'white', backgroundColor: '#2196f3', fontSize: '13px', width: '65px', fontWeight: 'bold', marginLeft: 'auto', height: '30px' }}>Follow</button>
            }
            {
                img && <img style={{width:'45px',height:'45px',objectFit:'cover', marginLeft: 'auto',}} src="https://www.visitdubai.com/-/media/gathercontent/poi/s/skydive-dubai/fallback-image/sky-dive-dubai-3.jpg" alt="" />
            }

        </div>
    )
}
