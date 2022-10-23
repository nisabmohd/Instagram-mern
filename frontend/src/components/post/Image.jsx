import React from 'react'
import { useState } from 'react';
import { commentIcon, likeIconOutline } from '../../assets/svgIcons'
import './image.css'
export const Image = ({ src, likes, comments }) => {
  console.log(likes, comments);
  const [show, setShow] = useState()
  return (
    <div className="ppp" onMouseOver={() =>setShow(true)} onMouseLeave={()=>setShow(false)} >
      <img style={{ width: '300px', height: '295px', objectFit: 'cover', margin: 'auto',opacity:!show?'1':'0.5' }} className="ppp" src={src} alt="" />
      {
        show && (<div className="line-likes" style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ margin: '0 9px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {likeIconOutline} <p style={{ marginLeft: '6px',fontWeight:'bold' }}>{likes}</p>
          </div>
          <div style={{ margin: '0 9px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {commentIcon} <p style={{ marginLeft: '6px',fontWeight:'bold'  }}>{comments}</p>
          </div>
        </div>)
      }

    </div>
  )
}
