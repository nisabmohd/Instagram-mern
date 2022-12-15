import React from 'react'
import { useParams } from 'react-router-dom'
import Topbar from '../components/story/Topbar';

export default function Story() {
    const params = useParams()
    console.log(params.userId);
    return (
        <div style={{ width: '100vw', height: '100vh', backgroundColor: '#1a1a1a', position: 'absolute', top: 0, left: 0, zIndex: 9999 }}>
            <Topbar />
            <div className="story_box_view">

            </div>
        </div>
    )
}
