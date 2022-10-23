import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { moreIcons, commentIcon, emojiIcon, likeOutline, shareIcon, afterLike, saveHome, saveIconOutline } from "../../../assets/svgIcons";
import { url } from "../../../baseUrl";
import { api } from "../../../Interceptor/apiCall";
import defaultImg from '../../../assets/dafault.png'
import ReactTimeAgo from 'react-time-ago'
import { AuthContext } from '../../../context/Auth'
import "./card.css";
import { useContext } from "react";
import {Link} from 'react-router-dom'

export default function Card({ img, likes, caption, time, comments, userId, id, saved }) {
    const context = useContext(AuthContext)
    const [comment, setComment] = useState('')
    const [commnetsCount, setCommentsCount] = useState(comments.length)
    const [likesCount, setLikesCount] = useState(likes.length)
    const [iLiked, setIliked] = useState(likes.includes(context.auth._id))
    const [user, setUser] = useState()
    const [iSaved, setIsaved] = useState(saved.includes(context.auth._id))

    useEffect(() => {
        api.get(`${url}/user/get/${userId}`).then(res => {
            setUser(res.data)
        })
    }, [userId])

    function handleLike() {
        api.put(`${url}/post/handlelike/${id}`).then((res) => {
            if (res.data) {
                if (iLiked) {
                    setLikesCount((prev) => prev - 1)
                } else {
                    setLikesCount((prev) => prev + 1)
                }
                setIliked(prev => !prev)
            }
        }).catch(err => console.log(err))

    }
    function handleComment() {
        api.post(`${url}/post/addcomment/${id}`, {
            comment
        }).then(res => {
            if (res.data) {
                setCommentsCount(prev => prev + 1)
                setComment('')
            }
        }).catch(err => console.log(err))
    }
    function handleSave() {
        api.get(`${url}/post/handlesave/${id}`).then(res => {
            if (res.data) {
                setIsaved(prev => !prev)
            }
        })
    }
    const commentRef = useRef()
    return (
        <div className="card">
            <div className="user-details" style={{ marginBottom: '7px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="left-details" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '12px' }}>
                    <div className="user-img">
                        {
                            <Link to={user?.username}><img src={user?.avatar ? user.avatar : defaultImg} style={{ minWidth: '35px', height: '35px', objectFit: 'cover', borderRadius: '50%', }} alt="" /></Link>
                        }
                    </div>
                    <div className="username">
                        <Link to={user?.username} style={{ fontWeight: 'bold', fontSize: '13.35px', marginLeft: '9px' }}>{user?.username}</Link>
                    </div>
                </div>
                <div className="right-details">
                    <button className="no-style" style={{ marginLeft: '-32px' }}>{moreIcons}</button>
                </div>
            </div>
            <div className="post" style={{ zIndex: '99' }}>
                <img style={{ width: '100.20%', marginLeft: '-0.92px' }}
                    src={img}
                    alt=""
                />
            </div>
            <div className="labels" style={{ marginTop: '9px', marginLeft: '9.2px', display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                <button onClick={() => handleLike()} className="no-style" style={{ marginRight: '12px' }} >
                    {
                        iLiked ? afterLike : likeOutline
                    }
                </button>
                <button onClick={() => { commentRef.current.focus() }} className="no-style" style={{ marginRight: '12px' }} >
                    {commentIcon}
                </button>
                <button className="no-style" style={{ marginRight: '12px', marginBottom: '-3px', }} >
                    {shareIcon}
                </button>
                <button onClick={() => handleSave()} className="no-style" style={{ marginRight: '12px', marginBottom: '-3px', marginLeft: 'auto' }} >
                    {
                        !iSaved ? saveIconOutline : saveHome
                    }
                </button>
            </div>
            <div className="likes-count" style={{ marginTop: '9px' }}>
                <p style={{ fontWeight: 'bold', fontSize: '13.35px', marginLeft: '9.2px' }}>{likesCount} likes</p>
            </div>
            <div className="caption" style={{ display: 'flex', flexDirection: 'row', alignItems: "center", marginTop: '8px' }}>{<p style={{ fontWeight: 'bold', fontSize: '13.75px', marginLeft: '9px' }}>{user?.username}</p>}<p style={{ fontSize: '13.79px', marginLeft: '5px' }}>{caption && caption}</p></div>
            {
                commnetsCount !== 0 && <div className="comments" style={{ marginTop: '9px' }}><p style={{ fontSize: '13.59px', marginLeft: '9px', color: 'gray' }}>View all {commnetsCount} comments</p></div>
            }

            <div className="timestamp" style={{ marginTop: '7px' }}><p style={{ fontSize: '13.09px', marginLeft: '9px', color: 'gray' }}><ReactTimeAgo date={Date.parse(time)} locale="en-US" /></p></div>
            <div className="addComment" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: '9px', marginTop: '22px', width: '95%', borderTop: '1px solid #dbdbdb', paddingTop: '15px' }}>
                <button className="no-style" >
                    {emojiIcon}
                </button>
                <input value={comment} onChange={e => setComment(e.target.value)} ref={commentRef} type="text" placeholder="Add a comment" style={{ width: '87%', height: '22px', outline: 'none', border: 'none', fontSize: '13px', paddingLeft: '9px' }} />
                {
                    comment ?
                        <button onClick={() => handleComment()} className="no-style" style={{ color: '#0095F6', fontSize: '14.25px' }}>post</button>
                        : <button disabled={true} className="no-style" style={{ color: 'rgb(157 161 163)', fontSize: '14.25px', cursor: 'not-allowed' }}>post</button>
                }
            </div>
        </div>
    );
}
