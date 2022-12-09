import React, { } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { url } from '../../baseUrl'
import { AuthContext } from '../../context/Auth'
import { api } from '../../Interceptor/apiCall'
import defaultImg from '../../assets/dafault.png'


export default function RoomName({ people }) {
    const context = useContext(AuthContext)
    const id = people.filter((id) => id !== context.auth._id)
    const [user, setUser] = useState()
    useEffect(() => {
        if (!id) return
        async function findUser() {
            const res = await api.get(`${url}/user/get/${id}`)
            setUser(res.data)
        }
        findUser()
    }, [id])
    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: "18px 0", paddingLeft: '22px' }}>
            <img style={{ borderRadius: '50%', width: '55px' }} src={user?.avatar ? user.avatar : defaultImg} alt="" />
            <div className="nameandmsg" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '12px', }}>
                <p style={{ fontSize: '15.75px' }}>{user?.name}</p>
                <p style={{ fontSize: '14px', color: 'gray' }}>Heya</p>
            </div>
        </div>
    )
}
