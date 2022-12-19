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
import { Link } from 'react-router-dom'
import { Post } from "../../dialog/Post";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import Emoji from "../../emoji/Emoji";

export default function Card({ img, likes, caption, time, comments, userId, id, saved, filterPosts, filterUserPosts }) {
    const context = useContext(AuthContext)
    const [comment, setComment] = useState('')
    const [commnetsCount, setCommentsCount] = useState(comments.length)
    const [likesCount, setLikesCount] = useState(likes.length)
    const [iLiked, setIliked] = useState(likes.includes(context.auth._id))
    const [user, setUser] = useState()
    const [iSaved, setIsaved] = useState(saved.includes(context.auth._id))

    const [captionText, setCaptionText] = useState(caption)
    const [captionShow, setCaptionShow] = useState(caption)
    const [showEmojiPicker, setEmojiPicker] = useState(false)

    const [openDailog, setOpenDilaog] = useState(false);

    const handleClickOpen = () => {
        setOpenDilaog(true);
    };

    const handleCloseDialog = () => {
        setOpenDilaog(false);
    };

    const unFollow = () => {
        api.get(`${url}/user/handlefollow/${user._id}`).then((res) => {
            if (res.data?.success) {
                filterUserPosts(user._id)
                context.throwSuccess('Unfollowed User')
                handleCloseMenu()
            }
        })
    }

    const handleChangeCaption = () => {
        api.put(`${url}/post/update/${id}`, {
            caption: captionText
        }).then(res => {
            if (res.data) {
                setCaptionShow(captionText)
                handleCloseCaption()
            }
        })
    }

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

    function deletepost() {
        api.delete(`${url}/post/delete/${id}`).then((res) => {
            if (res.data) {
                handleCloseMenu()
                context.throwErr("Deleted Post")
                filterPosts(id)
            }
        })
    }

    const [openMore, setMore] = React.useState(false);

    const handleClickMenu = () => {
        setMore(true);
    };
    const handleCloseMenu = () => {
        setMore(false);
    };
    const [openCaption, setOpenCaption] = React.useState(false);

    const handleClickOpenCaption = () => {
        setOpenCaption(true);
    };

    const handleCloseCaption = () => {
        setOpenCaption(false);
    };
    const handleCopy = () => {
        navigator.clipboard.writeText(`${window.location.origin}/post/${id}`)
        context.throwSuccess('Copied to clipboard')
        handleCloseMenu()
    }
    const commentRef = useRef()

    function getEmoji(emoji) {
        setComment(prev => prev + emoji)
    }

    return (
        <div style={{ position: 'relative' }}>
            <div className="card" onClick={() => setEmojiPicker(false)}>
                <div className="user-details" style={{ marginBottom: '2px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className="left-details" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '12px' }}>
                        <div className="user-img">
                            {
                                <Link to={user?.username}><img src={user?.avatar ? user.avatar : defaultImg} style={{ minWidth: '35px', height: '35px', objectFit: 'cover', borderRadius: '50%', }} alt="" /></Link>
                            }
                        </div>
                        <div className="username" style={{ marginTop: '-8px' }}>
                            <Link to={user?.username} style={{ fontWeight: 'bold', fontSize: '13.15px', marginLeft: '9px' }}>{user?.username}</Link>
                        </div>
                    </div>
                    <div className="right-details">
                        <button onClick={() => handleClickMenu()} className="no-style" style={{ marginLeft: '-32px' }}>{moreIcons}</button>
                        <Dialog
                            PaperProps={{
                                style: {
                                    minHeight: '10%',
                                    maxHeight: '55%',
                                    minWidth: '350px',
                                    maxWidth: '350px',
                                    padding: 0,
                                    overflowY: 'auto',
                                    borderRadius: '15px'
                                }
                            }}
                            onClose={handleCloseMenu}
                            aria-labelledby="customized-dialog-title"
                            open={openMore}
                        >
                            <div>
                                {
                                    userId === context.auth._id ? <div onClick={() => deletepost()} className="option" style={{ borderBottom: '1px solid #dfdfdf', width: '100%', padding: '12px 0', fontSize: '14.17px', textAlign: 'center', color: '#e33636', fontWeight: 'bold', cursor: 'pointer' }}>
                                        Delete
                                    </div> :
                                        <div onClick={() => unFollow()} className="option" style={{ borderBottom: '1px solid #dfdfdf', width: '100%', padding: '12px 0', fontSize: '14.17px', color: '#e33636', marginTop: '0px', textAlign: 'center', fontWeight: 'bold', cursor: 'pointer' }}>
                                            Unfollow
                                        </div>
                                }
                                {userId === context.auth._id && <div onClick={() => handleClickOpenCaption()} className="option" style={{ borderBottom: '1px solid #dfdfdf', width: '100%', padding: '12px 0', fontSize: '14.17px', color: 'black', textAlign: 'center', cursor: 'pointer' }}>
                                    Edit
                                </div>}
                                <div className="option" onClick={(() => handleCopy())} style={{ borderBottom: '1px solid #dfdfdf', width: '100%', padding: '12px 0', fontSize: '14.17px', color: 'black', textAlign: 'center', cursor: 'pointer' }}>
                                    Copy link
                                </div>
                                <div onClick={() => handleCloseMenu()} className="option" style={{ borderBottom: '1px solid #dfdfdf', width: '100%', padding: '12px 0', fontSize: '14.17px', color: 'black', marginBottom: '0px', textAlign: 'center', cursor: 'pointer' }}>
                                    Cancel
                                </div>

                            </div>
                        </Dialog>
                    </div>

                    {/* caption */}
                    <Dialog
                        PaperProps={{
                            style: {
                                minHeight: '16%',
                                maxHeight: '55%',
                                minWidth: '380px',
                                maxWidth: '380px',
                                padding: '9px 5px',
                                overflowY: 'auto',
                                borderRadius: '15px'
                            }
                        }}
                        open={openCaption} onClose={handleCloseCaption}>
                        <DialogTitle sx={{ fontSize: '15px', fontFamily: 'Poppins' }}>Edit Caption</DialogTitle>
                        <DialogContent>
                            <TextField
                                value={captionText}
                                onChange={e => setCaptionText(e.target.value)}
                                autoFocus
                                margin="dense"
                                id="name"
                                type="text"
                                fullWidth
                                variant="standard"
                                InputProps={{
                                    style: { fontSize: '13.5px', fontFamily: 'Poppins' }
                                }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <button style={{ backgroundColor: 'transparent', padding: '7px 9px' }} onClick={handleCloseCaption}>Cancel</button>
                            <button style={{ backgroundColor: 'transparent', padding: '7px 9px' }} onClick={() => { handleChangeCaption(); handleCloseCaption() }}>Save</button>
                        </DialogActions>
                    </Dialog>

                </div>
                <div className="post" style={{ zIndex: '99' }}>
                    <img style={{ width: '100.20%', marginLeft: '-0.92px', margin: 'auto' }}
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
                    <button onClick={handleClickOpen} className="no-style" style={{ marginRight: '12px' }} >
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
                <div className="caption" style={{ display: 'flex', flexDirection: 'row', alignItems: "center", marginTop: '8px' }}>
                    <Link to={user?.username} style={{ fontWeight: 'bold', fontSize: '13.65px', marginLeft: '9px' }}>{user?.username}</Link>
                    <p style={{ fontSize: '13.19px', marginLeft: '5px' }}>{captionShow && captionShow}</p></div>
                {
                    commnetsCount !== 0 && <div onClick={handleClickOpen} className="comments" style={{ marginTop: '9px', cursor: 'pointer' }}><p style={{ fontSize: '13.39px', marginLeft: '9px', color: 'gray' }}>View all {commnetsCount} comments</p></div>
                }

                <div className="timestamp" style={{ marginTop: '7px' }}><p style={{ fontSize: '12.89px', marginLeft: '9px', color: 'gray' }}><ReactTimeAgo date={Date.parse(time)} locale="en-US" /></p></div>
                <div className="addComment" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: '9px', marginTop: '22px', width: '95%', borderTop: '1px solid #dbdbdb', paddingTop: '15px' }}>
                    <button className="no-style" onClick={(e) => { e.stopPropagation(); setEmojiPicker(prev => !prev) }} >
                        {emojiIcon}
                    </button>
                    <input value={comment} onChange={e => setComment(e.target.value)} ref={commentRef} type="text" placeholder="Add a comment" style={{ width: '87%', height: '22px', outline: 'none', border: 'none', fontSize: '13px', paddingLeft: '9px' }} />
                    {
                        comment ?
                            <button onClick={() => handleComment()} className="no-style" style={{ color: '#0095F6', fontSize: '14.25px' }}>post</button>
                            : <button disabled={true} className="no-style" style={{ color: 'rgb(157 161 163)', fontSize: '14.25px', cursor: 'not-allowed' }}>post</button>
                    }
                </div>

                <Dialog
                    maxWidth="lg"
                    open={openDailog}
                    PaperProps={{
                        style: {
                            minHeight: '95%',
                            maxHeight: '95%',
                            padding: 0
                        }
                    }}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <Post setOpenDilaog={setOpenDilaog} filterPosts={filterPosts} postId={id} userId={userId} />

                </Dialog>

            </div>
            {
                showEmojiPicker && <div className="emoji-picker" style={{ position: 'absolute', bottom: '70px', left: '15px', zIndex: '99' }}>
                    <Emoji getEmoji={getEmoji} />
                </div>
            }
        </div>
    );
}
