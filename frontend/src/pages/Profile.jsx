import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Image } from '../components/post/Image'
import defaultimg from '../assets/dafault.png'
import { Spinner } from '../assets/Spinner'
import { url } from '../baseUrl'
import { api } from '../Interceptor/apiCall'

export const Profile = ({ post = true }) => {
  const [user, setUser] = useState()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const params = useParams()
  useEffect(() => {
    api.get(`${url}/user/${params.username}`).then(resp => {
      setUser(resp.data)
    }).catch(err => console.log(err))
  }, [params.username])
  useEffect(() => {
    if (!user) return
    if (post) {
      api.get(`${url}/post/userpost/${user?._id}`).then((data) => {
        setLoading(false)
        if (data) {
          console.log(data.data);
          setPosts(data.data);
        }
      })
    }
    if (!post) {
      api.get(`${url}/post/get/saved`).then((data) => {
        setLoading(false)
        if (data) {
          console.log(data.data);
          setPosts(data.data);
        }
      })
    }

  }, [post, user])
  return (
    <div className='home' style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="user-info" style={{ display: 'flex', flexDirection: 'row', width: '84%', margin: 'auto', marginTop: '20px' }}>
        <div className="image-user">
          <div className="imageuser" style={{ width: '155px', height: '155px', borderRadius: '50%', border: '3px solid #c1c1c1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px', objectFit: 'cover' }}>
            {
                <img src={user?.avatar?user.avatar:defaultimg} style={{ minWidth: '145px', height: '145px', borderRadius: '50%', objectFit: 'cover' }} alt="" />
                
            }
          </div>
        </div>
        <div className="follow-details" style={{ marginLeft: '5vw' }}>
          <div className="samline" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <p style={{ fontSize: '29px', marginRight: '22px', fontWeight: 'lighter', color: '#424141' }}>{user?.username}</p>
            <button style={{ border: '1px solid #c1c1c1', padding: '4px 7px', fontSize: '14px', borderRadius: '4px', fontWeight: 'bold', marginRight: '22px', color: '#424141' }}>Edit Profile</button>
            <button className='no-style'><svg aria-label="Options" className="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg></button>
          </div>
          <div className="singleline" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '20px' }}>
            <p style={{ marginRight: '28px' }}><span style={{ fontWeight: 'bold', marginRight: '4px' }}>{user?.posts?.length}</span> Posts</p>
            <p style={{ marginRight: '28px' }}><span style={{ fontWeight: 'bold', marginRight: '4px' }}>{user?.followers?.length}</span> Followers</p>
            <p style={{ marginRight: '28px' }}><span style={{ fontWeight: 'bold', marginRight: '4px' }}>{user?.followings?.length}</span> Followings</p>
          </div>
          <div className="bioandstuff" style={{ marginTop: '20px' }}>
            <p style={{ fontWeight: 'bold' }}>{user?.name}</p>
            <p style={{ marginTop: '4px', marginBottom: '3px' }}>{user?.bio ? user.bio : "-"}</p>
            {
              user?.website &&
              <a href={user?.website} target="_blank" style={{ marginTop: '10px', color: '#0e4378', fontWeight: 'bold' }} rel="noreferrer">{user?.website.replace('https://', '')}</a>
            }
          </div>
        </div>
      </div>
      <div className="highlights" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '88%', margin: 'auto', marginTop: '42px', }}>
        <div className="highlight-story" style={{ display: 'flex', flexDirection: 'column', marginRight: '35px' }}>
          <div className="imageuser" style={{ width: '85px', height: '85px', borderRadius: '50%', border: '3px solid #c1c1c1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px', }}>
            <img src="https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" style={{ width: '75px', height: '75px', borderRadius: '50%', objectFit: 'cover' }} alt="" />
          </div>
          <p style={{ textAlign: 'center', marginTop: '4px', fontSize: '14px', fontWeight: 'bold', color: '#424141' }}>Highlights</p>
        </div>
        <div className="highlight-story" style={{ display: 'flex', flexDirection: 'column', marginRight: '35px' }}>
          <div className="imageuser" style={{ width: '85px', height: '85px', borderRadius: '50%', border: '3px solid #c1c1c1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px', }}>
            <img src="https://images.unsplash.com/photo-1666202566722-26e17e78cb07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" style={{ width: '75px', height: '75px', borderRadius: '50%', objectFit: 'cover' }} alt="" />
          </div>
          <p style={{ textAlign: 'center', marginTop: '4px', fontSize: '14px', fontWeight: 'bold', color: '#424141' }}>Highlights</p>
        </div>
        <div className="highlight-story" style={{ display: 'flex', flexDirection: 'column', marginRight: '35px' }}>
          <div className="imageuser" style={{ width: '85px', height: '85px', borderRadius: '50%', border: '3px solid #c1c1c1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px', }}>
            <img src="https://images.unsplash.com/photo-1666207482115-53756be8a995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80" style={{ width: '75px', height: '75px', borderRadius: '50%', objectFit: 'cover' }} alt="" />
          </div>
          <p style={{ textAlign: 'center', marginTop: '4px', fontSize: '14px', fontWeight: 'bold', color: '#424141' }}>Highlights</p>
        </div>
        <div className="highlight-story" style={{ display: 'flex', flexDirection: 'column', marginRight: '35px' }}>
          <div className="imageuser" style={{ width: '85px', height: '85px', borderRadius: '50%', border: '3px solid #c1c1c1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px', }}>
            <img src="https://images.unsplash.com/photo-1666202566722-26e17e78cb07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" style={{ width: '75px', height: '75px', borderRadius: '50%', objectFit: 'cover' }} alt="" />
          </div>
          <p style={{ textAlign: 'center', marginTop: '4px', fontSize: '14px', fontWeight: 'bold', color: '#424141' }}>Highlights</p>
        </div>
        <div className="highlight-story" style={{ display: 'flex', flexDirection: 'column', marginRight: '35px' }}>
          <div className="imageuser" style={{ width: '82px', height: '82px', borderRadius: '50%', border: '1px solid #c1c1c1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px', }}>
            <svg aria-label="Plus icon" className="_ab6-" color="#c7c7c7" fill="#c7c7c7" height="44" role="img" viewBox="0 0 24 24" width="44"><path d="M21 11.3h-8.2V3c0-.4-.3-.8-.8-.8s-.8.4-.8.8v8.2H3c-.4 0-.8.3-.8.8s.3.8.8.8h8.2V21c0 .4.3.8.8.8s.8-.3.8-.8v-8.2H21c.4 0 .8-.3.8-.8s-.4-.7-.8-.7z"></path></svg>
          </div>
          <p style={{ textAlign: 'center', marginTop: '4px', fontSize: '14px', fontWeight: 'bold', color: '#424141' }}>New</p>
        </div>

      </div>
      <div className="post-section" style={{ borderTop: '1px solid #d2cfcf', marginTop: '54px' }}>
        <div className="tab-select" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <Link to={`/${user?.username}`} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: '18px 18px', borderTop: post ? '1px solid black' : '', paddingTop: '22px', marginTop: '-0.5px', width: '79px', paddingRight: '4px' }}>
            <svg aria-label="" className="_ab6-" color="#262626" fill="#262626" height="12" role="img" viewBox="0 0 24 24" width="12"><rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>
            <p style={{ fontSize: '12.4px', color: post ? 'black' : 'gray', marginLeft: '4px', fontWeight: post ? 'bold' : 'normal' }}>POSTS</p>
          </Link>
          <Link to={`/saved/${user?.username}`} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: '18px 18px', borderTop: !post ? '1px solid black' : '', paddingTop: '22px', marginTop: '-0.5px', width: '79px', paddingRight: '4px' }}>
            <svg aria-label="" className="_ab6-" color="#8e8e8e" fill="#8e8e8e" height="12" role="img" viewBox="0 0 24 24" width="12"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
            <p style={{ fontSize: '12.4px', color: !post ? 'black' : 'gray', marginLeft: '4px', fontWeight: !post ? 'bold' : 'normal' }}>SAVED</p>
          </Link>
        </div>
        <div className="post-content">
          {
            posts.length === 0 && loading && <Spinner />
          }

          {
            posts.length === 0 && !loading && <p style={{ textAlign: 'center', marginTop: '72px', width: '100%' ,fontWeight:'bold',fontSize:'16px'}}>No posts to see</p>
          }

          {
            post ?
              <div className='grid' style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', rowGap: '17px' }}>
                {
                  posts?.map(item =>
                    <Image key={item._id} src={item.images[0]}></Image>
                  )
                }

              </div> : <div className='grid' style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', rowGap: '17px' }}>
                {
                  posts?.map(item =>
                    <Image key={item._id} src={item.images[0]}></Image>
                  )
                }
              </div>
          }
        </div>
      </div>
    </div>
  )
}
