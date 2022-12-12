import React from 'react'
import { useContext } from 'react'
import { UserCard } from './UserCard'
import { AuthContext } from '../../../context/Auth'
import defaultImg from '../../../assets/dafault.png'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { api } from '../../../Interceptor/apiCall'
import { url } from '../../../baseUrl'
import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle, } from '@mui/material'
import { User } from '../../dialog/User'

export default function Right() {
    const { auth } = useContext(AuthContext)
    const [suggestedUsers, setSuggestedUsers] = useState([])
    const [completeSuggestions, setCompleteSuggestions] = useState([])
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        api.get(`${url}/user/suggestions?limit=15`).then(res => {
            setSuggestedUsers(res.data.slice(0, 5))
            setCompleteSuggestions(res.data)
        }).catch(err => console.log(err))
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    return (
        <div style={{ marginTop: '15px' }}>
            <div className="my-acc" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="img" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    {
                        <Link to={`/${auth?.username}`}><img src={auth?.avatar ? auth.avatar : defaultImg} style={{ minWidth: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} alt="" /></Link>

                    }
                    <div className="name" style={{ display: 'flex', flexDirection: 'column', marginLeft: '18px' }}>
                        <Link to={`/${auth?.username}`} style={{ color: 'black', fontSize: '14.75px', fontWeight: 'bold' }}>{auth?.username}</Link>
                        <Link to={`/${auth?.username}`} style={{ color: 'gray', fontSize: '14.75px', marginTop: '9px' }}>{auth?.name}</Link>
                    </div>
                </div>
                <div className="switch">
                    <p style={{ color: '#0095F6', fontSize: '14.55px' }}>Switch</p>
                </div>
            </div>
            <div className="suggestions" style={{ marginTop: '21px' }}>
                <div className="header-suggest" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ color: 'gray', fontSize: '14.75px' }}>Suggetions for you</p>
                    <button onClick={() => handleClickOpen()} className='no-style'><p style={{ color: 'black', fontSize: '14.05px' }}>See All</p></button>
                    <Dialog
                        PaperProps={{
                            style: {
                                minHeight: '15%',
                                maxHeight: '55%',
                                minWidth: '400px',
                                maxWidth: '400px',
                                padding: 0,
                                overflowY: 'auto',
                                borderRadius: '15px'
                            }
                        }}
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                    >
                        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                            <p style={{ textAlign: 'center', fontSize: '14px', fontWeight: 'bold', marginTop: '-5px', marginBottom: '-3px' }}>{"Suggestions"}</p>
                        </DialogTitle>
                        {
                            <DialogContent style={{ marginTop: '-9px', minHeight: '5px' }} dividers>
                                {
                                    completeSuggestions.map(user =>
                                        <User key={user._id} user={user} />
                                    )
                                }
                            </DialogContent>
                        }
                    </Dialog>
                </div>
                <div className="allusers" style={{ display: 'flex', alignItems: 'center', marginTop: '17px', flexDirection: 'column' }}>
                    {
                        suggestedUsers.map(user => {
                            return <UserCard key={user._id} userId={user._id} avatar={user.avatar} username={user.username} name={user.name} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}
