import React, { useEffect } from "react";
import Card from "../components/home/post/Card";
import '../components/home/home.css'
import Story from "../components/home/stories/Story";
import Right from "../components/home/rightbar/Right";
import { api } from '../Interceptor/apiCall'
import { url } from "../baseUrl";
import { useState } from "react";
import { Spinner } from "../assets/Spinner";

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])
  useEffect(() => {
    api.get(`${url}/post/get/home`).then((res) => {
      setPosts(res.data)
    }).finally(() => {
      setLoading(false)
    })

    return () => {
      setPosts([])
    }
  }, [])

  return (
    <div className="home">
      <div className="left-home">
        <div className="stories">
          <Story avatar="https://1.gravatar.com/avatar/767fc9c115a1b989744c755db47feb60?s=200&r=pg&d=mp" username="keren__." seen={false} />
          <Story avatar="https://www.freecodecamp.org/news/content/images/2021/05/beau-carnes-gravatar.jpeg" username="helen321" seen={false} />
          <Story avatar="https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F05407c79-a3dc-46d0-bc35-2b0b0a59374d.png?alt=media&token=65e0ba5c-5b86-463f-8364-d4f4ebc1ad8a" username="unknown__" seen={false} />
          <Story avatar="https://1.gravatar.com/avatar/767fc9c115a1b989744c755db47feb60?s=200&r=pg&d=mp" username="keren__." seen={false} />
          <Story avatar="https://www.freecodecamp.org/news/content/images/2021/05/beau-carnes-gravatar.jpeg" username="helen321" seen={false} />
          <Story avatar="https://1.gravatar.com/avatar/767fc9c115a1b989744c755db47feb60?s=200&r=pg&d=mp" username="keren__." seen={false} />
          <Story avatar="https://www.freecodecamp.org/news/content/images/2021/05/beau-carnes-gravatar.jpeg" username="helen321" seen={false} />
          <Story avatar="https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F05407c79-a3dc-46d0-bc35-2b0b0a59374d.png?alt=media&token=65e0ba5c-5b86-463f-8364-d4f4ebc1ad8a" username="unknown__" seen={false} />
          <Story avatar="https://1.gravatar.com/avatar/767fc9c115a1b989744c755db47feb60?s=200&r=pg&d=mp" username="keren__." seen={false} />
          <Story avatar="https://www.freecodecamp.org/news/content/images/2021/05/beau-carnes-gravatar.jpeg" username="helen321" seen={false} />
          <Story avatar="https://1.gravatar.com/avatar/767fc9c115a1b989744c755db47feb60?s=200&r=pg&d=mp" username="keren__." seen={false} />
          <Story avatar="https://www.freecodecamp.org/news/content/images/2021/05/beau-carnes-gravatar.jpeg" username="helen321" seen={false} />
          <Story avatar="https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F05407c79-a3dc-46d0-bc35-2b0b0a59374d.png?alt=media&token=65e0ba5c-5b86-463f-8364-d4f4ebc1ad8a" username="unknown__" seen={false} />
          <Story avatar="https://1.gravatar.com/avatar/767fc9c115a1b989744c755db47feb60?s=200&r=pg&d=mp" username="keren__." seen={false} />
          <Story avatar="https://www.freecodecamp.org/news/content/images/2021/05/beau-carnes-gravatar.jpeg" username="helen321" seen={false} />
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
              <Card key={item._id} id={item._id} img={item.images[0]} likes={item.likes} saved={item.saved} userId={item.owner} avatar="https://1.gravatar.com/avatar/767fc9c115a1b989744c755db47feb60?s=200&r=pg&d=mp" username="karen__." caption={item.caption} comments={item.comments} time={item.createdAt} />
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
