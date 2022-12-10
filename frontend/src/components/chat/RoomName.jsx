import React, { useEffect } from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import defaultImg from '../../assets/dafault.png'
import { url } from '../../baseUrl';
import { AuthContext } from '../../context/Auth';
import { api } from '../../Interceptor/apiCall';


export default function RoomName({ roomId }) {
    const context = useContext(AuthContext)
    const [roomName, setRoomName] = useState('')
    useEffect(() => {
        async function findRoomId() {
            api.get(`${url}/chat/${roomId}`).then(res => {
                const nameArr = res.data.people.filter(id => id !== context.auth._id)
                return api.get(`${url}/user/get/${nameArr[0]}`).then((res) => {
                    setRoomName(res.data.name);
                })
            }).then((resp => {
                console.log(resp.data);
                setRoomName(resp.data.name)
            })).catch(err => console.log(err))
        }
        findRoomId()
    }, [context.auth._id, roomId])
    return (
        <Link to={`/chats/${roomId}`} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: "18px 0", paddingLeft: '22px', cursor: 'pointer' }} >
            <img style={{ borderRadius: '50%', width: '55px' }} src={defaultImg} alt="" />
            <div className="nameandmsg" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '12px', }}>
                <p style={{ fontSize: '15.75px' }}>{roomName ? roomName : "...."}</p>
                <p style={{ fontSize: '14px', color: 'gray' }}>Heya</p>
            </div>
        </Link>
    )
}
