import React, { useEffect } from 'react'
import { useState } from 'react'
import defaultImg from '../../assets/dafault.png'
import { url } from '../../baseUrl'
import { api } from '../../Interceptor/apiCall'
import { Link } from 'react-router-dom'

export default function OtherMessage({ msg }) {
    const [user, setUser] = useState({})

    useEffect(() => {
        api.get(`${url}/user/get/${msg?.uid}`).then((res => setUser(res.data))).catch(err => console.log(err))
    }, [msg.uid])

    return (
        msg.message === "like_true" ?
            <div className="other_partytext" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '18px', }}>
                <Link to={`/${user?.username}`}>
                    <img style={{ width: '30px', borderRadius: '50%', marginBottom: '-7px', marginLeft: '18px' }} src={user?.avatar || defaultImg} alt="" />
                </Link>
                <div className="other_text" style={{ width: 'fit-content', marginLeft: '12px', color: 'black', padding: '10px 16px', borderRadius: '22px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '22px' }}>
                    <svg aria-label="Like" className="_ab6-" color="#ed4956" fill="#ed4956" height="44" role="img" viewBox="0 0 48 48" width="44"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                </div>
            </div>
            :
            msg.file ?
                <div className="other_partytext" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop: '18px', }}>
                    <Link to={`/${user?.username}}`}>
                        <img style={{ width: '30px', borderRadius: '50%', marginBottom: '-7px', marginLeft: '18px' }} src={user?.avatar || defaultImg} alt="" />
                    </Link>
                    <div className="other_text" style={{ width: 'fit-content', marginLeft: '12px', color: 'black', padding: '10px 16px', borderRadius: '22px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '22px' }}>
                        <img style={{ maxWidth: '400px', borderRadius: '14px', border: '1px solid #e3e3e3', marginLeft: '-8px' }} src={msg.message} alt="img" />
                    </div>
                </div>
                :
                <div className="other_partytext" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop: '18px', }}>
                    <Link to={`/${user?.username}`}>
                        <img style={{ width: '30px', borderRadius: '50%', marginBottom: '-7px', marginLeft: '18px' }} src={user?.avatar || defaultImg} alt="" />
                    </Link>
                    <div className="other_text" style={{ width: 'fit-content', marginLeft: '12px', backgroundColor: '#dbdbdb', color: 'black', padding: '10px 16px', borderRadius: '22px', maxWidth: '60%' }}>
                        {msg.message}
                    </div>
                </div>
    )
}
