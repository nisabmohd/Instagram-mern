import React from 'react'
import { useEffect } from 'react'
import { api } from '../../Interceptor/apiCall'
import { url } from '../../baseUrl'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import defaultImg from '../../assets/dafault.png'
import { afterLike, commentIcon, emojiIcon, likeOutline, moreIcons, saveHome, saveIconOutline, shareIcon } from '../../assets/svgIcons'
import ReactTimeAgo from 'react-time-ago'
import { useRef } from 'react'

export const Post = ({ postId, userId }) => {
    console.log(userId);
    const [post, setPost] = useState()
    const [comment, setComment] = useState('')
    const [iLiked, setIliked] = useState(false)
    const [iSaved, setIsaved] = useState(false)
    const [likesCount, setLikesCount] = useState(0)
    const [user, setUser] = useState()
    const inputRef = useRef()

    useEffect(() => {
        api.get(`${url}/user/get/${userId}`).then(res => {
            console.log("user", res.data);
            setUser(res.data)
        })
    }, [userId])

    useEffect(() => {
        if (!user) return
        api.get(`${url}/post/${postId}`).then((res) => {
            console.log(res.data);
            setIliked(res.data.likes.includes(user?._id))
            setIsaved(res.data.saved.includes(user?._id))
            setLikesCount(res.data.likes.length)
            setPost(res.data)
        })
    }, [postId, user])

    function handleLike() {
        api.put(`${url}/post/handlelike/${postId}`).then((res) => {
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
        api.post(`${url}/post/addcomment/${postId}`, {
            comment
        }).then(res => {
            if (res.data) {
                setComment('')
            }
        }).catch(err => console.log(err))
    }
    function handleSave() {
        api.get(`${url}/post/handlesave/${postId}`).then(res => {
            if (res.data) {
                setIsaved(prev => !prev)
            }
        })
    }

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
            <div className="left-dialog" style={{ width: '55%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img style={{ width: '100%' }} src={post && post.files[0].link} alt="" />
            </div>
            <div className="right-dialog" style={{ width: '45%', overflowY: 'scroll', borderLeft: '2px solid rgb(231 231 231)', padding: '10px 0px', display: 'flex', flexDirection: 'column' }}>
                <div className="user-post-details" style={{ marginBottom: '7px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #dbdbdb', paddingBottom: '9px', paddingTop: '1.25px' }}>
                    <div className="right-post-details" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '12px' }}>
                        <div className="user-img">
                            {
                                <Link to={`/${user?.username}`}><img src={user?.avatar ? user.avatar : defaultImg} style={{ minWidth: '35px', height: '35px', objectFit: 'cover', borderRadius: '50%', }} alt="" /></Link>
                            }
                        </div>
                        <div className="username">
                            <Link to={`/${user?.username}`} style={{ fontWeight: 'bold', fontSize: '13.15px', marginLeft: '9px' }}>{user?.username}</Link>
                        </div>
                    </div>
                    <div className="right-details-post">
                        <button className="no-style" style={{ marginLeft: '-32px' }}>{moreIcons}</button>
                    </div>
                </div>
                <div className="comments" style={{ padding: '10px 19px', height: '94%' }}>
                    <div className="coments-itr" style={{ height: '90%' }}>

                    </div>
                    <div className="bootom-labels" style={{ marginTop: 'auto' }}>
                        <div className="labels" style={{ marginLeft: '9.2px', display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                            <button onClick={() => handleLike()} className="no-style" style={{ marginRight: '12px' }} >
                                {
                                    iLiked ? afterLike : likeOutline
                                }
                            </button>
                            <button onClick={() => inputRef.current.focus()} className="no-style" style={{ marginRight: '12px' }} >
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
                            <p style={{ fontWeight: 'bold', fontSize: '13.15px', marginLeft: '9.2px' }}>{likesCount} likes</p>
                        </div>
                        <div className="timestamp" style={{ marginTop: '7px' }}>
                            <p style={{ fontSize: '12.19px', marginLeft: '9px', color: 'gray' }}>
                                {post && <ReactTimeAgo date={Date.parse(post.createdAt)} locale="en-US" />}
                            </p>
                        </div>
                    </div>


                </div>
                <div className="addComment" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: '9px', marginTop: '22px', width: '95%', borderTop: '1px solid #dbdbdb', paddingTop: '15px', marginBottom: '3px' }}>
                    <button className="no-style" >
                        {emojiIcon}
                    </button>
                    <input ref={inputRef} value={comment} onChange={e => setComment(e.target.value)} type="text" placeholder="Add a comment" style={{ width: '87%', height: '22px', outline: 'none', border: 'none', fontSize: '13px', paddingLeft: '9px' }} />
                    {
                        comment ?
                            <button onClick={() => handleComment()} className="no-style" style={{ color: '#0095F6', fontSize: '14.25px' }}>post</button>
                            : <button disabled={true} className="no-style" style={{ color: 'rgb(157 161 163)', fontSize: '14.25px', cursor: 'not-allowed' }}>post</button>
                    }
                </div>
            </div>
        </div>
    )
}
