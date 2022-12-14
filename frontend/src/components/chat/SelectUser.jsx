import React, { useEffect, useState } from 'react'
import defaultImg from '../../assets/dafault.png'
import Checkbox from '@mui/material/Checkbox';

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function SelectUser({ user, handleSelect, removeUser, selects }) {
    const [checked, setChecked] = useState(false)

    function handleCheckBoxClick() {
        if (checked) {
            removeUser(user._id)
        } else {
            handleSelect(user)
        }
        setChecked(prev => !prev)
    }

    useEffect(() => {
        if (selects.includes(user._id)) return
        setChecked(false)
    }, [selects, user._id])


    return (
        <div style={{ display: 'flex', flexDirection: 'row', margin: '3px 0px', alignItems: 'flex-start', padding: '5px 12px' }}>
            <div className="user-img" >
                <img src={user.avatar || defaultImg} style={{ minWidth: '44px', height: '44px', objectFit: 'cover', borderRadius: '50%', marginRight: '3px' }} alt="" />
            </div>
            <div className="username" style={{ display: 'flex', flexDirection: 'column', marginLeft: '7px' }}>
                <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{user.username}</div>
                <p style={{ fontSize: '12px' }}>{user.name}</p>
            </div>
            <div className="checbox" style={{ marginLeft: 'auto' }}>
                <Checkbox
                    checked={checked}
                    onClick={() => handleCheckBoxClick()}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<CheckCircleIcon />}
                />
            </div>
        </div>
    )
}
