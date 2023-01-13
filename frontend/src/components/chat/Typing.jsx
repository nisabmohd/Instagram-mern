import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import defaultImg from '../../assets/dafault.png'
import { url } from '../../baseUrl'
import type from '../../assets/typing.gif'
import { api } from '../../Interceptor/apiCall'

export default function Typing({ user: userID }) {
    const [user, setUser] = useState({})
    useEffect(() => {
        api.get(`${url}/user/get/${userID}`).then((res => setUser(res.data))).catch(err => console.log(err))
    }, [userID])

    return (
        <div className="other_partytext" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop: '18px', }}>
            <Link to={`/${user?.username}`}>
                <img style={{ width: '30px', borderRadius: '50%', marginBottom: '-7px', marginLeft: '18px' }} src={user?.avatar || defaultImg} alt="" />
            </Link>
            <div className="other_text" style={{ width: 'fit-content', marginLeft: '12px', backgroundColor: '#dbdbdb', color: 'black', padding: '10px 16px', borderRadius: '22px', maxWidth: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img style={{ width: '25px' }} src={type} alt="" />
            </div>
        </div>
    )
}
