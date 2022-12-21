import React, { useEffect, useState } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import PauseIcon from '@mui/icons-material/Pause';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import { api } from '../../Interceptor/apiCall';
import { url } from '../../baseUrl';
import ReactTimeAgo from 'react-time-ago';
import { Link, useNavigate } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, LinearProgress } from '@mui/material';

export default function ViewBox({ stories }) {
    const [user, setUser] = useState()
    const [bar, setBar] = useState(0)
    const navigate = useNavigate()
    useEffect(() => {
        if (!stories) return
        api.get(`${url}/user/get/${stories?.current?.owner}`).then((res) => {
            setUser(res.data)
            return api.put(`${url}/story/seen/${stories?.current?.id}`)
        }).then((res) => console.log(res.data)).catch(err => console.log(err))
        const barValue = setInterval(() => {
            setBar(prev => {
                if (prev + 9 > 100) {
                    return 100
                } return prev + 9
            })
        }, 500)
        const timer = setTimeout(() => {
            clearInterval(barValue)
            if (!stories.next) navigate('/')
            navigate(`/story/${stories.next.owner}?id=${stories.next.id}`)
        }, 6000)

        return () => {
            clearInterval(barValue);
            clearInterval(timer)
            setBar(0)
        }
    }, [navigate, stories])

    return (
        <div style={{ backgroundColor: 'gray', width: '25vw', minWidth: '445px', height: '95vh', borderRadius: '9px', position: 'absolute', top: '2.75vh', boxShadow: '0 0 200px rgba(0,0,0,0.9) inset' }}>
            <Box sx={{ width: '100%', color: '#656565' }}>
                <LinearProgress sx={{ position: 'absolute', top: '0.55vh', width: '98%', left: '5px', borderRadius: '7px' }} color="inherit" variant="determinate" value={bar} />
            </Box>
            <div className="header_story" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', top: '15px', width: '100%', }}>

                <div className="left_header_story" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'white', marginLeft: '14px' }}>
                    <Link to={`/${user?.username}`}>
                        <img src={user?.avatar} style={{ width: '35px', borderRadius: '50%' }} alt="" />
                    </Link>
                    <Link to={`/${user?.username}`}>
                        <p style={{ fontSize: '12.75px', marginRight: '8px', marginLeft: '8px' }}>{user?.username}</p>
                    </Link>
                    <p style={{ fontSize: '12px', color: '#c3c3c3' }}>{
                        stories && <ReactTimeAgo date={Date.parse(stories?.current?.createdAt || new Date())} timeStyle="twitter" />
                    }</p>
                </div>
                <div className="rightSide_header_story" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '7px', justifyContent: 'space-evenly', width: '90px' }}>
                    <PlayArrowIcon sx={{ color: 'white', fontSize: '22px' }} />
                    <VolumeOffIcon sx={{ color: 'white', fontSize: '19px' }} />
                    <MoreHorizIcon sx={{ color: 'white', fontSize: '24px' }} />
                </div>
            </div>
            <img src={stories?.current?.data} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '9px' }} alt="" />
            {
                stories?.prev &&
                <button onClick={() => navigate(`/story/${stories.prev.owner}?id=${stories.prev.id}`)} style={{ position: 'absolute', left: '-39px', top: '50%', zIndex: '99999', backgroundColor: '#5b5b5b', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', padding: '5px' }}>
                    <ArrowBackIosNewIcon sx={{ color: 'white', fontSize: '16px' }} />
                </button>
            }
            {
                stories?.next &&
                <button onClick={() => navigate(`/story/${stories.next.owner}?id=${stories.next.id}`)} style={{ position: 'absolute', right: '-39px', top: '50%', zIndex: '99999', backgroundColor: '#5b5b5b', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', padding: '5px' }}>
                    <ArrowForwardIosIcon sx={{ color: 'white', fontSize: '16px' }} />
                </button>
            }
            <div className="header_comments" style={{ width: '100%', position: 'absolute', bottom: '18px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div className="input_story_reply" style={{ width: '75%' }}>
                    <input style={{ width: '100%', marginLeft: '14px', height: '40px', borderRadius: '16px', paddingLeft: '8px', outline: 'none', color: 'white', border: '1px solid white', fontSize: '12px' }} type="text" placeholder={'Reply to ' + user?.username} />
                </div>
                <div className="input_story_reactions" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '9px', justifyContent: 'space-between', width: '70px', marginLeft: 'auto' }}>
                    <FavoriteBorderIcon sx={{ color: 'white', fontSize: '30px' }} />
                    <SendIcon sx={{ color: 'white', fontSize: '26px', transform: 'rotate(-28deg)', marginTop: '-9px' }} />
                </div>
            </div>
        </div>
    )
}
