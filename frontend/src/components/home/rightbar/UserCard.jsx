import React from 'react'

export function UserCard({ avatar, username }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent:'space-between',width:'100%',marginBottom:'19px'}}>
            <div className="left" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <div className="user-img">
                    <img src={avatar && avatar} style={{ width: '39px', borderRadius: '50%', }} alt="" />
                </div>
                <div className="username">
                    <p style={{ fontSize: '12.75px', marginLeft: '9px',marginTop:'0px',fontWeight:'bold'}}>{username && username}</p>
                    <p style={{ fontSize: '10.85px', marginLeft: '9px',color:'gray',marginTop:'3.7px' }}>followed by neymor and 2 others</p>
                </div>
            </div>
            <div className="follow-btn">
            <button className='no-style'><p style={{ color: '#0095F6', fontSize: '12.55px'}}>Follow</p></button>
            </div>
        </div>
    )
}
