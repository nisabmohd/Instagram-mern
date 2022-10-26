import React, { useEffect, useState } from 'react'
import { url } from '../../baseUrl'
import { api } from '../../Interceptor/apiCall'
import { User } from './User'

export const Followers = ({ userId, toggle }) => {
  const [users,setUsers]=useState([])
  console.log(userId);
  useEffect(() => {
    if (!userId) return
    if (toggle === 1)
      api.get(`${url}/user/followers/${userId}`).then((res) => {
        console.log(res.data);
        setUsers(res.data)
      })
    if (toggle === 2)
      api.get(`${url}/user/followings/${userId}`).then((res) => {
        console.log(res.data);
        setUsers(res.data)
      })
  }, [toggle, userId])
  return (
    <>
    {
      users.map((item=><User key={item._id} user={item} />))

    }
    </>
  )
}
