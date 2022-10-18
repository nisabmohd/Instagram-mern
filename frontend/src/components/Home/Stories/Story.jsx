import React from 'react'

export default function Story({ avatar, username, seen }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '0 10px', width: '55px' }}>
      <div className="image" style={{ width: '59px', height: '59px', border: !seen && '3px solid #DE0046' , borderRadius: '50%',marginBottom: '5px',display:'flex',alignItems:"center",justifyContent:'center' }}>
        <img src={avatar && avatar} style={{ width: '56px', height: '56px', borderRadius: '50%', padding: '4px'}} alt="" />
      </div>
      <p style={{ fontSize: '13px', textAlign: 'center' }}>{username && username.slice(0, 7) + "..."}</p>
    </div>
  )
}
