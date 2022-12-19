import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { url } from '../../../baseUrl'
import { api } from '../../../Interceptor/apiCall'
import defaultImg from '../../../assets/dafault.png'
// import { useContext } from 'react'
import { Link } from 'react-router-dom'
// import { AuthContext } from '../../../context/Auth'

export default function Story({ seen, owner, id }) {
  // const context = useContext(AuthContext)
  const [user, setUser] = useState()
  // border: !seen?.includes(context.auth._id) && '3px solid #DE0046',
  useEffect(() => {
    api.get(`${url}/user/get/${owner}`).then(res => setUser(res.data)).catch(err => console.log(err))
  }, [owner])
  return (
    <Link to={`/story/${user?._id}?id=${id}`} style={{ display: 'flex', flexDirection: 'column', margin: '0 10px', width: '55px' }}>
      <div className="image" style={{ width: '64px', height: '64px', borderRadius: '50%', marginBottom: '5px', display: 'flex', alignItems: "center", justifyContent: 'center' }}>
        <img src={user?.avatar || defaultImg} style={{ width: '62px', height: '62px', borderRadius: '50%', padding: '4px' }} alt="" />
      </div>
      <p style={{ fontSize: '13px', textAlign: 'center' }}>{user && user.username.slice(0, 7) + "..."}</p>
    </Link>
  )
}
