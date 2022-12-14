import { Chip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { url } from '../../baseUrl'
import { api } from '../../Interceptor/apiCall'
import SelectUser from './SelectUser'

export default function Select({ handleClose, addRoom }) {
    const [selected, setSelected] = useState([])
    const [selectedIds, setSelectedIds] = useState([])
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        api.get(`${url}/user/allusers`).then(res => setUsers(res.data))
            .catch(err => console.log(err))
    }, [])

    function handleSelect(user) {
        setSelected(prev => [...prev, user])
        setSelectedIds(prev => [...prev, user._id])
    }
    function removeUser(userid) {
        setSelected(prev => prev.filter(item => userid !== item._id))
        setSelectedIds(prev => prev.filter(item => item !== userid))
    }

    function handleCreateRoom() {
        api.post(`${url}/chat/handshake`, {
            people: selectedIds
        }).then((res) => {
            // console.log(res);
            handleClose()
            navigate(`/chats/${res.data.roomId}`)
            addRoom(res.data)
        }).catch(err => console.log(err))
    }

    return (
        <div>
            <p onClick={() => handleCreateRoom()} style={{ fontSize: '14px', color: 'rgb(0, 149, 246)', cursor: 'pointer', marginTop: '2px', position: 'absolute', right: 12, top: 12 }}>Next</p>
            <div className="selects_chip_search" style={{ minHeight: '45px', borderBottom: '1px solid #d9d7d7', display: 'flex', flexDirection: 'row', padding: '0 12px', alignItems: 'flex-start' }}>
                <h5 style={{ letterSpacing: '0.4px', marginLeft: '3px', marginTop: '15px' }}>TO:</h5>
                <div className="select_chip_input" style={{ padding: '12px 7px' }}>
                    <div className="chips">
                        {
                            selected.map(selects =>
                                <Chip color="primary" key={selects._id} sx={{ margin: '2px 5px' }} label={selects.username} onDelete={() => removeUser(selects._id)} />
                            )
                        }
                    </div>
                    <input style={{ width: '92%', marginLeft: '8px', height: '80%', border: 'none', outline: 'none', padding: '5px 0' }} placeholder="Search" type="text" />
                </div>
            </div>
            <div className="users_to_select">
                <h5 style={{ marginLeft: '17px', marginTop: '14px', marginBottom: '15px' }}>Suggested</h5>
                <div className="user_list_suggest">
                    {
                        users.map(user =>
                            <SelectUser selects={selectedIds} key={user._id} handleSelect={handleSelect} removeUser={removeUser} user={user} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}
