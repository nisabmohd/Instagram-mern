import React from 'react'

export function UserCard({ avatar, username }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent:'space-between',width:'100%',marginBottom:'15px'}}>
            <div className="left" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <div className="user-img">
                    <img src={avatar && avatar} style={{ width: '35px', borderRadius: '50%', }} alt="" />
                </div>
                <div className="username">
                    <p style={{ fontSize: '12.95px', marginLeft: '9px',marginTop:'-3px',fontWeight:'bold'}}>{username && username}</p>
                    <p style={{ fontSize: '12.15px', marginLeft: '9px',color:'gray',marginTop:'3.7px' }}>followed bt neymor and 2 others</p>
                </div>
            </div>
            <div className="follow-btn">
            <button className='no-style'><p style={{ color: '#0095F6', fontSize: '12.55px' }}>Follow</p></button>
            </div>
        </div>
    )
}
