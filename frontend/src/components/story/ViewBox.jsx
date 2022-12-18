import React from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import PauseIcon from '@mui/icons-material/Pause';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';

export default function ViewBox() {
    return (
        <div style={{ backgroundColor: 'gray', width: '25vw', minWidth: '445px', height: '95vh', borderRadius: '9px', overflow: 'hidden', position: 'absolute', top: '2.75vh' }}>
            <div className="header_story" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', top: '15px', width: '100%' }}>
                <div className="left_header_story" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'white', marginLeft: '14px' }}>
                    <img src="https://firebasestorage.googleapis.com/v0/b/instagram-4b51d.appspot.com/o/images%2Fdownload.JPEG?alt=media&token=6dec60aa-aad7-4243-be90-a37aabff24f6" style={{ width: '35px', borderRadius: '50%' }} alt="" />
                    <p style={{ fontSize: '12.75px', marginRight: '8px', marginLeft: '8px' }}>thenisab</p>
                    <p style={{ fontSize: '12px', color: '#c3c3c3' }}>47m</p>
                </div>
                <div className="rightSide_header_story" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '7px', justifyContent: 'space-evenly', width: '90px' }}>
                    <PlayArrowIcon sx={{ color: 'white', fontSize: '22px' }} />
                    <VolumeOffIcon sx={{ color: 'white', fontSize: '19px' }} />
                    <MoreHorizIcon sx={{ color: 'white', fontSize: '24px' }} />
                </div>
            </div>
            <img src="https://i.pinimg.com/564x/85/7c/0d/857c0df8f8c51457ca869002a996a4be.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
            <div className="header_comments" style={{ width: '100%', position: 'absolute', bottom: '18px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div className="input_story_reply" style={{ width: '75%' }}>
                    <input style={{ width: '100%', marginLeft: '14px', height: '40px', borderRadius: '16px', paddingLeft: '8px', outline: 'none', color: 'white', border: '1px solid white', fontSize: '12px' }} type="text" placeholder='Reply to thenisab' />
                </div>
                <div className="input_story_reactions" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '9px', justifyContent: 'space-between', width: '70px', marginLeft: 'auto' }}>
                    <FavoriteBorderIcon sx={{ color: 'white', fontSize: '30px' }} />
                    <SendIcon sx={{ color: 'white', fontSize: '26px', transform: 'rotate(-28deg)', marginTop: '-9px' }} />
                </div>
            </div>

        </div>
    )
}
