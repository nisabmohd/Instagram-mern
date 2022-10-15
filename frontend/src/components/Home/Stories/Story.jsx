import React from 'react'

export default function Story({ avatar, username,seen }) {
  return (
    <div style={{display:'flex',flexDirection:'column',margin:'0 10px'}}>
      <img src={avatar && avatar} style={{ width: '55px', borderRadius: '50%', marginBottom:'5px',border:!seen &&'3px solid #DE0046',padding:'1.72px'}} alt="" />
      <p style={{ fontSize: '13px',textAlign:'center' }}>{username && username}</p>
    </div>
  )
}
