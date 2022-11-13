import React from 'react'
import { useState } from 'react';
import { commentIcon, likeIconOutline } from '../../assets/svgIcons'
import { Dialog } from "@mui/material";
import './image.css'
import { Post } from '../dialog/Post'

export const Image = ({ src, likes, comments, postId, userId }) => {

  const [openDailog, setOpenDilaog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDilaog(true);
  };

  const handleCloseDialog = () => {
    setOpenDilaog(false);
  };

  const [show, setShow] = useState()

  return (
    <>
      <div onClick={handleClickOpen} className="ppp" onMouseOver={() => setShow(true)} onMouseLeave={() => setShow(false)} >
        <img style={{ width: '300px', height: '295px', objectFit: 'cover', margin: 'auto', opacity: !show ? '1' : '0.5' }} className="ppp" src={src} alt="" />
        {
          show && (<div className="line-likes" style={{ display: 'flex', flexDirection: 'row', width: '32%', justifyContent: 'space-evenly' }}>
            <div style={{ margin: '0 9px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              {likeIconOutline} <p style={{ marginLeft: '6px', fontWeight: 'bold' }}>{likes}</p>
            </div>
            <div style={{ margin: '0 9px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              {commentIcon} <p style={{ marginLeft: '6px', fontWeight: 'bold' }}>{comments}</p>
            </div>
          </div>)
        }

      </div>
      <Dialog
        maxWidth="lg"
        open={openDailog}
        PaperProps={{
          style: {
            minHeight: '95%',
            maxHeight: '95%',
            minWidth: '65vw',
            padding: 0
          }
        }}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Post postId={postId} userId={userId} />
      </Dialog>
    </>

  )
}
