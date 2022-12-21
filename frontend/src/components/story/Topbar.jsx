import React from 'react'
import logo from '../../assets/whitelogo.png'
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';

export default function Topbar() {
    const navigate = useNavigate()
    return (
        <div style={{ width: '98%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 'auto', padding: '12px 0' }}>
            <Link to="/"><img src={logo} style={{ width: '110px' }} alt="" /></Link>
            <CloseIcon onClick={() => navigate('/')} sx={{ color: 'white', fontSize: '25px', cursor: 'pointer' }} />
        </div>
    )
}
