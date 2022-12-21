import React, { useContext, useEffect } from "react";
import Card from "../components/home/post/Card";
import '../components/home/home.css'
import Right from "../components/home/rightbar/Right";
import { api } from '../Interceptor/apiCall'
import { url } from "../baseUrl";
import { useState } from "react";
import { Spinner } from "../assets/Spinner";
import { AuthContext } from "../context/Auth";
import StoryContainer from "../components/home/stories/StoryContainer";

export default function Home({ stories }) {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const context = useContext(AuthContext)
  useEffect(() => {
    api.get(`${url}/post/get/home`).then((res) => {
      setPosts(res.data)
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      setLoading(false)
    })

    return () => {
      setPosts([])
    }

  }, [])

  useEffect(() => {
    context.handleActive("home")
  }, [context])

  function filterPosts(id) {
    setPosts(posts => posts.filter(item => item._id !== id))
  }
  function filterUserPosts(uid) {
    setPosts(posts => posts.filter(item => item.owner !== uid))
  }
  function newPost(post) {
    setPosts(posta => [post, ...posts])
  }
  context.newpost = newPost

  return (
    <div className="home">
      <div className="left-home">
        <div className="stories">
          <StoryContainer stories={stories} />
        </div>
        <div className="posts">
          {
            posts?.length === 0 && loading && <Spinner />
          }

          {
            posts?.length === 0 && !loading && <p style={{ textAlign: 'center', marginTop: '32px', width: '100%', fontWeight: 'bold', fontSize: '16px' }}>No posts to see</p>
          }
          {
            posts.map(item =>
              <Card filterUserPosts={filterUserPosts} filterPosts={filterPosts} key={item._id} id={item._id} img={item.files[0].link} likes={item.likes} saved={item.saved} userId={item.owner} avatar="https://1.gravatar.com/avatar/767fc9c115a1b989744c755db47feb60?s=200&r=pg&d=mp" username="karen__." caption={item.caption} comments={item.comments} time={item.createdAt} />
            )

          }
        </div>
      </div>
      <div className="right-home ">
        <Right />
      </div>
    </div>
  );
}
