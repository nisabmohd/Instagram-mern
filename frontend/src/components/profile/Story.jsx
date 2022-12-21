import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import defaultImg from '../../assets/dafault.png'
import { url } from '../../baseUrl'
import { AuthContext } from '../../context/Auth'
import { api } from '../../Interceptor/apiCall'

export default function Story({ avatar, uid, profile }) {
    const [story, setStrory] = useState([])
    const [iSaw, setisaw] = useState(true)

    const context = useContext(AuthContext)

    useEffect(() => {
        if (!uid) return;
        api.get(`${url}/story/user/${uid}`).then((res) => {
            console.log(res.data);
            const seenAll = res.data.reduce((prev, item) => prev && item.seen.includes(context.auth._id), true)
            console.log(seenAll);
            setisaw(seenAll);
            setStrory(res.data)
        }).catch(err => console.log(err))
    }, [context.auth._id, uid])

    return (
        <>
            {
                story.length !== 0 ?
                    <Link to={`/story/${uid}?id=${story[0].id}&profile=${profile}`} className="imageuser" style={{ borderRadius: '50%', border: story.length !== 0 ? iSaw ? '3px solid #c1c1c1' : '3px solid #DE0046' : '', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px', objectFit: 'cover' }}>
                        {
                            <img className='pf' src={avatar || defaultImg} style={{ minWidth: '145px', height: '145px', borderRadius: '50%', objectFit: 'cover' }} alt="" />
                        }
                    </Link> :

                    <div className="imageuser" style={{ borderRadius: '50%', border: story.length !== 0 ? iSaw ? '3px solid #c1c1c1' : '3px solid #DE0046' : '', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px', objectFit: 'cover' }}>
                        {
                            <img className='pf' src={avatar || defaultImg} style={{ minWidth: '145px', height: '145px', borderRadius: '50%', objectFit: 'cover' }} alt="" />
                        }
                    </div>
            }
        </>
    )
}
