import React from "react";
import Card from "../components/Home/Post/Card";
import '../components/Home/home.css'
import Story from "../components/Home/Stories/Story";
import Right from "../components/Home/Rightbar/Right";

export default function Home() {
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
          <Card img="https://images.unsplash.com/photo-1525824617522-ca036119a052?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bWluaW1hbCUyMGRlc2slMjBzZXR1cHxlbnwwfHwwfHw%3D&w=1000&q=80" likes={1520} avatar="https://1.gravatar.com/avatar/767fc9c115a1b989744c755db47feb60?s=200&r=pg&d=mp" username="karen__." caption="Imperdiet in sit rhoncus, eleifend tellus augue lectus potenti pellentesque" comments={99} time={"3 hour ago"} />
          <Card img="https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F05407c79-a3dc-46d0-bc35-2b0b0a59374d.png?alt=media&token=65e0ba5c-5b86-463f-8364-d4f4ebc1ad8a" likes={120} avatar="https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F05407c79-a3dc-46d0-bc35-2b0b0a59374d.png?alt=media&token=65e0ba5c-5b86-463f-8364-d4f4ebc1ad8a" username="nisabmohd" caption="lorem ipsum koren chinese tea sugar potato" comments={99} time={"1 hour ago"} />
          <Card img="https://www.heart.org/-/media/AHA/H4GM/Article-Images/healthy-cooking.jpg?h=540&iar=0&mw=960&w=960&hash=D9CDF11543BB1E2BD169DF2D9C8B8675" likes={720} avatar="https://www.freecodecamp.org/news/content/images/2021/05/beau-carnes-gravatar.jpeg" username="helen01" caption="lorem ipsum koren chinese tea sugar potato" comments={99} time={"1 hour ago"} />
        </div>
      </div>
      <div className="right-home ">
        <Right/>
      </div>
    </div>
  );
}
