import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { moreIcons, commentIcon, emojiIcon, likeOutline, shareIcon, afterLike } from "../../../assets/svgIcons";
import { url } from "../../../baseUrl";
import { api } from "../../../Interceptor/apiCall";
import defaultImg from '../../../assets/dafault.png'
import ReactTimeAgo from 'react-time-ago'
import {AuthContext} from '../../../context/Auth'
import "./card.css";
import { useContext } from "react";

export default function Card({ img, likes, caption, time, comments, userId ,id}) {
    const context=useContext(AuthContext)
    const [commnetsCount, setCommentsCount] = useState(comments.length)
    const [likesCount, setLikesCount] = useState(likes.length)
    const [iLiked,setIliked]=useState(likes.includes(context.auth._id))
    const [user, setUser] = useState()
    useEffect(() => {
        api.get(`${url}/user/get/${userId}`).then(res => {
            console.log(res.data);
            setUser(res.data)
        })
    }, [userId])
    
    const commentRef = useRef()
    return (
        <div className="card">
            <div className="user-details" style={{ marginBottom: '7px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="left-details" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '12px' }}>
                    <div className="user-img">
                        {
                            <img src={user?.avatar ? user.avatar : defaultImg} style={{ minWidth: '35px',height:'35px',objectFit:'cover', borderRadius: '50%', }} alt="" />
                        }
                    </div>
                    <div className="username">
                        <p style={{ fontWeight: 'bold', fontSize: '13.35px', marginLeft: '9px' }}>{user?.username}</p>
                    </div>
                </div>
                <div className="right-details">
                    <button className="no-style" style={{ marginLeft: '-32px' }}>{moreIcons}</button>
                </div>
            </div>
            <div className="post" style={{ zIndex: '99' }}>
                <img style={{ width: '100.40%', marginLeft: '-0.72px' }}
                    src={img}
                    alt=""
                />
            </div>
            <div className="labels" style={{ marginTop: '9px', marginLeft: '9.2px', display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                <button className="no-style" style={{ marginRight: '12px' }} >
                    {
                        iLiked?afterLike:likeOutline
                    }
                </button>
                <button onClick={() => { commentRef.current.focus() }} className="no-style" style={{ marginRight: '12px' }} >
                    {commentIcon}
                </button>
                <button className="no-style" style={{ marginRight: '12px', marginBottom: '-3px', }} >
                    {shareIcon}
                </button>
            </div>
            <div className="likes-count" style={{ marginTop: '9px' }}>
                <p style={{ fontWeight: 'bold', fontSize: '13.35px', marginLeft: '9.2px' }}>{likesCount} likes</p>
            </div>
            <div className="caption" style={{ display: 'flex', flexDirection: 'row', alignItems: "center", marginTop: '8px' }}>{<p style={{ fontWeight: 'bold', fontSize: '13.75px', marginLeft: '9px' }}>{user?.username}</p>}<p style={{ fontSize: '13.79px', marginLeft: '5px' }}>{caption && caption}</p></div>
            {
                commnetsCount!==0 && <div className="comments" style={{ marginTop: '9px' }}><p style={{ fontSize: '13.59px', marginLeft: '9px', color: 'gray' }}>View all {commnetsCount} comments</p></div>
            }
            
            <div className="timestamp" style={{ marginTop: '7px' }}><p style={{ fontSize: '13.09px', marginLeft: '9px', color: 'gray' }}><ReactTimeAgo date={time} locale="en-US"/></p></div>
            <div className="addComment" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: '9px', marginTop: '22px', width: '95%', borderTop: '1px solid #dbdbdb', paddingTop: '15px' }}>
                <button className="no-style" >
                    {emojiIcon}
                </button>
                <input ref={commentRef} type="text" placeholder="Add a comment" style={{ width: '87%', height: '22px', outline: 'none', border: 'none', fontSize: '13px', paddingLeft: '9px' }} />
                <button className="no-style" style={{ color: '#0095F6', fontSize: '14.25px' }}>post</button>
            </div>
        </div>
    );
}
