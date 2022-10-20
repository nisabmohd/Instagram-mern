import React from 'react'

export const Disabled = ({text}) => {
    return (
        <button disabled style={{ border: 'none', outline: 'none', background: 'blue', padding: '7px 9px', borderRadius: '5px', color: 'gray', backgroundColor: 'rgb(172 194 212)', marginTop: '18px', fontSize: '13px', width: '75%', cursor: 'not-allowed' }}>{text}</button>
    )
}
