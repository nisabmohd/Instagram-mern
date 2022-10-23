import React, { useEffect } from 'react'
import { Masonary } from '../components/explore/Masonary'
import '../components/home/home.css'
import { api } from '../Interceptor/apiCall'
import { url } from '../baseUrl'
import { useState } from 'react'
import { Spinner } from '../assets/Spinner'

export default function Explore() {
  const [posts, setPost] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    api.get(`${url}/post/get/explore`).then(res => {
      console.log(res.data);
      setPost(res.data)
    }).finally(() => {
      setLoading(false)
    })

    return () => {
      setPost([])
    }
  }, [])
  return (
    <div className='home'>
      {
        posts.length === 0 && loading && <Spinner />
      }
      {
        posts.length === 0 && !loading && <p style={{ textAlign: 'center', marginTop: '32px', width: '100%', fontWeight: 'bold', fontSize: '16px' }}>No posts to see</p>
      }
      <Masonary posts={posts} />
    </div>
  )
}
