import React, { useEffect, useState } from 'react'
import { url } from '../../baseUrl'
import { api } from '../../Interceptor/apiCall'
import SelectUser from './SelectUser'

export default function Select() {
    const [selected, setSelected] = useState([])
    const [users, setUsers] = useState([])
    useEffect(() => {
        api.get(`${url}/user/allusers`).then(res => setUsers(res.data))
            .catch(err => console.log(err))
    }, [])

    function handleSelect(user) {
        setSelected([...selected, user])
    }
    function removeUser(user) {
        setSelected(prev => prev.filter(item => user._id !== item._id))
    }

    // function handleCreateRoom(){

    // }

    return (
        <div>
            <p style={{ fontSize: '14px', color: 'rgb(0, 149, 246)', cursor: 'pointer', marginTop: '2px', position: 'absolute', right: 12, top: 12 }}>Next</p>
            <div className="selects_chip_search" style={{ minHeight: '45px', borderBottom: '1px solid #d9d7d7', display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0 12px' }}>
                <h5 style={{ letterSpacing: '0.4px', marginLeft: '3px' }}>TO:</h5>
                <input style={{ width: '92%', marginLeft: '8px', height: '80%', border: 'none', outline: 'none', paddingLeft: '15px' }} placeholder="Search" type="text" />
            </div>
            <div className="users_to_select">
                <h5 style={{ marginLeft: '17px', marginTop: '14px', marginBottom: '15px' }}>Suggested</h5>
                <div className="user_list_suggest">
                    {
                        users.map(user =>
                            <SelectUser key={user._id} handleSelect={handleSelect} removeUser={removeUser} user={user} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}
