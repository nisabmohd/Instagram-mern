import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import ReactTimeAgo from 'react-time-ago'
import { commentMore } from '../../assets/svgIcons'
import { url } from '../../baseUrl';
import { AuthContext } from '../../context/Auth';
import { api } from '../../Interceptor/apiCall';
import defaultImg from '../../assets/dafault.png'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

export default function Comment({ text, time, userId, owner, postId, id, filterComment }) {
    const context = useContext(AuthContext)
    const [user, setUser] = useState()
    const [show, setShow] = useState(false)
    const [captionMoreDialog, setCaptionMoreDialog] = useState(false)
    const [openCaption, setOpenCaption] = React.useState(false);
    const [comment, setComment] = useState(text || "")
    const [commentShow, setCommentShow] = useState(text)

    useEffect(() => {
        api.get(`${url}/user/get/${userId}`).then(res => {
            // console.log(res.data);
            setUser(res.data)
        })
    }, [userId])

    const handleClickCaptionMenu = () => {
        setCaptionMoreDialog(true);
    };
    const handleCloseCaptionMenu = () => {
        setCaptionMoreDialog(false);

    };

    const handleClickOpenCaption = () => {
        setOpenCaption(true);
    };

    const handleCloseCaption = () => {
        setOpenCaption(false);
    };

    function handleCommentChange() {
        api.put(`${url}/post/addcomment/${postId}?commentId=${id}`, {
            comment
        }).then((res) => {
            setCommentShow(comment)
            handleCloseCaption()
            handleCloseCaptionMenu()
        }).catch(err => {
            console.log(err);
        })
    }


    function handleDeleteComment() {
        api.delete(`${url}/post/removecomment/${postId}?commentId=${id}`).then((res) => {
            console.log(res.data);
            if (res.data) {
                handleCloseCaptionMenu()
                filterComment(id)
            }
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '23px' }}>
            <div className="comment-left">
                <Link to={`/${user?.username}`}><img src={user?.avatar ? user.avatar : defaultImg} style={{ minWidth: '35px', height: '35px', objectFit: 'cover', borderRadius: '50%', }} alt="" /></Link>
            </div>
            <div className="right-comment" onMouseOver={() => setShow(true)} onMouseLeave={() => setShow(false)} style={{ display: 'flex', flexDirection: 'column', marginLeft: '9px' }}>
                <p style={{ fontSize: '13px' }} className="username-comment"><Link to={`/${user?.username}`} style={{ fontWeight: 'bold' }}>{`${user?.username}`}</Link> {commentShow}</p>
                <div className="comment-labels">
                    <div className="same-line" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <p className='timestamp' style={{ fontSize: '11.5px' }} >
                            <ReactTimeAgo date={Date.parse(time)} locale="en-US" timeStyle="twitter" />
                        </p>
                        {
                            (user?._id === context.auth._id || owner === context.auth._id) &&
                            <button onClick={() => handleClickCaptionMenu()} className='no-style' style={{ marginLeft: '6px', fontSize: '12px', cursor: 'pointer', height: '10px', marginTop: '-12px' }}>
                                {
                                    show && commentMore
                                }
                            </button>
                        }

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
                            <DialogTitle sx={{ fontSize: '15px', fontFamily: 'Poppins' }}>Edit Comment</DialogTitle>
                            <DialogContent>
                                <TextField
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
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
                                <button onClick={handleCloseCaption} style={{ backgroundColor: 'transparent', padding: '7px 9px' }} >Cancel</button>
                                <button onClick={handleCommentChange} style={{ backgroundColor: 'transparent', padding: '7px 9px' }} >Save</button>
                            </DialogActions>
                        </Dialog>

                        {/* caption more dialog */}
                        <Dialog
                            PaperProps={{
                                style: {
                                    minHeight: '8%',
                                    maxHeight: '55%',
                                    minWidth: '350px',
                                    maxWidth: '350px',
                                    padding: 0,
                                    overflowY: 'auto',
                                    borderRadius: '15px'
                                }
                            }}
                            onClose={handleCloseCaptionMenu}
                            aria-labelledby="customized-dialog-title"
                            open={captionMoreDialog}
                        >
                            <div>
                                <div onClick={() => handleDeleteComment()} className="option" style={{ borderBottom: '1px solid #dfdfdf', width: '100%', padding: '12px 0', fontSize: '14.17px', textAlign: 'center', cursor: 'pointer', paddingBottom: '-5px', color: '#e33636', fontWeight: 'bold', paddingTop: '14px' }}>
                                    Delete
                                </div>
                                {userId === context.auth._id && <div onClick={() => handleClickOpenCaption()} className="option" style={{ borderBottom: '1px solid #dfdfdf', width: '100%', padding: '12px 0', fontSize: '14.17px', color: 'black', textAlign: 'center', cursor: 'pointer', paddingTop: '14px' }}>
                                    Edit
                                </div>}
                                <div onClick={() => handleCloseCaptionMenu()} className="option" style={{ borderBottom: '1px solid #dfdfdf', width: '100%', padding: '12px 0', fontSize: '14.17px', color: 'black', textAlign: 'center', cursor: 'pointer', paddingBottom: '-5px' }}>
                                    Cancel
                                </div>
                            </div>
                        </Dialog>

                    </div>
                </div>
            </div>
        </div>
    )
}
