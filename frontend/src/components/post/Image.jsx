import React from 'react'

export const Image = ({src}) => {
  return (
    <div>
        <img style={{width:'300px',height:'295px',objectFit:'cover'}} src={src} alt="" />
    </div>
  )
}
