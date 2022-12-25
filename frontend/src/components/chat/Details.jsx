import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { url } from '../../baseUrl'
import { AuthContext } from '../../context/Auth'
import { api } from '../../Interceptor/apiCall'
import UserCardDetails from './UserCardDetails'

export default function Details({ handleDetailsToggle, roomId, handleLeaveChat }) {
    const [people, setPeople] = useState([])
    const context = useContext(AuthContext)
    useEffect(() => {
        api.get(`${url}/chat/${roomId}`).then((resp) => {
            setPeople(resp.data.people.filter(item => item !== context.auth._id))
        }).catch(err => console.log(err))

    }, [context.auth._id, roomId])

    return (
        <div className="details_room_page">
            <div className="header_chat" style={{ width: '100%', borderBottom: '1px solid #dbdbdb', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p>&nbsp;</p>
                <p style={{ marginLeft: '10px', fontSize: '16.5px' }}>Details</p>
                <div onClick={() => handleDetailsToggle()} className="svg_info" style={{ marginRight: '18px', marginTop: '5.5px', cursor: 'pointer' }}>
                    <svg aria-label="Navigate back to chat from thread details" className="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12.001.504a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm-.182 5.955a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25Zm1.614 11.318h-2.865a1 1 0 0 1 0-2H11V12.05h-.432a1 1 0 0 1 0-2H12a1 1 0 0 1 1 1v4.727h.433a1 1 0 1 1 0 2Z"></path></svg>
                </div>
            </div>
            <div className="memebers" style={{ padding: '0 15px', borderBottom: '1px solid #dbdbdb' }}>
                <p style={{ marginLeft: '10px', fontSize: '15.5px', marginTop: '18px', marginBottom: '8px' }}>Members</p>
                {
                    people.map(userId => <UserCardDetails showOnline={true} key={userId} uid={userId} />)
                }

            </div>
            <div className="options_chat" style={{ padding: '0 15px', borderBottom: '1px solid #dbdbdb' }}>
                <p onClick={() => handleLeaveChat()} style={{ marginLeft: '10px', fontSize: '14.5px', marginTop: '18px', marginBottom: '15px', color: '#e87e7e', cursor: 'pointer' }}>{people.length !== 1 ? "Leave chat" : "Delete chat"}</p>
            </div>
        </div>
    )
}
